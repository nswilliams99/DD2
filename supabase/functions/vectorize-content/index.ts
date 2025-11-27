
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');

console.log('Environment check:', {
  hasSupabaseUrl: !!supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  hasOpenaiKey: !!openaiApiKey
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Content preprocessing utilities
function preprocessContent(text: string): string {
  if (!text) return ''
  
  // Strip HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, ' ')
  
  // Normalize whitespace
  const normalized = withoutHtml.replace(/\s+/g, ' ').trim()
  
  // Remove problematic characters that might cause issues
  const cleaned = normalized.replace(/[^\w\s\.\,\!\?\-\(\)\:\;\"\']/g, ' ')
  
  return cleaned
}

// Intelligent text chunking that maintains context
function chunkText(text: string, maxChunkSize: number = 1500): string[] {
  if (!text || text.length <= maxChunkSize) {
    return [text]
  }

  const chunks: string[] = []
  
  // First try to split by paragraphs (double newlines)
  const paragraphs = text.split(/\n\s*\n/)
  let currentChunk = ''
  
  for (const paragraph of paragraphs) {
    const testChunk = currentChunk + (currentChunk ? '\n\n' : '') + paragraph
    
    if (testChunk.length <= maxChunkSize) {
      currentChunk = testChunk
    } else {
      // If current chunk has content, save it
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim())
        currentChunk = ''
      }
      
      // If single paragraph is too long, split by sentences
      if (paragraph.length > maxChunkSize) {
        const sentences = paragraph.split(/(?<=[.!?])\s+/)
        let sentenceChunk = ''
        
        for (const sentence of sentences) {
          const testSentence = sentenceChunk + (sentenceChunk ? ' ' : '') + sentence
          
          if (testSentence.length <= maxChunkSize) {
            sentenceChunk = testSentence
          } else {
            if (sentenceChunk.trim()) {
              chunks.push(sentenceChunk.trim())
            }
            // If even a single sentence is too long, truncate it
            sentenceChunk = sentence.length > maxChunkSize ? sentence.slice(0, maxChunkSize) : sentence
          }
        }
        
        if (sentenceChunk.trim()) {
          currentChunk = sentenceChunk
        }
      } else {
        currentChunk = paragraph
      }
    }
  }
  
  // Add the last chunk if it has content
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }
  
  return chunks.filter(chunk => chunk.length > 0)
}

// Generate embedding with retry mechanism and better error handling
async function generateEmbedding(text: string, retryCount: number = 0): Promise<number[]> {
  const maxRetries = 3
  console.log(`[VECTORIZE] Generating embedding for text (${text.length} chars) - attempt ${retryCount + 1}`)
  
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  try {
    // Validate and preprocess text
    const processedText = preprocessContent(text)
    
    // Check if text is too long (conservative limit for ada-002)
    if (processedText.length > 6000) {
      throw new Error(`Processed text too long: ${processedText.length} characters exceeds safe limit`)
    }
    
    if (!processedText.trim()) {
      throw new Error('Text is empty after preprocessing')
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small', // Upgraded to newer, better model
        input: processedText,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[VECTORIZE-ERROR] OpenAI API error: ${response.status} - ${errorText}`);
      
      // Retry on rate limit or temporary server errors
      if ((response.status === 429 || response.status >= 500) && retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000 // Exponential backoff
        console.log(`[VECTORIZE-RETRY] Rate limited/server error, retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return generateEmbedding(text, retryCount + 1)
      }
      
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`[VECTORIZE] Successfully generated embedding, dimension: ${data.data[0].embedding.length}`);
    return data.data[0].embedding;
  } catch (error) {
    console.error(`[VECTORIZE-ERROR] Failed to generate embedding (attempt ${retryCount + 1}):`, error);
    
    // Retry on network errors (but not on text processing errors)
    if (retryCount < maxRetries && !error.message.includes('too long') && !error.message.includes('empty')) {
      const delay = Math.pow(2, retryCount) * 1000
      console.log(`[VECTORIZE-RETRY] Network error, retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
      return generateEmbedding(text, retryCount + 1)
    }
    
    throw error
  }
}

async function extractTextFromPDF(base64Data: string): Promise<string> {
  // For now, return a placeholder - would need PDF parsing library
  return "PDF content extracted (placeholder)";
}

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { content, contentType, sourceUrl, filePath, title, metadata = {}, batch } = requestBody;

    console.log('📥 Request received:', { 
      contentType, 
      hasContent: !!content,
      contentLength: content?.length || 0,
      hasBatch: !!batch,
      metadata: JSON.stringify(metadata),
      title
    });

    // If batch flag is true or specific batch content types, process accordingly
    if (batch || contentType.startsWith('batch_')) {
      let tableName = contentType.replace('batch_', '');
      let sections = [];
      
      // Handle different batch types
      if (contentType === 'batch_residential_faqs' || tableName === 'residential_faqs') {
        console.log('Starting batch processing of residential FAQs...');
        const { data: records, error: fetchErr } = await supabase
          .from('residential_faqs')
          .select('id, question, answer, category, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.question, 
          description: r.answer,
          section_name: 'residential_faq',
          page_slug: 'residential_faqs'
        })) || [];
      }
      else if (contentType === 'batch_commercial_faqs' || tableName === 'commercial_faqs') {
        console.log('Starting batch processing of commercial FAQs...');
        const { data: records, error: fetchErr } = await supabase
          .from('commercial_faqs')
          .select('id, question, answer, category, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.question, 
          description: r.answer,
          section_name: 'commercial_faq',
          page_slug: 'commercial_faqs'
        })) || [];
      }
      else if (contentType === 'batch_faqs' || tableName === 'faqs') {
        console.log('Starting batch processing of general FAQs...');
        const { data: records, error: fetchErr } = await supabase
          .from('faqs')
          .select('id, question, answer, category, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.question, 
          description: r.answer,
          section_name: 'general_faq',
          page_slug: 'faqs'
        })) || [];
      }
      else if (contentType === 'batch_rolloff_faqs' || tableName === 'rolloff_faqs') {
        console.log('Starting batch processing of rolloff FAQs...');
        const { data: records, error: fetchErr } = await supabase
          .from('rolloff_faqs')
          .select('id, question, answer, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.question, 
          description: r.answer,
          section_name: 'rolloff_faq',
          page_slug: 'rolloff_faqs'
        })) || [];
      }
      else if (contentType === 'batch_services' || tableName === 'services') {
        console.log('Starting batch processing of services...');
        const { data: records, error: fetchErr } = await supabase
          .from('services')
          .select('id, title, description, content, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          description: `${r.description || ''} ${r.content || ''}`.trim(),
          section_name: 'service',
          page_slug: 'services'
        })) || [];
      }
      else if (contentType === 'batch_residential_towns' || tableName === 'residential_towns') {
        console.log('Starting batch processing of residential towns...');
        const { data: records, error: fetchErr } = await supabase
          .from('residential_towns')
          .select('id, name, local_blurb, meta_description, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.name,
          description: `${r.local_blurb || ''} ${r.meta_description || ''}`.trim(),
          section_name: 'residential_town',
          page_slug: 'residential_towns'
        })) || [];
      }
      else if (contentType === 'batch_rolloff_towns' || tableName === 'rolloff_towns') {
        console.log('Starting batch processing of rolloff towns...');
        const { data: records, error: fetchErr } = await supabase
          .from('rolloff_towns')
          .select('id, name, local_blurb, meta_description, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.name,
          description: `${r.local_blurb || ''} ${r.meta_description || ''}`.trim(),
          section_name: 'rolloff_town',
          page_slug: 'rolloff_towns'
        })) || [];
      }
      else if (contentType === 'batch_commercial_sizes' || tableName === 'commercial_sizes') {
        console.log('Starting batch processing of commercial sizes...');
        const { data: records, error: fetchErr } = await supabase
          .from('commercial_sizes')
          .select('id, title, description, is_active, updated_at')
          .is('embedding', null)
          .eq('is_active', true);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          section_name: 'commercial_size',
          page_slug: 'commercial_sizes'
        })) || [];
      }
      else if (contentType === 'batch_rolloff_sizes' || tableName === 'rolloff_sizes') {
        console.log('Starting batch processing of rolloff sizes...');
        const { data: records, error: fetchErr } = await supabase
          .from('rolloff_sizes')
          .select('id, size_label, description, detailed_description, updated_at')
          .is('embedding', null);
        
        if (!fetchErr) sections = records?.map(r => ({ 
          ...r, 
          title: r.size_label,
          description: `${r.description || ''} ${r.detailed_description || ''}`.trim(),
          section_name: 'rolloff_size',
          page_slug: 'rolloff_sizes'
        })) || [];
      }
      else {
        // Default to page_sections if no specific batch type
        console.log('Starting batch processing of page sections with null embeddings...');
        const { data: records, error: fetchErr } = await supabase
          .from('page_sections')
          .select('id, page_slug, section_name, display_order, title, description')
          .is('embedding', null);
        
        if (!fetchErr) sections = records || [];
      }

      console.log(`Found ${sections.length} records to vectorize for ${contentType}`);

      let processed = 0;
      let skipped = 0;
      let failed = 0;
      
      // Process in smaller batches to avoid timeouts
      const BATCH_SIZE = 5;
      for (let i = 0; i < sections.length; i += BATCH_SIZE) {
        const batch = sections.slice(i, i + BATCH_SIZE);
        console.log(`[BATCH] Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(sections.length/BATCH_SIZE)} (records ${i + 1}-${Math.min(i + BATCH_SIZE, sections.length)})`);
        
        for (const section of batch) {
          try {
            const rawText = `${section.title || ''} ${section.description || ''}`.trim();
            if (!rawText) {
              console.log(`⏭️  [${section.id}] Skipping empty section`);
              skipped++;
              continue;
            }

            console.log(`🔄 [${section.id}] Processing ${tableName || 'page_section'}: ${section.section_name || section.title} (${rawText.length} chars)`);
            
            // Preprocess and validate content
            const processedText = preprocessContent(rawText);
            if (!processedText) {
              console.log(`⏭️  [${section.id}] Skipping section - no content after preprocessing`);
              skipped++;
              continue;
            }
            
            // For very long content, use chunking
            const chunks = chunkText(processedText);
            const textToEmbed = chunks[0]; // Use first chunk
            
            if (chunks.length > 1) {
              console.log(`📝 [${section.id}] Content chunked into ${chunks.length} parts, using first chunk (${textToEmbed.length} chars)`);
            }
            
            const embedding = await generateEmbedding(textToEmbed);
            
            // Update the appropriate table
            const targetTable = tableName || 'page_sections';
            const { error: updateError } = await supabase
              .from(targetTable)
              .update({ embedding })
              .eq('id', section.id);
            
            if (updateError) {
              console.error(`❌ [${section.id}] Failed to update embedding in ${targetTable}:`, updateError);
              failed++;
              continue;
            }
            
            console.log(`✅ [${section.id}] Successfully embedded in ${targetTable} (${embedding.length} dimensions)`);
            processed++;
            
            // Small delay to avoid overwhelming the API
            await new Promise(resolve => setTimeout(resolve, 100));
            
          } catch (sectionError) {
            console.error(`❌ [${section.id}] Error processing section:`, sectionError.message);
            failed++;
          }
        }
        
        // Progress update
        console.log(`[PROGRESS] Completed ${processed + skipped + failed}/${sections.length} records (${processed} processed, ${skipped} skipped, ${failed} failed)`);
      }
      
      console.log(`Batch processing completed: ${processed}/${sections.length} sections processed, ${skipped} skipped, ${failed} failed`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          total: sections.length,
          processed,
          skipped,
          failed,
          message: `Successfully processed ${processed} of ${sections.length} sections. ${skipped} skipped (empty), ${failed} failed.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Request details:', { 
      contentType, 
      sourceUrl, 
      title,
      hasContent: !!content,
      contentLength: content?.length || 0,
      recordId: metadata?.record_id,
      tableName: metadata?.table_name
    });

    // Create vectorization job FIRST to track what's happening
    console.log('Creating vectorization job...');
    const { data: job, error: jobError } = await supabase
      .from('vectorization_jobs')
      .insert({
        source_type: contentType,
        source_path: sourceUrl || filePath || '',
        status: 'processing'
      })
      .select()
      .single();

    if (jobError) {
      console.error('❌ Failed to create job:', jobError);
      throw new Error(`Failed to create job: ${jobError.message}`);
    }
    
    console.log('✅ Created vectorization job:', job.id);

    let textContent = content;

    // Process different content types
    if (contentType === 'pdf' && content.startsWith('data:')) {
      // Extract base64 data and process PDF
      const base64Data = content.split(',')[1];
      textContent = await extractTextFromPDF(base64Data);
    } else if (contentType === 'image') {
      // For images, we might want to use OCR or image description
      textContent = title || `Image: ${filePath}`;
    }

    // Generate embedding
    const embedding = await generateEmbedding(textContent);
    const wordCount = textContent.split(/\s+/).length;

    // Store embedding based on content type
    if (contentType === 'page_section' && metadata.section_id) {
      // Update the page_sections table with the embedding
      console.log('Updating page section with ID:', metadata.section_id, 'embedding length:', embedding.length);
      
      try {
        console.log(`Writing embedding to page_sections for section ${metadata.section_id}...`);
        const { data: updateData, error: updateError } = await supabase
          .from('page_sections')
          .update({ embedding: embedding })
          .eq('id', metadata.section_id)
          .select('id, embedding');

        if (updateError) {
          console.error(`❌ [${metadata.section_id}] DB write failed:`, updateError);
          throw new Error(`Failed to update page section embedding: ${updateError.message}`);
        }
        
        if (!updateData || updateData.length === 0) {
          console.error(`❌ [${metadata.section_id}] No rows updated - section not found`);
          throw new Error(`Page section with ID ${metadata.section_id} not found`);
        }
        
        console.log(`✅ [${metadata.section_id}] DB write succeeded - embedding stored`);
      } catch (dbError) {
        console.error(`❌ [${metadata.section_id}] Database operation failed:`, dbError);
        throw dbError; // Re-throw to ensure job is marked as failed
      }
    } else if (['residential_faqs', 'commercial_faqs', 'faqs', 'rolloff_faqs', 'services', 'residential_towns', 'rolloff_towns', 'commercial_sizes', 'rolloff_sizes', 'testimonials', 'kb_articles', 'vectorization_test'].includes(contentType)) {
      // Store embedding directly in the content table
      const recordId = metadata.record_id;
      console.log(`Updating ${contentType} with ID: ${recordId}, embedding length: ${embedding.length}`);
      
      try {
        console.log(`Writing embedding to ${contentType} for record ${recordId}...`);
        const { data: updateData, error: updateError } = await supabase
          .from(contentType)
          .update({ embedding: embedding })
          .eq('id', recordId)
          .select('id');

        if (updateError) {
          console.error(`❌ [${recordId}] DB write failed:`, updateError);
          throw new Error(`Failed to update ${contentType} embedding: ${updateError.message}`);
        }
        
        if (!updateData || updateData.length === 0) {
          console.error(`❌ [${recordId}] No rows updated - record not found`);
          throw new Error(`${contentType} record with ID ${recordId} not found`);
        }
        
        console.log(`✅ [${recordId}] DB write succeeded - embedding stored in ${contentType}`);
      } catch (dbError) {
        console.error(`❌ [${recordId}] Database operation failed:`, dbError);
        throw dbError;
      }
    } else {
      // Store in document_embeddings for other content types (legacy support)
      console.log('Storing in document_embeddings table');
      
      try {
        const { data: insertData, error: insertError } = await supabase
          .from('document_embeddings')
          .insert({
            content: textContent,
            content_type: contentType,
            source_url: sourceUrl,
            file_path: filePath,
            title,
            metadata,
            embedding: embedding,
            word_count: wordCount
          })
          .select('id');

        if (insertError) {
          console.error('Failed to store embedding:', insertError);
          throw new Error(`Failed to store embedding: ${insertError.message}`);
        }
        
        console.log('Successfully stored document embedding, ID:', insertData[0]?.id);
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }
    }

    // Update job status
    console.log('Updating job status to completed');
    await supabase
      .from('vectorization_jobs')
      .update({ status: 'completed' })
      .eq('id', job.id);

    console.log('Vectorization completed successfully');
    return new Response(
      JSON.stringify({ 
        success: true, 
        jobId: job.id,
        wordCount,
        embeddingDimension: embedding.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Vectorization error:', error);
    
    // Try to update job status to failed
    try {
      // Find the most recent processing job for this content
      const { data: jobs } = await supabase
        .from('vectorization_jobs')
        .select('id')
        .eq('status', 'processing')
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (jobs && jobs.length > 0) {
        await supabase
          .from('vectorization_jobs')
          .update({ 
            status: 'failed',
            error_message: error.message 
          })
          .eq('id', jobs[0].id);
      }
    } catch (updateError) {
      console.error('Failed to update job status:', updateError);
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

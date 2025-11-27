import { createClient } from '@supabase/supabase-js';

async function batchVectorize() {
  const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
  const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0';
  
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log('Getting all page sections without embeddings...');

  // Get all sections without embeddings
  const { data: sections, error: sectionsError } = await supabase
    .from('page_sections')
    .select('id, title, description, page_slug, section_name')
    .is('embedding', null)
    .order('id');

  if (sectionsError) {
    console.error('Failed to get page sections:', sectionsError);
    return;
  }

  console.log(`Found ${sections.length} sections to vectorize`);

  let successCount = 0;
  let failureCount = 0;

  for (const section of sections) {
    const sectionId = section.id;
    const text = (section.title || '') + ' ' + (section.description || '');
    
    console.log(`\nProcessing section ${sectionId} (${section.page_slug}/${section.section_name})...`);

    try {
      const { data, error } = await supabase.functions.invoke('vectorize-content', {
        body: {
          content: text,
          contentType: 'page_section',
          title: section.title,
          metadata: {
            section_id: sectionId,
            page_slug: section.page_slug,
            section_name: section.section_name
          }
        }
      });

      if (error) {
        console.error(`❌ [${sectionId}] Edge function error:`, error);
        failureCount++;
      } else {
        console.log(`✅ [${sectionId}] Success:`, data);
        successCount++;
      }

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (err) {
      console.error(`❌ [${sectionId}] Failed:`, err);
      failureCount++;
    }
  }

  console.log(`\n=== BATCH COMPLETE ===`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📊 Total: ${sections.length}`);

  // Final check
  const { data: finalCheck } = await supabase
    .from('page_sections')
    .select('COUNT(*)', { count: 'exact' })
    .not('embedding', 'is', null);

  console.log(`🔍 Sections with embeddings: ${finalCheck?.[0]?.count || 0}`);
}

batchVectorize().catch(err => console.error(err));
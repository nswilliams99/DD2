import { createClient } from '@supabase/supabase-js';

async function runTest() {
  const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
  const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0';
  
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log('🔄 Testing vectorization for commercial FAQs...');

  // Get commercial FAQs to test
  const { data: faqs, error: faqsError } = await supabase
    .from('commercial_faqs')
    .select('*')
    .limit(1);

  if (faqsError || !faqs || faqs.length === 0) {
    console.error('❌ Failed to get commercial FAQs:', faqsError);
    return;
  }

  const faq = faqs[0];
  const text = (faq.question || '') + ' ' + (faq.answer || '');

  console.log(`📝 Testing with FAQ ID ${faq.id}`);
  console.log(`📋 Question: "${faq.question}"`);
  console.log(`💬 Answer: "${faq.answer}"`);
  console.log(`📝 Combined text: "${text}"`);

  // Call the vectorize edge function
  try {
    console.log('🚀 Calling vectorize-content function...');
    
    const { data, error } = await supabase.functions.invoke('vectorize-content', {
      body: {
        content: text,
        contentType: 'commercial_faqs',
        title: faq.question,
        metadata: {
          table_name: 'commercial_faqs',
          record_id: faq.id,
          category: faq.category,
          is_active: faq.is_active
        }
      }
    });

    if (error) {
      console.error('❌ Edge function error:', error);
    } else {
      console.log('✅ Edge function response:', data);
    }

    // Check if the embedding was stored
    console.log('🔍 Checking if embedding was stored...');
    const { data: updatedFaq, error: checkError } = await supabase
      .from('commercial_faqs')
      .select('id, embedding')
      .eq('id', faq.id)
      .single();

    if (checkError) {
      console.error('❌ Failed to check updated FAQ:', checkError);
    } else if (updatedFaq.embedding) {
      console.log('✅ Embedding successfully stored! Dimensions:', updatedFaq.embedding.length);
    } else {
      console.log('❌ No embedding found in database');
    }

  } catch (err) {
    console.error('❌ Test failed:', err);
  }
  
  // Also test batch processing
  console.log('\n🔄 Testing batch processing...');
  try {
    const { data: batchData, error: batchError } = await supabase.functions.invoke('vectorize-content', {
      body: {
        contentType: 'batch_commercial_faqs',
        batch: true,
        content: ''
      }
    });
    
    if (batchError) {
      console.error('❌ Batch processing error:', batchError);
    } else {
      console.log('✅ Batch processing response:', batchData);
    }
  } catch (batchErr) {
    console.error('❌ Batch processing failed:', batchErr);
  }
}

runTest().catch(err => console.error(err));
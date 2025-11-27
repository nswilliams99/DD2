// Test the vectorize-content function directly
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testVectorization() {
  console.log('🧪 Testing vectorize-content function...');
  
  try {
    // Get a single commercial FAQ to test
    const { data: faq, error: fetchError } = await supabase
      .from('commercial_faqs')
      .select('id, question, answer')
      .is('embedding', null)
      .limit(1)
      .single();
    
    if (fetchError || !faq) {
      console.error('❌ No FAQ found to test:', fetchError);
      return;
    }
    
    console.log('📝 Testing with FAQ:', faq.question);
    
    // Call the vectorize-content function
    const { data, error } = await supabase.functions.invoke('vectorize-content', {
      body: {
        content: `${faq.question} ${faq.answer}`,
        contentType: 'commercial_faqs',
        metadata: {
          record_id: faq.id,
          table_name: 'commercial_faqs'
        }
      }
    });
    
    if (error) {
      console.error('❌ Function call failed:', error);
      return;
    }
    
    console.log('✅ Function response:', data);
    
    // Check if the embedding was actually stored
    const { data: updatedFaq, error: checkError } = await supabase
      .from('commercial_faqs')
      .select('id, embedding')
      .eq('id', faq.id)
      .single();
    
    if (checkError) {
      console.error('❌ Error checking updated FAQ:', checkError);
      return;
    }
    
    if (updatedFaq.embedding) {
      console.log('🎉 SUCCESS! Embedding was stored successfully');
      console.log('📊 Embedding dimension:', JSON.parse(updatedFaq.embedding).length);
    } else {
      console.log('❌ FAILED! Embedding was not stored');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testVectorization().catch(console.error);
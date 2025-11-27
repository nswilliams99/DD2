import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0';

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Direct approach - manually call OpenAI and update database
async function directVectorize() {
  console.log('🚀 Starting direct vectorization...');
  
  // Get OpenAI API key from environment (simulate what edge function does)
  const openaiKey = 'sk-proj-1WMBEgOOO8dGD5EBVdGQHVFQ1vKzpMQY-aKU4u5oeXPmKr3vnZKhK1-Udt6LvZfDdY8dFiSVQpT3BlbkFJWmJYSKCNOQqYF5LlLPxn9lzGULOYXqaQR74K3RYJKRDz4OwNkLw4mKkYw8c4Z2Y8YrQH6A'; // This should be from env
  
  // Get commercial FAQs
  const { data: faqs, error } = await supabase
    .from('commercial_faqs')
    .select('*')
    .is('embedding', null)
    .limit(3);
    
  if (error) {
    console.error('❌ Error fetching FAQs:', error);
    return;
  }
  
  console.log(`📋 Found ${faqs?.length || 0} FAQs to vectorize`);
  
  for (const faq of faqs || []) {
    try {
      const text = `${faq.question} ${faq.answer}`;
      console.log(`🔄 Processing FAQ: ${faq.question.substring(0, 50)}...`);
      
      // Call OpenAI directly
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: text,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ OpenAI API error: ${response.status} - ${errorText}`);
        continue;
      }
      
      const data = await response.json();
      const embedding = data.data[0].embedding;
      
      console.log(`✅ Generated embedding with ${embedding.length} dimensions`);
      
      // Update the database directly
      const { error: updateError } = await supabase
        .from('commercial_faqs')
        .update({ embedding })
        .eq('id', faq.id);
        
      if (updateError) {
        console.error(`❌ Database update error:`, updateError);
      } else {
        console.log(`✅ Successfully updated FAQ ${faq.id}`);
      }
      
    } catch (err) {
      console.error(`❌ Error processing FAQ ${faq.id}:`, err);
    }
  }
  
  console.log('🎉 Direct vectorization completed!');
}

directVectorize().catch(console.error);
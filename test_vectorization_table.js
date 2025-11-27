// Test vectorization with working parameters - DEBUGGED VERSION
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testVectorization() {
  console.log('🧪 Testing vectorization - DEBUGGED VERSION...');
  
  try {
    // Get all test records first
    const { data: allRecords, error: fetchError } = await supabase
      .from('vectorization_test')
      .select('id, title, content, embedding');
    
    if (fetchError) {
      console.error('❌ Error fetching records:', fetchError);
      return;
    }
    
    console.log(`📝 Found ${allRecords?.length || 0} test records`);
    
    if (!allRecords || allRecords.length === 0) {
      console.log('❌ No test records found');
      return;
    }
    
    // Process each record
    for (const record of allRecords) {
      console.log(`\n🔄 Processing: ${record.title}`);
      console.log(`Current embedding status: ${record.embedding ? 'HAS EMBEDDING' : 'NO EMBEDDING'}`);
      
      if (record.embedding) {
        console.log(`⏭️ Skipping ${record.title} - already has embedding`);
        continue;
      }
      
      // Prepare the content and metadata
      const content = `${record.title} ${record.content}`;
      const requestBody = {
        content: content,
        contentType: 'vectorization_test',
        title: record.title,
        metadata: {
          record_id: record.id,
          table_name: 'vectorization_test'
        }
      };
      
      console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
      
      try {
        console.log('🚀 Calling vectorize-content function...');
        const { data, error } = await supabase.functions.invoke('vectorize-content', {
          body: requestBody
        });
        
        if (error) {
          console.error(`❌ Function error for ${record.title}:`, error);
          continue;
        }
        
        console.log(`✅ Function response for ${record.title}:`, data);
        
        // Wait for the database to update
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Check if embedding was stored
        const { data: updatedRecord, error: checkError } = await supabase
          .from('vectorization_test')
          .select('id, title, embedding')
          .eq('id', record.id)
          .single();
        
        if (checkError) {
          console.error(`❌ Error checking result for ${record.title}:`, checkError);
          continue;
        }
        
        if (updatedRecord.embedding) {
          console.log(`🎉 SUCCESS! Embedding stored for ${record.title}`);
          console.log(`📊 Embedding length: ${Array.isArray(updatedRecord.embedding) ? updatedRecord.embedding.length : 'unknown'}`);
        } else {
          console.log(`❌ Embedding still null for ${record.title}`);
        }
        
      } catch (funcError) {
        console.error(`❌ Function call failed for ${record.title}:`, funcError);
      }
      
      // Delay between records
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Final status check
    console.log('\n🏁 FINAL STATUS CHECK:');
    const { data: finalRecords } = await supabase
      .from('vectorization_test')
      .select('id, title, embedding');
    
    finalRecords?.forEach(record => {
      const status = record.embedding ? '✅ HAS EMBEDDING' : '❌ NO EMBEDDING';
      const length = record.embedding && Array.isArray(record.embedding) ? ` (${record.embedding.length} dims)` : '';
      console.log(`${record.title}: ${status}${length}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testVectorization().catch(console.error);
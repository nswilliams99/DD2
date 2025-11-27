// Simple direct test of the vectorize-content function
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function simpleTest() {
  console.log('🧪 Simple vectorization test...');
  
  try {
    console.log('📞 Calling vectorize-content with simple test data...');
    
    const { data, error } = await supabase.functions.invoke('vectorize-content', {
      body: {
        content: 'Test FAQ 1 What is dumpster rental? Dumpster rental is a service where you can rent a dumpster for waste disposal.',
        contentType: 'test',
        title: 'Test FAQ 1',
        metadata: {
          record_id: 'test-123',
          table_name: 'test'
        }
      }
    });
    
    if (error) {
      console.error('❌ Function error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Function response:', data);
      console.log('Response details:', JSON.stringify(data, null, 2));
    }
    
  } catch (err) {
    console.error('❌ Request failed:', err);
  }
}

// Export for console use
window.simpleTest = simpleTest;

console.log('💡 Script loaded! Run: simpleTest() to test the function');
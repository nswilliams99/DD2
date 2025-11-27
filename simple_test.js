// Simple test in browser console
async function testVectorization() {
  console.log('🧪 Testing vectorization...');
  
  try {
    // Call the vectorize-content function with a simple test
    const response = await fetch('https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc'
      },
      body: JSON.stringify({
        content: 'Test FAQ 1 What is dumpster rental? Dumpster rental is a service where we provide temporary waste containers for construction, renovation, or cleanup projects.',
        contentType: 'vectorization_test',
        title: 'Test FAQ 1',
        metadata: {
          record_id: 'd4aecb10-9fc8-4a1c-ab48-cd2bfc65bfbf',
          table_name: 'vectorization_test'
        }
      })
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (!response.ok) {
      console.error('Error response:', response.status, data);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testVectorization();
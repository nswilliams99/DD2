// Debug the vectorize-content function call
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugFunction() {
  console.log('🔍 Debugging vectorize-content function...');
  
  // Test 1: Try to call the function with minimal data
  console.log('\n📞 Test 1: Minimal function call...');
  try {
    const response = await fetch('https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        content: 'Hello world test',
        contentType: 'test',
        title: 'Test'
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response body (raw):', text);
    
    try {
      const json = JSON.parse(text);
      console.log('Response body (parsed):', json);
    } catch (parseError) {
      console.log('Failed to parse response as JSON');
    }
    
  } catch (error) {
    console.error('❌ Direct fetch failed:', error);
  }
  
  // Test 2: Try using Supabase client
  console.log('\n📞 Test 2: Supabase client call...');
  try {
    const { data, error } = await supabase.functions.invoke('vectorize-content', {
      body: {
        content: 'Hello world test via client',
        contentType: 'test',
        title: 'Test Client'
      }
    });
    
    console.log('Supabase client response:', { data, error });
    
  } catch (clientError) {
    console.error('❌ Supabase client failed:', clientError);
  }
  
  // Test 3: Check if function exists by calling without body
  console.log('\n📞 Test 3: Function existence check...');
  try {
    const response = await fetch('https://cgizicrrzdbzvfniffhw.supabase.co/functions/v1/vectorize-content', {
      method: 'OPTIONS',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('OPTIONS response status:', response.status);
    console.log('CORS headers present:', response.headers.get('access-control-allow-origin'));
    
  } catch (optionsError) {
    console.error('❌ OPTIONS request failed:', optionsError);
  }
}

// Export for console use
window.debugFunction = debugFunction;

console.log('🔧 Debug script loaded! Run: debugFunction() to test the function calls');
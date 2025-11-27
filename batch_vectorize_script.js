// Quick script to trigger batch vectorization for all content
import { supabase } from './src/integrations/supabase/client.js';

const batchTypes = [
  'batch_page_sections',
  'batch_residential_faqs', 
  'batch_commercial_faqs',
  'batch_faqs',
  'batch_rolloff_faqs',
  'batch_services',
  'batch_residential_towns',
  'batch_rolloff_towns',
  'batch_commercial_sizes',
  'batch_rolloff_sizes'
];

async function triggerBatchVectorization() {
  console.log('🚀 Starting batch vectorization for all content...');
  
  for (const batchType of batchTypes) {
    try {
      console.log(`📝 Processing ${batchType}...`);
      
      const { data, error } = await supabase.functions.invoke('vectorize-content', {
        body: {
          contentType: batchType,
          batch: true,
          content: ''
        }
      });
      
      if (error) {
        console.error(`❌ Error processing ${batchType}:`, error);
      } else {
        console.log(`✅ ${batchType} processing initiated:`, data);
      }
      
      // Small delay between batch calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (err) {
      console.error(`❌ Failed to process ${batchType}:`, err.message);
    }
  }
  
  console.log('🎉 All batch vectorization requests sent!');
}

// Run the batch vectorization
triggerBatchVectorization().catch(console.error);
// Vectorize all production tables that need embeddings
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzU1NjgsImV4cCI6MjA2MTYxMTU2OH0.eng3nYcSl6Voz7VcYE0P4flgKqlhrw2hf7DPBpG96Cc';

const supabase = createClient(supabaseUrl, supabaseKey);

// Define all tables that need vectorization
const tablesToVectorize = [
  {
    table: 'faqs',
    contentFields: ['question', 'answer'],
    titleField: 'question',
    contentType: 'faqs'
  },
  {
    table: 'commercial_faqs', 
    contentFields: ['question', 'answer'],
    titleField: 'question',
    contentType: 'commercial_faqs'
  },
  {
    table: 'residential_faqs',
    contentFields: ['question', 'answer'], 
    titleField: 'question',
    contentType: 'residential_faqs'
  },
  {
    table: 'rolloff_faqs',
    contentFields: ['question', 'answer'],
    titleField: 'question', 
    contentType: 'rolloff_faqs'
  },
  {
    table: 'rolloff_size_faqs',
    contentFields: ['question', 'answer'],
    titleField: 'question',
    contentType: 'rolloff_size_faqs'
  },
  {
    table: 'services',
    contentFields: ['title', 'description', 'content'],
    titleField: 'title',
    contentType: 'services'
  },
  {
    table: 'residential_towns',
    contentFields: ['name', 'local_blurb', 'meta_description'],
    titleField: 'name', 
    contentType: 'residential_towns'
  },
  {
    table: 'rolloff_towns',
    contentFields: ['name', 'local_blurb', 'meta_description'],
    titleField: 'name',
    contentType: 'rolloff_towns'
  },
  {
    table: 'commercial_sizes',
    contentFields: ['title', 'description'],
    titleField: 'title',
    contentType: 'commercial_sizes'
  },
  {
    table: 'rolloff_sizes',
    contentFields: ['size_label', 'description', 'detailed_description'],
    titleField: 'size_label',
    contentType: 'rolloff_sizes'
  },
  {
    table: 'kb_articles',
    contentFields: ['title', 'content', 'excerpt'],
    titleField: 'title',
    contentType: 'kb_articles'
  },
  {
    table: 'page_sections',
    contentFields: ['title', 'description'],
    titleField: 'title', 
    contentType: 'page_section'
  }
];

async function vectorizeTable(tableConfig) {
  const { table, contentFields, titleField, contentType } = tableConfig;
  
  console.log(`\n🔄 Processing table: ${table}`);
  
  try {
    // Get records with null embeddings
    const { data: records, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .is('embedding', null);
    
    if (fetchError) {
      console.error(`❌ Error fetching from ${table}:`, fetchError);
      return { processed: 0, errors: 1 };
    }
    
    if (!records || records.length === 0) {
      console.log(`✅ No records need vectorization in ${table}`);
      return { processed: 0, errors: 0 };
    }
    
    console.log(`📝 Found ${records.length} records to vectorize in ${table}`);
    
    let processed = 0;
    let errors = 0;
    
    for (const record of records) {
      try {
        // Build content from specified fields
        const contentParts = contentFields
          .map(field => record[field])
          .filter(Boolean)
          .join(' ');
        
        if (!contentParts.trim()) {
          console.log(`⏭️ Skipping record with no content in ${table}`);
          continue;
        }
        
        const title = record[titleField] || `${table} record`;
        
        // Create metadata
        const metadata = {
          table_name: table,
          record_id: record.id,
          updated_at: record.updated_at || new Date().toISOString()
        };
        
        // Add table-specific metadata
        if (table === 'page_sections') {
          metadata.page_slug = record.page_slug;
          metadata.section_name = record.section_name;
          metadata.display_order = record.display_order;
        } else if (table.includes('towns')) {
          metadata.town_name = record.name;
          metadata.slug = record.slug;
          metadata.state = record.state || 'CO';
        } else if (table.includes('faqs')) {
          metadata.category = record.category || 'general';
          metadata.is_active = record.is_active !== false;
        }
        
        console.log(`📤 Vectorizing: ${title.substring(0, 50)}...`);
        
        const requestBody = {
          content: contentParts,
          contentType: contentType,
          title: title,
          metadata: metadata
        };
        
        const { data, error } = await supabase.functions.invoke('vectorize-content', {
          body: requestBody
        });
        
        if (error) {
          console.error(`❌ Function error for ${title}:`, error);
          errors++;
          continue;
        }
        
        console.log(`✅ Vectorized: ${title.substring(0, 50)}...`);
        processed++;
        
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (recordError) {
        console.error(`❌ Error processing record in ${table}:`, recordError);
        errors++;
      }
    }
    
    return { processed, errors };
    
  } catch (tableError) {
    console.error(`❌ Error processing table ${table}:`, tableError);
    return { processed: 0, errors: 1 };
  }
}

async function vectorizeAllTables() {
  console.log('🚀 Starting vectorization of all production tables...');
  
  const results = {
    totalProcessed: 0,
    totalErrors: 0,
    tableResults: {}
  };
  
  for (const tableConfig of tablesToVectorize) {
    const result = await vectorizeTable(tableConfig);
    results.totalProcessed += result.processed;
    results.totalErrors += result.errors;
    results.tableResults[tableConfig.table] = result;
    
    // Longer delay between tables
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🏁 VECTORIZATION COMPLETE!');
  console.log('📊 Final Results:');
  console.log(`Total records processed: ${results.totalProcessed}`);
  console.log(`Total errors: ${results.totalErrors}`);
  
  console.log('\n📋 Results by table:');
  Object.entries(results.tableResults).forEach(([table, result]) => {
    console.log(`${table}: ${result.processed} processed, ${result.errors} errors`);
  });
  
  return results;
}

// Export for use
window.vectorizeAllTables = vectorizeAllTables;

console.log('💡 Script loaded! Run: vectorizeAllTables() to start vectorization');
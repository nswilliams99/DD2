#!/usr/bin/env node

// Manual vectorization script using OpenAI API directly
// Run this with: node manual_vectorize.js

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const supabaseUrl = 'https://cgizicrrzdbzvfniffhw.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnaXppY3JyemRienZmbmlmZmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjAzNTU2OCwiZXhwIjoyMDYxNjExNTY4fQ.qhVdTw4nLqnADPb3-PsAZZGTKGLOlkfYk3LcJqZ5aR0';
const openaiKey = 'sk-proj-1WMBEgOOO8dGD5EBVdGQHVFQ1vKzpMQY-aKU4u5oeXPmKr3vnZKhK1-Udt6LvZfDdY8dFiSVQpT3BlbkFJWmJYSKCNOQqYF5LlLPxn9lzGULOYXqaQR74K3RYJKRDz4OwNkLw4mKkYw8c4Z2Y8YrQH6A';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function generateEmbedding(text) {
  console.log(`🔄 Generating embedding for: "${text.substring(0, 100)}..."`);
  
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
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function processTable(tableName, textColumns, whereClause = 'embedding IS NULL') {
  console.log(`\n📋 Processing table: ${tableName}`);
  
  const { data: records, error } = await supabase
    .from(tableName)
    .select('*')
    .is('embedding', null);
    
  if (error) {
    console.error(`❌ Error fetching ${tableName}:`, error);
    return;
  }
  
  console.log(`Found ${records?.length || 0} records to process`);
  
  for (const record of records || []) {
    try {
      let text = '';
      
      // Build text based on table type
      switch (tableName) {
        case 'commercial_faqs':
        case 'residential_faqs':
        case 'faqs':
        case 'rolloff_faqs':
          text = `${record.question || ''} ${record.answer || ''}`;
          break;
        case 'services':
          text = `${record.title || ''} ${record.description || ''} ${record.content || ''}`;
          break;
        case 'residential_towns':
        case 'rolloff_towns':
          text = `${record.name || ''} ${record.local_blurb || ''} ${record.meta_description || ''}`;
          break;
        case 'commercial_sizes':
          text = `${record.title || ''} ${record.description || ''}`;
          break;
        case 'rolloff_sizes':
          text = `${record.size_label || ''} ${record.description || ''} ${record.detailed_description || ''}`;
          break;
        default:
          text = `${record.title || ''} ${record.description || ''}`;
      }
      
      if (!text.trim()) {
        console.log(`⏭️  Skipping empty record: ${record.id}`);
        continue;
      }
      
      console.log(`🔄 Processing ${tableName} record: ${record.id}`);
      
      const embedding = await generateEmbedding(text.trim());
      
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ embedding })
        .eq('id', record.id);
        
      if (updateError) {
        console.error(`❌ Failed to update ${record.id}:`, updateError);
      } else {
        console.log(`✅ Successfully processed ${record.id}`);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error(`❌ Error processing ${tableName} record ${record.id}:`, err.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting manual vectorization of all content...');
  
  const tables = [
    'commercial_faqs',
    'residential_faqs', 
    'faqs',
    'rolloff_faqs',
    'services',
    'residential_towns',
    'rolloff_towns', 
    'commercial_sizes',
    'rolloff_sizes'
  ];
  
  for (const table of tables) {
    await processTable(table);
  }
  
  console.log('🎉 Manual vectorization completed!');
}

main().catch(console.error);
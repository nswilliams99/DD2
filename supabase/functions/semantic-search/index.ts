
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateQueryEmbedding(query: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: query,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, contentType, threshold = 0.7, limit = 10 } = await req.json();

    console.log('Semantic search:', { query, contentType, threshold, limit });

    // Generate embedding for the search query
    const queryEmbedding = await generateQueryEmbedding(query);

    // Search for similar documents using the database function
    const { data: results, error } = await supabase.rpc('search_similar_documents', {
      query_embedding: queryEmbedding,
      match_threshold: threshold,
      match_count: limit,
      content_type_filter: contentType || null
    });

    if (error) {
      throw new Error(`Search failed: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        results: results || [],
        query,
        total: results?.length || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Search error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        results: []
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

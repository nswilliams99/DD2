
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VectorizeRequest {
  content: string;
  contentType: 'faq' | 'blurb' | 'full_page';
  townSlug?: string;
  faqId?: string;
  metadata?: Record<string, any>;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const openAIKey = Deno.env.get('OPENAI_API_KEY');

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function vectorizeFAQ(faqId: string, content: string) {
  const embedding = await generateEmbedding(content);
  
  const { error } = await supabase
    .from('rolloff_faq_embeddings')
    .upsert({
      faq_id: faqId,
      embedding,
      content_text: content,
    });

  if (error) throw error;
}

async function vectorizePageContent(townSlug: string, content: string, chunkType: string, metadata: Record<string, any> = {}) {
  const embedding = await generateEmbedding(content);
  
  const { error } = await supabase
    .from('rolloff_page_embeddings')
    .upsert({
      town_slug: townSlug,
      content_chunk: content,
      chunk_type: chunkType,
      embedding,
      metadata,
    });

  if (error) throw error;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { content, contentType, townSlug, faqId, metadata }: VectorizeRequest = await req.json();

    console.log(`Vectorizing ${contentType} content:`, { townSlug, faqId });

    switch (contentType) {
      case 'faq':
        if (!faqId) throw new Error('FAQ ID required for FAQ vectorization');
        await vectorizeFAQ(faqId, content);
        break;
      
      case 'blurb':
      case 'full_page':
        if (!townSlug) throw new Error('Town slug required for page content vectorization');
        await vectorizePageContent(townSlug, content, contentType, metadata);
        break;
      
      default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully vectorized ${contentType} content` 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Vectorization error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);

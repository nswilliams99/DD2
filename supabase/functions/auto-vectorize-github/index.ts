
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('GitHub webhook received:', payload);

    // Handle GitHub push events
    if (payload.ref && payload.commits) {
      console.log('Processing GitHub push event');
      
      // Get changed files from commits
      const changedFiles = [];
      for (const commit of payload.commits) {
        changedFiles.push(...(commit.added || []), ...(commit.modified || []));
      }

      // Filter for relevant file types
      const relevantFiles = changedFiles.filter(file => 
        file.endsWith('.md') || 
        file.endsWith('.txt') || 
        file.endsWith('.tsx') || 
        file.endsWith('.ts') ||
        file.includes('content/')
      );

      console.log('Relevant files to vectorize:', relevantFiles);

      // Queue vectorization jobs for each relevant file
      for (const file of relevantFiles) {
        const { error } = await supabase
          .from('vectorization_jobs')
          .insert({
            source_type: 'github',
            source_path: file,
            status: 'pending'
          });

        if (error) {
          console.error('Failed to queue vectorization job:', error);
        }
      }

      // Trigger the vectorize-content function for each file
      for (const file of relevantFiles) {
        try {
          // In a real implementation, you'd fetch the file content from GitHub
          // For now, we'll create a placeholder
          await supabase.functions.invoke('vectorize-content', {
            body: {
              content: `Content from GitHub file: ${file}`,
              contentType: 'page',
              sourceUrl: `${payload.repository?.html_url}/blob/${payload.ref}/${file}`,
              filePath: file,
              title: `GitHub: ${file}`,
              metadata: {
                github_repo: payload.repository?.full_name,
                commit_sha: payload.after,
                branch: payload.ref?.replace('refs/heads/', ''),
                auto_generated: true
              }
            }
          });
        } catch (error) {
          console.error('Failed to vectorize file:', file, error);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

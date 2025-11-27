
-- Enable the vector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table for storing document embeddings
CREATE TABLE public.document_embeddings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'page', 'pdf', 'image', 'upload'
  source_url TEXT,
  file_path TEXT,
  title TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding vector(1536), -- OpenAI ada-002 embedding dimension
  word_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index for fast vector similarity search
CREATE INDEX document_embeddings_embedding_idx ON public.document_embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create an index for metadata queries
CREATE INDEX document_embeddings_metadata_idx ON public.document_embeddings USING gin (metadata);

-- Create an index for content type filtering
CREATE INDEX document_embeddings_content_type_idx ON public.document_embeddings (content_type);

-- Enable Row Level Security
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for search functionality)
CREATE POLICY "Public can read embeddings" 
  ON public.document_embeddings 
  FOR SELECT 
  USING (true);

-- Create policy for authenticated users to insert/update embeddings
CREATE POLICY "Authenticated users can manage embeddings" 
  ON public.document_embeddings 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create a function to search similar documents
CREATE OR REPLACE FUNCTION public.search_similar_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  content_type_filter text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  content text,
  content_type text,
  source_url text,
  title text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    document_embeddings.id,
    document_embeddings.content,
    document_embeddings.content_type,
    document_embeddings.source_url,
    document_embeddings.title,
    document_embeddings.metadata,
    (1 - (document_embeddings.embedding <=> query_embedding)) AS similarity
  FROM document_embeddings
  WHERE 
    (content_type_filter IS NULL OR document_embeddings.content_type = content_type_filter)
    AND (1 - (document_embeddings.embedding <=> query_embedding)) > match_threshold
  ORDER BY document_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create a table for tracking vectorization jobs
CREATE TABLE public.vectorization_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type TEXT NOT NULL, -- 'github', 'upload', 'page'
  source_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for job status queries
CREATE INDEX vectorization_jobs_status_idx ON public.vectorization_jobs (status);

-- Enable RLS for vectorization jobs
ALTER TABLE public.vectorization_jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to manage jobs
CREATE POLICY "Authenticated users can manage vectorization jobs" 
  ON public.vectorization_jobs 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create a function to update embeddings timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to update timestamps
CREATE TRIGGER update_document_embeddings_updated_at 
  BEFORE UPDATE ON public.document_embeddings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vectorization_jobs_updated_at 
  BEFORE UPDATE ON public.vectorization_jobs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

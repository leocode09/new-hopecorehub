
-- Create table for user preferences including low-data mode
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  low_data_mode BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  lazy_loading_enabled BOOLEAN DEFAULT TRUE,
  offline_mode_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for user preferences
CREATE POLICY "Users can view their own preferences" 
  ON public.user_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
  ON public.user_preferences 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
  ON public.user_preferences 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create table for search history (for offline search)
CREATE TABLE IF NOT EXISTS public.search_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  search_term TEXT NOT NULL,
  search_type TEXT NOT NULL CHECK (search_type IN ('forum', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for search history
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;

-- Create policies for search history
CREATE POLICY "Users can view their own search history" 
  ON public.search_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search history" 
  ON public.search_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Add full-text search to forum posts
ALTER TABLE public.forum_posts 
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS forum_posts_search_idx ON public.forum_posts USING gin(search_vector);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION update_forum_posts_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.content, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS forum_posts_search_vector_update ON public.forum_posts;
CREATE TRIGGER forum_posts_search_vector_update
  BEFORE INSERT OR UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_forum_posts_search_vector();

-- Update existing posts with search vectors
UPDATE public.forum_posts 
SET search_vector = to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(content, ''))
WHERE search_vector IS NULL;


-- Add columns to forum_posts table for edit tracking
ALTER TABLE forum_posts 
ADD COLUMN IF NOT EXISTS is_edited BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS edited_at TIMESTAMP WITH TIME ZONE;

-- Create RLS policies for forum_posts if they don't exist
DO $$
BEGIN
    -- Enable RLS on forum_posts
    ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
    
    -- Policy for viewing posts (everyone can view)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'forum_posts_select_policy'
    ) THEN
        CREATE POLICY forum_posts_select_policy ON forum_posts
            FOR SELECT USING (true);
    END IF;
    
    -- Policy for inserting posts (authenticated users)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'forum_posts_insert_policy'
    ) THEN
        CREATE POLICY forum_posts_insert_policy ON forum_posts
            FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    END IF;
    
    -- Policy for updating posts (only post author)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'forum_posts_update_policy'
    ) THEN
        CREATE POLICY forum_posts_update_policy ON forum_posts
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    -- Policy for deleting posts (only post author)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_posts' AND policyname = 'forum_posts_delete_policy'
    ) THEN
        CREATE POLICY forum_posts_delete_policy ON forum_posts
            FOR DELETE USING (auth.uid() = user_id);
    END IF;

EXCEPTION WHEN OTHERS THEN
    -- Handle any errors silently for policies that might already exist
    NULL;
END $$;

-- Create RLS policies for forum_replies if they don't exist
DO $$
BEGIN
    -- Enable RLS on forum_replies
    ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
    
    -- Policy for viewing replies (everyone can view)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_replies' AND policyname = 'forum_replies_select_policy'
    ) THEN
        CREATE POLICY forum_replies_select_policy ON forum_replies
            FOR SELECT USING (true);
    END IF;
    
    -- Policy for inserting replies (authenticated users)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_replies' AND policyname = 'forum_replies_insert_policy'
    ) THEN
        CREATE POLICY forum_replies_insert_policy ON forum_replies
            FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    END IF;
    
    -- Policy for updating replies (only reply author)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_replies' AND policyname = 'forum_replies_update_policy'
    ) THEN
        CREATE POLICY forum_replies_update_policy ON forum_replies
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    -- Policy for deleting replies (only reply author)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'forum_replies' AND policyname = 'forum_replies_delete_policy'
    ) THEN
        CREATE POLICY forum_replies_delete_policy ON forum_replies
            FOR DELETE USING (auth.uid() = user_id);
    END IF;

EXCEPTION WHEN OTHERS THEN
    -- Handle any errors silently for policies that might already exist
    NULL;
END $$;

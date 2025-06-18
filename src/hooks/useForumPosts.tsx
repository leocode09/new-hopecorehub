
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ForumPost {
  id: string;
  content: string;
  title?: string;
  is_anonymous: boolean;
  likes_count: number;
  replies_count: number;
  created_at: string;
  user_id?: string;
  isLiked?: boolean;
}

export const useForumPosts = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data: postsData, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check which posts are liked by current user
      let postsWithLikes = postsData || [];
      if (user) {
        const { data: likesData } = await supabase
          .from('forum_post_likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(likesData?.map(like => like.post_id) || []);
        postsWithLikes = postsData?.map(post => ({
          ...post,
          isLiked: likedPostIds.has(post.id)
        })) || [];
      }

      setPosts(postsWithLikes);
    } catch (error: any) {
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a post",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          content: content.trim(),
          user_id: user.id,
          is_anonymous: true
        });

      if (error) throw error;

      toast({
        title: "Post created",
        description: "Your post has been shared with the community"
      });

      await fetchPosts(); // Refresh posts
      return true;
    } catch (error: any) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.isLiked) {
        // Remove like
        const { error } = await supabase
          .from('forum_post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Add like
        const { error } = await supabase
          .from('forum_post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        if (error) throw error;
      }

      // Update local state immediately for better UX
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                likes_count: post.isLiked ? post.likes_count - 1 : post.likes_count + 1
              }
            : post
        )
      );

    } catch (error: any) {
      toast({
        title: "Error updating like",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    refreshPosts: fetchPosts
  };
};


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ForumPost } from '@/hooks/useForumPosts';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ForumPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();

  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .textSearch('search_vector', query)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Save search history if user is logged in
      if (user) {
        await supabase
          .from('search_history')
          .insert({
            user_id: user.id,
            search_term: query,
            search_type: 'forum'
          });
      }

      setSearchResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchPosts(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching
  };
};

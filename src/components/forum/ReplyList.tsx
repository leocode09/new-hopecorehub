
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Reply {
  id: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  user_id?: string;
}

interface ReplyListProps {
  postId: string;
  isVisible: boolean;
}

const ReplyList = ({ postId, isVisible }: ReplyListProps) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchReplies = async () => {
    if (!isVisible) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading replies",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [postId, isVisible]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1d ago";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-[#9E78E9] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : replies.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-4">
          No replies yet. Be the first to reply! 💜
        </p>
      ) : (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
            Replies ({replies.length})
          </h4>
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-[#9E78E9] to-[#8B69D6] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Anonymous</span>
                  <span className="text-xs text-gray-500 ml-2">{formatTimeAgo(reply.created_at)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReplyList;

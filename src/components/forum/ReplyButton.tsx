
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReplyButtonProps {
  postId: string;
  repliesCount: number;
  onReplyAdded: () => void;
}

const ReplyButton = ({ postId, repliesCount, onReplyAdded }: ReplyButtonProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitReply = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply to posts",
        variant: "destructive"
      });
      return;
    }

    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: replyContent.trim(),
          is_anonymous: true
        });

      if (error) throw error;

      toast({
        title: "Reply posted",
        description: "Your reply has been added to the discussion"
      });

      setReplyContent("");
      setIsReplying(false);
      onReplyAdded();
    } catch (error: any) {
      toast({
        title: "Error posting reply",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsReplying(!isReplying)}
        className="text-gray-500 hover:text-[#9E78E9]"
        aria-label={`View or add replies (${repliesCount} replies)`}
      >
        <MessageCircle className="w-4 h-4 mr-1" />
        {repliesCount}
      </Button>

      {isReplying && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Reply anonymously
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(false)}
              className="w-6 h-6 p-0"
              aria-label="Cancel reply"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px] mb-3 border-gray-200 dark:border-gray-700"
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {replyContent.length}/500 characters
            </span>
            <Button
              onClick={handleSubmitReply}
              disabled={!replyContent.trim() || isSubmitting}
              size="sm"
              className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyButton;

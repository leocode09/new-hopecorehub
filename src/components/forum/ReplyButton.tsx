
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forumReplySchema } from "@/lib/validationSchemas";
import { z } from "zod";

interface ReplyButtonProps {
  postId: string;
  repliesCount: number;
  onReplyAdded: () => void;
}

type FormData = z.infer<typeof forumReplySchema>;

const ReplyButton = ({ postId, repliesCount, onReplyAdded }: ReplyButtonProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(forumReplySchema),
    defaultValues: { content: "" }
  });

  const watchedContent = watch("content");

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply to posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: data.content.trim(),
          is_anonymous: true
        });

      if (error) throw error;

      toast({
        title: "Reply posted",
        description: "Your reply has been added to the discussion"
      });

      reset();
      setIsReplying(false);
      onReplyAdded();
    } catch (error: any) {
      toast({
        title: "Error posting reply",
        description: error.message,
        variant: "destructive"
      });
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
        <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" />
        {repliesCount}
      </Button>

      {isReplying && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reply anonymously
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(false)}
                className="w-6 h-6 p-0"
                aria-label="Cancel reply"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <Textarea
                {...register("content")}
                placeholder="Write your reply..."
                className="min-h-[80px] border-gray-200 dark:border-gray-700"
                maxLength={500}
                aria-label="Reply content"
                aria-describedby={errors.content ? "reply-error" : "reply-help"}
              />
              {errors.content && (
                <p id="reply-error" className="text-sm text-red-600 mt-1" role="alert">
                  {errors.content.message}
                </p>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span id="reply-help" className="text-xs text-gray-500">
                {watchedContent?.length || 0}/500 characters
              </span>
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
                aria-label="Post reply"
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
          </form>
        </div>
      )}
    </div>
  );
};

export default ReplyButton;


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forumPostSchema } from "@/lib/validationSchemas";
import { z } from "zod";

type FormData = z.infer<typeof forumPostSchema>;

interface ForumPostFormProps {
  onSubmit: (data: FormData) => Promise<boolean>;
  isSubmitting: boolean;
}

export const ForumPostForm = ({ onSubmit, isSubmitting }: ForumPostFormProps) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(forumPostSchema),
    defaultValues: { content: "" }
  });

  const watchedContent = watch("content");

  const handleFormSubmit = async (data: FormData) => {
    const success = await onSubmit(data);
    if (success) {
      reset();
    }
  };

  return (
    <Card className="mb-6 border-[#9E78E9]/20 shadow-sm post-creation-form">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
          <div>
            <Textarea
              {...register("content")}
              placeholder="Share your thoughts, experiences, or ask for support..."
              className="min-h-[100px] resize-none border-gray-200 dark:border-gray-700 focus:border-[#9E78E9] focus:ring-[#9E78E9]/20"
              maxLength={1000}
              aria-label="Write your forum post"
              aria-describedby={errors.content ? "post-error" : "post-help"}
            />
            {errors.content && (
              <p id="post-error" className="text-sm text-red-600 mt-1" role="alert">
                {errors.content.message}
              </p>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <p>Your post will be anonymous</p>
              <p id="post-help">{watchedContent?.length || 0}/1000 characters</p>
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white px-6"
              size="sm"
              aria-label="Post your message"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

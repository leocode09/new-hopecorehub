
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Save, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forumPostSchema } from "@/lib/validationSchemas";
import { z } from "zod";

interface ForumPostActionsProps {
  postId: string;
  currentContent: string;
  userId: string;
  onUpdate: () => void;
}

type FormData = z.infer<typeof forumPostSchema>;

const ForumPostActions = ({ postId, currentContent, userId, onUpdate }: ForumPostActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(forumPostSchema),
    defaultValues: { content: currentContent }
  });

  const canEdit = user?.id === userId;

  const handleEdit = () => {
    setIsEditing(true);
    reset({ content: currentContent });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('forum_posts')
        .update({ content: data.content.trim() })
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post updated",
        description: "Your post has been successfully updated"
      });

      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error updating post",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "Your post has been removed"
      });

      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!canEdit) return null;

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-3">
        <div>
          <Textarea
            {...register("content")}
            className="min-h-[100px] border-gray-200 dark:border-gray-700"
            aria-label="Edit post content"
            aria-describedby={errors.content ? "content-error" : undefined}
          />
          {errors.content && (
            <p id="content-error" className="text-sm text-red-600 mt-1" role="alert">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="bg-[#9E78E9] hover:bg-[#8B69D6]"
            aria-label="Save changes to post"
          >
            <Save className="w-3 h-3 mr-1" />
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
            aria-label="Cancel editing"
          >
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex gap-2 mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleEdit}
        className="text-gray-500 hover:text-[#9E78E9] p-1"
        aria-label="Edit this post"
      >
        <Edit className="w-3 h-3" />
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500 p-1"
            aria-label="Delete this post"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ForumPostActions;

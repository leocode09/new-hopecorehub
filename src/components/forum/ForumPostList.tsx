
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ForumPost from "./ForumPost";
import { ForumPost as ForumPostType } from "@/hooks/useForumPosts";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";

interface ForumPostListProps {
  posts: ForumPostType[];
  loading: boolean;
  onToggleLike: (postId: string) => void;
  onReplyAdded: () => void;
  onPostUpdated: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ForumPostList = ({ 
  posts, 
  loading, 
  onToggleLike, 
  onReplyAdded, 
  onPostUpdated,
  currentPage,
  totalPages,
  onPageChange
}: ForumPostListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8" role="status" aria-label="Loading posts">
        <Loader2 className="w-8 h-8 animate-spin text-[#9E78E9]" />
        <span className="sr-only">Loading forum posts...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="border-[#9E78E9]/20">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            No posts yet. Be the first to share something with the community! 💜
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ForumPost
          key={post.id}
          post={post}
          onToggleLike={onToggleLike}
          onReplyAdded={onReplyAdded}
          onPostUpdated={onPostUpdated}
        />
      ))}

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

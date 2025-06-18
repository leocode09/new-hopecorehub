
import BottomNav from "@/components/BottomNav";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { ForumPostForm } from "@/components/forum/ForumPostForm";
import { ForumPostList } from "@/components/forum/ForumPostList";
import { ForumSearch } from "@/components/forum/ForumSearch";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { Card, CardContent } from "@/components/ui/card";
import { useForumPosts } from "@/hooks/useForumPosts";
import { useSearch } from "@/hooks/useSearch";
import { forumPostSchema } from "@/lib/validationSchemas";
import { z } from "zod";

type FormData = z.infer<typeof forumPostSchema>;

const Forum = () => {
  const { posts, loading, createPost, toggleLike, refreshPosts, currentPage, totalPages, changePage } = useForumPosts();
  const { searchTerm, setSearchTerm, searchResults, isSearching } = useSearch();

  const handleReplyAdded = () => {
    refreshPosts();
  };

  const handlePostUpdated = () => {
    refreshPosts();
  };

  const handleSubmit = async (data: FormData) => {
    return await createPost(data.content);
  };

  const displayPosts = searchTerm ? searchResults : posts;
  const showPagination = !searchTerm;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <ForumHeader />
        
        <ForumPostForm onSubmit={handleSubmit} isSubmitting={false} />
        
        <ForumSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isSearching={isSearching}
        />

        <main>
          <ForumPostList
            posts={displayPosts}
            loading={loading || isSearching}
            onToggleLike={toggleLike}
            onReplyAdded={handleReplyAdded}
            onPostUpdated={handlePostUpdated}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={showPagination ? changePage : () => {}}
          />
        </main>

        {/* Safe Space Notice */}
        <Card className="mt-6 border-[#9E78E9]/20 bg-[#D3E4FD]/10">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              💜 This is a safe, moderated space. All posts are anonymous and supportive.
            </p>
          </CardContent>
        </Card>
      </div>

      <OnboardingTour />
      <BottomNav />
    </div>
  );
};

export default Forum;

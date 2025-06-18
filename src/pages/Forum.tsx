
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { Heart, MessageCircle, Send, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForumPosts } from "@/hooks/useForumPosts";
import { useAuth } from "@/hooks/useAuth";

const Forum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { posts, loading, createPost, toggleLike } = useForumPosts();
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    const success = await createPost(postContent);
    if (success) {
      setPostContent("");
    }
    setIsSubmitting(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full p-0 text-[#9E78E9] hover:bg-[#9E78E9]/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#9E78E9]">Forum</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Safe space to share</p>
            </div>
          </div>
        </div>

        {/* Post Creation */}
        <Card className="mb-6 border-[#9E78E9]/20 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Textarea
                placeholder="Share your thoughts, experiences, or ask for support..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[100px] resize-none border-gray-200 dark:border-gray-700 focus:border-[#9E78E9] focus:ring-[#9E78E9]/20"
                maxLength={1000}
              />
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <p>Your post will be anonymous</p>
                  <p>{postContent.length}/1000 characters</p>
                </div>
                <Button 
                  onClick={handlePost}
                  disabled={!postContent.trim() || isSubmitting}
                  className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white px-6"
                  size="sm"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-[#9E78E9]" />
          </div>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {!loading && posts.length === 0 && (
            <Card className="border-[#9E78E9]/20">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No posts yet. Be the first to share something with the community! 💜
                </p>
              </CardContent>
            </Card>
          )}

          {posts.map((post) => (
            <Card key={post.id} className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Post Header */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#9E78E9] to-[#8B69D6] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Anonymous</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(post.created_at)}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleLike(post.id)}
                        className={`text-gray-500 hover:text-[#9E78E9] ${
                          post.isLiked ? 'text-[#9E78E9]' : ''
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-[#9E78E9]' : ''}`} 
                        />
                        {post.likes_count || 0}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#9E78E9]">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.replies_count || 0}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#9E78E9] hover:bg-[#9E78E9]/10 text-sm"
                      disabled
                    >
                      Reply (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safe Space Notice */}
        <Card className="mt-6 border-[#9E78E9]/20 bg-[#D3E4FD]/10">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              💜 This is a safe, moderated space. All posts are anonymous and supportive.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Forum;

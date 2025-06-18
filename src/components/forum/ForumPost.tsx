
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import ReplyButton from "./ReplyButton";
import ReplyList from "./ReplyList";
import { ForumPost as ForumPostType } from "@/hooks/useForumPosts";

interface ForumPostProps {
  post: ForumPostType;
  onToggleLike: (postId: string) => void;
  onReplyAdded: () => void;
}

const ForumPost = ({ post, onToggleLike, onReplyAdded }: ForumPostProps) => {
  const [showReplies, setShowReplies] = useState(false);

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

  const handleReplyClick = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyAdded = () => {
    onReplyAdded();
    setShowReplies(true); // Show replies after adding one
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
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
                onClick={() => onToggleLike(post.id)}
                className={`text-gray-500 hover:text-[#9E78E9] ${
                  post.isLiked ? 'text-[#9E78E9]' : ''
                }`}
                aria-label={`${post.isLiked ? 'Unlike' : 'Like'} post (${post.likes_count} likes)`}
              >
                <Heart 
                  className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-[#9E78E9]' : ''}`} 
                />
                {post.likes_count || 0}
              </Button>
              
              <div onClick={handleReplyClick}>
                <ReplyButton 
                  postId={post.id}
                  repliesCount={post.replies_count || 0}
                  onReplyAdded={handleReplyAdded}
                />
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReplyClick}
              className="text-[#9E78E9] hover:bg-[#9E78E9]/10 text-sm"
            >
              {showReplies ? 'Hide Replies' : 'View Replies'}
            </Button>
          </div>

          {/* Replies Section */}
          <ReplyList postId={post.id} isVisible={showReplies} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ForumPost;

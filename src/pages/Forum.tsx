
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BottomNav from "@/components/BottomNav";
import { Heart, MessageCircle, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Forum = () => {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Finding strength in small steps today. Thank you to everyone in this community for reminding me I'm not alone. 💙",
      author: "Anonymous",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 3,
      isLiked: false
    },
    {
      id: 2,
      content: "Does anyone have tips for managing anxiety during the healing process? Some days feel harder than others.",
      author: "Survivor",
      timestamp: "5 hours ago",
      likes: 8,
      replies: 7,
      isLiked: false
    }
  ]);

  const handlePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        content: postContent,
        author: "Anonymous",
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        isLiked: false
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
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
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Your post will be anonymous</p>
                <Button 
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white px-6"
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Post Header */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#9E78E9] to-[#8B69D6] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className={`text-gray-500 hover:text-red-500 ${
                          post.isLiked ? 'text-[#9E78E9]' : ''
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-[#9E78E9]' : ''}`} 
                        />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#9E78E9]">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.replies}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#9E78E9] hover:bg-[#9E78E9]/10 text-sm"
                    >
                      Reply
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

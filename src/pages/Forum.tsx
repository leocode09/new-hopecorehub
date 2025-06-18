
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { MessageCircle, Plus, Heart, Shield } from "lucide-react";

const Forum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#9E78E9]">Survivors' Forum</h1>
            <p className="text-gray-600 dark:text-gray-300">Share and connect safely</p>
          </div>
          <Button className="bg-[#9E78E9] hover:bg-[#8B69D6]">
            <Plus className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>

        {/* Safe Space Notice */}
        <Card className="mb-6 border-[#9E78E9]/20 bg-[#D3E4FD]/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#9E78E9] mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This is a moderated safe space. All posts are anonymous by default. 
                  Be kind and supportive to others.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Posts - Will be replaced with real data when Supabase is connected */}
        <div className="space-y-4">
          <Card className="border-[#9E78E9]/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#9E78E9] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Anonymous</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Finding strength in small steps today. Thank you to everyone in this community for reminding me I'm not alone. 💙
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Heart className="w-4 h-4 mr-1" />
                  12
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  3 replies
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#9E78E9]/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#9E78E9] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Survivor</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Does anyone have tips for managing anxiety during the healing process? Some days feel harder than others.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Heart className="w-4 h-4 mr-1" />
                  8
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  7 replies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Note */}
        <Card className="mt-6 border-[#9E78E9]/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              💜 Forum features will be fully activated when we connect Supabase
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Forum;

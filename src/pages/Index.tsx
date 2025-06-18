
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import BottomNav from "@/components/BottomNav";
import ProfileAction from "@/components/ProfileAction";
import SOSButton from "@/components/SOSButton";
import { Heart, MessageCircle, Bot, Users, Shield, Phone, Moon, Sun } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const isGuest = localStorage.getItem("hopecore-guest-mode") === "true";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-24">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header with Profile Action and Theme Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="scale-[2] origin-left">
            <ProfileAction />
          </div>
          <div className="flex-1"></div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full p-0 text-[#9E78E9] hover:bg-[#9E78E9]/10"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 bg-[#9E78E9] rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#9E78E9] mb-2">HopeCore Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your safe space for healing and support
          </p>
        </div>

        {/* Welcome Message */}
        {user ? (
          <Card className="mb-6 border-[#9E78E9]/20 bg-[#D3E4FD]/20">
            <CardContent className="p-4">
              <p className="text-center text-gray-700 dark:text-gray-300">
                💜 Welcome back! We're here to support your healing journey.
              </p>
            </CardContent>
          </Card>
        ) : isGuest ? (
          <Card className="mb-6 border-[#9E78E9]/20 bg-[#D3E4FD]/20">
            <CardContent className="p-4">
              <p className="text-center text-gray-700 dark:text-gray-300">
                💜 Welcome! You're using guest mode. Create an account to access all features.
              </p>
              <Button 
                onClick={() => navigate('/welcome')}
                className="w-full mt-3 bg-[#9E78E9] hover:bg-[#8B69D6]"
                size="sm"
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-6 border-[#9E78E9]/20">
            <CardContent className="p-4 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Join our supportive community and start your healing journey.
              </p>
              <Button 
                onClick={() => navigate('/welcome')}
                className="bg-[#9E78E9] hover:bg-[#8B69D6]"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        {/* SOS Button */}
        <div className="mb-6">
          <SOSButton />
        </div>

        {/* Main Features */}
        <div className="space-y-4">
          <Card className="border-[#9E78E9]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#9E78E9] flex items-center">
                <MessageCircle className="w-6 h-6 mr-3" />
                Survivors' Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect with others who understand your journey. Share experiences and find support in a safe, moderated space.
              </p>
              <Button 
                onClick={() => navigate('/forum')}
                variant="outline" 
                className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/30"
              >
                Visit Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#9E78E9]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#9E78E9] flex items-center">
                <Bot className="w-6 h-6 mr-3" />
                Mahoro AI Companion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Chat with Mahoro, your AI companion trained to provide emotional support and guidance in multiple languages.
              </p>
              <Button 
                onClick={() => navigate('/mahoro')}
                variant="outline" 
                className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/30"
              >
                Chat with Mahoro
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#9E78E9]/20 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#9E78E9] flex items-center">
                <Users className="w-6 h-6 mr-3" />
                Muganga Platform
                {!user && !isGuest && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect with professional counselors and mental health resources in Rwanda.
                {!user && !isGuest && " (Account required)"}
              </p>
              <Button 
                onClick={() => navigate('/muganga')}
                variant="outline" 
                className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/30"
              >
                {user || isGuest ? "Find Support" : "Create Account to Access"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Section */}
        <Card className="mt-6 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center">
              <Phone className="w-6 h-6 mr-3" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Isange One Stop Center:</strong> 3029
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rwanda National Police:</strong> 3512
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Crisis Support:</strong> Available 24/7
            </p>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mt-6 border-[#9E78E9]/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#9E78E9] mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Your privacy is protected:</strong> All communications are encrypted and 
                  forum posts are anonymous by default. You control what you share.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

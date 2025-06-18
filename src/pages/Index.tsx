
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SOSButton from "@/components/SOSButton";
import { MessageCircle, Bot, Heart, Users, Shield, Phone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "Survivors' Forum",
      description: "Connect anonymously with others who understand",
      path: "/forum",
      color: "bg-blue-50 dark:bg-blue-950"
    },
    {
      icon: Bot,
      title: "Mahoro AI",
      description: "24/7 supportive AI companion in your language",
      path: "/mahoro",
      color: "bg-purple-50 dark:bg-purple-950"
    },
    {
      icon: Heart,
      title: "Muganga Therapy",
      description: "Professional counseling sessions",
      path: "/muganga",
      color: "bg-pink-50 dark:bg-pink-950"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#9E78E9] mb-2">HopeCore Hub</h1>
          <p className="text-gray-600 dark:text-gray-300 italic">
            "Healing Begins When The Silence Ends"
          </p>
        </div>

        {/* SOS Button */}
        <div className="mb-6">
          <SOSButton />
        </div>

        {/* Welcome Message */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to your safe space. You are not alone on this journey. 
              Take your time and access the support you need.
            </p>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="space-y-4">
          {features.map((feature) => (
            <Card 
              key={feature.path} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-[#9E78E9]/20"
              onClick={() => navigate(feature.path)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className="w-6 h-6 text-[#9E78E9]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-[#9E78E9]">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access */}
        <div className="mt-8 space-y-3">
          <h3 className="text-lg font-semibold text-[#9E78E9] text-center">Quick Access</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate("/profile")}
              className="border-[#9E78E9]/30 text-[#9E78E9] hover:bg-[#D3E4FD]/30"
            >
              <Users className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open("tel:3029", "_self")}
              className="border-[#9E78E9]/30 text-[#9E78E9] hover:bg-[#D3E4FD]/30"
            >
              <Phone className="w-4 h-4 mr-2" />
              Isange
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

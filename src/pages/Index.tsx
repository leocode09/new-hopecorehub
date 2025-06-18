
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bot, Settings, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SOSButton from "@/components/SOSButton";
import WellnessCheck from "@/components/WellnessCheck";
import ResourcesSection from "@/components/ResourcesSection";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";

const Index = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Forum",
      description: "Connect with community",
      path: "/forum",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Bot,
      title: "Mahoro",
      description: "AI Support Companion",
      path: "/mahoro",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Muganga",
      description: "Professional Support",
      path: "/muganga",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Customize your experience",
      path: "/settings",
      color: "from-gray-500 to-slate-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#9E78E9] to-[#8B69D6] rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#9E78E9] mb-2">HopeCore Hub</h1>
          <p className="text-gray-600 dark:text-gray-300">Your safe space for healing and support</p>
        </header>

        {/* SOS Button */}
        <div className="mb-8">
          <SOSButton />
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="border-[#9E78E9]/20 hover:border-[#9E78E9]/40 transition-colors cursor-pointer" onClick={() => navigate(action.path)}>
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto w-12 h-12 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{action.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Wellness Check */}
        <WellnessCheck />

        {/* Resources */}
        <ResourcesSection />

        {/* Daily Affirmation */}
        <Card className="mb-8 border-[#9E78E9]/20 bg-gradient-to-r from-[#9E78E9]/10 to-white dark:from-gray-800 dark:to-gray-700">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-[#9E78E9] mb-2">Daily Affirmation</h3>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "You are stronger than you know, braver than you feel, and more loved than you imagine."
            </p>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <CardContent className="p-4 text-center">
            <p className="text-red-700 dark:text-red-300 text-sm font-medium mb-2">In case of emergency:</p>
            <div className="space-y-1 text-xs text-red-600 dark:text-red-400">
              <p><strong>Isange One Stop Center:</strong> 3029</p>
              <p><strong>Rwanda National Police:</strong> 3512</p>
              <p><strong>HopeCore Team:</strong> +250780332779</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <OnboardingTour />
      <BottomNav />
    </div>
  );
};

export default Index;

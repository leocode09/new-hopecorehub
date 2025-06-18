
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-[#9E78E9] rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#9E78E9]">
            HopeCore Hub
          </CardTitle>
          <CardDescription className="text-lg text-center leading-relaxed">
            <em className="text-gray-600">
              "Healing Begins When The Silence Ends"
            </em>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600 mb-6">
            A safe space for survivors, support, and healing.
          </p>
          
          <Button 
            onClick={() => navigate("/signin")}
            className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
            size="lg"
          >
            Sign In
          </Button>
          
          <Button 
            onClick={() => navigate("/signup")}
            variant="outline"
            className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/50"
            size="lg"
          >
            Create Account
          </Button>
          
          <Button 
            onClick={() => navigate("/onboarding-quote")}
            variant="ghost"
            className="w-full text-gray-600 hover:bg-[#D3E4FD]/30"
            size="lg"
          >
            Continue as Guest
          </Button>
          
          <div className="flex items-center justify-center pt-4">
            <Heart className="w-4 h-4 text-[#9E78E9] mr-2" />
            <span className="text-sm text-gray-500">Safe • Anonymous • Supportive</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Welcome;

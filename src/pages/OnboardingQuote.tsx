
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";

const OnboardingQuote = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-8 text-center space-y-8">
          <div className="space-y-6">
            <Heart className="w-16 h-16 text-[#9E78E9] mx-auto" />
            
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#9E78E9]">
                Welcome to Your Safe Space
              </h1>
              
              <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                "You are stronger than you think, braver than you feel, and more loved than you know. 
                Your healing journey matters, and you are not alone."
              </blockquote>
            </div>
            
            <div className="bg-[#D3E4FD]/30 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                This is a trauma-informed space designed with your safety and privacy in mind. 
                Take your time, and remember that seeking support is a sign of strength.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate("/")}
            className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
            size="lg"
          >
            Enter HopeCore Hub
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingQuote;

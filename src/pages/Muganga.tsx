
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { Heart, Calendar, Clock, Star, Shield, Crown, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Muganga = () => {
  const { isGuest } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <img 
              src="/lovable-uploads/28737141-f0a2-4128-9db2-1b925db984a1.png" 
              alt="HopeCore Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#9E78E9]">Muganga Therapy</h1>
          <p className="text-gray-600 dark:text-gray-300">Professional mental health support</p>
        </div>

        {/* Guest Mode Notice */}
        {isGuest && (
          <Card className="mb-6 border-[#9E78E9]/20 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 text-[#9E78E9] mx-auto mb-3" />
              <h2 className="text-lg font-bold text-[#9E78E9] mb-2">Premium Feature</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Muganga Therapy requires an account to ensure continuity of care and secure communication with therapists.
              </p>
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account to Access
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Subscription Info */}
        <Card className={`mb-6 border-[#9E78E9]/20 bg-gradient-to-r from-[#9E78E9] to-[#8B69D6] ${isGuest ? 'opacity-60' : ''}`}>
          <CardContent className="p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Monthly Subscription</h2>
            <p className="text-3xl font-bold mb-2">1,999 RWF</p>
            <p className="text-sm opacity-90">Unlimited therapy sessions with certified professionals</p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className={`space-y-4 mb-6 ${isGuest ? 'opacity-60' : ''}`}>
          <Card className="border-[#9E78E9]/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-[#9E78E9]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Certified Therapists</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Licensed mental health professionals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#9E78E9]/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-[#9E78E9]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Book sessions at your convenience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#9E78E9]/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-[#9E78E9]" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">1-on-1 Sessions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Private, confidential therapy sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Therapists Preview */}
        <Card className={`mb-6 border-[#9E78E9]/20 ${isGuest ? 'opacity-60' : ''}`}>
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9]">Available Therapists</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-[#9E78E9] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DR</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">Dr. Uwimana Rose</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Trauma Specialist</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-[#9E78E9] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DR</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">Dr. Nkusi Jean</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clinical Psychologist</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!isGuest ? (
          <div className="space-y-3">
            <Button className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white py-6 text-lg">
              Subscribe Now - 1,999 RWF/month
            </Button>
            
            <Button variant="outline" className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/30">
              Schedule Free Consultation
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white py-6 text-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account to Subscribe
            </Button>
          </div>
        )}

        {/* Note */}
        <Card className="mt-6 border-[#9E78E9]/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              💜 Therapy booking and payments will be activated when we connect Supabase
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Muganga;

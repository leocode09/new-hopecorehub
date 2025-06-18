
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { Heart, Calendar, Clock, Shield, Crown, UserPlus, Smartphone, Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Muganga = () => {
  const { isGuest } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const mtnUssdCode = "*182*1*1*0780332779*2000#";

  const handleSubscribe = () => {
    setIsPaymentDialogOpen(true);
  };

  const copyUssdCode = () => {
    navigator.clipboard.writeText(mtnUssdCode);
    toast({
      title: "Copied!",
      description: "USSD code copied to clipboard"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20 pt-safe">
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
            <p className="text-3xl font-bold mb-2">2,000 RWF</p>
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

        {/* Action Buttons */}
        {!isGuest ? (
          <div className="space-y-3">
            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white py-6 text-lg"
                >
                  Subscribe Now - 2,000 RWF/month
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-center text-[#9E78E9]">
                    MTN Mobile Money Payment
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4">
                  <div className="text-center">
                    <Smartphone className="w-16 h-16 text-[#9E78E9] mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Pay with MTN Mobile Money</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Dial the following USSD code on your MTN phone:
                    </p>
                  </div>
                  
                  <Card className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-[#9E78E9]/30">
                    <CardContent className="p-4 text-center">
                      <div className="flex items-center justify-between">
                        <code className="text-lg font-mono text-[#9E78E9] break-all">
                          {mtnUssdCode}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyUssdCode}
                          className="ml-2 text-[#9E78E9] hover:bg-[#9E78E9]/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      After payment, you will receive:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>✓ Immediate confirmation message</li>
                      <li>✓ Payment receipt from our team</li>
                      <li>✓ Access to therapy booking</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                      <strong>Note:</strong> Payment goes directly to our team at +250780332779. 
                      You'll be contacted within minutes for account activation.
                    </p>
                  </div>

                  <Button 
                    onClick={() => setIsPaymentDialogOpen(false)}
                    className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
                  >
                    I've Made the Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
              💜 Pay easily with MTN Mobile Money and get instant access to professional therapy
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Muganga;

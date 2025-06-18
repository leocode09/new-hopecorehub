
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Heart, ArrowLeft } from "lucide-react";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup' | 'guest'>('signin');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setShowConsent(true);
      return;
    }
    setLoading(true);
    const identifier = email || phone;
    const { error } = await signIn(identifier, password);
    if (!error) {
      navigate("/");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setShowConsent(true);
      return;
    }
    setLoading(true);
    const identifier = email || phone;
    const { error } = await signUp(identifier, password, fullName);
    if (!error) {
      navigate("/");
    }
    setLoading(false);
  };

  const handleContinueAsGuest = () => {
    if (!consentGiven) {
      setShowConsent(true);
      return;
    }
    // Store guest mode in localStorage
    localStorage.setItem("hopecore-guest-mode", "true");
    navigate("/");
  };

  const handleConsentAndProceed = () => {
    setConsentGiven(true);
    setShowConsent(false);
    
    if (authType === 'guest') {
      handleContinueAsGuest();
    }
  };

  if (showConsent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-[#9E78E9] rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#9E78E9]">
              Privacy & Terms
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-[#D3E4FD]/30 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-[#9E78E9]">Your Privacy Matters</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>• <strong>Anonymous by Default:</strong> All forum posts are anonymous unless you choose otherwise</p>
                <p>• <strong>Secure Communication:</strong> All data is encrypted and stored securely</p>
                <p>• <strong>No Data Sharing:</strong> We never share your personal information with third parties</p>
                <p>• <strong>Your Control:</strong> You can delete your account and data at any time</p>
                <p>• <strong>Safe Space:</strong> Our platform is moderated to ensure a supportive environment</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed">
                I agree to the privacy terms and understand that my data is protected. 
                I consent to using HopeCore Hub as a safe space for healing and support.
              </Label>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleConsentAndProceed}
                disabled={!consentGiven}
                className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
                size="lg"
              >
                I Agree - Continue
              </Button>
              
              <Button 
                onClick={() => setShowConsent(false)}
                variant="outline"
                className="w-full border-[#9E78E9] text-[#9E78E9]"
                size="lg"
              >
                Back
              </Button>
            </div>

            <div className="flex items-center justify-center pt-2">
              <Heart className="w-4 h-4 text-[#9E78E9] mr-2" />
              <span className="text-xs text-gray-500">Your healing journey is protected</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" onClick={() => setAuthType('signin')}>Sign In</TabsTrigger>
              <TabsTrigger value="signup" onClick={() => setAuthType('signup')}>Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email or Phone</Label>
                  <Input
                    id="signin-email"
                    type="text"
                    value={email || phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes('@')) {
                        setEmail(value);
                        setPhone('');
                      } else {
                        setPhone(value);
                        setEmail('');
                      }
                    }}
                    required
                    placeholder="your@email.com or +250123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Your password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#9E78E9] hover:bg-[#8B69D6]"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name (Optional)</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name (or leave blank for anonymous)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email or Phone</Label>
                  <Input
                    id="signup-email"
                    type="text"
                    value={email || phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.includes('@')) {
                        setEmail(value);
                        setPhone('');
                      } else {
                        setPhone(value);
                        setEmail('');
                      }
                    }}
                    required
                    placeholder="your@email.com or +250123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Choose a strong password"
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#9E78E9] hover:bg-[#8B69D6]"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-3">
            <Button 
              onClick={() => {
                setAuthType('guest');
                if (!consentGiven) {
                  setShowConsent(true);
                } else {
                  handleContinueAsGuest();
                }
              }}
              variant="ghost"
              className="w-full text-gray-600 hover:bg-[#D3E4FD]/30"
              size="lg"
            >
              Continue as Guest
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-[#D3E4FD]/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Heart className="w-4 h-4 text-[#9E78E9] mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Your privacy matters:</strong> All forum posts are anonymous by default. 
                  Your information is only used for account recovery and is never shared.
                </p>
              </div>
            </div>
          </div>

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

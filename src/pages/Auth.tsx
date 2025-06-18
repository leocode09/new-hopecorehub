
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useAuthEnhancements } from "@/hooks/useAuthEnhancements";
import { Shield, Heart, ArrowLeft } from "lucide-react";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import EmailVerificationStatus from "@/components/auth/EmailVerificationStatus";
import AccountDeletion from "@/components/auth/AccountDeletion";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const { signIn, signUp, user } = useAuth();
  const { logLoginActivity } = useAuthEnhancements();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    await logLoginActivity('signin', !error);
    
    if (!error) {
      if (rememberMe) {
        localStorage.setItem('hopecore-remember-email', email);
      } else {
        localStorage.removeItem('hopecore-remember-email');
      }
      navigate("/");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, fullName);
    await logLoginActivity('signup', !error);
    
    setLoading(false);
  };

  // Load remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('hopecore-remember-email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  });

  // If user is logged in, show account management
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-[#9E78E9] hover:text-[#8B69D6]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="border-[#9E78E9]/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#9E78E9]">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <EmailVerificationStatus />
              
              <div className="space-y-4">
                <div className="p-4 bg-[#D3E4FD]/20 rounded-lg">
                  <h3 className="font-semibold text-[#9E78E9] mb-2">Account Information</h3>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-600">
                    Status: {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                  </p>
                </div>
                
                <AccountDeletion />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 text-[#9E78E9] hover:text-[#8B69D6]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-[#9E78E9]/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-[#9E78E9]">HopeCore Hub</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">Your safe space for healing and support</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="reset">Reset</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
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
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#9E78E9] hover:bg-[#8B69D6]"
                    disabled={loading}
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
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
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
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="reset">
                <PasswordResetForm />
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-[#D3E4FD]/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-[#9E78E9] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Your privacy matters:</strong> All forum posts are anonymous by default. 
                    Your email is only used for account recovery and is never shared.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

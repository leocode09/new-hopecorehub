
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase authentication
    console.log("Sign in attempt:", { email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center space-y-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/welcome")}
            className="absolute top-4 left-4 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#9E78E9]">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your safe space
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
              size="lg"
            >
              Sign In
            </Button>
            
            <div className="text-center space-y-2">
              <Link to="#" className="text-sm text-[#9E78E9] hover:underline">
                Forgot your password?
              </Link>
              
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#9E78E9] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              
              <p className="text-sm text-gray-600">
                Or{" "}
                <Link to="/onboarding-quote" className="text-[#9E78E9] hover:underline">
                  continue as guest
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-[#D3E4FD]/30 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💜 Authentication will be activated when we connect Supabase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;

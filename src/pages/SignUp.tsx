
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase authentication
    console.log("Sign up attempt:", formData);
    navigate("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Join HopeCore Hub
          </CardTitle>
          <CardDescription>
            Create your safe space account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email or phone"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
              size="lg"
            >
              Create Account
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/signin" className="text-[#9E78E9] hover:underline font-medium">
                  Sign in
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
              💜 Account creation will be activated when we connect Supabase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

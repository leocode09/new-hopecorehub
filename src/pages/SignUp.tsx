
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, formData.name || undefined);
      
      if (error) {
        if (error.message.includes("User already registered")) {
          setError("An account with this email already exists. Please sign in instead.");
        } else if (error.message.includes("Invalid email")) {
          setError("Please enter a valid email address");
        } else if (error.message.includes("Password should be at least")) {
          setError("Password must be at least 6 characters long");
        } else {
          setError(error.message);
        }
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user starts typing
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#9E78E9]">
              Check Your Email
            </CardTitle>
            <CardDescription>
              We've sent you a confirmation link to complete your registration
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please check your email and click the confirmation link to activate your account.
                The email might take a few minutes to arrive.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Button 
                onClick={() => navigate("/signin")}
                className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
              >
                Go to Sign In
              </Button>
              
              <Button 
                onClick={() => setSuccess(false)}
                variant="outline"
                className="w-full border-[#9E78E9] text-[#9E78E9]"
              >
                Try Different Email
              </Button>
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
          <Button 
            variant="ghost" 
            onClick={() => navigate("/welcome")}
            className="absolute top-4 left-4 p-2"
            disabled={loading}
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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={loading}
                required
                minLength={6}
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
                disabled={loading}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
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
                <Link to="/welcome" className="text-[#9E78E9] hover:underline">
                  continue as guest
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-[#D3E4FD]/30 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              💜 Your privacy is protected. All data is encrypted and secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

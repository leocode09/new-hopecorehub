
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import { useAuthEnhancements } from "@/hooks/useAuthEnhancements";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { resetPassword, loading } = useAuthEnhancements();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await resetPassword(email);
    if (!error) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#9E78E9] mb-2">Check Your Email</h3>
          <p className="text-sm text-gray-600">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
        </div>
        <Button 
          onClick={() => setSent(false)}
          variant="outline"
          className="border-[#9E78E9] text-[#9E78E9]"
        >
          Try Different Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email Address</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Reset Email...
          </>
        ) : (
          'Send Reset Email'
        )}
      </Button>
    </form>
  );
};

export default PasswordResetForm;

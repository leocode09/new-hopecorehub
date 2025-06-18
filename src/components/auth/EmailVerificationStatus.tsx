
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthEnhancements } from "@/hooks/useAuthEnhancements";

const EmailVerificationStatus = () => {
  const { user } = useAuth();
  const { resendVerification, loading } = useAuthEnhancements();
  const [justSent, setJustSent] = useState(false);

  if (!user || user.email_confirmed_at) {
    return null;
  }

  const handleResendVerification = async () => {
    if (user?.email) {
      const { error } = await resendVerification(user.email);
      if (!error) {
        setJustSent(true);
        setTimeout(() => setJustSent(false), 5000);
      }
    }
  };

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <span className="text-orange-800">
            Please verify your email address to access all features.
          </span>
        </div>
        <Button
          onClick={handleResendVerification}
          disabled={loading || justSent}
          variant="outline"
          size="sm"
          className="ml-4 border-orange-300 text-orange-700 hover:bg-orange-100"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Sending...
            </>
          ) : justSent ? (
            <>
              <Mail className="w-4 h-4 mr-1" />
              Sent!
            </>
          ) : (
            'Resend Email'
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerificationStatus;

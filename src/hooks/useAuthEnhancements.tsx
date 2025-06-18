
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthEnhancements = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      console.log('Sending password reset email to:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected password reset error:', error);
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      console.log('Deleting user account');
      
      // For now, just sign out the user - we can implement full deletion later
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Account deletion failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Account signed out",
        description: "You have been signed out. Full account deletion will be implemented later.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected account deletion error:', error);
      toast({
        title: "Account deletion failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    try {
      setLoading(true);
      console.log('Resending verification email to:', email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Resend verification error:', error);
        toast({
          title: "Failed to resend verification",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Verification email sent",
        description: "Check your email for the verification link.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected resend verification error:', error);
      toast({
        title: "Failed to resend verification",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Simplified login activity logging - just console log for now
  const logLoginActivity = async (action: string, success: boolean) => {
    try {
      console.log('Login activity:', { action, success, timestamp: new Date() });
      // We can implement database logging later when we set up the login_activity table
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return {
    resetPassword,
    deleteAccount,
    resendVerification,
    logLoginActivity,
    loading
  };
};

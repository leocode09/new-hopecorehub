
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  switchToAccountMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Check for guest mode first
    const guestMode = localStorage.getItem("hopecore-guest-mode");
    if (guestMode === "true") {
      if (mounted) {
        setIsGuest(true);
        setLoading(false);
        setUser(null);
        setSession(null);
      }
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, newSession?.user?.email);
        
        // Update state synchronously
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
        setIsGuest(false);

        // Clear guest mode when user signs in
        if (newSession?.user) {
          localStorage.removeItem("hopecore-guest-mode");
        }

        // Handle specific auth events with toast notifications
        if (event === 'SIGNED_IN' && newSession?.user) {
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You've been successfully signed out.",
          });
        } else if (event === 'USER_UPDATED' && newSession?.user) {
          console.log('User updated:', newSession.user);
        }
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting initial session:', error);
        }
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setLoading(false);
          setIsGuest(false);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign up user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName || 'Anonymous User'
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        let errorMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.';
        }
        
        toast({
          title: "Sign up failed",
          description: errorMessage,
          variant: "destructive"
        });
        return { error };
      }

      if (data.user && !data.session) {
        // User needs to confirm email
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      } else if (data.session) {
        // User was signed up and signed in immediately
        toast({
          title: "Welcome to HopeCore Hub!",
          description: "Your account has been created successfully.",
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting to sign in user:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        }

        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive"
        });
        return { error };
      }

      console.log('Sign in successful:', data.user?.email);
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive"
      });
    }
  };

  const switchToAccountMode = () => {
    localStorage.removeItem("hopecore-guest-mode");
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isGuest,
      signUp,
      signIn,
      signOut,
      switchToAccountMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

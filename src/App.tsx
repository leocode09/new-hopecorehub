
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import LanguageSelect from "./pages/LanguageSelect";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OnboardingQuote from "./pages/OnboardingQuote";
import Auth from "./pages/Auth";
import Forum from "./pages/Forum";
import Mahoro from "./pages/Mahoro";
import Muganga from "./pages/Muganga";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="hopecore-ui-theme">
      <LanguageProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/language" element={<LanguageSelect />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/onboarding-quote" element={<OnboardingQuote />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/" element={<Index />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/mahoro" element={<Mahoro />} />
                  <Route path="/muganga" element={<Muganga />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

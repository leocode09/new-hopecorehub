
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to HopeCore Hub! 💜',
    content: 'Let us show you around this safe space designed for survivors and their healing journey.',
    position: 'center'
  },
  {
    id: 'forum',
    title: 'Community Forum',
    content: 'Share your thoughts and connect with others in our anonymous, supportive community space.',
    position: 'center'
  },
  {
    id: 'post-creation',
    title: 'Create Posts',
    content: 'Share your experiences anonymously. Your privacy and safety are our top priority.',
    targetSelector: '.post-creation-form',
    position: 'bottom'
  },
  {
    id: 'mahoro',
    title: 'Meet Mahoro',
    content: 'Chat with our AI companion Mahoro for 24/7 support and guidance.',
    position: 'center'
  },
  {
    id: 'settings',
    title: 'Customize Your Experience',
    content: 'Adjust settings like low-data mode and accessibility features in the Settings page.',
    position: 'center'
  }
];

export const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { preferences, updatePreferences } = useUserPreferences();

  useEffect(() => {
    if (preferences && !preferences.onboarding_completed) {
      setIsVisible(true);
    }
  }, [preferences]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    await updatePreferences({ onboarding_completed: true });
    setIsVisible(false);
  };

  const handleSkip = async () => {
    await updatePreferences({ onboarding_completed: true });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-[#9E78E9]/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#9E78E9] mb-2">
              {currentTourStep.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {currentTourStep.content}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-[#9E78E9]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-[#9E78E9] hover:bg-[#8B69D6] flex items-center"
            >
              {currentStep === tourSteps.length - 1 ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

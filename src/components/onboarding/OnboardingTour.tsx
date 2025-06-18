
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useLanguage } from '@/contexts/LanguageContext';

interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  isLanguageSelection?: boolean;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
];

export const OnboardingTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { preferences, updatePreferences } = useUserPreferences();
  const { language, setLanguage, t } = useLanguage();

  const tourSteps: TourStep[] = [
    {
      id: 'language',
      title: t('chooseLanguage'),
      content: t('choosePreferredLanguage'),
      position: 'center',
      isLanguageSelection: true
    },
    {
      id: 'welcome',
      title: t('onboardingWelcome'),
      content: t('onboardingDescription'),
      position: 'center'
    },
    {
      id: 'forum',
      title: t('forum'),
      content: t('onboardingForum'),
      position: 'center'
    },
    {
      id: 'mahoro',
      title: t('mahoro'),
      content: t('onboardingMahoro'),
      position: 'center'
    },
    {
      id: 'settings',
      title: t('settings'),
      content: t('onboardingSettings'),
      position: 'center'
    }
  ];

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
              {t('skip')} {currentStep + 1} {t('of')} {tourSteps.length}
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
            <h3 className="text-lg font-semibold text-[#9E78E9] mb-2 flex items-center">
              {currentTourStep.isLanguageSelection && <Globe className="w-5 h-5 mr-2" />}
              {currentTourStep.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {currentTourStep.content}
            </p>

            {currentTourStep.isLanguageSelection && (
              <div className="space-y-4">
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t('previous')}
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
                t('getStarted')
              ) : (
                <>
                  {t('next')}
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

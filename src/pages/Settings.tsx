import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/BottomNav";
import AccessibilitySettings from "@/components/accessibility/AccessibilitySettings";
import { useTheme } from "@/components/ThemeProvider";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { Settings as SettingsIcon, Moon, Sun, Globe, Volume2, Bell, Shield, Wifi, WifiOff, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreferences, loading } = useUserPreferences();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
  ];

  const handlePreferenceChange = async (key: keyof typeof preferences, value: boolean) => {
    if (preferences) {
      await updatePreferences({ [key]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#9E78E9]">{t('settings')}</h1>
          <p className="text-gray-600 dark:text-gray-300">Customize your experience</p>
        </header>

        {/* Accessibility Settings */}
        <div className="mb-6">
          <AccessibilitySettings />
        </div>

        {/* Language & Audio */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Language & Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-language">{t('appLanguage')}</Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                <SelectTrigger id="app-language" className="w-full">
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
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('choosePreferredLanguage')}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-[#9E78E9]" />
                <Label>Text-to-Speech</Label>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Voice-to-Text</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Data & Performance */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Data & Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Data Mode</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Reduce data usage for remote areas</p>
              </div>
              <Switch
                checked={preferences?.low_data_mode || false}
                onCheckedChange={(checked) => handlePreferenceChange('low_data_mode', checked)}
                disabled={loading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Image Lazy Loading</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Load images only when needed</p>
              </div>
              <Switch
                checked={preferences?.lazy_loading_enabled || false}
                onCheckedChange={(checked) => handlePreferenceChange('lazy_loading_enabled', checked)}
                disabled={loading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {preferences?.offline_mode_enabled ? <WifiOff className="w-4 h-4 text-[#9E78E9]" /> : <Wifi className="w-4 h-4 text-[#9E78E9]" />}
                <div>
                  <Label>Offline Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Cache content for offline access</p>
                </div>
              </div>
              <Switch
                checked={preferences?.offline_mode_enabled || false}
                onCheckedChange={(checked) => handlePreferenceChange('offline_mode_enabled', checked)}
                disabled={loading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              {theme === "dark" ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Forum Replies</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Get notified of new replies</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Check-ins</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Mental health reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>System Updates</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">App updates and news</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Data & Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mb-6 border-[#9E78E9]/20 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="text-lg text-red-600 dark:text-red-400">{t('emergencyContacts')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>{t('isangeCenter')}:</strong> 3029
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>{t('nationalPolice')}:</strong> 3512
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>{t('hopecoreTeam')}:</strong> +250780332779
            </p>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="border-[#9E78E9]/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              HopeCore Hub v1.0.0
            </p>
            <p className="text-xs text-gray-500">
              Built with love for survivors and their healing journey 💜
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;

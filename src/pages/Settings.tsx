
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/BottomNav";
import { useTheme } from "@/components/ThemeProvider";
import { Settings as SettingsIcon, Moon, Sun, Globe, Volume2, Bell, Shield } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#9E78E9]">Settings</h1>
          <p className="text-gray-600 dark:text-gray-300">Customize your experience</p>
        </div>

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
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Font Size</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Adjust text size for better readability</p>
              </div>
              <Button variant="outline" size="sm">
                Medium
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>High Contrast</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Improve visibility for accessibility</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Language & Audio */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Language & Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>App Language</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred language</p>
              </div>
              <Button variant="outline" size="sm">
                English
              </Button>
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
            <CardTitle className="text-lg text-red-600 dark:text-red-400">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Isange One Stop Center:</strong> 3029
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rwanda National Police:</strong> 3512
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>HopeCore Team:</strong> +250780332779
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

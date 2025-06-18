
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Type, Eye, Contrast, MotionOff } from "lucide-react";

const AccessibilitySettings = () => {
  const {
    fontFamily,
    fontSize,
    highContrast,
    reducedMotion,
    setFontFamily,
    setFontSize,
    setHighContrast,
    setReducedMotion,
  } = useAccessibility();

  const fontOptions = [
    { value: "inter", label: "Inter (Default)" },
    { value: "open-sans", label: "Open Sans" },
    { value: "roboto", label: "Roboto" },
    { value: "lato", label: "Lato" },
    { value: "source-sans", label: "Source Sans Pro" },
  ];

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium (Default)" },
    { value: "large", label: "Large" },
    { value: "extra-large", label: "Extra Large" },
  ];

  return (
    <Card className="border-[#9E78E9]/20">
      <CardHeader>
        <CardTitle className="text-lg text-[#9E78E9] flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Family */}
        <div className="space-y-2">
          <Label htmlFor="font-family" className="flex items-center text-base font-medium">
            <Type className="w-4 h-4 mr-2" />
            Font Family
          </Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger id="font-family" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span style={{ fontFamily: option.value.replace('-', ' ') }}>
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Choose a font that's comfortable for reading
          </p>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label htmlFor="font-size" className="text-base font-medium">
            Font Size
          </Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger id="font-size" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Adjust text size for better readability
          </p>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between py-2">
          <div className="space-y-1">
            <Label htmlFor="high-contrast" className="flex items-center text-base font-medium">
              <Contrast className="w-4 h-4 mr-2" />
              High Contrast Mode
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Increase contrast for better visibility
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
            aria-describedby="high-contrast-desc"
          />
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between py-2">
          <div className="space-y-1">
            <Label htmlFor="reduced-motion" className="flex items-center text-base font-medium">
              <MotionOff className="w-4 h-4 mr-2" />
              Reduce Motion
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Minimize animations and transitions
            </p>
          </div>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={setReducedMotion}
            aria-describedby="reduced-motion-desc"
          />
        </div>

        {/* Preview Text */}
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <h4 className="font-semibold mb-2">Preview</h4>
          <p className="mb-2">
            This is how your text will appear with the selected settings.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adjust the settings above to find what works best for you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;

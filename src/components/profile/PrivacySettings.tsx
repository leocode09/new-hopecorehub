
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

interface PrivacySettingsProps {
  anonymousByDefault: boolean;
  onAnonymousChange: (checked: boolean) => void;
}

const PrivacySettings = ({ anonymousByDefault, onAnonymousChange }: PrivacySettingsProps) => {
  return (
    <Card className="mb-6 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-[#9E78E9] flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Privacy & Safety
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Anonymous Forum Posts</p>
            <p className="text-sm text-gray-400">Post anonymously by default</p>
          </div>
          <Switch
            checked={anonymousByDefault}
            onCheckedChange={onAnonymousChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacySettings;

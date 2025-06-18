
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileFormData {
  full_name: string;
  nickname: string;
  phone: string;
  location: string;
  gender: string;
  anonymous_by_default: boolean;
  uses_avatar: boolean;
}

interface ProfileFormProps {
  formData: ProfileFormData;
  onFormDataChange: (data: ProfileFormData) => void;
}

const ProfileForm = ({ formData, onFormDataChange }: ProfileFormProps) => {
  const updateFormData = (field: keyof ProfileFormData, value: any) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-white text-lg">Full Name (Optional)</Label>
          <Input
            id="full_name"
            type="text"
            placeholder="Your name"
            value={formData.full_name}
            onChange={(e) => updateFormData('full_name', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname" className="text-white text-lg">Nickname</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="What you'd like to be called"
            value={formData.nickname}
            onChange={(e) => updateFormData('nickname', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white text-lg">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white text-lg">Gender (Optional)</Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white rounded-xl h-14 text-lg">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="female" className="text-white hover:bg-gray-600">Female</SelectItem>
              <SelectItem value="male" className="text-white hover:bg-gray-600">Male</SelectItem>
              <SelectItem value="other" className="text-white hover:bg-gray-600">Other</SelectItem>
              <SelectItem value="prefer_not_to_say" className="text-white hover:bg-gray-600">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white text-lg flex items-center">
            <span className="mr-2">📍</span>
            Location (Optional)
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Your location"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
          />
          <p className="text-sm text-gray-400">
            Used by authorities for emergency assistance only
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

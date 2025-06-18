
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { Camera } from "lucide-react";

interface ProfilePictureSectionProps {
  profile: any;
  formData: { uses_avatar: boolean };
  getDisplayName: () => string;
  getAvatarFallback: () => string;
  onProfilePictureUpload: (url: string) => Promise<void>;
  onToggleAvatarUse: (useAvatar: boolean) => Promise<void>;
}

const ProfilePictureSection = ({
  profile,
  formData,
  getDisplayName,
  getAvatarFallback,
  onProfilePictureUpload,
  onToggleAvatarUse
}: ProfilePictureSectionProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative mb-6">
        <Avatar className="w-32 h-32 border-4 border-gray-700">
          {!formData.uses_avatar && profile?.profile_picture_url ? (
            <AvatarImage src={profile.profile_picture_url} alt={getDisplayName()} />
          ) : null}
          <AvatarFallback className="bg-[#9E78E9] text-white text-4xl">
            {getAvatarFallback()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 bg-[#9E78E9] rounded-full p-2">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="flex gap-4 mb-8">
        <Button 
          variant="outline" 
          className="bg-transparent border-[#9E78E9] text-[#9E78E9] hover:bg-[#9E78E9] hover:text-white px-6 py-3 rounded-full"
          onClick={() => onToggleAvatarUse(true)}
        >
          Choose Avatar
        </Button>
        <div className="relative">
          <ProfilePictureUpload 
            onUploadComplete={onProfilePictureUpload}
            currentImageUrl={profile?.profile_picture_url || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureSection;

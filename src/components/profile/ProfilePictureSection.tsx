
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, Loader2 } from "lucide-react";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

interface ProfilePictureSectionProps {
  profile: any;
  formData: any;
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
  const [uploading, setUploading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  const handleProfilePictureUpload = async (url: string) => {
    setUploading(true);
    try {
      await onProfilePictureUpload(url);
    } finally {
      setUploading(false);
    }
  };

  const handleToggleAvatarUse = async (useAvatar: boolean) => {
    setToggleLoading(true);
    try {
      await onToggleAvatarUse(useAvatar);
    } finally {
      setToggleLoading(false);
    }
  };

  return (
    <Card className="mb-6 bg-gray-800 border-gray-700">
      <CardContent className="p-6 text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="w-24 h-24 mx-auto border-4 border-[#9E78E9]">
            {!formData.uses_avatar && profile?.profile_picture_url ? (
              <AvatarImage src={profile.profile_picture_url} alt={getDisplayName()} />
            ) : null}
            <AvatarFallback className="bg-[#9E78E9] text-white text-2xl">
              {getAvatarFallback()}
            </AvatarFallback>
          </Avatar>
          
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">{getDisplayName()}</h2>
        
        <div className="space-y-3">
          <ProfilePictureUpload 
            onUploadComplete={handleProfilePictureUpload} 
            currentImageUrl={profile?.profile_picture_url}
          />
          
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleAvatarUse(true)}
              disabled={formData.uses_avatar || toggleLoading}
              className="text-[#9E78E9] border-[#9E78E9] hover:bg-[#9E78E9] hover:text-white"
            >
              {toggleLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <User className="w-4 h-4 mr-2" />
              )}
              Use Avatar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleAvatarUse(false)}
              disabled={!formData.uses_avatar || toggleLoading}
              className="text-[#9E78E9] border-[#9E78E9] hover:bg-[#9E78E9] hover:text-white"
            >
              {toggleLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 mr-2" />
              )}
              Use Photo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePictureSection;

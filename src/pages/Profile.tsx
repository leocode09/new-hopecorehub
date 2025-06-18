
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePictureSection from "@/components/profile/ProfilePictureSection";
import ProfileForm from "@/components/profile/ProfileForm";
import PrivacySettings from "@/components/profile/PrivacySettings";
import UserInfo from "@/components/profile/UserInfo";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    full_name: '',
    nickname: '',
    phone: '',
    location: '',
    gender: '',
    anonymous_by_default: true,
    uses_avatar: true
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        nickname: profile.nickname || '',
        phone: profile.phone || '',
        location: profile.location || '',
        gender: (profile as any).gender || '',
        anonymous_by_default: profile.anonymous_by_default,
        uses_avatar: profile.uses_avatar
      });
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile(formData);
  };

  const handleProfilePictureUpload = async (url: string) => {
    await updateProfile({ 
      profile_picture_url: url,
      uses_avatar: false 
    });
  };

  const toggleAvatarUse = async (useAvatar: boolean) => {
    setFormData(prev => ({ ...prev, uses_avatar: useAvatar }));
    await updateProfile({ uses_avatar: useAvatar });
  };

  const handleAnonymousChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, anonymous_by_default: checked }));
  };

  const getDisplayName = () => {
    if (profile?.nickname) return profile.nickname;
    if (profile?.full_name) return profile.full_name;
    return 'User';
  };

  const getAvatarFallback = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <ProfileHeader />

        <ProfilePictureSection
          profile={profile}
          formData={formData}
          getDisplayName={getDisplayName}
          getAvatarFallback={getAvatarFallback}
          onProfilePictureUpload={handleProfilePictureUpload}
          onToggleAvatarUse={toggleAvatarUse}
        />

        <ProfileForm
          formData={formData}
          onFormDataChange={setFormData}
        />

        <PrivacySettings
          anonymousByDefault={formData.anonymous_by_default}
          onAnonymousChange={handleAnonymousChange}
        />

        <Button 
          onClick={handleSave} 
          className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] rounded-2xl h-14 text-lg font-semibold mb-6"
        >
          Save Profile
        </Button>

        <UserInfo userEmail={user?.email} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

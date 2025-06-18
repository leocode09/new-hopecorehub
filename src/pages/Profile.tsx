
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";
import ProfileAction from "@/components/ProfileAction";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { User, Edit, Shield, Camera } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    full_name: '',
    nickname: '',
    phone: '',
    location: '',
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

  const getDisplayName = () => {
    if (profile?.nickname) return profile.nickname;
    if (profile?.full_name) return profile.full_name;
    return 'Anonymous User';
  };

  const getAvatarFallback = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header with Profile Action */}
        <div className="flex items-center justify-between mb-6">
          <ProfileAction />
          <h1 className="text-2xl font-bold text-[#9E78E9]">Your Profile</h1>
          <div></div>
        </div>

        {/* Profile Picture Section */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                {!formData.uses_avatar && profile?.profile_picture_url ? (
                  <AvatarImage src={profile.profile_picture_url} alt={getDisplayName()} />
                ) : null}
                <AvatarFallback className="bg-[#9E78E9] text-white text-2xl">
                  {getAvatarFallback()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.uses_avatar}
                    onCheckedChange={toggleAvatarUse}
                  />
                  <Label>Use Avatar</Label>
                </div>
              </div>
              
              {!formData.uses_avatar && (
                <ProfilePictureUpload 
                  onUploadComplete={handleProfilePictureUpload}
                  currentImageUrl={profile?.profile_picture_url || undefined}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name (Optional)</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Your full legal name"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname (Optional)</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="What you'd like to be called"
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+250 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location/Address (Optional)</Label>
              <Input
                id="location"
                type="text"
                placeholder="For emergency contact purposes"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
              <p className="text-xs text-gray-500">
                Used by authorities for emergency assistance only
              </p>
            </div>
            
            <Button onClick={handleSave} className="w-full bg-[#9E78E9] hover:bg-[#8B69D6]">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Anonymous Forum Posts</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Post anonymously by default</p>
              </div>
              <Switch
                checked={formData.anonymous_by_default}
                onCheckedChange={(checked) => setFormData({...formData, anonymous_by_default: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="mt-6 border-[#9E78E9]/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              💜 Signed in as: {user?.email}
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

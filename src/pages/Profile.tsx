
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <ProfileAction />
          <h1 className="text-3xl font-bold text-[#9E78E9] text-center flex-1">My Profile</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile Picture Section */}
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
              onClick={() => toggleAvatarUse(true)}
            >
              Choose Avatar
            </Button>
            <div className="relative">
              <ProfilePictureUpload 
                onUploadComplete={handleProfilePictureUpload}
                currentImageUrl={profile?.profile_picture_url || undefined}
              />
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
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
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
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
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
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
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-white text-lg">Gender (Optional)</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
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
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
              />
              <p className="text-sm text-gray-400">
                Used by authorities for emergency assistance only
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
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
                checked={formData.anonymous_by_default}
                onCheckedChange={(checked) => setFormData({...formData, anonymous_by_default: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full bg-[#9E78E9] hover:bg-[#8B69D6] rounded-2xl h-14 text-lg font-semibold mb-6"
        >
          Save Profile
        </Button>

        {/* User Info */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-400">
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

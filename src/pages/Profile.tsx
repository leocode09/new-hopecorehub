
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { User, Edit, LogOut, Shield } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    location: '',
    anonymous_by_default: true
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
        phone: profile.phone || '',
        location: profile.location || '',
        anonymous_by_default: profile.anonymous_by_default
      });
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile(formData);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-[#9E78E9] rounded-full flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#9E78E9]">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account safely</p>
        </div>

        {/* Profile Form */}
        <Card className="mb-6 border-[#9E78E9]/20">
          <CardHeader>
            <CardTitle className="text-lg text-[#9E78E9] flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name (optional)"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+250 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                type="text"
                placeholder="Your location for local resources"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
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

        {/* Account Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#D3E4FD]/30"
          >
            Change Password
          </Button>
          
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

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

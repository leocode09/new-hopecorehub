
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { User, Settings, LogOut, LogIn, UserPlus, Crown } from 'lucide-react';

const ProfileAction = () => {
  const navigate = useNavigate();
  const { user, signOut, isGuest, switchToAccountMode } = useAuth();
  const { profile } = useProfile();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSwitchToAccount = () => {
    switchToAccountMode();
    navigate('/auth');
  };

  const getDisplayName = () => {
    if (isGuest) return 'Guest';
    if (profile?.nickname) return profile.nickname;
    if (profile?.full_name) return profile.full_name;
    return 'You';
  };

  const getAvatarFallback = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
  };

  // For guest users
  if (isGuest) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <div className="px-2 py-1.5 text-sm text-gray-500">
            👤 Browsing as Guest
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSwitchToAccount}>
            <Crown className="w-4 h-4 mr-2" />
            Create Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/auth')}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // For non-authenticated users
  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gray-200 text-gray-600">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => navigate('/auth')}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/welcome')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // For authenticated users
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full p-0">
          <Avatar className="w-10 h-10">
            {profile?.uses_avatar === false && profile?.profile_picture_url ? (
              <AvatarImage src={profile.profile_picture_url} alt={getDisplayName()} />
            ) : null}
            <AvatarFallback className="bg-[#9E78E9] text-white">
              {getAvatarFallback()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="w-4 h-4 mr-2" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAction;

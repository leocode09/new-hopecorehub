
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import ProfileAction from "@/components/ProfileAction";
import { Moon, Sun } from "lucide-react";

const ProfileHeader = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <ProfileAction size="sm" />
      <h1 className="text-3xl font-bold text-[#9E78E9] text-center flex-1">My Profile</h1>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="w-8 h-8 rounded-full p-0 text-[#9E78E9] hover:bg-[#9E78E9]/10"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default ProfileHeader;

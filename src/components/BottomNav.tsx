
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Bot, Heart, Settings } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/forum", icon: MessageCircle, label: "Forum" },
    { path: "/mahoro", icon: Bot, label: "Mahoro" },
    { path: "/muganga", icon: Heart, label: "Muganga" },
    { path: "/settings", icon: Settings, label: "Settings" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center p-3 h-auto space-y-2 touch-target ${
                isActive 
                  ? "text-[#9E78E9] bg-[#D3E4FD]/30" 
                  : "text-gray-600 hover:text-[#9E78E9] hover:bg-[#D3E4FD]/20"
              }`}
            >
              <Icon className="w-16 h-16" />
              <span className="text-sm font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

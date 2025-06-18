
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForumHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full p-0 text-[#9E78E9] hover:bg-[#9E78E9]/10"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#9E78E9]">Forum</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Safe space to share</p>
        </div>
      </div>
    </header>
  );
};

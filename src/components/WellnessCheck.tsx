
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

const WellnessCheck = () => {
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState<{ emoji: string; mood: string; message: string } | null>(null);

  const moodOptions = [
    { 
      emoji: '😊', 
      mood: 'Great', 
      message: "That's wonderful! 🌟 Keep nurturing that positive energy. Remember to share your joy with others and take a moment to appreciate what's going well in your life today." 
    },
    { 
      emoji: '😐', 
      mood: 'Okay', 
      message: "It's perfectly normal to have neutral days. 🌈 Sometimes taking small steps like a short walk, listening to music, or connecting with a friend can help brighten your mood." 
    },
    { 
      emoji: '😔', 
      mood: 'Sad', 
      message: "Your feelings are valid, and it's okay to not be okay. 💜 Consider reaching out to someone you trust, practicing gentle self-care, or speaking with our AI companion Mahoro for support." 
    },
    { 
      emoji: '😢', 
      mood: 'Struggling', 
      message: "You're incredibly brave for acknowledging how you feel. 🫂 Please remember that support is available. Consider talking to our professionals or using our SOS button if you need immediate help." 
    }
  ];

  const handleMoodSelect = (mood: typeof moodOptions[0]) => {
    setSelectedMood(mood);
    setShowMoodDialog(true);
  };

  return (
    <>
      <Card className="mb-8 border-[#9E78E9]/20 bg-gradient-to-r from-[#D3E4FD]/30 to-white dark:from-gray-800 dark:to-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-[#9E78E9] flex items-center justify-center">
            <Heart className="w-5 h-5 mr-2" />
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {moodOptions.map((option, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="h-12 text-2xl hover:bg-[#9E78E9]/10 hover:scale-105 transition-all duration-200 hover:border-[#9E78E9]/40" 
                onClick={() => handleMoodSelect(option)}
                aria-label={`Feeling ${option.mood}`}
              >
                {option.emoji}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood Response Dialog */}
      <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
        <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto text-center animate-scale-in">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center text-[#9E78E9] text-xl">
              <Sparkles className="w-6 h-6 mr-2" />
              {selectedMood?.emoji} Feeling {selectedMood?.mood}
            </DialogTitle>
            <DialogDescription className="text-center mt-4 text-base leading-relaxed px-2">
              {selectedMood?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => setShowMoodDialog(false)}
              className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white px-8 py-2"
            >
              Thank you 💜
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WellnessCheck;

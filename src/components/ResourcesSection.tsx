
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Phone, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourcesSection = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    icon: any;
    content: any;
    color: string;
  } | null>(null);

  const selfCareTips = [
    "🌸 Take 5 deep breaths and focus on the present moment",
    "💧 Drink a glass of water and stay hydrated", 
    "🌱 Step outside for fresh air, even if just for a minute",
    "📝 Write down 3 things you're grateful for today",
    "🎵 Listen to your favorite calming music",
    "🫂 Reach out to someone who cares about you",
    "🛁 Take a warm shower or bath to relax",
    "🍃 Practice gentle stretching or movement"
  ];

  const safetyTips = [
    "🏠 Identify safe spaces in your home and community",
    "📱 Keep important phone numbers easily accessible",
    "👥 Build a support network of trusted friends/family",
    "🎒 Keep emergency supplies ready (documents, money, keys)",
    "🗓️ Create a safety plan for different situations",
    "💭 Trust your instincts - if something feels wrong, seek help",
    "📞 Know when and how to contact emergency services",
    "🤝 Connect with local support organizations"
  ];

  const crisisContacts = [
    { name: "Isange One Stop Center", number: "3029", description: "Gender-based violence support - FREE" },
    { name: "Rwanda Investigation Bureau", number: "3512", description: "Emergency investigations & safety - FREE" },
    { name: "Rwanda National Police", number: "112", description: "Emergency police services - FREE" },
    { name: "Ministry of Health Hotline", number: "114", description: "Health emergency support - FREE" },
    { name: "HopeCore Hub Team", number: "+250780332779", description: "Our support team - FREE" }
  ];

  const handleResourceClick = (resourceType: string) => {
    switch (resourceType) {
      case 'self-care':
        setDialogContent({
          title: "Self-Care Tips",
          icon: Heart,
          content: (
            <div className="space-y-3 text-left">
              <p className="text-center text-[#9E78E9] font-medium mb-4">
                Gentle reminders for taking care of yourself 💜
              </p>
              {selfCareTips.map((tip, index) => (
                <div key={index} className="p-3 bg-[#D3E4FD]/20 rounded-lg text-sm">
                  {tip}
                </div>
              ))}
            </div>
          ),
          color: "text-red-500"
        });
        setShowDialog(true);
        break;
      
      case 'safety':
        setDialogContent({
          title: "Safety Planning",
          icon: Shield,
          content: (
            <div className="space-y-3 text-left">
              <p className="text-center text-blue-600 font-medium mb-4">
                Important safety reminders 🛡️
              </p>
              {safetyTips.map((tip, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm">
                  {tip}
                </div>
              ))}
            </div>
          ),
          color: "text-blue-500"
        });
        setShowDialog(true);
        break;
      
      case 'crisis':
        setDialogContent({
          title: "Crisis Support Contacts",
          icon: Phone,
          content: (
            <div className="space-y-3 text-left">
              <p className="text-center text-green-600 font-medium mb-4">
                Free 24/7 support numbers 📞
              </p>
              {crisisContacts.map((contact, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">{contact.name}</div>
                  <div className="text-xl font-mono text-green-700 my-1">{contact.number}</div>
                  <div className="text-sm text-green-600">{contact.description}</div>
                </div>
              ))}
              <div className="text-center mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> Save these numbers in your phone contacts for quick access
                </p>
              </div>
            </div>
          ),
          color: "text-green-500"
        });
        setShowDialog(true);
        break;
      
      case 'educational':
        navigate('/mahoro');
        break;
    }
  };

  const resources = [
    {
      icon: Heart,
      title: "Self-Care Tips",
      description: "Daily wellness practices",
      color: "text-red-500",
      action: () => handleResourceClick('self-care')
    },
    {
      icon: Shield,
      title: "Safety Planning",
      description: "Personal safety resources",
      color: "text-blue-500",
      action: () => handleResourceClick('safety')
    },
    {
      icon: Phone,
      title: "Crisis Support",
      description: "24/7 helpline numbers",
      color: "text-green-500",
      action: () => handleResourceClick('crisis')
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Learn about healing",
      color: "text-purple-500",
      action: () => handleResourceClick('educational')
    }
  ];

  return (
    <>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h2>
        <div className="space-y-3">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className="border-[#9E78E9]/20 hover:border-[#9E78E9]/40 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-md"
              onClick={resource.action}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <resource.icon className={`w-6 h-6 ${resource.color}`} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resource Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg max-w-[95vw] mx-auto max-h-[80vh] overflow-y-auto animate-fade-in">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center text-lg">
              {dialogContent?.icon && <dialogContent.icon className={`w-5 h-5 mr-2 ${dialogContent.color}`} />}
              {dialogContent?.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="mt-4">
              {dialogContent?.content}
            </div>
          </DialogDescription>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => setShowDialog(false)}
              className="bg-[#9E78E9] hover:bg-[#8B69D6] text-white px-6"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResourcesSection;

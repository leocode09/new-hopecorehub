
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Phone, AlertTriangle, MessageSquare, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SOSButton = () => {
  const [showInitialDialog, setShowInitialDialog] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showCallConfirmation, setShowCallConfirmation] = useState(false);
  const [showTextConfirmation, setShowTextConfirmation] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{name: string, number: string} | null>(null);

  const emergencyContacts = [
    { name: "Isange One Stop Center", number: "3029", description: "Gender-based violence support" },
    { name: "Rwanda Investigation Bureau (RIB)", number: "3512", description: "Criminal investigations & safety" },
    { name: "HopeCore Hub Team", number: "0780332779", description: "We'll help contact authorities" }
  ];

  const handleSOSClick = () => {
    setShowInitialDialog(true);
  };

  const handleCallOption = () => {
    setShowInitialDialog(false);
    setShowContactOptions(true);
  };

  const handleTextOption = () => {
    setShowInitialDialog(false);
    setShowTextConfirmation(true);
  };

  const handleContactSelect = (contact: {name: string, number: string}) => {
    setSelectedContact(contact);
    setShowContactOptions(false);
    setShowCallConfirmation(true);
  };

  const handleConfirmCall = () => {
    if (selectedContact) {
      // Create tel: link to open phone app
      const telLink = `tel:${selectedContact.number}`;
      window.location.href = telLink;
      
      toast({
        title: "Opening phone app",
        description: `Calling ${selectedContact.name}...`,
        variant: "default"
      });
    }
    
    // Reset state
    setShowCallConfirmation(false);
    setSelectedContact(null);
  };

  const handleConfirmText = () => {
    // Create SMS link for HopeCore Hub
    const smsLink = `sms:+250780332779`;
    const whatsappLink = `https://wa.me/250780332779`;
    
    // Try WhatsApp first, fallback to SMS
    try {
      window.open(whatsappLink, '_blank');
    } catch {
      window.location.href = smsLink;
    }
    
    toast({
      title: "Opening messaging app",
      description: "Connecting you with HopeCore Hub team...",
      variant: "default"
    });
    
    setShowTextConfirmation(false);
  };

  const resetDialogs = () => {
    setShowInitialDialog(false);
    setShowContactOptions(false);
    setShowCallConfirmation(false);
    setShowTextConfirmation(false);
    setSelectedContact(null);
  };

  return (
    <>
      <div className="flex justify-center">
        <Button
          onClick={handleSOSClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-base max-w-xs"
          size="lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          SOS - Emergency Help
        </Button>
      </div>

      {/* Initial Comforting Dialog */}
      <Dialog open={showInitialDialog} onOpenChange={setShowInitialDialog}>
        <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto text-center">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="flex items-center justify-center text-[#9E78E9] text-center">
              <Heart className="w-5 h-5 mr-2" />
              You Are Not Alone
            </DialogTitle>
            <DialogDescription className="space-y-4 text-center px-2">
              <p className="text-lg font-medium text-gray-800">
                Everything is going to be okay. 💜
              </p>
              <p className="text-sm">
                If you're in immediate danger, we're here to help connect you with the right support. 
                You are brave for reaching out.
              </p>
              <p className="text-sm text-gray-600 font-medium">
                How would you like to get help?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col space-y-3 mt-6 items-center">
            <Button 
              onClick={handleCallOption}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
            >
              <Phone className="w-4 h-4 mr-2" />
              Make a Phone Call
            </Button>
            <Button 
              onClick={handleTextOption}
              variant="outline" 
              className="w-full border-[#9E78E9] text-[#9E78E9] hover:bg-[#9E78E9]/10 py-3"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send a Text Message
            </Button>
            <Button 
              variant="ghost" 
              onClick={resetDialogs}
              className="w-full text-gray-500 py-2"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Selection Dialog */}
      <Dialog open={showContactOptions} onOpenChange={setShowContactOptions}>
        <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto text-center">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center text-red-600 text-center">
              <Phone className="w-5 h-5 mr-2" />
              Choose Emergency Contact
            </DialogTitle>
            <DialogDescription className="text-center">
              Select who you'd like to call for immediate assistance:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {emergencyContacts.map((contact) => (
              <Button
                key={contact.number}
                onClick={() => handleContactSelect(contact)}
                variant="outline"
                className="w-full h-auto p-4 text-center justify-center border-gray-200 hover:border-red-300 hover:bg-red-50"
              >
                <div className="w-full text-center">
                  <div className="font-semibold text-sm">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.number}</div>
                  <div className="text-xs text-gray-500 mt-1">{contact.description}</div>
                </div>
              </Button>
            ))}
          </div>
          <DialogFooter className="mt-6 flex justify-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowContactOptions(false)}
              className="w-full"
            >
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Call Confirmation Dialog */}
      <AlertDialog open={showCallConfirmation} onOpenChange={setShowCallConfirmation}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md mx-auto text-center">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="flex items-center justify-center text-red-600 text-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Confirm Emergency Call
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-center">
              <p>
                You are about to call <strong>{selectedContact?.name}</strong> at{" "}
                <strong>{selectedContact?.number}</strong>.
              </p>
              <p className="text-sm">
                This will open your phone app and dial the number. Local carrier charges may apply.
              </p>
              <p className="text-sm font-medium text-red-700">
                Are you sure you want to proceed with this emergency call?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-6 justify-center items-center">
            <AlertDialogCancel 
              onClick={() => setShowCallConfirmation(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCall}
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            >
              Yes, Call Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Text Confirmation Dialog */}
      <AlertDialog open={showTextConfirmation} onOpenChange={setShowTextConfirmation}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md mx-auto text-center">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="flex items-center justify-center text-[#9E78E9] text-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Text HopeCore Hub Team
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-center">
              <p>
                You can reach our support team via text message or WhatsApp at:
              </p>
              <p className="font-mono text-base bg-gray-100 p-3 rounded text-center mx-auto max-w-fit">
                +250 780-332-779
              </p>
              <p className="text-sm">
                This will open your messaging app. Local carrier charges may apply for SMS.
              </p>
              <p className="text-sm font-medium text-[#9E78E9]">
                Our team will help you contact the appropriate authorities and provide support.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-6 justify-center items-center">
            <AlertDialogCancel 
              onClick={() => setShowTextConfirmation(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmText}
              className="bg-[#9E78E9] hover:bg-[#8B69D6] w-full sm:w-auto"
            >
              Open Messaging App
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SOSButton;

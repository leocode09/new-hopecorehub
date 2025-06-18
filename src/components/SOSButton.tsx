
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SOSButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSOSClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSOS = () => {
    // In a real app, this would trigger actual emergency contacts
    toast({
      title: "Emergency Services Contacted",
      description: "Help is on the way. Stay safe.",
      variant: "destructive"
    });
    setShowConfirmation(false);
    
    // Simulate emergency contact
    console.log("Emergency contacts being reached:");
    console.log("- Isange One Stop Center: 3029");
    console.log("- Rwanda National Police: 3512");
    console.log("- HopeCore Team: +250780332779");
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

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Contact Confirmation
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>This will immediately contact:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Isange One Stop Center (3029)</li>
                <li>Rwanda National Police (3512)</li>
                <li>HopeCore Team (+250780332779)</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col space-y-2">
            <Button 
              onClick={handleConfirmSOS}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Get Help Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;

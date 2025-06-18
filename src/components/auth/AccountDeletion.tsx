
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useAuthEnhancements } from "@/hooks/useAuthEnhancements";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AccountDeletion = () => {
  const [confirmText, setConfirmText] = useState("");
  const [open, setOpen] = useState(false);
  const { deleteAccount, loading } = useAuthEnhancements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const { error } = await deleteAccount();
    if (!error) {
      navigate("/welcome");
    }
    setOpen(false);
  };

  const isConfirmValid = confirmText === "SIGN ME OUT";

  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-red-800 mb-2">Account Actions</h3>
      <p className="text-sm text-red-700 mb-4">
        For now, this will sign you out. Full account deletion will be implemented later.
      </p>
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Sign Out Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                This will sign you out of your account. You can sign back in anytime.
              </p>
              <p>
                Full account deletion will be implemented in a future update.
              </p>
              <div className="space-y-2">
                <Label htmlFor="confirm-signout">
                  Type <strong>SIGN ME OUT</strong> to confirm:
                </Label>
                <Input
                  id="confirm-signout"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="SIGN ME OUT"
                  className="font-mono"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={!isConfirmValid || loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing Out...
                </>
              ) : (
                'Sign Out'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountDeletion;

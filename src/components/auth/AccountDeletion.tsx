
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

  const isConfirmValid = confirmText === "DELETE MY ACCOUNT";

  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h3>
      <p className="text-sm text-red-700 mb-4">
        Once you delete your account, there is no going back. This action cannot be undone.
      </p>
      
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                This action cannot be undone. This will permanently delete your account
                and remove all your data from our servers.
              </p>
              <p>
                All your forum posts, messages, and profile information will be permanently lost.
              </p>
              <div className="space-y-2">
                <Label htmlFor="confirm-delete">
                  Type <strong>DELETE MY ACCOUNT</strong> to confirm:
                </Label>
                <Input
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
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
                  Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountDeletion;

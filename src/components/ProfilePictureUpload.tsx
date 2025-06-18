
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Upload, Crop } from 'lucide-react';

interface ProfilePictureUploadProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
}

const ProfilePictureUpload = ({ onUploadComplete, currentImageUrl }: ProfilePictureUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = (file: File, canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d')!;
        const size = Math.min(img.width, img.height);
        
        canvas.width = 400;
        canvas.height = 400;
        
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;
        
        ctx.drawImage(img, startX, startY, size, size, 0, 0, 400, 400);
        
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', 0.9);
      };
      img.src = preview;
    });
  };

  const handleUpload = async () => {
    if (!selectedFile || !user || !canvasRef.current) return;

    setIsUploading(true);
    try {
      const croppedBlob = await cropImage(selectedFile, canvasRef.current);
      const fileName = `${user.id}/${Date.now()}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, croppedBlob, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      onUploadComplete(data.publicUrl);
      setIsOpen(false);
      setSelectedFile(null);
      setPreview('');
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated."
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-transparent border-[#9E78E9] text-[#9E78E9] hover:bg-[#9E78E9] hover:text-white px-6 py-3 rounded-full"
        >
          Upload Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Update Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          {!preview ? (
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#9E78E9] hover:bg-[#8B69D6]"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Image
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative mx-auto w-48 h-48 rounded-lg overflow-hidden bg-gray-700">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-[#9E78E9] rounded-lg"></div>
                </div>
                <p className="text-sm text-gray-400 mt-3 flex items-center justify-center">
                  <Crop className="w-4 h-4 mr-1" />
                  Image will be cropped to square automatically
                </p>
              </div>
              
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="flex space-x-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-700"
                >
                  Choose Different
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 bg-[#9E78E9] hover:bg-[#8B69D6]"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;

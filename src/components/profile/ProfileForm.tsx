
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { useEffect } from "react";

interface ProfileFormData {
  full_name: string;
  nickname: string;
  phone: string;
  location: string;
  gender: string;
  anonymous_by_default: boolean;
  uses_avatar: boolean;
}

interface ProfileFormProps {
  formData: ProfileFormData;
  onFormDataChange: (data: ProfileFormData) => void;
}

type FormData = z.infer<typeof profileSchema>;

const ProfileForm = ({ formData, onFormDataChange }: ProfileFormProps) => {
  const { register, control, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: formData.full_name,
      nickname: formData.nickname,
      phone: formData.phone,
      location: formData.location,
      gender: formData.gender as any,
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    onFormDataChange({
      ...formData,
      ...watchedValues
    });
  }, [watchedValues, formData, onFormDataChange]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-white text-lg">
            Full Name (Optional)
          </Label>
          <Input
            {...register("full_name")}
            id="full_name"
            type="text"
            placeholder="Your name"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
            aria-describedby={errors.full_name ? "full_name-error" : undefined}
          />
          {errors.full_name && (
            <p id="full_name-error" className="text-sm text-red-400" role="alert">
              {errors.full_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname" className="text-white text-lg">
            Nickname <span className="text-red-400" aria-label="required">*</span>
          </Label>
          <Input
            {...register("nickname")}
            id="nickname"
            type="text"
            placeholder="What you'd like to be called"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
            aria-describedby={errors.nickname ? "nickname-error" : undefined}
            aria-required="true"
          />
          {errors.nickname && (
            <p id="nickname-error" className="text-sm text-red-400" role="alert">
              {errors.nickname.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white text-lg">
            Phone Number (Optional)
          </Label>
          <Input
            {...register("phone")}
            id="phone"
            type="tel"
            placeholder="Your phone number"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-red-400" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-white text-lg">
            Gender (Optional)
          </Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger 
                  className="bg-gray-700 border-gray-600 text-white rounded-xl h-14 text-lg"
                  aria-describedby={errors.gender ? "gender-error" : undefined}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="female" className="text-white hover:bg-gray-600">Female</SelectItem>
                  <SelectItem value="male" className="text-white hover:bg-gray-600">Male</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-gray-600">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say" className="text-white hover:bg-gray-600">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p id="gender-error" className="text-sm text-red-400" role="alert">
              {errors.gender.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white text-lg flex items-center">
            <span className="mr-2" aria-hidden="true">📍</span>
            Location (Optional)
          </Label>
          <Input
            {...register("location")}
            id="location"
            type="text"
            placeholder="Your location"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-xl h-14 text-lg"
            aria-describedby={errors.location ? "location-error" : "location-help"}
          />
          {errors.location && (
            <p id="location-error" className="text-sm text-red-400" role="alert">
              {errors.location.message}
            </p>
          )}
          <p id="location-help" className="text-sm text-gray-400">
            Used by authorities for emergency assistance only
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

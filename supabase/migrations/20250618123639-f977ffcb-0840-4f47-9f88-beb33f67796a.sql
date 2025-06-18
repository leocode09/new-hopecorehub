
-- Add gender column to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gender text;

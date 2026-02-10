-- Run this in Supabase SQL Editor to fix the missing column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'USER';

-- Optional: Set yourself as ADMIN immediately (Replace with your email)
-- UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'your_email@example.com';

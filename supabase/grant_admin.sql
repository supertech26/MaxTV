-- Replace 'YOUR_EMAIL' with your actual email address
-- Example: UPDATE public.profiles SET role = 'ADMIN' WHERE email = 'bob@example.com';

UPDATE public.profiles
SET role = 'ADMIN'
WHERE email = 'YOUR_EMAIL_HERE';

-- Check if it worked:
-- SELECT * FROM public.profiles WHERE role = 'ADMIN';

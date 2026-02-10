-- STEP 1: DELETE OLD ACCOUNT (Run this first)
DELETE FROM auth.users WHERE email = 'thete9ni@gmail.com';
DELETE FROM public.profiles WHERE email = 'thete9ni@gmail.com';

-- STEP 2: GO TO https://ipmaxtv.shop/register AND SIGN UP AGAIN
-- Use email: thete9ni@gmail.com
-- Use password: Majid1234

-- STEP 3: AFTER SIGNING UP, RUN THIS TO MAKE ADMIN (Uncomment and Run)
UPDATE public.profiles
SET role = 'ADMIN'
WHERE email = 'thete9ni@gmail.com';

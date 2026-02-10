-- Enable RLS updates/inserts for Admins using a function to check role or just simpler policies
-- NOTE: Prisma often bypasses RLS if connected via 'service_role' connection string. 
-- But adding these policies ensures security if using Client Libraries.

-- Policy: Admins can update any profile
CREATE POLICY "Admins can update any profile." ON public.profiles
  FOR UPDATE USING (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- Policy: Admins can update any subscription
CREATE POLICY "Admins can update any subscription." ON public.user_subscriptions
  FOR UPDATE USING (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- Policy: Admins can view all subscriptions
CREATE POLICY "Admins can view all subscriptions." ON public.user_subscriptions
  FOR SELECT USING (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

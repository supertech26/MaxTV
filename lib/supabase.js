import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use Service Role Key for backend operations (uploads) to bypass RLS need for simple uploads, 
// or use Anon Key if RLS is correctly configured for unauthenticated uploads.
// For now, we prefer Service Role for API routes to ensure it works.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // We don't throw here to avoid build errors if env vars are missing during build time
    console.warn('Missing Supabase Environment Variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

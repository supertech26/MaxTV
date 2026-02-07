import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, and PDF allowed.' }, { status: 400 });
        }

        // Validate file size (e.g. 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size too large (max 5MB).' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();

        // Create unique filename
        const filename = Date.now() + '_' + file.name.replace(/\s/g, '_');

        // Upload to Supabase Storage
        // Upload to Supabase Storage
        // Use Admin client if available to bypass RLS, otherwise use public client
        const lib = await import('@/lib/supabase');
        const supabaseClient = lib.supabaseAdmin || lib.supabase;

        const usingAdmin = !!lib.supabaseAdmin;
        console.log(`[Upload] Using Admin Client: ${usingAdmin}`);

        if (!usingAdmin) {
            console.warn('[Upload] Warning: Fallback to Anon client. RLS policies may block upload.');
        }

        const { data, error } = await supabaseClient
            .storage
            .from('payment-proofs')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase Upload Error:', error);
            // Return specific error for debugging
            return NextResponse.json({
                error: `Upload Error: ${error.message} (Admin: ${usingAdmin})`
            }, { status: 500 });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabaseClient
            .storage
            .from('payment-proofs')
            .getPublicUrl(filename);

        return NextResponse.json({ success: true, url: publicUrl });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
    }
}

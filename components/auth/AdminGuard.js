"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseAuthClient';

export default function AdminGuard({ children }) {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            if (authLoading) return;

            if (!user) {
                router.push('/login');
                return;
            }

            // Fetch role from profile
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error || data?.role !== 'ADMIN') {
                console.warn('Access denied: Not an admin', data?.role);
                router.push('/dashboard'); // Kick non-admins out
            } else {
                setIsAdmin(true);
            }
            setCheckingRole(false);
        };

        checkRole();
    }, [user, authLoading, router]);

    if (authLoading || checkingRole) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#050b18] text-white">
                <div className="text-xl">Verifying Admin Access...</div>
            </div>
        );
    }

    if (!isAdmin) return null; // Don't render anything while redirecting

    return children;
}

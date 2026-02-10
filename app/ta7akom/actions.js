'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Middleware-like check for admin role
async function checkAdmin(email) {
    if (!email) return false;
    const user = await prisma.profile.findFirst({
        where: { email },
        select: { role: true }
    });
    return user?.role === 'ADMIN';
}

export async function updateSubscription(subscriptionId, m3uUrl, endDate, adminEmail) {
    try {
        const isAdmin = await checkAdmin(adminEmail);
        if (!isAdmin) return { error: 'Unauthorized' };

        const validDate = endDate ? new Date(endDate) : null;

        await prisma.userSubscription.update({
            where: { id: subscriptionId },
            data: {
                m3uUrl: m3uUrl,
                endDate: validDate,
                status: validDate && validDate > new Date() ? 'active' : 'expired'
            }
        });

        revalidatePath('/ta7akom');
        return { success: true };
    } catch (error) {
        console.error('Update Sub Error:', error);
        return { error: error.message };
    }
}

export async function updateUserRole(userId, newRole, adminEmail) {
    try {
        const isAdmin = await checkAdmin(adminEmail);
        if (!isAdmin) return { error: 'Unauthorized' };

        await prisma.profile.update({
            where: { id: userId },
            data: { role: newRole }
        });

        revalidatePath('/ta7akom');
        return { success: true };
    } catch (error) {
        console.error('Update Role Error:', error);
        return { error: error.message };
    }
}

export async function fetchAllData(adminEmail) {
    const isAdmin = await checkAdmin(adminEmail);
    if (!isAdmin) return { error: 'Unauthorized' };

    const [subscriptions, profiles] = await Promise.all([
        prisma.userSubscription.findMany({
            include: {
                user: { select: { id: true, email: true, fullName: true, role: true } },
                plan: { select: { name: true } }
            },
            orderBy: { updatedAt: 'desc' }
        }),
        prisma.profile.findMany({
            orderBy: { updatedAt: 'desc' } // Just to have list of all users if needed
        })
    ]);

    // Calculate generic stats
    const totalUsers = profiles.length;
    const activeSubs = subscriptions.filter(s => s.status === 'active').length;
    const pendingSubs = subscriptions.filter(s => s.status === 'pending').length;

    return {
        data: {
            subscriptions,
            stats: { totalUsers, activeSubs, pendingSubs }
        }
    };
}

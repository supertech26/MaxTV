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
        console.log(`[Admin] Updating subscription: ${subscriptionId} by ${adminEmail}`);
        const isAdmin = await checkAdmin(adminEmail);
        if (!isAdmin) {
            console.warn(`[Admin] Unauthorized access attempt by ${adminEmail}`);
            return { error: 'Unauthorized: Admin access required' };
        }

        const validDate = endDate ? new Date(endDate) : null;

        await prisma.userSubscription.update({
            where: { id: subscriptionId },
            data: {
                m3uUrl: m3uUrl,
                endDate: validDate,
                status: validDate > new Date() ? 'active' : 'expired' // Auto-update status
            }
        });

        revalidatePath('/admin');
        console.log(`[Admin] Successfully updated subscription: ${subscriptionId}`);
        return { success: true };
    } catch (error) {
        console.error('Update Subscription Error:', error);
        return { error: 'Failed to update: ' + error.message };
    }
}

export async function fetchAllSubscriptions(adminEmail) {
    const isAdmin = await checkAdmin(adminEmail);
    if (!isAdmin) return { error: 'Unauthorized' };

    const subscriptions = await prisma.userSubscription.findMany({
        include: {
            user: {
                select: { email: true, fullName: true }
            },
            plan: {
                select: { name: true }
            }
        },
        orderBy: { updatedAt: 'desc' }
    });

    return { data: subscriptions };
}

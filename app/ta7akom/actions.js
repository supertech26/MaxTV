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

export async function updateSubscription(subscriptionId, data, adminEmail) {
    try {
        const isAdmin = await checkAdmin(adminEmail);
        if (!isAdmin) return { error: 'Unauthorized' };

        // Clean undefined values
        const updateData = {};
        if (data.m3uUrl !== undefined) updateData.m3uUrl = data.m3uUrl;
        if (data.macAddress !== undefined) updateData.macAddress = data.macAddress; // Add MAC support
        if (data.status !== undefined) updateData.status = data.status;

        if (data.endDate) {
            const validDate = new Date(data.endDate);
            updateData.endDate = validDate;
            // Auto update status if not explicitly set
            if (!data.status) {
                updateData.status = validDate > new Date() ? 'active' : 'expired';
            }
        }

        await prisma.userSubscription.update({
            where: { id: subscriptionId },
            data: updateData
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

    const [subscriptions, profiles, orders] = await Promise.all([
        prisma.userSubscription.findMany({
            include: {
                user: { select: { id: true, email: true, fullName: true, role: true } },
                plan: { select: { name: true } }
            },
            orderBy: { updatedAt: 'desc' }
        }),
        prisma.profile.findMany({
            orderBy: { updatedAt: 'desc' }
        }),
        prisma.order.findMany({
            include: {
                user: { select: { email: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    // Calculate generic stats
    const totalUsers = profiles.length;
    const activeSubs = subscriptions.filter(s => s.status === 'active').length;
    const pendingSubs = subscriptions.filter(s => s.status === 'pending').length;
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

    return {
        data: {
            subscriptions,
            profiles,
            orders,
            stats: { totalUsers, activeSubs, pendingSubs, totalRevenue }
        }
    };
}

'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getUserDashboardData(userEmail) {
    if (!userEmail) return { error: 'Not authenticated' };

    try {
        const user = await prisma.profile.findFirst({
            where: { email: userEmail },
            include: {
                subscriptions: {
                    include: { plan: true },
                    orderBy: { endDate: 'desc' }, // Get latest sub first
                    take: 1
                },
                orders: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }
            }
        });

        if (!user) return { error: 'User not found' };

        const activeSub = user.subscriptions[0] || null;

        // Calculate days remaining if active
        let daysRemaining = 0;
        let progress = 0;

        if (activeSub && activeSub.endDate) {
            const now = new Date();
            const end = new Date(activeSub.endDate);
            const start = new Date(activeSub.createdAt);

            if (end > now) {
                const totalDuration = (end - start) || 1; // Prevent division by zero
                const elapsed = now - start;
                const remaining = end - now;

                daysRemaining = Math.ceil(remaining / (1000 * 60 * 60 * 24));
                // progress: 100% means full time remaining, 0% means expired
                // Actually usually progress bar shows elapsed time. Let's show remaining %
                // 100% full bar = 100% time left.
                progress = Math.max(0, Math.min(100, (remaining / totalDuration) * 100));
            }
        }

        return {
            data: {
                subscription: activeSub ? {
                    ...activeSub,
                    daysRemaining,
                    progress,
                    planName: activeSub.plan?.name || 'Custom Plan'
                } : null,
                orders: user.orders.map(o => ({
                    id: o.id,
                    date: o.createdAt,
                    amount: o.total,
                    status: o.status,
                    items: JSON.parse(JSON.stringify(o.items || [])) // reliable parsing
                })),
                user: {
                    name: user.fullName || userEmail.split('@')[0],
                    email: user.email
                }
            }
        };

    } catch (error) {
        console.error("Dashboard Data Error:", error);
        return { error: "Failed to load dashboard data" };
    }
}

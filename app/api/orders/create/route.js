import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendOrderConfirmation } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            planId,
            price,
            type, // 'SUBSCRIPTION' or 'LICENSE'
            paymentMethod,
            transactionId,
            userEmail, // Should come from session, but for now from client
            macAddress,
            appPlayer,
            deviceKey
        } = body;

        // 1. Find or Create User (Mock Auth fallback)
        // In real app, get user from session. Here we trust the email for now or create a guest user.
        let user = await prisma.user.findUnique({
            where: { email: userEmail }
        });

        if (!user) {
            // Create a new user if not exists (Auto-register for guest checkout)
            user = await prisma.user.create({
                data: {
                    email: userEmail,
                    password: 'temp-password', // Placeholder
                    name: userEmail.split('@')[0],
                    role: 'USER'
                }
            });
        }

        // 2. Create Order
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total: parseFloat(price),
                currency: 'EUR',
                status: 'PENDING', // Default
                paymentStatus: paymentMethod === 'PAYPAL' ? 'PAID' : 'PENDING', // Assume PayPal is paid if we get here with ID
                paymentMethod: paymentMethod,
                transactionId: transactionId,
                items: {
                    create: {
                        productId: planId, // Using planId as productId for simplicity or relation
                        price: parseFloat(price),
                        macAddress: macAddress,
                        // If it's a subscription, we might want to create the subscription record too
                    }
                }
            },
            include: { items: true }
        });

        // 3. Create Subscription or License Record
        if (type === 'SUBSCRIPTION' || type === 'LICENSE') {
            await prisma.subscription.create({
                data: {
                    userId: user.id,
                    orderItemId: order.items[0].id,
                    macAddress: macAddress,
                    status: 'PENDING',
                    // Calculate end date based on planId (e.g. 12-months)
                    startDate: new Date(),
                    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Mock 1 year
                }
            });
        }

        // 4. Send Confirmation Email
        // We do this asynchronously without awaiting to ensure fast response, or await if critical.
        // For reliability, we await it here.
        await sendOrderConfirmation(order, userEmail);

        return NextResponse.json({ success: true, orderId: order.id });

    } catch (error) {
        console.error('Order Creation Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/email';


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
                status: 'PENDING',
                paymentStatus: paymentMethod === 'PAYPAL' ? 'PAID' : 'PENDING',
                paymentMethod: paymentMethod,
                transactionId: transactionId,
                paymentProof: body.paymentProof || null, // FIX: Save the proof URL
                items: {
                    create: {
                        product: {
                            connectOrCreate: {
                                where: { id: planId },
                                create: {
                                    id: planId,
                                    name: type === 'SUBSCRIPTION' ? `${planId} Subscription` : 'App License',
                                    price: parseFloat(price),
                                    description: `Auto-created for ${planId}`,
                                    duration: planId.includes('12') ? 12 : 1, // Simple guess
                                    type: type
                                }
                            }
                        },
                        price: parseFloat(price),
                        macAddress: macAddress,
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

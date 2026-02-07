
import { Resend } from 'resend';
import { orderConfirmationTemplate } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order, userEmail) {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_123')) {
        console.warn("Resend API Key is missing or invalid. Email not sent.");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: 'MAXTV <orders@ipmaxtv.shop>', // User needs to verify domain or use onboard address
            to: [userEmail],
            subject: `Order Confirmation #${order.id}`,
            html: orderConfirmationTemplate(order),
        });

        console.log("Email sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to send email:", error);
        return null; // Don't block order creation on email fail
    }
}

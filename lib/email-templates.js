
export const orderConfirmationTemplate = (order) => {
    const { id, total, currency, items, paymentMethod } = order;
    const date = new Date().toLocaleDateString();

    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .accent { color: #00dc82; }
        .content { padding: 20px; }
        .order-details { background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .item { border-bottom: 1px solid #ddd; padding: 10px 0; display: flex; justify-content: space-between; }
        .total { font-size: 1.2em; font-weight: bold; text-align: right; margin-top: 10px; }
        .footer { text-align: center; font-size: 0.8em; color: #777; margin-top: 30px; }
        .button { display: inline-block; background: #00dc82; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Order Confirmed!</h1>
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>Thank you for your purchase from <strong>MAX<span class="accent">TV</span></strong>. Your order has been received and is being processed.</p>
            
            <div class="order-details">
                <h3>Order #${id}</h3>
                <p>Date: ${date}</p>
                <p>Payment Method: ${paymentMethod}</p>
                
                <div style="margin-top: 15px;">
                    ${items.map(item => `
                        <div class="item">
                            <span>${item.productId || 'Subscription'}</span>
                            <span>€${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="total">
                    Total: €${total}
                </div>
            </div>

            <p>If you purchased an IPTV Subscription, your M3U credentials will be sent in a separate email shortly after activation.</p>
            
            <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View Order in Dashboard</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MAXTV. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
};

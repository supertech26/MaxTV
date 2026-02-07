"use client";

export default function AdminOrders() {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Orders & Invoices</h1>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-9001</td>
                            <td>john@example.com</td>
                            <td>05 Feb 2024</td>
                            <td>€59.00</td>
                            <td>PayPal</td>
                            <td><span className="status completed">Paid</span></td>
                            <td><button className="btn-link">Download</button></td>
                        </tr>
                        <tr>
                            <td>#ORD-9002</td>
                            <td>sarah@test.com</td>
                            <td>04 Feb 2024</td>
                            <td>€15.00</td>
                            <td>Crypto (USDT)</td>
                            <td><span className="status pending">Pending</span></td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .table-card {
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border); }
        
        .status { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .completed { color: #00dc82; background: rgba(0, 220, 130, 0.1); }
        .pending { color: #ffd700; background: rgba(255, 215, 0, 0.1); }
        
        .btn-link {
            background: none;
            border: none;
            color: var(--primary);
            text-decoration: underline;
            cursor: pointer;
        }
      `}</style>
        </div>
    );
}

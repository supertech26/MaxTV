"use client";
import Button from '@/components/ui/Button';

export default function Orders() {
    return (
        <div>
            <h1 className="page-title">Order History</h1>

            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-9921</td>
                            <td>06 Feb 2026</td>
                            <td><span className="status completed">Completed</span></td>
                            <td>€65.99</td>
                            <td><Button variant="outline" size="sm">Invoice</Button></td>
                        </tr>
                        <tr>
                            <td>#ORD-8821</td>
                            <td>01 Jan 2026</td>
                            <td><span className="status completed">Completed</span></td>
                            <td>€12.00</td>
                            <td><Button variant="outline" size="sm">Invoice</Button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .page-title { margin-bottom: 2rem; }
        
        .orders-table-container {
            overflow-x: auto;
            background: var(--secondary);
            border-radius: 12px;
            border: 1px solid var(--border);
        }
        .orders-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px;
        }
        .orders-table th, .orders-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }
        .orders-table th {
            background: rgba(255,255,255,0.02);
            font-weight: 600;
            color: var(--text-muted);
        }
        .orders-table tr:last-child td { border-bottom: none; }
        
        .status {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .status.completed { background: rgba(0, 220, 130, 0.1); color: var(--primary); }
        .status.pending { background: rgba(255, 171, 0, 0.1); color: #ffab00; }
      `}</style>
        </div>
    );
}

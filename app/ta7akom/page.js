"use client";
export default function AdminDashboard() {
    return (
        <div>
            <div className="stats-cards">
                <div className="card">
                    <h3>Total Revenue</h3>
                    <p className="value">€12,450</p>
                    <span className="trend positive">+15% this week</span>
                </div>
                <div className="card">
                    <h3>Active Subs</h3>
                    <p className="value">1,240</p>
                    <span className="trend positive">+45 new</span>
                </div>
                <div className="card">
                    <h3>Pending Orders</h3>
                    <p className="value">5</p>
                    <span className="trend warning">Action needed</span>
                </div>
            </div>

            <h3 className="section-title">Recent Orders</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-8832</td>
                            <td>john@example.com</td>
                            <td>12 Months IPTV</td>
                            <td><span className="status active">Completed</span></td>
                            <td>Today, 10:30 AM</td>
                            <td><button className="btn-sm">View</button></td>
                        </tr>
                        <tr>
                            <td>#ORD-8831</td>
                            <td>sarah@test.com</td>
                            <td>Samsung License</td>
                            <td><span className="status pending">Pending</span></td>
                            <td>Yesterday</td>
                            <td><button className="btn-sm">View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .card {
          background: var(--secondary);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
          border-color: var(--primary);
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
        }
        .card h3 { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--foreground); }
        .trend { font-size: 0.8rem; border-radius: 6px; padding: 4px 8px; font-weight: 600; }
        .trend.positive { color: #00dc82; background: rgba(0, 220, 130, 0.1); }
        .trend.warning { color: #ffd700; background: rgba(255, 215, 0, 0.1); }
        
        .section-title { margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700; }
        
        .table-container {
          background: var(--secondary);
          border-radius: 20px;
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 1.25rem 1.5rem; text-align: left; border-bottom: 1px solid var(--border); }
        th { color: var(--text-muted); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(0,0,0,0.2); }
        td { font-size: 0.95rem; font-weight: 500; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        
        .status { padding: 6px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status.active { background: rgba(0, 220, 130, 0.15); color: #00dc82; box-shadow: 0 0 10px rgba(0, 220, 130, 0.2); }
        .status.pending { background: rgba(255, 215, 0, 0.15); color: #ffd700; box-shadow: 0 0 10px rgba(255, 215, 0, 0.2); }
        
        .btn-sm {
          padding: 6px 16px;
          border-radius: 8px;
          background: var(--background);
          color: var(--foreground);
          border: 1px solid var(--border);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .btn-sm:hover {
            border-color: var(--primary);
            color: var(--primary);
            background: rgba(var(--primary-rgb), 0.1);
        }
      `}</style>
        </div>
    );
}

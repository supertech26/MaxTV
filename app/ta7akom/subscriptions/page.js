"use client";
import { useState } from 'react';

export default function AdminSubscriptions() {
    const [subs, setSubs] = useState([
        { id: 101, user: 'john@example.com', plan: '12 Months IPTV', mac: '00:1A:79:XX:XX:XX', status: 'Active', expires: '2025-02-05' },
        { id: 102, user: 'sarah@test.com', plan: 'Samsung License', mac: 'BC:54:21:XX:XX:XX', status: 'Pending', expires: '-' },
        { id: 103, user: 'david@mail.com', plan: '3 Months IPTV', mac: 'Pending', status: 'Expired', expires: '2024-01-10' },
    ]);

    const activate = (id) => {
        setSubs(subs.map(s => s.id === id ? { ...s, status: 'Active', expires: '2025-02-05' } : s));
    };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Subscription Management</h1>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Plan</th>
                            <th>MAC Address</th>
                            <th>Status</th>
                            <th>Expires</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subs.map(sub => (
                            <tr key={sub.id}>
                                <td>#{sub.id}</td>
                                <td>{sub.user}</td>
                                <td>{sub.plan}</td>
                                <td><code className="mac">{sub.mac}</code></td>
                                <td>
                                    <span className={`status-badge ${sub.status.toLowerCase()}`}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td>{sub.expires}</td>
                                <td>
                                    <div className="actions">
                                        {sub.status === 'Pending' && (
                                            <button className="btn-action activate" onClick={() => activate(sub.id)}>Activate</button>
                                        )}
                                        {sub.status === 'Active' && (
                                            <button className="btn-action extend">Extend</button>
                                        )}
                                        <button className="btn-action edit">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .table-card {
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow-x: auto;
        }
        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: rgba(0,0,0,0.2); }
        
        .mac {
            background: #111;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85rem;
            color: #ddd;
        }

        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .active { color: #00dc82; background: rgba(0, 220, 130, 0.1); }
        .pending { color: #ffd700; background: rgba(255, 215, 0, 0.1); }
        .expired { color: #ff5b5b; background: rgba(255, 91, 91, 0.1); }

        .actions { display: flex; gap: 0.5rem; }
        .btn-action {
            padding: 4px 10px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .activate { background: #00dc82; color: #000; }
        .extend { background: #3b82f6; color: white; }
        .edit { background: #2d323f; color: white; }
      `}</style>
        </div>
    );
}

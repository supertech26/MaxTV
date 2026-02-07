"use client";
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function AdminUsers() {
    // Mock Users Data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'USER', status: 'Active', joined: '2024-01-15' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@test.com', role: 'USER', status: 'Active', joined: '2024-02-01' },
        { id: 3, name: 'Mike Admin', email: 'admin@ipmaxtv.shop', role: 'ADMIN', status: 'Active', joined: '2023-12-01' },
        { id: 4, name: 'Banned User', email: 'bad@actor.com', role: 'USER', status: 'Suspended', joined: '2024-01-20' },
    ]);

    const toggleStatus = (id) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
        ));
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>User Management</h1>
                <Button size="sm">Add New User</Button>
            </div>

            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span className={`badge role-${user.role.toLowerCase()}`}>{user.role}</span></td>
                                <td>
                                    <span className={`badge status-${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>{user.joined}</td>
                                <td>
                                    <div className="actions">
                                        <button className="btn-icon" title="Edit">✏️</button>
                                        {user.email !== 'admin@ipmaxtv.shop' && (
                                            <button
                                                className="btn-icon text-danger"
                                                onClick={() => toggleStatus(user.id)}
                                                title={user.status === 'Active' ? 'Suspend' : 'Activate'}
                                            >
                                                {user.status === 'Active' ? '🚫' : '✅'}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .table-card {
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: rgba(0,0,0,0.2); color: var(--text-muted); font-size: 0.875rem; }
        
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .role-admin { background: #7c3aed; color: white; }
        .role-user { background: #2d323f; color: #ccc; }
        .status-active { color: #00dc82; background: rgba(0, 220, 130, 0.1); }
        .status-suspended { color: #ff5b5b; background: rgba(255, 91, 91, 0.1); }
        
        .actions { display: flex; gap: 0.5rem; }
        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 4px;
          border-radius: 4px;
        }
        .btn-icon:hover { background: rgba(255,255,255,0.1); }
      `}</style>
        </div>
    );
}

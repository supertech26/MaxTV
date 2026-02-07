"use client";
import Button from '@/components/ui/Button';

export default function Settings() {
    return (
        <div>
            <h1 className="page-title">Account Settings</h1>

            <div className="settings-card">
                <h3>Personal Information</h3>
                <form className="settings-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" defaultValue="John Doe" className="input" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" defaultValue="john@example.com" disabled className="input disabled" />
                    </div>
                    <Button>Save Changes</Button>
                </form>
            </div>

            <div className="settings-card" style={{ marginTop: '2rem' }}>
                <h3>Security</h3>
                <form className="settings-form">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" placeholder="••••••" className="input" />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" placeholder="New Password" className="input" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                </form>
            </div>

            <style jsx>{`
        .page-title { margin-bottom: 2rem; }
        
        .settings-card {
            background: var(--secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
        }
        h3 { margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            color: var(--text-muted);
        }
        .input {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background: var(--background);
            color: var(--foreground);
        }
        .input.disabled { opacity: 0.7; cursor: not-allowed; }
        .input:focus { outline: none; border-color: var(--primary); }
      `}</style>
        </div>
    );
}

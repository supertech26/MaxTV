"use client";
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        freeTrial: true,
        whatsappAlerts: true,
        emailNotifications: true,
        maintenanceMode: false
    });

    const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

    return (
        <div className="settings-page">
            <h1>System Settings</h1>

            <div className="settings-grid">
                {/* General Settings */}
                <div className="card">
                    <h3>General Configuration</h3>
                    <div className="setting-item">
                        <div className="info">
                            <label>Free Trial System</label>
                            <p>Allow users to claim 24h free trials</p>
                        </div>
                        <div className="toggle" onClick={() => toggle('freeTrial')}>
                            <div className={`switch ${settings.freeTrial ? 'on' : 'off'}`}></div>
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="info">
                            <label>Maintenance Mode</label>
                            <p>Disable frontend for all non-admin users</p>
                        </div>
                        <div className="toggle" onClick={() => toggle('maintenanceMode')}>
                            <div className={`switch ${settings.maintenanceMode ? 'on' : 'off'}`}></div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="card">
                    <h3>Notifications</h3>
                    <div className="setting-item">
                        <div className="info">
                            <label>WhatsApp Admin Alerts</label>
                            <p>Receive alert when new order is placed</p>
                        </div>
                        <div className="toggle" onClick={() => toggle('whatsappAlerts')}>
                            <div className={`switch ${settings.whatsappAlerts ? 'on' : 'off'}`}></div>
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="info">
                            <label>Email System</label>
                            <p>Send automated emails (Welcome, Invoice, etc)</p>
                        </div>
                        <div className="toggle" onClick={() => toggle('emailNotifications')}>
                            <div className={`switch ${settings.emailNotifications ? 'on' : 'off'}`}></div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="card">
                    <h3>Pricing Management</h3>
                    <p className="hint">Update base prices for plans.</p>
                    <div className="prices-form">
                        <div className="input-group">
                            <label>12 Months IPTV</label>
                            <input type="text" defaultValue="€59.00" />
                        </div>
                        <div className="input-group">
                            <label>6 Months IPTV</label>
                            <input type="text" defaultValue="€39.00" />
                        </div>
                        <Button size="sm">Save Prices</Button>
                    </div>
                </div>

            </div>

            <style jsx>{`
        .settings-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .card {
            background: var(--secondary);
            border: 1px solid var(--border);
            padding: 1.5rem;
            border-radius: 12px;
        }
        .card h3 { margin-bottom: 1.5rem; color: var(--foreground); }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .info label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
        .info p { font-size: 0.85rem; color: var(--text-muted); }
        
        .toggle { cursor: pointer; }
        .switch {
            width: 50px; height: 26px; border-radius: 13px;
            background: #333; position: relative;
            transition: background 0.3s;
        }
        .switch.on { background: var(--primary); }
        .switch::after {
            content: ''; position: absolute; top: 3px; left: 3px;
            width: 20px; height: 20px; background: white; border-radius: 50%;
            transition: transform 0.3s;
        }
        .switch.on::after { transform: translateX(24px); }
        
        .hint { margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem; }
        .prices-form { display: flex; flex-direction: column; gap: 1rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; }
        .input-group input {
            width: 100%; padding: 8px; background: #111; border: 1px solid var(--border);
            color: white; border-radius: 4px;
        }
      `}</style>
        </div>
    );
}

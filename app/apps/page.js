"use client";
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandSlider from '@/components/sections/BrandSlider';

export default function Apps() {
    const [activeTab, setActiveTab] = useState('license'); // 'license' or 'download'
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        device: null,
        app: null,
        plan: null,
        mac: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const [message, setMessage] = useState('');
    const [inquirySent, setInquirySent] = useState(false);

    const downloadsList = [
        {
            id: 'ibo',
            name: 'IBO Player',
            icon: '▶',
            code: '839281',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'hot',
            name: 'Hot Player',
            icon: '🔥',
            code: '112233',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'smarters',
            name: 'IPTV Smarters',
            icon: '⚡',
            code: '456789',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Downloader', url: '#', type: 'android' },
                { name: 'iOS App Store', url: '#', type: 'apple' }
            ]
        },
        {
            id: 'bob',
            name: 'BOB Player',
            icon: '🅱',
            code: '998877',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'ibopro',
            name: 'IBO Player Pro',
            icon: '🚀',
            code: '777888',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'family',
            name: 'Family Player',
            icon: '👨‍👩‍👧',
            code: '556677',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'smartone',
            name: 'SmartOne',
            icon: '1️⃣',
            code: '224466',
            platforms: [
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' },
                { name: 'Vidaa Store', url: '#', type: 'android' }
            ]
        },
        {
            id: 'virginia',
            name: 'VIRGINIA Player',
            icon: '🎨',
            code: '334455',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'ktn',
            name: 'KTN Player',
            icon: '📺',
            code: '667788',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Downloader', url: '#', type: 'android' }
            ]
        },
        {
            id: 'king4k',
            name: 'KING 4K Player',
            icon: '👑',
            code: '990011',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'abe',
            name: 'ABEPlayerTV',
            icon: '📺',
            code: '123123',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'bobpro',
            name: 'BOB PRO',
            icon: '🅱+',
            code: '554433',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'duplex',
            name: 'Duplex Play',
            icon: '▶️',
            code: '776655',
            platforms: [
                { name: 'Windows', url: '#', type: 'android' },
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Xbox', url: '#', type: 'android' }
            ]
        },
        {
            id: 'iboss',
            name: 'IBOSS PLAYER',
            icon: '📺',
            code: '889900',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        },
        {
            id: 'ibostb',
            name: 'IBO STB',
            icon: '📟',
            code: '223344',
            platforms: [
                { name: 'Android APK', url: '#', type: 'android' },
                { name: 'Samsung Store', url: '#', type: 'samsung' },
                { name: 'LG Content Store', url: '#', type: 'lg' }
            ]
        }
    ];

    // Custom SVG Icons
    const Icons = {
        TV: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>,
        Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
        Fire: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2.5 3.1 4.1 3 1.8 0 2-1 2-2z" /></svg>,
        Play: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
        Star: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        Rocket: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
    };



    const devices = [
        { id: 'samsung', name: 'Samsung TV', Icon: Icons.TV, bg: '#0057b7' },     // Samsung Blue
        { id: 'lg', name: 'LG TV', Icon: Icons.TV, bg: '#a50034' },           // LG Red
        { id: 'vidaa', name: 'VIDAA TV', Icon: Icons.TV, bg: '#00bfa5' },       // Teal
        { id: 'other', name: 'Other Devices', Icon: Icons.Phone, bg: '#6200ea' } // Purple
    ];

    const appsList = [
        { id: 'hot', name: 'Hot Player', Icon: Icons.Fire, device: ['samsung', 'lg', 'vidaa'], bg: '#ff3d00' },
        { id: 'ibo', name: 'IBO Player', Icon: Icons.Play, device: ['samsung', 'lg', 'vidaa'], bg: '#2962ff' },
        { id: 'ibopro', name: 'IBO Player Pro', Icon: Icons.Rocket, device: ['samsung', 'lg', 'vidaa'], bg: '#6200ea' },
        { id: 'bob', name: 'BOB Player', Icon: Icons.Play, device: ['samsung', 'lg', 'vidaa'], bg: '#d50000' },
        { id: 'smartone', name: 'SmartOne', Icon: Icons.Star, device: ['samsung', 'lg', 'vidaa'], bg: '#ffd600' },
        { id: 'vu', name: 'VU Player', Icon: Icons.TV, device: ['samsung', 'lg', 'vidaa'], bg: '#00c853' }
    ];

    const plans = [
        { id: '12m', name: '12 Months', price: 7, label: '€7.00', bg: '#263238' },
        { id: 'life', name: 'Lifetime', price: 12, label: '€12.00', bg: '#00c853' }
    ];

    const handleSelect = (field, value) => {
        if (field === 'device' && value.id === 'other') {
            setSelection(prev => ({ ...prev, device: value }));
            setStep('inquiry'); // Jump to inquiry step
            return;
        }
        setSelection(prev => ({ ...prev, [field]: value }));
        setStep(prev => prev + 1);
    };

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setInquirySent(true);
        }, 1500);
    };

    const router = useRouter(); // Import useRouter

    const handlePayment = () => {
        setIsProcessing(true);
        const params = new URLSearchParams({
            plan: 'license', // distinct type
            price: selection.plan.price,
            name: `${selection.app.name} (${selection.plan.name})`,
            type: 'app_license'
        });
        router.push(`/checkout?${params.toString()}`);
    };

    const handleActivation = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate activation API call
        setTimeout(() => {
            setIsProcessing(false);
            setStep(6); // Success
        }, 2000);
    };

    // Filter apps based on device selection
    const filteredApps = appsList.filter(app => !app.device || app.device.includes(selection.device?.id));

    return (
        <main>
            <Header />
            <section className="page-header container">
                <h1>Smart TV Player Licenses</h1>
                <p>Activate your favorite player application instantly.</p>

                {/* Main Tabs */}
                <div className="main-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'license' ? 'active' : ''}`}
                        onClick={() => setActiveTab('license')}
                    >
                        📝 Buy License
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}
                        onClick={() => setActiveTab('download')}
                    >
                        ⬇️ Download Apps
                    </button>
                </div>

                {/* Progress Steps (Only for License Tab) */}
                {activeTab === 'license' && (
                    <div className="steps-indicator">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <div key={num} className={`step-dot ${step >= num ? 'active' : ''}`}>
                                {step > num ? '✓' : num}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="container section-pad content-area">

                {/* DOWNLOADS TAB */}
                {activeTab === 'download' && (
                    <div className="downloads-grid fade-in">
                        {downloadsList.map(app => (
                            <div key={app.id} className="download-card">
                                <div className="app-header">
                                    <div className="app-icon">{app.icon}</div>
                                    <h3>{app.name}</h3>
                                </div>
                                <div className="downloader-info">
                                    <span>Downloader Code:</span>
                                    <code className="code-badge">{app.code}</code>
                                </div>
                                <div className="platform-links">
                                    {app.platforms.map((platform, idx) => (
                                        <a href={platform.url} key={idx} className={`dl-btn ${platform.type}`}>
                                            {platform.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* LICENSE WIZARD TAB */}
                {activeTab === 'license' && step === 1 && (
                    <div className="step-container fade-in">
                        <h2>Select Your Device</h2>
                        <div className="grid-options">
                            {devices.map(device => (
                                <div key={device.id} className="option-card" onClick={() => handleSelect('device', device)}>
                                    <div className="icon"><device.Icon /></div>
                                    <h3>{device.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: App Selection */}
                {activeTab === 'license' && step === 2 && (
                    <div className="step-container fade-in">
                        <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
                        <h2>Select Application for {selection.device?.name}</h2>
                        <div className="grid-options">
                            {filteredApps.map(app => (
                                <div key={app.id} className="option-card" onClick={() => handleSelect('app', app)}>
                                    <div className="icon"><app.Icon /></div>
                                    <h3>{app.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Plan Selection */}
                {activeTab === 'license' && step === 3 && (
                    <div className="step-container fade-in">
                        <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
                        <h2>Select Subscription Duration</h2>
                        <div className="grid-options">
                            {plans.map(plan => (
                                <div key={plan.id} className="option-card plan-card" onClick={() => handleSelect('plan', plan)}>
                                    <h3>{plan.name}</h3>
                                    <div className="price">{plan.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Payment */}
                {activeTab === 'license' && step === 4 && (
                    <div className="step-container fade-in">
                        <button className="back-btn" onClick={() => setStep(3)}>← Back</button>
                        <h2>Order Summary</h2>
                        <div className="summary-card">
                            <div className="summary-row">
                                <span>Device:</span>
                                <strong>{selection.device?.name}</strong>
                            </div>
                            <div className="summary-row">
                                <span>App:</span>
                                <strong>{selection.app?.name}</strong>
                            </div>
                            <div className="summary-row">
                                <span>Plan:</span>
                                <strong>{selection.plan?.name}</strong>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <strong>{selection.plan?.label}</strong>
                            </div>
                        </div>

                        <div className="payment-actions">
                            <p className="payment-note">Secure payment via PayPal or Crypto</p>
                            <Button
                                size="lg"
                                fullWidth
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing Payment...' : `Pay ${selection.plan?.label}`}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 5: MAC Activation */}
                {activeTab === 'license' && step === 5 && (
                    <div className="step-container fade-in">
                        <h2>Payment Successful!</h2>
                        <p>Please enter the MAC Address of your {selection.app?.name} to activate.</p>

                        <form onSubmit={handleActivation} className="mac-form">
                            <label>MAC Address</label>
                            <input
                                type="text"
                                placeholder="00:1A:79:..."
                                required
                                value={selection.mac}
                                onChange={(e) => setSelection(prev => ({ ...prev, mac: e.target.value }))}
                                className="mac-input"
                            />
                            <p className="mac-hint">You can find the MAC address in the settings of the app.</p>

                            <Button
                                size="lg"
                                fullWidth
                                type="submit"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Activating...' : 'Activate License Now'}
                            </Button>
                        </form>
                    </div>
                )}

                {/* Inquiry Step for Other Devices */}
                {activeTab === 'license' && step === 'inquiry' && (
                    <div className="step-container fade-in">
                        {!inquirySent ? (
                            <>
                                <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
                                <h2>Untested Device Request</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                    Your device is not in our verified list. Please describe your device, and our admin team will check compatibility.
                                </p>
                                <form onSubmit={handleInquirySubmit} className="inquiry-form">
                                    <textarea
                                        rows="5"
                                        placeholder="Describe your device (e.g., Firestick 4K, Android Box X96, Apple TV...)"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="text-input"
                                    ></textarea>
                                    <Button size="lg" fullWidth type="submit" disabled={isProcessing}>
                                        {isProcessing ? 'Sending...' : 'Send Request'}
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <div className="success-step">
                                <div className="success-icon">📩</div>
                                <h2>Request Sent!</h2>
                                <p>We have received your request about <strong>Other Devices</strong>.</p>
                                <p>Our team will contact you shortly with compatible apps.</p>
                                <Link href="/">
                                    <Button variant="outline" size="lg" style={{ marginTop: '2rem' }}>Back to Home</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 6: Success */}
                {activeTab === 'license' && step === 6 && (
                    <div className="step-container fade-in success-step">
                        <div className="success-icon">✓</div>
                        <h2>Activation Successful!</h2>
                        <p>Your license for <strong>{selection.app?.name}</strong> on <strong>{selection.device?.name}</strong> has been activated.</p>

                        <div className="success-details">
                            <p><strong>Status:</strong> Active</p>
                            <p><strong>MAC:</strong> {selection.mac}</p>
                            <p><strong>Expires:</strong> {selection.plan?.id === 'life' ? 'Never (Lifetime)' : 'In 12 Months'}</p>
                        </div>

                        <Link href="/dashboard">
                            <Button variant="primary" size="lg">Go to Dashboard</Button>
                        </Link>
                    </div>
                )}

            </section>

            {/* SEO Content Section */}
            <section className="container section-pad seo-section">
                <article className="seo-article">
                    <h2 className="seo-title">Best IPTV Players for Smart TVs (Samsung, LG & Android TV)</h2>

                    <p className="seo-intro">
                        Unlock the full potential of your Smart TV by choosing one of the highest-rated IPTV players available today.
                        Whether you’re using a <strong>Samsung Smart TV</strong>, <strong>LG Smart TV</strong>, or <strong>Android TV</strong>, the right
                        IPTV player can completely transform your streaming experience.
                    </p>

                    <p className="seo-text">
                        Premium IPTV players are designed to deliver smooth, buffer-free streaming, even during peak hours.
                        They support <strong>4K Ultra HD quality</strong>, ensuring crystal-clear visuals, and come with a modern
                        EPG (Electronic Program Guide) for easy navigation through live TV channels, movies, and series.
                    </p>

                    <BrandSlider />

                    <div className="seo-benefits-box">
                        <h3>By using a high-quality IPTV player, you benefit from:</h3>
                        <ul className="seo-benefits-list">
                            <li>⚡ Fast and stable playback</li>
                            <li>📂 Advanced playlist management</li>
                            <li>🖥️ User-friendly interfaces</li>
                            <li>📺 Compatibility with the latest Smart TV systems</li>
                        </ul>
                    </div>

                    <p className="seo-conclusion">
                        Choosing the right IPTV player is essential to enjoy reliable performance, high resolution,
                        and a seamless entertainment experience on your Smart TV.
                    </p>
                    <div className="seo-footer-note">
                        <p>
                            <strong>Note:</strong> We provide the software license activation only.
                            We do not host or provide any copyrighted content or streams.
                        </p>
                    </div>
                </article>
            </section>

            <Footer />

            <style jsx>{`
                .page-header {
                    padding: 8rem 0 2rem;
                    text-align: center;
                }
                .page-header h1 { margin-bottom: 1rem; }
                .page-header p { color: var(--text-muted); font-size: 1.2rem; margin-bottom: 3rem; }

                .steps-indicator {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .step-dot {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--border);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .step-dot.active {
                    background: var(--primary);
                    color: black;
                }

                .content-area {
                    min-height: 400px;
                    display: flex;
                    justify-content: center;
                }

                .step-container {
                    width: 100%;
                    max-width: 900px;
                    text-align: center;
                }
                
                .back-btn {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }
                .back-btn:hover { color: var(--primary); }

                .step-container h2 {
                    margin-bottom: 2rem;
                    font-size: 2rem;
                }

                .grid-options {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 1.5rem;
                }

                .option-card {
                    height: 220px;
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                }
                .option-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                }
                
                .icon { 
                    font-size: 4rem; 
                    margin-bottom: 1rem; 
                    color: var(--primary);
                    filter: drop-shadow(0 0 10px rgba(0, 220, 130, 0.3));
                    width: 64px;
                    height: 64px;
                }
                .icon svg {
                    width: 100%;
                    height: 100%;
                }
                
                .option-card h3 { 
                    font-size: 1.25rem; 
                    font-weight: 700;
                    margin: 0;
                }
                .price { font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-top: 0.5rem; }

                /* Summary */
                .summary-card {
                    background: var(--secondary);
                    padding: 2rem;
                    border-radius: 16px;
                    margin-bottom: 2rem;
                    text-align: left;
                }
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    color: var(--text-muted);
                }
                .summary-row强 { color: var(--foreground); }
                .summary-divider { height: 1px; background: var(--border); margin: 1.5rem 0; }
                .summary-row.total { font-size: 1.25rem; color: var(--foreground); }
                .summary-row.total强 { color: var(--primary); }
                
                .payment-note { margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem; }

                /* Forms */
                .mac-form { text-align: left; max-width: 400px; margin: 0 auto; }
                .mac-form label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); }
                .mac-input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    background: var(--background);
                    border: 1px solid var(--border);
                    color: var(--foreground);
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    font-family: monospace;
                    text-transform: uppercase;
                }
                .mac-input:focus { outline: none; border-color: var(--primary); }
                .mac-hint { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 2rem; }

                /* Success */
                .success-icon {
                    width: 80px;
                    height: 80px;
                    background: var(--primary);
                    color: black;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    margin: 0 auto 2rem;
                }
                .success-details {
                    background: rgba(0, 229, 136, 0.1);
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin: 2rem 0;
                    text-align: left;
                    display: inline-block;
                    min-width: 300px;
                }
                .success-details p { margin-bottom: 0.5rem; color: var(--foreground); }

                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fadeIn 0.4s ease-out; }
                
                .text-input {
                    width: 100%;
                    padding: 1rem;
                    border-radius: 8px;
                    background: var(--background);
                    border: 1px solid var(--border);
                    color: white;
                    margin-bottom: 1.5rem;
                    resize: vertical;
                    font-family: inherit;
                }
                .text-input:focus {
                    border-color: var(--primary);
                    outline: none;
                }

                /* TABS & DOWNLOADS */
                .main-tabs { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; }
                .tab-btn {
                    padding: 10px 24px; border: 1px solid var(--border); border-radius: 30px;
                    background: transparent; color: var(--text-muted); cursor: pointer;
                    font-size: 1rem; font-weight: 600; transition: all 0.3s;
                }
                .tab-btn.active { background: var(--primary); color: black; border-color: var(--primary); }
                
                .downloads-grid {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem; width: 100%; max-width: 1000px;
                }
                .download-card {
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 16px; padding: 1.5rem; backdrop-filter: blur(10px);
                }
                .app-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
                .app-icon { font-size: 2.5rem; }
                .downloader-info { 
                    background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px;
                    display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;
                }
                .code-badge { 
                    background: var(--primary); color: black; padding: 2px 8px; 
                    border-radius: 4px; font-weight: 800; letter-spacing: 1px;
                }
                .platform-links { display: flex; flex-direction: column; gap: 0.5rem; }
                .dl-btn {
                    display: block; width: 100%; padding: 10px; text-align: center;
                    border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 500;
                    transition: all 0.2s;
                }
                .dl-btn.android { background: #3ddc84; color: black; }
                .dl-btn.samsung { background: #1428a0; color: white; }
                .dl-btn.lg { background: #a50034; color: white; }
                .dl-btn.apple { background: #fff; color: black; }
                .dl-btn:hover { opacity: 0.9; transform: translateY(-2px); }

                /* SEO SECTION */
                /* SEO SECTION */
                .seo-section { 
                    border-top: 1px solid var(--border); 
                    margin-top: 3rem; 
                    padding-top: 3rem; 
                    position: relative;
                }
                .seo-section::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 50%; transform: translateX(-50%);
                    width: 100%; height: 1px;
                    background: linear-gradient(90deg, transparent, var(--primary), transparent);
                    opacity: 0.3;
                }

                .seo-article { max-width: 900px; margin: 0 auto; }
                
                .seo-title { 
                    font-size: 2.2rem; 
                    margin-bottom: 1.5rem; 
                    text-align: center;
                    color: white;
                    letter-spacing: -1px;
                    font-weight: 700;
                }
                
                .seo-intro { 
                    font-size: 1.15rem; 
                    color: var(--text-muted); 
                    margin-bottom: 4rem; 
                    line-height: 1.8; 
                    text-align: center;
                    max-width: 700px; 
                    margin-left: auto; 
                    margin-right: auto; 
                }
                
                .seo-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                    gap: 2rem; 
                    margin-bottom: 4rem; 
                }
                
                .seo-card { 
                    background: rgba(255,255,255,0.03); 
                    border: 1px solid var(--border); 
                    padding: 2rem; 
                    border-radius: 20px; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .seo-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
                    pointer-events: none;
                }
                .seo-card:hover { 
                    transform: translateY(-5px); 
                    border-color: var(--primary); 
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
                    background: rgba(255,255,255,0.05);
                }
                
                .seo-card h3 { 
                    color: var(--foreground); 
                    font-size: 1.4rem; 
                    margin-bottom: 1rem; 
                    display: flex; 
                    align-items: center; 
                    gap: 0.75rem; 
                }
                
                .seo-card p { 
                    color: var(--text-muted); 
                    font-size: 1rem; 
                    line-height: 1.6; 
                }
                .seo-card strong { 
                    color: var(--primary); 
                    font-weight: 600;
                }
                
                .seo-footer-note { 
                    background: rgba(100, 100, 100, 0.1); 
                    border-left: 4px solid var(--text-muted); 
                    padding: 1.5rem; 
                    border-radius: 0 12px 12px 0; 
                    font-size: 0.95rem; 
                    color: var(--text-muted); 
                    text-align: left;
                    margin-top: 3rem;
                }

                .seo-text {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    line-height: 1.8;
                    margin-bottom: 3rem;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .seo-benefits-box {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 3rem;
                    margin-bottom: 3rem;
                    text-align: left;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .seo-benefits-box h3 {
                    font-size: 1.4rem;
                    color: var(--foreground);
                    margin-bottom: 1.5rem;
                }

                .seo-benefits-list {
                    list-style: none;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1rem;
                }

                .seo-benefits-list li {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .seo-conclusion {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: var(--primary);
                    margin-top: 2rem;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

            `}</style>
        </main >
    );
}

"use client";
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function HowItWorks() {
    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Header />
            {/* Hero Section */}
            <section className="guide-hero">
                <div className="container">
                    <h1>How it Works</h1>
                    <p>Get started with IPMAXTV in 3 simple steps</p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="container section-pad">
                <div className="steps-grid">

                    {/* Step 1 */}
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <div className="step-content">
                            <h3>Choose Your Plan</h3>
                            <p>
                                Browse our flexible subscription plans. Whether you need 1 month to test or
                                a lifetime license for peace of mind, we have the right package for you.
                            </p>
                            <Link href="/#pricing">
                                <span className="step-link">View Plans →</span>
                            </Link>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card">
                        <div className="step-number">02</div>
                        <div className="step-content">
                            <h3>Secure Payment</h3>
                            <p>
                                Complete your order with our secure payment gateway. We support PayPal and Crypto
                                for instant, hassle-free transactions. No hidden fees.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card">
                        <div className="step-number">03</div>
                        <div className="step-content">
                            <h3>Instant Activation</h3>
                            <p>
                                Once paid, you will receive your M3U playlist and login details via email instantly.
                                Or use the "Apps" page to activate your player license directly.
                            </p>
                            <Link href="/apps">
                                <span className="step-link">Activate App →</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Device Specific Guides */}
            <section className="container section-pad device-guides">
                <h2 className="section-title">Installation Guide by Device</h2>

                <div className="guides-grid">
                    {/* Android Users */}
                    <div className="guide-card android">
                        <div className="guide-header">
                            <span className="platform-icon">🤖</span>
                            <h3>For Android Users</h3>
                            <span className="badge">Android Smart TV • Android Box • Android Mobile</span>
                        </div>

                        <h4 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--foreground)' }}>How to Install the App</h4>

                        <div className="guide-steps">
                            <div className="mini-step">
                                <span className="ms-num">1</span>
                                <p>Install the <strong>Downloader app</strong> from the Google Play Store.</p>
                            </div>
                            <div className="mini-step">
                                <span className="ms-num">2</span>
                                <div>
                                    <p style={{ marginBottom: '0.5rem' }}>Open Downloader and enter our direct download code:</p>
                                    <strong className="code" style={{ fontSize: '1.2rem' }}>8014414</strong>
                                    <div className="secure-note" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ffcc00', display: 'flex', gap: '5px', alignItems: 'center', background: 'rgba(255, 204, 0, 0.1)', padding: '5px 10px', borderRadius: '4px' }}>
                                        <span>🔒</span> Note: This code will be hidden after the user logs into their account.
                                    </div>
                                </div>
                            </div>
                            <div className="mini-step">
                                <span className="ms-num">3</span>
                                <p>Install our app and log in using the <strong>Username</strong> and <strong>Password</strong> that we will send to you after payment.</p>
                            </div>
                        </div>
                        <Link href="/apps">
                            <Button fullWidth variant="primary">Download APK</Button>
                        </Link>
                    </div>

                    {/* Non-Android Users */}
                    <div className="guide-card smart-tv">
                        <div className="guide-header">
                            <span className="platform-icon">📺</span>
                            <h3>For Smart TV Users</h3>
                            <span className="badge">Samsung • LG • Apple TV</span>
                        </div>

                        <h4 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--foreground)' }}>How to Activate Your IPTV Player</h4>

                        <div className="guide-steps">
                            <div className="mini-step">
                                <span className="ms-num">1</span>
                                <p>Search for <strong>IBO Player</strong> or <strong>SmartOne</strong> in your TV App Store and install the app.</p>
                            </div>
                            <div className="mini-step">
                                <span className="ms-num">2</span>
                                <p>Open the app and locate your <strong>MAC Address</strong> (and ID Key, if available).</p>
                            </div>
                            <div className="mini-step">
                                <span className="ms-num">3</span>
                                <p>Go to our <Link href="/apps" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Apps Page</Link> and activate your license instantly.</p>
                            </div>
                        </div>

                        <div className="guide-footer-note" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                            <h5 style={{ marginBottom: '0.8rem', color: 'var(--primary)', fontSize: '1rem' }}>After Activation (Important)</h5>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Send us your MAC Address and ID Key (if the app provides one) <strong>OR</strong> Send a screenshot of the app screen showing these details to our admin.</p>

                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <strong>Once we receive the information:</strong><br />
                                • We will link the server/plan you purchased<br />
                                • It will be activated on the IPTV player you selected
                            </div>
                        </div>

                        <Link href="/apps">
                            <Button fullWidth variant="outline" style={{ marginTop: '1.5rem' }}>Activate MAC</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to Watch?</h2>
                    <p>Join thousands of happy customers enjoying premium TV today.</p>
                    <Link href="/#pricing">
                        <Button size="lg" variant="primary">Get Started Now</Button>
                    </Link>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .guide-hero {
                    padding: 8rem 0 4rem;
                    text-align: center;
                    background: radial-gradient(circle at center, rgba(0, 229, 136, 0.1) 0%, transparent 70%);
                }
                .guide-hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #fff, #aaa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .guide-hero p {
                    font-size: 1.25rem;
                    color: var(--text-muted);
                }

                .steps-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    position: relative;
                }
                
                /* Connecting Line (Desktop) */
                @media (min-width: 900px) {
                    .steps-grid::before {
                        content: '';
                        position: absolute;
                        top: 40px;
                        left: 50px;
                        right: 50px;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, var(--border), transparent);
                        z-index: 0;
                    }
                }

                .step-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 2rem;
                    position: relative;
                    backdrop-filter: blur(10px);
                    transition: transform 0.3s;
                    z-index: 1;
                }
                .step-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--primary);
                }

                .step-number {
                    width: 70px;
                    height: 70px;
                    background: var(--background);
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--primary);
                    margin-bottom: 2rem;
                    box-shadow: 0 0 20px rgba(0, 229, 136, 0.2);
                }

                .step-content h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }
                .step-content p {
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .step-link {
                    color: var(--primary);
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-block;
                    transition: transform 0.2s;
                }
                .step-link:hover {
                    transform: translateX(5px);
                }

                /* Device Guides */
                .section-title { text-align: center; margin-bottom: 3rem; font-size: 2.5rem; }
                
                .guides-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                }
                
                .guide-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    position: relative;
                    overflow: hidden;
                }
                .guide-card.android { background: linear-gradient(145deg, rgba(61, 220, 132, 0.05) 0%, rgba(0,0,0,0) 100%); border-color: rgba(61, 220, 132, 0.2); }
                .guide-card.smart-tv { background: linear-gradient(145deg, rgba(20, 40, 160, 0.05) 0%, rgba(0,0,0,0) 100%); border-color: rgba(20, 40, 160, 0.2); }
                
                .guide-header { margin-bottom: 2rem; text-align: center; }
                .platform-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
                .guide-header h3 { font-size: 1.8rem; margin-bottom: 0.5rem; }
                .badge { background: var(--secondary); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; color: var(--text-muted); border: 1px solid var(--border); }
                
                .guide-steps { margin-bottom: 2rem; }
                .mini-step { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
                .ms-num { 
                    background: var(--primary); color: black; width: 24px; height: 24px; 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                    font-weight: 700; font-size: 0.8rem; flex-shrink: 0; margin-top: 3px;
                }
                .mini-step p { margin: 0; color: var(--text-muted); font-size: 1rem; line-height: 1.5; }
                .code { display: inline-block; background: #333; color: #fff; padding: 2px 6px; border-radius: 4px; letter-spacing: 1px; }

                .cta-section {
                    text-align: center;
                    padding: 6rem 0;
                    border-top: 1px solid var(--border);
                }
                .cta-section h2 { font-size: 2.5rem; margin-bottom: 1rem; }
                .cta-section p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; }
            `}</style>
        </main>
    )
}

"use client";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <main>
            <Header />
            <section className="page-header">
                <div className="container">
                    <h1>Contact Support</h1>
                    <p>We are here to help you 24/7. Reach out to us for any questions.</p>
                </div>
            </section>

            <section className="container section-pad contact-grid">
                {/* Contact Info */}
                <div className="contact-info">
                    <div className="info-card">
                        <div className="icon">📧</div>
                        <h3>Email Support</h3>
                        <p>support@ipmaxtv.shop</p>
                        <p className="sub-text">Response within 24 hours</p>
                    </div>
                    <div className="info-card">
                        <div className="icon">💬</div>
                        <h3>WhatsApp Support</h3>
                        <p>+1 234 567 890</p>
                        <p className="sub-text">Instant Chat (10 AM - 10 PM)</p>
                    </div>
                    <div className="info-card">
                        <div className="icon">📄</div>
                        <h3>FAQ</h3>
                        <p>Check our FAQ page</p>
                        <p className="sub-text">Find quick answers</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container glass-card">
                    <h2>Send us a message</h2>
                    {status === 'success' ? (
                        <div className="success-message">
                            <h3>Message Sent!</h3>
                            <p>Thank you for contacting us. We will get back to you shortly.</p>
                            <Button onClick={() => setStatus('idle')} variant="outline">Send Another</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <select
                                    className="input"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="sales">Sales & Pricing</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing & Refunds</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="input"
                                ></textarea>
                            </div>
                            <Button fullWidth disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    )}
                </div>
            </section>
            <Footer />

            <style jsx>{`
        .page-header {
          padding: 8rem 0 3rem;
          text-align: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), var(--background));
        }
        .section-pad { padding-bottom: 6rem; }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .info-card {
          background: var(--secondary);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          transition: transform 0.2s;
        }
        .info-card:hover { transform: translateY(-3px); border-color: var(--primary); }
        .icon { font-size: 2rem; margin-bottom: 1rem; }
        .sub-text { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem; }
        
        .contact-form-container {
          padding: 2.5rem;
        }
        .contact-form-container h2 { margin-bottom: 2rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-family: inherit;
        }
        .input:focus { outline: none; border-color: var(--primary); background: rgba(255,255,255,0.08); }
        
        .success-message {
          text-align: center;
          padding: 3rem 0;
        }
        .success-message h3 { color: var(--primary); margin-bottom: 1rem; font-size: 1.5rem; }
        
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
        </main>
    );
}

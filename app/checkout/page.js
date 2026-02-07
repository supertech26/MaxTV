"use client";
import { useState, useEffect, Suspense } from 'react'; // Added Suspense
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams(); // Hook usage
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const [plan, setPlan] = useState(null);
    const [addLicense, setAddLicense] = useState(false);
    const [macAddress, setMacAddress] = useState('');
    const [appPlayer, setAppPlayer] = useState('IBO Player'); // Default
    const [transactionHash, setTransactionHash] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [paymentProof, setPaymentProof] = useState(null);
    const [uploadingProof, setUploadingProof] = useState(false);
    const LICENSE_PRICE = 6.99;
    const USDT_RATE = 1.10; // Approx exchange rate

    // ... APP_PLAYERS definition ...

    // File Upload Handler
    const handleProofUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingProof(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setPaymentProof(data.url);
            } else {
                alert('Upload failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setUploadingProof(false);
        }
    };

    const APP_PLAYERS = [
        { name: "IBO Player", needsKey: true },
        { name: "Bob Player", needsKey: true },
        { name: "Hot Player", needsKey: true },
        { name: "IPTV Smarters", needsKey: false }, // Usually login based
        { name: "SmartOne", needsKey: false }, // MAC only
        { name: "VIRGINIA Player", needsKey: true },
        { name: "IBO Player Pro", needsKey: true },
        { name: "Family Player", needsKey: true },
        { name: "KTN Player", needsKey: true },
        { name: "KING 4K Player", needsKey: true },
        { name: "ABEPlayerTV", needsKey: true },
        { name: "BOB PRO", needsKey: true },
        { name: "Duplex Play", needsKey: true },
        { name: "IBOSS PLAYER", needsKey: true },
        { name: "IBO STB", needsKey: true },
        { name: "VU Player", needsKey: true },
        { name: "DuplexPlay", needsKey: true },
        { name: "Other", needsKey: true } // Safe default
    ];

    const totalPrice = plan ? (parseFloat(plan.price) + (addLicense ? LICENSE_PRICE : 0)).toFixed(2) : '0.00';
    const usdtPrice = (parseFloat(totalPrice) * USDT_RATE).toFixed(2);

    // ... (unchanged)

    // ... inside return ...



    // Helper to format MAC Address
    const handleMacChange = (e) => {
        let value = e.target.value.toUpperCase().replace(/[^A-F0-9]/g, ''); // Remove non-hex chars
        if (value.length > 12) value = value.slice(0, 12); // Limit to 12 hex chars

        // Insert colons every 2 chars
        const formatted = value.match(/.{1,2}/g)?.join(':') || value;
        setMacAddress(formatted);
    };

    // Auth Check & Plan Loading
    useEffect(() => {
        // ... (unchanged)
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const email = localStorage.getItem('userEmail');
        if (!isLoggedIn) {
            router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href));
        } else {
            setUserEmail(email || 'guest@example.com'); // Fallback
        }

        // 2. Load Plan Details from URL
        const planId = searchParams.get('plan') || '12-months';
        const price = searchParams.get('price') || '79.99';
        const name = searchParams.get('name') || '1 Year Subscription';

        setPlan({ id: planId, name, price });
    }, [router, searchParams]);

    // ... (useEffect)

    // PayPal Options
    const initialOptions = {
        clientId: "test",
        currency: "EUR",
        intent: "capture",
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planId: plan.id,
                    price: paymentMethod === 'crypto' ? usdtPrice : totalPrice,
                    type: plan.id.includes('year') || plan.id.includes('month') ? 'SUBSCRIPTION' : 'LICENSE', // Simple logic
                    paymentMethod: paymentMethod.toUpperCase(),
                    transactionId: transactionHash,
                    userEmail: userEmail,
                    macAddress: macAddress,
                    appPlayer: appPlayer,
                    paymentProof: paymentProof,
                    deviceKey: '', // logic to get this if needed
                }),
            });

            const data = await res.json();

            if (data.success) {
                router.push(`/order-confirmation?id=${data.orderId}&status=success`);
            } else {
                alert('Order failed: ' + data.error);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!plan) return <div className="loading-state">Loading checkout...</div>;

    return (
        <div className="checkout-grid">
            <div className="form-column">
                <h1>Secure Checkout</h1>

                <form onSubmit={handleCheckout} className="checkout-form">
                    <div className="section">
                        <h3>1. Device & App Information</h3>

                        <div className="license-upsell" onClick={() => setAddLicense(!addLicense)}>
                            <div className={`checkbox ${addLicense ? 'checked' : ''}`}></div>
                            <div>
                                <p className="upsell-title">Add App Player License (+€{LICENSE_PRICE})</p>
                                <p className="upsell-desc">Activate IBO Player / Bob Player for 1 year.</p>
                            </div>
                        </div>

                        {addLicense && (
                            <div className="license-inputs">
                                <div className="form-group">
                                    <label>App Player Name</label>
                                    <select
                                        className="input"
                                        value={appPlayer}
                                        onChange={(e) => setAppPlayer(e.target.value)}
                                    >
                                        {APP_PLAYERS.map(app => (
                                            <option key={app.name} value={app.name}>{app.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>MAC Address (Required)</label>
                                    <input
                                        type="text"
                                        placeholder="00:1A:2B:..."
                                        className="input"
                                        required
                                        value={macAddress}
                                        onChange={handleMacChange}
                                        maxLength={17}
                                    />
                                </div>

                                {APP_PLAYERS.find(a => a.name === appPlayer)?.needsKey && (
                                    <div className="form-group">
                                        <label>Device Key (Required)</label>
                                        <input type="text" placeholder="Device Key" className="input" required />
                                    </div>
                                )}
                            </div>
                        )}

                        {!addLicense && (
                            <p className="hint">No device info needed. You will receive a M3U playlist link via email.</p>
                        )}
                    </div>

                    <div className="section">
                        <h3>2. Payment Method</h3>
                        <div className="payment-options">
                            <div
                                className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                <span className="radio"></span>
                                <span>PayPal / Credit Card</span>
                            </div>
                            <div
                                className={`payment-option ${paymentMethod === 'crypto' ? 'selected' : ''}`}
                                onClick={() => setPaymentMethod('crypto')}
                            >
                                <span className="radio"></span>
                                <span>USDT (Tether) - TRC20</span>
                            </div>
                        </div>
                    </div>

                    {paymentMethod === 'paypal' ? (
                        <div className="paypal-container" style={{ marginTop: '2rem' }}>
                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalPrice,
                                                    },
                                                    description: `${plan.name} ${addLicense ? '+ License' : ''}`
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(async (details) => {
                                            console.log('Transaction completed by ' + details.payer.name.given_name);

                                            // Save order to backend
                                            try {
                                                await fetch('/api/orders/create', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        planId: plan.id,
                                                        price: totalPrice,
                                                        type: plan.id.includes('year') || plan.id.includes('month') ? 'SUBSCRIPTION' : 'LICENSE',
                                                        paymentMethod: 'PAYPAL',
                                                        transactionId: details.id,
                                                        userEmail: userEmail,
                                                        macAddress: macAddress,
                                                        appPlayer: appPlayer,
                                                    }),
                                                });
                                            } catch (err) {
                                                console.error("Failed to save PayPal order:", err);
                                            }

                                            router.push(`/order-confirmation?id=${details.id}&status=success`);
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    ) : paymentMethod === 'crypto' ? (
                        <div className="crypto-payment-section">
                            <div className="crypto-info">
                                <p>Total to Pay:</p>
                                <div className="crypto-amount">{usdtPrice} USDT</div>
                                <p className="rate-info">Exchange Rate: 1 EUR = {USDT_RATE} USDT</p>
                            </div>

                            <div className="wallet-address-box">
                                <label>TRC20 Wallet Address:</label>
                                <div className="address-display">
                                    <code>TFjX...REPLACE_WITH_YOUR_WALLET...XyZ</code>
                                    <button type="button" className="copy-btn" onClick={() => navigator.clipboard.writeText('TFjX...REPLACE_WITH_YOUR_WALLET...XyZ')}>Copy</button>
                                </div>
                                <p className="network-warning">⚠️ Ensure you use <strong>TRC20</strong> Network.</p>
                            </div>

                            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                <label>Transaction Hash (TXID)</label>
                                <input
                                    type="text"
                                    placeholder="Paste your transaction hash here..."
                                    className="input"
                                    required
                                    value={transactionHash}
                                    onChange={(e) => setTransactionHash(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Upload Payment Proof (Optional but Recommended)</label>
                                <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={handleProofUpload}
                                    className="input"
                                />
                                {uploadingProof && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Uploading...</p>}
                                {paymentProof && <p style={{ color: 'var(--primary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>✓ Proof uploaded successfully</p>}
                            </div>

                            <Button fullWidth size="lg" disabled={loading}>
                                {loading ? 'Verifying...' : 'Confirm Crypto Payment'}
                            </Button>
                        </div>
                    ) : (
                        <Button fullWidth size="lg" disabled={loading} onClick={handleCheckout}>
                            {loading ? 'Processing...' : `Pay Now • €${totalPrice}`}
                        </Button>
                    )}

                    <div className="trust-badges">
                        <span>🔒 Secure 256-bit SSL Encryption</span>
                        <span>⚡ Instant Activation</span>
                    </div>
                </form>
            </div>

            <div className="summary-column">
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="item">
                        <div>
                            <p className="item-name">{plan.name}</p>
                            <p className="item-desc">{plan.id.includes('month') ? '4K/FHD, 2 Connections' : 'Lifetime License'}</p>
                        </div>
                        <div className="item-price">€{plan.price}</div>
                    </div>

                    {addLicense && (
                        <div className="item">
                            <div>
                                <p className="item-name">App Player License</p>
                                <p className="item-desc">1 Year Activation</p>
                            </div>
                            <div className="item-price">€{LICENSE_PRICE}</div>
                        </div>
                    )}

                    <div className="total-row">
                        <span>Total</span>
                        <span>€{totalPrice}</span>
                    </div>

                    <div className="guarantee">
                        <p>🛡️ 7-Day Money Back Guarantee</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .loading-state {
            min-height: 50vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
        }
        h1 { margin-bottom: 2rem; }
        
        .section { margin-bottom: 2.5rem; }
        h3 { margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
        
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--background);
          color: var(--foreground);
        }
        .hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; }
        
        .payment-options { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .payment-option.selected {
          border-color: var(--primary);
          background: rgba(0, 220, 130, 0.05);
        }
        .radio {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--border);
          position: relative;
        }
        .payment-option.selected .radio {
          border-color: var(--primary);
        }
        .payment-option.selected .radio::after {
          content: '';
          position: absolute;
          top: 3px; left: 3px;
          width: 10px; height: 10px;
          background: var(--primary);
          border-radius: 50%;
        }
        
        .order-summary {
          background: var(--secondary);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          position: sticky;
          top: 100px;
        }
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .guarantee {
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.75rem;
          border-radius: 6px;
        }
        
        .trust-badges {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        
        .license-upsell {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: rgba(0, 220, 130, 0.05);
            border: 1px solid var(--primary);
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .license-upsell:hover {
             background: rgba(0, 220, 130, 0.1);
        }
        .license-inputs {
            background: var(--card-bg);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--border);
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .checkbox.checked::after {
            content: '✓';
            color: var(--primary);
            font-size: 14px;
            font-weight: bold;
        }
        .upsell-title { font-weight: 600; color: var(--foreground); }
        .upsell-desc { font-size: 0.8rem; color: var(--text-muted); margin: 0; }

        .crypto-payment-section {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        .crypto-info { text-align: center; margin-bottom: 1.5rem; }
        .crypto-amount { font-size: 2rem; font-weight: 700; color: var(--primary); margin: 0.5rem 0; }
        .rate-info { font-size: 0.8rem; color: var(--text-muted); }

        .wallet-address-box { margin-bottom: 1.5rem; }
        .address-display { 
            display: flex; gap: 0.5rem; 
            background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border);
            align-items: center; justify-content: space-between;
        }
        .address-display code { font-family: monospace; color: var(--foreground); overflow-wrap: anywhere; }
        .copy-btn { 
            background: var(--secondary); border: 1px solid var(--border); color: var(--text-muted); padding: 0.25rem 0.75rem; 
            border-radius: 4px; cursor: pointer; font-size: 0.8rem;
        }
        .copy-btn:hover { color: var(--foreground); border-color: var(--text-muted); }
        .network-warning { font-size: 0.8rem; color: #ffab00; margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }

        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .summary-column { order: -1; }
        }
      `}</style>
        </div>
    );
}

export default function Checkout() {
    return (
        <main>
            <Header />
            <div className="container checkout-container">
                <Suspense fallback={<div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
                    <CheckoutContent />
                </Suspense>
            </div>
            <Footer />
            <style jsx>{`
        .checkout-container {
          padding-top: 4rem;
          padding-bottom: 6rem;
        }
        `}</style>
        </main>
    );
}

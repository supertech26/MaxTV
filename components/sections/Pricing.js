"use client";
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Pricing() {
    const plans = [
        {
            name: '24 Hours Test',
            price: '€0.99',
            duration: '24 Hours',
            features: ['Full Access', '15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering']
        },
        {
            name: '3 Months',
            price: '€19.00',
            duration: '3 Months',
            features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', '24/7 Support']
        },
        {
            name: '6 Months',
            price: '€32.00',
            duration: '6 Months',
            features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', 'Priority Support', 'Save 15%']
        },
        {
            name: '12 Months',
            price: '€59.00',
            duration: '1 Year',
            popular: true,
            features: ['15,000+ Channels', '4K & FHD Quality', 'Movies & Series', 'No Buffering', 'VIP Support', 'Best Value', 'Multi-Device']
        },
    ];

    return (
        <section className="pricing-section">
            <div className="pricing-grid">
                {plans.map((plan, i) => (
                    <div key={i} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                        {plan.popular && <span className="popular-badge">Best Value</span>}
                        <h3>{plan.name}</h3>
                        <div className="price">{plan.price}</div>
                        <ul className="features">
                            {plan.features.map((f, j) => (
                                <li key={j}>✓ {f}</li>
                            ))}
                        </ul>
                        <Link href={`/checkout?plan=${encodeURIComponent(plan.name)}&price=${plan.price.replace('€', '')}&name=${encodeURIComponent(plan.name)}`} style={{ textDecoration: 'none', width: '100%' }}>
                            <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>
                                Subscribe Now
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .pricing-card {
           background: var(--card-bg);
           padding: 2.5rem;
           border-radius: 20px;
           border: 1px solid var(--border);
           position: relative;
           text-align: center;
           transition: all 0.4s ease;
           display: flex;
           flex-direction: column;
           backdrop-filter: blur(12px);
        }
        .pricing-card:hover {
           transform: translateY(-8px);
           border-color: var(--primary);
           box-shadow: 0 10px 40px -10px rgba(0, 229, 136, 0.15);
        }
        .popular {
           border-color: var(--primary);
           background: rgba(0, 229, 136, 0.03);
           transform: scale(1.05);
           z-index: 1;
           box-shadow: 0 10px 40px -10px rgba(0, 229, 136, 0.1);
        }
        .popular:hover {
           transform: scale(1.05) translateY(-8px);
           box-shadow: 0 20px 50px -10px rgba(0, 229, 136, 0.2);
        }
        .popular:hover {
           transform: scale(1.05) translateY(-5px);
        }
        .popular-badge {
           position: absolute;
           top: -12px;
           left: 50%;
           transform: translateX(-50%);
           background: var(--primary);
           color: #000;
           padding: 4px 12px;
           border-radius: 12px;
           font-size: 0.75rem;
           font-weight: 700;
        }
        .price {
           font-size: 3rem;
           font-weight: 800;
           margin: 1.5rem 0;
           color: var(--foreground);
        }
        .features {
           list-style: none;
           text-align: left;
           margin-bottom: 2rem;
           flex-grow: 1;
        }
        .features li {
           padding: 0.5rem 0;
           border-bottom: 1px solid var(--border);
           color: var(--text-muted);
        }
        .features li:last-child {
           border-bottom: none;
        }
      `}</style>
        </section>
    );
}

"use client";
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I install IPMAXTV on my TV?",
      answer: "Installation is very simple. After your order, you will receive an email with detailed instructions for Samsung, LG, Android TV, and Firestick."
    },
    {
      question: "Can I test the service before buying?",
      answer: "Yes, we offer a 24-hour test for just €0.99 so you can check the quality of our channels and stability."
    },
    {
      question: "How many devices can I use simultaneously?",
      answer: "Our standard subscriptions are for 1 connection. If you need more, contact our support for a multi-screen offer."
    },
    {
      question: "What internet speed is recommended?",
      answer: "For a smooth experience in 4K/FHD, we recommend a stable internet connection of at least 15-20 Mbps."
    },
    {
      question: "Do you offer refunds?",
      answer: "We do our best to satisfy you. If you encounter technical issues we cannot solve, contact us within 24 hours."
    }
  ];

  return (
    <section className="container section-pad">
      <h2 className="section-title">FAQ</h2>
      <p className="section-subtitle">Frequently Asked Questions</p>
      <p className="section-desc">Any questions? We are here to help.</p>

      <div className="faq-grid">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${openIndex === i ? 'active' : ''}`} onClick={() => toggleFAQ(i)}>
            <div className="question">
              <h3>{faq.question}</h3>
              <span className="toggle">{openIndex === i ? '−' : '+'}</span>
            </div>
            <div className="answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-pad {
          padding: 4rem 1rem;
        }
        .section-title {
          text-align: center;
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
        }
        .section-subtitle {
          text-align: center;
          color: var(--primary);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .section-desc {
          text-align: center;
          color: var(--text-muted);
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }
        
        .faq-grid {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .faq-item {
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }
        .faq-item:hover {
          border-color: var(--primary);
        }
        .faq-item.active {
          border-color: var(--primary);
        }
        
        .question {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .question h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }
        .toggle {
          font-size: 1.5rem;
          color: var(--primary);
          font-weight: 700;
          line-height: 1;
        }
        
        .answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          background: rgba(0,0,0,0.2);
        }
        .faq-item.active .answer {
          max-height: 200px;
          padding: 0 1.5rem 1.5rem;
        }
        .answer p {
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </section>
  );
}

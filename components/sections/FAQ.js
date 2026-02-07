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
    <section className="container section-pad" id="faq">
      <div className="text-center mb-16">
        <h2 className="section-title">
          Frequently <span className="text-gradient-primary">Asked Questions</span>
        </h2>
        <p className="section-desc">Everything you need to know about our service.</p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item glass-card ${openIndex === i ? 'active' : ''}`}
            onClick={() => toggleFAQ(i)}
          >
            <div className="question">
              <h3>{faq.question}</h3>
              <div className="icon-wrapper">
                <span className="icon"></span>
              </div>
            </div>
            <div className="answer-wrapper">
              <div className="answer-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-pad {
          padding: 6rem 1rem;
          position: relative;
          z-index: 2;
        }
        .text-center { text-align: center; }
        .mb-16 { margin-bottom: 4rem; }
        
        .section-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .section-desc {
          color: var(--text-muted);
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .faq-grid {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .faq-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05); /* Very subtle default border */
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .faq-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .faq-item.active {
          background: rgba(0, 229, 136, 0.05); /* Subtle green tint */
          border-color: rgba(0, 229, 136, 0.3); /* Brighter border */
          box-shadow: 0 10px 40px -10px rgba(0, 229, 136, 0.1);
        }
        
        .question {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .question h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0;
          color: var(--foreground);
          transition: color 0.3s ease;
        }
        
        .faq-item.active .question h3 {
          color: var(--primary);
        }
        
        /* Animated Icon */
        .icon-wrapper {
          width: 24px;
          height: 24px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .icon, .icon::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 2px;
          background-color: var(--foreground);
          border-radius: 2px;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s;
        }
        
        .icon::after {
          transform: rotate(90deg);
        }
        
        .faq-item:hover .icon, .faq-item:hover .icon::after {
          background-color: var(--primary);
        }

        .faq-item.active .icon {
          transform: rotate(45deg); /* Rotates the horizontal line */
          background-color: var(--primary);
        }
        
        .faq-item.active .icon::after {
           transform: rotate(90deg); /* Vertical line rotates with the parent, effectively making + into x */
           background-color: var(--primary);
        }

        /* Smooth Accordion Animation */
        .answer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .faq-item.active .answer-wrapper {
          grid-template-rows: 1fr;
        }
        
        .answer-content {
          min-height: 0;
          color: #a5a5a5;
          line-height: 1.7;
          font-size: 1.05rem;
        }
        
        .answer-content p {
          padding: 0 2rem 2rem;
          margin: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          transition-delay: 0.1s;
        }
        
        .faq-item.active .answer-content p {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .section-title { font-size: 2rem; }
            .question { padding: 1.25rem; }
            .answer-content p { padding: 0 1.25rem 1.25rem; }
        }
      `}</style>
    </section>
  );
}

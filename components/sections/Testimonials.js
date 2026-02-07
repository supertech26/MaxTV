"use client";

export default function Testimonials() {
    const reviews = [
        {
            name: "Ahmed K.",
            role: "Verified Customer",
            content: "Best IPTV service I have used. No buffering during huge football matches. Support is very fast.",
            stars: 5,
        },
        {
            name: "Sarah Jenkins",
            role: "Verified Customer",
            content: "I love the 4K movie collection. Setup was instant on my Samsung TV. Highly recommended!",
            stars: 5,
        },
        {
            name: "Michael R.",
            role: "Verified Customer",
            content: "Finally a stable service. I tried many others but ipmaxtv is the only one that doesn't freeze.",
            stars: 5,
        },
    ];

    return (
        <section className="container section-pad">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-subtitle">Trusted by Thousands</p>

            <div className="testimonials-grid">
                {reviews.map((review, i) => (
                    <div key={i} className="review-card">
                        <div className="stars">{"★".repeat(review.stars)}</div>
                        <p className="content">"{review.content}"</p>
                        <div className="author">
                            <div className="avatar">{review.name[0]}</div>
                            <div className="info">
                                <span className="name">{review.name}</span>
                                <span className="role">{review.role}</span>
                            </div>
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
          color: var(--text-muted);
          font-size: 1.25rem;
          margin-bottom: 3rem;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .review-card {
           background: var(--secondary);
           padding: 2rem;
           border-radius: 16px;
           border: 1px solid var(--border);
        }
        .stars {
          color: #FFD700;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .content {
          color: var(--foreground);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          font-style: italic;
        }
        .author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .info {
          display: flex;
          flex-direction: column;
        }
        .name {
          font-weight: 600;
        }
        .role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
        </section>
    );
}

"use client";
import { useRef } from 'react';

export default function ChannelCategories() {
  const scrollRef = useRef(null);

  const categories = [
    { name: "Sports Channels", count: "+200 Channels", icon: "⚽", bg: "#00c853" },        // Green
    { name: "Movies & Series", count: "+500 Channels", icon: "🎬", bg: "#aa00ff" },        // Purple
    { name: "News Channels", count: "+150 Channels", icon: "📺", bg: "#d50000" },          // Red
    { name: "Kids Channels", count: "+100 Channels", icon: "🧸", bg: "#c2185b" },          // Pink
    { name: "Documentary Channels", count: "+80 Channels", icon: "🌍", bg: "#2962ff" },    // Blue
    { name: "Music Channels", count: "+120 Channels", icon: "🎵", bg: "#ff6d00" },         // Orange
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="container section-pad">
      <h2 className="section-title">Available Channel Categories</h2>

      <div className="slider-wrapper">
        <button className="nav-btn prev" onClick={() => scroll('left')}>‹</button>

        <div className="slider" ref={scrollRef}>
          {categories.map((cat, i) => (
            <div key={i} className="category-card" style={{ backgroundColor: cat.bg }}>
              <div className="content">
                <span className="icon">{cat.icon}</span>
                <span className="count">{cat.count.split(' ')[0]} <br /> <small>{cat.count.split(' ')[1]}</small></span>
                <h3>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn next" onClick={() => scroll('right')}>›</button>
      </div>

      <style jsx>{`
        .section-pad {
          padding: 4rem 1rem;
        }
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
          font-size: 2.2rem;
          color: white;
          font-weight: 700;
        }
        
        .slider-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .slider {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          padding: 1rem 0.5rem;
          scrollbar-width: none;
        }
        .slider::-webkit-scrollbar { display: none; }
        
        .category-card {
          flex: 0 0 200px;
          height: 280px;
          border-radius: 16px;
          scroll-snap-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .category-card:hover {
          transform: translateY(-8px);
          filter: brightness(1.1);
        }

        .content {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          color: white;
        }

        .icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }
        
        .count {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .count small {
          font-size: 1.2rem;
          font-weight: 600;
          display: block;
        }

        h3 {
          font-size: 1rem;
          font-weight: 500;
          opacity: 0.9;
          margin-top: auto;
          padding-top: 1rem;
        }
        
        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
          .nav-btn { display: none; }
          .category-card { flex: 0 0 160px; height: 240px; }
          .icon { font-size: 2.5rem; }
          .count { font-size: 1.6rem; }
          .section-title { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
}

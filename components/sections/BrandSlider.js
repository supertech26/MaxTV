"use client";

const BrandSlider = () => {
  const brands = [
    { name: "Samsung", type: 'svg', icon: <svg viewBox="0 0 100 30" fill="none"><path fill="#1428a0" d="M6.3 9.4c-1.3-.2-1.9.3-1.9.9 0 .6.7.8 1.9 1 .8.2 2.1.4 2.1 1.6 0 1.2-1.2 2-3.6 2-1.6 0-3.1-.4-3.8-.8l.6-1.5c.7.4 1.8.7 3.1.7 1.5 0 2-.4 2-.9 0-.5-.6-.7-1.8-.9-.9-.1-2.2-.4-2.2-1.6 0-1.1 1.1-1.9 3.3-1.9 1.4 0 2.8.3 3.4.6l-.6 1.4c-.6-.3-1.7-.6-2.5-.6zm.5 8.3h-1.6l4-11.2h1.9l4.1 11.2h-1.7l-1.1-3.3h-4.4l-1.2 3.3zm2.1-4.7h3.3l-1.6-4.8c-.1-.2-.1-.2-.1-.4h-.1c0 .1-.1.2-.1.4l-1.4 4.8zm9.3 4.7l-3-11.2h1.8l1.6 7.1c.1.4.2 1 .3 1.3h.1c.1-.4.2-.9.3-1.3l1.8-7.1h1.7l1.7 7.1c.1.4.2.9.3 1.3h.1c.1-.5.2-1 .3-1.4l1.6-7h1.7l-3 11.2h-1.8l-1.9-8.1c-.1-.4-.2-1-.3-1.4h-.1c-.1.5-.2 1-.3 1.4l-1.9 8.1h-1.9zm13-.5c-1.1 0-1.7-.5-1.9-1h-.1v.9h-1.6v-7.3h1.7v2.7c.3-.4.8-.6 1.3-.6 1.3 0 2.2 1.1 2.2 2.7.1 1.5-1 2.6-1.6 2.6zm-1.8-2.6c0 1.1.5 1.6 1.2 1.6s1.2-.6 1.2-1.6c0-1-.5-1.6-1.2-1.6-.7 0-1.2.6-1.2 1.6zm6.3-5.2v8.2h-1.6v-1h-.1c-.2.5-.8 1.1-1.9 1.1-1.3 0-2.3-1-2.3-2.6v-5.7h1.7v5.2c0 1.1.4 1.6 1.1 1.6.8 0 1.3-.6 1.3-1.6v-5.2h1.8zm3.4 8.2v-8.2h1.7v1.1h.1c.2-.5.8-1.2 1.9-1.2 1.2 0 2.2 1 2.2 2.6v5.7h-1.7v-5.2c0-1.1-.4-1.6-1.1-1.6-.8 0-1.4.6-1.4 1.6v5.2h-1.7zm11.2-7.8l-.2 1.6c-.3-.1-.7-.2-1.1-.2-1.4 0-2.2 1-2.2 2.3 0 1.5.8 2.4 2 2.4.9 0 1.6-.4 1.6-1.5v-.5h-1.7v-1.4h3.3v4.6c-.6.3-1.5.6-2.5.6-2.2 0-3.6-1.6-3.6-3.8 0-2.4 1.5-3.9 3.8-3.9.7-.1 1.5.1 2 .2z" /></svg> },

    // LG webOS - Keep original colors
    { name: "LG webOS", type: 'image', src: '/images/brands/lg.png' },

    // Android TV - Keep original colors (usually Green/White or Black)
    // Adding brightness boost just in case it's dark
    { name: "Android TV", type: 'image', src: '/images/brands/android.png', style: { filter: 'brightness(1.5)' } },

    // Apple TV - Force to white since it's likely black
    { name: "Apple TV", type: 'image', src: '/images/brands/apple.png', style: { filter: 'brightness(0) invert(1)' } },

    { name: "Roku", type: 'svg', icon: <svg viewBox="0 0 100 30" fill="none"><path fill="#662d91" d="M12.4 22.8H7.7v-4.9H5.6v4.9H1v-15h4.7c2.9 0 4.6 1.4 4.6 4s-1.5 3.7-3.6 3.9l4.5 6.6c.7 1 .8.5 1.2.5zm-6.8-8.4c1.1 0 1.6-.6 1.6-1.4s-.5-1.5-1.6-1.5H5.6v2.9h.1-.1zM28.5 15.3c0 4.5-3.4 7.7-7.9 7.7s-7.9-3.3-7.9-7.7 3.4-7.6 7.9-7.6 7.9 3.2 7.9 7.6zm-4.6 0c0-2.2-1.4-3.8-3.3-3.8s-3.3 1.6-3.3 3.8 1.4 3.9 3.3 3.9 3.3-1.6 3.3-3.9zM38.8 22.8h-4.6V7.8h4.6v8.4l4.2-4.9h5.6l-5.6 5.8 6 5.7h-5.8l-3.3-3.6-1.1 1.1v2.5zM63.5 15.3v-7.5h4.6v15h-4.4v-1.2c-1 1-2.4 1.4-3.6 1.4-3.8 0-6.7-3.1-6.7-7.6s2.9-7.5 6.7-7.5c1.2 0 2.6.5 3.5 1.5v5.9zm-4.5 3.8c1.9 0 3.3-1.7 3.3-3.8s-1.4-3.9-3.3-3.9c-1.8 0-3.3 1.6-3.3 3.9s1.4 3.8 3.3 3.8z" /></svg> },

    // Sony - Force to white
    { name: "Sony", type: 'image', src: '/images/brands/sony.png', style: { filter: 'brightness(0) invert(1)' } },

    { name: "Fire TV", type: 'svg', icon: <svg viewBox="0 0 100 30" fill="none"><path fill="#ff9900" d="M19.5 25C17 23 14 22 12 22s-5 1-7.5 3.5S2 29 2 12s1 5 3.5 7.5S9 22 12 22s5-1 7.5-3.5S22 15 22 12s-1-5-3.5-6.5z" /><text x="30" y="24" fill="#fff" fontFamily="Arial" fontWeight="bold" fontSize="20">fire</text><text x="65" y="24" fill="#fff" fontFamily="Arial" fontSize="20">tv</text></svg> },

    { name: "VIDAA", type: 'image', src: '/images/brands/vidaa.png' },
  ];

  return (
    <div className="brand-slider-container">
      <h3 className="slider-title">Compatible With All Major Platforms</h3>
      <div className="slider-track-container">
        <div className="slider-track">
          {/* Double the list for seamless infinite scroll */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-item">
              <div className="brand-icon">
                {brand.type === 'image' ? (
                  <img
                    src={brand.src}
                    alt={brand.name}
                    style={brand.style || {}}
                  />
                ) : (
                  brand.icon
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brand-slider-container {
          margin: 4rem 0;
          text-align: center;
          overflow: hidden;
          background: transparent;
          padding: 3rem 0;
        }
        
        .slider-title {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          opacity: 0.7;
        }

        .slider-track-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .slider-track-container::before,
        .slider-track-container::after {
            content: "";
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            z-index: 2;
        }
        .slider-track-container::before {
            left: 0;
            background: linear-gradient(to right, var(--background), transparent);
        }
        .slider-track-container::after {
            right: 0;
            background: linear-gradient(to left, var(--background), transparent);
        }

        .slider-track {
          display: flex;
          gap: 6rem;
          width: max-content;
          animation: scroll 40s linear infinite;
        }

        .brand-item {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: 0.3s;
          filter: grayscale(0%);
        }

        .brand-item:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        .brand-icon {
          height: 60px;
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .brand-icon svg {
            height: 100%;
            width: auto;
            max-width: 160px;
            max-height: 50px;
        }

        .brand-icon img {
            height: 100%;
            width: auto;
            max-width: 180px;
            max-height: 60px;
            object-fit: contain;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default BrandSlider;

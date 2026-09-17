import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";

export const HeroSlider = () => {
  const { setSelectedProductModal, products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: "tapeswaram-kaja",
      badge: "BALLA'S SIGNATURE CREATION SINCE 1939 • ARTISANAL GOLD MEDAL WINNER",
      title: "The Legendary",
      highlight: "Balla's Tapeswaram Kaja",
      desc: "Celebrated across continents. Crisp, flaky pastry layers drenched in pure cardamom sugar syrup and golden cow ghee. The generational taste of East Godavari.",
      image: "/images/tapeswaram_kaja.jpg",
      tags: ["100% Pure Cow Ghee", "Artisanal Heritage Award", "20 Days Freshness"]
    },
    {
      id: "bellam-pootharekulu",
      badge: "GODAVARI'S WORLD-FAMOUS PAPER SWEET • GI TAG CERTIFIED",
      title: "Handcrafted Organic",
      highlight: "Balla's Bellam Pootharekulu",
      desc: "Delicate translucent rice-starch sheets folded with organic palm jaggery, rich country ghee, and freshly roasted almond-cashew crunch.",
      image: "/images/bellam_pootharekulu.jpg",
      tags: ["GI Tag Certified", "Organic Jaggery", "Hand-Folded Delicacy"]
    },
    {
      id: "andhra-avakaya",
      badge: "GRANDMOTHER'S SECRET RECIPE • TRADITIONAL BHARANI JAADI",
      title: "Authentic Homeland",
      highlight: "Balla's Mango Avakaya",
      desc: "Hand-cut sour raw mango pieces cured with stone-ground mustard, fiery Guntur red chillies, and cold-pressed sesame oil. Preserved naturally without chemicals.",
      image: "/images/andhra_avakaya.jpg",
      tags: ["Ceramic Jaadi Pack", "Cold-Pressed Sesame Oil", "Zero Preservatives"]
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleQuickView = (productId) => {
    const prod = products.find(p => p.id === productId);
    if (prod) setSelectedProductModal(prod);
  };

  return (
    <>
      <section
        className="hero-slider-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="hero-slider-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img
                src={slide.image}
                alt={slide.highlight}
                className="hero-bg-media"
              />
              <div className="hero-gradient-overlay"></div>

              <div className="container" style={{ position: "relative", zIndex: 5, width: "100%" }}>
                <div className="hero-content">
                  <div className="hero-tag">
                    <i className="fa-solid fa-award"></i>
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="hero-title">
                    {slide.title}
                    <span>{slide.highlight}</span>
                  </h1>

                  <p className="hero-description">{slide.desc}</p>

                  <div className="hero-highlights">
                    {slide.tags.map((tag, tIdx) => (
                      <div key={tIdx} className="hero-highlight-item">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>

                  <div className="hero-cta-group">
                    <a
                      href="#catalog"
                      className="btn-gold"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById("catalog");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      Order Fresh Now
                    </a>
                    <button
                      className="btn-outline"
                      style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
                      onClick={() => handleQuickView(slide.id)}
                    >
                      <i className="fa-solid fa-eye"></i>
                      View Details & Sizes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            className="slider-arrow prev"
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous Slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="slider-arrow next"
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            aria-label="Next Slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Dot Indicators */}
          <div className="slider-dots">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`slider-dot ${dotIdx === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Trust Strip */}
      <section className="heritage-strip">
        <div className="container">
          <div className="heritage-features-grid">
            <div className="heritage-feature-card">
              <div className="heritage-feature-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div className="heritage-feature-info">
                <h4>100% Pure Cow Ghee</h4>
                <p>Authentic preparation with zero adulteration or artificial essence.</p>
              </div>
            </div>

            <div className="heritage-feature-card">
              <div className="heritage-feature-icon">
                <i className="fa-solid fa-fire-burner"></i>
              </div>
              <div className="heritage-feature-info">
                <h4>Cooked Fresh Daily</h4>
                <p>Small-batch artisanal preparation for peak aroma and crispness.</p>
              </div>
            </div>

            <div className="heritage-feature-card">
              <div className="heritage-feature-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <div className="heritage-feature-info">
                <h4>Vacuum Sealed Pack</h4>
                <p>Multilayer food-grade oxygen-barrier pouch preserves 100% freshness.</p>
              </div>
            </div>

            <div className="heritage-feature-card">
              <div className="heritage-feature-icon">
                <i className="fa-solid fa-earth-americas"></i>
              </div>
              <div className="heritage-feature-info">
                <h4>Global Express Courier</h4>
                <p>Fast doorstep shipping to USA, UK, UAE, Canada & Pan-India.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

import React from "react";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Heritage */}
          <div>
            <div className="footer-brand-header">
              <div className="brand-emblem-wrap" style={{ width: "44px", height: "44px" }}>
                <img src="/images/ballas_logo.jpg" alt="Balla's Official Crest Logo" className="brand-emblem-img" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="footer-brand-title">
                  BALLA'S
                </span>
                <span className="footer-brand-tagline">
                  HERITAGE CONFECTIONERY • ESTD 1939
                </span>
              </div>
            </div>
            <p className="footer-bio-text">
              The authentic guardians of Telugu confectionery legacy since 1939. Original home of Balla's Tapeswaram Kaja, Bellam Pootharekulu, and traditional grandmother's pickles prepared with 100% pure cow ghee.
            </p>
            <div className="footer-social-row">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Traditional Specialties */}
          <div>
            <h4 className="footer-col-title">
              Balla's Signatures
            </h4>
            <ul className="footer-links-list">
              <li><a href="#catalog">Balla's Original Tapeswaram Kaja</a></li>
              <li><a href="#catalog">Dry Fruit Bellam Pootharekulu</a></li>
              <li><a href="#catalog">Pure Cow Ghee Bandar Laddu</a></li>
              <li><a href="#catalog">Grandmother's Mango Avakaya</a></li>
              <li><a href="#catalog">Guntur Gongura Herb Pickle</a></li>
              <li><a href="#catalog">Butter Chegodilu & Murukku</a></li>
            </ul>
          </div>

          {/* Col 3: Express Worldwide Shipping */}
          <div>
            <h4 className="footer-col-title">
              Worldwide Air Shipping
            </h4>
            <p className="footer-bio-text" style={{ marginBottom: "0.75rem" }}>
              Balla's ships freshly sealed delicacies weekly to:
            </p>
            <div className="shipping-dest-tags">
              <span className="shipping-country-chip">🇺🇸 USA</span>
              <span className="shipping-country-chip">🇬🇧 UK</span>
              <span className="shipping-country-chip">🇨🇦 Canada</span>
              <span className="shipping-country-chip">🇦🇺 Australia</span>
              <span className="shipping-country-chip">🇦🇪 UAE</span>
              <span className="shipping-country-chip">🇮🇳 Pan-India</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              <i className="fa-solid fa-plane-circle-check" style={{ color: "var(--color-gold-400)", marginRight: "0.3rem" }}></i>
              Customs-cleared food packaging with vacuum freshness lock.
            </div>
          </div>

          {/* Col 4: Quality & Contact */}
          <div>
            <h4 className="footer-col-title">
              Certified Purity
            </h4>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <i className="fa-solid fa-certificate" style={{ color: "var(--color-emerald-500)" }}></i>
                <span>Food Safety Cert: #BAL-FSSAI-009821</span>
              </div>
              <div className="footer-contact-row">
                <i className="fa-solid fa-award" style={{ color: "var(--color-gold-400)" }}></i>
                <span>Master Artisanal Heritage Award</span>
              </div>
              <div className="footer-contact-row">
                <i className="fa-solid fa-phone" style={{ color: "var(--color-gold-400)" }}></i>
                <a href="tel:+9118002008899" style={{ color: "#cbd5e1" }}>+91 1800 200 8899 (Toll-Free)</a>
              </div>
              <div className="footer-contact-row">
                <i className="fa-solid fa-envelope" style={{ color: "var(--color-gold-400)" }}></i>
                <a href="mailto:concierge@ballasdelicacies.com" style={{ color: "#cbd5e1" }}>concierge@ballasdelicacies.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Balla's Heritage Sweets & Confectionery. All Rights Reserved. Handcrafted with pure cow ghee & generational pride.
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <span>UPI • RuPay • Visa • MasterCard • NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

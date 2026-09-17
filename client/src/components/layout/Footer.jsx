import React from "react";

export const Footer = () => {
  return (
    <footer style={{ background: "var(--color-primary-900)", color: "#f8fafc", paddingTop: "4.5rem", paddingBottom: "2rem", borderTop: "3px solid var(--color-gold-500)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2.5rem", marginBottom: "3.5rem" }}>
          {/* Col 1: Brand & Heritage */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.2rem" }}>
              <div className="brand-emblem-wrap" style={{ width: "48px", height: "48px" }}>
                <img src="/images/ballas_logo.jpg" alt="Balla's Official Crest Logo" className="brand-emblem-img" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.4rem", letterSpacing: "0.06em", color: "var(--color-gold-400)" }}>
                  BALLA'S
                </span>
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", color: "#e2e8f0", textTransform: "uppercase" }}>
                  HERITAGE CONFECTIONERY • ESTD 1939
                </span>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              The authentic guardians of Telugu confectionery legacy since 1939. Original home of Balla's Tapeswaram Kaja, Bellam Pootharekulu, and traditional grandmother's pickles prepared with 100% pure cow ghee.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a href="#" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold-400)" }} aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold-400)" }} aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold-400)" }} aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Traditional Specialties */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-gold-400)", marginBottom: "1.2rem" }}>
              Balla's Signatures
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "#cbd5e1" }}>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Balla's Original Tapeswaram Kaja</a></li>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Dry Fruit Bellam Pootharekulu</a></li>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Pure Cow Ghee Bandar Laddu</a></li>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Grandmother's Mango Avakaya</a></li>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Guntur Gongura Herb Pickle</a></li>
              <li><a href="#catalog" style={{ transition: "color 0.2s" }}>Butter Chegodilu & Murukku</a></li>
            </ul>
          </div>

          {/* Col 3: Express Worldwide Shipping */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-gold-400)", marginBottom: "1.2rem" }}>
              Worldwide Air Shipping
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              Balla's ships fresh delicacies weekly to:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇺🇸 USA</span>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇬🇧 UK</span>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇨🇦 Canada</span>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇦🇺 Australia</span>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇦🇪 UAE</span>
              <span className="ingredient-tag" style={{ background: "rgba(255,255,255,0.08)", color: "#f1f5f9", borderColor: "rgba(255,255,255,0.15)" }}>🇮🇳 Pan-India</span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
              <i className="fa-solid fa-plane-circle-check" style={{ color: "var(--color-gold-400)", marginRight: "0.3rem" }}></i>
              Customs-cleared food packaging with vacuum freshness lock.
            </div>
          </div>

          {/* Col 4: Quality & Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--color-gold-400)", marginBottom: "1.2rem" }}>
              Certified Purity
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#cbd5e1" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-certificate" style={{ color: "var(--color-emerald-500)" }}></i>
                <span>Food Safety Cert: #BAL-FSSAI-009821</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-award" style={{ color: "var(--color-gold-400)" }}></i>
                <span>Master Artisanal Heritage Award</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-phone" style={{ color: "var(--color-gold-400)" }}></i>
                <span>Customer Care: +91 1800 200 8899 (Toll-Free)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <i className="fa-solid fa-envelope" style={{ color: "var(--color-gold-400)" }}></i>
                <span>concierge@ballasdelicacies.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.8rem", color: "#94a3b8" }}>
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

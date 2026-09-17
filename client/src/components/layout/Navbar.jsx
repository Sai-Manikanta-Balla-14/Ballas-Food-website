import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";

export const Navbar = () => {
  const {
    cartCount,
    setIsCartOpen,
    setIsAuthOpen,
    activeView,
    setActiveView,
    user,
    selectedCategory,
    setSelectedCategory
  } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleCategoryNav = (categoryId, targetSection = "catalog") => {
    setActiveView("storefront");
    setSelectedCategory(categoryId);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(targetSection);
      if (el) {
        const headerOffset = 95;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth"
        });
      }
    }, 60);
  };

  const navCategories = [
    { id: "all", label: "All Delicacies", telugu: "అన్ని రకాలు", icon: "fa-solid fa-layer-group" },
    { id: "sweets", label: "Pure Ghee Sweets", telugu: "నెయ్యి మిఠాయిలు", icon: "fa-solid fa-cubes-stacked" },
    { id: "pickles", label: "Grandmother's Pickles", telugu: "ఆవకాయ & పచ్చళ్ళు", icon: "fa-solid fa-jar" },
    { id: "savouries", label: "Hot Savouries", telugu: "కారప్పూస & స్నాక్స్", icon: "fa-solid fa-cookie-bite" },
    { id: "hampers", label: "Royal Gift Boxes", telugu: "ఉత్సవ కానుకలు", icon: "fa-solid fa-gift" }
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        {/* Left: Brand Logo & Emblem */}
        <a
          href="#"
          className="brand-anchor"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("storefront");
            setSelectedCategory("all");
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Balla's Heritage Confectionery Home"
        >
          <div className="brand-emblem-wrap">
            <img
              src="/images/ballas_logo.jpg"
              alt="Balla's Official Crest Logo"
              className="brand-emblem-img"
            />
          </div>

          <div className="brand-identity-text">
            <span className="brand-name-title">BALLA'S</span>
            <span className="brand-sub-tagline">HERITAGE DELICACIES • ESTD 1939</span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="header-nav-list">
            {navCategories.map(cat => (
              <li key={cat.id} className="header-nav-item">
                <button
                  className={`header-nav-link ${activeView === "storefront" && selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => handleCategoryNav(cat.id, "catalog")}
                >
                  <span>{cat.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Action Buttons Group */}
        <div className="header-action-group">
          {/* Quick Search Shortcut */}
          <button
            className="header-icon-button search-shortcut"
            onClick={() => handleCategoryNav("all", "catalog")}
            title="Search Delicacies"
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Account Profile / Auth Modal */}
          <button
            className="header-icon-button auth-shortcut"
            onClick={() => setIsAuthOpen(true)}
            title={user ? `Signed in as ${user.name}` : "Sign In"}
            aria-label="Account"
          >
            <i className="fa-regular fa-user"></i>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            className="header-icon-button cart-header-btn"
            onClick={() => setIsCartOpen(true)}
            title="View Shopping Cart"
            aria-label="Shopping Cart"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            {cartCount > 0 && (
              <span className="cart-counter-pill">{cartCount}</span>
            )}
          </button>

          {/* Dashboard / Tracking Switcher */}
          <button
            className="header-cta-portal portal-desktop-only"
            onClick={() => setActiveView(activeView === "dashboard" ? "storefront" : "dashboard")}
            title={user.role === "admin" ? "Open Store Administration" : "Track Your Orders"}
          >
            <i className={user.role === "admin" ? "fa-solid fa-chart-line" : "fa-solid fa-truck-fast"}></i>
            <span className="cta-portal-label">
              {activeView === "dashboard" ? "Back to Shop" : (user.role === "admin" ? "Admin Ops" : "Track Order")}
            </span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className={`mobile-hamburger-btn ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Mobile Navigation Menu"
            title="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src="/images/ballas_logo.jpg"
                  alt="Balla's Logo"
                  style={{ width: "38px", height: "38px", borderRadius: "50%", border: "2px solid var(--color-gold-400)" }}
                />
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: "1.15rem", color: "var(--color-primary-900)" }}>
                    BALLA'S
                  </div>
                  <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "var(--color-gold-700)", letterSpacing: "0.08em" }}>
                    HERITAGE SWEETS & DELICACIES
                  </div>
                </div>
              </div>

              <button
                className="modal-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ width: "32px", height: "32px", position: "static" }}
                aria-label="Close navigation"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="mobile-nav-body">
              <div className="mobile-nav-section-title">Culinary Catalog</div>
              <div className="mobile-nav-links">
                {navCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`mobile-nav-item-btn ${selectedCategory === cat.id && activeView === "storefront" ? "active" : ""}`}
                    onClick={() => handleCategoryNav(cat.id, "catalog")}
                  >
                    <div className="mobile-nav-item-left">
                      <i className={cat.icon} style={{ width: "20px", color: "var(--color-gold-600)" }}></i>
                      <div>
                        <div className="mobile-nav-label">{cat.label}</div>
                        <div className="mobile-nav-sub">{cat.telugu}</div>
                      </div>
                    </div>
                    <i className="fa-solid fa-chevron-right mobile-nav-arrow"></i>
                  </button>
                ))}
              </div>

              {/* Mobile Quick Experiences */}
              <div className="mobile-nav-section-title" style={{ marginTop: "1.5rem" }}>Bespoke Experiences</div>
              <div className="mobile-nav-links">
                <button
                  className="mobile-nav-item-btn"
                  onClick={() => {
                    handleCategoryNav("all", "custom-box");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="mobile-nav-item-left">
                    <i className="fa-solid fa-wand-magic-sparkles" style={{ width: "20px", color: "var(--color-gold-600)" }}></i>
                    <div>
                      <div className="mobile-nav-label">Custom Mithai Box Studio</div>
                      <div className="mobile-nav-sub">Curate personalized 4, 6 or 9-piece assortments</div>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right mobile-nav-arrow"></i>
                </button>

                <button
                  className="mobile-nav-item-btn"
                  onClick={() => {
                    setActiveView(activeView === "dashboard" ? "storefront" : "dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="mobile-nav-item-left">
                    <i className={user.role === "admin" ? "fa-solid fa-chart-line" : "fa-solid fa-truck-fast"} style={{ width: "20px", color: "var(--color-gold-600)" }}></i>
                    <div>
                      <div className="mobile-nav-label">
                        {user.role === "admin" ? "Store Operations (Admin)" : "Live Order Tracking"}
                      </div>
                      <div className="mobile-nav-sub">
                        {user.role === "admin" ? "Inventory, batches, & customer orders" : "Real-time kitchen-to-door status"}
                      </div>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right mobile-nav-arrow"></i>
                </button>

                <button
                  className="mobile-nav-item-btn"
                  onClick={() => {
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="mobile-nav-item-left">
                    <i className="fa-regular fa-user" style={{ width: "20px", color: "var(--color-gold-600)" }}></i>
                    <div>
                      <div className="mobile-nav-label">{user.name}</div>
                      <div className="mobile-nav-sub">{user.email} • Role: {user.role}</div>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right mobile-nav-arrow"></i>
                </button>
              </div>

              {/* Heritage Trust Badge */}
              <div className="mobile-drawer-trust-badge">
                <i className="fa-solid fa-award" style={{ color: "var(--color-gold-600)", fontSize: "1.25rem" }}></i>
                <div>
                  <strong>Balla's 100% Desi Cow Ghee Promise</strong>
                  <div>Artisan sweets crafted since 1939. Shipped fresh daily across India & Worldwide.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

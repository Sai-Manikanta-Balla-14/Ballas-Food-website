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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryNav = (categoryId, targetSection = "catalog") => {
    setActiveView("storefront");
    setSelectedCategory(categoryId);
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

        {/* Center: Classy Navigation Links */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <button
                className={`header-nav-link ${activeView === "storefront" && selectedCategory === "all" ? "active" : ""}`}
                onClick={() => handleCategoryNav("all", "catalog")}
              >
                <span>All Delicacies</span>
              </button>
            </li>
            <li className="header-nav-item">
              <button
                className={`header-nav-link ${activeView === "storefront" && selectedCategory === "sweets" ? "active" : ""}`}
                onClick={() => handleCategoryNav("sweets", "catalog")}
              >
                <span>Pure Ghee Sweets</span>
              </button>
            </li>
            <li className="header-nav-item">
              <button
                className={`header-nav-link ${activeView === "storefront" && selectedCategory === "pickles" ? "active" : ""}`}
                onClick={() => handleCategoryNav("pickles", "catalog")}
              >
                <span>Grandmother's Pickles</span>
              </button>
            </li>
            <li className="header-nav-item">
              <button
                className={`header-nav-link ${activeView === "storefront" && selectedCategory === "savouries" ? "active" : ""}`}
                onClick={() => handleCategoryNav("savouries", "catalog")}
              >
                <span>Hot Savouries</span>
              </button>
            </li>
            <li className="header-nav-item">
              <button
                className={`header-nav-link ${activeView === "storefront" && selectedCategory === "hampers" ? "active" : ""}`}
                onClick={() => handleCategoryNav("hampers", "catalog")}
              >
                <span>Royal Gift Boxes</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Right: Action Buttons Group */}
        <div className="header-action-group">
          {/* Quick Search Shortcut */}
          <button
            className="header-icon-button"
            onClick={() => scrollToSection("catalog")}
            title="Search Delicacies"
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Account Profile / Auth Modal */}
          <button
            className="header-icon-button"
            onClick={() => setIsAuthOpen(true)}
            title={user ? `Signed in as ${user.name}` : "Sign In"}
            aria-label="Account"
          >
            <i className="fa-regular fa-user"></i>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            className="header-icon-button"
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
            className="header-cta-portal"
            onClick={() => setActiveView(activeView === "dashboard" ? "storefront" : "dashboard")}
            title={user.role === "admin" ? "Open Store Administration" : "Track Your Orders"}
          >
            <i className={user.role === "admin" ? "fa-solid fa-chart-line" : "fa-solid fa-truck-fast"}></i>
            <span>{activeView === "dashboard" ? "Back to Shop" : (user.role === "admin" ? "Admin Ops" : "Track Order")}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

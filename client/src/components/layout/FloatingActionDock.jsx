import React from "react";
import { useStore } from "../../context/StoreContext";

export const FloatingActionDock = ({ onOpenConcierge }) => {
  const { cartCount, setIsCartOpen } = useStore();

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="floating-action-dock" role="navigation" aria-label="Quick Actions">
      <button
        className="dock-action-btn highlight"
        onClick={() => scrollToElement("custom-box")}
        title="Custom Mithai Box Studio"
      >
        <i className="fa-solid fa-wand-magic-sparkles"></i>
        <span>Build Box</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={() => scrollToElement("catalog")}
        title="Explore All Delicacies"
      >
        <i className="fa-solid fa-cookie-bite"></i>
        <span>Delicacies</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={onOpenConcierge}
        title="Corporate & Wedding Inquiries"
      >
        <i className="fa-solid fa-building"></i>
        <span>VIP & Bulk</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={() => setIsCartOpen(true)}
        title="Open Cart"
      >
        <div className="dock-cart-icon-wrap">
          <i className="fa-solid fa-bag-shopping"></i>
          {cartCount > 0 && <span className="dock-cart-badge">{cartCount}</span>}
        </div>
        <span>Cart</span>
      </button>
    </div>
  );
};

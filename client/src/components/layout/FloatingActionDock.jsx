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
        <span>Build Gift Box</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={() => scrollToElement("catalog")}
        title="Explore All Delicacies"
      >
        <i className="fa-solid fa-cookie-bite"></i>
        <span>Catalog</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={onOpenConcierge}
        title="Corporate & Wedding Inquiries"
      >
        <i className="fa-solid fa-building"></i>
        <span>Bulk & Corporate</span>
      </button>

      <button
        className="dock-action-btn"
        onClick={() => setIsCartOpen(true)}
        title="Open Cart"
        style={{ background: "rgba(255, 255, 255, 0.12)" }}
      >
        <i className="fa-solid fa-bag-shopping"></i>
        <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
      </button>
    </div>
  );
};

import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const CorporateConciergeModal = ({ isOpen, onClose }) => {
  const { formatPrice, showToast } = useStore();

  const [boxCount, setBoxCount] = useState(50);
  const [embossedName, setEmbossedName] = useState("TECHCORP DIWALI 2026");
  const [selectedBoxType, setSelectedBoxType] = useState("Royal 1kg Assorted Chest");
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });

  if (!isOpen) return null;

  const basePricePerBox = 899;
  let discountTier = 15;
  if (boxCount >= 150) discountTier = 30;
  else if (boxCount >= 75) discountTier = 22;

  const subtotal = boxCount * basePricePerBox;
  const discountAmount = Math.round((subtotal * discountTier) / 100);
  const totalQuote = subtotal - discountAmount;

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    showToast(`🏛️ Corporate inquiry for ${boxCount} customized boxes submitted! Our concierge team will reach out within 2 hours.`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" style={{ maxWidth: "680px" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close concierge modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span className="badge-tag" style={{ background: "var(--color-gold-600)", color: "#fff", marginBottom: "0.5rem" }}>
            <i className="fa-solid fa-building" style={{ marginRight: "0.3rem" }}></i>
            Balla's Corporate & Wedding Concierge
          </span>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-primary-900)" }}>
            Bespoke Bulk Gifting & Foil Stamping
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)" }}>
            Curate royal Andhra delicacies for corporate celebrations, VIP clients, and grand wedding favors.
          </p>
        </div>

        <form onSubmit={handleSubmitInquiry}>
          {/* Box Quantity Slider */}
          <div style={{ background: "var(--color-slate-50)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "1.25rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-primary-900)" }}>
                Number of Gift Hampers:
              </span>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--color-gold-700)" }}>
                {boxCount} Boxes
              </span>
            </div>

            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={boxCount}
              onChange={(e) => setBoxCount(Number(e.target.value))}
              className="concierge-range-slider"
            />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-slate-500)" }}>
              <span>20 Boxes (15% Off)</span>
              <span>75 Boxes (22% Off)</span>
              <span>150+ Boxes (30% Off)</span>
            </div>
          </div>

          {/* Custom Foil Stamping Live Preview */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.35rem" }}>
              Type Company or Couple Name for Gold Foil Embossing on Box Lid:
            </label>
            <input
              type="text"
              value={embossedName}
              onChange={(e) => setEmbossedName(e.target.value.toUpperCase())}
              style={{ width: "100%", padding: "0.6rem", border: "1.5px solid var(--border-medium)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em" }}
            />

            {/* Visual Box Lid Stamping Mockup */}
            <div className="foil-stamp-preview-box">
              <div style={{ fontSize: "0.72rem", color: "rgba(245, 158, 11, 0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                BALLA'S CONFECTIONERY STUDIO
              </div>
              <div style={{ margin: "0.4rem 0", fontSize: "1.4rem", fontWeight: 900, textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
                ⚜️ {embossedName || "YOUR BRAND HERE"} ⚜️
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(245, 158, 11, 0.7)", letterSpacing: "0.15em" }}>
                100% PURE COW GHEE • HANDMADE ARTISANAL RECIPE
              </div>
            </div>
          </div>

          {/* Quote Breakdown */}
          <div style={{ background: "var(--color-gold-50)", border: "1px solid var(--color-gold-400)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
              <span>Base Cost ({boxCount} x {formatPrice(basePricePerBox)}):</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--color-emerald-700)", fontWeight: 700, marginBottom: "0.3rem" }}>
              <span>Bulk Volume Privilege ({discountTier}% Off):</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 800, color: "var(--color-primary-900)", borderTop: "1px solid var(--border-medium)", paddingTop: "0.5rem" }}>
              <span>Estimated Investment:</span>
              <span>{formatPrice(totalQuote)}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="checkout-form-grid" style={{ marginBottom: "1rem" }}>
            <div className="form-field-group">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Ramesh Varma"
                value={contactInfo.name}
                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="form-field-group">
              <label>Corporate Email *</label>
              <input
                type="email"
                required
                placeholder="ramesh@company.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <button type="submit" className="btn-gold" style={{ width: "100%", padding: "0.85rem" }}>
            <i className="fa-solid fa-paper-plane" style={{ marginRight: "0.4rem" }}></i>
            Submit Concierge Request & Lock {discountTier}% Discount
          </button>
        </form>
      </div>
    </div>
  );
};

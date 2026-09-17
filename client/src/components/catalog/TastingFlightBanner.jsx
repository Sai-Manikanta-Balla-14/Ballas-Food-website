import React from "react";
import { useStore } from "../../context/StoreContext";

export const TastingFlightBanner = () => {
  const { addToCart, formatPrice, showToast } = useStore();

  const handleAddFlight = () => {
    const flightProduct = {
      id: "ballas-tasting-flight",
      name: "Balla's Confectionery Tasting Flight (5 Mini Delicacies)",
      image: "/images/gift_hamper.jpg",
      origin: "Balla's Master Kitchens"
    };

    const variant = {
      weight: "500g Assorted Tasting Box",
      price: 499,
      originalPrice: 650,
      inStock: true
    };

    addToCart(flightProduct, variant, 1);
    showToast("🎉 Balla's Signature Tasting Flight added to your cart!");
  };

  return (
    <div className="container">
      <div className="tasting-flight-strip">
        <div className="tasting-flight-info">
          <span className="badge-tag" style={{ background: "var(--color-primary-800)", color: "#fff", marginBottom: "0.4rem" }}>
            ⭐ Connoisseur's Sampler Edition
          </span>
          <h3>Can't Decide? Experience Balla's Signature Tasting Flight</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--color-slate-700)", maxWidth: "580px", marginTop: "0.25rem" }}>
            A curated degustation box containing fresh portions of Tapeswaram Kaja, Bellam Pootharekulu, Bandar Laddu, Butter Chegodilu & Grandmother's Mango Avakaya in a keepsake gold tin.
          </p>

          <div className="flight-delicacies-mini-list">
            <img src="/images/tapeswaram_kaja.jpg" alt="Kaja" className="flight-mini-avatar" title="Original Tapeswaram Kaja" />
            <img src="/images/bellam_pootharekulu.jpg" alt="Pootharekulu" className="flight-mini-avatar" title="Bellam Pootharekulu" />
            <img src="/images/bandar_laddu.jpg" alt="Laddu" className="flight-mini-avatar" title="Bandar Laddu" />
            <img src="/images/murukku_chegodilu.jpg" alt="Chegodilu" className="flight-mini-avatar" title="Butter Chegodilu" />
            <img src="/images/andhra_avakaya.jpg" alt="Avakaya" className="flight-mini-avatar" title="Mango Avakaya" />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary-900)", marginLeft: "0.4rem" }}>
              5 Signature Icons
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", textDecoration: "line-through" }}>
              {formatPrice(650)}
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--color-primary-900)" }}>
              {formatPrice(499)}
            </div>
          </div>

          <button className="btn-gold" onClick={handleAddFlight} style={{ padding: "0.85rem 1.6rem" }}>
            <i className="fa-solid fa-cart-plus" style={{ marginRight: "0.4rem" }}></i>
            Get Tasting Flight
          </button>
        </div>
      </div>
    </div>
  );
};

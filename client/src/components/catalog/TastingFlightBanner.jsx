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
          <h3 className="tasting-flight-title">Can't Decide? Experience Balla's Signature Tasting Flight</h3>
          <p className="tasting-flight-desc">
            A curated degustation box containing fresh portions of Tapeswaram Kaja, Bellam Pootharekulu, Bandar Laddu, Butter Chegodilu & Grandmother's Mango Avakaya in a keepsake gold tin.
          </p>

          <div className="flight-delicacies-mini-list">
            <img src="/images/tapeswaram_kaja.jpg" alt="Kaja" className="flight-mini-avatar" title="Original Tapeswaram Kaja" />
            <img src="/images/bellam_pootharekulu.jpg" alt="Pootharekulu" className="flight-mini-avatar" title="Bellam Pootharekulu" />
            <img src="/images/bandar_laddu.jpg" alt="Laddu" className="flight-mini-avatar" title="Bandar Laddu" />
            <img src="/images/murukku_chegodilu.jpg" alt="Chegodilu" className="flight-mini-avatar" title="Butter Chegodilu" />
            <img src="/images/andhra_avakaya.jpg" alt="Avakaya" className="flight-mini-avatar" title="Mango Avakaya" />
            <span className="flight-icons-count">
              5 Signature Icons
            </span>
          </div>
        </div>

        <div className="tasting-flight-action">
          <div className="tasting-flight-pricing">
            <div className="tasting-flight-original-price">
              {formatPrice(650)}
            </div>
            <div className="tasting-flight-price">
              {formatPrice(499)}
            </div>
          </div>

          <button className="btn-gold tasting-flight-btn" onClick={handleAddFlight}>
            <i className="fa-solid fa-cart-plus" style={{ marginRight: "0.4rem" }}></i>
            Get Tasting Flight
          </button>
        </div>
      </div>
    </div>
  );
};

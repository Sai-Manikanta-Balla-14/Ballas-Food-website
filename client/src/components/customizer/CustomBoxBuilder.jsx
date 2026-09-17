import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const CustomBoxBuilder = () => {
  const { products, addToCart, formatPrice, showToast } = useStore();

  const boxSizes = [
    { id: 4, label: "Royal 4-Piece Box", price: 699, slots: 4, desc: "Perfect personal indulgence or couple gift" },
    { id: 6, label: "Imperial 6-Piece Box", price: 999, slots: 6, desc: "Our most popular family celebration size", isPopular: true },
    { id: 9, label: "Grand 9-Piece Chest", price: 1499, slots: 9, desc: "Prestige luxury hamper for weddings & VIPs" }
  ];

  const [selectedSize, setSelectedSize] = useState(boxSizes[1]);
  const [slotItems, setSlotItems] = useState(Array(6).fill(null));
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);

  // Personalized Card State
  const [giftNote, setGiftNote] = useState({
    recipient: "Priya & Anand",
    sender: "With love from Balla Family",
    message: "Wishing you abundance, sweet beginnings, and blissful celebrations!",
    waxSeal: "crown"
  });

  // Handle Box Size Switch
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSlotItems(Array(size.slots).fill(null));
    setActiveSlotIdx(0);
  };

  // Select sweet for the active slot
  const handlePickSweet = (product) => {
    setSlotItems(prev => {
      const next = [...prev];
      next[activeSlotIdx] = product;
      return next;
    });

    // Auto advance to next unfilled slot if available
    const nextUnfilled = slotItems.findIndex((item, idx) => idx > activeSlotIdx && item === null);
    if (nextUnfilled !== -1) {
      setActiveSlotIdx(nextUnfilled);
    } else {
      const anyEmpty = slotItems.findIndex(item => item === null);
      if (anyEmpty !== -1) setActiveSlotIdx(anyEmpty);
    }
  };

  const handleClearSlot = (idx, e) => {
    e.stopPropagation();
    setSlotItems(prev => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
    setActiveSlotIdx(idx);
  };

  // Add customized box to shopping cart
  const handleAddBoxToCart = () => {
    const filledCount = slotItems.filter(Boolean).length;
    if (filledCount === 0) {
      showToast("Please fill at least 1 sweet slot before adding to cart!", "error");
      return;
    }

    const filledNames = slotItems.filter(Boolean).map(p => p.name).join(", ");

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Balla's Custom ${selectedSize.label}`,
      image: "/images/gift_hamper.jpg",
      origin: "Balla's Bespoke Confectionery Studio"
    };

    const variant = {
      weight: `${selectedSize.slots} Curated Slots (${filledCount} selected)`,
      price: selectedSize.price,
      originalPrice: selectedSize.price + 250,
      inStock: true
    };

    addToCart(customBoxProduct, variant, 1);
    showToast(`🎁 Customized ${selectedSize.label} added to cart with your personal wax-sealed note!`);
  };

  return (
    <section id="custom-box" className="custom-builder-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ color: "#fff" }}>
          <div className="section-pretitle" style={{ color: "var(--color-gold-400)" }}>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Interactive Bespoke Studio</span>
          </div>
          <h2 className="section-title" style={{ color: "#fff" }}>
            Curate Your Own Balla's Gift Chest
          </h2>
          <p className="section-subtitle" style={{ color: "#cbd5e1" }}>
            Select your royal packaging, handpick freshly crafted delicacies for each compartment, and seal it with your personalized gold wax note.
          </p>
        </div>

        <div className="custom-builder-grid">
          {/* Left Column: Visual Box Compartment Chassis */}
          <div>
            <div className="box-chassis">
              <div className="box-lid-crest">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img
                    src="/images/ballas_logo.jpg"
                    alt="Balla's Crest"
                    style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid var(--color-gold-400)" }}
                  />
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 800, fontSize: "1.1rem", color: "var(--color-gold-400)" }}>
                      {selectedSize.label}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>
                      Artisanal Pure Cow Ghee Partition Tin
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#ffffff" }}>
                  {formatPrice(selectedSize.price)}
                </div>
              </div>

              {/* Grid of Compartment Slots */}
              <div className={`box-slots-grid slots-${selectedSize.slots}`}>
                {slotItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`compartment-slot ${item ? "filled" : ""} ${idx === activeSlotIdx ? "active-slot-highlight" : ""}`}
                    onClick={() => setActiveSlotIdx(idx)}
                    style={idx === activeSlotIdx ? { borderColor: "var(--color-gold-400)", boxShadow: "0 0 15px rgba(245, 158, 11, 0.35)" } : {}}
                  >
                    {item ? (
                      <>
                        <img src={item.image} alt={item.name} className="slot-item-thumb" />
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                          {item.name.replace("Balla's ", "")}
                        </span>
                        <button
                          className="slot-clear-btn"
                          onClick={(e) => handleClearSlot(idx, e)}
                          title="Remove item"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus" style={{ fontSize: "1.2rem", color: "var(--color-gold-400)", marginBottom: "0.3rem" }}></i>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          {idx === activeSlotIdx ? "Select Item Below" : `Slot ${idx + 1}`}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Wax Seal Card Simulation */}
              <div style={{ marginTop: "1.75rem", borderTop: "1px solid rgba(217, 119, 6, 0.3)", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold-400)", fontWeight: 700 }}>
                    Attached Greeting Note:
                  </span>
                  <div style={{ fontSize: "0.85rem", color: "#fff", fontStyle: "italic", marginTop: "0.2rem" }}>
                    "{giftNote.message.substring(0, 45)}..."
                  </div>
                </div>

                <div
                  className="wax-seal-option active"
                  style={{ width: "36px", height: "36px" }}
                  title="Official Balla Wax Seal"
                >
                  <i className={`fa-solid fa-${giftNote.waxSeal === "crown" ? "crown" : (giftNote.waxSeal === "diya" ? "fire" : "ribbon")}`}></i>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controls, Sweets Tray & Card Editor */}
          <div className="custom-controls-card">
            {/* Step 1: Choose Box Size */}
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold-400)", marginBottom: "0.6rem" }}>
              1. Choose Box Architecture & Capacity:
            </label>
            <div className="size-selector-pills">
              {boxSizes.map(size => (
                <div
                  key={size.id}
                  className={`size-pill-option ${size.id === selectedSize.id ? "active" : ""}`}
                  onClick={() => handleSizeChange(size)}
                >
                  <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{size.slots} Delicacies</div>
                  <div style={{ fontSize: "0.82rem", marginTop: "0.15rem" }}>{formatPrice(size.price)}</div>
                </div>
              ))}
            </div>

            {/* Step 2: Choose Sweet for Selected Slot */}
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-gold-400)", marginBottom: "0.6rem" }}>
              2. Filling Slot #{activeSlotIdx + 1} — Click to Assign Delicacy:
            </label>
            <div className="sweet-picker-tray">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="sweet-picker-item"
                  onClick={() => handlePickSweet(prod)}
                >
                  <img src={prod.image} alt={prod.name} className="sweet-picker-img" />
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                    {prod.name.replace("Balla's ", "")}
                  </div>
                  <span style={{ fontSize: "0.68rem", color: "var(--color-gold-400)", marginTop: "0.2rem" }}>
                    {prod.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 3: Personalized Wax-Sealed Gift Card */}
            <div className="gift-message-envelope">
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 800, color: "var(--color-primary-900)", marginBottom: "0.4rem" }}>
                3. Personalized Card & Wax Seal Stamp:
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.6rem" }}>
                <input
                  type="text"
                  placeholder="Recipient Name"
                  style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem", border: "1px solid var(--border-medium)", borderRadius: "4px" }}
                  value={giftNote.recipient}
                  onChange={(e) => setGiftNote(prev => ({ ...prev, recipient: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Your Name (Sender)"
                  style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem", border: "1px solid var(--border-medium)", borderRadius: "4px" }}
                  value={giftNote.sender}
                  onChange={(e) => setGiftNote(prev => ({ ...prev, sender: e.target.value }))}
                />
              </div>

              <textarea
                rows={2}
                placeholder="Personal message for the card..."
                style={{ width: "100%", padding: "0.4rem 0.6rem", fontSize: "0.8rem", border: "1px solid var(--border-medium)", borderRadius: "4px", resize: "none" }}
                value={giftNote.message}
                onChange={(e) => setGiftNote(prev => ({ ...prev, message: e.target.value }))}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.6rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-700)" }}>
                  Choose Wax Stamp:
                </span>
                <div className="wax-seal-selector">
                  <div
                    className={`wax-seal-option ${giftNote.waxSeal === "crown" ? "active" : ""}`}
                    onClick={() => setGiftNote(prev => ({ ...prev, waxSeal: "crown" }))}
                    title="Royal Crown Seal"
                  >
                    <i className="fa-solid fa-crown"></i>
                  </div>
                  <div
                    className={`wax-seal-option ${giftNote.waxSeal === "diya" ? "active" : ""}`}
                    onClick={() => setGiftNote(prev => ({ ...prev, waxSeal: "diya" }))}
                    title="Festive Diya Seal"
                  >
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <div
                    className={`wax-seal-option ${giftNote.waxSeal === "ribbon" ? "active" : ""}`}
                    onClick={() => setGiftNote(prev => ({ ...prev, waxSeal: "ribbon" }))}
                    title="Celebration Ribbon Seal"
                  >
                    <i className="fa-solid fa-ribbon"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "0.95rem", fontSize: "1rem" }}
              onClick={handleAddBoxToCart}
            >
              <i className="fa-solid fa-gift" style={{ marginRight: "0.5rem" }}></i>
              Add Curated Box to Cart ({formatPrice(selectedSize.price)})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          <div className="custom-box-visualizer-col">
            <div className="box-chassis">
              <div className="box-lid-crest">
                <div className="box-lid-brand">
                  <img
                    src="/images/ballas_logo.jpg"
                    alt="Balla's Crest"
                    className="box-lid-logo"
                  />
                  <div>
                    <div className="box-lid-title">
                      {selectedSize.label}
                    </div>
                    <div className="box-lid-subtitle">
                      Artisanal Pure Cow Ghee Partition Tin
                    </div>
                  </div>
                </div>

                <div className="box-lid-price">
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
                  >
                    {item ? (
                      <div className="slot-filled-content">
                        <img src={item.image} alt={item.name} className="slot-item-thumb" />
                        <span className="slot-item-name">
                          {item.name.replace("Balla's ", "")}
                        </span>
                        <button
                          className="slot-clear-btn"
                          onClick={(e) => handleClearSlot(idx, e)}
                          title="Remove item"
                          aria-label={`Remove delicacy from Slot ${idx + 1}`}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="slot-empty-content">
                        <i className="fa-solid fa-plus slot-plus-icon"></i>
                        <span className="slot-index-label">Slot {idx + 1}</span>
                        {idx === activeSlotIdx && (
                          <span className="slot-active-tag">Pick Below</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Wax Seal Card Simulation */}
              <div className="box-greeting-preview">
                <div className="box-greeting-text">
                  <span className="box-greeting-label">
                    Attached Greeting Note:
                  </span>
                  <div className="box-greeting-msg">
                    "{giftNote.message.substring(0, 45)}..."
                  </div>
                </div>

                <div
                  className="wax-seal-option active"
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
            <label className="custom-step-label">
              1. Choose Box Architecture & Capacity:
            </label>
            <div className="size-selector-pills">
              {boxSizes.map(size => (
                <div
                  key={size.id}
                  className={`size-pill-option ${size.id === selectedSize.id ? "active" : ""}`}
                  onClick={() => handleSizeChange(size)}
                >
                  <div className="size-pill-slots">{size.slots} Delicacies</div>
                  <div className="size-pill-price">{formatPrice(size.price)}</div>
                  {size.isPopular && <span className="size-popular-badge">Popular</span>}
                </div>
              ))}
            </div>

            {/* Step 2: Choose Sweet for Selected Slot */}
            <label className="custom-step-label">
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
                  <div className="sweet-picker-name">
                    {prod.name.replace("Balla's ", "")}
                  </div>
                  <span className="sweet-picker-cat">
                    {prod.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 3: Personalized Wax-Sealed Gift Card */}
            <div className="gift-message-envelope">
              <label className="gift-envelope-title">
                3. Personalized Card & Wax Seal Stamp:
              </label>

              <div className="gift-name-fields">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  className="gift-input"
                  value={giftNote.recipient}
                  onChange={(e) => setGiftNote(prev => ({ ...prev, recipient: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Your Name (Sender)"
                  className="gift-input"
                  value={giftNote.sender}
                  onChange={(e) => setGiftNote(prev => ({ ...prev, sender: e.target.value }))}
                />
              </div>

              <textarea
                rows={2}
                placeholder="Personal message for the card..."
                className="gift-textarea"
                value={giftNote.message}
                onChange={(e) => setGiftNote(prev => ({ ...prev, message: e.target.value }))}
              />

              <div className="gift-wax-row">
                <span className="gift-wax-label">
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
              className="btn-gold custom-add-cart-btn"
              onClick={handleAddBoxToCart}
            >
              <i className="fa-solid fa-gift"></i>
              <span>Add Curated Box to Cart ({formatPrice(selectedSize.price)})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

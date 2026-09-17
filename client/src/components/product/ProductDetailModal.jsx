import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { reviewsData } from "../../data/reviewsData";
import { SensoryRadarBadge } from "../sensory/SensoryRadarBadge";

const ProductDetailModalContent = ({ product, onClose, addToCart, formatPrice, setIsCheckoutOpen }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(
    product.variants?.findIndex(v => v.isPopular) !== -1
      ? product.variants?.findIndex(v => v.isPopular)
      : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("heritage");
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState(null);

  const activeVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0] || { weight: "500g", price: 300 };
  const isOutOfStock = product.stock === 0 || !activeVariant.inStock;
  const isLowStock = !isOutOfStock && product.stock <= 20;
  const reviews = reviewsData[product.id] || reviewsData["tapeswaram-kaja"] || [];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setPincodeMessage({ type: "error", text: "Please enter a valid 6-digit Indian pincode." });
      return;
    }
    setPincodeMessage({
      type: "success",
      text: `✓ Delivery available to ${pincode}! Estimated delivery: 24 - 48 Hours via Express Courier.`
    });
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, activeVariant, quantity);
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-body-grid">
          {/* Left Column: Media Presentation */}
          <div className="modal-media-col">
            <div className={`modal-img-wrap ${isOutOfStock ? "media-out-of-stock" : ""}`}>
              <img
                src={product.image}
                alt={product.name}
                className="modal-main-img"
                onError={(e) => { e.target.src = "/images/tapeswaram_kaja.jpg"; }}
              />
              {isOutOfStock ? (
                <div className="badge-sold-out modal-sold-badge">
                  <i className="fa-solid fa-ban" style={{ marginRight: "0.4rem" }}></i>
                  Sold Out
                </div>
              ) : (
                product.badge && <div className="modal-badge-float">{product.badge}</div>
              )}
            </div>

            {/* Live Crafting Telemetry Badge */}
            {product.liveBatch && !isOutOfStock && (
              <div className="modal-crafting-card">
                <div className="crafting-card-title">
                  <span className="live-batch-dot"></span>
                  <span>Kitchen Batch Telemetry (Live)</span>
                </div>
                <div className="crafting-details">
                  <div><strong>Batch Code:</strong> {product.liveBatch.batchId}</div>
                  <div><strong>Prepared:</strong> {product.liveBatch.timeAgo}</div>
                  <div><strong>Craftsman:</strong> {product.liveBatch.craftsman}</div>
                  <div><strong>Method:</strong> {product.liveBatch.temperature}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Culinary Details & Purchasing */}
          <div className="modal-info-col">
            <span className="modal-origin-crumb">
              <i className="fa-solid fa-location-dot" style={{ color: "var(--color-gold-700)", marginRight: "0.3rem" }}></i>
              {product.origin}
            </span>

            <h2 className="modal-product-title">{product.name}</h2>
            <div className="modal-telugu-name">{product.teluguName}</div>

            {/* Rating */}
            <div className="modal-rating-row">
              <div style={{ color: "#f59e0b", display: "flex", gap: "2px" }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{product.rating}</span>
              <span style={{ color: "var(--color-slate-400)" }}>({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price Display */}
            <div className="modal-price-display">
              <span className="modal-current-price">{formatPrice(activeVariant.price)}</span>
              {activeVariant.originalPrice && (
                <span className="modal-original-price">{formatPrice(activeVariant.originalPrice)}</span>
              )}
              {activeVariant.originalPrice && (
                <span className="modal-save-pill">
                  Save {Math.round(((activeVariant.originalPrice - activeVariant.price) / activeVariant.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Pack Size Selector (Vellanki Foods Style) */}
            <div className="modal-variants-section">
              <div className="modal-variants-title">Select Pack Weight:</div>
              <div className="modal-variants-grid">
                {product.variants.map((v, idx) => {
                  const isVarOut = product.stock === 0 || !v.inStock;
                  return (
                    <div
                      key={idx}
                      className={`modal-variant-card ${idx === selectedVariantIndex ? "active" : ""} ${isVarOut ? "modal-variant-out" : ""}`}
                      onClick={() => setSelectedVariantIndex(idx)}
                    >
                      <div className="modal-variant-weight">
                        {v.weight}
                        {isVarOut && <span className="modal-var-tag-sold">Sold Out</span>}
                      </div>
                      <div className="modal-variant-price">{formatPrice(v.price)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Stock Notification Banner */}
            {isOutOfStock ? (
              <div className="modal-stock-banner out-of-stock">
                <i className="fa-solid fa-ban" style={{ fontSize: "1.25rem" }}></i>
                <div>
                  <strong>Currently Sold Out</strong>
                  <div style={{ fontSize: "0.8rem", opacity: 0.9, marginTop: "0.15rem" }}>
                    Our master artisans are simmering the next fresh batch. Available again shortly!
                  </div>
                </div>
              </div>
            ) : isLowStock ? (
              <div className="modal-stock-banner low-stock">
                <i className="fa-solid fa-fire-burner" style={{ fontSize: "1.25rem" }}></i>
                <div>
                  <strong>Fresh Kitchen Batch: Only {product.stock} units remaining!</strong>
                  <div style={{ fontSize: "0.8rem", opacity: 0.9, marginTop: "0.15rem" }}>
                    Order now to guarantee delivery before this batch sells out.
                  </div>
                </div>
              </div>
            ) : null}

            {/* Quantity and Actions */}
            <div className="modal-action-row">
              <div className="qty-counter">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={isOutOfStock}
                  aria-label="Decrease quantity"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <div className="qty-value">{isOutOfStock ? 0 : quantity}</div>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(prev => (product.stock ? Math.min(product.stock, prev + 1) : prev + 1))}
                  disabled={isOutOfStock || (product.stock && quantity >= product.stock)}
                  aria-label="Increase quantity"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <button
                className={`btn-primary modal-add-cart-btn ${isOutOfStock ? "disabled" : ""}`}
                disabled={isOutOfStock}
                onClick={() => {
                  if (!isOutOfStock) {
                    addToCart(product, activeVariant, quantity);
                    onClose();
                  }
                }}
              >
                <i className={isOutOfStock ? "fa-solid fa-ban" : "fa-solid fa-bag-shopping"}></i>
                {isOutOfStock ? "Sold Out" : "Add To Cart"}
              </button>

              {!isOutOfStock && (
                <button
                  className="btn-gold"
                  style={{ height: "46px" }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              )}
            </div>

            {/* Pincode Delivery Availability */}
            <div className="pincode-checker-box">
              <div className="pincode-header">
                <i className="fa-solid fa-truck-fast"></i>
                <span>Check Delivery Availability & Speed:</span>
              </div>
              <form className="pincode-input-row" onSubmit={handlePincodeCheck}>
                <input
                  type="text"
                  placeholder="Enter 6-digit Indian Pincode"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              {pincodeMessage && (
                <div className={`pincode-status ${pincodeMessage.type}`}>
                  {pincodeMessage.text}
                </div>
              )}
            </div>

            {/* Live Kitchen Batch Info */}
            {product.liveBatch && (
              <div style={{ background: "#fffdfa", border: "1.5px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gold-700)", textTransform: "uppercase" }}>
                    🔥 Kitchen Batch Telemetry:
                  </span>
                  <span className="live-batch-pill" style={{ margin: 0 }}>
                    <span className="live-batch-dot"></span>
                    {product.liveBatch.batchId} • {product.liveBatch.timeAgo}
                  </span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-slate-700)" }}>
                  Crafted by: <strong>{product.liveBatch.craftsman}</strong>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-slate-500)", marginTop: "0.15rem" }}>
                  {product.liveBatch.temperature}
                </div>
              </div>
            )}

            {/* Sensory Radar Profile */}
            {product.sensoryProfile && (
              <div style={{ marginBottom: "1.25rem" }}>
                <SensoryRadarBadge profile={product.sensoryProfile} />
              </div>
            )}

            {/* Tabs Navigation */}
            <div className="modal-tabs-nav" role="tablist">
              <button
                className={`modal-tab-btn ${activeTab === "heritage" ? "active" : ""}`}
                onClick={() => setActiveTab("heritage")}
              >
                Heritage & Taste
              </button>
              <button
                className={`modal-tab-btn ${activeTab === "ingredients" ? "active" : ""}`}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients & Purity
              </button>
              <button
                className={`modal-tab-btn ${activeTab === "shelfLife" ? "active" : ""}`}
                onClick={() => setActiveTab("shelfLife")}
              >
                Storage & Shelf Life
              </button>
              <button
                className={`modal-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="modal-tab-content">
              {activeTab === "heritage" && (
                <div>
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === "ingredients" && (
                <div>
                  <p>Prepared following authentic traditional culinary standards:</p>
                  <ul className="ingredients-list">
                    {product.ingredients.map((ing, iIdx) => (
                      <li key={iIdx} className="ingredient-tag">{ing}</li>
                    ))}
                  </ul>
                  <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--color-slate-500)" }}>
                    *Allergen declaration: Contains dairy (pure ghee) and wheat gluten. Prepared in a facility handling tree nuts.
                  </p>
                </div>
              )}

              {activeTab === "shelfLife" && (
                <div>
                  <p><strong>Shelf Life:</strong> Guaranteed fresh for up to {product.shelfLifeDays} days from date of dispatch.</p>
                  <p style={{ marginTop: "0.4rem" }}>
                    <strong>Storage Instructions:</strong> Store in a cool, dry place away from direct sunlight. Once opened, keep in an airtight glass or food-grade container to preserve the signature crispness and aroma. No refrigeration required.
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {reviews.map(rev => (
                      <div
                        key={rev.id}
                        style={{
                          padding: "0.75rem",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "var(--radius-sm)",
                          background: "var(--color-slate-50)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--color-primary-900)" }}>
                            {rev.author}
                            {rev.verified && (
                              <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "var(--color-emerald-700)", fontWeight: 700 }}>
                                <i className="fa-solid fa-circle-check"></i> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--color-slate-400)" }}>{rev.date}</span>
                        </div>
                        <div style={{ color: "#f59e0b", fontSize: "0.75rem", margin: "0.2rem 0" }}>
                          {"★".repeat(rev.rating)}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--color-slate-800)" }}>
                          {rev.title}
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "var(--color-slate-600)", marginTop: "0.2rem" }}>
                          {rev.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailModal = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart, formatPrice, setIsCheckoutOpen, products } = useStore();

  if (!selectedProductModal) return null;

  const liveProduct = products.find(p => p.id === selectedProductModal.id) || selectedProductModal;

  return (
    <ProductDetailModalContent
      product={liveProduct}
      onClose={() => setSelectedProductModal(null)}
      addToCart={addToCart}
      formatPrice={formatPrice}
      setIsCheckoutOpen={setIsCheckoutOpen}
    />
  );
};


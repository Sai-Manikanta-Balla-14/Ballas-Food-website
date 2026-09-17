import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { SensoryRadarBadge } from "../sensory/SensoryRadarBadge";

export const ProductCard = ({ product }) => {
  const { formatPrice, addToCart, setSelectedProductModal } = useStore();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(
    product.variants.findIndex(v => v.isPopular) !== -1
      ? product.variants.findIndex(v => v.isPopular)
      : 0
  );

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  return (
    <article className="product-card">
      {/* Media Image & Badges */}
      <div className="product-card-media">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="card-badges">
          {product.badge && <span className="badge-tag">{product.badge}</span>}
          {product.isPureGhee && (
            <span className="badge-ghee">
              <i className="fa-solid fa-droplet"></i> Pure Ghee
            </span>
          )}
        </div>

        <div className="card-top-right">
          <span className="badge-veg" title="100% Vegetarian"></span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          className="quick-view-overlay-btn"
          onClick={() => setSelectedProductModal(product)}
        >
          <i className="fa-solid fa-expand" style={{ marginRight: "0.4rem" }}></i>
          Full Culinary View
        </button>
      </div>

      {/* Card Content Body */}
      <div className="product-card-body">
        {/* Live Batch Pulse */}
        {product.liveBatch && (
          <div className="live-batch-pill">
            <span className="live-batch-dot"></span>
            <span>Batch {product.liveBatch.batchId} • {product.liveBatch.timeAgo}</span>
          </div>
        )}

        <span className="product-origin">{product.origin}</span>
        <span className="product-telugu-name">{product.teluguName}</span>
        <h3
          className="product-name"
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedProductModal(product)}
        >
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="product-rating">
          <span className="star-gold">
            <i className="fa-solid fa-star"></i> {product.rating}
          </span>
          <span style={{ color: "var(--color-slate-400)" }}>•</span>
          <span>({product.reviewCount} connoisseur reviews)</span>
        </div>

        <p className="product-short-desc">{product.shortDesc}</p>

        {/* Sensory Flavor Radar Meters */}
        {product.sensoryProfile && (
          <SensoryRadarBadge profile={product.sensoryProfile} />
        )}

        {/* Sommelier Pairing Note */}
        {product.sensoryProfile?.sommelierPairing && (
          <div className="sommelier-quote-box">
            💡 {product.sensoryProfile.sommelierPairing}
          </div>
        )}

        {/* Weight Variant Selector */}
        <div className="card-variants-selector" style={{ marginTop: "1rem" }}>
          <div className="variant-label-row">
            <span>Select Weight:</span>
            <span style={{ color: "var(--color-primary-900)", fontWeight: 700 }}>
              {activeVariant.weight}
            </span>
          </div>

          <div className="variant-pills-group">
            {product.variants.map((variant, vIdx) => (
              <button
                key={vIdx}
                className={`variant-pill-btn ${vIdx === selectedVariantIndex ? "selected" : ""}`}
                onClick={() => setSelectedVariantIndex(vIdx)}
                title={`Select ${variant.weight}`}
              >
                {variant.weight.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & Add to Cart */}
        <div className="product-card-footer">
          <div className="price-container">
            <span className="current-price">{formatPrice(activeVariant.price)}</span>
            {activeVariant.originalPrice && (
              <span className="original-price">{formatPrice(activeVariant.originalPrice)}</span>
            )}
          </div>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product, activeVariant, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            <i className="fa-solid fa-plus"></i>
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

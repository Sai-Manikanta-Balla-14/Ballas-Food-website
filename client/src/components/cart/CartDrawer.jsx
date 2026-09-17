import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    updateCartQty,
    removeFromCart,
    formatPrice,
    activeCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartOpen) return null;

  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : (cart.length > 0 ? 50 : 0);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput);
      if (ok) setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="cart-drawer-backdrop"
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="cart-header">
          <h3>
            <i className="fa-solid fa-basket-shopping" style={{ color: "var(--color-gold-600)" }}></i>
            Your Delicacies ({cart.length})
          </h3>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-text">
            {progressPercent >= 100 ? (
              <>
                <i className="fa-solid fa-circle-check" style={{ color: "var(--color-emerald-600)" }}></i>
                <span><strong>Congratulations!</strong> You unlocked FREE Express Shipping!</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-truck" style={{ color: "var(--color-gold-700)" }}></i>
                <span>Add <strong>{formatPrice(amountNeeded)}</strong> more to unlock <strong>FREE Delivery</strong></span>
              </>
            )}
          </div>
          <div className="shipping-progress-track">
            <div className="shipping-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <i className="fa-solid fa-cookie"></i>
              </div>
              <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary-900)", marginBottom: "0.4rem" }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)", marginBottom: "1.25rem" }}>
                Explore our pure ghee Tapeswaram Kaja and traditional sweets to begin your order.
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Delicacies
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.weight}-${index}`} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-details">
                  <div>
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-weight">Pack: {item.weight}</div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-qty-toggle">
                      <button
                        onClick={() => updateCartQty(item.id, item.weight, -1)}
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.weight, 1)}
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>

                    <div className="cart-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id, item.weight)}
                      aria-label="Remove item"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Coupon Application */}
            {activeCoupon ? (
              <div className="coupon-applied-pill">
                <span>
                  <i className="fa-solid fa-tag" style={{ marginRight: "0.4rem" }}></i>
                  {activeCoupon.code} applied ({activeCoupon.desc})
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ color: "#dc2626", fontWeight: 700, fontSize: "0.75rem" }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form className="coupon-input-group" onSubmit={handleApplyCoupon}>
                <input
                  type="text"
                  placeholder="Enter Promo Code (FESTIVE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit" className="coupon-apply-btn">
                  Apply
                </button>
              </form>
            )}

            {/* Bill Tally */}
            <div className="tally-row">
              <span>Subtotal:</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="tally-row discount">
                <span>Coupon Savings:</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="tally-row">
              <span>Delivery Fee:</span>
              <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
            </div>

            <div className="tally-total-row">
              <span>Grand Total:</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>

            <button
              className="btn-gold checkout-trigger-btn"
              onClick={handleProceedToCheckout}
            >
              <i className="fa-solid fa-lock" style={{ marginRight: "0.5rem" }}></i>
              Proceed To Checkout ({formatPrice(finalTotal)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

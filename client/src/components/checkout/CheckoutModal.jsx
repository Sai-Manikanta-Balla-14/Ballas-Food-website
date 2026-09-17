import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    formatPrice,
    placeOrder,
    setActiveView
  } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "Sai Manikanta Balla",
    email: "saimanikanta.balla@example.com",
    phone: "+91 9000000000",
    address: "Plot 24, Road No. 10, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    deliverySpeed: "express",
    paymentMethod: "UPI (Google Pay / PhonePe)"
  });
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isCheckoutOpen) return null;

  const shippingFee = cartSubtotal >= 499 ? 0 : 50;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      const placed = placeOrder(formData);
      setOrderComplete(placed);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsCheckoutOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="checkout-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Close checkout"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {!orderComplete ? (
          <>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-primary-900)", marginBottom: "0.25rem" }}>
              Secure Express Checkout
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--color-slate-500)", marginBottom: "1.5rem" }}>
              Encrypted 256-Bit SSL Checkout • Direct from East Godavari Confectioners
            </p>

            {/* Stepper Navigation */}
            <div className="checkout-steps-nav">
              <div className={`step-indicator ${step >= 1 ? "active" : ""}`}>
                <div className="step-number">1</div>
                <span>Shipping Address</span>
              </div>
              <div style={{ flex: 1, height: "2px", background: "var(--border-medium)", margin: "0 0.5rem" }}></div>
              <div className={`step-indicator ${step >= 2 ? "active" : ""}`}>
                <div className="step-number">2</div>
                <span>Delivery Speed</span>
              </div>
              <div style={{ flex: 1, height: "2px", background: "var(--border-medium)", margin: "0 0.5rem" }}></div>
              <div className={`step-indicator ${step >= 3 ? "active" : ""}`}>
                <div className="step-number">3</div>
                <span>Payment</span>
              </div>
            </div>

            <form onSubmit={handleNextStep}>
              {/* Step 1: Address Form */}
              {step === 1 && (
                <div className="checkout-form-grid">
                  <div className="form-field-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group">
                    <label>Mobile Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group form-full-col">
                    <label>Email Address (For Order Tracking) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group form-full-col">
                    <label>Street Address / Flat / Building *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field-group form-full-col">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Options */}
              {step === 2 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1rem", color: "var(--color-primary-900)", marginBottom: "1rem" }}>
                    Select Preferred Delivery Timeline:
                  </h4>
                  <div className="payment-method-selector">
                    <label className={`payment-option-card ${formData.deliverySpeed === "express" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="deliverySpeed"
                        value="express"
                        checked={formData.deliverySpeed === "express"}
                        onChange={handleChange}
                        style={{ width: "auto" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: "var(--color-primary-900)" }}>
                          🚀 BlueDart Air Express (Next Day / 24-48 Hours)
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-slate-500)" }}>
                          Direct air cargo dispatch from Rajahmundry hub with temperature-safe packing.
                        </div>
                      </div>
                      <span style={{ fontWeight: 700, color: "var(--color-emerald-700)" }}>Recommended</span>
                    </label>

                    <label className={`payment-option-card ${formData.deliverySpeed === "standard" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="deliverySpeed"
                        value="standard"
                        checked={formData.deliverySpeed === "standard"}
                        onChange={handleChange}
                        style={{ width: "auto" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: "var(--color-primary-900)" }}>
                          📦 Standard Ground Courier (3 - 5 Days)
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-slate-500)" }}>
                          Safe transport via DTDC Express surface logistics.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Options */}
              {step === 3 && (
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1rem", color: "var(--color-primary-900)", marginBottom: "1rem" }}>
                    Select Payment Method:
                  </h4>
                  <div className="payment-method-selector">
                    <label className={`payment-option-card ${formData.paymentMethod.startsWith("UPI") ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI (Google Pay / PhonePe)"
                        checked={formData.paymentMethod.startsWith("UPI")}
                        onChange={handleChange}
                        style={{ width: "auto" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>Instant UPI / QR Code (Google Pay, PhonePe, Paytm)</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-slate-500)" }}>Zero transaction fee • Instant order confirmation</div>
                      </div>
                      <i className="fa-solid fa-qrcode" style={{ fontSize: "1.3rem", color: "var(--color-primary-800)" }}></i>
                    </label>

                    {formData.paymentMethod.startsWith("UPI") && (
                      <div className="qr-code-box">
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary-900)" }}>
                          Scan with any UPI App or click Complete Order:
                        </div>
                        <div className="upi-scan-qr">
                          <svg viewBox="0 0 100 100" width="100%" height="100%">
                            <rect width="100" height="100" fill="#ffffff" />
                            {/* Decorative QR Representation */}
                            <rect x="10" y="10" width="30" height="30" fill="#0f172a" />
                            <rect x="15" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="20" y="20" width="10" height="10" fill="#0f172a" />
                            <rect x="60" y="10" width="30" height="30" fill="#0f172a" />
                            <rect x="65" y="15" width="20" height="20" fill="#ffffff" />
                            <rect x="70" y="20" width="10" height="10" fill="#0f172a" />
                            <rect x="10" y="60" width="30" height="30" fill="#0f172a" />
                            <rect x="15" y="65" width="20" height="20" fill="#ffffff" />
                            <rect x="20" y="70" width="10" height="10" fill="#0f172a" />
                            <circle cx="50" cy="50" r="8" fill="#d97706" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "var(--color-slate-500)" }}>
                          UPI ID: <strong>ballasfoods@upi</strong>
                        </span>
                      </div>
                    )}

                    <label className={`payment-option-card ${formData.paymentMethod === "Credit / Debit Card" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit / Debit Card"
                        checked={formData.paymentMethod === "Credit / Debit Card"}
                        onChange={handleChange}
                        style={{ width: "auto" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>Credit / Debit Card (Visa, Mastercard, RuPay)</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-slate-500)" }}>Secure 3D OTP Verification</div>
                      </div>
                      <i className="fa-regular fa-credit-card" style={{ fontSize: "1.3rem", color: "var(--color-slate-700)" }}></i>
                    </label>

                    <label className={`payment-option-card ${formData.paymentMethod === "Cash on Delivery" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={formData.paymentMethod === "Cash on Delivery"}
                        onChange={handleChange}
                        style={{ width: "auto" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>Cash on Delivery (COD)</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-slate-500)" }}>Pay with cash or UPI at the doorstep upon arrival</div>
                      </div>
                      <i className="fa-solid fa-hand-holding-dollar" style={{ fontSize: "1.3rem", color: "var(--color-slate-700)" }}></i>
                    </label>
                  </div>
                </div>
              )}

              {/* Modal Step Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-medium)", paddingTop: "1.25rem" }}>
                {step > 1 ? (
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setStep(prev => prev - 1)}
                  >
                    Back
                  </button>
                ) : <div></div>}

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>Total Amount:</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary-900)" }}>
                      {formatPrice(finalTotal)}
                    </div>
                  </div>

                  <button type="submit" className="btn-gold">
                    {step === 3 ? (
                      <>
                        <i className="fa-solid fa-circle-check"></i> Complete Order
                      </>
                    ) : (
                      <>
                        Continue <i className="fa-solid fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          /* Order Confirmation View */
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "var(--color-emerald-100)",
                color: "var(--color-emerald-700)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.2rem",
                margin: "0 auto 1.25rem"
              }}
            >
              <i className="fa-solid fa-check"></i>
            </div>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--color-primary-900)", marginBottom: "0.4rem" }}>
              Order Confirmed!
            </h3>
            <p style={{ color: "var(--color-slate-600)", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
              Thank you, <strong>{orderComplete.customerName}</strong>. Your authentic sweets are being freshly prepared!
            </p>

            <div
              style={{
                background: "var(--color-slate-50)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                maxWidth: "420px",
                margin: "0 auto 1.5rem",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                <span>Order ID:</span>
                <strong>{orderComplete.id}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                <span>Tracking Number:</span>
                <strong style={{ color: "var(--color-primary-800)" }}>{orderComplete.trackingNumber}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span>Paid via:</span>
                <strong>{orderComplete.paymentMethod}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                className="btn-gold"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setActiveView("dashboard");
                }}
              >
                <i className="fa-solid fa-truck-ramp-box"></i> View Live Tracking
              </button>
              <button
                className="btn-outline"
                onClick={() => setIsCheckoutOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

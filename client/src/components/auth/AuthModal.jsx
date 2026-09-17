import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast, quickSwitchRole } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      const newUser = {
        id: `usr-${Date.now()}`,
        name: name || "Heritage Patron",
        email,
        phone: phone || "+91 90000 12345",
        role: "customer"
      };
      setUser(newUser);
      showToast(`Welcome to Balla's Heritage Confectionery, ${newUser.name}!`);
      setIsAuthOpen(false);
    } else {
      if (email.toLowerCase().includes("admin")) {
        quickSwitchRole("admin");
      } else {
        quickSwitchRole("customer");
      }
      setIsAuthOpen(false);
    }
  };

  const handleLogout = () => {
    setUser({
      id: "usr-guest",
      name: "Guest Visitor",
      email: "guest@example.com",
      role: "customer",
      phone: ""
    });
    showToast("Signed out successfully.");
    setIsAuthOpen(false);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsAuthOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="checkout-modal-card"
        style={{ maxWidth: "460px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsAuthOpen(false)}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div className="brand-crest-icon" style={{ margin: "0 auto 0.75rem", width: "50px", height: "50px" }}>
            <i className="fa-solid fa-om"></i>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-primary-900)" }}>
            {user.id !== "usr-guest" ? "Account Overview" : (isRegister ? "Create Patron Account" : "Welcome Back")}
          </h2>
          <p style={{ fontSize: "0.82rem", color: "var(--color-slate-500)" }}>
            {user.id !== "usr-guest"
              ? `Currently signed in as ${user.name}`
              : "Access your express order history and saved delivery addresses."}
          </p>
        </div>

        {user.id !== "usr-guest" ? (
          <div>
            <div style={{ background: "var(--color-slate-50)", border: "1px solid var(--border-medium)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                Name: <strong>{user.name}</strong>
              </div>
              <div style={{ fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                Email: <strong>{user.email}</strong>
              </div>
              <div style={{ fontSize: "0.85rem" }}>
                Privilege: <span className="role-pill">{user.role.toUpperCase()}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                className="btn-outline"
                onClick={() => {
                  quickSwitchRole(user.role === "admin" ? "customer" : "admin");
                  setIsAuthOpen(false);
                }}
              >
                Switch to {user.role === "admin" ? "Customer Mode" : "Admin Mode"}
              </button>
              <button
                className="btn-primary"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="form-field-group" style={{ marginBottom: "0.75rem" }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-field-group" style={{ marginBottom: "0.75rem" }}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-field-group" style={{ marginBottom: "0.75rem" }}>
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field-group" style={{ marginBottom: "1.25rem" }}>
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: "100%", marginBottom: "1rem" }}>
              {isRegister ? "Register Account" : "Sign In"}
            </button>

            {/* Demo Quick Logins */}
            <div style={{ borderTop: "1px dashed var(--border-medium)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", textAlign: "center", marginBottom: "0.6rem" }}>
                ⚡ Quick Demo Login Switches:
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ flex: 1, fontSize: "0.75rem", padding: "0.4rem" }}
                  onClick={() => {
                    quickSwitchRole("customer");
                    setIsAuthOpen(false);
                  }}
                >
                  👤 Customer Demo
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  style={{ flex: 1, fontSize: "0.75rem", padding: "0.4rem" }}
                  onClick={() => {
                    quickSwitchRole("admin");
                    setIsAuthOpen(false);
                  }}
                >
                  👑 Admin Demo
                </button>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.82rem" }}>
              {isRegister ? "Already have an account?" : "New to Balla's?"}{" "}
              <button
                type="button"
                style={{ color: "var(--color-primary-800)", fontWeight: 700 }}
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Sign In here" : "Create Account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

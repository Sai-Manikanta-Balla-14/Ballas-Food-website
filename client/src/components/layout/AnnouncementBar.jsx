import React from "react";
import { useStore } from "../../context/StoreContext";

export const AnnouncementBar = () => {
  const { currency, toggleCurrency, user, quickSwitchRole } = useStore();

  return (
    <aside className="announcement-bar" aria-label="Official Store Announcements">
      <div className="container">
        <div className="announcement-inner">
          {/* Left Announcement Message */}
          <div className="announcement-left">
            <span className="announcement-badge">
              <i className="fa-solid fa-crown"></i>
              Balla's Exclusive
            </span>
            <span className="announcement-text">
              ✈️ <strong>Worldwide Express Air Shipping</strong> to USA, UK, UAE, Canada & Across India • 100% Pure Cow Ghee
            </span>
          </div>

          {/* Right Controls */}
          <div className="announcement-right">
            {/* Quick Demo Switcher */}
            <button
              onClick={() => quickSwitchRole(user.role === "admin" ? "customer" : "admin")}
              className="top-control-btn"
              title="Toggle between Customer and Store Admin mode"
            >
              <i className={user.role === "admin" ? "fa-solid fa-crown" : "fa-regular fa-user"}></i>
              <span>{user.role === "admin" ? "Role: Admin" : "Role: Customer"}</span>
            </button>

            {/* Currency Selector */}
            <button
              onClick={toggleCurrency}
              className="top-control-btn"
              title="Switch Currency between INR and USD"
            >
              <i className="fa-solid fa-globe"></i>
              <span>{currency === "INR" ? "₹ INR" : "$ USD"}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

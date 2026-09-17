import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export const DashboardView = () => {
  const {
    user,
    orders,
    products,
    updateOrderStatus,
    updateProductStock,
    formatPrice,
    setActiveView,
    quickSwitchRole,
    addToCart
  } = useStore();

  const [activeTab, setActiveTab] = useState("orders"); // orders | inventory | profile

  const isAdmin = user.role === "admin";

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed": return "confirmed";
      case "Cooking & Packing": return "cooking";
      case "Dispatched": return "dispatched";
      case "Delivered": return "delivered";
      default: return "confirmed";
    }
  };

  return (
    <div className="container dashboard-view-wrapper">
      {/* Top Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-role-badge">
            <i className={isAdmin ? "fa-solid fa-crown" : "fa-regular fa-user"}></i>
            {isAdmin ? "Executive Store Administrator" : "Customer Portal"}
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", marginTop: "0.4rem", color: "var(--color-primary-900)" }}>
            {isAdmin ? "Store Operations & Telemetry" : `Welcome back, ${user.name}`}
          </h1>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            className="btn-outline"
            onClick={() => quickSwitchRole(isAdmin ? "customer" : "admin")}
            style={{ fontSize: "0.85rem" }}
          >
            Switch to {isAdmin ? "Customer View" : "Admin View"}
          </button>
          <button
            className="btn-gold"
            onClick={() => setActiveView("storefront")}
            style={{ fontSize: "0.85rem" }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Storefront
          </button>
        </div>
      </div>

      {/* Admin KPI Telemetry Cards */}
      {isAdmin && (
        <div className="kpi-cards-grid">
          <div className="kpi-card">
            <div className="kpi-icon-wrap revenue">
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </div>
            <div>
              <div className="kpi-info-label">Total Gross Revenue</div>
              <div className="kpi-info-value">{formatPrice(428500)}</div>
              <div className="kpi-info-sub">↑ 18.4% this month</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap orders">
              <i className="fa-solid fa-boxes-packing"></i>
            </div>
            <div>
              <div className="kpi-info-label">Active Kitchen Orders</div>
              <div className="kpi-info-value">{orders.length}</div>
              <div className="kpi-info-sub">Dispatching in 24h</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap delivered">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <div className="kpi-info-label">Orders Delivered</div>
              <div className="kpi-info-value">1,860</div>
              <div className="kpi-info-sub">Global & Pan-India</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-icon-wrap satisfaction">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div>
              <div className="kpi-info-label">Customer Satisfaction</div>
              <div className="kpi-info-value">99.2%</div>
              <div className="kpi-info-sub">Verified 5-Star Reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`dash-tab-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <i className="fa-solid fa-list-check" style={{ marginRight: "0.4rem" }}></i>
          {isAdmin ? "All Customer Orders" : "My Order History & Live Tracking"}
        </button>

        {isAdmin && (
          <button
            className={`dash-tab-btn ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            <i className="fa-solid fa-warehouse" style={{ marginRight: "0.4rem" }}></i>
            Stock & Inventory Control
          </button>
        )}

        <button
          className={`dash-tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <i className="fa-solid fa-id-card" style={{ marginRight: "0.4rem" }}></i>
          Account Information
        </button>
      </div>

      {/* Tab: Orders (Admin Management & Customer Tracking) */}
      {activeTab === "orders" && (
        <div>
          {/* Customer Live Tracking Highlight Widget for first order */}
          {!isAdmin && orders.length > 0 && (
            <div className="dashboard-card-panel" style={{ background: "linear-gradient(to right, #fffdfa, #ffffff)", border: "1.5px solid var(--border-medium)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-gold-700)", textTransform: "uppercase" }}>
                    Live Order Tracker
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-primary-900)" }}>
                    Order #{orders[0].id} ({orders[0].trackingNumber})
                  </h3>
                </div>
                <span className={`status-badge ${getStatusClass(orders[0].orderStatus)}`}>
                  {orders[0].orderStatus}
                </span>
              </div>

              {/* Visual Delivery Stepper */}
              <div className="tracking-timeline">
                <div className={`timeline-step ${["Confirmed", "Cooking & Packing", "Dispatched", "Delivered"].includes(orders[0].orderStatus) ? "completed" : ""}`}>
                  <div className="step-node">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div className="step-label">Order Confirmed</div>
                </div>

                <div className={`timeline-step ${["Cooking & Packing", "Dispatched", "Delivered"].includes(orders[0].orderStatus) ? (orders[0].orderStatus === "Cooking & Packing" ? "current" : "completed") : ""}`}>
                  <div className="step-node">
                    <i className="fa-solid fa-fire-burner"></i>
                  </div>
                  <div className="step-label">Artisanal Preparation</div>
                </div>

                <div className={`timeline-step ${["Dispatched", "Delivered"].includes(orders[0].orderStatus) ? (orders[0].orderStatus === "Dispatched" ? "current" : "completed") : ""}`}>
                  <div className="step-node">
                    <i className="fa-solid fa-plane-departure"></i>
                  </div>
                  <div className="step-label">Air Cargo Dispatched</div>
                </div>

                <div className={`timeline-step ${orders[0].orderStatus === "Delivered" ? "completed" : ""}`}>
                  <div className="step-node">
                    <i className="fa-solid fa-house-chimney"></i>
                  </div>
                  <div className="step-label">Delivered Fresh</div>
                </div>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--color-slate-600)", background: "var(--color-gold-50)", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)" }}>
                <i className="fa-solid fa-location-dot" style={{ color: "var(--color-gold-700)", marginRight: "0.4rem" }}></i>
                Delivering to: <strong>{orders[0].shippingAddress}</strong>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="dashboard-card-panel">
            <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "var(--color-primary-900)" }}>
              {isAdmin ? "All Recent Customer Orders" : "Past Purchases"}
            </h3>

            <div className="table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    {isAdmin && <th>Customer</th>}
                    <th>Items Ordered</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    {isAdmin && <th>Admin Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                        <div style={{ fontSize: "0.72rem", color: "var(--color-slate-400)" }}>
                          {order.trackingNumber}
                        </div>
                      </td>
                      <td>{new Date(order.orderDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</td>
                      {isAdmin && (
                        <td>
                          <div>{order.customerName}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-slate-400)" }}>{order.phone}</div>
                        </td>
                      )}
                      <td>
                        {order.items.map((it, iIdx) => (
                          <div key={iIdx} style={{ fontSize: "0.82rem" }}>
                            {it.quantity}x {it.name} ({it.weight})
                          </div>
                        ))}
                      </td>
                      <td>
                        <strong>{formatPrice(order.total)}</strong>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", color: "var(--color-slate-600)" }}>{order.paymentMethod}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      {isAdmin && (
                        <td>
                          <select
                            className="status-select-dropdown"
                            value={order.orderStatus}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cooking & Packing">Cooking & Packing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Inventory Control (Admin Only) */}
      {isAdmin && activeTab === "inventory" && (
        <div className="dashboard-card-panel">
          <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "var(--color-primary-900)" }}>
            Real-Time Product Inventory & Kitchen Batches
          </h3>

          <div className="table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Origin</th>
                  <th>Category</th>
                  <th>Available Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                        />
                        <div>
                          <div style={{ fontWeight: 700 }}>{prod.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>{prod.teluguName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{prod.origin.split(",")[0]}</td>
                    <td>{prod.category}</td>
                    <td>
                      <strong>{prod.stock} units</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${prod.stock > 20 ? "delivered" : "cooking"}`}>
                        {prod.stock > 20 ? "In Stock" : "Low Stock"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-outline"
                        style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                        onClick={() => updateProductStock(prod.id, prod.stock + 25, true)}
                      >
                        + Add 25 Fresh Units
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === "profile" && (
        <div className="dashboard-card-panel" style={{ maxWidth: "600px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--color-primary-900)" }}>
            Profile & Authentication Credentials
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-field-group">
              <label>Full Name:</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="form-field-group">
              <label>Email Address:</label>
              <input type="email" value={user.email} readOnly />
            </div>
            <div className="form-field-group">
              <label>Role Privilege:</label>
              <input type="text" value={user.role.toUpperCase()} readOnly />
            </div>
            <div className="form-field-group">
              <label>Registered Phone:</label>
              <input type="text" value={user.phone} readOnly />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

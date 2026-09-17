import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { AdminProductModal } from "./AdminProductModal";

export const DashboardView = () => {
  const {
    user,
    orders,
    products,
    updateOrderStatus,
    updateProductStock,
    deleteProduct,
    setSelectedProductModal,
    formatPrice,
    setActiveView,
    quickSwitchRole,
    addToCart
  } = useStore();

  const [activeTab, setActiveTab] = useState("orders"); // orders | inventory | profile
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogCategory, setCatalogCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

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

      {/* Tab: Catalog & Inventory Control (Admin Only) */}
      {isAdmin && activeTab === "inventory" && (
        <div className="dashboard-card-panel">
          {/* Top Catalog Toolbar */}
          <div className="admin-catalog-toolbar">
            <div>
              <h3 style={{ fontSize: "1.3rem", color: "var(--color-primary-900)", marginBottom: "0.25rem", fontFamily: "var(--font-serif)" }}>
                Artisanal Catalog & Live Stock Operations
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-slate-600)", margin: 0 }}>
                Add new Telugu delicacies, update packaging photography, modify pricing & ingredients, or update batch stocks.
              </p>
            </div>

            <button
              className="btn-gold"
              onClick={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.25rem" }}
            >
              <i className="fa-solid fa-plus"></i>
              Add New Delicacy
            </button>
          </div>

          {/* Search and Filters Bar */}
          <div className="admin-filter-bar">
            {/* Search */}
            <div className="admin-search-wrap">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search catalog by name, Telugu script, origin..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
              />
              {catalogSearch && (
                <button className="search-clear-btn" onClick={() => setCatalogSearch("")}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-slate-600)" }}>Category:</span>
              <select
                className="status-select-dropdown"
                value={catalogCategory}
                onChange={(e) => setCatalogCategory(e.target.value)}
              >
                <option value="all">All Categories ({products.length})</option>
                <option value="sweets">Sweets & Mithai</option>
                <option value="hot-savories">Hot Savories</option>
                <option value="pickles-powders">Pickles & Pachallu</option>
                <option value="podis-masalas">Podis & Masalas</option>
                <option value="gift-hampers">Gift Hampers</option>
              </select>
            </div>

            {/* Stock Filter Chips */}
            <div className="stock-filter-chips">
              <button
                className={`stock-chip ${stockFilter === "all" ? "active" : ""}`}
                onClick={() => setStockFilter("all")}
              >
                All Stock
              </button>
              <button
                className={`stock-chip ${stockFilter === "in-stock" ? "active" : ""}`}
                onClick={() => setStockFilter("in-stock")}
              >
                In Stock (&gt;25)
              </button>
              <button
                className={`stock-chip ${stockFilter === "low-stock" ? "active" : ""}`}
                onClick={() => setStockFilter("low-stock")}
              >
                ⚠️ Low Stock (&le;25)
              </button>
              <button
                className={`stock-chip ${stockFilter === "out-of-stock" ? "active" : ""}`}
                onClick={() => setStockFilter("out-of-stock")}
              >
                🚫 Out of Stock
              </button>
            </div>
          </div>

          {/* Catalog Data Table */}
          <div className="table-responsive" style={{ marginTop: "1rem" }}>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Delicacy</th>
                  <th>Category & Origin</th>
                  <th>Packs & Prices</th>
                  <th>Live Stock</th>
                  <th>Availability</th>
                  <th style={{ textAlign: "right" }}>Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(prod => {
                    if (catalogCategory !== "all" && prod.category.toLowerCase() !== catalogCategory.toLowerCase()) {
                      return false;
                    }
                    const isOut = prod.stock === 0 || prod.variants?.every(v => !v.inStock);
                    const isLow = prod.stock > 0 && prod.stock <= 25;
                    const isIn = prod.stock > 25 && prod.variants?.some(v => v.inStock);

                    if (stockFilter === "in-stock" && !isIn) return false;
                    if (stockFilter === "low-stock" && !isLow) return false;
                    if (stockFilter === "out-of-stock" && !isOut) return false;

                    if (catalogSearch.trim()) {
                      const q = catalogSearch.toLowerCase();
                      return (
                        prod.name?.toLowerCase().includes(q) ||
                        prod.teluguName?.toLowerCase().includes(q) ||
                        prod.origin?.toLowerCase().includes(q) ||
                        prod.category?.toLowerCase().includes(q)
                      );
                    }
                    return true;
                  })
                  .map(prod => {
                    const isOutOfStock = prod.stock === 0 || prod.variants?.every(v => !v.inStock);
                    const isLowStock = prod.stock > 0 && prod.stock <= 25;

                    return (
                      <tr key={prod.id}>
                        {/* Delicacy Identity & Thumbnail */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                            <div 
                              className="admin-prod-thumb-wrap" 
                              onClick={() => { setProductToEdit(prod); setIsProductModalOpen(true); }}
                              title="Click to edit delicacy"
                            >
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="admin-prod-thumb"
                                onError={(e) => { e.target.src = "/images/tapeswaram_kaja.jpg"; }}
                              />
                              <span className="admin-thumb-hover-hint">
                                <i className="fa-solid fa-pen"></i>
                              </span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: "var(--color-primary-900)" }}>{prod.name}</div>
                              <div style={{ fontSize: "0.78rem", color: "var(--color-gold-800)", fontWeight: 600 }}>{prod.teluguName}</div>
                              {prod.badge && (
                                <span className="badge-tag" style={{ fontSize: "0.68rem", padding: "0.15rem 0.45rem", marginTop: "0.2rem", display: "inline-block" }}>
                                  {prod.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category & Origin */}
                        <td>
                          <div style={{ fontWeight: 600, textTransform: "capitalize", fontSize: "0.85rem" }}>
                            {prod.category?.replace("-", " ")}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", marginTop: "0.2rem" }}>
                            <i className="fa-solid fa-location-dot" style={{ color: "var(--color-gold-700)", marginRight: "0.3rem" }}></i>
                            {prod.origin?.split(",")[0]}
                          </div>
                        </td>

                        {/* Variants and Prices */}
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", fontSize: "0.8rem" }}>
                            {prod.variants?.slice(0, 2).map((v, vIdx) => (
                              <div key={vIdx} style={{ color: v.inStock ? "var(--color-slate-700)" : "var(--color-slate-400)" }}>
                                <strong>{v.weight}</strong>: {formatPrice(v.price)}{" "}
                                {v.originalPrice && <span style={{ textDecoration: "line-through", color: "var(--color-slate-400)", fontSize: "0.75rem" }}>{formatPrice(v.originalPrice)}</span>}
                              </div>
                            ))}
                            {prod.variants?.length > 2 && (
                              <span style={{ fontSize: "0.72rem", color: "var(--color-slate-500)" }}>
                                +{prod.variants.length - 2} more pack tiers
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock Controls */}
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <input
                              type="number"
                              min="0"
                              className="admin-stock-input"
                              value={prod.stock}
                              onChange={(e) => updateProductStock(prod.id, Math.max(0, parseInt(e.target.value) || 0), parseInt(e.target.value) > 0)}
                            />
                            <span style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>units</span>
                          </div>

                          {/* Quick Increments */}
                          <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.35rem" }}>
                            <button
                              className="btn-stock-quick"
                              onClick={() => updateProductStock(prod.id, Math.max(0, prod.stock - 10), prod.stock - 10 > 0)}
                              title="Decrease 10 units"
                            >
                              -10
                            </button>
                            <button
                              className="btn-stock-quick"
                              onClick={() => updateProductStock(prod.id, prod.stock + 10, true)}
                              title="Add 10 units"
                            >
                              +10
                            </button>
                            <button
                              className="btn-stock-quick btn-stock-highlight"
                              onClick={() => updateProductStock(prod.id, prod.stock + 25, true)}
                              title="Add fresh batch of 25 units"
                            >
                              +25
                            </button>
                          </div>
                        </td>

                        {/* Availability Status */}
                        <td>
                          <span className={`status-badge ${isOutOfStock ? "out-of-stock" : (isLowStock ? "cooking" : "delivered")}`}>
                            {isOutOfStock ? "Out of Stock" : (isLowStock ? "Low Stock" : "In Stock")}
                          </span>

                          <div style={{ marginTop: "0.4rem" }}>
                            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", cursor: "pointer", color: "var(--color-slate-600)" }}>
                              <input
                                type="checkbox"
                                checked={!isOutOfStock}
                                onChange={(e) => updateProductStock(prod.id, e.target.checked ? (prod.stock || 25) : 0, e.target.checked)}
                              />
                              Available
                            </label>
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                            {/* Preview on Storefront */}
                            <button
                              className="admin-action-icon-btn"
                              onClick={() => setSelectedProductModal(prod)}
                              title="Preview on storefront modal"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </button>

                            {/* Edit */}
                            <button
                              className="admin-action-icon-btn edit"
                              onClick={() => {
                                setProductToEdit(prod);
                                setIsProductModalOpen(true);
                              }}
                              title="Edit product details & images"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>

                            {/* Delete */}
                            <button
                              className="admin-action-icon-btn delete"
                              onClick={() => setDeleteConfirmProduct(prod)}
                              title="Remove delicacy from catalog"
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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

      {/* Admin Add/Edit Product Modal */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />

      {/* Delete Product Confirmation Modal */}
      {deleteConfirmProduct && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirmProduct(null)}>
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "480px", textAlign: "center", padding: "2rem" }}
          >
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fee2e2", color: "#dc2626", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1rem" }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-primary-900)", marginBottom: "0.5rem" }}>
              Remove Delicacy from Catalog?
            </h3>

            <p style={{ color: "var(--color-slate-600)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Are you sure you want to remove <strong>"{deleteConfirmProduct.name}"</strong>? This delicacy will immediately be hidden from the storefront and customer cart.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button 
                className="btn-outline" 
                onClick={() => setDeleteConfirmProduct(null)}
                style={{ padding: "0.65rem 1.5rem" }}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  deleteProduct(deleteConfirmProduct.id);
                  setDeleteConfirmProduct(null);
                }}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.65rem 1.5rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                <i className="fa-solid fa-trash-can" style={{ marginRight: "0.4rem" }}></i>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

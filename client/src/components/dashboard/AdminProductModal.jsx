import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";

const PRESET_IMAGES = [
  { label: "Tapeswaram Kaja", url: "/images/tapeswaram_kaja.jpg" },
  { label: "Bellam Pootharekulu", url: "/images/bellam_pootharekulu.jpg" },
  { label: "Bandar Laddu", url: "/images/bandar_laddu.jpg" },
  { label: "Andhra Avakaya", url: "/images/andhra_avakaya.jpg" },
  { label: "Gongura Pickle", url: "/images/gongura_pickle.jpg" },
  { label: "Murukku & Chegodilu", url: "/images/murukku_chegodilu.jpg" },
  { label: "Royal Gift Hamper", url: "/images/gift_hamper.jpg" }
];

export const AdminProductModal = ({ isOpen, onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useStore();
  const isEditing = Boolean(productToEdit);

  const [formData, setFormData] = useState({
    name: "",
    teluguName: "",
    category: "sweets",
    badge: "Heritage Signature",
    origin: "Tapeswaram, Andhra Pradesh",
    shortDesc: "",
    description: "",
    ingredients: "",
    image: "/images/tapeswaram_kaja.jpg",
    stock: 75,
    shelfLifeDays: 25,
    isVeg: true,
    isPureGhee: true,
    sweetness: 4,
    crispness: 4,
    gheeRichness: 4,
    spiceHeat: 0,
    sommelierPairing: ""
  });

  const [variants, setVariants] = useState([
    { weight: "250g", price: 180, originalPrice: 210, inStock: true, isPopular: false },
    { weight: "500g", price: 350, originalPrice: 400, inStock: true, isPopular: true },
    { weight: "1kg", price: 680, originalPrice: 780, inStock: true, isPopular: false }
  ]);

  const [customUrl, setCustomUrl] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        teluguName: productToEdit.teluguName || "",
        category: productToEdit.category || "sweets",
        badge: productToEdit.badge || "Heritage Signature",
        origin: productToEdit.origin || "Andhra Pradesh",
        shortDesc: productToEdit.shortDesc || "",
        description: productToEdit.description || "",
        ingredients: Array.isArray(productToEdit.ingredients) 
          ? productToEdit.ingredients.join(", ") 
          : (productToEdit.ingredients || ""),
        image: productToEdit.image || "/images/tapeswaram_kaja.jpg",
        stock: productToEdit.stock ?? 50,
        shelfLifeDays: productToEdit.shelfLifeDays || 25,
        isVeg: productToEdit.isVeg !== undefined ? productToEdit.isVeg : true,
        isPureGhee: productToEdit.isPureGhee !== undefined ? productToEdit.isPureGhee : true,
        sweetness: productToEdit.sensoryProfile?.sweetness ?? 3,
        crispness: productToEdit.sensoryProfile?.crispness ?? 3,
        gheeRichness: productToEdit.sensoryProfile?.gheeRichness ?? 3,
        spiceHeat: productToEdit.sensoryProfile?.spiceHeat ?? 0,
        sommelierPairing: productToEdit.sensoryProfile?.sommelierPairing || ""
      });

      if (productToEdit.variants && productToEdit.variants.length > 0) {
        setVariants(productToEdit.variants);
      }
    } else {
      // Reset defaults for add mode
      setFormData({
        name: "",
        teluguName: "",
        category: "sweets",
        badge: "Artisanal Fresh",
        origin: "East Godavari, Andhra Pradesh",
        shortDesc: "",
        description: "",
        ingredients: "Pure Cow Ghee, Gram Flour, Sugar, Cardamom",
        image: "/images/tapeswaram_kaja.jpg",
        stock: 60,
        shelfLifeDays: 25,
        isVeg: true,
        isPureGhee: true,
        sweetness: 4,
        crispness: 4,
        gheeRichness: 4,
        spiceHeat: 0,
        sommelierPairing: "Pairs delightfully with warm degree filter coffee"
      });
      setVariants([
        { weight: "250g", price: 180, originalPrice: 210, inStock: true, isPopular: false },
        { weight: "500g", price: 350, originalPrice: 400, inStock: true, isPopular: true },
        { weight: "1kg", price: 680, originalPrice: 780, inStock: true, isPopular: false }
      ]);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Image Upload handler (File -> Base64 Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Variant change
  const handleVariantChange = (index, field, value) => {
    setVariants(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === "price" || field === "originalPrice" ? Number(value) : (field === "inStock" || field === "isPopular" ? Boolean(value) : value)
      };
      return updated;
    });
  };

  const addVariantRow = () => {
    setVariants(prev => [
      ...prev,
      { weight: "250g", price: 200, originalPrice: 240, inStock: true, isPopular: false }
    ]);
  };

  const removeVariantRow = (index) => {
    if (variants.length <= 1) return;
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a Delicacy Name.");
      return;
    }

    const payload = {
      ...formData,
      stock: Number(formData.stock),
      shelfLifeDays: Number(formData.shelfLifeDays),
      ingredients: formData.ingredients.split(",").map(s => s.trim()).filter(Boolean),
      variants,
      sensoryProfile: {
        sweetness: Number(formData.sweetness),
        crispness: Number(formData.crispness),
        gheeRichness: Number(formData.gheeRichness),
        spiceHeat: Number(formData.spiceHeat),
        sommelierPairing: formData.sommelierPairing || "Enjoy fresh with family"
      }
    };

    if (isEditing) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container admin-product-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "880px", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: "1.5px solid var(--border-subtle)", paddingBottom: "1rem" }}>
          <div>
            <span className="dashboard-role-badge" style={{ marginBottom: "0.4rem" }}>
              <i className="fa-solid fa-gem"></i>
              {isEditing ? "Catalog Maintenance" : "New Artisanal Creation"}
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary-900)", fontSize: "1.5rem" }}>
              {isEditing ? `Edit: ${productToEdit.name}` : "Add New Delicacy to Balla's Heritage"}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.25rem" }}>
          
          {/* Section 1: Core Delicacy Identity */}
          <div className="admin-form-card">
            <h4 className="admin-section-title">
              <i className="fa-solid fa-signature"></i> 1. Delicacy Identity & Classification
            </h4>

            <div className="admin-form-grid-2">
              <div className="form-field-group">
                <label>Delicacy Name (English) *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Balla's Royal Kakinada Khaja"
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Regional Script Name (Telugu)</label>
                <input
                  type="text"
                  name="teluguName"
                  value={formData.teluguName}
                  onChange={handleInputChange}
                  placeholder="e.g. కాకినాడ గొట్టం కాజా"
                />
              </div>

              <div className="form-field-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="sweets">Sweets & Mithai (మిఠాయిలు)</option>
                  <option value="hot-savories">Hot Savories & Snacks (కారప్పూస, చేగోడీలు)</option>
                  <option value="pickles-powders">Pickles & Pachallu (ఆవకాయ, తొక్కులు)</option>
                  <option value="podis-masalas">Karam Podis & Masalas (పప్పుల పొడి, కారం)</option>
                  <option value="gift-hampers">Royal Gift Hampers (ఉత్సవ కానుకలు)</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>Artisanal Badge</label>
                <select name="badge" value={formData.badge} onChange={handleInputChange}>
                  <option value="Heritage Signature">Heritage Signature</option>
                  <option value="GI Tag Certified">GI Tag Certified</option>
                  <option value="Artisanal Fresh">Artisanal Fresh</option>
                  <option value="Chef's Special">Chef's Special</option>
                  <option value="Festival Limited Edition">Festival Limited Edition</option>
                  <option value="Best Seller">Best Seller</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>Geographical Origin / Estd.</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="e.g. Tapeswaram, East Godavari (Estd. 1939)"
                />
              </div>

              <div className="form-field-group">
                <label>Shelf Life (Days)</label>
                <input
                  type="number"
                  name="shelfLifeDays"
                  min="5"
                  max="180"
                  value={formData.shelfLifeDays}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={formData.isVeg}
                  onChange={handleInputChange}
                />
                <span className="badge-veg" style={{ width: "16px", height: "16px" }}></span>
                100% Pure Vegetarian
              </label>

              <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
                <input
                  type="checkbox"
                  name="isPureGhee"
                  checked={formData.isPureGhee}
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-droplet" style={{ color: "var(--color-gold-600)" }}></i>
                Made with 100% Desi Cow Ghee
              </label>
            </div>
          </div>

          {/* Section 2: Media & Image Management */}
          <div className="admin-form-card">
            <h4 className="admin-section-title">
              <i className="fa-solid fa-camera"></i> 2. Imagery & Culinary Presentation
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1.5rem", alignItems: "start" }}>
              {/* Preview Thumbnail */}
              <div style={{ textAlign: "center" }}>
                <div 
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "12px",
                    border: "2px solid var(--color-gold-400)",
                    overflow: "hidden",
                    background: "#fafafa",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  <img
                    src={formData.image || "/images/tapeswaram_kaja.jpg"}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "/images/tapeswaram_kaja.jpg"; }}
                  />
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", marginTop: "0.4rem", display: "block" }}>
                  Live Storefront Preview
                </span>
              </div>

              <div>
                {/* Preset Chips */}
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.4rem", display: "block" }}>
                  Option A: Choose from Balla's Heritage Photo Library
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: preset.url }))}
                      className={`preset-image-chip ${formData.image === preset.url ? "active" : ""}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom URL */}
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.4rem", display: "block" }}>
                  Option B: Custom Web Image URL
                </label>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://example.com/delicacy.jpg"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn-outline"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", whiteSpace: "nowrap" }}
                    onClick={() => {
                      if (customUrl) {
                        setFormData(prev => ({ ...prev, image: customUrl }));
                      }
                    }}
                  >
                    Apply URL
                  </button>
                </div>

                {/* File Upload from PC */}
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.4rem", display: "block" }}>
                  Option C: Upload Image from Computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Weight Variants */}
          <div className="admin-form-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <h4 className="admin-section-title" style={{ margin: 0 }}>
                <i className="fa-solid fa-tags"></i> 3. Pack Weights & Pricing Tiers
              </h4>
              <button
                type="button"
                className="btn-outline"
                style={{ padding: "0.3rem 0.75rem", fontSize: "0.8rem" }}
                onClick={addVariantRow}
              >
                <i className="fa-solid fa-plus"></i> Add Weight Tier
              </button>
            </div>

            <div className="table-responsive">
              <table className="admin-data-table" style={{ background: "white" }}>
                <thead>
                  <tr>
                    <th>Weight / Unit</th>
                    <th>Selling Price (₹)</th>
                    <th>MRP / Original Price (₹)</th>
                    <th>In Stock?</th>
                    <th>Best Value Tag?</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={variant.weight}
                          onChange={(e) => handleVariantChange(index, "weight", e.target.value)}
                          placeholder="e.g. 500g"
                          style={{ width: "110px" }}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                          placeholder="340"
                          style={{ width: "90px" }}
                          min="1"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={variant.originalPrice}
                          onChange={(e) => handleVariantChange(index, "originalPrice", e.target.value)}
                          placeholder="390"
                          style={{ width: "90px" }}
                          min="1"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={variant.inStock}
                          onChange={(e) => handleVariantChange(index, "inStock", e.target.checked)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={variant.isPopular}
                          onChange={(e) => handleVariantChange(index, "isPopular", e.target.checked)}
                        />
                      </td>
                      <td>
                        {variants.length > 1 && (
                          <button
                            type="button"
                            className="btn-icon-danger"
                            onClick={() => removeVariantRow(index)}
                            title="Remove tier"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="form-field-group" style={{ marginTop: "1rem", maxWidth: "250px" }}>
              <label>Initial Master Stock (Total Units) *</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Section 4: Sensory Radar & Pairings */}
          <div className="admin-form-card">
            <h4 className="admin-section-title">
              <i className="fa-solid fa-chart-pie"></i> 4. Sensory Radar Profile (1 to 5 Scale)
            </h4>

            <div className="admin-form-grid-2">
              <div className="sensory-slider-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label>Sweetness Level</label>
                  <strong style={{ color: "var(--color-gold-800)" }}>{formData.sweetness} / 5</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  name="sweetness"
                  value={formData.sweetness}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sensory-slider-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label>Crispness & Crunch</label>
                  <strong style={{ color: "var(--color-gold-800)" }}>{formData.crispness} / 5</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  name="crispness"
                  value={formData.crispness}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sensory-slider-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label>Ghee Richness</label>
                  <strong style={{ color: "var(--color-gold-800)" }}>{formData.gheeRichness} / 5</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  name="gheeRichness"
                  value={formData.gheeRichness}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sensory-slider-group">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <label>Spice Heat & Pungency</label>
                  <strong style={{ color: "var(--color-gold-800)" }}>{formData.spiceHeat} / 5</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  name="spiceHeat"
                  value={formData.spiceHeat}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-field-group" style={{ marginTop: "1rem" }}>
              <label>Sommelier Pairing Note</label>
              <input
                type="text"
                name="sommelierPairing"
                value={formData.sommelierPairing}
                onChange={handleInputChange}
                placeholder="e.g. Best savored with piping hot Madras degree filter coffee"
              />
            </div>
          </div>

          {/* Section 5: Story & Ingredients */}
          <div className="admin-form-card">
            <h4 className="admin-section-title">
              <i className="fa-solid fa-scroll"></i> 5. Culinary Story & Artisanal Ingredients
            </h4>

            <div className="form-field-group">
              <label>Short Tagline (Storefront Card)</label>
              <input
                type="text"
                name="shortDesc"
                value={formData.shortDesc}
                onChange={handleInputChange}
                placeholder="e.g. Crisp golden layers drenched in fragrant cardamom ghee syrup."
                required
              />
            </div>

            <div className="form-field-group">
              <label>Full Artisanal Heritage Story (Modal View)</label>
              <textarea
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Explain the time-honored preparation method, earthen kadai craftsmanship, and heritage origins..."
                required
              />
            </div>

            <div className="form-field-group">
              <label>Pure Ingredients (Comma-separated)</label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="Pure Desi Cow Ghee, Wheat Flour, Cardamom, Cane Sugar"
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "0.5rem" }}>
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-gold" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              <i className={isEditing ? "fa-solid fa-check" : "fa-solid fa-plus"} style={{ marginRight: "0.5rem" }}></i>
              {isEditing ? "Save Catalog Changes" : "Publish to Storefront"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const { products, selectedCategory, setSelectedCategory } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { id: "all", label: "All Delicacies", icon: "fa-utensils" },
    { id: "sweets", label: "Pure Ghee Sweets", icon: "fa-candy-cane" },
    { id: "pickles", label: "Traditional Pickles", icon: "fa-jar" },
    { id: "savouries", label: "Hot Savouries", icon: "fa-bowl-food" },
    { id: "hampers", label: "Gift Hampers", icon: "fa-gifts" }
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.teluguName.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="catalog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-pretitle">
            <i className="fa-solid fa-seedling"></i>
            <span>Pure Telugu Heritage</span>
          </div>
          <h2 className="section-title">Generational Culinary Treasures</h2>
          <p className="section-subtitle">
            Handcrafted with 100% pure cow ghee, unrefined country jaggery, and time-honored recipes untouched since 1939.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="catalog-controls">
          {/* Category Tabs */}
          <div className="category-tabs" role="tablist">
            {categories.map(cat => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search and Sort Bar */}
          <div className="search-and-sort">
            <div className="search-input-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search Kaja, Pootharekulu, Avakaya, Murukku..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">✨ Sort by: Featured & Heritage</option>
              <option value="rating">★ Highest Customer Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <i className="fa-solid fa-cookie-bite" style={{ fontSize: "3rem", color: "var(--color-gold-400)", marginBottom: "1rem" }}></i>
            <h3 style={{ fontSize: "1.3rem", color: "var(--color-primary-900)" }}>No delicacies found</h3>
            <p style={{ color: "var(--color-slate-500)", marginTop: "0.5rem" }}>
              Try adjusting your search terms or category selection.
            </p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

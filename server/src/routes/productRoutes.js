import express from "express";
import { initialProducts } from "../data/mockData.js";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
let products = [...initialProducts];

// GET /api/products
router.get("/", (req, res) => {
  const { category, search, sort } = req.query;
  let results = [...products];

  if (category && category !== "all") {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.teluguName.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q)
    );
  }

  if (sort === "price-low") {
    results.sort((a, b) => a.variants[0].price - b.variants[0].price);
  } else if (sort === "price-high") {
    results.sort((a, b) => b.variants[0].price - a.variants[0].price);
  } else if (sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  }

  return res.json({
    success: true,
    count: results.length,
    products: results
  });
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }
  return res.json({ success: true, product });
});

// POST /api/products (Admin - Add New Delicacy)
router.post("/", verifyToken, requireAdmin, (req, res) => {
  const {
    name,
    teluguName,
    category,
    badge,
    origin,
    shortDesc,
    description,
    ingredients,
    image,
    variants,
    sensoryProfile,
    shelfLifeDays,
    isVeg = true,
    isPureGhee = false,
    stock = 50
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: "Product name and category are required." });
  }

  // Create clean ID from name
  const generatedId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + `-${Date.now().toString(36).slice(-4)}`;

  const parsedVariants = Array.isArray(variants) && variants.length > 0 ? variants : [
    { weight: "250g", price: 199, originalPrice: 240, inStock: true },
    { weight: "500g", price: 380, originalPrice: 450, inStock: true, isPopular: true }
  ];

  const newProduct = {
    id: generatedId,
    name,
    teluguName: teluguName || name,
    category: category.toLowerCase(),
    badge: badge || "Artisanal Fresh",
    rating: 5.0,
    reviewCount: 1,
    isVeg: Boolean(isVeg),
    isPureGhee: Boolean(isPureGhee),
    shelfLifeDays: Number(shelfLifeDays) || 25,
    origin: origin || "Balla Heritage Kitchen, Andhra Pradesh",
    shortDesc: shortDesc || `Authentic handcrafted ${name}, prepared fresh daily.`,
    description: description || `Traditional Andhra recipe made with time-honored ingredients and artisan expertise.`,
    ingredients: Array.isArray(ingredients) ? ingredients : (ingredients ? ingredients.split(",").map(s => s.trim()) : ["Pure Ingredients"]),
    image: image || "/images/tapeswaram_kaja.jpg",
    variants: parsedVariants,
    nutritionalInfo: { calories: "360 kcal / 100g", protein: "4.5g", carbohydrates: "60g", fat: "12g" },
    sensoryProfile: {
      sweetness: Number(sensoryProfile?.sweetness) || 3,
      crispness: Number(sensoryProfile?.crispness) || 4,
      gheeRichness: Number(sensoryProfile?.gheeRichness) || 4,
      spiceHeat: Number(sensoryProfile?.spiceHeat) || 0,
      sommelierPairing: sensoryProfile?.sommelierPairing || "Best enjoyed fresh with family and celebration"
    },
    liveBatch: {
      batchId: `BAL-${Math.floor(1000 + Math.random() * 9000)}`,
      timeAgo: "Just now",
      craftsman: "Master Confectioner Balla Guild",
      temperature: "Prepared fresh in traditional kitchen"
    },
    stock: Number(stock) || 50
  };

  products.unshift(newProduct);

  return res.status(201).json({
    success: true,
    message: `"${name}" added successfully to the catalog!`,
    product: newProduct
  });
});

// PUT /api/products/:id (Admin - Full Update Delicacy)
router.put("/:id", verifyToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  const existing = products[index];
  const updates = req.body;

  const updatedProduct = {
    ...existing,
    ...updates,
    id: existing.id, // preserve ID
    ingredients: Array.isArray(updates.ingredients) 
      ? updates.ingredients 
      : (typeof updates.ingredients === "string" ? updates.ingredients.split(",").map(s => s.trim()) : existing.ingredients),
    variants: Array.isArray(updates.variants) ? updates.variants : existing.variants,
    sensoryProfile: {
      ...existing.sensoryProfile,
      ...(updates.sensoryProfile || {})
    }
  };

  products[index] = updatedProduct;

  return res.json({
    success: true,
    message: `"${updatedProduct.name}" updated successfully.`,
    product: updatedProduct
  });
});

// DELETE /api/products/:id (Admin - Remove Delicacy)
router.delete("/:id", verifyToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  const removed = products.splice(index, 1)[0];

  return res.json({
    success: true,
    message: `"${removed.name}" has been removed from the catalog.`,
    id: req.params.id
  });
});

// PATCH /api/products/:id/stock (Admin - Quick Stock & Status Update)
router.patch("/:id/stock", verifyToken, requireAdmin, (req, res) => {
  const { stock, delta, inStock } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  if (typeof stock === "number") {
    products[index].stock = Math.max(0, stock);
  } else if (typeof delta === "number") {
    products[index].stock = Math.max(0, products[index].stock + delta);
  }

  if (typeof inStock === "boolean") {
    products[index].variants = products[index].variants.map(v => ({ ...v, inStock }));
  } else if (products[index].stock === 0) {
    products[index].variants = products[index].variants.map(v => ({ ...v, inStock: false }));
  }

  return res.json({
    success: true,
    message: "Product inventory updated successfully.",
    product: products[index]
  });
});

export default router;

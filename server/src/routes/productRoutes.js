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

// PATCH /api/products/:id/stock (Admin)
router.patch("/:id/stock", verifyToken, requireAdmin, (req, res) => {
  const { stock, inStock } = req.body;
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Product not found." });
  }

  if (typeof stock === "number") {
    products[index].stock = stock;
  }
  if (typeof inStock === "boolean") {
    products[index].variants = products[index].variants.map(v => ({ ...v, inStock }));
  }

  return res.json({
    success: true,
    message: "Product inventory updated successfully.",
    product: products[index]
  });
});

export default router;

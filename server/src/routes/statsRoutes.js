import express from "express";
import { initialOrders, initialProducts, validCoupons } from "../data/mockData.js";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/stats (Admin Dashboard KPIs)
router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
  const totalRevenue = 428500;
  const activeOrdersCount = 14;
  const totalDelivered = 1860;
  const customerSatisfaction = "99.2%";

  return res.json({
    success: true,
    stats: {
      totalRevenue,
      activeOrdersCount,
      totalDelivered,
      customerSatisfaction,
      inventoryAlerts: 1, // e.g. Pootharekulu low stock
      recentGrowth: "+18.4% this month"
    }
  });
});

// POST /api/stats/validate-coupon
router.post("/validate-coupon", (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: "Coupon code is required." });
  }

  const upper = code.toUpperCase();
  const coupon = validCoupons[upper];

  if (!coupon) {
    return res.status(404).json({ success: false, message: "Invalid promo code." });
  }

  if (subtotal < (coupon.minOrder || 0)) {
    return res.status(400).json({
      success: false,
      message: `Code ${upper} requires a minimum cart subtotal of ₹${coupon.minOrder}.`
    });
  }

  let discountAmount = 0;
  if (coupon.discountPercent) {
    discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
  } else if (coupon.flatDiscount) {
    discountAmount = coupon.flatDiscount;
  }

  return res.json({
    success: true,
    message: `Coupon ${upper} applied successfully!`,
    discountAmount,
    coupon: {
      code: upper,
      description: coupon.desc
    }
  });
});

export default router;

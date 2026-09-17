import express from "express";
import { initialOrders, validCoupons } from "../data/mockData.js";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
let orders = [...initialOrders];

// POST /api/orders (Create Order)
router.post("/", (req, res) => {
  const { customerName, email, phone, shippingAddress, items, couponCode, paymentMethod } = req.body;

  if (!customerName || !email || !shippingAddress || !items || !items.length) {
    return res.status(400).json({ success: false, message: "Missing required order information." });
  }

  // Calculate Subtotal
  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.price * item.quantity);
  });

  // Calculate Discount if coupon provided
  let discount = 0;
  if (couponCode && validCoupons[couponCode.toUpperCase()]) {
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (subtotal >= (coupon.minOrder || 0)) {
      if (coupon.discountPercent) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      } else if (coupon.flatDiscount) {
        discount = coupon.flatDiscount;
      }
    }
  }

  // Free shipping above 499, else 50
  const shippingFee = subtotal >= 499 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const trackingNumber = `IND-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    id: orderId,
    customerName,
    email,
    phone: phone || "+91 90000 00000",
    shippingAddress,
    items,
    subtotal,
    discount,
    shippingFee,
    total,
    paymentMethod: paymentMethod || "UPI Express",
    paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
    orderStatus: "Confirmed",
    trackingNumber,
    orderDate: new Date().toISOString()
  };

  orders.unshift(newOrder);

  return res.status(201).json({
    success: true,
    message: "Your order has been placed successfully!",
    order: newOrder
  });
});

// GET /api/orders (Get orders, user or admin)
router.get("/", (req, res) => {
  const { email } = req.query;
  if (email) {
    const filtered = orders.filter(o => o.email.toLowerCase() === email.toLowerCase());
    return res.json({ success: true, count: filtered.length, orders: filtered });
  }
  return res.json({ success: true, count: orders.length, orders });
});

// GET /api/orders/:id (Order details / tracking)
router.get("/:id", (req, res) => {
  const order = orders.find(o => o.id === req.params.id || o.trackingNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found." });
  }
  return res.json({ success: true, order });
});

// PATCH /api/orders/:id/status (Admin)
router.patch("/:id/status", verifyToken, requireAdmin, (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Confirmed", "Cooking & Packing", "Dispatched", "Delivered", "Cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value." });
  }

  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found." });
  }

  order.orderStatus = status;
  return res.json({
    success: true,
    message: `Order ${order.id} status updated to ${status}.`,
    order
  });
});

export default router;

import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "../data/mockProducts.js";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("heritage_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return initialProducts;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("heritage_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [currency, setCurrency] = useState("INR"); // INR or USD
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("heritage_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.name || parsed.name.includes("Ananya") || parsed.name.includes("Rao")) {
          return {
            id: "usr-demo",
            name: "Sai Manikanta Balla",
            email: "customer@ballasdelicacies.com",
            role: "customer",
            phone: "+91 90000 00000"
          };
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return {
      id: "usr-demo",
      name: "Sai Manikanta Balla",
      email: "customer@ballasdelicacies.com",
      role: "customer",
      phone: "+91 90000 00000"
    };
  });

  // UI state modals
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeView, setActiveView] = useState("storefront"); // storefront | dashboard
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toasts, setToasts] = useState([]);

  // Orders state
  const [orders, setOrders] = useState([
    {
      id: "ORD-92841",
      customerName: "Sai Manikanta Balla",
      email: "customer@ballasdelicacies.com",
      phone: "+91 90000 00000",
      shippingAddress: "Flat 101, Balla Heritage Residency, Jubilee Hills, Hyderabad - 500033",
      items: [
        { id: "tapeswaram-kaja", name: "Balla's Original Tapeswaram Kaja", weight: "500g", quantity: 2, price: 340, image: "/images/tapeswaram_kaja.jpg" },
        { id: "bellam-pootharekulu", name: "Balla's Dry Fruit Bellam Pootharekulu", weight: "250g (6 rolls)", quantity: 1, price: 220, image: "/images/bellam_pootharekulu.jpg" }
      ],
      subtotal: 900,
      discount: 90,
      shippingFee: 0,
      total: 810,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Dispatched",
      trackingNumber: "DTDC-HYD-981244",
      orderDate: "2026-09-16T14:30:00Z"
    }
  ]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem("heritage_cart", JSON.stringify(cart));
  }, [cart]);

  // Sync products to local storage
  useEffect(() => {
    localStorage.setItem("heritage_products", JSON.stringify(products));
  }, [products]);

  // Sync user to local storage
  useEffect(() => {
    localStorage.setItem("heritage_user", JSON.stringify(user));
  }, [user]);

  // Fetch products from server on mount
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.products?.length) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // graceful offline fallback
      });
  }, []);

  // Toast helper
  const showToast = (message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Recalculate discount if cart changes
  useEffect(() => {
    if (activeCoupon) {
      if (activeCoupon.code === "FESTIVE10" && cartSubtotal >= 499) {
        setDiscountAmount(Math.round(cartSubtotal * 0.1));
      } else if (activeCoupon.code === "KAJA15" && cartSubtotal >= 899) {
        setDiscountAmount(Math.round(cartSubtotal * 0.15));
      } else {
        setActiveCoupon(null);
        setDiscountAmount(0);
      }
    }
  }, [cartSubtotal, activeCoupon]);

  const addToCart = (product, selectedVariant, quantity = 1) => {
    // Check live stock status from products state
    const liveProd = products.find(p => p.id === product.id) || product;
    const isOutOfStock = liveProd.stock === 0 || !selectedVariant.inStock;

    if (isOutOfStock) {
      showToast(`Sorry, "${product.name}" (${selectedVariant.weight}) is currently sold out.`, "error");
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.weight === selectedVariant.weight
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            weight: selectedVariant.weight,
            price: selectedVariant.price,
            originalPrice: selectedVariant.originalPrice,
            image: product.image,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${selectedVariant.weight}) to your cart!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, weight, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId && item.weight === weight) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, weight) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.weight === weight)));
    showToast("Item removed from cart.", "error");
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
    setDiscountAmount(0);
  };

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    if (upper === "FESTIVE10") {
      if (cartSubtotal < 499) {
        showToast("FESTIVE10 requires a minimum order of ₹499", "error");
        return false;
      }
      const disc = Math.round(cartSubtotal * 0.1);
      setActiveCoupon({ code: upper, desc: "10% Festive Discount" });
      setDiscountAmount(disc);
      showToast("Coupon FESTIVE10 applied! You saved 10%.");
      return true;
    } else if (upper === "KAJA15") {
      if (cartSubtotal < 899) {
        showToast("KAJA15 requires a minimum order of ₹899", "error");
        return false;
      }
      const disc = Math.round(cartSubtotal * 0.15);
      setActiveCoupon({ code: upper, desc: "15% Grand Celebration Discount" });
      setDiscountAmount(disc);
      showToast("Coupon KAJA15 applied! You saved 15%.");
      return true;
    } else {
      showToast("Invalid promo code. Try FESTIVE10 or KAJA15", "error");
      return false;
    }
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setDiscountAmount(0);
    showToast("Coupon removed.");
  };

  const toggleCurrency = () => {
    setCurrency(prev => (prev === "INR" ? "USD" : "INR"));
  };

  const formatPrice = (inrAmount) => {
    if (currency === "USD") {
      const usd = (inrAmount / 85).toFixed(2);
      return `$${usd}`;
    }
    return `₹${inrAmount.toLocaleString("en-IN")}`;
  };

  // Auth Quick Switcher for pair programming / testing
  const quickSwitchRole = (role) => {
    if (role === "admin") {
      setUser({
        id: "usr-admin-1",
        name: "Abhi Balla (Executive)",
        email: "admin@ballasdelicacies.com",
        role: "admin",
        phone: "+91 90000 11111"
      });
      showToast("Switched to Store Administrator Mode.");
    } else {
      setUser({
        id: "usr-cust-1",
        name: "Sai Manikanta Balla",
        email: "customer@ballasdelicacies.com",
        role: "customer",
        phone: "+91 90000 00000"
      });
      showToast("Switched to Customer Account Mode.");
    }
  };

  // Place order
  const placeOrder = (orderDetails) => {
    const shippingFee = cartSubtotal >= 499 ? 0 : 50;
    const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingCode = `IND-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      customerName: orderDetails.fullName,
      email: orderDetails.email,
      phone: orderDetails.phone,
      shippingAddress: `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.pincode}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      total: finalTotal,
      paymentMethod: orderDetails.paymentMethod,
      paymentStatus: orderDetails.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      orderStatus: "Confirmed",
      trackingNumber: trackingCode,
      orderDate: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`🎉 Order ${orderId} placed successfully!`);
    return newOrder;
  };

  // Admin inventory update
  const updateProductStock = (productId, newStock, inStock) => {
    const finalInStock = typeof inStock === "boolean" ? (inStock && newStock > 0) : (newStock > 0);

    // API dispatch
    fetch(`/api/products/${productId}/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-role": "admin"
      },
      body: JSON.stringify({ stock: newStock, inStock: finalInStock })
    }).catch(() => {});

    setProducts(prev => {
      return prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            stock: newStock,
            variants: p.variants.map(v => ({ ...v, inStock: finalInStock }))
          };
        }
        return p;
      });
    });
    showToast(`Inventory updated: ${newStock} units (${finalInStock ? "In Stock" : "Out of Stock"}).`);
  };

  // Admin Add Product
  const addProduct = async (productData) => {
    const generatedId = productData.id || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + `-${Date.now().toString(36).slice(-4)}`;
    
    const formattedProduct = {
      ...productData,
      id: generatedId,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      stock: Number(productData.stock) || 50,
      isVeg: productData.isVeg !== undefined ? Boolean(productData.isVeg) : true,
      isPureGhee: productData.isPureGhee !== undefined ? Boolean(productData.isPureGhee) : false,
      shelfLifeDays: Number(productData.shelfLifeDays) || 25,
      liveBatch: productData.liveBatch || {
        batchId: `BAL-${Math.floor(1000 + Math.random() * 9000)}`,
        timeAgo: "Just now",
        craftsman: "Master Confectioner Balla Guild",
        temperature: "Prepared fresh in traditional kitchen"
      }
    };

    // Try backend sync
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": "admin"
        },
        body: JSON.stringify(formattedProduct)
      });
    } catch {
      // offline fallback
    }

    setProducts(prev => [formattedProduct, ...prev]);
    showToast(`✨ "${formattedProduct.name}" added to the catalog!`);
    return formattedProduct;
  };

  // Admin Update Product
  const updateProduct = async (productId, updatedData) => {
    try {
      await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": "admin"
        },
        body: JSON.stringify(updatedData)
      });
    } catch {
      // offline fallback
    }

    setProducts(prev => {
      return prev.map(p => {
        if (p.id === productId) {
          return { ...p, ...updatedData };
        }
        return p;
      });
    });

    // Update cart item thumbnails/names if modified
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          name: updatedData.name || item.name,
          image: updatedData.image || item.image
        };
      }
      return item;
    }));

    showToast(`Delicacy "${updatedData.name || productId}" updated successfully.`);
  };

  // Admin Delete Product
  const deleteProduct = async (productId) => {
    const targetProduct = products.find(p => p.id === productId);
    const prodName = targetProduct ? targetProduct.name : "Item";

    try {
      await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "x-admin-role": "admin"
        }
      });
    } catch {
      // offline fallback
    }

    setProducts(prev => prev.filter(p => p.id !== productId));
    setCart(prev => prev.filter(p => p.id !== productId));

    if (selectedProductModal && selectedProductModal.id === productId) {
      setSelectedProductModal(null);
    }

    showToast(`"${prodName}" has been removed from catalog.`, "error");
  };

  // Admin order status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => {
      return prev.map(o => {
        if (o.id === orderId) {
          return { ...o, orderStatus: newStatus };
        }
        return o;
      });
    });
    showToast(`Order ${orderId} marked as ${newStatus}.`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartCount,
        cartSubtotal,
        currency,
        toggleCurrency,
        formatPrice,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        activeCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        user,
        setUser,
        quickSwitchRole,
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        toasts,
        showToast,
        orders,
        placeOrder,
        updateProductStock,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  return context || {
    products: [],
    cart: [],
    currency: "INR",
    cartCount: 0,
    cartSubtotal: 0,
    activeView: "storefront",
    selectedCategory: "all",
    setSelectedCategory: () => {},
    toasts: [],
    orders: [],
    user: { name: "Sai Manikanta Balla", email: "customer@ballasdelicacies.com", role: "customer" },
    formatPrice: (p) => `₹${p}`,
    showToast: () => {},
    quickSwitchRole: () => {},
    addToCart: () => {},
    setIsCartOpen: () => {},
    setIsCheckoutOpen: () => {},
    setSelectedProductModal: () => {},
    setIsAuthOpen: () => {},
    updateProductStock: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {}
  };
};

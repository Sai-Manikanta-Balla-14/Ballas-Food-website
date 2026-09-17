export const initialProducts = [
  {
    id: "tapeswaram-kaja",
    name: "Balla's Original Tapeswaram Kaja",
    teluguName: "బల్లా వారి తాపేశ్వరం కాజా",
    category: "sweets",
    badge: "Heritage Bestseller",
    rating: 4.9,
    reviewCount: 428,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 20,
    origin: "Tapeswaram, East Godavari (Since 1939)",
    shortDesc: "Juicy, flaky layers steeped in aromatic sugar syrup, made using the authentic 1939 generational recipe.",
    description: "The crown jewel of Andhra sweet-making. The Tapeswaram Kaja features dozens of paper-thin rolled golden wheat dough layers fried to perfection in pure desi cow ghee and immersed in cardamom-infused syrup. Crisp on the outside, bursting with rich syrup within.",
    ingredients: ["Fine Wheat Flour (Maida)", "Pure Cow Ghee", "Refined Cane Sugar", "Green Cardamom", "Nutmeg", "Water"],
    image: "/images/tapeswaram_kaja.jpg",
    variants: [
      { weight: "250g", price: 175, originalPrice: 200, inStock: true },
      { weight: "500g", price: 340, originalPrice: 390, inStock: true, isPopular: true },
      { weight: "1kg", price: 650, originalPrice: 750, inStock: true }
    ],
    nutritionalInfo: { calories: "380 kcal / 100g", protein: "4.8g", carbohydrates: "62g", fat: "14g" },
    stock: 150
  },
  {
    id: "bellam-pootharekulu",
    name: "Dry Fruit Bellam Pootharekulu",
    teluguName: "బెల్లం డ్రై ఫ్రూట్ పూతరేకులు",
    category: "sweets",
    badge: "GI Tag Certified",
    rating: 4.95,
    reviewCount: 386,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 30,
    origin: "Atreyapuram, Andhra Pradesh",
    shortDesc: "The world-famous 'Paper Sweet' folded with organic jaggery, pure cow ghee, and roasted cashews & almonds.",
    description: "Known globally as the paper sweet of Andhra Pradesh. Handcrafted by master artisans who spread thin rice batter onto heated inverted clay pots, then fold the ultra-fine translucent sheets with aromatic organic jaggery (bellam), pure country ghee, and crushed premium dry fruits.",
    ingredients: ["Jaya Rice Starch", "Organic Bellam (Jaggery)", "Pure Desi Cow Ghee", "Premium Cashews", "Almonds", "Pistachios", "Cardamom"],
    image: "/images/bellam_pootharekulu.jpg",
    variants: [
      { weight: "250g (6 rolls)", price: 220, originalPrice: 260, inStock: true },
      { weight: "500g (12 rolls)", price: 420, originalPrice: 490, inStock: true, isPopular: true },
      { weight: "1kg (24 rolls)", price: 820, originalPrice: 950, inStock: true }
    ],
    nutritionalInfo: { calories: "340 kcal / 100g", protein: "5.2g", carbohydrates: "65g", fat: "9g" },
    stock: 90
  },
  {
    id: "bandar-laddu",
    name: "Pure Ghee Bandar Laddu",
    teluguName: "బందరు లడ్డూ (తొక్కుడు లడ్డూ)",
    category: "sweets",
    badge: "Melt-In-Mouth",
    rating: 4.85,
    reviewCount: 294,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 25,
    origin: "Machilipatnam, Andhra Pradesh",
    shortDesc: "Silky, pounded gram flour confection blended with warm desi ghee and powdered sugar crystal magic.",
    description: "Also called Thokkudu Laddu, this historic recipe from Machilipatnam involves pounding fried besan ribbons to a velvet consistency before infusing with aromatic ghee and cardamoms. It dissolves instantly on the tongue.",
    ingredients: ["Bengal Gram Flour (Besan)", "Pure Cow Ghee", "Sugar", "Green Cardamom", "Cloves"],
    image: "/images/bandar_laddu.jpg",
    variants: [
      { weight: "250g", price: 160, originalPrice: 190, inStock: true },
      { weight: "500g", price: 310, originalPrice: 360, inStock: true, isPopular: true },
      { weight: "1kg", price: 599, originalPrice: 700, inStock: true }
    ],
    nutritionalInfo: { calories: "410 kcal / 100g", protein: "6.5g", carbohydrates: "58g", fat: "18g" },
    stock: 120
  },
  {
    id: "andhra-avakaya",
    name: "Grandmother's Special Mango Avakaya",
    teluguName: "ఆవకాయ పచ్చడి",
    category: "pickles",
    badge: "Traditional Recipe",
    rating: 4.9,
    reviewCount: 512,
    isVeg: true,
    isPureGhee: false,
    shelfLifeDays: 180,
    origin: "East Godavari Homeland",
    shortDesc: "Fiery, tangy raw country mango cubes marinated with stone-ground mustard, Guntur red chillies & cold-pressed sesame oil.",
    description: "An authentic culinary emotion. Prepared using hand-cut firm raw mango pieces, sun-cured with freshly pounded mustard seed powder, fiery Guntur chillies, garlic cloves, and fragrant cold-pressed gingelly (til) oil. Preserved traditionally without chemical preservatives.",
    ingredients: ["Raw Sour Mangoes", "Mustard Seed Powder (Aavapodi)", "Guntur Red Chilli Powder", "Sea Salt", "Cold-Pressed Sesame Oil", "Garlic", "Fenugreek Seeds"],
    image: "/images/andhra_avakaya.jpg",
    variants: [
      { weight: "250g", price: 140, originalPrice: 160, inStock: true },
      { weight: "500g", price: 270, originalPrice: 310, inStock: true, isPopular: true },
      { weight: "1kg (Bharani Jar)", price: 520, originalPrice: 600, inStock: true }
    ],
    nutritionalInfo: { calories: "185 kcal / 100g", protein: "2.1g", carbohydrates: "16g", fat: "12g" },
    stock: 200
  },
  {
    id: "gongura-pickle",
    name: "Authentic Andhra Gongura Pickle",
    teluguName: "గోంగూర పచ్చడి",
    category: "pickles",
    badge: "Pride of Andhra",
    rating: 4.92,
    reviewCount: 340,
    isVeg: true,
    isPureGhee: false,
    shelfLifeDays: 120,
    origin: "Guntur, Andhra Pradesh",
    shortDesc: "Tangy sorrel leaves slow-cooked to a deep paste with roasted spices, garlic, and seasoned red chillies.",
    description: "The revered sour herb of Telugu cuisine. Gongura (red sorrel leaves) are sorted, sun-dried, slow-cooked in earthenware, and tempered with mustard, cumin, dried red chillies, and garlic cloves.",
    ingredients: ["Fresh Red Sorrel (Gongura) Leaves", "Cold-Pressed Sesame Oil", "Red Chillies", "Garlic", "Salt", "Coriander Seeds", "Cumin"],
    image: "/images/gongura_pickle.jpg",
    variants: [
      { weight: "250g", price: 135, originalPrice: 155, inStock: true },
      { weight: "500g", price: 260, originalPrice: 299, inStock: true, isPopular: true },
      { weight: "1kg", price: 499, originalPrice: 580, inStock: true }
    ],
    nutritionalInfo: { calories: "160 kcal / 100g", protein: "2.8g", carbohydrates: "14g", fat: "10g" },
    stock: 140
  },
  {
    id: "andhra-murukku-mixture",
    name: "Special Butter Chegodilu & Murukku",
    teluguName: "చెగోడీలు & జంతికలు",
    category: "savouries",
    badge: "Ultra Crisp",
    rating: 4.88,
    reviewCount: 310,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 45,
    origin: "Traditional Godavari Kitchens",
    shortDesc: "Golden circular crunchy snacks made from spiced rice flour, cumin, white sesame, and fresh country butter.",
    description: "Ring-shaped savoury treats that deliver a satisfying crunch in every bite. Prepared with rice flour steamed and seasoned with cumin seeds, ajwain, sesame, and rich white butter, fried in pure groundnut oil to a glowing golden crisp.",
    ingredients: ["Rice Flour", "Fresh Country Butter", "White Sesame Seeds", "Cumin Seeds", "Ajwain", "Salt", "Cold Pressed Groundnut Oil"],
    image: "/images/murukku_chegodilu.jpg",
    variants: [
      { weight: "250g", price: 120, originalPrice: 140, inStock: true },
      { weight: "500g", price: 230, originalPrice: 270, inStock: true, isPopular: true },
      { weight: "1kg", price: 440, originalPrice: 510, inStock: true }
    ],
    nutritionalInfo: { calories: "420 kcal / 100g", protein: "5.0g", carbohydrates: "55g", fat: "20g" },
    stock: 180
  },
  {
    id: "heritage-gift-hamper",
    name: "Royal Heritage Festival Gift Box",
    teluguName: "రాయల్ హెరిటేజ్ స్వీట్ బాక్స్",
    category: "hampers",
    badge: "Luxury Gift Pack",
    rating: 5.0,
    reviewCount: 165,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 25,
    origin: "Curated Confectioner's Selection",
    shortDesc: "Curated assortment of Tapeswaram Kaja, Bellam Pootharekulu, Bandar Laddu, and Butter Chegodilu in an ornate gift box.",
    description: "Specially packaged for weddings, Diwali, Sankranti, and corporate gifting. Features an exquisite royal gold embossed tin with partition seals containing all four signature items of Andhra culinary legacy.",
    ingredients: ["Assorted Pure Ghee Sweets", "Dry Fruits", "Savouries"],
    image: "/images/gift_hamper.jpg",
    variants: [
      { weight: "1kg Assorted (4 Items)", price: 899, originalPrice: 1050, inStock: true, isPopular: true },
      { weight: "2kg Grand Royal Box", price: 1699, originalPrice: 1999, inStock: true }
    ],
    nutritionalInfo: { calories: "390 kcal / 100g", protein: "5.5g", carbohydrates: "60g", fat: "15g" },
    stock: 65
  }
];

export const initialOrders = [
  {
    id: "ORD-92841",
    customerName: "Ramesh Balla",
    email: "ramesh.balla@example.com",
    phone: "+91 90000 11111",
    shippingAddress: "Flat 101, Balla Residency, Jubilee Hills, Hyderabad - 500033",
    items: [
      { id: "tapeswaram-kaja", name: "Balla's Original Tapeswaram Kaja", weight: "500g", quantity: 2, price: 340 },
      { id: "bellam-pootharekulu", name: "Balla's Dry Fruit Bellam Pootharekulu", weight: "250g (6 rolls)", quantity: 1, price: 220 }
    ],
    subtotal: 900,
    discount: 90,
    shippingFee: 0,
    total: 810,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Dispatched",
    trackingNumber: "BAL-EXP-981244",
    orderDate: "2026-09-16T14:30:00Z"
  },
  {
    id: "ORD-92842",
    customerName: "Sneha Varma",
    email: "sneha.varma@example.com",
    phone: "+91 90000 22222",
    shippingAddress: "Villa 12, Green Meadows, Bengaluru, KA - 560066",
    items: [
      { id: "andhra-avakaya", name: "Balla's Grandmother's Mango Avakaya", weight: "1kg (Bharani Jar)", quantity: 1, price: 520 },
      { id: "heritage-gift-hamper", name: "Balla's Royal Heritage Luxury Box", weight: "1kg Assorted (4 Items)", quantity: 1, price: 899 }
    ],
    subtotal: 1419,
    discount: 142,
    shippingFee: 0,
    total: 1277,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    orderStatus: "Cooking & Packing",
    trackingNumber: "BAL-AIR-882190",
    orderDate: "2026-09-17T09:15:00Z"
  }
];

export const validCoupons = {
  "FESTIVE10": { discountPercent: 10, minOrder: 499, desc: "10% off on all orders above ₹499" },
  "KAJA15": { discountPercent: 15, minOrder: 899, desc: "15% off on orders above ₹899" },
  "WELCOME50": { flatDiscount: 50, minOrder: 399, desc: "Flat ₹50 off on first order" }
};

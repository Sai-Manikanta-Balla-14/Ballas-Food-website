export const initialProducts = [
  {
    id: "tapeswaram-kaja",
    name: "Balla's Original Tapeswaram Kaja",
    teluguName: "బల్లా వారి తాపేశ్వరం కాజా",
    category: "sweets",
    badge: "Heritage Signature",
    rating: 4.95,
    reviewCount: 486,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 20,
    origin: "Tapeswaram, East Godavari (Estd. 1939)",
    shortDesc: "Juicy, flaky layers steeped in aromatic cardamom sugar syrup, fried in 100% pure cow ghee.",
    description: "The crown jewel of Balla's confectionery. Features dozens of paper-thin rolled golden wheat dough layers fried to perfection in pure desi cow ghee and immersed in green cardamom-infused syrup. Crisp on the outside, bursting with rich syrup within.",
    ingredients: ["Fine Wheat Flour (Maida)", "Pure Desi Cow Ghee", "Refined Cane Sugar", "Green Cardamom", "Nutmeg", "Water"],
    image: "/images/tapeswaram_kaja.jpg",
    variants: [
      { weight: "250g", price: 175, originalPrice: 200, inStock: true },
      { weight: "500g", price: 340, originalPrice: 390, inStock: true, isPopular: true },
      { weight: "1kg", price: 650, originalPrice: 750, inStock: true }
    ],
    nutritionalInfo: { calories: "380 kcal / 100g", protein: "4.8g", carbohydrates: "62g", fat: "14g" },
    sensoryProfile: {
      sweetness: 4,
      crispness: 5,
      gheeRichness: 5,
      spiceHeat: 0,
      sommelierPairing: "Pairs exquisitely with hot South Indian Degree Filter Coffee"
    },
    liveBatch: {
      batchId: "BAL-9042",
      timeAgo: "2 hours ago",
      craftsman: "Master Confectioner Shri Satyanarayana Balla",
      temperature: "Simmered at 165°C in brass kadai"
    },
    stock: 150
  },
  {
    id: "bellam-pootharekulu",
    name: "Balla's Dry Fruit Bellam Pootharekulu",
    teluguName: "బెల్లం డ్రై ఫ్రూట్ పూతరేకులు",
    category: "sweets",
    badge: "GI Tag Certified",
    rating: 4.98,
    reviewCount: 412,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 30,
    origin: "Atreyapuram, Andhra Pradesh",
    shortDesc: "The world-famous 'Paper Sweet' folded with organic palm jaggery, pure cow ghee, and roasted cashews & almonds.",
    description: "Known globally as the paper sweet of Andhra Pradesh. Handcrafted by master artisans who spread thin rice batter onto heated inverted clay pots, then fold the ultra-fine translucent sheets with aromatic organic jaggery (bellam), pure country ghee, and crushed premium dry fruits.",
    ingredients: ["Jaya Rice Starch", "Organic Bellam (Jaggery)", "Pure Desi Cow Ghee", "Premium Cashews", "Almonds", "Pistachios", "Cardamom"],
    image: "/images/bellam_pootharekulu.jpg",
    variants: [
      { weight: "250g (6 rolls)", price: 220, originalPrice: 260, inStock: true },
      { weight: "500g (12 rolls)", price: 420, originalPrice: 490, inStock: true, isPopular: true },
      { weight: "1kg (24 rolls)", price: 820, originalPrice: 950, inStock: true }
    ],
    nutritionalInfo: { calories: "340 kcal / 100g", protein: "5.2g", carbohydrates: "65g", fat: "9g" },
    sensoryProfile: {
      sweetness: 3,
      crispness: 4,
      gheeRichness: 5,
      spiceHeat: 0,
      sommelierPairing: "Best enjoyed gently warmed, served alongside saffron badam milk"
    },
    liveBatch: {
      batchId: "BAL-8819",
      timeAgo: "3 hours ago",
      craftsman: "Atreyapuram Master Artisan Guild",
      temperature: "Hand-folded on earthen clay pots"
    },
    stock: 90
  },
  {
    id: "bandar-laddu",
    name: "Balla's Velvet Bandar Laddu",
    teluguName: "బందరు తొక్కుడు లడ్డూ",
    category: "sweets",
    badge: "Melt-In-Mouth",
    rating: 4.9,
    reviewCount: 320,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 25,
    origin: "Machilipatnam Homeland",
    shortDesc: "Silky, pounded gram flour confection blended with warm desi ghee and cardamom crystal essence.",
    description: "Also called Thokkudu Laddu, this historic recipe involves pounding fried besan ribbons to velvet consistency before infusing with aromatic cow ghee and cardamoms. It dissolves instantly upon the tongue.",
    ingredients: ["Bengal Gram Flour (Besan)", "Pure Cow Ghee", "Sugar", "Green Cardamom", "Cloves"],
    image: "/images/bandar_laddu.jpg",
    variants: [
      { weight: "250g", price: 160, originalPrice: 190, inStock: true },
      { weight: "500g", price: 310, originalPrice: 360, inStock: true, isPopular: true },
      { weight: "1kg", price: 599, originalPrice: 700, inStock: true }
    ],
    nutritionalInfo: { calories: "410 kcal / 100g", protein: "6.5g", carbohydrates: "58g", fat: "18g" },
    sensoryProfile: {
      sweetness: 4,
      crispness: 1,
      gheeRichness: 5,
      spiceHeat: 0,
      sommelierPairing: "Pairs delightfully with warm Masala Chai or roasted salted nuts"
    },
    liveBatch: {
      batchId: "BAL-9071",
      timeAgo: "4 hours ago",
      craftsman: "Senior Sweetmaker K. Nagesh Balla",
      temperature: "Slow roasted in cast iron cauldrons"
    },
    stock: 120
  },
  {
    id: "andhra-avakaya",
    name: "Balla's Grandmother's Mango Avakaya",
    teluguName: "బామ్మ గారి ఆవకాయ పచ్చడి",
    category: "pickles",
    badge: "Ceramic Bharani Pack",
    rating: 4.96,
    reviewCount: 560,
    isVeg: true,
    isPureGhee: false,
    shelfLifeDays: 180,
    origin: "East Godavari Homeland",
    shortDesc: "Fiery, tangy raw country mango cubes marinated with stone-ground mustard & cold-pressed sesame oil.",
    description: "An authentic culinary emotion. Prepared using hand-cut firm raw mango pieces, sun-cured with freshly pounded mustard seed powder, fiery Guntur chillies, garlic cloves, and fragrant cold-pressed sesame oil. Packed in a traditional ceramic bharani jar.",
    ingredients: ["Raw Sour Mangoes", "Mustard Seed Powder (Aavapodi)", "Guntur Red Chilli Powder", "Sea Salt", "Cold-Pressed Sesame Oil", "Garlic", "Fenugreek Seeds"],
    image: "/images/andhra_avakaya.jpg",
    variants: [
      { weight: "250g", price: 140, originalPrice: 160, inStock: true },
      { weight: "500g", price: 270, originalPrice: 310, inStock: true, isPopular: true },
      { weight: "1kg (Bharani Jar)", price: 520, originalPrice: 600, inStock: true }
    ],
    nutritionalInfo: { calories: "185 kcal / 100g", protein: "2.1g", carbohydrates: "16g", fat: "12g" },
    sensoryProfile: {
      sweetness: 0,
      crispness: 4,
      gheeRichness: 0,
      spiceHeat: 5,
      sommelierPairing: "Steaming hot Sona Masoori rice with a generous spoon of Balla's pure cow ghee"
    },
    liveBatch: {
      batchId: "BAL-7740",
      timeAgo: "Freshly Cured",
      craftsman: "Godavari Matriarch Heritage Cellar",
      temperature: "Sun-ripened under natural Godavari heat"
    },
    stock: 200
  },
  {
    id: "andhra-murukku-mixture",
    name: "Balla's Crisp Butter Chegodilu & Murukku",
    teluguName: "వెన్న చెగోడీలు & జంతికలు",
    category: "savouries",
    badge: "Ultra Crunch",
    rating: 4.9,
    reviewCount: 340,
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
    sensoryProfile: {
      sweetness: 0,
      crispness: 5,
      gheeRichness: 4,
      spiceHeat: 2,
      sommelierPairing: "The ultimate afternoon companion for rain or evening tea sessions"
    },
    liveBatch: {
      batchId: "BAL-9055",
      timeAgo: "1 hour ago",
      craftsman: "Balla's Snack Kitchen Team",
      temperature: "Fried crisp at 180°C in pure groundnut oil"
    },
    stock: 180
  },
  {
    id: "heritage-gift-hamper",
    name: "Balla's Royal Heritage Luxury Box",
    teluguName: "రాయల్ హెరిటేజ్ స్వీట్ బాక్స్",
    category: "hampers",
    badge: "Gold Foil Embossed",
    rating: 5.0,
    reviewCount: 195,
    isVeg: true,
    isPureGhee: true,
    shelfLifeDays: 25,
    origin: "Balla's Executive Confectionery",
    shortDesc: "Curated assortment of Tapeswaram Kaja, Bellam Pootharekulu, Bandar Laddu, and Butter Chegodilu in an ornate royal tin.",
    description: "Specially packaged for prestigious gifting, corporate events, and weddings. Features an exquisite royal gold embossed gift box with partition seals containing all four signature items of Andhra culinary legacy.",
    ingredients: ["Assorted Pure Ghee Sweets", "Dry Fruits", "Savouries"],
    image: "/images/gift_hamper.jpg",
    variants: [
      { weight: "1kg Assorted (4 Items)", price: 899, originalPrice: 1050, inStock: true, isPopular: true },
      { weight: "2kg Grand Royal Box", price: 1699, originalPrice: 1999, inStock: true }
    ],
    nutritionalInfo: { calories: "390 kcal / 100g", protein: "5.5g", carbohydrates: "60g", fat: "15g" },
    sensoryProfile: {
      sweetness: 4,
      crispness: 4,
      gheeRichness: 5,
      spiceHeat: 1,
      sommelierPairing: "The premier centerpiece for festive celebratory feasts"
    },
    liveBatch: {
      batchId: "BAL-ROYAL-10",
      timeAgo: "Handcrafted on demand",
      craftsman: "Executive Confectionery Studio",
      temperature: "Sealed in nitrogen freshness barrier"
    },
    stock: 65
  }
];

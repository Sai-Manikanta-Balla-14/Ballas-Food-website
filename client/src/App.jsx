import React, { useState } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSlider } from "./components/hero/HeroSlider";
import { ProductGrid } from "./components/catalog/ProductGrid";
import { TastingFlightBanner } from "./components/catalog/TastingFlightBanner";
import { CustomBoxBuilder } from "./components/customizer/CustomBoxBuilder";
import { ProductDetailModal } from "./components/product/ProductDetailModal";
import { CartDrawer } from "./components/cart/CartDrawer";
import { CheckoutModal } from "./components/checkout/CheckoutModal";
import { DashboardView } from "./components/dashboard/DashboardView";
import { AuthModal } from "./components/auth/AuthModal";
import { ToastContainer } from "./components/common/ToastContainer";
import { CorporateConciergeModal } from "./components/concierge/CorporateConciergeModal";
import { FloatingActionDock } from "./components/layout/FloatingActionDock";

const AppContent = () => {
  const { activeView } = useStore();
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Top Banner & Navigation */}
      <AnnouncementBar />
      <Navbar />

      {/* Main Content Body */}
      <main>
        {activeView === "dashboard" ? (
          <DashboardView />
        ) : (
          <>
            <HeroSlider />
            <TastingFlightBanner />
            <ProductGrid />
            <CustomBoxBuilder />
          </>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Floating Bottom Quick Action Dock */}
      {activeView === "storefront" && (
        <FloatingActionDock onOpenConcierge={() => setIsConciergeOpen(true)} />
      )}

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <CorporateConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { FloatingWhatsApp } from "../components/common/FloatingWhatsApp";
import { MobileBottomBar } from "../components/common/MobileBottomBar";

export const MainLayout = ({ children }) => {
  const location = useLocation();
  const { openAuthModal, user } = useAuth();

  useEffect(() => {
    if (location.state?.openLogin && !user) {
      openAuthModal("login");
    }
  }, [location.state, user, openAuthModal]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-amber-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24 pb-20 lg:pb-16">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
};

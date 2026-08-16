import React from "react";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { FloatingWhatsApp } from "../components/common/FloatingWhatsApp";
import { MobileBottomBar } from "../components/common/MobileBottomBar";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1A1418] flex flex-col selection:bg-amber-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24 pb-20 lg:pb-16">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
};

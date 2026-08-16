import React from "react";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { FloatingWhatsApp } from "../components/common/FloatingWhatsApp";
import { MobileBottomBar } from "../components/common/MobileBottomBar";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0b090e] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24 pb-20 lg:pb-16">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
};

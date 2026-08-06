import React from "react";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
};

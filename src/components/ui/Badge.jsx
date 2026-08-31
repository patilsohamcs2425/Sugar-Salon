import React from "react";

export const Badge = ({ children, variant = "gold", className = "" }) => {
  const variants = {
    gold: "bg-amber-50 text-amber-900 border border-amber-300/60 font-bold",
    pink: "bg-pink-50 text-pink-900 border border-pink-200 font-bold",
    purple: "bg-purple-50 text-purple-900 border border-purple-200 font-bold",
    emerald: "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold",
    slate: "bg-gray-100 text-gray-800 border border-gray-200 font-bold",
    dark: "bg-gray-900 text-white font-bold"
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-wider uppercase shadow-xs ${variants[variant] || variants.gold} ${className}`}
    >
      {children}
    </span>
  );
};

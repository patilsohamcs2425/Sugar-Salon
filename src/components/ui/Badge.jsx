import React from "react";

export const Badge = ({ children, variant = "pink", className = "" }) => {
  const variants = {
    pink: "bg-pink-500/10 text-pink-400 border border-pink-500/30",
    gold: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    purple: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
    slate: "bg-slate-800 text-slate-300 border border-slate-700"
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

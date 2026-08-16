import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-600/20 hover:shadow-amber-500/35 active:scale-95 border border-amber-400/50 font-bold",
    secondary:
      "bg-white hover:bg-amber-50/80 text-amber-900 border border-amber-500/30 hover:border-amber-400 active:scale-95 shadow-sm font-semibold",
    gold:
      "bg-gradient-to-r from-yellow-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95 border border-amber-300",
    outline:
      "bg-transparent text-amber-800 border border-amber-600/40 hover:border-amber-500 hover:text-amber-900 hover:bg-amber-50/60 active:scale-95 font-semibold",
    ghost: "bg-transparent text-slate-700 hover:text-amber-800 hover:bg-amber-500/10 font-semibold",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs min-h-[38px]",
    md: "px-6 py-2.5 text-sm min-h-[44px]",
    lg: "px-8 py-3.5 text-base min-h-[48px]"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

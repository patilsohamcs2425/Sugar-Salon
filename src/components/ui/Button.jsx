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
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 active:scale-95",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-pink-300 border border-pink-500/30 hover:border-pink-500/60 active:scale-95",
    gold:
      "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 active:scale-95",
    outline:
      "bg-transparent text-slate-200 border border-slate-700 hover:border-pink-500 hover:text-pink-400 active:scale-95",
    ghost: "bg-transparent text-slate-300 hover:text-pink-400 hover:bg-slate-800/60",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs tracking-wider",
    md: "px-6 py-2.5 text-sm tracking-wide",
    lg: "px-8 py-3.5 text-base tracking-wide"
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

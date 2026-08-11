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
      "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 border border-amber-300/40",
    secondary:
      "bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 hover:border-amber-400/60 active:scale-95 shadow-md",
    gold:
      "bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 active:scale-95",
    outline:
      "bg-transparent text-amber-200 border border-amber-500/40 hover:border-amber-400 hover:text-amber-300 hover:bg-amber-500/10 active:scale-95",
    ghost: "bg-transparent text-slate-300 hover:text-amber-300 hover:bg-amber-500/10",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
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

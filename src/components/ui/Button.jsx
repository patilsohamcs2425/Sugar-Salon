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
    "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-full focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/30 active:scale-95 border border-amber-400/40",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 active:scale-95 shadow-xs",
    gold:
      "bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-md shadow-amber-500/25 hover:shadow-lg active:scale-95 border border-amber-400",
    dark:
      "bg-gray-900 hover:bg-black text-white active:scale-95 shadow-md",
    outline:
      "bg-transparent text-amber-900 border border-amber-600/40 hover:border-amber-600 hover:bg-amber-50/60 active:scale-95",
    ghost:
      "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs min-h-[38px]",
    md: "px-6 py-2.5 text-sm min-h-[42px]",
    lg: "px-8 py-3.5 text-base min-h-[48px]"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

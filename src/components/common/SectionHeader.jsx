import React from "react";
import { Badge } from "../ui/Badge";

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = ""
}) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"} ${className}`}>
      {badge && (
        <div className="mb-3">
          <Badge variant="gold">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold font-serif-heading text-[#1A1418] tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#4A3E45] font-semibold text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

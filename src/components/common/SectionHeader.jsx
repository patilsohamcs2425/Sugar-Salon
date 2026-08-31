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
    <div className={`mb-10 sm:mb-12 ${centered ? "text-center" : "text-left"} ${className}`}>
      {badge && (
        <div className="mb-3">
          <Badge variant="gold">{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif-heading text-gray-900 tracking-tight mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 font-normal text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { GalleryCard } from "../../components/cards/GalleryCard";
import { MOCK_GALLERY } from "../../data/mockData";
import { SERVICE_CATEGORIES } from "../../constants";

export const GalleryPage = () => {
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered =
    selectedCat === "all"
      ? MOCK_GALLERY
      : MOCK_GALLERY.filter((item) => item.category === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-900 bg-white">
      <SectionHeader
        badge="Transformation Showcase"
        title="Before & After Beauty Results"
        subtitle="Explore real client results across sugar waxing smoothness, balayage hair color, and clinical facials."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCat === cat.id
                ? "bg-amber-600 text-white font-extrabold shadow-xs border border-amber-500"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-2xs"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

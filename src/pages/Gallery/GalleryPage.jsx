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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Transformation Showcase"
        title="Before & After Beauty Results"
        subtitle="Explore real client results across sugar waxing smoothness, balayage hair color, and hydrafacials."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCat === cat.id
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

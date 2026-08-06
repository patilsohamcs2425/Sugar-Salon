import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export const GalleryCard = ({ item }) => {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="glass-card rounded-3xl overflow-hidden group">
      <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setShowAfter(!showAfter)}>
        <img
          src={showAfter ? item.imageAfter : item.imageBefore}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="bg-slate-900/90 text-pink-300 text-xs px-3 py-1 rounded-full font-semibold border border-pink-500/30 backdrop-blur-md">
            {showAfter ? "AFTER GLOW" : "BEFORE"}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAfter(!showAfter);
          }}
          className="absolute bottom-4 right-4 bg-pink-500/90 hover:bg-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg transition-colors"
        >
          <Sparkles size={12} /> Click to view {showAfter ? "Before" : "After"}
        </button>
      </div>

      <div className="p-5">
        <h4 className="text-lg font-bold font-serif-heading text-slate-100 mb-1">
          {item.title}
        </h4>
        <p className="text-xs text-slate-400 mb-2">Styled by <span className="text-pink-400 font-medium">{item.stylist}</span></p>
        <p className="text-slate-300 text-xs leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

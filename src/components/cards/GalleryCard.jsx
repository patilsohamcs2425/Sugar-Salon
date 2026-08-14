import React from "react";

export const GalleryCard = ({ item }) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image || item.imageAfter}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <h4 className="text-lg font-bold font-serif-heading text-slate-100 mb-1">
          {item.title}
        </h4>
        <p className="text-slate-300 text-xs leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

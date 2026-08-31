import React from "react";

export const GalleryCard = ({ item }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden group border border-gray-200 shadow-2xs hover:shadow-lg transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={item.image || item.imageAfter}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="p-5 bg-white">
        <h4 className="text-lg font-bold font-serif-heading text-gray-900 mb-1">
          {item.title}
        </h4>
        <p className="text-gray-600 text-xs leading-relaxed font-normal">{item.description}</p>
      </div>
    </div>
  );
};

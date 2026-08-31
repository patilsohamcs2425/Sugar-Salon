import React from "react";
import { Star } from "lucide-react";

export const RatingStars = ({ rating = 5, reviewsCount, showValue = true, size = 15 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-500">
        {stars.map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-500"
                : star - rating < 1
                ? "fill-amber-300/50 text-amber-400"
                : "text-gray-300 fill-gray-100"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-extrabold text-gray-900">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount && (
        <span className="text-[11px] font-semibold text-gray-500">({reviewsCount})</span>
      )}
    </div>
  );
};

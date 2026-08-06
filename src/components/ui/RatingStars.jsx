import React from "react";
import { Star } from "lucide-react";

export const RatingStars = ({ rating = 5, reviewsCount, showValue = true, size = 16 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {stars.map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - rating < 1
                ? "fill-amber-400/50 text-amber-400"
                : "text-slate-600"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-slate-200">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount && (
        <span className="text-xs text-slate-400">({reviewsCount})</span>
      )}
    </div>
  );
};

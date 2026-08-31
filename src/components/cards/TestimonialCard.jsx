import React from "react";
import { CheckCircle, ExternalLink, Globe } from "lucide-react";
import { RatingStars } from "../ui/RatingStars";

export const TestimonialCard = ({ testimonial = {} }) => {
  const authorName = testimonial.author || "Guest";
  const commentText = testimonial.comment || "";
  const serviceText = testimonial.service || (testimonial.isGoogleReview ? "Google Verified Reviewer" : "Salon Guest");
  const ratingValue = testimonial.rating || 5;
  const dateText = testimonial.date || "Recently";

  // Initials for fallback avatar
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "G";

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col justify-between relative group hover:border-amber-300 hover:shadow-md transition-all duration-300 h-full border border-gray-200 shadow-2xs">
      <div>
        {/* Top Header: Star Rating + Source Badge */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <RatingStars rating={ratingValue} showValue={false} />

          {testimonial.isGoogleReview ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-800 shadow-2xs">
              <svg className="w-3 h-3 fill-current text-blue-600 shrink-0" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
              Google Review
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs">
              <Globe size={11} className="text-amber-700 shrink-0" />
              Website Review
            </span>
          )}
        </div>

        {/* Review Content */}
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic mb-4 font-normal">
          "{commentText}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          {testimonial.authorPhoto ? (
            <img
              src={testimonial.authorPhoto}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0">
              {initials}
            </div>
          )}

          <div>
            <div className="flex items-center gap-1">
              {testimonial.authorUrl ? (
                <a
                  href={testimonial.authorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-gray-900 hover:text-amber-800 flex items-center gap-1 transition-colors"
                >
                  {authorName} <ExternalLink size={10} className="text-gray-400" />
                </a>
              ) : (
                <h4 className="text-xs font-bold text-gray-900">{authorName}</h4>
              )}
              <CheckCircle size={12} className="text-amber-600 shrink-0" title="Verified Guest" />
            </div>
            <span className="text-[11px] text-gray-500 block truncate max-w-[150px] sm:max-w-[200px] font-medium">
              {serviceText}
            </span>
          </div>
        </div>

        <span className="text-[10px] text-gray-400 shrink-0 ml-2 font-medium">{dateText}</span>
      </div>
    </div>
  );
};

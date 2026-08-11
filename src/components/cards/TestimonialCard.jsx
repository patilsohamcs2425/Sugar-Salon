import React from "react";
import { Quote, CheckCircle } from "lucide-react";
import { RatingStars } from "../ui/RatingStars";

export const TestimonialCard = ({ testimonial = {} }) => {
  const authorName = testimonial.author || "Verified Guest";
  const commentText = testimonial.comment || "Wonderful experience at Sugar Salon!";
  const serviceText = testimonial.service || "Organic Sugar Waxing & Care";
  const ratingValue = testimonial.rating || 5;
  const dateText = testimonial.date || "Recently";

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between relative group">
      <Quote size={40} className="absolute top-6 right-6 text-pink-500/10 group-hover:text-pink-500/20 transition-colors" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <RatingStars rating={ratingValue} showValue={false} />
          {testimonial.isGoogleReview && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-700 text-amber-300">
              <svg className="w-3 h-3 fill-current text-blue-400" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
              Google Map Review
            </span>
          )}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
          "{commentText}"
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 text-pink-300 border border-pink-500/30 flex items-center justify-center font-bold text-xs uppercase tracking-wider shrink-0">
            {authorName.split(" ").map((n) => n[0]).join("").slice(0, 2) || "VG"}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-slate-100">{authorName}</h4>
              <CheckCircle size={14} className="text-pink-400" title="Verified Customer" />
            </div>
            <span className="text-xs text-slate-400">{serviceText}</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-500">{dateText}</span>
      </div>
    </div>
  );
};

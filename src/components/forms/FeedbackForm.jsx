import React, { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { addReview } from "../../services/appointmentService";

export const FeedbackForm = ({ onReviewAdded }) => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [service, setService] = useState("Signature Full Body Organic Sugar Waxing");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newReview = addReview({
      author,
      rating,
      service,
      comment,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Verified Guest"
    });

    setSubmitted(true);
    if (onReviewAdded) onReviewAdded(newReview);
  };

  if (submitted) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center border border-pink-500/30">
        <CheckCircle size={40} className="text-emerald-400 mx-auto mb-3" />
        <h4 className="text-xl font-bold font-serif-heading text-slate-100 mb-2">
          Thank You for Your Feedback!
        </h4>
        <p className="text-xs text-slate-400 mb-4">
          Your review helps us maintain the highest standards of luxury sugar care.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit Another Review
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 space-y-4 border border-slate-800">
      <h3 className="text-xl font-bold font-serif-heading text-slate-100 mb-1">
        Share Your Experience
      </h3>
      <p className="text-xs text-slate-400 mb-4">Loved your treatment? Leave a rating & review!</p>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Maria Sharapova"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Treatment Experienced</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">Star Rating</label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="p-1 cursor-pointer focus:outline-none"
            >
              <Star
                size={24}
                className={`${
                  star <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-600"
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-bold text-amber-300 ml-2">{rating} Stars</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Your Review *</label>
        <textarea
          required
          rows={3}
          placeholder="How did your skin feel? What did you love about your specialist?..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full">
        Submit Review
      </Button>
    </form>
  );
};

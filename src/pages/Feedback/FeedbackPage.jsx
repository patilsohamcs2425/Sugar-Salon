import React, { useState, useEffect } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { FeedbackForm } from "../../components/forms/FeedbackForm";
import { getReviews } from "../../services/appointmentService";
import { Star } from "lucide-react";

export const FeedbackPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const handleReviewAdded = (newReview) => {
    if (newReview && newReview.author) {
      setReviews((prev) => [newReview, ...prev.filter((r) => r && typeof r === "object" && r.author)]);
    } else {
      getReviews().then((data) => setReviews(data));
    }
  };

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : selectedFilter === "google"
      ? reviews.filter((r) => r.isGoogleReview)
      : reviews.filter((r) => r.rating === parseInt(selectedFilter));

  const filterLabels = {
    all: "All Reviews",
    google: "Google Maps",
    "5": "5 Stars",
    "4": "4 Stars",
    "3": "3 Stars"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Guest Feedback"
        title="Client Reviews & Testimonials"
        subtitle="Read real stories from our guests across Google Maps & Sugar Salon!"
      />

      {/* Stats Summary Bar */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/20 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
        <div>
          <span className="text-4xl font-extrabold text-amber-400 font-serif-heading">4.9 / 5.0</span>
          <div className="flex justify-center my-1 text-amber-400">
            <Star size={16} className="fill-amber-400" />
            <Star size={16} className="fill-amber-400" />
            <Star size={16} className="fill-amber-400" />
            <Star size={16} className="fill-amber-400" />
            <Star size={16} className="fill-amber-400" />
          </div>
          <p className="text-xs text-slate-400">Based on 500+ verified appointments & Google reviews</p>
        </div>

        <div className="h-12 w-px bg-amber-500/20 hidden md:block" />

        <div className="flex flex-wrap items-center justify-center gap-2">
          {["all", "google", "5", "4", "3"].map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setSelectedFilter(filterKey)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === filterKey
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300"
              }`}
            >
              {filterLabels[filterKey]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredReviews.map((fb) => (
            <TestimonialCard key={fb.id} testimonial={fb} />
          ))}
        </div>

        <div>
          <FeedbackForm onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </div>
  );
};

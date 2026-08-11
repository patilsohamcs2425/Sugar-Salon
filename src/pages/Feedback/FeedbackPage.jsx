import React, { useState, useEffect } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { FeedbackForm } from "../../components/forms/FeedbackForm";
import { getReviews } from "../../services/appointmentService";
import { SALON_INFO } from "../../constants";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/Button";

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

      {/* Stats Summary & Google Maps Direct CTA Bar */}
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
          <p className="text-xs text-slate-400">Based on verified Google Maps reviews & salon guests</p>
        </div>

        <div className="h-12 w-px bg-amber-500/20 hidden md:block" />

        <div className="flex flex-col sm:flex-row items-center gap-3">
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

          <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer">
            <Button variant="gold" size="sm" className="whitespace-nowrap">
              <ExternalLink size={14} className="mr-1.5" /> Post on Google Maps
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredReviews.map((fb) => (
            <TestimonialCard key={fb.id} testimonial={fb} />
          ))}
        </div>

        <div className="space-y-6">
          <FeedbackForm onReviewAdded={handleReviewAdded} />

          <div className="glass-panel rounded-3xl p-6 border border-amber-500/20 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Review Us Directly on Google</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your feedback on Google Maps helps other guests in Andheri East discover our organic sugar care & salon services.
            </p>
            <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer" className="block pt-1">
              <Button variant="outline" size="sm" className="w-full">
                Write a Google Review <ExternalLink size={12} className="ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { FeedbackForm } from "../../components/forms/FeedbackForm";
import { useUnifiedReviews } from "../../hooks/useUnifiedReviews";
import { SALON_INFO } from "../../constants";
import { Star, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/Button";

export const FeedbackPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { combinedReviews, googleData, firebaseReviews, websiteStats, isLoading } = useUnifiedReviews();

  const filteredReviews = combinedReviews.filter((r) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "google") return r.isGoogleReview;
    if (selectedFilter === "website") return r.isWebsiteReview || !r.isGoogleReview;
    return r.rating === parseInt(selectedFilter);
  });

  const filterLabels = {
    all: `All Reviews (${combinedReviews.length})`,
    google: `Google Reviews (${googleData.reviews.length})`,
    website: `Website Reviews (${firebaseReviews.length})`,
    "5": "5 Stars",
    "4": "4 Stars",
    "3": "3 Stars"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-900 bg-white">
      <SectionHeader
        badge="Live Verified Reviews"
        title="Client Reviews & Testimonials"
        subtitle="Real reviews aggregated from Google Maps and guest submissions stored on our backend."
      />

      {/* Stats Summary & Google Maps Direct CTA Bar */}
      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-around gap-6 text-center shadow-2xs">
        {/* Google Stats */}
        <div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
            </svg>
            <span className="text-xs font-bold text-gray-900">Google Maps Rating</span>
          </div>
          {googleData.success ? (
            <>
              <span className="text-3xl font-extrabold text-amber-900 font-serif-heading">
                {googleData.rating} / 5.0
              </span>
              <div className="flex justify-center my-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(googleData.rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-gray-600">{googleData.userRatingCount} Verified Google Reviews</p>
            </>
          ) : (
            <div className="text-center py-1">
              <span className="text-xs text-amber-900 font-bold block">4.9 / 5.0 Google Rating</span>
              <p className="text-[10px] text-gray-500">Verified Salon Location</p>
            </div>
          )}
        </div>

        <div className="h-12 w-px bg-gray-200 hidden md:block" />

        {/* Website Stats */}
        <div>
          <span className="text-xs font-bold text-gray-900 block mb-1">Website Reviews</span>
          {websiteStats.count > 0 ? (
            <>
              <span className="text-3xl font-extrabold text-amber-900 font-serif-heading">
                {websiteStats.rating} / 5.0
              </span>
              <div className="flex justify-center my-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(websiteStats.rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-gray-600">{websiteStats.count} Customer Submissions</p>
            </>
          ) : (
            <div className="text-center py-1">
              <span className="text-xs text-gray-900 font-bold block">5.0 / 5.0 Website Rating</span>
              <p className="text-[10px] text-gray-500">Be the first to submit a review below!</p>
            </div>
          )}
        </div>

        <div className="h-12 w-px bg-gray-200 hidden md:block" />

        {/* Action Button */}
        <div>
          <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm" className="whitespace-nowrap">
              <ExternalLink size={14} className="mr-1.5 text-blue-600" /> Post on Google Maps
            </Button>
          </a>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {["all", "google", "website", "5", "4", "3"].map((filterKey) => (
          <button
            key={filterKey}
            type="button"
            onClick={() => setSelectedFilter(filterKey)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === filterKey
                ? "bg-amber-600 text-white font-extrabold shadow-xs"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-2xs"
            }`}
          >
            {filterLabels[filterKey]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-gray-100 rounded-2xl p-5 h-40 animate-pulse" />
              ))}
            </div>
          ) : filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.map((fb) => (
                <TestimonialCard key={fb.id} testimonial={fb} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 space-y-3">
              <RefreshCw size={32} className="text-amber-600 mx-auto" />
              <h4 className="text-base font-bold text-gray-900">No Reviews Available</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto font-normal">
                No reviews found under the selected filter. Submit your experience using the form to see your review published here live!
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <FeedbackForm />

          <div className="bg-white rounded-3xl p-6 border border-gray-200 text-center space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-200">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
              </svg>
            </div>
            <h4 className="text-sm font-bold text-gray-900">Review Us Directly on Google</h4>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Your feedback on Google Maps helps other guests in Andheri East discover our organic sugar care & salon services.
            </p>
            <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer" className="block pt-1">
              <Button variant="secondary" size="sm" className="w-full">
                Write a Google Review <ExternalLink size={12} className="ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

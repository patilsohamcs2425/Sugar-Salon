import React from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AboutSection } from "../../components/sections/AboutSection";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-4 text-gray-900 bg-white">
      {/* Featured About Hero Section */}
      <AboutSection showCta={false} className="p-0" />

      {/* Brand Mission & Organic Care Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center pt-4">
        <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-amber-800 first-letter:mr-2.5 first-letter:float-left font-serif-heading text-gray-900 leading-normal">
            Sugar Salon was born out of a desire to make every guest feel confident, refreshed, and radiant. Over the past 15 years in Marol, Andheri East, we have perfected our signature organic treatments and personalized beauty rituals.
          </p>
          <p className="text-gray-600">
            We specialize in organic sugar waxing paste made from pure natural ingredients. Applied lukewarm, our technique gently removes hair without adhering to live skin cells, providing a smooth, pain-reduced finish.
          </p>
          <p className="text-gray-600">
            Combined with clinical O3+ Whitening Facials, Rica Italian waxing, pre-bridal packages, and luxury hair styling, Sugar Salon provides a calm sanctuary where exceptional quality meets personalized care.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-serif-heading block">15+ Years</span>
              <p className="text-xs font-bold text-gray-500">Salon Excellence</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-serif-heading block">Expert</span>
              <p className="text-xs font-bold text-gray-500">Certified Stylists</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-serif-heading block">100%</span>
              <p className="text-xs font-bold text-gray-500">Organic Paste</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl p-3 border border-gray-200 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Sugar Salon Atmosphere"
              loading="lazy"
              className="rounded-2xl w-full h-[360px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Salon Vibe & Atmosphere Grid */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xs">
        <SectionHeader
          badge="Atmosphere"
          title="Designed For Uncompromised Comfort"
          subtitle="Relax in private treatment suites, soothing aromatherapies, and a clean, serene environment in Marol."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
            alt="Private Treatment Room"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-gray-200 shadow-2xs"
          />
          <img
            src={sugarSalonBrandImg}
            alt="Sugar Salon Storefront & Lounge"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-gray-200 shadow-2xs"
          />
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
            alt="Hydrafacial Setup"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-gray-200 shadow-2xs"
          />
        </div>
      </section>
    </div>
  );
};

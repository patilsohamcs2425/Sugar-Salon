import React from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AboutSection } from "../../components/sections/AboutSection";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6 text-[#1A1418]">
      {/* Featured Redesigned About Hero Section */}
      <AboutSection showCta={false} className="p-0" />

      {/* Brand Mission & Organic Care Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6">
        <div className="space-y-6 text-[#1A1418] font-semibold text-base sm:text-lg leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#B88E2B] first-letter:mr-2.5 first-letter:float-left font-serif-heading text-[#1A1418]">
            Sugar Salon was born out of a desire to make clients feel more beautiful and confident. Over the last 15 years, we have evolved with changing trends while maintaining high-quality techniques and personalized care.
          </p>
          <p className="text-[#2C2227]">
            We specialize in organic sugar waxing paste formulated solely from pure natural ingredients. Kept at body temperature, our signature technique gently lifts hair from the root, providing a smooth, pain-reduced experience.
          </p>
          <p className="text-[#2C2227]">
            Combined with our clinical O3+ Whitening Facials, Rica Italian waxing, pre-bridal packages, and luxury hair styling, Sugar Salon provides a warm, welcoming, and upscale environment where every guest is treated like family.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D4AF37]/30 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#8C6B23] font-serif-heading block">15+ Years</span>
              <p className="text-xs font-bold text-[#5C4D56]">Of Salon Excellence</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E83870] font-serif-heading block">Expert</span>
              <p className="text-xs font-bold text-[#5C4D56]">Certified Stylists</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#8C6B23] font-serif-heading block">Premium</span>
              <p className="text-xs font-bold text-[#5C4D56]">Luxury Care Products</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel rounded-3xl p-3 border border-[#D4AF37]/40 shadow-xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Sugar Salon Atmosphere"
              loading="lazy"
              className="rounded-2xl w-full h-[380px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Salon Vibe & Atmosphere Grid */}
      <section className="glass-panel rounded-3xl p-8 md:p-12 border border-[#D4AF37]/35 bg-white shadow-xl">
        <SectionHeader
          badge="Atmosphere"
          title="Designed For Uncompromised Comfort"
          subtitle="Relax in private treatment suites, soothing aromatherapies, and a warm upscale environment."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
            alt="Private Treatment Room"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-[#D4AF37]/30 shadow-sm"
          />
          <img
            src={sugarSalonBrandImg}
            alt="Sugar Salon Storefront & Lounge"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-[#D4AF37]/30 shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
            alt="Hydrafacial Setup"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-[#D4AF37]/30 shadow-sm"
          />
        </div>
      </section>
    </div>
  );
};

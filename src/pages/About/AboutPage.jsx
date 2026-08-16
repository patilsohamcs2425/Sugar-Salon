import React from "react";
import { Sparkles, Heart, ShieldCheck, Award } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AboutSection } from "../../components/sections/AboutSection";
import { SALON_INFO } from "../../constants";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-6">
      {/* Featured Redesigned About Hero Section */}
      <AboutSection showCta={false} className="p-0" />

      {/* Brand Mission & Organic Care Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6">
        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2 first-letter:float-left font-serif-heading">
            Sugar Salon was born out of a desire to make clients feel more beautiful and confident. Over the last 15 years, we have evolved with changing trends while maintaining high-quality techniques and personalized care.
          </p>
          <p>
            We specialize in organic sugar waxing paste formulated solely from pure natural ingredients. Kept at body temperature, our signature technique gentle lifts hair from the root, providing a smooth, pain-reduced experience.
          </p>
          <p>
            Combined with our clinical O3+ Whitening Facials, Rica Italian waxing, pre-bridal packages, and luxury hair styling, Sugar Salon provides a warm, welcoming, and upscale environment where every guest is treated like family.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif-heading">15+ Years</span>
              <p className="text-xs text-slate-400">Of Salon Excellence</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-serif-heading">Expert</span>
              <p className="text-xs text-slate-400">Certified Stylists</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-serif-heading">Premium</span>
              <p className="text-xs text-slate-400">Luxury Care Products</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel rounded-3xl p-3 border border-amber-500/30 shadow-2xl">
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
      <section className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-800">
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
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
          <img
            src={sugarSalonBrandImg}
            alt="Sugar Salon Storefront & Lounge"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
            alt="Hydrafacial Setup"
            loading="lazy"
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
        </div>
      </section>
    </div>
  );
};

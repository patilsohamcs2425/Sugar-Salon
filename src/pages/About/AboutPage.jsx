import React from "react";
import { Sparkles, Heart, ShieldCheck, Award } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { SALON_INFO } from "../../constants";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <SectionHeader
        badge="Our Heritage"
        title="The Sugar Salon Story"
        subtitle="Crafting smooth skin, glowing confidence, and effortless elegance since 2018."
      />

      {/* Brand Mission & Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-pink-400 first-letter:mr-2 first-letter:float-left font-serif-heading">
            Sugar Salon was born out of a desire to revolutionize body waxing. Traditional hot waxes rely on harsh chemicals and hot resins that adhere directly to delicate skin cells, causing pain, redness, and ingrown hairs.
          </p>
          <p>
            We pioneered an organic 100% natural sugar paste formulated solely from pure sugar, purified water, and organic lemon juice. Kept at lukewarm body temperature, our sugar formula gently seeps into hair follicles to lift hair from the root in its natural direction of growth.
          </p>
          <p>
            Combined with our clinical O3+ Whitening Facials, Rica Italian waxing, pre-bridal packages, and luxury gel manicures, Sugar Salon is your premier sanctuary for everyday luxury.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 font-serif-heading">8+ Years</span>
              <p className="text-xs text-slate-400">Of Beauty Innovation</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif-heading">15+</span>
              <p className="text-xs text-slate-400">Master Technicians</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-serif-heading">100%</span>
              <p className="text-xs text-slate-400">Organic Guarantee</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel rounded-3xl p-3 border border-pink-500/30">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
              alt="Sugar Salon Atmosphere"
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>



      {/* Salon Vibe & Atmosphere Grid */}
      <section className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-800">
        <SectionHeader
          badge="Atmosphere"
          title="Designed For Uncompromised Comfort"
          subtitle="Relax with private treatment suites, soothing aromatherapies, and organic refreshments."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
            alt="Private Treatment Room"
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
          <img
            src={sugarSalonBrandImg}
            alt="Sugar Salon Storefront & Lounge"
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
            alt="Hydrafacial Setup"
            className="rounded-2xl h-48 w-full object-cover border border-slate-800"
          />
        </div>
      </section>
    </div>
  );
};

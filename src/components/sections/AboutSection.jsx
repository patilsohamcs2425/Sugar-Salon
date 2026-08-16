import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, Scissors, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";

export const AboutSection = ({ showCta = true, className = "" }) => {
  const navigate = useNavigate();

  const highlights = [
    {
      id: "exp",
      icon: Award,
      title: "15+ Years",
      subtitle: "Of trusted salon experience",
      accent: "text-amber-800 bg-amber-500/15 border-amber-500/30"
    },
    {
      id: "stylists",
      icon: Scissors,
      title: "Expert Stylists",
      subtitle: "Skilled professionals who keep up with modern techniques",
      accent: "text-pink-800 bg-pink-500/15 border-pink-500/30"
    },
    {
      id: "care",
      icon: Sparkles,
      title: "Premium Care",
      subtitle: "Quality products and personalized attention",
      accent: "text-amber-900 bg-amber-400/15 border-amber-400/30"
    }
  ];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
      <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#D4AF37]/30 relative overflow-hidden bg-gradient-to-r from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9]">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Image Column */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 opacity-70 blur-md group-hover:opacity-100 transition duration-700 pointer-events-none" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/40 bg-white shadow-xl">
                <img
                  src={sugarSalonBrandImg}
                  alt="Sugar Salon Storefront - 15 Years of Beauty & Trust"
                  loading="lazy"
                  className="w-full h-[260px] sm:h-[340px] lg:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C151A]/80 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel-light rounded-xl p-3 border border-[#D4AF37]/35 flex items-center justify-between backdrop-blur-md shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-900 flex items-center justify-center font-serif-heading font-extrabold text-sm">
                      15
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#221A20]">Est. 15 Years Ago</p>
                      <p className="text-[11px] text-[#665761]">Trusted Salon Destination</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-500/15 px-2 py-1 rounded-md border border-[#D4AF37]/40">
                    <ShieldCheck size={13} className="text-amber-700" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-widest uppercase text-amber-900 bg-amber-500/15 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
                ESTABLISHED & TRUSTED
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-heading text-[#221A20] tracking-tight leading-tight">
              15 Years of <span className="gradient-text-gold">Beauty & Trust</span>
            </h2>

            {/* Short Description */}
            <p className="text-[#5C4D56] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              For 15 years, Sugar Salon has been a trusted destination for beauty, confidence, and exceptional hair care. What began as a passionate dream has grown into a welcoming space where modern style meets personalized service.
            </p>

            {/* Three Compact Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-3.5 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${item.accent}`}>
                        <IconComponent size={16} />
                      </div>
                      <h3 className="text-sm font-bold text-[#221A20] tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#665761] leading-snug font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Optional CTA Button */}
            {showCta && (
              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate("/about")}
                  className="group hover:border-amber-500"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

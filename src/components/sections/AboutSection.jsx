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
      subtitle: "Of trusted salon experience in Marol",
      accent: "text-amber-800 bg-amber-50 border-amber-200"
    },
    {
      id: "stylists",
      icon: Scissors,
      title: "Expert Stylists",
      subtitle: "Skilled specialists in hair, skin & wax",
      accent: "text-rose-800 bg-rose-50 border-rose-200"
    },
    {
      id: "care",
      icon: Sparkles,
      title: "100% Organic",
      subtitle: "Natural sugar paste & clinical hygiene",
      accent: "text-amber-900 bg-amber-100 border-amber-300"
    }
  ];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-200 shadow-2xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Image Column */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 shadow-md">
                <img
                  src={sugarSalonBrandImg}
                  alt="Sugar Salon Storefront - 15 Years of Beauty & Trust"
                  loading="lazy"
                  className="w-full h-[260px] sm:h-[340px] lg:h-[390px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-gray-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-serif-heading font-extrabold text-sm border border-amber-300">
                      15
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-gray-900">Est. 15 Years Ago</p>
                      <p className="text-[11px] text-gray-500 font-medium">Trusted Salon Destination</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
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
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-900 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                ESTABLISHED & TRUSTED
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-heading text-gray-900 tracking-tight leading-tight">
              15 Years of <span className="gradient-text-gold">Beauty & Trust</span>
            </h2>

            {/* Short Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              For over 15 years, Sugar Salon has been Marol's premier destination for gentle organic sugar waxing, customized skin glow therapies, and professional unisex styling. Our certified artists ensure pure hygiene and pampering in a serene sanctuary.
            </p>

            {/* Three Compact Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-gray-50/70 rounded-2xl p-3.5 border border-gray-200 hover:border-amber-300 hover:bg-white transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${item.accent}`}>
                        <IconComponent size={15} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug font-normal">
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
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform text-amber-700" />
                </Button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

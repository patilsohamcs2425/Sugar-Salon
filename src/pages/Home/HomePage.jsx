import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Heart,
  Star,
  CheckCircle,
  Award,
  Clock,
  ChevronRight,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/common/SectionHeader";
import { ServiceCard } from "../../components/cards/ServiceCard";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { MOCK_SERVICES } from "../../data/mockData";
import { useUnifiedReviews } from "../../hooks/useUnifiedReviews";
import { SERVICE_CATEGORIES, SALON_INFO } from "../../constants";
import sugarSalonBrandImg from "../../assets/Logos/sugar salon.jpeg";
import { AboutSection } from "../../components/sections/AboutSection";

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCategoryForBooking, setSelectedCategoryForBooking] = useState("all");
  const { combinedReviews, googleData, isLoading } = useUnifiedReviews();

  const filteredServices =
    activeCategory === "all"
      ? MOCK_SERVICES.slice(0, 6)
      : MOCK_SERVICES.filter((s) => s.category === activeCategory);

  const displayReviews = combinedReviews.slice(0, 6);

  const handleQuickBook = () => {
    if (selectedCategoryForBooking !== "all") {
      navigate(`/appointment?category=${selectedCategoryForBooking}`);
    } else {
      navigate("/appointment");
    }
  };

  return (
    <div className="space-y-20 pt-16 sm:pt-20">
      {/* Editorial Luxury Hero Section (Inspired by Shiva's Signature & Enrich Beauty) */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Subtle Luxury Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-5 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles size={14} className="text-amber-400" />
                <span>Premier Unisex Organic Sugar Salon • Marol, Andheri East</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-heading text-slate-100 tracking-tight leading-[1.12]">
                Experience Authentic <br />
                <span className="gradient-text-gold">Beauty & Luxury</span> <br />
                Sugar Care.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
                Indulge in 100% natural organic sugar waxing, clinical O3+ facial glow, Rica Italian waxing, and luxury hair styling at Marol Maroshi Road near T2 Airport, Mumbai.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button variant="primary" size="lg" onClick={() => navigate("/appointment")}>
                  <Calendar size={18} className="mr-2" /> Book Appointment
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/services")}>
                  View Service Menu <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Real Salon Trust Proof Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Star size={16} className="fill-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">
                      {googleData.success ? `${googleData.rating} / 5.0 Rating` : "4.9 / 5.0 Rating"}
                    </p>
                    <p className="text-[11px] text-slate-400">Verified Google Maps</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">100% Organic Paste</p>
                    <p className="text-[11px] text-slate-400">Pure Sugar & Lemon</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">15+ Years Legacy</p>
                    <p className="text-[11px] text-slate-400">Trusted Salon Expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-950/40 group">
                <img
                  src={sugarSalonBrandImg}
                  alt="Sugar Salon Storefront in Marol, Mumbai"
                  className="w-full h-[360px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Salon Info Overlay */}
                <div className="absolute bottom-5 left-5 right-5 glass-panel rounded-2xl p-4 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Sugar Salon Sanctuary</h4>
                      <p className="text-[11px] text-slate-400">Near T2 International Airport, Mumbai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                    Open Daily
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Appointment & Treatment Bar (Lookwell / Enrich Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl bg-gradient-to-r from-slate-950 via-[#140f1a] to-slate-950">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                Quick Service Finder & Slot Reservations
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-slate-100">
                Reserve Your Luxury Salon Slot in Seconds
              </h3>
              <p className="text-xs text-slate-400">
                Select a treatment category to check real-time availability and certified stylist slots.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <select
                value={selectedCategoryForBooking}
                onChange={(e) => setSelectedCategoryForBooking(e.target.value)}
                className="w-full sm:w-64 px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-200 font-semibold focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Service Experiences</option>
                {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <Button
                variant="gold"
                size="md"
                className="w-full sm:w-auto whitespace-nowrap py-3"
                onClick={handleQuickBook}
              >
                <Calendar size={16} className="mr-2" /> Book Selected Slot
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned 15-Year Heritage About Us Section */}
      <AboutSection />

      {/* Featured Services & Treatments Menu (Enrich / Lookwell Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curated Service Menu"
          title="Signature Treatments & Care"
          subtitle="Explore our top-rated organic sugar waxing, O3+ whitening facials, and luxury styling experiences."
        />

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-105 border border-amber-300"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="md" onClick={() => navigate("/services")}>
            Explore Complete Salon Menu <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Why Organic Sugar Waxing? (Authentic Craft Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-14 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              centered={false}
              badge="Pure & Organic Craft"
              title="Why Choose Sugar Waxing Over Traditional Hot Wax?"
              subtitle="Formulated purely from natural sugar, water, and lemon juice. Applied lukewarm to lift hair from the follicle without tearing skin cells."
            />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Zero Skin Trauma & Redness</h4>
                  <p className="text-xs text-slate-400">Sugar paste adheres strictly to dead cells and hair stubs, keeping live epidermal skin intact.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Prevents Ingrown Hairs</h4>
                  <p className="text-xs text-slate-400">Extracted gently in the natural direction of hair growth, leaving zero broken stubs behind.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">100% Clean & Soluble</h4>
                  <p className="text-xs text-slate-400">Washes off effortlessly with lukewarm water without leave-behind sticky resin or harsh chemicals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
              alt="Organic Sugar Paste"
              loading="lazy"
              className="rounded-2xl object-cover h-64 w-full border border-amber-500/20 shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1512290900673-7002ffffff?auto=format&fit=crop&w=600&q=80"
              alt="Hydrating Skin Treatment"
              loading="lazy"
              className="rounded-2xl object-cover h-64 w-full border border-amber-500/20 shadow-xl mt-6"
            />
          </div>
        </div>
      </section>

      {/* Testimonials & Verified Guest Feedback */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Client Feedback"
          title="What Our Guests Say"
          subtitle="Real reviews from verified Sugar Salon guests and Google Maps in Andheri East, Mumbai."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-card rounded-3xl p-6 h-40 animate-pulse bg-slate-900/50" />
            ))}
          </div>
        ) : displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayReviews.map((fb) => (
              <TestimonialCard key={fb.id} testimonial={fb} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-8 text-center border border-slate-800 mb-8">
            <p className="text-sm text-slate-400">
              No reviews available yet. Be the first to share your experience!
            </p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" size="md" onClick={() => navigate("/feedback")}>
            View All Verified Guest Reviews <ArrowRight size={14} className="ml-1.5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

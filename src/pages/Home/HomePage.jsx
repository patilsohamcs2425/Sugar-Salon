import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/common/SectionHeader";
import { ServiceCard } from "../../components/cards/ServiceCard";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { MOCK_SERVICES } from "../../data/mockData";
import { useUnifiedReviews } from "../../hooks/useUnifiedReviews";
import { SERVICE_CATEGORIES } from "../../constants";
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
    <div className="space-y-16 sm:space-y-20 pt-4 sm:pt-8 text-gray-900 bg-white">
      {/* Editorial Luxury Hero Section */}
      <section className="relative pt-6 pb-10 sm:pb-14 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs">
                <Sparkles size={14} className="text-amber-600" />
                <span>Premier Unisex Organic Sugar Salon • Marol, Mumbai</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif-heading text-gray-900 tracking-tight leading-[1.12]">
                Experience Authentic <br />
                <span className="gradient-text-gold">Beauty & Luxury</span> <br />
                Sugar Care.
              </h1>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
                Indulge in 100% natural organic sugar waxing, clinical O3+ facial glow, Rica Italian waxing, and luxury hair styling at Marol Maroshi Road near T2 Airport, Mumbai.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button variant="primary" size="lg" onClick={() => navigate("/appointment")}>
                  <Calendar size={18} className="mr-2" /> Book Appointment
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/services")}>
                  View Service Menu <ArrowRight size={18} className="ml-2 text-amber-700" />
                </Button>
              </div>

              {/* Real Salon Trust Proof Badges */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shadow-2xs">
                    <Star size={16} className="fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">
                      {googleData.success ? `${googleData.rating} / 5.0 Rating` : "4.9 / 5.0 Rating"}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">Verified Google Maps</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 shadow-2xs">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">100% Organic Paste</p>
                    <p className="text-[11px] text-gray-500 font-medium">Pure Sugar & Lemon</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-2xs">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-gray-900">15+ Years Legacy</p>
                    <p className="text-[11px] text-gray-500 font-medium">Trusted Salon Expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border border-gray-200 shadow-xl group bg-white">
                <img
                  src={sugarSalonBrandImg}
                  alt="Sugar Salon Storefront in Marol, Mumbai"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Salon Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 border border-gray-200 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center font-bold">
                      <MapPin size={18} className="text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">Sugar Salon Sanctuary</h4>
                      <p className="text-[11px] text-gray-500">Near T2 International Airport, Mumbai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
                    Open Daily
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Appointment & Treatment Finder Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                Quick Service Finder & Slot Reservations
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif-heading text-gray-900">
                Reserve Your Luxury Salon Slot in Seconds
              </h3>
              <p className="text-xs text-gray-600 font-normal">
                Select a treatment category to check availability and certified specialist slots.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <select
                value={selectedCategoryForBooking}
                onChange={(e) => setSelectedCategoryForBooking(e.target.value)}
                className="w-full sm:w-64 px-4 py-3 rounded-xl bg-white border border-gray-300 text-xs text-gray-900 font-bold focus:outline-none focus:border-amber-500 shadow-2xs"
              >
                <option value="all">All Service Experiences</option>
                {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <Button
                variant="primary"
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

      {/* 15-Year Heritage About Us Section */}
      <AboutSection />

      {/* Featured Services & Treatments Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curated Service Menu"
          title="Signature Treatments & Care"
          subtitle="Explore our top-rated organic sugar waxing, O3+ whitening facials, and luxury styling experiences."
        />

        {/* Category Filter Pills (Touch-scrollable on mobile) */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 mb-8 pb-2 px-1 max-w-full">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? "bg-amber-600 text-white font-extrabold shadow-xs border border-amber-500"
                  : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-2xs"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" size="md" onClick={() => navigate("/services")}>
            Explore Complete Salon Menu <ArrowRight size={16} className="ml-2 text-amber-700" />
          </Button>
        </div>
      </section>

      {/* Why Organic Sugar Waxing? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeader
              centered={false}
              badge="Pure & Organic Craft"
              title="Why Choose Sugar Waxing Over Traditional Hot Wax?"
              subtitle="Formulated purely from natural sugar, water, and lemon juice. Applied lukewarm to lift hair from the follicle without tearing skin cells."
            />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">Zero Skin Trauma & Redness</h4>
                  <p className="text-xs text-gray-600 font-normal">Sugar paste adheres strictly to dead cells and hair stubs, keeping live epidermal skin intact.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">Prevents Ingrown Hairs</h4>
                  <p className="text-xs text-gray-600 font-normal">Extracted gently in the natural direction of hair growth, leaving zero broken stubs behind.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">100% Clean & Soluble</h4>
                  <p className="text-xs text-gray-600 font-normal">Washes off effortlessly with lukewarm water without leave-behind sticky resin or harsh chemicals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
              alt="Organic Sugar Paste"
              loading="lazy"
              className="rounded-2xl object-cover h-60 w-full border border-gray-200 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1512290900673-7002ffffff?auto=format&fit=crop&w=600&q=80"
              alt="Hydrating Skin Treatment"
              loading="lazy"
              className="rounded-2xl object-cover h-60 w-full border border-gray-200 shadow-md mt-6"
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
              <div key={n} className="bg-gray-100 rounded-3xl p-6 h-40 animate-pulse" />
            ))}
          </div>
        ) : displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayReviews.map((fb) => (
              <TestimonialCard key={fb.id} testimonial={fb} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 mb-8">
            <p className="text-sm text-gray-500">
              No reviews available yet. Be the first to share your experience!
            </p>
          </div>
        )}

        <div className="text-center">
          <Button variant="secondary" size="md" onClick={() => navigate("/feedback")}>
            View All Verified Guest Reviews <ArrowRight size={14} className="ml-1.5 text-amber-700" />
          </Button>
        </div>
      </section>
    </div>
  );
};

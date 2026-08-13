import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, Star, CheckCircle, Award } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/common/SectionHeader";
import { ServiceCard } from "../../components/cards/ServiceCard";
import { OfferCard } from "../../components/cards/OfferCard";
import { TestimonialCard } from "../../components/cards/TestimonialCard";
import { MOCK_SERVICES, MOCK_OFFERS } from "../../data/mockData";
import { useUnifiedReviews } from "../../hooks/useUnifiedReviews";
import { SERVICE_CATEGORIES, SALON_INFO } from "../../constants";

export const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const { combinedReviews, googleData, isLoading } = useUnifiedReviews();

  const filteredServices =
    activeCategory === "all"
      ? MOCK_SERVICES.slice(0, 6)
      : MOCK_SERVICES.filter((s) => s.category === activeCategory);

  const displayReviews = combinedReviews.slice(0, 6);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow ambient backdrops matching logo gold */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-yellow-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 backdrop-blur-md">
                <Sparkles size={14} className="text-amber-400" />
                <span>Premier Unisex Organic Sugar Salon in Marol, Mumbai</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-serif-heading text-slate-100 tracking-tight leading-[1.15] mb-6">
                Unveil Your <br />
                <span className="gradient-text-gold">Natural Radiance</span> <br />
                With Sugar Waxing.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Experience premium O3+ Whitening Facials, Rica Waxing, Pre-Bridal packages, and luxury salon styling at Marol Maroshi Road near T2 International Airport, Mumbai. Open daily 11 AM – 9 PM!
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg" onClick={() => navigate("/appointment")}>
                  <Calendar size={18} className="mr-2" /> Book Experience
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/services")}>
                  Explore Services <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Quick Trust Badges */}
              <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="text-pink-400" size={18} />
                  <span>100% Organic Paste</span>
                </div>
                <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-amber-300 hover:underline">
                  <Star className="text-amber-400 fill-amber-400" size={18} />
                  <span>
                    {googleData.success
                      ? `${googleData.rating} / 5.0 Google Reviews`
                      : "Verified Guest Reviews"}
                  </span>
                </a>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Heart className="text-rose-400" size={18} />
                  <span>Open Daily 11 AM - 9 PM</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-pink-500/20 shadow-2xl shadow-pink-500/20 group">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                  alt="Sugar Salon Marol Interior"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                {/* Floating Card Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4 border border-pink-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Sugar Care Specialists</h4>
                      <p className="text-xs text-slate-400">Certified Skin & Beauty Professionals</p>
                    </div>
                  </div>
                  <CheckCircle className="text-emerald-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI / Smart Style Finder Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-pink-500/30 bg-gradient-to-r from-pink-950/40 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Interactive Matchmaker
            </span>
            <h3 className="text-3xl font-bold font-serif-heading text-slate-100">
              Not Sure What Treatment Fits Your Hair & Skin Goal?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Take our 60-second interactive Beauty Finder quiz to get tailored service recommendations based on your hair length, skin sensitivity, and upcoming occasions!
            </p>
          </div>
          <Button variant="gold" size="lg" className="whitespace-nowrap" onClick={() => navigate("/recommendation")}>
            <Sparkles size={18} className="mr-2" /> Start Smart Quiz
          </Button>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curated Catalog"
          title="Signature Treatments"
          subtitle="Explore our top-rated organic sugar waxing, hydrafacials, and luxury styling experiences."
        />

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat.id
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105"
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
            View Entire Service Menu <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Why Organic Sugar Waxing? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 md:p-14 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              centered={false}
              badge="Pure & Organic"
              title="Why Sugar Waxing Over Traditional Wax?"
              subtitle="Sugar paste is made only of pure sugar, water, and lemon juice. It adheres to hair, not live skin, reducing pain by up to 70%!"
            />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-pink-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Zero Skin Trauma</h4>
                  <p className="text-xs text-slate-400">Sugar paste never pulls live epidermal skin cells, eliminating post-wax redness.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-pink-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Prevents Ingrown Hairs</h4>
                  <p className="text-xs text-slate-400">Extracted in the natural direction of hair growth, leaving zero broken stubs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-pink-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">100% Water Soluble & Clean</h4>
                  <p className="text-xs text-slate-400">Rinses off easily with lukewarm water without leave-behind sticky residue.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
              alt="Organic Sugar Paste"
              className="rounded-2xl object-cover h-64 w-full border border-pink-500/20"
            />
            <img
              src="https://images.unsplash.com/photo-1512290900673-7002ffffff?auto=format&fit=crop&w=600&q=80"
              alt="Hydrating Skin Treatment"
              className="rounded-2xl object-cover h-64 w-full border border-pink-500/20 mt-6"
            />
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Promotions"
          title="Exclusive Salon Deals"
          subtitle="Take advantage of our limited-time package discounts and welcome pass vouchers."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
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
            View All Google Maps & Guest Reviews <ArrowRight size={14} className="ml-1.5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

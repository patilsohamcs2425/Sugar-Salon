import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { ServiceCard } from "../../components/cards/ServiceCard";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_SERVICES } from "../../data/mockData";
import { SERVICE_CATEGORIES } from "../../constants";
import { formatCurrency } from "../../utils/formatters";
import { useBooking } from "../../hooks/useBooking";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState("recommended");
  const [activeModalService, setActiveModalService] = useState(null);

  const { startBookingForService } = useBooking();
  const navigate = useNavigate();

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((srv) => {
      const matchesCat = selectedCategory === "all" || srv.category === selectedCategory;
      const matchesSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === "price-low") return a.price - b.price;
      if (sortOrder === "price-high") return b.price - a.price;
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0; // recommended
    });
  }, [searchQuery, selectedCategory, sortOrder]);

  const handleBookFromModal = () => {
    if (activeModalService) {
      startBookingForService(activeModalService);
      setActiveModalService(null);
      navigate("/appointment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Full Service Menu"
        title="Bespoke Beauty & Sugar Treatments"
        subtitle="Filter by category or search to find your ideal treatment experience."
      />

      {/* Search & Controls Bar */}
      <div className="glass-panel rounded-3xl p-4 md:p-6 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-full pl-11 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <SlidersHorizontal size={14} /> Sort By:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-xs text-slate-200 focus:border-pink-500 focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === cat.id
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDetailClick={(srv) => setActiveModalService(srv)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800">
          <Sparkles size={40} className="text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-200 mb-1">No Treatments Found</h3>
          <p className="text-xs text-slate-400 mb-4">Try clearing your search query or selecting a different category.</p>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={Boolean(activeModalService)}
        onClose={() => setActiveModalService(null)}
        title={activeModalService?.title || "Treatment Details"}
      >
        {activeModalService && (
          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="pink">{activeModalService.category}</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-pink-400">
                  {formatCurrency(activeModalService.price)}
                </span>
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  <Clock size={14} className="text-pink-400" />
                  {activeModalService.duration}
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {activeModalService.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-100 mb-3">Key Benefits & Features</h4>
              <ul className="space-y-2">
                {activeModalService.benefits?.map((b, i) => (
                  <li key={i} className="flex items-center text-xs text-slate-300">
                    <CheckCircle2 size={16} className="text-pink-400 mr-2 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setActiveModalService(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={handleBookFromModal}>
                Book This Experience
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

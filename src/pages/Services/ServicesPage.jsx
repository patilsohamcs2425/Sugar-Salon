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
      return 0;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#1A1418]">
      <SectionHeader
        badge="Full Service Menu"
        title="Bespoke Beauty & Sugar Treatments"
        subtitle="Filter by category or search to find your ideal treatment experience."
      />

      {/* Search & Controls Bar */}
      <div className="glass-panel rounded-3xl p-4 md:p-6 border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-4 bg-white shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7B85]" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#D4AF37]/40 rounded-full pl-11 pr-4 py-2.5 text-sm text-[#1A1418] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm font-medium"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-[#5C4D56] font-bold flex items-center gap-1">
            <SlidersHorizontal size={14} /> Sort By:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-[#D4AF37]/40 rounded-full px-4 py-2 text-xs text-[#1A1418] font-bold focus:border-amber-500 focus:outline-none shadow-sm"
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
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold shadow-md shadow-amber-600/20 scale-105"
                : "bg-white text-[#5C4D56] hover:text-[#1A1418] border border-[#D4AF37]/30 shadow-sm"
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
        <div className="glass-panel rounded-3xl p-12 text-center border border-[#D4AF37]/30 bg-white">
          <Sparkles size={40} className="text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1A1418] mb-1">No Treatments Found</h3>
          <p className="text-xs text-[#5C4D56] mb-4 font-medium">Try clearing your search query or selecting a different category.</p>
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
          <div className="space-y-6 text-[#1A1418]">
            <div className="relative h-64 rounded-2xl overflow-hidden border border-[#D4AF37]/30">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="gold">{activeModalService.category}</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-extrabold text-[#8C6B23]">
                  {formatCurrency(activeModalService.price)}
                </span>
                <span className="text-xs text-[#1A1418] font-bold flex items-center gap-1 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm">
                  <Clock size={14} className="text-amber-700" />
                  {activeModalService.duration}
                </span>
              </div>
              <p className="text-[#4A3E45] font-semibold text-sm leading-relaxed mb-6">
                {activeModalService.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-[#1A1418] mb-3">Key Benefits & Features</h4>
              <ul className="space-y-2">
                {activeModalService.benefits?.map((b, i) => (
                  <li key={i} className="flex items-center text-xs font-semibold text-[#2C2227]">
                    <CheckCircle2 size={16} className="text-amber-700 mr-2 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex justify-end gap-3">
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

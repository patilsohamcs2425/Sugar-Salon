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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-900 bg-white">
      <SectionHeader
        badge="Full Service Menu"
        title="Bespoke Beauty & Sugar Treatments"
        subtitle="Filter by category or search to find your ideal salon experience in Marol, Mumbai."
      />

      {/* Search & Controls Bar */}
      <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 md:p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-full pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs text-gray-600 font-bold flex items-center gap-1">
            <SlidersHorizontal size={14} /> Sort By:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white border border-gray-300 rounded-full px-4 py-2 text-xs text-gray-900 font-bold focus:border-amber-500 focus:outline-none shadow-2xs"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 pb-2 px-1">
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? "bg-amber-600 text-white font-extrabold shadow-xs border border-amber-500"
                : "bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-2xs"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDetailClick={(srv) => setActiveModalService(srv)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-2xs">
          <Sparkles size={40} className="text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Treatments Found</h3>
          <p className="text-xs text-gray-500 mb-4 font-normal">Try clearing your search query or selecting a different category.</p>
          <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
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
          <div className="space-y-6 text-gray-900">
            <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="gold">{activeModalService.category}</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-extrabold text-amber-900">
                  {formatCurrency(activeModalService.price)}
                </span>
                <span className="text-xs text-gray-900 font-bold flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  <Clock size={14} className="text-amber-700" />
                  {activeModalService.duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                {activeModalService.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-gray-900 mb-3">Key Benefits & Features</h4>
              <ul className="space-y-2">
                {activeModalService.benefits?.map((b, i) => (
                  <li key={i} className="flex items-center text-xs font-semibold text-gray-700">
                    <CheckCircle2 size={16} className="text-amber-600 mr-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => setActiveModalService(null)}>
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

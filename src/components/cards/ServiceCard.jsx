import React from "react";
import { Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { RatingStars } from "../ui/RatingStars";
import { formatCurrency } from "../../utils/formatters";
import { useBooking } from "../../hooks/useBooking";
import { useNavigate } from "react-router-dom";

export const ServiceCard = ({ service, onDetailClick }) => {
  const { startBookingForService } = useBooking();
  const navigate = useNavigate();

  const handleBook = () => {
    startBookingForService(service);
    navigate("/appointment");
  };

  return (
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative h-52 sm:h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C151A]/80 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          {service.popular && (
            <Badge variant="gold" className="shadow-lg">
              <Sparkles size={12} className="mr-1 inline" /> Popular
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <RatingStars rating={service.rating} reviewsCount={service.reviews} />
          <div className="flex items-center text-xs text-white font-bold bg-[#1C151A]/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#D4AF37]/40 shadow-sm">
            <Clock size={12} className="mr-1 text-amber-400" />
            {service.duration}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF6F0]">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-[#221A20] group-hover:text-[#8C6B23] transition-colors mb-2">
            {service.title}
          </h3>
          <p className="text-[#5C4D56] text-xs sm:text-sm line-clamp-2 mb-4 font-normal">
            {service.description}
          </p>

          <ul className="space-y-1.5 mb-5">
            {service.benefits?.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-center text-xs text-[#4A3E45] font-medium">
                <CheckCircle2 size={14} className="text-[#C5A059] mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#756570] block uppercase tracking-wider font-bold">Treatment Price</span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#8C6B23]">{formatCurrency(service.price)}</span>
          </div>

          <div className="flex items-center gap-2">
            {onDetailClick && (
              <Button variant="ghost" size="sm" onClick={() => onDetailClick(service)}>
                Details
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={handleBook}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

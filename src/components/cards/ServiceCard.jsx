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
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full border border-gray-200 shadow-2xs hover:border-amber-300 hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {service.popular && (
            <Badge variant="gold" className="shadow-xs bg-white text-amber-900 border-amber-300">
              <Sparkles size={11} className="mr-1 inline text-amber-600" /> Popular
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <RatingStars rating={service.rating} reviewsCount={service.reviews} />
          <div className="flex items-center text-xs text-white font-bold bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20 shadow-xs">
            <Clock size={12} className="mr-1 text-amber-400" />
            {service.duration}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-gray-900 group-hover:text-amber-800 transition-colors mb-1.5">
            {service.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4 font-normal leading-relaxed">
            {service.description}
          </p>

          <ul className="space-y-1.5 mb-5">
            {service.benefits?.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-700 font-medium">
                <CheckCircle2 size={14} className="text-amber-600 mr-2 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-bold">Treatment Price</span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-900">{formatCurrency(service.price)}</span>
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

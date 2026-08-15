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
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          {service.popular && (
            <Badge variant="gold" className="shadow-lg">
              <Sparkles size={12} className="mr-1 inline" /> Popular
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <RatingStars rating={service.rating} reviewsCount={service.reviews} />
          <div className="flex items-center text-xs text-slate-300 font-medium bg-slate-950/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
            <Clock size={12} className="mr-1 text-amber-400" />
            {service.duration}
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif-heading text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
            {service.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">
            {service.description}
          </p>

          <ul className="space-y-1.5 mb-6">
            {service.benefits?.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-center text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-amber-400 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Experience</span>
            <span className="text-2xl font-bold text-amber-300">{formatCurrency(service.price)}</span>
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

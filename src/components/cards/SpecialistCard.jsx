import React from "react";
import { RatingStars } from "../ui/RatingStars";
import { Button } from "../ui/Button";
import { useBooking } from "../../hooks/useBooking";
import { useNavigate } from "react-router-dom";

export const SpecialistCard = ({ specialist }) => {
  const { setSelectedStylist, setBookingStep } = useBooking();
  const navigate = useNavigate();

  const handleSelectStylist = () => {
    setSelectedStylist(specialist);
    setBookingStep(1);
    navigate("/appointment");
  };

  return (
    <div className="glass-card rounded-3xl p-6 text-center flex flex-col items-center justify-between group">
      <div className="relative mb-5">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-pink-500/40 p-1 group-hover:border-pink-400 transition-colors">
          <img
            src={specialist.avatar}
            alt={specialist.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="absolute bottom-0 right-0 bg-slate-900 text-pink-400 border border-pink-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
          {specialist.experience}
        </span>
      </div>

      <h3 className="text-xl font-bold font-serif-heading text-slate-100 mb-1 group-hover:text-pink-300 transition-colors">
        {specialist.name}
      </h3>
      <p className="text-xs font-medium text-pink-400 mb-3">{specialist.role}</p>

      <div className="mb-4">
        <RatingStars rating={specialist.rating} reviewsCount={specialist.reviewsCount} />
      </div>

      <p className="text-slate-400 text-xs leading-relaxed mb-5 line-clamp-3">
        {specialist.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 justify-center mb-6">
        {specialist.specialties.map((spec, idx) => (
          <span
            key={idx}
            className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700"
          >
            {spec}
          </span>
        ))}
      </div>

      <Button variant="secondary" size="sm" className="w-full" onClick={handleSelectStylist}>
        Book with {specialist.name.split(" ")[0]}
      </Button>
    </div>
  );
};

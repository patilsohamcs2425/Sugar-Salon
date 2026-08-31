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
    <div className="bg-white rounded-3xl p-6 text-center flex flex-col items-center justify-between group border border-gray-200 shadow-2xs hover:border-amber-300 hover:shadow-lg transition-all duration-300">
      <div className="relative mb-5">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-amber-300 p-1 group-hover:border-amber-500 transition-colors">
          <img
            src={specialist.avatar}
            alt={specialist.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="absolute bottom-0 right-0 bg-white text-amber-900 border border-amber-300 text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
          {specialist.experience}
        </span>
      </div>

      <h3 className="text-xl font-bold font-serif-heading text-gray-900 mb-1 group-hover:text-amber-800 transition-colors">
        {specialist.name}
      </h3>
      <p className="text-xs font-bold text-amber-700 mb-3">{specialist.role}</p>

      <div className="mb-4">
        <RatingStars rating={specialist.rating} reviewsCount={specialist.reviewsCount} />
      </div>

      <p className="text-gray-600 text-xs leading-relaxed mb-5 line-clamp-3 font-normal">
        {specialist.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 justify-center mb-6">
        {specialist.specialties?.map((spec, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200"
          >
            {spec}
          </span>
        ))}
      </div>

      <Button variant="primary" size="sm" className="w-full" onClick={handleSelectStylist}>
        Book with {specialist.name.split(" ")[0]}
      </Button>
    </div>
  );
};

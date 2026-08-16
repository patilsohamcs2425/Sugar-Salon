import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppointmentForm } from "../../components/forms/AppointmentForm";
import { SALON_INFO } from "../../constants";
import { ShieldCheck, Clock, PhoneCall, Lock, UserCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";

export const AppointmentPage = () => {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      openAuthModal("login");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 shadow-xl bg-white text-[#221A20]">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-800 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-bold font-serif-heading text-[#221A20] mb-2">
            Member Sign In Required
          </h3>
          <p className="text-[#5C4D56] text-sm leading-relaxed mb-6 font-normal">
            Please sign in or create a member account to reserve appointment slots and view your digital ticket pass at Sugar Salon Marol.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="primary" size="md" onClick={() => openAuthModal("login")}>
              <UserCheck size={16} className="mr-2" /> Sign In To Book
            </Button>
            <Button variant="secondary" size="md" onClick={() => navigate("/")}>
              <ArrowLeft size={16} className="mr-2" /> Back To Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#221A20]">
      <SectionHeader
        badge="Instant Reservation"
        title="Reserve Your Salon Experience"
        subtitle="Select your treatments, choose your artist, and confirm your digital pass in under 2 minutes."
      />

      <AppointmentForm />

      {/* Booking Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
        <div className="glass-panel rounded-2xl p-4 text-center border border-[#D4AF37]/30 bg-white">
          <ShieldCheck className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-[#221A20]">Free Cancellation</h4>
          <p className="text-[11px] text-[#665761]">Reschedule anytime up to 4 hours prior.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 text-center border border-[#D4AF37]/30 bg-white">
          <Clock className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-[#221A20]">Zero Wait Time</h4>
          <p className="text-[11px] text-[#665761]">Guaranteed private suite seating upon arrival.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 text-center border border-[#D4AF37]/30 bg-white">
          <PhoneCall className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-[#221A20]">Concierge Helpline</h4>
          <p className="text-[11px] text-[#665761]">Call {SALON_INFO.phone} for custom group bookings.</p>
        </div>
      </div>
    </div>
  );
};

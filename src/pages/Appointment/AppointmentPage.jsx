import React, { useEffect } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppointmentForm } from "../../components/forms/AppointmentForm";
import { SALON_INFO } from "../../constants";
import { ShieldCheck, Clock, PhoneCall, Lock, UserCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";

export const AppointmentPage = () => {
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    if (!user) {
      openAuthModal("login");
    }
  }, [user, openAuthModal]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="glass-panel rounded-3xl p-10 border border-pink-500/30 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-2">
            Member Sign In Required
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Please sign in or create a member account to reserve appointment slots and view your digital ticket pass at Sugar Salon Marol.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={() => openAuthModal("login")}>
              <UserCheck size={16} className="mr-2" /> Sign In To Book
            </Button>
            <Button variant="outline" size="md" onClick={() => openAuthModal("register")}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="Instant Reservation"
        title="Reserve Your Salon Experience"
        subtitle="Select your treatments, choose your artist, and confirm your digital pass in under 2 minutes."
      />

      <AppointmentForm />

      {/* Booking Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
        <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
          <ShieldCheck className="text-pink-400 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-slate-200">Free Cancellation</h4>
          <p className="text-[11px] text-slate-400">Reschedule anytime up to 4 hours prior.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
          <Clock className="text-amber-400 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-slate-200">Zero Wait Time</h4>
          <p className="text-[11px] text-slate-400">Guaranteed private suite seating upon arrival.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
          <PhoneCall className="text-purple-400 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-slate-200">Concierge Helpline</h4>
          <p className="text-[11px] text-slate-400">Call {SALON_INFO.phone} for custom group bookings.</p>
        </div>
      </div>
    </div>
  );
};

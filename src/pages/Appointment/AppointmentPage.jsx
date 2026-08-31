import React from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppointmentForm } from "../../components/forms/AppointmentForm";
import { SALON_INFO } from "../../constants";
import { ShieldCheck, Clock, PhoneCall, CheckCircle2, User, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";

export const AppointmentPage = () => {
  const { user, openAuthModal } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-gray-900 bg-white">
      <SectionHeader
        badge="Instant Online Reservation"
        title="Reserve Your Salon Experience"
        subtitle="Select your preferred service, choose any time between 11:00 AM – 9:00 PM, and receive your verified reference pass."
      />

      {/* User Login Status Banner */}
      <div className="max-w-4xl mx-auto">
        {user ? (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Signed in as {user.name}</span>
                <span className="text-gray-500 text-[11px]">{user.email} • Details auto-filled</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white border border-amber-300 text-amber-900 font-bold text-[11px] shrink-0 shadow-2xs">
              <Sparkles size={12} className="inline mr-1 text-amber-600" /> Google Verified
            </span>
          </div>
        ) : (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <User size={18} className="text-amber-700 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 block">Booking as Guest</span>
                <span className="text-gray-500 text-[11px]">Fill in your name and phone number manually below, or connect with Google for 1-click booking.</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAuthModal("login")}
              className="shrink-0 text-xs py-1.5 px-3 whitespace-nowrap"
            >
              Sign In with Google
            </Button>
          </div>
        )}
      </div>

      <AppointmentForm />

      {/* Booking Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-200 shadow-2xs">
          <ShieldCheck className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-gray-900">Free Rescheduling</h4>
          <p className="text-[11px] text-gray-500">Easily reschedule anytime with your Reference ID.</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-200 shadow-2xs">
          <Clock className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-gray-900">Salon Hours (11 AM – 9 PM)</h4>
          <p className="text-[11px] text-gray-500">Open 7 days a week for uninterrupted luxury care.</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-200 shadow-2xs">
          <PhoneCall className="text-amber-700 mx-auto mb-2" size={24} />
          <h4 className="text-xs font-bold text-gray-900">Concierge Desk</h4>
          <p className="text-[11px] text-gray-500">Call {SALON_INFO.phone} for immediate assistance.</p>
        </div>
      </div>
    </div>
  );
};

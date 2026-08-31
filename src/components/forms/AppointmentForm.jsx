import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Sparkles, Calendar, Clock, User, CheckCircle2, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { useBooking } from "../../hooks/useBooking";
import { MOCK_SERVICES } from "../../data/mockData";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { formatCurrency } from "../../utils/formatters";

const ADDONS = [
  { id: "add-1", title: "Soothing Chamomile Post-Wax Cooling Mask", price: 25 },
  { id: "add-2", title: "Hydrating Hyaluronic Scalp Treatment", price: 35 },
  { id: "add-3", title: "Custom Paraffin Hand Wax Dip", price: 20 },
  { id: "add-4", title: "Glass-Skin Collagen Face Sheet", price: 30 }
];

const TIME_SLOTS = [
  "09:30 AM", "10:30 AM", "11:30 AM", "01:00 PM",
  "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM"
];

export const AppointmentForm = () => {
  const {
    bookingStep,
    setBookingStep,
    selectedService,
    setSelectedService,
    selectedStylist,
    setSelectedStylist,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    selectedAddons,
    toggleAddon,
    clientDetails,
    setClientDetails,
    confirmBooking,
    lastConfirmedBooking,
    resetBooking
  } = useBooking();

  const [formError, setFormError] = useState("");

  const handleNext = () => {
    setFormError("");
    if (bookingStep === 1 && !selectedService) {
      setFormError("Please select a service experience to continue.");
      return;
    }
    if (bookingStep === 2 && (!selectedDate || !selectedTimeSlot)) {
      setFormError("Please choose both a preferred date and available time slot.");
      return;
    }
    if (bookingStep === 3) {
      if (!clientDetails.name || !clientDetails.email || !clientDetails.phone) {
        setFormError("Please fill out your name, email, and phone number.");
        return;
      }
      confirmBooking();
      return;
    }
    setBookingStep(bookingStep + 1);
  };

  const handlePrev = () => {
    setFormError("");
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const isConfirmed = bookingStep >= 4 || Boolean(lastConfirmedBooking);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm text-gray-900">
      {/* Step Indicator */}
      {!isConfirmed && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
            <span className={bookingStep >= 1 ? "text-amber-900 font-extrabold" : ""}>1. Service & Addons</span>
            <span className={bookingStep >= 2 ? "text-amber-900 font-extrabold" : ""}>2. Date & Time</span>
            <span className={bookingStep >= 3 ? "text-amber-900 font-extrabold" : ""}>3. Guest Details</span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
            <div
              className="bg-amber-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(bookingStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {formError && (
        <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          {formError}
        </div>
      )}

      {/* Step 1: Select Service */}
      {bookingStep === 1 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Select Service & Add-ons
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">Choose your primary treatment experience</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {MOCK_SERVICES.map((service) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-amber-50/80 border-amber-500 shadow-xs"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{service.title}</h4>
                      <span className="text-xs font-extrabold text-amber-900">{formatCurrency(service.price)}</span>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="text-amber-600" size={22} />}
                </div>
              );
            })}
          </div>

          <h4 className="text-sm font-bold text-gray-900 mb-3">Custom Add-on Enhancements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {ADDONS.map((addon) => {
              const isAddonSelected = selectedAddons.some((a) => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                    isAddonSelected
                      ? "bg-amber-50 border-amber-500 text-amber-900"
                      : "bg-white border-gray-200 text-gray-800 hover:border-gray-300"
                  }`}
                >
                  <span>{addon.title}</span>
                  <span className="text-amber-800 font-extrabold ml-2">+{formatCurrency(addon.price)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {bookingStep === 2 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Choose Preferred Date & Time
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">Select your salon visit slot</p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Preferred Appointment Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold focus:border-amber-500 focus:outline-none shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : "bg-white border-gray-200 text-gray-800 hover:border-gray-300"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Client Info */}
      {bookingStep === 3 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Guest Details & Notes
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">Provide contact information for instant digital pass</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sophia Williams"
                value={clientDetails.name}
                onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="sophia@example.com"
                  value={clientDetails.email}
                  onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={clientDetails.phone}
                  onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Special Requests / Allergies</label>
              <textarea
                rows={3}
                placeholder="Tell us about skin sensitivities, preferred hair products, or occasion..."
                value={clientDetails.notes}
                onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4+: Booking Confirmation & Digital Pass */}
      {isConfirmed && lastConfirmedBooking && (
        <div className="text-center py-4 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-heading text-gray-900">
            Appointment Confirmed!
          </h3>
          <p className="text-xs text-gray-500">
            Booking Pass ID: <span className="font-bold text-amber-900">{lastConfirmedBooking.id}</span>
          </p>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 inline-block text-center shadow-xs">
            <div className="p-3 bg-white rounded-2xl inline-block border border-gray-200 shadow-xs mb-3">
              <QRCode value={`SUGAR-SALON-${lastConfirmedBooking.id}`} size={140} />
            </div>
            <p className="text-xs font-bold text-gray-900">Present QR Code at Reception</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{lastConfirmedBooking.date} at {lastConfirmedBooking.timeSlot}</p>
          </div>

          <div className="pt-2">
            <Button variant="secondary" size="md" onClick={resetBooking}>
              Book Another Treatment
            </Button>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      {!isConfirmed && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          {bookingStep > 1 ? (
            <Button variant="ghost" size="sm" onClick={handlePrev}>
              <ArrowLeft size={16} className="mr-1 text-amber-700" /> Back
            </Button>
          ) : <div />}

          <Button variant="primary" size="md" onClick={handleNext}>
            {bookingStep === 3 ? "Confirm & Book" : "Continue"} <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

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

  return (
    <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-pink-500/20 shadow-2xl">
      {/* Step Indicator */}
      {bookingStep < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-400">
            <span className={bookingStep >= 1 ? "text-pink-400 font-bold" : ""}>1. Service</span>
            <span className={bookingStep >= 2 ? "text-pink-400 font-bold" : ""}>2. Date & Time</span>
            <span className={bookingStep >= 3 ? "text-pink-400 font-bold" : ""}>3. Guest Details</span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-pink-500 to-amber-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(bookingStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {formError && (
        <div className="mb-6 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
          {formError}
        </div>
      )}

      {/* Step 1: Select Service */}
      {bookingStep === 1 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-2">
            Select Service & Add-ons
          </h3>
          <p className="text-slate-400 text-sm mb-6">Choose your primary treatment experience</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {MOCK_SERVICES.map((service) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-pink-500/10 border-pink-500/60 shadow-lg shadow-pink-500/10"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={service.image} alt={service.title} className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{service.title}</h4>
                      <span className="text-xs text-slate-400">{service.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-pink-400 block">
                      {formatCurrency(service.price)}
                    </span>
                    {isSelected && <CheckCircle2 size={18} className="text-pink-400 inline ml-auto mt-1" />}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedService && (
            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-400" /> Enhance Your Visit (Optional Add-ons)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-colors ${
                        isChecked
                          ? "bg-amber-500/10 border-amber-500/50 text-amber-300"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <span className="font-medium">{addon.title}</span>
                      <span className="font-bold flex items-center gap-1">
                        +{formatCurrency(addon.price)}
                        {isChecked ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Pick Date & Time Slot */}
      {bookingStep === 2 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-2">
            Select Date & Time Slot
          </h3>
          <p className="text-slate-400 text-sm mb-6">Choose your arrival date and preferred time slot</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-pink-400" /> Preferred Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3 text-slate-100 text-sm focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-pink-400" /> Available Time Slots
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-pink-500 text-white border-pink-400 shadow-md"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
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
          <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-2">
            Guest Details & Notes
          </h3>
          <p className="text-slate-400 text-sm mb-6">Provide contact information for instant confirmation</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Sophia Williams"
                value={clientDetails.name}
                onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="sophia@example.com"
                  value={clientDetails.email}
                  onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={clientDetails.phone}
                  onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requests / Allergies</label>
              <textarea
                rows={3}
                placeholder="Tell us about skin sensitivities, preferred hair products, or occasion..."
                value={clientDetails.notes}
                onChange={(e) => setClientDetails({ ...clientDetails, notes: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Booking Confirmation & Digital Pass */}
      {bookingStep === 4 && lastConfirmedBooking && (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>

          <Badge variant="emerald" className="mb-3">Booking Confirmed</Badge>
          <h3 className="text-3xl font-bold font-serif-heading text-slate-100 mb-2">
            See You Soon, {lastConfirmedBooking.clientName.split(" ")[0]}!
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
            Your appointment has been reserved. A confirmation SMS and email pass have been dispatched.
          </p>

          {/* Printable Digital Pass */}
          <div className="max-w-md mx-auto bg-slate-900 border border-pink-500/30 rounded-3xl p-6 text-left shadow-2xl mb-8 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest block">Digital Salon Ticket</span>
                <h4 className="text-lg font-bold text-slate-100">{lastConfirmedBooking.serviceTitle}</h4>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                {lastConfirmedBooking.id}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 mb-6">
              <p><span className="text-slate-500 font-semibold">Location:</span> Sugar Salon Marol, Andheri East</p>
              <p><span className="text-slate-500 font-semibold">Date & Time:</span> {lastConfirmedBooking.date} at {lastConfirmedBooking.timeSlot}</p>
              <p><span className="text-slate-500 font-semibold">Total Price:</span> {formatCurrency(lastConfirmedBooking.price)}</p>
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-inner">
              <QRCode value={`SUGAR-SALON-PASS:${lastConfirmedBooking.id}`} size={120} />
            </div>
            <span className="text-[10px] text-slate-500 text-center block mt-2">Scan at reception upon arrival</span>
          </div>

          <Button variant="primary" size="lg" onClick={resetBooking}>
            Book Another Experience
          </Button>
        </div>
      )}

      {/* Control Buttons */}
      {bookingStep < 4 && (
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrev}
            disabled={bookingStep === 1}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>

          <Button variant="primary" size="md" onClick={handleNext}>
            {bookingStep === 3 ? "Confirm Booking" : "Continue"} <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

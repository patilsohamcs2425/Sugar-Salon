import React, { useState } from "react";
import QRCode from "react-qr-code";
import {
  Sparkles, Calendar, Clock, User, CheckCircle2, ArrowRight,
  ArrowLeft, Copy, Check, MessageSquare, Phone, Mail, AlertCircle
} from "lucide-react";
import { useBooking } from "../../hooks/useBooking";
import { MOCK_SERVICES } from "../../data/mockData";
import { SALON_INFO } from "../../constants";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { formatCurrency } from "../../utils/formatters";
import toast from "react-hot-toast";

const ADDONS = [
  { id: "add-1", title: "Soothing Chamomile Post-Wax Cooling Mask", price: 25 },
  { id: "add-2", title: "Hydrating Hyaluronic Scalp Treatment", price: 35 },
  { id: "add-3", title: "Custom Paraffin Hand Wax Dip", price: 20 },
  { id: "add-4", title: "Glass-Skin Collagen Face Sheet", price: 30 }
];

// Salon Operating Hours: 11:00 AM to 09:00 PM (Every 30 mins)
const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM"
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
    resetBooking,
    currentUser
  } = useBooking();

  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const validateStep3 = () => {
    const errors = { name: "", phone: "", email: "" };
    let hasError = false;

    // Full Name check
    if (!clientDetails.name || !clientDetails.name.trim()) {
      errors.name = "Full Name is required to confirm booking.";
      hasError = true;
    }

    // Phone Number check (min 8 digits)
    const phoneDigits = (clientDetails.phone || "").replace(/\D/g, "");
    if (!clientDetails.phone || !clientDetails.phone.trim()) {
      errors.phone = "Phone number is required for SMS & WhatsApp pass.";
      hasError = true;
    } else if (phoneDigits.length < 8) {
      errors.phone = "Please enter a valid phone number (at least 8–10 digits).";
      hasError = true;
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientDetails.email || !clientDetails.email.trim()) {
      errors.email = "Email address is required for booking receipt.";
      hasError = true;
    } else if (!emailRegex.test(clientDetails.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
      hasError = true;
    }

    setFieldErrors(errors);
    return !hasError;
  };

  const handleNext = async () => {
    setFormError("");
    if (bookingStep === 1 && !selectedService) {
      setFormError("Please select a service experience to continue.");
      return;
    }
    if (bookingStep === 2 && (!selectedDate || !selectedTimeSlot)) {
      setFormError("Please select both your preferred date and a time slot between 11:00 AM – 9:00 PM.");
      return;
    }
    if (bookingStep === 3) {
      const isValid = validateStep3();
      if (!isValid) {
        setFormError("Please fill in all mandatory fields (Name, Phone Number, and Email) marked below.");
        toast.error("Please fill in Name, Phone Number, and Email!");
        return;
      }

      setIsSubmitting(true);
      try {
        await confirmBooking();
        toast.success("Appointment booked successfully!");
      } catch (err) {
        console.error("Booking error:", err);
        setFormError(err.message || "Failed to create booking. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    setBookingStep(bookingStep + 1);
  };

  const handlePrev = () => {
    setFormError("");
    setFieldErrors({ name: "", phone: "", email: "" });
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setClientDetails({ ...clientDetails, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: "" });
    }
    if (formError) {
      setFormError("");
    }
  };

  const handleCopyRef = (refId) => {
    navigator.clipboard.writeText(refId);
    setCopiedRef(true);
    toast.success("Reference ID copied to clipboard!");
    setTimeout(() => setCopiedRef(false), 3000);
  };

  const isConfirmed = bookingStep >= 4 && Boolean(lastConfirmedBooking);

  const getWhatsAppPassUrl = () => {
    if (!lastConfirmedBooking) return "#";
    const msg = encodeURIComponent(
      `Hello Sugar Salon! I booked an appointment.\n\n` +
      `📌 Reference ID: ${lastConfirmedBooking.referenceId || lastConfirmedBooking.id}\n` +
      `👤 Name: ${lastConfirmedBooking.clientName}\n` +
      `📞 Phone: ${lastConfirmedBooking.clientPhone}\n` +
      `✉️ Email: ${lastConfirmedBooking.clientEmail}\n` +
      `✨ Service: ${lastConfirmedBooking.serviceTitle}\n` +
      `🗓 Date: ${lastConfirmedBooking.date}\n` +
      `⏰ Time: ${lastConfirmedBooking.timeSlot}\n` +
      `💰 Amount: ${formatCurrency(lastConfirmedBooking.price)}`
    );
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${msg}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm text-gray-900">
      {/* Step Indicator */}
      {!isConfirmed && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
            <span className={bookingStep >= 1 ? "text-amber-900 font-extrabold" : ""}>1. Service & Addons</span>
            <span className={bookingStep >= 2 ? "text-amber-900 font-extrabold" : ""}>2. Date & Time (11am - 9pm)</span>
            <span className={bookingStep >= 3 ? "text-amber-900 font-extrabold" : ""}>3. Customer Details (Required)</span>
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
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2 animate-shake">
          <AlertCircle size={18} className="text-rose-600 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Step 1: Select Service */}
      {bookingStep === 1 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Select Your Treatment
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">Choose from our signature salon rituals and packages</p>

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
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-amber-900">{formatCurrency(service.price)}</span>
                        <span className="text-[11px] text-gray-400">• {service.duration}</span>
                      </div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="text-amber-600" size={22} />}
                </div>
              );
            })}
          </div>

          <h4 className="text-sm font-bold text-gray-900 mb-3">Optional Add-on Enhancements</h4>
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

      {/* Step 2: Date & Time (11 AM to 9 PM) */}
      {bookingStep === 2 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Choose Preferred Date & Time
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">
            Sugar Salon operates daily from <strong className="text-gray-800">11:00 AM to 09:00 PM</strong>
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">Select Appointment Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-bold focus:border-amber-500 focus:outline-none shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-gray-900">Available Salon Slots (11:00 AM – 9:00 PM) *</label>
                {selectedTimeSlot && (
                  <span className="text-xs text-amber-900 font-extrabold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Selected: {selectedTimeSlot}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs scale-102"
                          : "bg-white border-gray-200 text-gray-800 hover:border-amber-400 hover:bg-amber-50/30"
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

      {/* Step 3: Customer Details with Explicit Mandatory Indicators */}
      {bookingStep === 3 && (
        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-1.5">
            Customer Information
          </h3>
          <p className="text-gray-500 text-sm mb-6 font-normal">
            Please fill in your contact details below. All fields marked with <span className="text-rose-600 font-bold">*</span> are mandatory for confirming your appointment.
          </p>

          <div className="space-y-5 mb-6">
            {/* Full Name Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-900">
                  Full Name <span className="text-rose-600 font-bold">*</span>
                </label>
                {currentUser && (
                  <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Auto-filled from Google
                  </span>
                )}
              </div>

              <div className="relative">
                <User size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.name ? "text-rose-500" : "text-gray-400"}`} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={clientDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full bg-white rounded-xl pl-10 pr-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none shadow-2xs font-medium transition-colors ${
                    fieldErrors.name
                      ? "border-2 border-rose-500 bg-rose-50/20 focus:border-rose-600"
                      : "border border-gray-300 focus:border-amber-500"
                  }`}
                />
              </div>
              {fieldErrors.name && (
                <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={13} className="shrink-0" /> {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">
                  Phone Number <span className="text-rose-600 font-bold">* Mandatory</span>
                </label>
                <div className="relative">
                  <Phone size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.phone ? "text-rose-500" : "text-gray-400"}`} />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full bg-white rounded-xl pl-10 pr-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none shadow-2xs font-medium transition-colors ${
                      fieldErrors.phone
                        ? "border-2 border-rose-500 bg-rose-50/20 focus:border-rose-600"
                        : "border border-gray-300 focus:border-amber-500"
                    }`}
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={13} className="shrink-0" /> {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Email Address Input */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">
                  Email Address <span className="text-rose-600 font-bold">* Mandatory</span>
                </label>
                <div className="relative">
                  <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.email ? "text-rose-500" : "text-gray-400"}`} />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full bg-white rounded-xl pl-10 pr-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none shadow-2xs font-medium transition-colors ${
                      fieldErrors.email
                        ? "border-2 border-rose-500 bg-rose-50/20 focus:border-rose-600"
                        : "border border-gray-300 focus:border-amber-500"
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs font-bold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={13} className="shrink-0" /> {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Special Requests / Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Let us know if you have sensitive skin, allergies, or any custom preferences..."
                value={clientDetails.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
              />
            </div>

            {/* Summary Review Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Treatment:</span>
                <span>{selectedService?.title}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Date & Time:</span>
                <span className="font-semibold text-gray-900">{selectedDate} at {selectedTimeSlot}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Addons ({selectedAddons.length}):</span>
                  <span>{selectedAddons.map((a) => a.title).join(", ")}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-amber-900 pt-2 border-t border-amber-200 text-sm">
                <span>Total Amount:</span>
                <span>
                  {formatCurrency(
                    (selectedService?.price || 0) +
                    selectedAddons.reduce((sum, item) => sum + item.price, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Booking Confirmation & Digital Reference Pass */}
      {isConfirmed && lastConfirmedBooking && (
        <div className="text-center py-4 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-heading text-gray-900 mb-1">
              Appointment Confirmed!
            </h3>
            <p className="text-xs text-gray-500">
              Your appointment is registered in our salon backend. Present your reference ID or QR code upon arrival.
            </p>
          </div>

          {/* Official Reference ID Box */}
          <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-3xl border border-gray-200 text-center shadow-xs space-y-4">
            <div className="p-3 bg-white rounded-2xl inline-block border border-gray-200 shadow-2xs">
              <QRCode value={lastConfirmedBooking.referenceId || lastConfirmedBooking.id} size={150} />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Booking Reference ID</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-amber-900 bg-white px-3 py-1 rounded-xl border border-amber-200">
                  {lastConfirmedBooking.referenceId || lastConfirmedBooking.id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyRef(lastConfirmedBooking.referenceId || lastConfirmedBooking.id)}
                  className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer shadow-2xs"
                  title="Copy Reference ID"
                >
                  {copiedRef ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="text-left text-xs space-y-1.5 pt-3 border-t border-gray-200 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Guest Name:</span>
                <span className="font-bold text-gray-900">{lastConfirmedBooking.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="font-semibold text-gray-900">{lastConfirmedBooking.clientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-semibold text-gray-900">{lastConfirmedBooking.clientEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-semibold text-gray-900">{lastConfirmedBooking.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Slot:</span>
                <span className="font-bold text-amber-900">{lastConfirmedBooking.date} at {lastConfirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Price:</span>
                <span className="font-extrabold text-amber-900">{formatCurrency(lastConfirmedBooking.price)}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppPassUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
              >
                <MessageSquare size={16} /> Share Reference with Salon WhatsApp
              </a>
            </div>
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
            <Button variant="ghost" size="sm" onClick={handlePrev} disabled={isSubmitting}>
              <ArrowLeft size={16} className="mr-1 text-amber-700" /> Back
            </Button>
          ) : <div />}

          <Button variant="primary" size="md" onClick={handleNext} disabled={isSubmitting}>
            {bookingStep === 3
              ? (isSubmitting ? "Confirming Booking..." : "Confirm & Book")
              : "Continue"} <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

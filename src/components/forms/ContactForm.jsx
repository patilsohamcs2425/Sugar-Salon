import React, { useState } from "react";
import { Send, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";
import { SALON_INFO } from "../../constants";
import { addInquiry } from "../../services/appointmentService";

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await addInquiry(formData);
    } catch (err) {
      console.error("Error saving inquiry:", err);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const waText = encodeURIComponent(
      `Hello Sugar Salon!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${waText}`;
  };

  const getMailtoUrl = () => {
    const mailtoSubject = encodeURIComponent(`[Sugar Salon Inquiry] ${formData.subject} - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${SALON_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm space-y-6 text-gray-900 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 size={36} />
        </div>

        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900 mb-2">
            Inquiry Received Successfully!
          </h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed font-normal">
            Thank you for contacting Sugar Salon. Our concierge team has received your message and will respond to you promptly.
          </p>
        </div>

        {/* Quick Direct Connect Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare size={18} /> Chat on WhatsApp
          </a>

          <a
            href={getMailtoUrl()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Mail size={18} /> Send via Email App
          </a>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 space-y-4 border border-gray-200 text-gray-900 shadow-2xs">
      <h3 className="text-xl font-bold font-serif-heading text-gray-900 mb-1">
        Direct Concierge Inquiry
      </h3>
      <p className="text-xs text-gray-500 mb-4 font-normal">
        Send us your questions or custom requests. Our concierge team is at your service 7 days a week.
      </p>

      <div>
        <label className="block text-xs font-bold text-gray-900 mb-1">Your Full Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Amanda Vance"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="amanda@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-900 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-900 mb-1">Subject</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:border-amber-500 focus:outline-none shadow-2xs font-bold"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Bridal Package Booking">Bridal Package Booking</option>
          <option value="Sugar Waxing Advice">Sugar Waxing Advice</option>
          <option value="Membership Question">Membership Question</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-900 mb-1">Your Message *</label>
        <textarea
          required
          rows={4}
          placeholder="How can our team help you today?..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
        />
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={isSubmitting}>
        <Send size={16} className="mr-2" /> {isSubmitting ? "Submitting Inquiry..." : "Send Inquiry"}
      </Button>
    </form>
  );
};

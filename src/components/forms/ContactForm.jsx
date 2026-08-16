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
      <div className="glass-panel rounded-3xl p-8 text-center border border-[#D4AF37]/35 shadow-xl space-y-6 bg-white text-[#221A20] animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-700 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 size={36} />
        </div>

        <div>
          <h3 className="text-2xl font-bold font-serif-heading text-[#221A20] mb-2">
            Inquiry Received Successfully!
          </h3>
          <p className="text-[#5C4D56] text-sm max-w-md mx-auto leading-relaxed font-normal">
            Thank you for contacting Sugar Salon. Our concierge team has received your message and will respond to you promptly.
          </p>
        </div>

        {/* Quick Direct Connect Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare size={18} /> Chat on WhatsApp
          </a>

          <a
            href={getMailtoUrl()}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Mail size={18} /> Send via Email App
          </a>
        </div>

        <div className="pt-4 border-t border-[#D4AF37]/20">
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 space-y-4 border border-[#D4AF37]/35 bg-white text-[#221A20] shadow-xl">
      <h3 className="text-xl font-bold font-serif-heading text-[#221A20] mb-1">
        Direct Concierge Inquiry
      </h3>
      <p className="text-xs text-[#665761] mb-4 font-medium">
        Send us your questions or custom requests. Our concierge team is at your service 7 days a week.
      </p>

      <div>
        <label className="block text-xs font-bold text-[#221A20] mb-1">Your Full Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Amanda Vance"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-white border border-[#D4AF37]/40 rounded-xl p-3 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#221A20] mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="amanda@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-[#D4AF37]/40 rounded-xl p-3 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#221A20] mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white border border-[#D4AF37]/40 rounded-xl p-3 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#221A20] mb-1">Subject</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-white border border-[#D4AF37]/40 rounded-xl p-3 text-sm text-[#221A20] focus:border-amber-500 focus:outline-none shadow-sm font-bold"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Bridal Package Booking">Bridal Package Booking</option>
          <option value="Sugar Waxing Advice">Sugar Waxing Advice</option>
          <option value="Membership Question">Membership Question</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#221A20] mb-1">Your Message *</label>
        <textarea
          required
          rows={4}
          placeholder="How can our aesthetic team help you today?..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white border border-[#D4AF37]/40 rounded-xl p-3 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm font-medium"
        />
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full justify-center" disabled={isSubmitting}>
        <Send size={16} className="mr-2" /> {isSubmitting ? "Submitting Inquiry..." : "Send Inquiry"}
      </Button>
    </form>
  );
};

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center border border-pink-500/30">
        <CheckCircle2 size={48} className="text-pink-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-2">
          Message Received!
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          Thank you for reaching out to Sugar Salon Concierge. We will reply to your inquiry shortly via email.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8 space-y-4 border border-slate-800">
      <h3 className="text-xl font-bold font-serif-heading text-slate-100 mb-4">
        Direct Concierge Inquiry
      </h3>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Amanda Vance"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
          <input
            type="email"
            required
            placeholder="amanda@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Bridal Package Booking">Bridal Package Booking</option>
          <option value="Sugar Waxing Advice">Sugar Waxing Advice</option>
          <option value="Membership Question">Membership Question</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message *</label>
        <textarea
          required
          rows={4}
          placeholder="How can our aesthetic team help you today?..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full">
        <Send size={16} className="mr-2" /> Send Inquiry
      </Button>
    </form>
  );
};

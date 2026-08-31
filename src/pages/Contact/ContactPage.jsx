import React from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { ContactForm } from "../../components/forms/ContactForm";
import { SALON_INFO } from "../../constants";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Star } from "lucide-react";
import { Button } from "../../components/ui/Button";

export const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-900 bg-white">
      <SectionHeader
        badge="Reach Out to Sugar Salon Marol"
        title="Contact Concierge & Visit Our Lounge"
        subtitle="Located in Zenith CHS on Marol Maroshi Road near T2 International Airport, Andheri East, Mumbai."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start">
        {/* Contact Info & Hours */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif-heading text-gray-900">
                Salon Address & Concierge
              </h3>
              <a
                href={SALON_INFO.socials.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs"
              >
                <Star size={12} className="fill-amber-500 text-amber-500" /> 4.9 on Google Maps
              </a>
            </div>

            <div className="space-y-4 text-sm text-gray-900">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sugar Salon Marol</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{SALON_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Direct Phone & WhatsApp</h4>
                  <p className="text-xs text-gray-600 font-semibold">{SALON_INFO.phoneFormatted} ({SALON_INFO.phone})</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Inquiry</h4>
                  <p className="text-xs text-gray-600 font-semibold">{SALON_INFO.email}</p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <a href={`tel:${SALON_INFO.phone}`} className="flex-1 min-w-[130px]">
                <Button variant="primary" size="sm" className="w-full">
                  <Phone size={14} className="mr-1.5" /> Call Salon
                </Button>
              </a>
              <a href={`https://wa.me/${SALON_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 min-w-[130px]">
                <Button variant="secondary" size="sm" className="w-full text-emerald-800 border-emerald-300">
                  <MessageSquare size={14} className="mr-1.5 text-emerald-600" /> WhatsApp
                </Button>
              </a>
              <a href={SALON_INFO.socials.googleMaps} target="_blank" rel="noreferrer" className="flex-1 min-w-[130px]">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink size={14} className="mr-1.5" /> Google Maps
                </Button>
              </a>
            </div>
          </div>

          {/* Opening Hours Box */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-2xs">
            <h4 className="text-sm font-extrabold text-amber-900 mb-3 flex items-center gap-2">
              <Clock size={16} className="text-amber-700" /> Opening Hours (Open 7 Days a Week)
            </h4>
            <div className="space-y-2 text-xs text-gray-900">
              <div className="flex justify-between pb-1.5 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Monday – Sunday</span>
                <span className="font-extrabold text-gray-900">11:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 h-64 relative shadow-2xs">
            <iframe
              title="Sugar Salon Marol Location"
              src="https://maps.google.com/maps?q=Sugar%20Salon%20Zenith%20CHS%20Marol%20Maroshi%20Rd%20Andheri%20East%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Form Column */}
        <ContactForm />
      </div>
    </div>
  );
};

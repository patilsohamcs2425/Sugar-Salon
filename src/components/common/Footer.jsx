import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Heart, Sparkles } from "lucide-react";
import { SALON_INFO, NAV_LINKS, SERVICE_CATEGORIES } from "../../constants";
import logoPng from "../../assets/Logos/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-12 relative overflow-hidden text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col with Prominent Logo */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img
                src={logoPng}
                alt="Sugar Salon Logo"
                className="h-12 w-12 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold font-serif-heading tracking-wide text-gray-900 leading-tight">
                  SUGAR SALON
                </span>
                <span className="text-[10px] font-bold tracking-[0.18em] text-amber-700 uppercase leading-none mt-0.5">
                  UNISEX • MAROL
                </span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
              Mumbai's premier organic sugar waxing and bespoke aesthetic beauty lounge in Marol, Andheri East. Dedicated to gentle, 100% natural care and glowing confidence.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-amber-700 hover:text-amber-900 hover:border-amber-400 transition-colors shadow-2xs"
                title="Instagram (@sugarsalon.unisex)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-600 hover:text-blue-700 transition-colors shadow-2xs"
                title="Facebook (@SugarSalonAndheri)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SALON_INFO.socials.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-amber-800 transition-colors shadow-2xs"
                title="Google Maps Location"
              >
                <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold font-serif-heading text-base mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-amber-700 text-sm transition-colors flex items-center gap-2 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h4 className="text-gray-900 font-bold font-serif-heading text-base mb-4">
              Signature Treatments
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/services?cat=${cat.id}`}
                    className="text-gray-600 hover:text-amber-700 text-sm transition-colors flex items-center gap-2 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="text-gray-900 font-bold font-serif-heading text-base mb-4">
              Salon Concierge
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{SALON_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-amber-600 flex-shrink-0" />
                <span>{SALON_INFO.phoneFormatted}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-amber-600 flex-shrink-0" />
                <span>{SALON_INFO.email}</span>
              </li>
            </ul>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1">
                <Clock size={14} /> Opening Hours (7 Days)
              </div>
              <p className="text-xs text-gray-900 font-extrabold">Mon - Sun: 11:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Sugar Salon (Marol, Andheri East, Mumbai). All Rights Reserved.</p>
          <div className="flex items-center gap-1 font-medium">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
            <span>for natural organic care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

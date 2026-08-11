import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import { SALON_INFO, NAV_LINKS, SERVICE_CATEGORIES } from "../../constants";
import logoPng from "../../assets/Logos/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#08060a] border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <Link to="/" className="inline-block mb-4 group">
              <img
                src={logoPng}
                alt="Sugar Salon Logo"
                className="h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Mumbai's premier organic sugar waxing and bespoke aesthetic beauty lounge in Marol, Andheri East. Dedicated to zero-pain smoothness and glowing confidence.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href={SALON_INFO.socials.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Google Maps Location"
              >
                <svg className="w-4 h-4 fill-current text-blue-400" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-bold font-serif-heading text-lg mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-pink-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500/50" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h4 className="text-slate-100 font-bold font-serif-heading text-lg mb-4">
              Signature Treatments
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/services?cat=${cat.id}`}
                    className="text-slate-400 hover:text-pink-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="text-slate-100 font-bold font-serif-heading text-lg mb-4">
              Salon Concierge
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{SALON_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-pink-400 flex-shrink-0" />
                <span>{SALON_INFO.phoneFormatted}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-pink-400 flex-shrink-0" />
                <span>{SALON_INFO.email}</span>
              </li>
            </ul>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                <Clock size={14} /> Opening Hours (7 Days)
              </div>
              <p className="text-xs text-slate-300 font-bold">Mon - Sun: 11:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sugar Salon (Marol, Andheri East, Mumbai). All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 inline" />
            <span>for timeless elegance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

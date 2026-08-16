import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Calendar, User, LogOut, Sparkles, Phone, MapPin, Clock } from "lucide-react";
import { NAV_LINKS, SALON_INFO } from "../../constants";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import logoPng from "../../assets/Logos/logo.png";
import logoSvg from "../../assets/Logos/logo.svg";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, openAuthModal, requireAuth } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.dispatchEvent(new CustomEvent("mobileMenuToggle", { detail: { open: false } }));
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    window.dispatchEvent(new CustomEvent("mobileMenuToggle", { detail: { open: nextState } }));
  };

  const handleNavClick = (e, link) => {
    if (link.path === "/appointment") {
      e.preventDefault();
      requireAuth(() => {
        navigate("/appointment");
      });
    }
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("mobileMenuToggle", { detail: { open: false } }));
    requireAuth(() => {
      navigate("/appointment");
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Luxury Announcement & Utility Strip */}
      <div className={`bg-[#FAF6F0] border-b border-[#D4AF37]/25 py-1.5 transition-all ${scrolled ? "hidden sm:block opacity-90" : "block"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-[#4A3E45]">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-[#8C6B23] font-semibold">
              <MapPin size={12} className="text-[#C5A059]" />
              <span>Marol Maroshi Rd, Andheri East, Mumbai</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#665761]">
              <Clock size={12} className="text-[#E83870]" />
              <span>Open Daily 11:00 AM – 9:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${SALON_INFO.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1 text-[#8C6B23] hover:text-[#B88E2B] transition-colors font-bold"
            >
              <Phone size={12} className="text-[#C5A059]" />
              <span>Hotline: {SALON_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFDF9]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 py-2.5 shadow-md shadow-amber-900/5"
            : "bg-[#FFFDF9]/85 backdrop-blur-md py-3.5 border-b border-[#D4AF37]/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top-Left Brand Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative h-12 sm:h-14 md:h-14 flex items-center group-hover:scale-105 transition-transform py-0.5">
              {logoLoaded ? (
                <img
                  src={logoPng || logoSvg}
                  alt="Sugar Salon Logo"
                  onError={() => setLogoLoaded(false)}
                  className="h-full w-auto object-contain max-w-[220px] sm:max-w-[260px] drop-shadow-sm"
                />
              ) : (
                <div className="h-10 sm:h-12 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-xl flex items-center gap-2 text-white font-bold font-serif-heading border border-amber-300 text-sm sm:text-base">
                  <Sparkles size={18} /> Sugar Salon
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FAF6F0]/90 p-1.5 rounded-full border border-[#D4AF37]/30 backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-amber-900 bg-amber-500/20 border border-[#D4AF37]/50 shadow-sm"
                      : "text-slate-700 hover:text-amber-900 hover:bg-amber-500/10"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* User Account Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white border border-[#D4AF37]/40 hover:border-[#B88E2B] transition-colors cursor-pointer shadow-sm"
                >
                  <span className="text-xs font-bold text-amber-900">{user.name.split(" ")[0]}</span>
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-800 border border-amber-500/40 flex items-center justify-center font-bold text-[10px] uppercase">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                </button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => openAuthModal("login")}>
                  <User size={14} className="mr-1.5" /> Sign In
                </Button>
              )}

              {/* Dropdown Menu */}
              {userDropdownOpen && user && (
                <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2 border border-[#D4AF37]/30 shadow-2xl z-50 animate-fadeIn">
                  <div className="p-3 border-b border-[#D4AF37]/20 mb-1">
                    <p className="text-xs font-bold text-[#221A20]">{user.name}</p>
                    <p className="text-[11px] text-[#665761] truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[9px] uppercase font-bold bg-pink-500/15 text-pink-700 rounded-full border border-pink-500/30">
                      {user.tier || "VIP Guest"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            <Button variant="primary" size="sm" onClick={handleBookClick}>
              <Calendar size={14} className="mr-1.5" /> Book Now
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-amber-900 hover:text-amber-800 rounded-xl bg-amber-500/15 border border-[#D4AF37]/40 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-screen Overlay Mobile Drawer (Clean, Unblocked Mobile Menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-[60] glass-panel border-t border-[#D4AF37]/30 p-6 shadow-2xl animate-fadeIn overflow-y-auto pb-40 bg-[#FFFDF9]/98 backdrop-blur-2xl text-[#221A20]">
          {/* Header inside mobile drawer with brand logo */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img src={logoPng} alt="Sugar Salon" className="h-9 w-auto object-contain drop-shadow-sm" />
              <div>
                <span className="text-sm font-bold font-serif-heading text-[#8C6B23] block">Sugar Salon</span>
                <span className="text-[10px] text-[#665761]">Marol, Andheri East</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/30 text-[10px] text-amber-900 font-bold">
              Open Daily 11AM-9PM
            </span>
          </div>

          <div className="flex flex-col space-y-2 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    toggleMobileMenu();
                  }}
                  className={`text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-900 border border-[#D4AF37]/50 shadow-sm"
                      : "text-[#221A20] hover:bg-amber-500/10 border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-[#D4AF37]/20">
            {!user ? (
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" size="md" onClick={() => { toggleMobileMenu(); openAuthModal("login"); }}>
                  Sign In
                </Button>
                <Button variant="outline" size="md" onClick={() => { toggleMobileMenu(); openAuthModal("register"); }}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-[#D4AF37]/30 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#221A20]">{user.name}</p>
                    <p className="text-[10px] text-amber-800 font-medium capitalize">{user.tier || "VIP Guest"}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-xs text-rose-600 font-bold hover:underline">
                  Sign Out
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full justify-center py-3.5 shadow-lg" onClick={handleBookClick}>
              <Calendar size={18} className="mr-2" /> Book Appointment Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

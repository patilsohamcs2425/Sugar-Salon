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
      setScrolled(window.scrollY > 15);
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
      <div className={`bg-gray-50 border-b border-gray-100 py-1.5 transition-all ${scrolled ? "hidden sm:block opacity-95" : "block"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-gray-600">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-gray-800 font-semibold">
              <MapPin size={12} className="text-amber-600" />
              <span>Marol Maroshi Rd, Andheri East, Mumbai</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-gray-600">
              <Clock size={12} className="text-amber-600" />
              <span>Open 7 Days • 11:00 AM – 9:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${SALON_INFO.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1 text-amber-800 hover:text-amber-900 transition-colors font-bold"
            >
              <Phone size={12} className="text-amber-600" />
              <span>Hotline: {SALON_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-gray-100 ${
          scrolled ? "py-2.5 shadow-xs" : "py-3 sm:py-3.5 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top-Left Brand Logo with High-Visibility Typography */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
            {logoLoaded ? (
              <img
                src={logoPng || logoSvg}
                alt="Sugar Salon Logo"
                onError={() => setLogoLoaded(false)}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-13 md:w-13 object-contain shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <Sparkles size={20} />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-xl font-extrabold font-serif-heading tracking-wide text-gray-900 leading-tight group-hover:text-amber-700 transition-colors">
                SUGAR SALON
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-amber-700 uppercase leading-none mt-0.5">
                UNISEX • MAROL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-full border border-gray-200 shadow-2xs">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-150 ${
                    isActive
                      ? "text-white bg-amber-600 shadow-xs"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-200/60"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-500 text-white rounded-full">
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
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white border border-gray-200 hover:border-amber-400 transition-colors cursor-pointer shadow-2xs"
                >
                  <span className="text-xs font-bold text-gray-900">{user.name.split(" ")[0]}</span>
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold text-[10px] uppercase">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                </button>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => openAuthModal("login")}>
                  <User size={14} className="mr-1.5 text-gray-600" /> Sign In
                </Button>
              )}

              {/* Dropdown Menu */}
              {userDropdownOpen && user && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl p-2 border border-gray-100 shadow-xl z-50 animate-fadeIn">
                  <div className="p-3 border-b border-gray-100 mb-1">
                    <p className="text-xs font-bold text-gray-900">{user.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] uppercase font-bold bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                      {user.tier || "VIP Member"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer font-bold"
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
            className="lg:hidden p-2 text-gray-800 hover:text-gray-900 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean, Pristine White Menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] sm:top-[70px] z-[60] bg-white border-t border-gray-100 p-6 shadow-2xl animate-fadeIn overflow-y-auto pb-36 text-gray-900">
          {/* Header inside mobile drawer with brand logo */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img src={logoPng} alt="Sugar Salon" className="h-11 w-11 object-contain drop-shadow-xs" />
              <div>
                <span className="text-base font-extrabold font-serif-heading text-gray-900 block leading-tight">
                  SUGAR SALON
                </span>
                <span className="text-[10px] text-amber-700 font-bold tracking-wider">UNISEX • MAROL</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-900 font-bold">
              Open 11AM - 9PM
            </span>
          </div>

          <div className="flex flex-col space-y-1.5 mb-6">
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
                      ? "bg-amber-600 text-white shadow-xs font-extrabold"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full ${isActive ? "bg-white text-amber-800" : "bg-amber-500 text-white"}`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
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
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold text-xs">
                    {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{user.name}</p>
                    <p className="text-[10px] text-amber-800 font-bold capitalize">{user.tier || "VIP Member"}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-xs text-rose-600 font-bold hover:underline">
                  Sign Out
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full justify-center py-3.5 shadow-md mt-1" onClick={handleBookClick}>
              <Calendar size={18} className="mr-2" /> Book Appointment Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

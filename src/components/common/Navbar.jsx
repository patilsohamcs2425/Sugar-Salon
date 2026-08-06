import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Calendar, User, ShieldCheck, LogOut, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../../constants";
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
  const { user, logout, isAdmin, openAuthModal, requireAuth } = useAuth();

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
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    if (link.path === "/appointment") {
      e.preventDefault();
      requireAuth(() => {
        navigate("/appointment");
      });
    }
  };

  const handleBookClick = () => {
    requireAuth(() => {
      navigate("/appointment");
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-pink-500/20 py-2.5 shadow-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Top-Left Logo Image (No text beside it as requested) */}
        <Link to="/" className="flex items-center group">
          <div className="relative h-12 sm:h-14 flex items-center group-hover:scale-105 transition-transform">
            {logoLoaded ? (
              <img
                src={logoPng || logoSvg}
                alt="Sugar Salon Logo"
                onError={() => setLogoLoaded(false)}
                className="h-full w-auto object-contain max-w-[200px]"
              />
            ) : (
              <div className="h-11 px-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center gap-2 text-white font-bold font-serif-heading">
                <Sparkles size={18} /> Sugar Salon
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-pink-300 bg-pink-500/20 border border-pink-500/30 shadow-md"
                    : "text-slate-300 hover:text-pink-300 hover:bg-slate-800/50"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isAdmin && (
            <Link to="/admin">
              <span className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-purple-500/30 transition-colors">
                <ShieldCheck size={14} /> Admin Portal
              </span>
            </Link>
          )}

          {/* User Account Menu */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-slate-900 border border-slate-700 hover:border-pink-500/40 transition-colors"
              >
                <span className="text-xs font-medium text-slate-200">{user.name.split(" ")[0]}</span>
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-pink-500/40" />
              </button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => openAuthModal("login")}>
                <User size={14} className="mr-1.5" /> Sign In
              </Button>
            )}

            {/* Dropdown Menu */}
            {userDropdownOpen && user && (
              <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2 border border-slate-700 shadow-2xl z-50 animate-fadeIn">
                <div className="p-3 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-100">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] uppercase font-bold bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30">
                    {user.role === "admin" ? "Salon Administrator" : user.tier || "VIP Guest"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/20 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-pink-400 rounded-xl bg-slate-900 border border-slate-800"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] glass-panel border-b border-slate-800 p-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3 mb-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="text-slate-200 hover:text-pink-400 text-sm font-semibold py-2 border-b border-slate-800/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold bg-pink-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" onClick={() => openAuthModal("login")}>
                  Sign In
                </Button>
                <Button variant="outline" size="sm" onClick={() => openAuthModal("register")}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="text-xs font-bold text-slate-100">{user.name}</span>
                </div>
                <button onClick={logout} className="text-xs text-rose-400 font-semibold">
                  Sign Out
                </button>
              </div>
            )}

            <Button variant="primary" size="md" className="w-full" onClick={handleBookClick}>
              <Calendar size={16} className="mr-2" /> Book Appointment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

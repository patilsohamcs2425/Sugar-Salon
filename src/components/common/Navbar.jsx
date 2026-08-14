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
          ? "bg-[#0b090e]/95 backdrop-blur-xl border-b border-amber-500/25 py-2.5 shadow-2xl shadow-amber-950/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Top-Left Logo Image */}
        <Link to="/" className="flex items-center group">
          <div className="relative h-14 sm:h-16 md:h-16 flex items-center group-hover:scale-105 transition-transform py-1">
            {logoLoaded ? (
              <img
                src={logoPng || logoSvg}
                alt="Sugar Salon Logo"
                onError={() => setLogoLoaded(false)}
                className="h-full w-auto object-contain max-w-[240px] sm:max-w-[280px] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
              />
            ) : (
              <div className="h-12 sm:h-14 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center gap-2 text-slate-950 font-bold font-serif-heading border border-amber-300 text-base sm:text-lg">
                <Sparkles size={20} /> Sugar Salon
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#120e15]/80 p-1.5 rounded-full border border-amber-500/20 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-md shadow-amber-500/10"
                    : "text-slate-300 hover:text-amber-300 hover:bg-amber-500/10"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 rounded-full">
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
                className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition-colors cursor-pointer"
              >
                <span className="text-xs font-medium text-amber-200">{user.name.split(" ")[0]}</span>
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-[10px] uppercase">
                  {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
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
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2.5 text-amber-300 hover:text-amber-200 rounded-xl bg-amber-500/10 border border-amber-500/30 active:scale-95 transition-all cursor-pointer"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] glass-panel border-b border-amber-500/30 p-6 shadow-2xl animate-fadeIn max-h-[calc(100vh-80px)] overflow-y-auto bg-[#0d0a12]/95 backdrop-blur-2xl">
          {/* Header inside mobile drawer with brand logo */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img src={logoPng} alt="Sugar Salon" className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              <div>
                <span className="text-sm font-bold font-serif-heading text-amber-300 block">Sugar Salon</span>
                <span className="text-[10px] text-slate-400">Marol, Andheri East</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] text-amber-300 font-semibold">
              Open Daily 11AM-9PM
            </span>
          </div>

          <div className="flex flex-col space-y-1.5 mb-6">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                      : "text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-slate-800">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="md" onClick={() => openAuthModal("login")}>
                  Sign In
                </Button>
                <Button variant="outline" size="md" onClick={() => openAuthModal("register")}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs">
                    {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-100">{user.name}</p>
                    <p className="text-[10px] text-amber-300 font-medium capitalize">{user.role || "VIP Guest"}</p>
                  </div>
                </div>
                <button onClick={logout} className="text-xs text-rose-400 font-semibold hover:underline">
                  Sign Out
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" className="w-full justify-center" onClick={handleBookClick}>
              <Calendar size={18} className="mr-2" /> Book Appointment Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Sparkles, Calendar, Phone, User } from "lucide-react";
import { SALON_INFO } from "../../constants";
import { useAuth } from "../../hooks/useAuth";

export const MobileBottomBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, openAuthModal, requireAuth } = useAuth();

  useEffect(() => {
    const handleMenuToggle = (e) => {
      if (e.detail && typeof e.detail.open === "boolean") {
        setIsHidden(e.detail.open);
      }
    };
    window.addEventListener("mobileMenuToggle", handleMenuToggle);
    return () => window.removeEventListener("mobileMenuToggle", handleMenuToggle);
  }, []);

  const handleBookClick = (e) => {
    e.preventDefault();
    requireAuth(() => {
      navigate("/appointment");
    });
  };

  if (isHidden) {
    return null;
  }

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: Home
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      icon: Sparkles
    },
    {
      id: "book",
      label: "Book Now",
      path: "/appointment",
      icon: Calendar,
      isPrimary: true
    },
    {
      id: "call",
      label: "Call Us",
      href: `tel:${SALON_INFO.phone.replace(/\s+/g, "")}`,
      icon: Phone
    },
    {
      id: "account",
      label: user ? user.name.split(" ")[0] : "Account",
      path: "/auth",
      icon: User,
      onClick: !user ? () => openAuthModal("login") : null
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-xl border-t border-[#D4AF37]/35 px-2 py-1.5 shadow-[0_-8px_30px_rgba(184,142,43,0.12)] pb-safe transition-all duration-300">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={handleBookClick}
                className="flex flex-col items-center group -mt-3 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-600/30 border border-amber-300 active:scale-95 transition-transform">
                  <Icon size={22} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-extrabold text-amber-900 mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                className="flex flex-col items-center py-1 px-2 rounded-xl text-[#5C4D56] hover:text-[#8C6B23] transition-colors"
              >
                <Icon size={20} />
                <span className="text-[10px] font-semibold mt-1">{item.label}</span>
              </a>
            );
          }

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center py-1 px-2 rounded-xl text-[#5C4D56] hover:text-[#8C6B23] transition-colors cursor-pointer"
              >
                <Icon size={20} />
                <span className="text-[10px] font-semibold mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                isActive
                  ? "text-amber-900 font-bold"
                  : "text-[#5C4D56] hover:text-[#221A20]"
              }`}
            >
              <Icon size={20} className={isActive ? "text-[#8C6B23]" : ""} />
              <span className="text-[10px] font-semibold mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

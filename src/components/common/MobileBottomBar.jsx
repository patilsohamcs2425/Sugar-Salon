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
      label: "Book",
      path: "/appointment",
      icon: Calendar,
      isPrimary: true
    },
    {
      id: "call",
      label: "Call",
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe transition-all duration-300">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={handleBookClick}
                className="flex flex-col items-center group -mt-3.5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/30 border border-amber-300 active:scale-95 transition-transform">
                  <Icon size={22} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-extrabold text-amber-900 mt-0.5">
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
                className="flex flex-col items-center py-1 px-2 rounded-xl text-gray-600 hover:text-amber-800 transition-colors"
              >
                <Icon size={19} />
                <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
              </a>
            );
          }

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center py-1 px-2 rounded-xl text-gray-600 hover:text-amber-800 transition-colors cursor-pointer"
              >
                <Icon size={19} />
                <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                isActive
                  ? "text-amber-800 font-extrabold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={19} className={isActive ? "text-amber-700" : ""} />
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

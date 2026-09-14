import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Scissors, MessageSquare, ArrowLeft, ShieldCheck, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminNav = [
    { name: "Overview & Analytics", path: "/admin", icon: LayoutDashboard },
    { name: "Appointments", path: "/admin?tab=appointments", icon: Calendar },
    { name: "Service Menu", path: "/admin?tab=services", icon: Scissors },
    { name: "Client Reviews", path: "/admin?tab=reviews", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h3 className="font-bold font-serif-heading text-gray-900 text-xs">Sugar Admin</h3>
            <p className="text-[10px] text-amber-800 font-semibold truncate max-w-[160px]">
              {user?.email || "sugarsalon6@gmail.com"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="p-1.5 text-gray-600 hover:text-amber-800 text-xs font-bold"
            title="Storefront"
          >
            <ArrowLeft size={18} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-700"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-b border-gray-200 p-4 space-y-2 animate-fadeIn">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname + location.search === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                  isActive ? "bg-amber-600 text-white font-bold" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={15} />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs text-rose-600 font-bold p-1"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Admin Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold font-serif-heading text-gray-900 text-sm">Sugar Admin</h3>
              <p className="text-[10px] text-amber-800 font-semibold">Executive Suite</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname + location.search === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-600 text-white font-bold shadow-2xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          {/* Admin User Badge */}
          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-gray-900">Administrator</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[11px] text-gray-500 truncate mt-0.5" title={user?.email}>
              {user?.email || "sugarsalon6@gmail.com"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-amber-800 transition-colors"
            >
              <ArrowLeft size={15} /> Storefront
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} /> Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">{children}</main>
    </div>
  );
};

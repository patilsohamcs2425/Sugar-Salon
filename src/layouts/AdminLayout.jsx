import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, Scissors, MessageSquare, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const adminNav = [
    { name: "Overview & Analytics", path: "/admin", icon: LayoutDashboard },
    { name: "Appointments", path: "/admin?tab=appointments", icon: Calendar },
    { name: "Service Menu", path: "/admin?tab=services", icon: Scissors },
    { name: "Client Reviews", path: "/admin?tab=reviews", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold font-serif-heading text-gray-900 text-sm">Sugar Admin</h3>
              <p className="text-[10px] text-amber-800 font-semibold">Management Suite</p>
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

        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-amber-800 transition-colors p-2"
          >
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">{children}</main>
    </div>
  );
};

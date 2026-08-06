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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 glass-panel border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold font-serif-heading text-slate-100 text-sm">Sugar Admin</h3>
              <p className="text-[10px] text-purple-300">Management Suite</p>
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
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
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
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-pink-400 transition-colors p-2"
          >
            <ArrowLeft size={16} /> Return to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
};

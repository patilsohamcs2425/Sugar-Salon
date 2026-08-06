import React, { useState } from "react";
import { User, Lock, Key, Mail, Phone } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { loginWithEmail, registerCustomer, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerCustomer(name, email, phone, password);
    } else {
      loginWithEmail(email, password);
    }
    navigate("/");
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="glass-panel rounded-3xl p-8 border border-pink-500/30">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-pink-500/40 object-cover"
          />
          <h3 className="text-2xl font-bold font-serif-heading text-slate-100">{user.name}</h3>
          <p className="text-xs text-slate-400 mb-2">{user.email}</p>
          <span className="inline-block mb-6 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/30">
            Active Member Session
          </span>
          
          <div className="space-y-2">
            <Button variant="primary" size="md" className="w-full" onClick={() => navigate("/")}>
              Return to Storefront
            </Button>
            <Button variant="outline" size="md" className="w-full" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 space-y-8">
      <SectionHeader
        badge="Guest Portal"
        title={isRegister ? "Join Sugar VIP" : "Welcome Back"}
        subtitle="Sign in to manage your appointments, vouchers, and beauty profile."
      />

      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
        {/* Security Indicator */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-300">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock size={14} className="text-amber-400" /> Member Account Access
          </span>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 font-semibold text-slate-300">
            Encrypted Session
          </span>
        </div>

        <form onSubmit={handleCustomSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shraddha Parab"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="098200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" variant="secondary" size="md" className="w-full">
            {isRegister ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-pink-400 hover:underline font-medium"
          >
            {isRegister ? "Already have an account? Sign in" : "New to Sugar Salon? Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

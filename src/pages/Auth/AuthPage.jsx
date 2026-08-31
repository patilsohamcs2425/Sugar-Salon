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
      <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md text-gray-900">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-amber-300 bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl uppercase">
            {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "U"}
          </div>
          <h3 className="text-2xl font-bold font-serif-heading text-gray-900">{user.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{user.email}</p>
          <span className="inline-block mb-6 px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-full border border-emerald-200">
            Active Member Session
          </span>
          
          <div className="space-y-2">
            <Button variant="primary" size="md" className="w-full" onClick={() => navigate("/")}>
              Return to Storefront
            </Button>
            <Button variant="secondary" size="md" className="w-full" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 space-y-8 text-gray-900 bg-white">
      <SectionHeader
        badge="Guest Portal"
        title={isRegister ? "Join Sugar VIP" : "Welcome Back"}
        subtitle="Sign in to manage your appointments, vouchers, and beauty profile."
      />

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
        {/* Security Indicator */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock size={14} className="text-amber-700" /> Member Account Access
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-amber-200 font-bold text-amber-900 shadow-2xs">
            Encrypted Session
          </span>
        </div>

        <form onSubmit={handleCustomSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shraddha Parab"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-900 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-900 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="098200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-900 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-900 mb-1">Password</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-900 focus:border-amber-500 focus:outline-none shadow-2xs font-medium"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full">
            {isRegister ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-amber-800 hover:underline font-bold cursor-pointer"
          >
            {isRegister ? "Already have an account? Sign in" : "New to Sugar Salon? Create account"}
          </button>
        </div>
      </div>
    </div>
  );
};

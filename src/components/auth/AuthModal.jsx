import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { Lock, Mail, User, Phone, Key } from "lucide-react";

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    loginWithEmail,
    registerCustomer,
    loginWithGoogle
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please enter both email address and password.");
      return;
    }
    loginWithEmail(email, password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name || !email || !password) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    registerCustomer(name, email, phone, password);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title="Sugar Salon Guest Portal"
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-[#221A20]">
        {/* Security Indicator */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/40 text-xs text-amber-900 font-bold">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock size={14} className="text-amber-700" /> Member Account Access
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/30 font-bold text-amber-900 shadow-sm">
            Encrypted Session
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#FAF6F0] rounded-2xl border border-[#D4AF37]/30">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab("login");
              setErrorMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authModalTab === "login"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                : "text-[#5C4D56] hover:text-[#221A20]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalTab("register");
              setErrorMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authModalTab === "register"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                : "text-[#5C4D56] hover:text-[#221A20]"
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        {/* Sign In Tab */}
        {authModalTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Password</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full">
              Sign In
            </Button>
          </form>
        ) : (
          /* Sign Up Tab */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shraddha Parab"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="shraddha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="098200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#221A20] mb-1">Password *</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#D4AF37]/40 rounded-xl pl-10 pr-3 py-2 text-sm text-[#221A20] placeholder-[#8A7B85] focus:border-amber-500 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full mt-2">
              Create Account
            </Button>
          </form>
        )}

        {/* Divider & Google Auth */}
        <div className="pt-2 border-t border-[#D4AF37]/20 space-y-3">
          <div className="relative flex items-center justify-center">
            <span className="bg-[#FFFDF9] px-2 text-[10px] uppercase font-bold text-[#756570] tracking-wider">
              Or Connect With
            </span>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-amber-50/50 border border-[#D4AF37]/40 rounded-xl py-2.5 text-xs font-bold text-[#221A20] transition-all cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </Modal>
  );
};

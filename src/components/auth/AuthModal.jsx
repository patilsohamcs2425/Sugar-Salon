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
    loginWithGoogle,
    loginAsAdmin,
    isFirebaseConfigured
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
      <div className="space-y-5">
        {/* Security Indicator */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-300 font-medium">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock size={14} className="text-amber-400" /> Member Account Access
          </span>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 font-semibold text-slate-300">
            Encrypted Session
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab("login");
              setErrorMsg("");
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authModalTab === "login"
                ? "bg-pink-500 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
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
                ? "bg-pink-500 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Sign In Tab */}
        {authModalTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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

            <Button type="submit" variant="primary" size="md" className="w-full">
              Sign In
            </Button>
          </form>
        ) : (
          /* Sign Up Tab */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Shraddha Parab"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="shraddha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="098200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2 text-sm text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full mt-2">
              Create Account
            </Button>
          </form>
        )}

        {/* Divider & Google Auth */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <div className="relative flex items-center justify-center">
            <span className="bg-slate-950 px-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Or Connect With
            </span>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl py-2.5 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
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

          {/* Quick Admin Access */}
          <button
            type="button"
            onClick={() => {
              loginAsAdmin();
              closeAuthModal();
            }}
            className="w-full flex items-center justify-center gap-2 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/40 rounded-xl py-2 text-xs font-bold text-purple-300 transition-colors cursor-pointer"
          >
            <Lock size={14} className="text-purple-400" /> Sign In as Admin Manager
          </button>
        </div>
      </div>
    </Modal>
  );
};

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  generateMockJWT,
  verifyAndDecodeJWT,
  saveJWTToken,
  getJWTToken,
  removeJWTToken
} from "../utils/jwtHelper";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // 'login' or 'register'
  const [pendingCallback, setPendingCallback] = useState(null);

  // Initialize Auth state from stored JWT
  useEffect(() => {
    const storedToken = getJWTToken();
    if (storedToken) {
      const decodedPayload = verifyAndDecodeJWT(storedToken);
      if (decodedPayload) {
        setToken(storedToken);
        setUser({
          id: decodedPayload.sub,
          name: decodedPayload.name,
          email: decodedPayload.email,
          role: decodedPayload.role,
          tier: decodedPayload.tier,
          avatar: decodedPayload.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        });
      } else {
        removeJWTToken();
      }
    }
  }, []);

  const openAuthModal = (tab = "login", onSuccessCallback = null) => {
    setAuthModalTab(tab);
    if (onSuccessCallback) {
      setPendingCallback(() => onSuccessCallback);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const setAuthSession = (userData) => {
    const jwt = generateMockJWT(userData);
    setToken(jwt);
    setUser(userData);
    saveJWTToken(jwt);
    toast.success(`Welcome back, ${userData.name.split(" ")[0]}!`);

    if (pendingCallback) {
      pendingCallback();
    }
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const loginWithEmail = (email, password) => {
    const clientUser = {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0].replace(".", " "),
      email,
      role: "client",
      tier: "Sugar VIP Guest",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };
    setAuthSession(clientUser);
  };

  const registerCustomer = (name, email, phone, password) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: "client",
      tier: "Sugar VIP Member",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    };
    setAuthSession(newUser);
  };

  const loginAsClient = (name = "Ananya Mehta", email = "ananya@example.com") => {
    const clientUser = {
      id: "usr-client-1",
      name,
      email,
      role: "client",
      tier: "Sugar VIP Luxe",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    };
    setAuthSession(clientUser);
  };

  const loginAsAdmin = () => {
    const adminUser = {
      id: "usr-admin-1",
      name: "Sugar Admin Manager",
      email: "admin@sugarsalon.in",
      role: "admin",
      tier: "Administrator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    };
    setAuthSession(adminUser);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeJWTToken();
    toast.success("Signed out successfully.");
  };

  const requireAuth = (callback) => {
    if (user && token) {
      callback();
    } else {
      toast.error("Please sign in to access this feature.");
      openAuthModal("login", callback);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        loginWithEmail,
        registerCustomer,
        loginAsClient,
        loginAsAdmin,
        logout,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        requireAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

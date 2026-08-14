import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
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
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const [pendingCallback, setPendingCallback] = useState(null);

  // Synchronize authentication state (Firebase Auth listener or Local Storage JWT)
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          const idToken = await fbUser.getIdToken();
          setToken(idToken);
          setUser({
            id: fbUser.uid,
            name: fbUser.displayName || fbUser.email.split("@")[0],
            email: fbUser.email,
            role: fbUser.email?.includes("admin") ? "admin" : "client",
            tier: fbUser.email?.includes("admin") ? "Administrator" : "Sugar VIP Member"
          });
        } else {
          setUser(null);
          setToken(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local storage fallback
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
            tier: decodedPayload.tier
          });
        } else {
          removeJWTToken();
        }
      }
      setLoading(false);
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

  const loginWithEmail = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        toast.success(`Signed in successfully!`);
        closeAuthModal();
        return res.user;
      } catch (err) {
        toast.error(`Authentication error: ${err.message}`);
        throw err;
      }
    } else {
      const clientUser = {
        id: `usr-${Date.now()}`,
        name: email.split("@")[0].replace(".", " "),
        email,
        role: email.includes("admin") ? "admin" : "client",
        tier: "Sugar VIP Guest"
      };
      setAuthSession(clientUser);
    }
  };

  const registerCustomer = async (name, email, phone, password) => {
    if (isFirebaseConfigured && auth) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
        closeAuthModal();
        return res.user;
      } catch (err) {
        toast.error(`Registration error: ${err.message}`);
        throw err;
      }
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        phone,
        role: "client",
        tier: "Sugar VIP Member"
      };
      setAuthSession(newUser);
    }
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        toast.success(`Signed in with Google as ${res.user.displayName}!`);
        closeAuthModal();
        return res.user;
      } catch (err) {
        toast.error(`Google Sign-In failed: ${err.message}`);
        throw err;
      }
    } else {
      loginAsClient("Google User", "google.user@example.com");
    }
  };

  const loginAsClient = (name = "Ananya Mehta", email = "ananya@example.com") => {
    const clientUser = {
      id: "usr-client-1",
      name,
      email,
      role: "client",
      tier: "Sugar VIP Luxe"
    };
    setAuthSession(clientUser);
  };

  const loginAsAdmin = () => {
    const adminUser = {
      id: "usr-admin-1",
      name: "Sugar Admin Manager",
      email: "sugarsalon6@gmail.com",
      role: "admin",
      tier: "Administrator"
    };
    setAuthSession(adminUser);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    setToken(null);
    removeJWTToken();
    toast.success("Signed out successfully.");
  };

  const requireAuth = (callback) => {
    if (user) {
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
        loading,
        isAdmin,
        isFirebaseConfigured,
        loginWithEmail,
        registerCustomer,
        loginWithGoogle,
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

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthModal } from "./components/auth/AuthModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <AuthModal />
          <AppRoutes />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
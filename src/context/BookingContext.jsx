import React, { createContext, useContext, useState, useEffect } from "react";
import { createAppointment } from "../services/appointmentService";
import { useAuth } from "../hooks/useAuth";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState(null);

  // Auto-populate user details when logged in with Google/Email
  useEffect(() => {
    if (user) {
      setClientDetails((prev) => ({
        ...prev,
        name: prev.name || user.name || user.displayName || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || ""
      }));
    }
  }, [user]);

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setSelectedAddons([]);
    setClientDetails({
      name: user?.name || user?.displayName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      notes: ""
    });
  };

  const startBookingForService = (service) => {
    setSelectedService(service);
    setBookingStep(2); // Jump straight to date & time selection
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.some((item) => item.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((item) => item.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const confirmBooking = async () => {
    if (
      !selectedService ||
      !selectedDate ||
      !selectedTimeSlot ||
      !clientDetails.name.trim() ||
      !clientDetails.phone.trim() ||
      !clientDetails.email.trim()
    ) {
      throw new Error("Name, Phone Number, and Email Address are all mandatory.");
    }

    const totalPrice =
      (selectedService?.price || 0) +
      selectedAddons.reduce((sum, item) => sum + item.price, 0);

    const bookingPayload = {
      clientName: clientDetails.name.trim(),
      clientEmail: clientDetails.email.trim(),
      clientPhone: clientDetails.phone.trim(),
      serviceTitle: selectedService.title,
      serviceId: selectedService.id || "",
      serviceImage: selectedService.image || "",
      stylistName: selectedStylist ? selectedStylist.name : "Master Specialist",
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      price: totalPrice,
      addons: selectedAddons.map((a) => a.title),
      notes: clientDetails.notes || "",
      userId: user?.id || user?.uid || "guest",
      isGoogleUser: Boolean(user)
    };

    const created = await createAppointment(bookingPayload);
    setLastConfirmedBooking(created);
    setBookingStep(4); // Confirmation screen
    return created;
  };

  return (
    <BookingContext.Provider
      value={{
        bookingStep,
        setBookingStep,
        selectedService,
        setSelectedService,
        selectedStylist,
        setSelectedStylist,
        selectedDate,
        setSelectedDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        selectedAddons,
        toggleAddon,
        clientDetails,
        setClientDetails,
        startBookingForService,
        confirmBooking,
        lastConfirmedBooking,
        resetBooking,
        currentUser: user
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);

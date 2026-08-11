import React, { createContext, useContext, useState } from "react";
import { createAppointment } from "../services/appointmentService";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
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

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate("");
    setSelectedTimeSlot("");
    setSelectedAddons([]);
    setClientDetails({ name: "", email: "", phone: "", notes: "" });
  };

  const startBookingForService = (service) => {
    setSelectedService(service);
    setBookingStep(2); // Jump straight to stylist / date selection
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.some((item) => item.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((item) => item.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const confirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTimeSlot || !clientDetails.name) {
      return null;
    }

    const totalPrice =
      (selectedService?.price || 0) +
      selectedAddons.reduce((sum, item) => sum + item.price, 0);

    const bookingPayload = {
      clientName: clientDetails.name,
      clientEmail: clientDetails.email,
      clientPhone: clientDetails.phone,
      serviceTitle: selectedService.title,
      stylistName: selectedStylist ? selectedStylist.name : "Any Available Specialist",
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      price: totalPrice,
      addons: selectedAddons.map((a) => a.title),
      notes: clientDetails.notes
    };

    const created = await createAppointment(bookingPayload);
    setLastConfirmedBooking(created);
    setBookingStep(5); // Confirmation screen
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
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);

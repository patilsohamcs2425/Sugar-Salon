import { MOCK_SERVICES, MOCK_FEEDBACK, INITIAL_APPOINTMENTS } from "../data/mockData";
import { getStoredItem, setStoredItem, generateAppointmentId } from "../utils/formatters";

const APPOINTMENTS_STORAGE_KEY = "sugar_salon_appointments";
const SERVICES_STORAGE_KEY = "sugar_salon_services";
const REVIEWS_STORAGE_KEY = "sugar_salon_reviews";

// Initialize Storage
export const initLocalStorageData = () => {
  if (!localStorage.getItem(APPOINTMENTS_STORAGE_KEY)) {
    setStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  }
  if (!localStorage.getItem(SERVICES_STORAGE_KEY)) {
    setStoredItem(SERVICES_STORAGE_KEY, MOCK_SERVICES);
  }
  if (!localStorage.getItem(REVIEWS_STORAGE_KEY)) {
    setStoredItem(REVIEWS_STORAGE_KEY, MOCK_FEEDBACK);
  }
};

export const getAppointments = () => {
  initLocalStorageData();
  return getStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
};

export const createAppointment = (appointmentData) => {
  initLocalStorageData();
  const currentList = getAppointments();
  const newAppointment = {
    id: generateAppointmentId(),
    status: "Confirmed",
    createdAt: new Date().toISOString().split("T")[0],
    ...appointmentData
  };
  const updatedList = [newAppointment, ...currentList];
  setStoredItem(APPOINTMENTS_STORAGE_KEY, updatedList);
  return newAppointment;
};

export const updateAppointmentStatus = (id, status) => {
  const currentList = getAppointments();
  const updated = currentList.map((apt) => (apt.id === id ? { ...apt, status } : apt));
  setStoredItem(APPOINTMENTS_STORAGE_KEY, updated);
  return updated;
};

export const getServices = () => {
  initLocalStorageData();
  return getStoredItem(SERVICES_STORAGE_KEY, MOCK_SERVICES);
};

export const getReviews = () => {
  initLocalStorageData();
  return getStoredItem(REVIEWS_STORAGE_KEY, MOCK_FEEDBACK);
};

export const addReview = (reviewData) => {
  initLocalStorageData();
  const currentReviews = getReviews();
  const newReview = {
    id: `fb-${Date.now()}`,
    date: "Just now",
    ...reviewData
  };
  const updated = [newReview, ...currentReviews];
  setStoredItem(REVIEWS_STORAGE_KEY, updated);
  return updated;
};

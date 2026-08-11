import { db, isFirebaseConfigured } from "../firebase/config";
import { collection, getDocs, doc, updateDoc, setDoc, query, orderBy } from "firebase/firestore";
import { MOCK_SERVICES, MOCK_FEEDBACK, INITIAL_APPOINTMENTS } from "../data/mockData";
import { getStoredItem, setStoredItem, generateAppointmentId } from "../utils/formatters";

const APPOINTMENTS_STORAGE_KEY = "sugar_salon_appointments";
const SERVICES_STORAGE_KEY = "sugar_salon_services";
const REVIEWS_STORAGE_KEY = "sugar_salon_reviews";

// Initialize Local Storage Fallback
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

// --- APPOINTMENTS ---

export const getAppointments = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const aptsCol = collection(db, "appointments");
      const q = query(aptsCol, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (list.length > 0) return list;
    } catch (err) {
      console.warn("Firestore getAppointments fallback to local:", err.message);
    }
  }
  initLocalStorageData();
  return getStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
};

export const createAppointment = async (appointmentData) => {
  const newAppointment = {
    id: generateAppointmentId(),
    status: "Confirmed",
    createdAt: new Date().toISOString().split("T")[0],
    ...appointmentData
  };

  if (isFirebaseConfigured && db) {
    try {
      const aptRef = doc(db, "appointments", newAppointment.id);
      await setDoc(aptRef, newAppointment);
    } catch (err) {
      console.warn("Firestore createAppointment error, saving locally:", err.message);
    }
  }

  initLocalStorageData();
  const currentList = getStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  const updatedList = [newAppointment, ...currentList];
  setStoredItem(APPOINTMENTS_STORAGE_KEY, updatedList);
  return newAppointment;
};

export const updateAppointmentStatus = async (id, status) => {
  if (isFirebaseConfigured && db) {
    try {
      const aptRef = doc(db, "appointments", id);
      await updateDoc(aptRef, { status });
    } catch (err) {
      console.warn("Firestore updateAppointmentStatus error:", err.message);
    }
  }

  const currentList = getStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  const updated = currentList.map((apt) => (apt.id === id ? { ...apt, status } : apt));
  setStoredItem(APPOINTMENTS_STORAGE_KEY, updated);
  return updated;
};

// --- SERVICES ---

export const getServices = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const servicesCol = collection(db, "services");
      const snapshot = await getDocs(servicesCol);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn("Firestore getServices fallback to local:", err.message);
    }
  }
  initLocalStorageData();
  return getStoredItem(SERVICES_STORAGE_KEY, MOCK_SERVICES);
};

// --- REVIEWS ---

export const getReviews = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const reviewsCol = collection(db, "reviews");
      const snapshot = await getDocs(reviewsCol);
      if (!snapshot.empty) {
        const rawList = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        const cleanList = rawList.flat().filter((item) => item && typeof item === "object" && item.author);
        if (cleanList.length > 0) return cleanList;
      }
    } catch (err) {
      console.warn("Firestore getReviews fallback to local:", err.message);
    }
  }
  initLocalStorageData();
  const stored = getStoredItem(REVIEWS_STORAGE_KEY, MOCK_FEEDBACK);
  const cleanList = (Array.isArray(stored) ? stored : MOCK_FEEDBACK)
    .flat()
    .filter((item) => item && typeof item === "object" && item.author);
  return cleanList.length > 0 ? cleanList : MOCK_FEEDBACK;
};

export const addReview = async (reviewData) => {
  const newReview = {
    id: `fb-${Date.now()}`,
    date: "Just now",
    ...reviewData
  };

  if (isFirebaseConfigured && db) {
    try {
      const reviewRef = doc(db, "reviews", newReview.id);
      await setDoc(reviewRef, newReview);
    } catch (err) {
      console.warn("Firestore addReview error, saving locally:", err.message);
    }
  }

  initLocalStorageData();
  const currentReviews = getStoredItem(REVIEWS_STORAGE_KEY, MOCK_FEEDBACK);
  const validCurrent = (Array.isArray(currentReviews) ? currentReviews : MOCK_FEEDBACK)
    .flat()
    .filter((item) => item && typeof item === "object" && item.author);

  const updated = [newReview, ...validCurrent];
  setStoredItem(REVIEWS_STORAGE_KEY, updated);
  return newReview;
};

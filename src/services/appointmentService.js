import { db, isFirebaseConfigured } from "../firebase/config";
import { collection, getDocs, doc, setDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { MOCK_SERVICES, INITIAL_APPOINTMENTS } from "../data/mockData";
import { getStoredItem, setStoredItem, generateAppointmentId } from "../utils/formatters";

const APPOINTMENTS_STORAGE_KEY = "sugar_salon_appointments";
const SERVICES_STORAGE_KEY = "sugar_salon_services";
const USER_REVIEWS_STORAGE_KEY = "sugar_salon_user_reviews";

// Initialize Local Storage Fallback
export const initLocalStorageData = () => {
  if (!localStorage.getItem(APPOINTMENTS_STORAGE_KEY)) {
    setStoredItem(APPOINTMENTS_STORAGE_KEY, INITIAL_APPOINTMENTS);
  }
  const currentStoredServices = getStoredItem(SERVICES_STORAGE_KEY, []);
  if (!localStorage.getItem(SERVICES_STORAGE_KEY) || (Array.isArray(currentStoredServices) && currentStoredServices.length !== MOCK_SERVICES.length)) {
    setStoredItem(SERVICES_STORAGE_KEY, MOCK_SERVICES);
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
        return snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((item) => item && typeof item === "object" && item.author);
      }
    } catch (err) {
      console.warn("Firestore getReviews error:", err.message);
    }
  }
  const userSubmitted = getStoredItem(USER_REVIEWS_STORAGE_KEY, []);
  return Array.isArray(userSubmitted) ? userSubmitted.filter((r) => r && r.author) : [];
};

/**
 * Real-time listener for Firebase/Firestore website reviews.
 */
export const subscribeToFirebaseReviews = (onUpdate, onError) => {
  if (isFirebaseConfigured && db) {
    try {
      const reviewsCol = collection(db, "reviews");
      const unsubscribe = onSnapshot(
        reviewsCol,
        (snapshot) => {
          const list = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((item) => item && typeof item === "object" && item.author);
          
          // Sort newest first
          list.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          });

          onUpdate(list);
        },
        (err) => {
          console.warn("Firestore onSnapshot error for reviews:", err.message);
          if (onError) onError(err);
          // Fallback to one-time local/firestore fetch
          getReviews().then(onUpdate);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn("Error setting up Firestore listener:", err.message);
      if (onError) onError(err);
    }
  }

  // If Firebase is not configured, fall back to local storage user reviews
  getReviews().then(onUpdate);
  return () => {};
};

export const addReview = async (reviewData) => {
  const now = new Date().toISOString();
  const newReview = {
    id: `fb-${Date.now()}`,
    createdAt: now,
    date: "Just now",
    isWebsiteReview: true,
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

  const currentLocal = getStoredItem(USER_REVIEWS_STORAGE_KEY, []);
  const validCurrent = Array.isArray(currentLocal) ? currentLocal : [];
  const updated = [newReview, ...validCurrent];
  setStoredItem(USER_REVIEWS_STORAGE_KEY, updated);
  return newReview;
};


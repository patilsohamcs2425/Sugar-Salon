import { db, isFirebaseConfigured } from "../firebase/config";
import { collection, getDocs, doc, setDoc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { MOCK_SERVICES, INITIAL_APPOINTMENTS } from "../data/mockData";
import { getStoredItem, setStoredItem, generateAppointmentId } from "../utils/formatters";

const APPOINTMENTS_STORAGE_KEY = "sugar_salon_appointments";
const SERVICES_STORAGE_KEY = "sugar_salon_services_v2";
const USER_REVIEWS_STORAGE_KEY = "sugar_salon_user_reviews";

// Initialize Local Storage Fallback
export const initLocalStorageData = () => {
  if (!localStorage.getItem(APPOINTMENTS_STORAGE_KEY)) {
    setStoredItem(APPOINTMENTS_STORAGE_KEY, []);
  }
  setStoredItem(SERVICES_STORAGE_KEY, MOCK_SERVICES);
};

// Filter helper to ensure no legacy mock items pollute the real customer queue
const filterRealAppointments = (list) => {
  if (!Array.isArray(list)) return [];
  const fakeIds = ["APT-8821", "APT-8822", "APT-8823"];
  return list.filter((apt) => apt && !fakeIds.includes(apt.id));
};

// --- APPOINTMENTS ---

export const getAppointments = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const aptsCol = collection(db, "appointments");
      const snapshot = await getDocs(aptsCol);
      if (!snapshot.empty) {
        const list = snapshot.docs.map((d) => ({ id: d.id, referenceId: d.id, ...d.data() }));
        list.sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
        const realOnly = filterRealAppointments(list);
        setStoredItem(APPOINTMENTS_STORAGE_KEY, realOnly);
        return realOnly;
      }
    } catch (err) {
      console.warn("Firestore getAppointments error, using local queue:", err.message);
    }
  }
  initLocalStorageData();
  const localList = getStoredItem(APPOINTMENTS_STORAGE_KEY, []);
  return filterRealAppointments(localList);
};

/**
 * Real-time listener for live customer bookings in Firebase Firestore.
 */
export const subscribeToFirebaseAppointments = (onUpdate, onError) => {
  if (isFirebaseConfigured && db) {
    try {
      const aptsCol = collection(db, "appointments");
      const unsubscribe = onSnapshot(
        aptsCol,
        (snapshot) => {
          const list = snapshot.docs.map((d) => ({ id: d.id, referenceId: d.id, ...d.data() }));
          list.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          });
          const realList = filterRealAppointments(list);
          setStoredItem(APPOINTMENTS_STORAGE_KEY, realList);
          onUpdate(realList);
        },
        (err) => {
          console.warn("Firestore onSnapshot error for appointments:", err.message);
          if (onError) onError(err);
          getAppointments().then(onUpdate);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn("Error setting up Firestore appointments listener:", err.message);
      if (onError) onError(err);
    }
  }

  // Fallback to local storage
  getAppointments().then(onUpdate);
  return () => {};
};

export const createAppointment = async (appointmentData) => {
  const refId = generateAppointmentId();
  const now = new Date().toISOString();
  
  const newAppointment = {
    id: refId,
    referenceId: refId,
    status: "Confirmed",
    createdAt: now,
    createdDate: now.split("T")[0],
    ...appointmentData
  };

  if (isFirebaseConfigured && db) {
    try {
      const aptRef = doc(db, "appointments", newAppointment.id);
      await setDoc(aptRef, newAppointment);
      console.log("Real appointment persisted to Firestore:", newAppointment.id);
    } catch (err) {
      console.warn("Firestore setDoc warning, cached locally:", err.message);
    }
  }

  initLocalStorageData();
  const currentList = filterRealAppointments(getStoredItem(APPOINTMENTS_STORAGE_KEY, []));
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

  const currentList = filterRealAppointments(getStoredItem(APPOINTMENTS_STORAGE_KEY, []));
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

// --- INQUIRIES ---
const INQUIRIES_STORAGE_KEY = "sugar_salon_inquiries";

export const addInquiry = async (inquiryData) => {
  const now = new Date().toISOString();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    createdAt: now,
    status: "New",
    ...inquiryData
  };

  if (isFirebaseConfigured && db) {
    try {
      const inqRef = doc(db, "inquiries", newInquiry.id);
      await setDoc(inqRef, newInquiry);
    } catch (err) {
      console.warn("Firestore addInquiry error, saving locally:", err.message);
    }
  }

  const currentLocal = getStoredItem(INQUIRIES_STORAGE_KEY, []);
  const validCurrent = Array.isArray(currentLocal) ? currentLocal : [];
  const updated = [newInquiry, ...validCurrent];
  setStoredItem(INQUIRIES_STORAGE_KEY, updated);
  return newInquiry;
};

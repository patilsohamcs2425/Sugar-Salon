import { useState, useEffect } from "react";
import { subscribeToFirebaseReviews } from "../services/appointmentService";
import { fetchGoogleReviews } from "../services/googleReviewsService";

export const useUnifiedReviews = () => {
  const [googleData, setGoogleData] = useState({
    loading: true,
    success: false,
    error: null,
    rating: 0,
    userRatingCount: 0,
    reviews: []
  });

  const [firebaseReviews, setFirebaseReviews] = useState([]);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  // 1. Fetch official Google Reviews
  useEffect(() => {
    let isMounted = true;
    fetchGoogleReviews().then((res) => {
      if (!isMounted) return;
      if (res.success) {
        setGoogleData({
          loading: false,
          success: true,
          error: null,
          rating: res.rating,
          userRatingCount: res.userRatingCount,
          reviews: res.reviews || [],
          googleMapsUrl: res.googleMapsUrl
        });
      } else {
        setGoogleData({
          loading: false,
          success: false,
          error: res.error,
          code: res.code,
          rating: 0,
          userRatingCount: 0,
          reviews: []
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Real-time Firebase Listener
  useEffect(() => {
    setFirebaseLoading(true);
    const unsubscribe = subscribeToFirebaseReviews(
      (reviews) => {
        setFirebaseReviews(reviews || []);
        setFirebaseLoading(false);
      },
      (err) => {
        console.warn("Firebase reviews error:", err);
        setFirebaseLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // Combine Google and Firebase reviews
  const combinedReviews = [...googleData.reviews, ...firebaseReviews];

  // Deduplicate reviews with identical author & comment snippet
  const uniqueReviews = [];
  const seenKeys = new Set();

  for (const rev of combinedReviews) {
    const key = `${(rev.author || "").toLowerCase().trim()}_${(rev.comment || "").substring(0, 30).toLowerCase().trim()}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueReviews.push(rev);
    }
  }

  // Sort newest first
  uniqueReviews.sort((a, b) => {
    const timeA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
    const timeB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
    return timeB - timeA;
  });

  // Calculate Website Stats
  const websiteCount = firebaseReviews.length;
  const websiteAvgRating =
    websiteCount > 0
      ? (firebaseReviews.reduce((acc, r) => acc + (r.rating || 5), 0) / websiteCount).toFixed(1)
      : 0;

  return {
    combinedReviews: uniqueReviews,
    googleData,
    firebaseReviews,
    websiteStats: {
      count: websiteCount,
      rating: websiteAvgRating
    },
    isLoading: googleData.loading && firebaseLoading
  };
};

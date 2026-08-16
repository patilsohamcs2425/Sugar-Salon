import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import { HomePage } from "../pages/Home/HomePage";
import { AboutPage } from "../pages/About/AboutPage";
import { ServicesPage } from "../pages/Services/ServicesPage";
import { RecommendationPage } from "../pages/Recommendation/RecommendationPage";
import { AppointmentPage } from "../pages/Appointment/AppointmentPage";
import { GalleryPage } from "../pages/Gallery/GalleryPage";
import { OffersPage } from "../pages/Offers/OffersPage";
import { ContactPage } from "../pages/Contact/ContactPage";
import { FeedbackPage } from "../pages/Feedback/FeedbackPage";
import { AuthPage } from "../pages/Auth/AuthPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Storefront Routes wrapped in MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/services"
        element={
          <MainLayout>
            <ServicesPage />
          </MainLayout>
        }
      />
      <Route
        path="/recommendation"
        element={
          <MainLayout>
            <RecommendationPage />
          </MainLayout>
        }
      />
      <Route
        path="/appointment"
        element={
          <MainLayout>
            <AppointmentPage />
          </MainLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <MainLayout>
            <GalleryPage />
          </MainLayout>
        }
      />
      <Route
        path="/offers"
        element={
          <MainLayout>
            <OffersPage />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        }
      />
      <Route
        path="/feedback"
        element={
          <MainLayout>
            <FeedbackPage />
          </MainLayout>
        }
      />
      <Route
        path="/auth"
        element={
          <MainLayout>
            <AuthPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

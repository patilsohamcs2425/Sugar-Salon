# Sugar Salon – Smart Salon Recommendation & Management System

Sugar Salon is a web application designed for a premier unisex beauty salon and organic sugar care lounge located in Marol, Andheri East, Mumbai.

---

## 🌟 Key Features

### Storefront & Client Experience
- **Interactive Service Catalog**: Explore multi-category treatments including Organic Sugar Waxing, O3+ Clinical Facials, De-Tan & Bleach, Spa Manicure/Pedicure, and Bridal Packages.
- **Smart AI Recommendation Quiz**: Personalized 3-question matchmaker to discover optimal treatments tailored to skin sensitivity and occasion.
- **Instant Appointment Booking**: 4-step booking workflow with date/time selection (11:00 AM – 9:00 PM), optional add-ons, client validation, dynamic pricing, and digital QR code reference passes.
- **Unified Review Aggregator**: Combines official Google Maps reviews with real-time customer feedback stored in Firebase Firestore.
- **Direct Concierge Channels**: Integrated WhatsApp direct messaging, telephone hotline, and concierge inquiry forms.
- **Member Authentication**: Client and VIP account portal supporting Email/Password and Google OAuth authentication with JWT session helpers.

### Executive Administration Suite
- **Live Appointment Queue**: Real-time Firestore synchronization for customer bookings with status tracking (Confirmed, Pending, Completed).
- **Revenue & Category Analytics**: Visual performance metrics and category share distribution powered by Recharts.
- **Role-Based Route Protection**: Dedicated administrative route authorization and access restriction.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend & Database**: Firebase Firestore (NoSQL), Firebase Authentication
- **Routing & State**: React Router DOM, React Context API
- **Utilities**: Recharts, React Hot Toast, React QR Code

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd "Sugar Salon/sugar-salon"

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in `sugar-salon/` using `.env.example` as reference:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Development Server
```bash
npm run dev
```

### 5. Production Build
```bash
npm run build
```

---

## 🏛️ Project Structure

```
sugar-salon/
├── src/
│   ├── assets/         # Brand logos, photography, and icons
│   ├── components/     # Reusable UI components, cards, forms, and common elements
│   ├── constants/      # Business information, navigation links, stylist profiles
│   ├── context/        # Auth and Booking React Context providers
│   ├── data/           # Structured salon service catalog and mock datasets
│   ├── firebase/       # Firebase initialization and configuration
│   ├── hooks/          # Custom React hooks (useAuth, useBooking, useUnifiedReviews)
│   ├── layouts/        # Main storefront and admin dashboard layouts
│   ├── pages/          # Application page views (Home, Services, Appointment, etc.)
│   ├── routes/         # Routing configurations and admin route guards
│   ├── services/       # Firestore database and Google Reviews service layers
│   └── utils/          # Currency formatters, ID generators, and JWT helpers
├── firestore.rules     # Cloud Firestore security rules
└── vite.config.js      # Vite configuration
```

---

## 📄 License
Private & Proprietary – Sugar Salon, Marol, Mumbai.

# 🔥 Firebase Backend Setup Guide for Sugar Salon

Your Sugar Salon application is now fully configured with a **hybrid Firebase backend system**. 

- **When Firebase keys are present in `.env`**: The app connects directly to live Firebase Firestore and Firebase Authentication.
- **When Firebase keys are missing/blank**: The app automatically runs in local storage mode using mock data, allowing instant testing without crashing.

---

## 🚀 How to Set Up Your Free Firebase Project (5 Minutes)

### Step 1: Create a Project on Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click **"Add project"** (or **"Create a project"**).
3. Enter Project Name: `Sugar Salon` (or any name you prefer).
4. (Optional) Disable Google Analytics or keep defaults, then click **Create project**.

---

### Step 2: Register Web App & Get API Credentials
1. In your project dashboard, click the **Web icon (`</>`)** under *"Get started by adding Firebase to your app"*.
2. Enter App nickname: `Sugar Salon Web`.
3. Click **Register app** (no need to check Firebase Hosting for now).
4. You will see a `firebaseConfig` object containing:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

### Step 3: Copy Credentials to `.env`
Open the `.env` file located at `sugar-salon/.env` in your code editor and paste your credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyYourActualApiKeyHere
VITE_FIREBASE_AUTH_DOMAIN=your-app-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app-id
VITE_FIREBASE_STORAGE_BUCKET=your-app-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

---

### Step 4: Enable Firestore Database
1. In the Firebase Console left sidebar, click **Build** -> **Firestore Database**.
2. Click **Create database**.
3. Choose location (e.g. `asia-south1` for India / Mumbai or closest to your clients).
4. Select **Start in test mode** (allows read/write during development) and click **Create**.

---

### Step 5: Enable Authentication
1. In the left sidebar, click **Build** -> **Authentication**.
2. Click **Get started**.
3. Under **Sign-in method**, enable:
   - **Email/Password**: Turn on **Enable** and click **Save**.
   - **Google**: Turn on **Enable**, choose your support email, and click **Save**.

---

## 🎉 You're All Set!

Restart your Vite dev server (`npm run dev` in `sugar-salon`) after saving `.env`. Sugar Salon will automatically connect to your live Firebase backend!

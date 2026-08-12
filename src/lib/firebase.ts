import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9UgR4BiYzqEQxe0eJPBP1zK_bZQHJayU",
  authDomain: "heartview-a5908.firebaseapp.com",
  projectId: "heartview-a5908",
  storageBucket: "heartview-a5908.firebasestorage.app",
  messagingSenderId: "1060260729053",
  appId: "1:1060260729053:web:d2166892a7017a45d78b34",
  measurementId: "G-JYXHGBWQVM",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export { app };

// Firebase Cloud Messaging - Web
// Firebase Cloud Messaging - Web
export const getFirebaseMessaging = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const messagingModule = await import("firebase/messaging");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { getMessaging, isSupported } = messagingModule as any;
    
    const supported = await isSupported();
    if (!supported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return null;
    }

    return getMessaging(app);
  } catch (error) {
    console.error(
      "Firebase Messaging initialization failed:",
      error
    );

    return null;
  }
};
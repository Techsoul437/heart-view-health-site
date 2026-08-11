import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD9UgR4BiYzqEQxe0eJPBP1zK_bZQHJayU",
  authDomain: "heartview-a5908.firebaseapp.com",
  projectId: "heartview-a5908",
  storageBucket: "heartview-a5908.firebasestorage.app",
  messagingSenderId: "1060260729053",
  appId: "1:1060260729053:web:d2166892a7017a45d78b34",
  measurementId: "G-JYXHGBWQVM"
};
console.log({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

import { getFirestore } from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);

export { app };

// Messaging (Web)
export const getFirebaseMessaging = async () => {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();

  if (!supported) return null;

  return getMessaging(app);
};
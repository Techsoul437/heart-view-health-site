import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";

export const requestNotificationPermission = async () => {
  try {
    if (typeof window === "undefined") return null;

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      console.log("Firebase messaging not initialized");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      // ✅ Save token in localStorage
      localStorage.setItem("fcmToken", token);

      console.log("FCM Token:", token);
    } else {
      console.log("No FCM token received");
    }

    return token;
  } catch (err) {
    console.error("FCM Token Error:", err);
    return null;
  }
};
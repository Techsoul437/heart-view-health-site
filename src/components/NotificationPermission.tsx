"use client";

import { useEffect } from "react";
import { requestNotificationPermission } from "@/lib/firebaseMessaging";

export default function NotificationPermission() {
 useEffect(() => {
  console.log("Notification Component Mounted");

  const init = async () => {
    console.log("Register SW");

    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    }

    console.log("Calling requestNotificationPermission");

    const token = await requestNotificationPermission();

    console.log("Generated Token:", token);
  };

  init();
}, []);

  return null;
}
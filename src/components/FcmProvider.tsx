"use client";

import { useEffect } from "react";
import { requestNotificationPermission } from "../lib/firebaseMessaging";

export default function FcmProvider() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return null;
}
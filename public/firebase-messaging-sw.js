importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD9UgR4BiYzqEQxe0eJPBP1zK_bZQHJayU",
  authDomain: "heartview-a5908.firebaseapp.com",
  projectId: "heartview-a5908",
  storageBucket: "heartview-a5908.firebasestorage.app",
  messagingSenderId: "1060260729053",
  appId: "1:1060260729053:web:d2166892a7017a45d78b34",
  measurementId: "G-JYXHGBWQVM",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  
  const notificationTitle = payload.notification?.title || "HeartView Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: payload.notification?.image || "/favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

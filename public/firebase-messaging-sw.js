importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD9UgR4BiYzqEQxe0eJPBP1zK_bZQHJayU",
  authDomain: "heartview-a5908.firebaseapp.com",
  projectId: "heartview-a5908",
  storageBucket: "heartview-a5908.firebasestorage.app",
  messagingSenderId: "1060260729053",
  appId: "1:1060260729053:web:d2166892a7017a45d78b34",
});

const messaging = firebase.messaging();
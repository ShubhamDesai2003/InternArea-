import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0B-Ax6dQoQKouFrwcBmPeD2KUu5ICi0M",
  authDomain: "internship-24c42.firebaseapp.com",
  projectId: "internship-24c42",
  storageBucket: "internship-24c42.firebasestorage.app",
  messagingSenderId: "1066994772033",
  appId: "1:1066994772033:web:ac04827ddb5f919b8dfec0",
  measurementId: "G-JSCV1PJYB0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

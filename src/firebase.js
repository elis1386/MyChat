import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgvjvM-hTr-kob5xtBGB4NXv_80g5Uu5o",
    authDomain: "mychat-react-5177e.firebaseapp.com",
    projectId: "mychat-react-5177e",
    storageBucket: "mychat-react-5177e.appspot.com",
    messagingSenderId: "824844596253",
    appId: "1:824844596253:web:6646170956df941d6c42f4"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()


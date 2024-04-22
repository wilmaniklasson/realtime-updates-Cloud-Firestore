// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFh0pVYRaQvxdZ53JXA0EJxL_o41b9ws4",
  authDomain: "anonym-chat-app.firebaseapp.com",
  projectId: "anonym-chat-app",
  storageBucket: "anonym-chat-app.appspot.com",
  messagingSenderId: "1078608969657",
  appId: "1:1078608969657:web:66ec3d1458d6902d034068"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

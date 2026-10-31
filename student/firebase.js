import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const watchWeekly = (cb,err=console.error) => onSnapshot(collection(db,"weeklySchedule"),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),err);
export const watchHomework = (cb,err=console.error) => onSnapshot(collection(db,"homework"),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),err);

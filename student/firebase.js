import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCkpDy-1GI-pNzlg5qp3ZnrylnAwV7Pt8",
  authDomain: "school75-674b1.firebaseapp.com",
  projectId: "school75-674b1",
  storageBucket: "school75-674b1.firebasestorage.app",
  messagingSenderId: "707344234052",
  appId: "1:707344234052:web:6b1ca26babc5918c462e11"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const watchWeekly = (cb,err=console.error) => onSnapshot(collection(db,"weeklySchedule"),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),err);
export const watchHomework = (cb,err=console.error) => onSnapshot(collection(db,"homework"),s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),err);

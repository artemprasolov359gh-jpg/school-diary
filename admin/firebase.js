import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const weeklyRef = collection(db, "weeklySchedule");
const homeworkRef = collection(db, "homework");
export const watchWeekly = (cb, err=console.error) => onSnapshot(weeklyRef, s => cb(s.docs.map(d=>({id:d.id,...d.data()}))), err);
export const watchHomework = (cb, err=console.error) => onSnapshot(homeworkRef, s => cb(s.docs.map(d=>({id:d.id,...d.data()}))), err);
export const addWeekly = data => addDoc(weeklyRef, {...data, createdAt:serverTimestamp()});
export const updateWeekly = (id,data) => updateDoc(doc(db,"weeklySchedule",id),data);
export const deleteWeekly = id => deleteDoc(doc(db,"weeklySchedule",id));
export const addHomework = data => addDoc(homeworkRef, {...data, createdAt:serverTimestamp()});
export const updateHomework = (id,data) => updateDoc(doc(db,"homework",id),data);
export const deleteHomework = id => deleteDoc(doc(db,"homework",id));
export const login = (email,password) => signInWithEmailAndPassword(auth,email,password);
export const logout = () => signOut(auth);
export { onAuthStateChanged };

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCkpDy-1GI-pNzlg5qp3ZnrylnAwV7Pt8",
  authDomain: "school75-674b1.firebaseapp.com",
  projectId: "school75-674b1",
  storageBucket: "school75-674b1.firebasestorage.app",
  messagingSenderId: "707344234052",
  appId: "1:707344234052:web:6b1ca26babc5918c462e11"
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

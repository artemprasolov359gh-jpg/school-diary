import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
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
const ref = collection(db, "lessons");

export const watchLessons = (callback, onError = console.error) =>
  onSnapshot(query(ref, orderBy("date"), orderBy("start")), snap =>
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))), onError);
export const addLesson = data => addDoc(ref, {...data, createdAt: serverTimestamp()});
export const updateLesson = (id, data) => updateDoc(doc(db, "lessons", id), data);
export const deleteLesson = id => deleteDoc(doc(db, "lessons", id));
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export { onAuthStateChanged };

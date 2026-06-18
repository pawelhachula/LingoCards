// src/firebase.js
// Firebase konfiguracja — używa zmiennych środowiskowych z .env
// Uzupełnij plik .env.local swoimi danymi z Firebase Console

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  deleteUser
} from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PLACEHOLDER_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "PLACEHOLDER_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "PLACEHOLDER_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "PLACEHOLDER_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "PLACEHOLDER_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "PLACEHOLDER_APP_ID"
};

export const isFirebaseConfigured =
  firebaseConfig.apiKey && firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY";

let app, auth, db, googleProvider;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
}

export { auth, db, googleProvider, onAuthStateChanged };

// ─── Logowanie przez Google ───────────────────────────────────────────────────
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return {
    uid: user.uid,
    username: user.displayName || user.email.split("@")[0],
    email: user.email,
    avatar: "👑",
    isGoogle: true
  };
};

// ─── Powiadomienie dla admina ───────────────────────────────────────────────────
export const sendAdminNotification = async (userEmail, username) => {
  try {
    if (!isFirebaseConfigured) return;
    await addDoc(collection(db, "admin_notifications"), {
      type: "new_user",
      email: userEmail,
      username: username || "Nowy uczeń",
      createdAt: serverTimestamp(),
      isRead: false
    });
  } catch (error) {
    console.error("Błąd wysyłania powiadomienia do admina:", error);
  }
};

// ─── Rejestracja emailem ──────────────────────────────────────────────────────
export const registerWithEmail = async (email, password, username, avatar) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  // Zapisz displayName w Firebase Auth
  await updateProfile(user, { displayName: username });
  
  // Wyślij powiadomienie
  await sendAdminNotification(user.email, username);
  
  return {
    uid: user.uid,
    username: username,
    email: user.email,
    avatar: avatar || "👑",
    isGoogle: false
  };
};

// ─── Logowanie emailem ────────────────────────────────────────────────────────
export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  return {
    uid: user.uid,
    username: user.displayName || user.email.split("@")[0],
    email: user.email,
    avatar: "👑",
    isGoogle: false
  };
};

// ─── Wylogowanie ──────────────────────────────────────────────────────────────
export const signOutUser = async () => {
  if (auth) await signOut(auth);
};

// ─── Usunięcie konta ────────────────────────────────────────────────────────────
export const deleteUserAccount = async () => {
  if (auth && auth.currentUser) {
    await deleteUser(auth.currentUser);
  }
};

export default app;

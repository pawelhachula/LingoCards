// src/hooks/useFirestore.js
// Centralny hook do synchronizacji danych z Firebase Firestore
// Automatycznie używa localStorage jako fallback gdy Firebase nie jest skonfigurowany

import { useCallback } from "react";
import { isFirebaseConfigured, db } from "../firebase";

// Dynamiczny import Firestore operations — unikamy błędów gdy db jest undefined
const getFirestoreOps = () => {
  if (!isFirebaseConfigured || !db) return null;
  return import("firebase/firestore").then(({ doc, getDoc, setDoc, updateDoc }) => ({
    doc, getDoc, setDoc, updateDoc
  }));
};

/**
 * Hook zwraca funkcje do save/load danych użytkownika.
 * Gdy Firebase jest skonfigurowany → Firestore
 * Gdy nie → localStorage (tryb offline)
 */
export function useFirestore() {

  /**
   * Zapisz statystyki użytkownika
   * @param {string} uid - Firebase UID lub username
   * @param {object} stats - obiekt statystyk
   */
  const saveStats = useCallback(async (uid, stats) => {
    // Zawsze zapisuj lokalnie jako cache
    const key = `lingocards_stats_${uid.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(stats));

    // Zapisz do Firestore jeśli dostępny
    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", uid, "data", "stats"), stats, { merge: true });
      } catch (e) {
        console.warn("[Firestore] saveStats failed, using localStorage only:", e.message);
      }
    }
  }, []);

  /**
   * Załaduj statystyki użytkownika
   * @param {string} uid - Firebase UID lub username
   * @returns {object|null} stats lub null
   */
  const loadStats = useCallback(async (uid) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, "users", uid, "data", "stats"));
        if (snap.exists()) {
          const data = snap.data();
          // Cache lokalnie
          const key = `lingocards_stats_${uid.toLowerCase()}`;
          localStorage.setItem(key, JSON.stringify(data));
          return data;
        }
      } catch (e) {
        console.warn("[Firestore] loadStats failed, falling back to localStorage:", e.message);
      }
    }
    // Fallback: localStorage
    const key = `lingocards_stats_${uid.toLowerCase()}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }, []);

  /**
   * Zapisz talie użytkownika
   * @param {string} uid - Firebase UID lub username
   * @param {Array} decks - tablica talii
   */
  const saveDecks = useCallback(async (uid, decks) => {
    // Zawsze localStorage cache
    const key = `lingocards_decks_${uid.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(decks));

    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", uid, "data", "decks"), { decks }, { merge: false });
      } catch (e) {
        console.warn("[Firestore] saveDecks failed, using localStorage only:", e.message);
      }
    }
  }, []);

  /**
   * Załaduj talie użytkownika
   * @param {string} uid - Firebase UID lub username
   * @returns {Array|null}
   */
  const loadDecks = useCallback(async (uid) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, "users", uid, "data", "decks"));
        if (snap.exists()) {
          const data = snap.data();
          const decks = data.decks || [];
          // Cache lokalnie
          const key = `lingocards_decks_${uid.toLowerCase()}`;
          localStorage.setItem(key, JSON.stringify(decks));
          return decks;
        }
      } catch (e) {
        console.warn("[Firestore] loadDecks failed, falling back to localStorage:", e.message);
      }
    }
    // Fallback: localStorage
    const key = `lingocards_decks_${uid.toLowerCase()}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }, []);

  /**
   * Zapisz ustawienia użytkownika (activeDeckIds, theme, audioStyle, itp.)
   */
  const saveSettings = useCallback(async (uid, settings) => {
    const key = `lingocards_settings_${uid.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(settings));

    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", uid, "data", "settings"), settings, { merge: true });
      } catch (e) {
        console.warn("[Firestore] saveSettings failed:", e.message);
      }
    }
  }, []);

  /**
   * Załaduj ustawienia użytkownika
   */
  const loadSettings = useCallback(async (uid) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, "users", uid, "data", "settings"));
        if (snap.exists()) {
          return snap.data();
        }
      } catch (e) {
        console.warn("[Firestore] loadSettings failed:", e.message);
      }
    }
    const key = `lingocards_settings_${uid.toLowerCase()}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }, []);

  /**
   * Profil użytkownika (username, avatar, email)
   */
  const saveProfile = useCallback(async (uid, profile) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", uid, "data", "profile"), profile, { merge: true });
      } catch (e) {
        console.warn("[Firestore] saveProfile failed:", e.message);
      }
    }
    // Saved locally via currentUser in localStorage
  }, []);

  return {
    saveStats,
    loadStats,
    saveDecks,
    loadDecks,
    saveSettings,
    loadSettings,
    saveProfile,
  };
}

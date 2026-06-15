// src/hooks/useFirestore.js
// Centralny hook do synchronizacji danych z Firebase Firestore
// Automatycznie używa localStorage jako fallback gdy Firebase nie jest skonfigurowany

import { useCallback } from "react";
import { isFirebaseConfigured, db } from "../firebase";

// Dynamiczny import Firestore operations — unikamy błędów gdy db jest undefined
const getFirestoreOps = () => {
  if (!isFirebaseConfigured || !db) return null;
  return import("firebase/firestore").then(({ doc, getDoc, setDoc, updateDoc, deleteDoc }) => ({
    doc, getDoc, setDoc, updateDoc, deleteDoc
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
        const cleanStats = JSON.parse(JSON.stringify(stats));
        await setDoc(doc(db, "users", uid, "data", "stats"), cleanStats);
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

  /**
   * Synchronizuje metadane użytkownika na poziomie głównym users/{uid}
   */
  const syncUserMeta = useCallback(async (uid, meta) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "users", uid), meta, { merge: true });
      } catch (e) {
        console.warn("[Firestore] syncUserMeta failed:", e.message);
      }
    }
  }, []);

  /**
   * Pobiera wszystkich użytkowników z kolekcji głównej users (dla rankingu)
   */
  const loadAllUsers = useCallback(async () => {
    if (isFirebaseConfigured && db) {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const snap = await getDocs(collection(db, "users"));
        const results = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        console.log(`[Firestore] loadAllUsers: found ${results.length} user documents`);
        return results;
      } catch (e) {
        console.error("[Firestore] loadAllUsers failed:", e.message, e);
      }
    } else {
      console.warn("[Firestore] loadAllUsers skipped — isFirebaseConfigured:", isFirebaseConfigured, "db:", !!db);
    }
    return [];
  }, []);

  /**
   * Aktualizuje pola w dokumencie głównym users/{uid}
   */
  const updateUserField = useCallback(async (uid, fields) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, updateDoc } = await import("firebase/firestore");
        await updateDoc(doc(db, "users", uid), fields);
      } catch (e) {
        console.warn("[Firestore] updateUserField failed:", e.message);
      }
    }
  }, []);

  /**
   * Wysyła powiadomienie systemowe do wybranego użytkownika
   */
  const sendSystemNotification = useCallback(async (uid, notification) => {
    if (isFirebaseConfigured && db) {
      try {
        const { collection, addDoc } = await import("firebase/firestore");
        await addDoc(collection(db, "users", uid, "notifications"), {
          ...notification,
          createdAt: Date.now(),
          read: false
        });
      } catch (e) {
        console.warn("[Firestore] sendSystemNotification failed:", e.message);
      }
    }
  }, []);

  /**
   * Pobiera wszystkie powiadomienia dla zalogowanego użytkownika
   */
  const loadNotifications = useCallback(async (uid) => {
    if (isFirebaseConfigured && db) {
      try {
        const { collection, getDocs, query, orderBy } = await import("firebase/firestore");
        const ref = collection(db, "users", uid, "notifications");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn("[Firestore] loadNotifications failed:", e.message);
      }
    }
    return [];
  }, []);

  /**
   * Oznacza powiadomienie jako przeczytane
   */
  const markNotificationAsRead = useCallback(async (uid, notificationId) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, updateDoc } = await import("firebase/firestore");
        await updateDoc(doc(db, "users", uid, "notifications", notificationId), { read: true });
      } catch (e) {
        console.warn("[Firestore] markNotificationAsRead failed:", e.message);
      }
    }
  }, []);

  /**
   * Usuwa powiadomienie z podkolekcji użytkownika
   */
  const deleteNotification = useCallback(async (uid, notificationId) => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, deleteDoc } = await import("firebase/firestore");
        await deleteDoc(doc(db, "users", uid, "notifications", notificationId));
      } catch (e) {
        console.warn("[Firestore] deleteNotification failed:", e.message);
      }
    }
  }, []);

  /**
   * Pobiera konfigurację globalną systemu
   */
  const loadSystemConfig = useCallback(async () => {
    if (isFirebaseConfigured && db) {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, "config", "system"));
        if (snap.exists()) {
          return snap.data();
        }
      } catch (e) {
        console.warn("[Firestore] loadSystemConfig failed:", e.message);
      }
    }
    // Domyślna lokalna konfiguracja
    const saved = localStorage.getItem("lingocards_system_config");
    return saved ? JSON.parse(saved) : { showMocks: true };
  }, []);

  /**
   * Aktualizuje konfigurację globalną systemu
   */
  const updateSystemConfig = useCallback(async (newConfig) => {
    localStorage.setItem("lingocards_system_config", JSON.stringify(newConfig));
    if (isFirebaseConfigured && db) {
      try {
        const { doc, setDoc } = await import("firebase/firestore");
        await setDoc(doc(db, "config", "system"), newConfig, { merge: true });
      } catch (e) {
        console.warn("[Firestore] updateSystemConfig failed:", e.message);
      }
    }
  }, []);

  /**
   * Usuń wszystkie dane użytkownika z Firestore
   */
  const deleteUserData = useCallback(async (uid) => {
    const ops = await getFirestoreOps();
    if (!ops) return;
    try {
      const { doc, deleteDoc } = ops;
      await deleteDoc(doc(db, "users", uid, "data", "stats"));
      await deleteDoc(doc(db, "users", uid, "data", "decks"));
      await deleteDoc(doc(db, "users", uid)); // optional: delete user document itself
    } catch (e) {
      console.warn("[Firestore] Failed to delete user data:", e.message);
    }
  }, []);

  return {
    saveStats,
    loadStats,
    saveDecks,
    loadDecks,
    saveSettings,
    loadSettings,
    saveProfile,
    syncUserMeta,
    loadAllUsers,
    updateUserField,
    sendSystemNotification,
    loadNotifications,
    markNotificationAsRead,
    deleteNotification,
    deleteUserData,
    loadSystemConfig,
    updateSystemConfig
  };
}

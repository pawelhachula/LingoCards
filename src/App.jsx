import React, { useState, useEffect, useRef } from "react";
import { defaultDecks } from "./data/defaultDecks";
import Dashboard from "./components/Dashboard";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Matcher from "./components/Matcher";
import Creator from "./components/Creator";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Referrals from "./components/Referrals";
import Leaderboard from "./components/Leaderboard";
import StatsView from "./components/StatsView";
import SearchModal from "./components/SearchModal";
import Library from "./components/Library";
import { playSound, triggerConfetti, triggerFireworks } from "./utils/effects";
import { useFirestore } from "./hooks/useFirestore";
import { auth, onAuthStateChanged, signOutUser } from "./firebase";
import * as Icons from "lucide-react";

const DEFAULT_THEMES = [
  { id: "graphite", label: "Aurora Graphite" },
  { id: "green", label: "Bottle Green" },
  { id: "navy", label: "Deep Navy" },
  { id: "sakura", label: "Sakura (Jasny)" },
  { id: "forest", label: "Forest (Jasny)" },
  { id: "amber", label: "Amber (Jasny)" },
];

const PREMIUM_THEMES = [
  { id: "sunset", label: "Sunset Glow (Jasny)", levelRequired: 2 },
  { id: "mint", label: "Midnight Mint", levelRequired: 3 },
  { id: "nebula", label: "Cosmic Nebula", levelRequired: 4 },
  { id: "lavender", label: "Lavender Pastel (Jasny)", levelRequired: 5 },
  { id: "cyberpunk", label: "Cyberpunk Neon", levelRequired: 6 },
  { id: "ocean", label: "Ocean Breeze (Jasny)", levelRequired: 7 },
  { id: "volcano", label: "Volcanic Ash", levelRequired: 8 },
  { id: "glacier", label: "Frosted Glacier (Jasny)", levelRequired: 9 },
  { id: "emerald", label: "Cyber Emerald", levelRequired: 10 },
  { id: "gold", label: "Royal Gold", levelRequired: 11 },
];

const systemDeckIds = new Set(defaultDecks.map(d => d.id));

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [theme, setTheme] = useState("navy");
  const [unlockedThemeToast, setUnlockedThemeToast] = useState("");
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState({ oldLevel: 1, newLevel: 1 });
  const [showSearch, setShowSearch] = useState(false);
  const [activeDeckIds, setActiveDeckIds] = useState([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef(null);

  // Firestore sync hook — działa zarówno gdy Firebase jest skonfigurowany, jak i bez niego
  const { saveStats, loadStats, saveDecks, loadDecks } = useFirestore();
  
  const [stats, setStats] = useState({
    streak: 0,
    dailyCount: 0,
    lastActiveDate: "",
    learnedCards: {},
    starredCards: {},
    quizTotal: 0,
    quizCorrect: 0,
    matchesWon: 0,
    srsData: {},
    bestStreak: 0,
    referrals: [],
    xp: 0,
    level: 1,
    studyDates: [],
    deckMedals: {},
    completedDecks: {},
    audioStyle: "synth",
    confettiStyle: "standard",
    reviewsCount: 0,
    cardMistakes: {},
    dailyHistory: {},
    studyTime: 0
  });

  // Firebase Auth — automatyczne przywracanie sesji po odświeżeniu strony
  useEffect(() => {
    // Wczytaj motyw
    const savedTheme = localStorage.getItem("lingocards_theme") || "navy";
    setTheme(savedTheme);

    if (!auth) {
      // Firebase nie skonfigurowany — fallback na localStorage
      const sessionUserStr = localStorage.getItem("lingocards_current_user");
      if (sessionUserStr) {
        try {
          const sessionUser = JSON.parse(sessionUserStr);
          setCurrentUser(sessionUser);
          const uid = sessionUser.uid || sessionUser.username;
          loadUserData(uid, sessionUser.username);
        } catch (e) {
          console.error("Error loading session", e);
        }
      }
      return;
    }

    // Firebase Auth — nasłuchuj zmiany stanu logowania
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const savedAvatar = localStorage.getItem(`lingocards_avatar_${firebaseUser.uid}`) || "👑";
        const user = {
          uid: firebaseUser.uid,
          username: firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          avatar: savedAvatar,
          isGoogle: firebaseUser.providerData?.[0]?.providerId === "google.com"
        };
        setCurrentUser(user);
        localStorage.setItem("lingocards_current_user", JSON.stringify(user));
        loadUserData(user.uid, user.username);
      } else {
        // Wylogowany
        setCurrentUser(null);
        localStorage.removeItem("lingocards_current_user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close Więcej menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update HTML data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  
  // Active study time timer (ticks every 10 seconds if logged in)
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      setStats(prev => {
        const updated = {
          ...prev,
          studyTime: (prev.studyTime || 0) + 10
        };
        const userStatsKey = `lingocards_stats_${currentUser.username.toLowerCase()}`;
        localStorage.setItem(userStatsKey, JSON.stringify(updated));
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("lingocards_theme", newTheme);
  };

  const getFirestoreUidKey = (uid = currentUser?.uid || currentUser?.username) => {
    if (!uid) return null;
    const isFirebaseUser = auth && auth.currentUser && auth.currentUser.uid === uid;
    return isFirebaseUser ? uid : uid.toLowerCase();
  };

  const getStatsScore = (s) => {
    if (!s) return 0;
    const xpVal = s.xp || 0;
    const learnedCount = Object.keys(s.learnedCards || {}).length;
    const completedCount = Object.values(s.completedDecks || {}).reduce((a, b) => a + b, 0);
    const activeCount = (s.activeDeckIds || []).length;
    return (xpVal * 10) + (learnedCount * 5) + (completedCount * 100) + activeCount;
  };

  // Helper to load user specific data — uid = Firebase UID lub username dla kont lokalnych
  const loadUserData = async (uid, username) => {
    // Jeśli nie podano username, użyj uid jako username (dla kont lokalnych)
    const uname = username || uid;
    const uidKey = getFirestoreUidKey(uid);

    // --- 1. Załaduj talie ---
    let loadedDecks = [];
    try {
      const firestoreDecks = await loadDecks(uidKey);
      if (firestoreDecks && firestoreDecks.length > 0) {
        loadedDecks = firestoreDecks;
      } else {
        // Fallback: localStorage z kluczem po username
        const savedDecks = localStorage.getItem(`lingocards_decks_${uname.toLowerCase()}`);
        loadedDecks = savedDecks ? JSON.parse(savedDecks) : [];
      }
    } catch (e) {
      console.error("Error loading decks", e);
      loadedDecks = [];
    }

    // Automatyczne uzupełnianie brakujących/przestarzałych talii systemowych
    if (loadedDecks.length > 0) {
      let shouldSave = false;
      loadedDecks = loadedDecks.map(userDeck => {
        const officialDeck = defaultDecks.find(d => d.id === userDeck.id);
        if (officialDeck && (userDeck.cards?.length || 0) < (officialDeck.cards?.length || 0)) {
          shouldSave = true;
          const userCustomCards = (userDeck.cards || []).filter(c => c.id && c.id.startsWith("custom-card-"));
          return {
            ...userDeck,
            cards: [...officialDeck.cards, ...userCustomCards],
            category: officialDeck.category || userDeck.category,
            level: officialDeck.level || userDeck.level,
            title: officialDeck.title,
            polishTitle: officialDeck.polishTitle,
            description: officialDeck.description
          };
        }
        return userDeck;
      });
      const loadedIds = new Set(loadedDecks.map(d => d.id));
      const missingDefaultDecks = defaultDecks.filter(d => !loadedIds.has(d.id));
      if (missingDefaultDecks.length > 0) {
        loadedDecks = [...loadedDecks, ...missingDefaultDecks];
        shouldSave = true;
      }
      if (shouldSave) {
        saveDecks(uidKey, loadedDecks);
      }
    } else {
      loadedDecks = defaultDecks;
      saveDecks(uidKey, defaultDecks);
    }

    // --- 2. Załaduj statystyki ---
    const defaultStatsTemplate = {
      streak: 0, dailyCount: 0, lastActiveDate: "",
      learnedCards: {}, starredCards: {}, quizTotal: 0, quizCorrect: 0,
      matchesWon: 0, srsData: {}, bestStreak: 0, referrals: [],
      xp: 0, level: 1, studyDates: [], deckMedals: {}, completedDecks: {},
      audioStyle: "synth", confettiStyle: "standard",
      reviewsCount: 0, cardMistakes: {}, dailyHistory: {}, studyTime: 0
    };

    let loadedStats = { ...defaultStatsTemplate };
    try {
      // Próbuj Firestore (z fallback na localStorage)
      const firestoreStats = await loadStats(uidKey);
      if (firestoreStats) {
        loadedStats = { ...defaultStatsTemplate, ...firestoreStats };
      } else {
        // Fallback: localStorage z kluczem po username
        const savedStats = localStorage.getItem(`lingocards_stats_${uname.toLowerCase()}`);
        if (savedStats) loadedStats = { ...defaultStatsTemplate, ...JSON.parse(savedStats) };
      }
    } catch (e) {
      console.error("Error loading stats", e);
    }

    // Oblicz streak na podstawie daty
    const todayStr = new Date().toISOString().split("T")[0];
    const lastActive = loadedStats.lastActiveDate;
    if (lastActive) {
      if (lastActive !== todayStr) {
        const diffDays = Math.ceil(Math.abs(new Date(todayStr) - new Date(lastActive)) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) loadedStats.streak += 1;
        else if (diffDays > 1) loadedStats.streak = 1;
        loadedStats.dailyCount = 0;
        loadedStats.lastActiveDate = todayStr;
      }
    } else {
      loadedStats.streak = 1;
      loadedStats.lastActiveDate = todayStr;
      loadedStats.dailyCount = 0;
    }
    if (loadedStats.streak > (loadedStats.bestStreak || 0)) {
      loadedStats.bestStreak = loadedStats.streak;
    }

    // Synchronizuj studyDates
    const streakVal = loadedStats.streak || 0;
    if (streakVal > 0) {
      const dates = loadedStats.studyDates || [];
      const dateList = [...dates];
      const baseDate = new Date(loadedStats.lastActiveDate || todayStr);
      for (let i = 0; i < streakVal; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        if (!dateList.includes(dateStr)) dateList.push(dateStr);
      }
      loadedStats.studyDates = dateList;
    }

    // --- 3. Automatyczna migracja starego lokalnego postępu komputera ---
    // Jeśli w przeglądarce leżą stare dane lokalne z większym postępem niż te w chmurze,
    // zmigrujmy je automatycznie do chmury!
    try {
      const currentStatsKey = `lingocards_stats_${uidKey.toLowerCase()}`;
      const localStatsKeys = Object.keys(localStorage).filter(k => 
        k.startsWith("lingocards_stats_") && 
        k.toLowerCase() !== currentStatsKey.toLowerCase()
      );
      
      console.log("[Migration Diagnostic] uidKey:", uidKey);
      console.log("[Migration Diagnostic] currentStatsKey:", currentStatsKey);
      console.log("[Migration Diagnostic] localStatsKeys found in browser:", localStatsKeys);
      
      let bestLocalStats = null;
      let bestLocalKey = null;
      let maxScore = getStatsScore(loadedStats);
      
      console.log("[Migration Diagnostic] Current loadedStats score:", maxScore, loadedStats);
      
      for (const key of localStatsKeys) {
        const dataStr = localStorage.getItem(key);
        if (dataStr) {
          try {
            const parsed = JSON.parse(dataStr);
            const score = getStatsScore(parsed);
            console.log(`[Migration Diagnostic] Key "${key}" -> Score: ${score}`, parsed);
            if (score > maxScore) {
              maxScore = score;
              bestLocalStats = parsed;
              bestLocalKey = key;
            }
          } catch (err) {
            console.warn(`[Migration Diagnostic] Failed to parse key "${key}":`, err.message);
          }
        }
      }
      
      if (bestLocalStats) {
        console.log(`[Migration Diagnostic] TRIGGERING MIGRATION from "${bestLocalKey}" (new score: ${maxScore})`);
        
        const migratedStats = {
          ...loadedStats,
          ...bestLocalStats,
          avatarData: loadedStats.avatarData || bestLocalStats.avatarData,
          customUsername: loadedStats.customUsername || bestLocalStats.customUsername
        };
        
        loadedStats = migratedStats;
        
        // Migrujemy też własne talie z tamtego profilu
        const usernamePart = bestLocalKey.replace("lingocards_stats_", "");
        const localDecksKey = `lingocards_decks_${usernamePart}`;
        const localDecksStr = localStorage.getItem(localDecksKey);
        if (localDecksStr) {
          try {
            const parsedDecks = JSON.parse(localDecksStr);
            if (parsedDecks && parsedDecks.length > 0) {
              console.log(`[Migration Diagnostic] Copying custom decks from "${localDecksKey}":`, parsedDecks);
              const mergedDecks = [...loadedDecks];
              parsedDecks.forEach(d => {
                if (!mergedDecks.some(md => md.id === d.id)) {
                  mergedDecks.push(d);
                }
              });
              loadedDecks = mergedDecks;
            }
          } catch (err) { /* ignore */ }
        }
      } else {
        console.log("[Migration Diagnostic] NO MIGRATION: No local profile had a score higher than current chmura profile.");
      }
    } catch (e) {
      console.error("[Migration Diagnostic] Exception during migration:", e);
    }

    // --- 4. Zapisz i Ustaw stany końcowe ---
    setDecks(loadedDecks);
    saveDecks(uidKey, loadedDecks);

    setStats(loadedStats);
    saveStats(uidKey, loadedStats);

    // --- 5. Synchronizacja stanów pobocznych UI ---
    
    // Zsynchronizuj profil użytkownika (avatar i nazwa użytkownika z Firestore)
    if (loadedStats.avatarData || loadedStats.customUsername) {
      setCurrentUser(prev => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          avatar: loadedStats.avatarData || prev.avatar,
          username: loadedStats.customUsername || prev.username
        };
        localStorage.setItem("lingocards_current_user", JSON.stringify(updated));
        return updated;
      });
    }

    // Zsynchronizuj aktywne talie z wczytanych statystyk (defaults to [] if empty/new)
    const activeDeckIdsToSet = loadedStats.activeDeckIds || [];
    setActiveDeckIds(activeDeckIdsToSet);
    const activeDecksKey = `lingocards_active_decks_${uname.toLowerCase()}`;
    localStorage.setItem(activeDecksKey, JSON.stringify(activeDeckIdsToSet));
    
    const activeDecks = loadedDecks.filter(d => activeDeckIdsToSet.includes(d.id) || !systemDeckIds.has(d.id));
    if (activeDecks.length > 0) setSelectedDeck(activeDecks[0]);
    else if (loadedDecks.length > 0) setSelectedDeck(loadedDecks[0]);

    // Zsynchronizuj motyw graficzny z wczytanych statystyk (defaults to navy)
    const themeToSet = loadedStats.theme || "navy";
    setTheme(themeToSet);
    localStorage.setItem("lingocards_theme", themeToSet);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("lingocards_current_user", JSON.stringify(user));
    // Użyj uid (Google) lub username (lokalny) jako klucz Firestore
    const uid = user.uid || user.username;
    loadUserData(uid, user.username);
    setView("dashboard");
  };

  const handleLogout = async () => {
    try {
      await signOutUser(); // wyloguj z Firebase Auth
    } catch (e) {
      console.error("Logout error", e);
    }
    setCurrentUser(null);
    localStorage.removeItem("lingocards_current_user");
    setView("dashboard");
    setDecks([]);
    setActiveDeckIds([]);
    setSelectedDeck(null);
  };

  const handleUpdateProfile = (newUsername, newAvatar) => {
    if (!currentUser) return { success: false, message: "Brak zalogowanego użytkownika." };

    const oldUsername = currentUser.username;
    const cleanNewUsername = newUsername.trim();

    if (!cleanNewUsername) {
      return { success: false, message: "Nazwa użytkownika nie może być pusta." };
    }

    if (cleanNewUsername.length < 3) {
      return { success: false, message: "Nazwa użytkownika musi mieć co najmniej 3 znaki." };
    }

    // Check if username already exists in registry
    if (cleanNewUsername.toLowerCase() !== oldUsername.toLowerCase()) {
      const usersStr = localStorage.getItem("lingocards_users");
      if (usersStr) {
        try {
          const users = JSON.parse(usersStr);
          const nameTaken = users.some(u => u.username.toLowerCase() === cleanNewUsername.toLowerCase());
          if (nameTaken) {
            return { success: false, message: "Ta nazwa użytkownika jest już zajęta." };
          }
        } catch (e) {
          console.error("Error checking username uniqueness", e);
        }
      }

      // Migrate namespaced localStorage keys
      const oldDecksKey = `lingocards_decks_${oldUsername.toLowerCase()}`;
      const newDecksKey = `lingocards_decks_${cleanNewUsername.toLowerCase()}`;
      const oldStatsKey = `lingocards_stats_${oldUsername.toLowerCase()}`;
      const newStatsKey = `lingocards_stats_${cleanNewUsername.toLowerCase()}`;

      const decksData = localStorage.getItem(oldDecksKey);
      if (decksData) {
        localStorage.setItem(newDecksKey, decksData);
        localStorage.removeItem(oldDecksKey);
      }

      const statsData = localStorage.getItem(oldStatsKey);
      if (statsData) {
        localStorage.setItem(newStatsKey, statsData);
        localStorage.removeItem(oldStatsKey);
      }
    }

    // Update user registry
    const usersStr = localStorage.getItem("lingocards_users");
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        const updatedUsers = users.map(u => {
          if (u.username.toLowerCase() === oldUsername.toLowerCase()) {
            return { ...u, username: cleanNewUsername, avatar: newAvatar };
          }
          return u;
        });
        localStorage.setItem("lingocards_users", JSON.stringify(updatedUsers));
      } catch (e) {
        console.error("Error updating user registry", e);
      }
    }

    const updatedUser = { ...currentUser, username: cleanNewUsername, avatar: newAvatar };
    setCurrentUser(updatedUser);
    localStorage.setItem("lingocards_current_user", JSON.stringify(updatedUser));

    // Zapisz avatar również do stats (Firestore) żeby nie zniknął po nowym deploymencie
    if (currentUser.uid) {
      localStorage.setItem(`lingocards_avatar_${currentUser.uid}`, newAvatar);
    }
    // Synchronizuj avatar oraz nową nazwę użytkownika ze statystykami (Firestore)
    handleSetStats({
      avatarData: newAvatar,
      customUsername: cleanNewUsername
    });
    
    // If username changed, reload states with the new namespace
    if (cleanNewUsername.toLowerCase() !== oldUsername.toLowerCase()) {
      loadUserData(currentUser.uid || cleanNewUsername, cleanNewUsername);
    }

    return { success: true, message: "Profil został zaktualizowany!" };
  };

  const handleSetStats = (newStatsOrFunc) => {
    setStats(prev => {
      const resolvedStats = typeof newStatsOrFunc === 'function' ? newStatsOrFunc(prev) : newStatsOrFunc;
      let updatedStats = { ...prev, ...resolvedStats };
      if (updatedStats.streak > (updatedStats.bestStreak || 0)) {
        updatedStats.bestStreak = updatedStats.streak;
      }
      if (currentUser) {
        // Zapisz do Firestore (z localStorage fallback)
        const uidKey = getFirestoreUidKey();
        if (uidKey) saveStats(uidKey, updatedStats);
      }
      return updatedStats;
    });
  };

  const handleAddXp = (amount) => {
    if (!currentUser) return;
    setStats(prev => {
      const currentXp = prev.xp || 0;
      const currentLevel = prev.level || 1;
      const newXp = currentXp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      
      const todayStr = new Date().toISOString().split("T")[0];
      const updatedStudyDates = prev.studyDates || [];
      const newStudyDates = updatedStudyDates.includes(todayStr)
        ? updatedStudyDates
        : [...updatedStudyDates, todayStr];
      
      const updatedStats = {
        ...prev,
        xp: newXp,
        level: newLevel,
        studyDates: newStudyDates
      };
      
      // Check theme unlocks
      PREMIUM_THEMES.forEach(t => {
        if (newLevel >= t.levelRequired && currentLevel < t.levelRequired) {
          setTimeout(() => {
            playSound("achievement", prev.audioStyle || "synth");
            setUnlockedThemeToast(t.label);
            // Hide after 4 seconds
            setTimeout(() => setUnlockedThemeToast(""), 4000);
          }, 50);
        }
      });
      
      if (newLevel > currentLevel) {
        setTimeout(() => {
          playSound("levelup", prev.audioStyle || "synth");
          triggerFireworks();
          setLevelUpInfo({ oldLevel: currentLevel, newLevel: newLevel });
          setShowLevelUpModal(true);
        }, 100);
      }
      
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveStats(uidKey, updatedStats);
      
      return updatedStats;
    });
  };

  const handleResetData = () => {
    if (!currentUser) return;
    const username = currentUser.username;
    
    // Reset statistics namespace
    const userStatsKey = `lingocards_stats_${username.toLowerCase()}`;
    const defaultStatsObj = {
      streak: 0,
      dailyCount: 0,
      lastActiveDate: new Date().toISOString().split("T")[0],
      learnedCards: {},
      starredCards: {},
      quizTotal: 0,
      quizCorrect: 0,
      matchesWon: 0,
      dailyTarget: 10,
      srsData: {},
      bestStreak: 0,
      referrals: [],
      xp: 0,
      level: 1,
      studyDates: [],
      deckMedals: {},
      audioStyle: "synth",
      confettiStyle: "standard",
      activeDeckIds: [],
      theme: "navy"
    };
    setStats(defaultStatsObj);
    localStorage.setItem(userStatsKey, JSON.stringify(defaultStatsObj));

    // Reset decks namespace
    const userDecksKey = `lingocards_decks_${username.toLowerCase()}`;
    setDecks(defaultDecks);
    localStorage.setItem(userDecksKey, JSON.stringify(defaultDecks));

    // Reset active decks namespace
    const activeDecksKey = `lingocards_active_decks_${username.toLowerCase()}`;
    const defaultActiveDecks = [];
    setActiveDeckIds(defaultActiveDecks);
    localStorage.setItem(activeDecksKey, JSON.stringify(defaultActiveDecks));

    // Reset theme local state
    setTheme("navy");
    localStorage.setItem("lingocards_theme", "navy");

    // Sync resets to Firestore
    const uidKey = getFirestoreUidKey();
    if (uidKey) {
      saveStats(uidKey, defaultStatsObj);
      saveDecks(uidKey, defaultDecks);
    }

    const activeDecks = defaultDecks.filter(d => defaultActiveDecks.includes(d.id));
    setSelectedDeck(activeDecks[0] || defaultDecks[0]);
  };

  const handleToggleActiveDeck = (deckId) => {
    if (!currentUser) return;
    
    let updated;
    if (activeDeckIds.includes(deckId)) {
      updated = activeDeckIds.filter(id => id !== deckId);
    } else {
      updated = [...activeDeckIds, deckId];
    }
    
    setActiveDeckIds(updated);
    const activeDecksKey = `lingocards_active_decks_${currentUser.username.toLowerCase()}`;
    localStorage.setItem(activeDecksKey, JSON.stringify(updated));
    
    // Zapisz do statystyk (Firestore)
    handleSetStats({ activeDeckIds: updated });
  };

  const handleCreateDeck = (newDeck) => {
    const updated = [...decks, newDeck];
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }
  };

  const handleEditDeck = (deckId, updatedFields) => {
    if (systemDeckIds.has(deckId)) return;
    const updated = decks.map(d => {
      if (d.id === deckId) {
        return { ...d, ...updatedFields };
      }
      return d;
    });
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }
    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated.find(d => d.id === deckId));
    }
  };

  const handleEditCard = (deckId, cardId, updatedCardFields) => {
    if (!cardId.startsWith("custom-card-")) return;
    const updated = decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: deck.cards.map(c => {
            if (c.id === cardId) {
              return { ...c, ...updatedCardFields };
            }
            return c;
          })
        };
      }
      return deck;
    });
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }
    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated.find(d => d.id === deckId));
    }
  };

  const handleAddCard = (deckId, newCard) => {
    const updated = decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: [...deck.cards, newCard]
        };
      }
      return deck;
    });
    setDecks(updated);
    
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }
    
    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated.find(d => d.id === deckId));
    }
  };

  const handleDeleteCard = (deckId, cardId) => {
    const updated = decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          cards: deck.cards.filter(c => c.id !== cardId)
        };
      }
      return deck;
    });
    setDecks(updated);
    
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }

    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated.find(d => d.id === deckId));
    }

    const updatedLearned = { ...(stats.learnedCards || {}) };
    if (updatedLearned[cardId]) {
      delete updatedLearned[cardId];
    }
    const updatedStarred = { ...(stats.starredCards || {}) };
    if (updatedStarred[cardId]) {
      delete updatedStarred[cardId];
    }

    handleSetStats({
      ...stats,
      learnedCards: updatedLearned,
      starredCards: updatedStarred
    });
  };

  // Generic full-deck update — used by DeckEditor for card CRUD + deletedCards tracking
  const handleUpdateDeck = (deckId, updatedDeck) => {
    if (systemDeckIds.has(deckId)) return;
    const updated = decks.map(d => d.id === deckId ? { ...d, ...updatedDeck } : d);
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }
    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated.find(d => d.id === deckId));
    }
  };

  const handleDeleteDeck = (deckId) => {
    if (systemDeckIds.has(deckId)) return;
    const updated = decks.filter(d => d.id !== deckId);
    setDecks(updated);
    
    const updatedActiveDeckIds = activeDeckIds.filter(id => id !== deckId);
    setActiveDeckIds(updatedActiveDeckIds);
    const activeDecksKey = `lingocards_active_decks_${currentUser.username.toLowerCase()}`;
    localStorage.setItem(activeDecksKey, JSON.stringify(updatedActiveDeckIds));
    
    if (selectedDeck?.id === deckId) setSelectedDeck(null);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
      const uidKey = getFirestoreUidKey();
      if (uidKey) saveDecks(uidKey, updated);
    }

    // Usuń medal i status ukończenia dla tej talii ze statystyk (Firestore)
    handleSetStats(prev => {
      const updatedMedals = { ...prev.deckMedals };
      delete updatedMedals[deckId];
      const updatedCompleted = { ...prev.completedDecks };
      delete updatedCompleted[deckId];
      return {
        ...prev,
        deckMedals: updatedMedals,
        completedDecks: updatedCompleted,
        activeDeckIds: updatedActiveDeckIds
      };
    });
  };

  // If not logged in, show login page
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  // Compile Dynamic SRS Deck
  const todayStr = new Date().toISOString().split("T")[0];
  const realDecksForSrs = decks.filter(d => d.id !== "starred" && d.id !== "srs");
  const allUniqueCards = [];
  const cardIdsSet = new Set();
  realDecksForSrs.flatMap(d => d.cards || []).forEach(c => {
    if (!cardIdsSet.has(c.id)) {
      cardIdsSet.add(c.id);
      allUniqueCards.push(c);
    }
  });

  const srsDueCards = allUniqueCards.filter(c => {
    const srs = stats.srsData?.[c.id];
    if (!srs) return true;
    return srs.nextReviewDate <= todayStr;
  });

  const srsDeck = {
    id: "srs",
    title: "Powtórka SRS",
    polishTitle: "Spaced Repetition Review",
    description: "Słówka wybrane przez algorytm powtórek do dzisiejszej nauki.",
    icon: "BrainCircuit",
    color: "#ec4899",
    cards: srsDueCards
  };

  // Compile Dynamic Starred Deck
  const starredCards = allUniqueCards.filter(c => stats.starredCards?.[c.id]);
  
  const starredDeck = {
    id: "starred",
    title: "Ulubione i trudne",
    polishTitle: "Starred & Difficult",
    description: "Twoja własna lista słówek oznaczona gwiazdką. Skup się na ich powtórce!",
    icon: "Star",
    color: "#f59e0b",
    cards: starredCards
  };

  const activeAndCustomDecks = decks.filter(d => activeDeckIds.includes(d.id) || !systemDeckIds.has(d.id));
  const displayedDecks = [srsDeck, starredDeck, ...activeAndCustomDecks];

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Toast notification for unlocked theme */}
      {unlockedThemeToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-xs px-6 py-4.5 rounded-2xl border border-emerald-400/30 shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center gap-3 animate-bounce">
          <Icons.Sparkles size={18} className="text-yellow-300 animate-pulse" />
          <div className="flex flex-col">
            <span className="font-bold text-[10px] text-emerald-100 uppercase tracking-widest leading-none">Nowy Motyw Odblokowany! 🎉</span>
            <span className="text-sm font-extrabold mt-1 text-white">{unlockedThemeToast}</span>
          </div>
          <button onClick={() => setUnlockedThemeToast("")} className="text-emerald-200 hover:text-white ml-2 transition-colors">
            <Icons.X size={14} />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="glass-card sticky top-0 z-50 rounded-none border-t-0 border-x-0 border-b border-white/5 bg-opacity-80 backdrop-blur-md px-5 md:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none group shrink-0" onClick={() => setView("dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
            <Icons.BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              LingoCards <span className="text-[10px] bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded-full font-black border border-indigo-500/10">PRO</span>
            </h1>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black mt-0.5 whitespace-nowrap">Premium Language Learning</p>
          </div>
        </div>

        {/* Tab Actions — wszystkie zakładki obok siebie */}
        <div className="hidden lg:flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: "dashboard", label: "Pulpit", icon: null },
            { id: "library",   label: "Katalog", icon: "Compass" },
            { id: "learn",     label: "Fiszki",  icon: null },
            { id: "quiz",      label: "Testy",   icon: null },
            { id: "match",     label: "Gra",     icon: "Zap" },
            { id: "creator",   label: "Menedżer",icon: "PlusCircle" },
            { id: "stats",     label: "Statyst.",icon: "BarChart2" },
            { id: "referrals", label: "Polecenia",icon: "Users" },
          ].map(({ id, label, icon }) => {
            const IconEl = icon ? Icons[icon] : null;
            const active = view === id;
            return (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`px-2 xl:px-2.5 py-1.5 rounded-xl transition-all border flex items-center gap-1 whitespace-nowrap shrink-0 ${
                  active
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm"
                    : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
                }`}
              >
                {IconEl && <IconEl size={12} className="shrink-0" />}
                {label}
              </button>
            );
          })}
        </div>

        {/* Global Streak / Theme Selector / User Profile */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {(view === "learn" || view === "quiz" || view === "match") && decks.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-black/30 border border-white/5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 whitespace-nowrap shrink-0">
              <span className="text-slate-500 font-extrabold uppercase text-[9px] tracking-wider">Talia:</span>
              <select 
                value={selectedDeck?.id || ""} 
                onChange={(e) => {
                  const allDecks = [srsDeck, starredDeck, ...decks];
                  const found = allDecks.find(d => d.id === e.target.value);
                  if (found) setSelectedDeck(found);
                }}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold border-none p-0 pr-6 max-w-[110px] sm:max-w-[140px] md:max-w-[160px] truncate"
              >
                {[srsDeck, starredDeck, ...decks].map(d => {
                  const isLocked = !stats.isPro && (d.level && d.level !== "A1" && d.level !== "A2");
                  return (
                    <option 
                      key={d.id} 
                      value={d.id} 
                      disabled={isLocked}
                      className={`bg-[var(--bg-main)] ${isLocked ? "text-slate-600 font-normal" : "text-[var(--text-primary)]"}`}
                    >
                      {isLocked ? `🔒 ${d.title} (PRO)` : d.title}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* THEME SELECTOR DROPDOWN */}
          <div className="hidden lg:flex items-center gap-1.5 bg-black/30 border border-white/8 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 whitespace-nowrap shrink-0">
            <Icons.Palette size={14} className="text-slate-400 shrink-0" />
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold border-none p-0 pr-6 text-xs max-w-[90px] sm:max-w-[120px] truncate"
            >
              <optgroup label="Motywy podstawowe" className="bg-[var(--bg-main)] text-slate-400">
                {DEFAULT_THEMES.map(t => (
                  <option key={t.id} value={t.id} className="bg-[var(--bg-main)] text-[var(--text-primary)]">{t.label}</option>
                ))}
              </optgroup>
              <optgroup label="Motywy premium" className="bg-[var(--bg-main)] text-indigo-400">
                {PREMIUM_THEMES.map(t => {
                  const isUnlocked = (stats.level || 1) >= t.levelRequired;
                  return (
                    <option 
                      key={t.id} 
                      value={t.id} 
                      disabled={!isUnlocked} 
                      className={`bg-[var(--bg-main)] ${isUnlocked ? "text-[var(--text-primary)]" : "text-slate-600 font-normal"}`}
                    >
                      {isUnlocked ? `✨ ${t.label}` : `🔒 ${t.label} (Poziom ${t.levelRequired})`}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>

          {/* Search button */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all scale-hover whitespace-nowrap shrink-0"
            title="Wyszukaj słówko (Ctrl+K)"
          >
            <Icons.Search size={15} className="shrink-0" />
            <span className="hidden xl:flex items-center gap-1.5 text-[10px] font-bold text-slate-500 whitespace-nowrap shrink-0">
              Szukaj
              <kbd className="border border-white/10 rounded px-1.5 py-0.5 font-mono text-[9px] whitespace-nowrap shrink-0">Ctrl K</kbd>
            </span>
          </button>

          {/* Leaderboard button */}
          <button 
            onClick={() => setView("leaderboard")}
            className={`flex items-center justify-center p-2.5 rounded-xl border scale-hover shrink-0 ${
              view === "leaderboard" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Ranking Rywalizacji"
          >
            <Icons.Trophy size={16} className="shrink-0" />
          </button>

          {/* Settings gear button */}
          <button 
            onClick={() => setView("settings")}
            className={`flex items-center justify-center p-2.5 rounded-xl border scale-hover shrink-0 ${
              view === "settings" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Ustawienia"
          >
            <Icons.Settings size={16} className="shrink-0" />
          </button>

          <button 
            onClick={() => setView("profile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border scale-hover whitespace-nowrap shrink-0 ${
              view === "profile" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {currentUser.avatar && currentUser.avatar.startsWith("data:") ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0" />
            ) : (
              <span className="text-base shrink-0">{currentUser.avatar || "👑"}</span>
            )}
            <span className="hidden xl:inline text-xs font-bold whitespace-nowrap shrink-0">{currentUser.username}</span>
          </button>

          {/* Daily streak indicator */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold shadow-sm whitespace-nowrap shrink-0" title="Twój codzienny streak nauki!">
            <Icons.Flame size={15} className="fill-amber-500/15 shrink-0" />
            <span className="whitespace-nowrap shrink-0">{stats.streak || 0} dni</span>
          </div>
        </div>
      </nav>

      {/* Bottom Nav Bar for Mobile Screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button 
          onClick={() => setView("dashboard")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "dashboard" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Icons.LayoutDashboard size={20} />
          <span>Start</span>
        </button>
        <button 
          onClick={() => setView("library")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "library" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Icons.Compass size={20} />
          <span>Katalog</span>
        </button>
        <button 
          onClick={() => setView("learn")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "learn" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Icons.Layers size={20} />
          <span>Fiszki</span>
        </button>
        <button 
          onClick={() => setView("quiz")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "quiz" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Icons.Award size={20} />
          <span>Test</span>
        </button>
        <button 
          onClick={() => setView("match")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "match" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Icons.Zap size={20} />
          <span>Gry</span>
        </button>
        <button 
          onClick={() => setView("profile")} 
          className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
            view === "profile" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {currentUser.avatar && currentUser.avatar.startsWith("data:") ? (
            <img src={currentUser.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-white/20 mb-0.5" />
          ) : (
            <span className="text-lg leading-none h-5 block">{currentUser.avatar || "👑"}</span>
          )}
          <span>Profil</span>
        </button>
      </div>

      {/* Main Core View Area */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
        {view === "dashboard" && (
          <Dashboard 
            decks={displayedDecks} 
            stats={stats} 
            setStats={handleSetStats}
            onSelectDeck={setSelectedDeck} 
            onNavigate={setView}
            onUpdateDeck={handleUpdateDeck}
            onDeleteDeck={handleDeleteDeck}
            systemDeckIds={systemDeckIds}
            activeDeckIds={activeDeckIds}
          />
        )}

        {view === "library" && (
          <Library 
            decks={decks.filter(d => d.id !== 'starred' && d.id !== 'srs')} 
            systemDeckIds={systemDeckIds}
            activeDeckIds={activeDeckIds} 
            onToggleActiveDeck={handleToggleActiveDeck} 
            onSelectDeck={setSelectedDeck} 
            onNavigate={setView} 
            stats={stats} 
            onUpdateStats={handleSetStats} 
          />
        )}
        
        {view === "learn" && (
          <Flashcards 
            selectedDeck={selectedDeck} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
            onAddXp={handleAddXp}
          />
        )}

        {view === "quiz" && (
          <Quiz 
            selectedDeck={selectedDeck} 
            decks={decks} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
            onAddXp={handleAddXp}
          />
        )}

        {view === "match" && (
          <Matcher 
            selectedDeck={selectedDeck} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
            onAddXp={handleAddXp}
          />
        )}

        {view === "creator" && (
          <Creator 
            decks={decks} 
            onCreateDeck={handleCreateDeck}
            onEditDeck={handleEditDeck}
            onDeleteDeck={handleDeleteDeck}
            onAddCard={handleAddCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
            onNavigate={setView}
          />
        )}

        {view === "profile" && (
          <Profile 
            key={currentUser.uid || currentUser.username}
            user={currentUser}
            onLogout={handleLogout}
            stats={stats}
            decks={[srsDeck, starredDeck, ...decks]}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {view === "settings" && (
          <Settings 
            stats={stats}
            onUpdateStats={handleSetStats}
            theme={theme}
            onThemeChange={handleThemeChange}
            onResetData={handleResetData}
            DEFAULT_THEMES={DEFAULT_THEMES}
            PREMIUM_THEMES={PREMIUM_THEMES}
          />
        )}

        {view === "stats" && (
          <StatsView 
            stats={stats}
            decks={decks}
            onNavigate={setView}
            setStats={handleSetStats}
          />
        )}

        {view === "referrals" && (
          <Referrals 
            stats={stats}
            onUpdateStats={handleSetStats}
            onNavigate={setView}
          />
        )}

        {view === "leaderboard" && (
          <Leaderboard 
            stats={stats}
            onNavigate={setView}
          />
        )}
      </main>

      {/* Level Up Modal */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-md p-8 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)] flex flex-col items-center gap-6 text-center animate-scale-up relative">
            <div className="absolute -top-12 w-24 h-24 bg-gradient-to-tr from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-yellow-500/20 border-4 border-[var(--bg-main)]">
              <Icons.Award className="text-white w-10 h-10 animate-bounce" />
            </div>
            
            <div className="mt-8">
              <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">AWANS POZIOMU!</span>
              <h3 className="text-3xl font-black text-white mt-4 tracking-tight">Poziom w górę! 🎉</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">Twoja wiedza rośnie! Osiągnąłeś nowy poziom nauki.</p>
            </div>

            <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-2xl border border-white/5 w-full justify-center">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase block leading-none">Poprzedni</span>
                <strong className="text-slate-400 text-xl font-black block mt-1">Lvl {levelUpInfo.oldLevel}</strong>
              </div>
              <Icons.ArrowRight className="text-yellow-400" size={20} />
              <div className="text-center">
                <span className="text-[10px] text-yellow-400 font-extrabold uppercase block leading-none">Nowy</span>
                <strong className="text-yellow-400 text-2xl font-black block mt-1">Lvl {levelUpInfo.newLevel}</strong>
              </div>
            </div>

            <div className="text-xs text-indigo-300 font-bold">
              Nowy Tytuł: <span className="text-white font-extrabold uppercase tracking-wide">
                {levelUpInfo.newLevel >= 15 ? "Master 👑" : levelUpInfo.newLevel >= 10 ? "Scholar 🎓" : levelUpInfo.newLevel >= 6 ? "Explorer 🧭" : levelUpInfo.newLevel >= 3 ? "Learner 📚" : "Beginner 🌱"}
              </span>
            </div>

            <button 
              onClick={() => setShowLevelUpModal(false)}
              className="btn bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-bold text-xs py-3.5 w-full rounded-xl shadow-lg shadow-yellow-500/10 hover:scale-105 transition-all mt-2"
            >
              Cudownie, uczę się dalej!
            </button>
          </div>
        </div>
      )}

      {/* Search Modal (Ctrl+K) */}
      {showSearch && currentUser && (
        <SearchModal
          decks={decks}
          stats={stats}
          setStats={handleSetStats}
          onNavigate={setView}
          onSelectDeck={setSelectedDeck}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}

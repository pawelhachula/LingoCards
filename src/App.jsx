import React, { useState, useEffect, useRef, useCallback } from "react";
import { defaultDecks } from "./data/defaultDecks";
import { formatDays } from "./utils/date";
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
import AdminPanel from "./components/AdminPanel";
import { playSound, triggerConfetti, triggerFireworks } from "./utils/effects";
import { useFirestore } from "./hooks/useFirestore";
import { auth, db, onAuthStateChanged, signOutUser, isFirebaseConfigured } from "./firebase";
import { getLocalDateString } from "./utils/date";
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
  { id: "sunset", label: "Sunset Glow (Jasny)", levelRequired: 10 },
  { id: "mint", label: "Midnight Mint", levelRequired: 20 },
  { id: "nebula", label: "Cosmic Nebula", levelRequired: 30 },
  { id: "lavender", label: "Lavender Pastel (Jasny)", levelRequired: 40 },
  { id: "cyberpunk", label: "Cyberpunk Neon", levelRequired: 50 },
  { id: "ocean", label: "Ocean Breeze (Jasny)", levelRequired: 60 },
  { id: "volcano", label: "Volcanic Ash", levelRequired: 70 },
  { id: "glacier", label: "Frosted Glacier (Jasny)", levelRequired: 80 },
  { id: "emerald", label: "Cyber Emerald", levelRequired: 90 },
  { id: "gold", label: "Royal Gold", levelRequired: 100 },
];

const systemDeckIds = new Set(defaultDecks.map(d => d.id));

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lingocards_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
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
  const [notifications, setNotifications] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [premiumTriggerDeck, setPremiumTriggerDeck] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Firestore sync hook — działa zarówno gdy Firebase jest skonfigurowany, jak i bez niego
  const { 
    saveStats, loadStats, saveDecks, loadDecks,
    syncUserMeta, loadAllUsers, updateUserField,
    sendSystemNotification, loadNotifications, markNotificationAsRead, deleteNotification,
    loadSystemConfig, updateSystemConfig
  } = useFirestore();

  const [systemConfig, setSystemConfig] = useState({ showMocks: true });
  
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

  const getSortedDecks = (deckList) => {
    const levelOrder = { "A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5, "C2": 6 };
    return [...deckList].sort((a, b) => {
      const isLockedA = !stats.isPro && a.isPremium;
      const isLockedB = !stats.isPro && b.isPremium;
      
      // 1. Dostępność (niezablokowane najpierw)
      if (isLockedA !== isLockedB) {
        return isLockedA ? 1 : -1;
      }
      
      // 2. Dynamiczne/Systemowe najpierw w ramach tej samej dostępności
      const isSystemA = a.id === "srs" || a.id === "starred";
      const isSystemB = b.id === "srs" || b.id === "starred";
      if (isSystemA !== isSystemB) {
        return isSystemA ? -1 : 1;
      }
      if (isSystemA && isSystemB) {
        if (a.id === "srs") return -1;
        if (b.id === "srs") return 1;
        return 0;
      }
      
      // 3. Poziomy trudności (A1 -> C2)
      const weightA = levelOrder[a.level] || 99;
      const weightB = levelOrder[b.level] || 99;
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      
      // 4. Alfabetycznie po tytule
      return (a.title || "").localeCompare(b.title || "");
    });
  };

  // Firebase Auth — automatyczne przywracanie sesji po odświeżeniu strony
  useEffect(() => {
    // Wczytaj motyw
    const savedTheme = localStorage.getItem("lingocards_theme") || "navy";
    setTheme(savedTheme);

    // Wczytaj konfigurację systemową
    loadSystemConfig().then(cfg => {
      if (cfg) setSystemConfig(cfg);
    }).catch(e => console.warn("Failed to load system config:", e.message));

    if (!auth) {
      // Firebase nie skonfigurowany — fallback na localStorage
      const sessionUserStr = localStorage.getItem("lingocards_current_user");
      if (sessionUserStr) {
        try {
          const sessionUser = JSON.parse(sessionUserStr);
          setCurrentUser(sessionUser);
            const uid = sessionUser.uid || sessionUser.username;
            loadUserData(uid, sessionUser.username, sessionUser.email);
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
        
        // Zabezpieczenie przed miganiem (flash) roli/nazwy użytkownika:
        // Pobierz dotychczasowy stan z localStorage, jeśli UID się zgadza.
        let cachedRole = undefined;
        let cachedUsername = undefined;
        try {
          const savedStr = localStorage.getItem("lingocards_current_user");
          if (savedStr) {
            const savedObj = JSON.parse(savedStr);
            if (savedObj && savedObj.uid === firebaseUser.uid) {
              cachedRole = savedObj.role;
              cachedUsername = savedObj.username;
            }
          }
        } catch (e) {}

        const user = {
          uid: firebaseUser.uid,
          username: cachedUsername || firebaseUser.displayName || firebaseUser.email.split("@")[0],
          email: firebaseUser.email,
          avatar: savedAvatar,
          isGoogle: firebaseUser.providerData?.[0]?.providerId === "google.com",
          role: cachedRole
        };
        setCurrentUser(user);
        localStorage.setItem("lingocards_current_user", JSON.stringify(user));
        loadUserData(user.uid, user.username, user.email);
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
    if (isFirebaseConfigured) {
      // W trybie Firebase, UID jest case-sensitive i nie powinien być zmieniany na małe litery
      return uid;
    }
    return uid.toLowerCase();
  };

  // Periodically update lastActiveAt timestamp in Firestore (every 60 seconds)
  useEffect(() => {
    if (!currentUser) return;
    const updateActivity = async () => {
      const uidKey = getFirestoreUidKey();
      if (uidKey && isFirebaseConfigured) {
        try {
          await updateUserField(uidKey, { lastActiveAt: Date.now() });
        } catch (e) {
          // ignore
        }
      }
    };
    // Update immediately on mount/login
    updateActivity();
    const interval = setInterval(updateActivity, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Safety check to prevent free users from accessing premium decks through direct navigation/URL
  useEffect(() => {
    if ((view === "learn" || view === "quiz" || view === "match") && !stats.isPro) {
      if (!selectedDeck || selectedDeck.isPremium) {
        // Find the first available free deck from decks state
        const firstFreeDeck = decks.find(d => !d.isPremium);
        if (firstFreeDeck) {
          setSelectedDeck(firstFreeDeck);
        } else {
          setView("dashboard");
        }
      }
    }
  }, [view, selectedDeck, stats.isPro, decks]);

  const getStatsScore = (s) => {
    if (!s) return 0;
    const xpVal = s.xp || 0;
    const learnedCount = Object.keys(s.learnedCards || {}).length;
    const completedCount = Object.values(s.completedDecks || {}).reduce((a, b) => a + b, 0);
    const activeCount = (s.activeDeckIds || []).length;
    return (xpVal * 10) + (learnedCount * 5) + (completedCount * 100) + activeCount;
  };

  // Helper to load user specific data — uid = Firebase UID lub username dla kont lokalnych
  const loadUserData = async (uid, username, userEmail = "") => {
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

    // Automatyczne uzupełnianie brakujących/przestarzałych talii systemowych oraz migracja pól (type, isPremium, level itp.)
    if (loadedDecks.length > 0) {
      let shouldSave = false;
      loadedDecks = loadedDecks.map(userDeck => {
        const officialDeck = defaultDecks.find(d => d.id === userDeck.id);
        let updatedDeck = { ...userDeck };
        
        if (officialDeck) {
          // Zapewnienie poprawności typu i statusu premium (isPremium) z oficjalnej talii
          const expectedType = officialDeck.type || "vocabulary";
          if (userDeck.type !== expectedType) {
            updatedDeck.type = expectedType;
            shouldSave = true;
          }

          const expectedIsPremium = !!officialDeck.isPremium;
          if (userDeck.isPremium !== expectedIsPremium) {
            updatedDeck.isPremium = expectedIsPremium;
            shouldSave = true;
          }

          // Zapewnienie poprawności pozostałych metadanych (category, level, title, description itp.)
          if (userDeck.category !== officialDeck.category ||
              userDeck.level !== officialDeck.level ||
              userDeck.title !== officialDeck.title ||
              userDeck.polishTitle !== officialDeck.polishTitle ||
              userDeck.description !== officialDeck.description) {
            updatedDeck.category = officialDeck.category;
            updatedDeck.level = officialDeck.level;
            updatedDeck.title = officialDeck.title;
            updatedDeck.polishTitle = officialDeck.polishTitle;
            updatedDeck.description = officialDeck.description;
            shouldSave = true;
          }

          // Zabezpieczenie przed brakującymi/nowymi słówkami w oficjalnej talii
          if ((userDeck.cards?.length || 0) < (officialDeck.cards?.length || 0)) {
            shouldSave = true;
            const userCustomCards = (userDeck.cards || []).filter(c => c.id && c.id.startsWith("custom-card-"));
            updatedDeck.cards = [...officialDeck.cards, ...userCustomCards];
          }
        } else {
          // Dla talii użytkownika (własnych) zapewniamy tylko domyślne typy i isPremium = false
          if (!updatedDeck.type) {
            updatedDeck.type = "vocabulary";
            shouldSave = true;
          }
          if (updatedDeck.isPremium) {
            updatedDeck.isPremium = false;
            shouldSave = true;
          }
        }
        const cards = (updatedDeck.cards || []).map(card => {
          let updatedCard = { ...card };
          if (updatedCard.level !== updatedDeck.level) {
            updatedCard.level = updatedDeck.level;
            shouldSave = true;
          }
          if (updatedCard.isPremium !== !!updatedDeck.isPremium) {
            updatedCard.isPremium = !!updatedDeck.isPremium;
            shouldSave = true;
          }
          return updatedCard;
        });
        updatedDeck.cards = cards;

        return updatedDeck;
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

    // One-time self-healing patch for June 7th, 2026 (yesterday)
    const todayStr = getLocalDateString();
    if (todayStr === "2026-06-08") {
      const dates = loadedStats.studyDates || [];
      if (dates.includes("2026-06-08") && dates.includes("2026-06-06") && !dates.includes("2026-06-07")) {
        console.log("[Streak Repair] Auto-healing missing study date: 2026-06-07");
        dates.push("2026-06-07");
        loadedStats.studyDates = dates;
        if (loadedStats.lastActiveDate === "2026-06-06") {
          loadedStats.lastActiveDate = "2026-06-07";
          loadedStats.streak += 1;
        }
      }
    }

    // Oblicz streak na podstawie daty
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
        const dateStr = getLocalDateString(d);
        if (!dateList.includes(dateStr)) dateList.push(dateStr);
      }
      loadedStats.studyDates = dateList;
    }

    // --- 3. Automatyczna migracja starego lokalnego postępu komputera ---
    // Jeśli w przeglądarce leżą stare dane lokalne z większym postępem niż te w chmurze,
    // zmigrujmy je automatycznie do chmury!
    try {
      const currentStatsKey = `lingocards_stats_${uidKey.toLowerCase()}`;
      const legacyStatsKey = `lingocards_stats_${uname.toLowerCase()}`;
      
      // Zabezpieczenie: Migrujemy dane TYLKO wtedy, gdy nazwa klucza źródłowego 
      // odpowiada dokładnie tej samej nazwie użytkownika (uname).
      // Zapobiega to kopiowaniu postępu innego gracza (np. pawelh) na nowo utworzone konto testowe.
      const localStatsKeys = [];
      if (currentStatsKey.toLowerCase() !== legacyStatsKey.toLowerCase() && localStorage.getItem(legacyStatsKey)) {
        localStatsKeys.push(legacyStatsKey);
      }
      
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
          // Do NOT copy personal profile fields (avatar, username) from another local user account:
          avatarData: loadedStats.avatarData || "👑",
          customUsername: loadedStats.customUsername || ""
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

    // --- 5. Załaduj metadane użytkownika (Rola i Status) z Firestore ---
    let userRole = "user";
    let userStatus = "active";
    if (isFirebaseConfigured && db) {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const metaSnap = await getDoc(doc(db, "users", uidKey));
        if (metaSnap.exists()) {
          const metaData = metaSnap.data();
          userRole = metaData.role || "user";
          userStatus = metaData.status || "active";
        }
      } catch (e) {
        console.warn("Failed to load user metadata:", e.message);
      }
    }

    // Zabezpieczenie: admin dla wyznaczonych kont
    const normalizedUname = uname.toLowerCase();
    const emailToCheck = (userEmail || currentUser?.email || auth?.currentUser?.email || "").toLowerCase();
    const statsName = (loadedStats?.customUsername || "").toLowerCase();
    const currentName = (currentUser?.username || "").toLowerCase();
    const authDisplayName = (auth?.currentUser?.displayName || "").toLowerCase();
    const authEmail = (auth?.currentUser?.email || "").toLowerCase();

    const isHardcodedAdmin = 
      emailToCheck === "p.hachula89@wp.pl" ||
      authEmail === "p.hachula89@wp.pl" ||
      normalizedUname === "admin";

    console.log("[Admin Check DEBUG]", {
      uid,
      username,
      userEmail,
      uname,
      normalizedUname,
      emailToCheck,
      statsName,
      currentName,
      authDisplayName,
      authEmail,
      isHardcodedAdmin,
      userRoleBeforeCheck: userRole
    });

    if (isHardcodedAdmin) {
      userRole = "admin";
    }

    // Blokada konta
    if (userStatus === "blocked") {
      setIsBlocked(true);
      return;
    } else {
      setIsBlocked(false);
    }

    // --- 6. Załaduj powiadomienia systemowe ---
    try {
      const loadedNotifs = await loadNotifications(uidKey);
      setNotifications(loadedNotifs);
    } catch (e) {
      console.warn("Failed to load notifications:", e.message);
    }

    // Ustal datę utworzenia konta (createdAt) jeśli jej nie ma
    if (!loadedStats.createdAt) {
      let resolvedCreatedAt = Date.now();
      if (auth?.currentUser?.uid === uidKey && auth?.currentUser?.metadata?.creationTime) {
        resolvedCreatedAt = new Date(auth.currentUser.metadata.creationTime).getTime();
      } else if (loadedStats.studyDates && loadedStats.studyDates.length > 0) {
        const sortedDates = [...loadedStats.studyDates].sort();
        resolvedCreatedAt = new Date(sortedDates[0]).getTime();
      }
      loadedStats.createdAt = resolvedCreatedAt;
      saveStats(uidKey, loadedStats);
    }

    // --- 7. Synchronizacja metadanych do users/{uid} ---
    try {
      const emailToSync = userEmail || currentUser?.email || auth?.currentUser?.email || "";
      const metaRecord = {
        uid: uidKey,
        username: loadedStats.customUsername || uname,
        email: emailToSync,
        avatar: loadedStats.avatarData || "👑",
        createdAt: loadedStats.createdAt,
        lastActiveDate: todayStr,
        lastActiveAt: Date.now(),
        xp: loadedStats.xp || 0,
        level: loadedStats.level || 1,
        streak: loadedStats.streak || 0,
        wordsCount: Object.keys(loadedStats.learnedCards || {}).length,
        role: userRole,
        status: userStatus,
        isPro: !!loadedStats.isPro
      };
      await syncUserMeta(uidKey, metaRecord);
    } catch (e) {
      console.warn("Failed to sync user metadata record:", e.message);
    }

    // --- 8. Synchronizacja stanów pobocznych UI ---
    setCurrentUser(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        avatar: loadedStats.avatarData || prev.avatar,
        username: loadedStats.customUsername || prev.username,
        role: userRole
      };
      localStorage.setItem("lingocards_current_user", JSON.stringify(updated));
      return updated;
    });

    // Zsynchronizuj aktywne talie z wczytanych statystyk
    const activeDeckIdsToSet = loadedStats.activeDeckIds || [];
    setActiveDeckIds(activeDeckIdsToSet);
    const activeDecksKey = `lingocards_active_decks_${uname.toLowerCase()}`;
    localStorage.setItem(activeDecksKey, JSON.stringify(activeDeckIdsToSet));
    
    const activeDecks = loadedDecks.filter(d => activeDeckIdsToSet.includes(d.id) || !systemDeckIds.has(d.id));
    const lastDeck = loadedStats.lastDeckId ? loadedDecks.find(d => d.id === loadedStats.lastDeckId) : null;
    if (lastDeck) setSelectedDeck(lastDeck);
    else if (activeDecks.length > 0) setSelectedDeck(activeDecks[0]);
    else if (loadedDecks.length > 0) setSelectedDeck(loadedDecks[0]);

    // Zsynchronizuj motyw graficzny z wczytanych statystyk
    const themeToSet = loadedStats.theme || "navy";
    setTheme(themeToSet);
    localStorage.setItem("lingocards_theme", themeToSet);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("lingocards_current_user", JSON.stringify(user));
    // Użyj uid (Google) lub username (lokalny) jako klucz Firestore
    const uid = user.uid || user.username;
    loadUserData(uid, user.username, user.email);
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
      loadUserData(currentUser.uid || cleanNewUsername, cleanNewUsername, currentUser.email);
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
        if (uidKey) {
          saveStats(uidKey, updatedStats);
          updateUserField(uidKey, {
            xp: updatedStats.xp || 0,
            level: updatedStats.level || 1,
            streak: updatedStats.streak || 0,
            wordsCount: Object.keys(updatedStats.learnedCards || {}).length,
            avatar: updatedStats.avatarData || currentUser?.avatar || "👑",
            username: updatedStats.customUsername || currentUser?.username || "",
            isPro: !!updatedStats.isPro,
            lastActiveAt: Date.now()
          }).catch(err => console.warn("Failed to sync leaderboard stats to users collection:", err.message));
        }
      }
      return updatedStats;
    });
  };

  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    if (deck) {
      handleSetStats({ lastDeckId: deck.id });
    }
  };

  const handleOpenPremiumModal = (deck) => {
    playSound("error", stats.audioStyle || "synth");
    setPremiumTriggerDeck(deck);
    setShowPremiumModal(true);
  };

  const handleMarkNotificationAsRead = async (notificationId) => {
    if (!currentUser) return;
    try {
      const uidKey = getFirestoreUidKey(currentUser.uid);
      await markNotificationAsRead(uidKey, notificationId);
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
    } catch (e) {
      console.warn("Failed to mark notification as read:", e.message);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (!currentUser) return;
    try {
      const uidKey = getFirestoreUidKey(currentUser.uid);
      await deleteNotification(uidKey, notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (e) {
      console.warn("Failed to delete notification:", e.message);
    }
  };



  const handleAddXp = (amount) => {
    if (!currentUser) return;
    setStats(prev => {
      const currentXp = prev.xp || 0;
      const currentLevel = prev.level || 1;
      const newXp = currentXp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      
      const todayStr = getLocalDateString();
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
      
      // Check theme unlocks (only for PRO users)
      if (prev.isPro) {
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
      }
      
      if (newLevel > currentLevel) {
        setTimeout(() => {
          playSound("levelup", prev.isPro ? (prev.audioStyle || "synth") : (prev.audioStyle === "off" ? "off" : "synth"));
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
      lastActiveDate: getLocalDateString(),
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

  const handleAddCard = (deckId, newCardOrCards) => {
    const cardsToAdd = Array.isArray(newCardOrCards) ? newCardOrCards : [newCardOrCards];
    const updated = decks.map(deck => {
      if (deck.id === deckId) {
        // Zabezpieczenie przed dublowaniem (ignorowanie słówek już obecnych w talii)
        const existingEnglish = new Set((deck.cards || []).map(c => c.english.trim().toLowerCase()));
        const uniqueNewCards = cardsToAdd.filter(c => !existingEnglish.has(c.english.trim().toLowerCase()));
        return {
          ...deck,
          cards: [...(deck.cards || []), ...uniqueNewCards]
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

  // If account is blocked, show blocked screen
  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-main)]">
        <div className="glass-card w-full max-w-md p-8 text-center flex flex-col items-center gap-6 border-red-500/20 shadow-[0_0_35px_rgba(239,68,68,0.1)]">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
            <Icons.ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Konto Zablokowane</h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Twoje konto zostało zawieszone przez administratora.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Skontaktuj się z nami pod adresem p.hachula89@wp.pl w celu wyjaśnienia sprawy.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full btn btn-secondary text-xs py-3 rounded-xl hover:bg-white/10"
          >
            Wyloguj się
          </button>
        </div>
      </div>
    );
  }

  // Compile Dynamic SRS Deck
  const todayStr = getLocalDateString();
  const realDecksForSrs = decks.filter(d => {
    if (d.id === "starred" || d.id === "srs") return false;
    if (!stats.isPro && d.isPremium) return false;
    return true;
  });
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
    if (!srs) return false;
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
              LingoCards {stats.isPro ? (
                <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-black border border-amber-500/20 shadow-sm shadow-amber-500/5">PRO</span>
              ) : (
                <span className="text-[9px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-full font-bold border border-white/10">FREE</span>
              )}
            </h1>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black mt-0.5 whitespace-nowrap">Premium Language Learning</p>
          </div>
        </div>

        {/* Tab Actions — wszystkie zakładki obok siebie */}
        <div className="hidden lg:flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 overflow-x-auto no-scrollbar">
          {(() => {
            const tabs = [
              { id: "dashboard", label: "Pulpit", icon: null },
              { id: "library",   label: "Katalog", icon: "Compass" },
              { id: "learn",     label: "Fiszki",  icon: null },
              { id: "quiz",      label: "Testy",   icon: null },
              { id: "match",     label: "Gra",     icon: "Zap" },
              { id: "creator",   label: "Menedżer",icon: "PlusCircle" },
              { id: "stats",     label: "Statyst.",icon: "BarChart2" },
              { id: "referrals", label: "Polecenia",icon: "Users" },
            ];
            if (currentUser?.role === "admin") {
              tabs.push({ id: "admin", label: "Admin Panel", icon: "ShieldAlert" });
            }
            return tabs.map(({ id, label, icon }) => {
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
            });
          })()}
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
                {getSortedDecks([srsDeck, starredDeck, ...decks]).map(d => {
                  const isLocked = !stats.isPro && d.isPremium;
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
                  const isUnlocked = !!stats.isPro && (stats.level || 1) >= t.levelRequired;
                  return (
                    <option 
                      key={t.id} 
                      value={t.id} 
                      disabled={!isUnlocked} 
                      className={`bg-[var(--bg-main)] ${isUnlocked ? "text-[var(--text-primary)]" : "text-slate-600 font-normal"}`}
                    >
                      {isUnlocked ? `✨ ${t.label}` : (!stats.isPro ? `🔒 ${t.label} (Premium PRO)` : `🔒 ${t.label} (Poziom ${t.levelRequired})`)}
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

          {/* Notifications Bell */}
          <button 
            onClick={() => setShowNotifications(true)}
            className={`relative flex items-center justify-center p-2.5 rounded-xl border scale-hover shrink-0 ${
              showNotifications 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Powiadomienia"
          >
            <Icons.Bell size={16} className={notifications.filter(n => !n.read).length > 0 ? "animate-wiggle" : ""} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-black text-white shadow-md animate-pulse">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Premium / PRO Status Button */}
          <button 
            onClick={() => {
              if (stats.isPro) {
                handleSetStats({ isPro: false });
                playSound("success", stats.audioStyle || "synth");
              } else {
                handleOpenPremiumModal(null);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border scale-hover shrink-0 text-xs font-bold transition-all ${
              stats.isPro 
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-md shadow-amber-500/5 font-extrabold" 
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
            }`}
            title={stats.isPro ? "Masz aktywny pakiet PRO! Kliknij, aby zmienić na FREE (symulacja)" : "Kliknij, aby odblokować wersję PRO"}
          >
            <Icons.Crown size={14} className={stats.isPro ? "fill-amber-400 text-amber-400" : "text-slate-400"} />
            <span className="hidden sm:inline">{stats.isPro ? "PRO" : "FREE"}</span>
          </button>

          {/* Daily streak indicator */}
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1.5 rounded-xl font-mono text-xs font-bold shadow-sm whitespace-nowrap shrink-0" title="Twój codzienny streak nauki!">
            <Icons.Flame size={14} className="fill-amber-500/15 shrink-0" />
            <span className="whitespace-nowrap shrink-0">{formatDays(stats.streak || 0)}</span>
          </div>

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
            <span className="hidden xl:inline text-xs font-bold whitespace-nowrap shrink-0">
              {currentUser.username} <span className="text-[10px] opacity-60 font-medium">({currentUser.role === "admin" ? "Admin" : "User"})</span>
            </span>
          </button>

          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center p-2.5 rounded-xl border bg-rose-500/10 border-rose-500/20 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 scale-hover shrink-0"
            title="Wyloguj się"
          >
            <Icons.LogOut size={16} className="shrink-0" />
          </button>
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
        {currentUser?.role === "admin" && (
          <button 
            onClick={() => setView("admin")} 
            className={`flex flex-col items-center gap-0.5 p-2 rounded-xl text-[10px] font-bold transition-all ${
              view === "admin" ? "text-rose-400 font-extrabold" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Icons.ShieldAlert size={20} />
            <span>Admin</span>
          </button>
        )}
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
            onSelectDeck={handleSelectDeck} 
            onNavigate={setView}
            onUpdateDeck={handleUpdateDeck}
            onDeleteDeck={handleDeleteDeck}
            systemDeckIds={systemDeckIds}
            activeDeckIds={activeDeckIds}
            onOpenPremium={handleOpenPremiumModal}
          />
        )}

        {view === "library" && (
          <Library 
            decks={decks.filter(d => d.id !== 'starred' && d.id !== 'srs')} 
            systemDeckIds={systemDeckIds}
            activeDeckIds={activeDeckIds} 
            onToggleActiveDeck={handleToggleActiveDeck} 
            onSelectDeck={handleSelectDeck} 
            onNavigate={setView} 
            stats={stats} 
            onUpdateStats={handleSetStats} 
            onOpenPremium={handleOpenPremiumModal}
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
            loadAllUsers={loadAllUsers}
            systemConfig={systemConfig}
            currentUser={currentUser}
          />
        )}

        {view === "admin" && currentUser?.role === "admin" && (
          <AdminPanel 
            loadAllUsers={loadAllUsers} 
            updateUserField={updateUserField}
            sendSystemNotification={sendSystemNotification}
            currentUser={currentUser}
            stats={stats}
            systemConfig={systemConfig}
            updateSystemConfig={(newCfg) => {
              setSystemConfig(newCfg);
              updateSystemConfig(newCfg);
            }}
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
          onSelectDeck={handleSelectDeck}
          onClose={() => setShowSearch(false)}
        />
      )}

      {/* Notifications Panel (Drawer) */}
      {showNotifications && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Soft Backdrop */}
          <div 
            onClick={() => setShowNotifications(false)}
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs animate-fade-in cursor-pointer"
          />
          {/* Drawer Body */}
          <div className="glass-card rounded-l-[32px] rounded-r-none fixed inset-y-0 right-0 z-[150] w-full sm:w-[440px] border-y-0 border-r-0 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col animate-slide-left h-full overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Icons.Bell size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">Wiadomości i Ogłoszenia</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Komunikaty od administratora aplikacji</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <Icons.X size={18} />
                </button>
              </div>

              {/* Notification List */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="p-4 rounded-full bg-white/5 text-slate-500">
                      <Icons.MailOpen size={36} />
                    </div>
                    <div>
                      <h4 className="text-slate-300 font-bold">Brak powiadomień</h4>
                      <p className="text-slate-500 text-xs mt-1 max-w-xs">Brak wiadomości od administratora. Gdy się pojawią, zobaczysz je tutaj!</p>
                    </div>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const dateStr = notif.createdAt ? new Date(notif.createdAt).toLocaleString("pl-PL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    }) : "";
                    
                    return (
                      <div 
                        key={notif.id}
                        onClick={() => {
                          if (!notif.read) handleMarkNotificationAsRead(notif.id);
                        }}
                        className={`p-4 rounded-xl border transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                          notif.read 
                            ? "bg-white/[0.02] border-white/5 opacity-70" 
                            : "bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 border-indigo-500/20 shadow-[0_4px_20px_rgba(99,102,241,0.05)] hover:border-indigo-500/30"
                        }`}
                      >
                        {/* Read status dot */}
                        {!notif.read && (
                          <div className="absolute top-4 right-4 group-hover:right-11 h-2 w-2 rounded-full bg-rose-500 animate-pulse transition-all" />
                        )}

                        {/* Delete button (trash icon) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notif.id);
                          }}
                          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                          title="Usuń powiadomienie"
                        >
                          <Icons.Trash2 size={13} />
                        </button>

                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className={`font-bold pr-6 ${notif.read ? "text-slate-300" : "text-white text-base"}`}>
                              {notif.title || "Ogłoszenie systemowe"}
                            </h4>
                          </div>
                          
                          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed pr-2">
                            {notif.message}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5 text-slate-500 text-[11px] font-medium">
                            <span className="flex items-center gap-1">
                              <Icons.Calendar size={12} />
                              {dateStr}
                            </span>

                            {!notif.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkNotificationAsRead(notif.id);
                                }}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all text-xs font-bold"
                              >
                                <Icons.Check size={12} />
                                Oznacz jako przeczytane
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Wszystkich wiadomości: {notifications.length}</span>
                {notifications.filter(n => !n.read).length > 0 && (
                  <button
                    onClick={() => {
                      notifications.forEach(notif => {
                        if (!notif.read) {
                          handleMarkNotificationAsRead(notif.id);
                        }
                      });
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                  >
                    Oznacz wszystkie jako przeczytane
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Premium Teaser Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-md p-6 border-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.15)] flex flex-col items-center gap-4 text-center animate-scale-up relative">
            
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
            >
              <Icons.X size={18} />
            </button>

            <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 border-2 border-amber-400/30 animate-pulse">
              <Icons.Crown size={24} className="fill-white/10" />
            </div>

            <div>
              <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/20">✦ Plan PRO</span>
              <h3 className="text-xl font-black text-white mt-2 tracking-tight">
                {premiumTriggerDeck ? "Odblokuj zaawansowane lekcje" : "Odblokuj wersję PRO"}
              </h3>
              {premiumTriggerDeck ? (
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Talia <strong className="text-white">"{premiumTriggerDeck?.title}"</strong> zawiera zaawansowane słownictwo na poziomie <strong className="text-indigo-400">{premiumTriggerDeck?.level}</strong> i wymaga konta premium.
                </p>
              ) : (
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Uzyskaj pełny dostęp do wszystkich talii (od poziomu B1 do C2), specjalistycznego słownictwa oraz dodatkowych motywów graficznych.
                </p>
              )}
            </div>

            {/* Benefits list */}
            <div className="w-full bg-black/40 border border-white/5 rounded-xl p-3.5 text-left flex flex-col gap-2">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Icons.CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Poziomy B1-C2:</strong> Opanuj średnio- i zaawansowany język angielski.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Icons.CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Talie specjalistyczne:</strong> Business English, IT/Technologia, Idiomy.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Icons.CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Nielimitowane efekty i motywy:</strong> Odblokuj wszystkie szaty graficzne premium.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Icons.CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Synchronizacja Firestore:</strong> Twoje słówka i statystyki bezpieczne w chmurze.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-1">
              <button 
                onClick={() => {
                  handleSetStats({ isPro: true });
                  setShowPremiumModal(false);
                  playSound("achievement", stats.audioStyle || "synth");
                }}
                className="flex-grow btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white font-extrabold text-xs py-2.5 rounded-xl shadow-lg shadow-amber-500/10 scale-hover uppercase tracking-wider"
              >
                Kup PRO (Symulacja) 💳
              </button>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="flex-grow btn btn-secondary text-xs py-2.5 rounded-xl"
              >
                Może później
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

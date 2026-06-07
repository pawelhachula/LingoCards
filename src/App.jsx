import React, { useState, useEffect } from "react";
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
  { id: "sunset", label: "Sunset Glow (Jasny)", xpRequired: 10 },
  { id: "mint", label: "Midnight Mint", xpRequired: 20 },
  { id: "nebula", label: "Cosmic Nebula", xpRequired: 30 },
  { id: "lavender", label: "Lavender Pastel (Jasny)", xpRequired: 40 },
  { id: "cyberpunk", label: "Cyberpunk Neon", xpRequired: 50 },
  { id: "ocean", label: "Ocean Breeze (Jasny)", xpRequired: 60 },
  { id: "volcano", label: "Volcanic Ash", xpRequired: 70 },
  { id: "glacier", label: "Frosted Glacier (Jasny)", xpRequired: 80 },
  { id: "emerald", label: "Cyber Emerald", xpRequired: 90 },
  { id: "gold", label: "Royal Gold", xpRequired: 100 },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard"); // 'dashboard', 'learn', 'quiz', 'match', 'creator', 'profile'
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [theme, setTheme] = useState("navy"); // default to navy (Deep Navy)
  const [unlockedThemeToast, setUnlockedThemeToast] = useState("");
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState({ oldLevel: 1, newLevel: 1 });
  const [showSearch, setShowSearch] = useState(false);
  const [activeDeckIds, setActiveDeckIds] = useState([]);
  // 'graphite' | 'green' | 'navy' | 'sakura' | 'forest' | 'amber'
  
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
    audioStyle: "synth",
    confettiStyle: "standard",
    reviewsCount: 0,
    cardMistakes: {},
    dailyHistory: {},
    studyTime: 0
  });

  // Check login session & theme on mount
  useEffect(() => {
    // Load Theme
    const savedTheme = localStorage.getItem("lingocards_theme") || "navy";
    setTheme(savedTheme);

    // Load Session
    const sessionUserStr = localStorage.getItem("lingocards_current_user");
    if (sessionUserStr) {
      try {
        const sessionUser = JSON.parse(sessionUserStr);
        setCurrentUser(sessionUser);
        loadUserData(sessionUser.username);
      } catch (e) {
        console.error("Error loading session", e);
      }
    }
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

  // Helper to load user specific data
  const loadUserData = (username) => {
    const userDecksKey = `lingocards_decks_${username.toLowerCase()}`;
    const savedDecks = localStorage.getItem(userDecksKey);
    let loadedDecks = [];
    if (savedDecks) {
      try {
        loadedDecks = JSON.parse(savedDecks);
        // Automatyczne przywracanie brakujących talii domyślnych lub aktualizacja słówek
        let shouldSave = false;
        
        // Zaktualizuj istniejące talie systemowe, jeśli mają za mało słówek lub zdezaktualizowane dane
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
          localStorage.setItem(userDecksKey, JSON.stringify(loadedDecks));
        }
      } catch (e) {
        console.error("Error parsing user decks", e);
        loadedDecks = defaultDecks;
      }
    } else {
      loadedDecks = defaultDecks;
      localStorage.setItem(userDecksKey, JSON.stringify(defaultDecks));
    }
    setDecks(loadedDecks);

    // Wczytaj aktywne talie (activeDeckIds)
    const activeDecksKey = `lingocards_active_decks_${username.toLowerCase()}`;
    const savedActiveDecks = localStorage.getItem(activeDecksKey);
    let loadedActiveDecks = ["everyday", "travel"];
    if (savedActiveDecks) {
      try {
        loadedActiveDecks = JSON.parse(savedActiveDecks);
      } catch (e) {
        console.error("Error parsing active decks", e);
      }
    }
    setActiveDeckIds(loadedActiveDecks);

    const activeDecks = loadedDecks.filter(d => loadedActiveDecks.includes(d.id) || d.id.startsWith("custom-deck-"));
    if (activeDecks.length > 0) {
      setSelectedDeck(activeDecks[0]);
    } else if (loadedDecks.length > 0) {
      setSelectedDeck(loadedDecks[0]);
    }

    const userStatsKey = `lingocards_stats_${username.toLowerCase()}`;
    const savedStats = localStorage.getItem(userStatsKey);
    let loadedStats = {
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
      audioStyle: "synth",
      confettiStyle: "standard",
      reviewsCount: 0,
      cardMistakes: {},
      dailyHistory: {},
      studyTime: 0
    };

    if (savedStats) {
      try {
        loadedStats = { ...loadedStats, ...JSON.parse(savedStats) };
      } catch (e) {
        console.error("Error parsing user stats", e);
      }
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const lastActive = loadedStats.lastActiveDate;

    if (lastActive) {
      if (lastActive === todayStr) {
        // Keep current day stats
      } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffTime = Math.abs(todayDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          loadedStats.streak += 1;
        } else if (diffDays > 1) {
          loadedStats.streak = 1;
        }
        
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

    // Synchronizuj studyDates z aktualnym streakem, aby kalendarz odzwierciedlał serię dni
    const streakVal = loadedStats.streak || 0;
    if (streakVal > 0) {
      const dates = loadedStats.studyDates || [];
      const dateList = [...dates];
      const baseDate = new Date(loadedStats.lastActiveDate || todayStr);
      for (let i = 0; i < streakVal; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        if (!dateList.includes(dateStr)) {
          dateList.push(dateStr);
        }
      }
      loadedStats.studyDates = dateList;
    }

    setStats(loadedStats);
    localStorage.setItem(userStatsKey, JSON.stringify(loadedStats));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("lingocards_current_user", JSON.stringify(user));
    loadUserData(user.username);
    setView("dashboard");
  };

  const handleLogout = () => {
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
    
    // If username changed, reload states with the new namespace
    if (cleanNewUsername.toLowerCase() !== oldUsername.toLowerCase()) {
      loadUserData(cleanNewUsername);
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
        const userStatsKey = `lingocards_stats_${currentUser.username.toLowerCase()}`;
        localStorage.setItem(userStatsKey, JSON.stringify(updatedStats));
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
        if (newXp >= t.xpRequired && currentXp < t.xpRequired) {
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
      
      const userStatsKey = `lingocards_stats_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userStatsKey, JSON.stringify(updatedStats));
      
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
      confettiStyle: "standard"
    };
    setStats(defaultStatsObj);
    localStorage.setItem(userStatsKey, JSON.stringify(defaultStatsObj));

    // Reset decks namespace
    const userDecksKey = `lingocards_decks_${username.toLowerCase()}`;
    setDecks(defaultDecks);
    localStorage.setItem(userDecksKey, JSON.stringify(defaultDecks));

    // Reset active decks namespace
    const activeDecksKey = `lingocards_active_decks_${username.toLowerCase()}`;
    const defaultActiveDecks = ["everyday", "travel"];
    setActiveDeckIds(defaultActiveDecks);
    localStorage.setItem(activeDecksKey, JSON.stringify(defaultActiveDecks));

    const activeDecks = defaultDecks.filter(d => defaultActiveDecks.includes(d.id));
    setSelectedDeck(activeDecks[0] || defaultDecks[0]);
  };

  const handleToggleActiveDeck = (deckId) => {
    if (!currentUser) return;
    setActiveDeckIds(prev => {
      let updated;
      if (prev.includes(deckId)) {
        updated = prev.filter(id => id !== deckId);
      } else {
        updated = [...prev, deckId];
      }
      const activeDecksKey = `lingocards_active_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(activeDecksKey, JSON.stringify(updated));
      return updated;
    });
  };

  const handleCreateDeck = (newDeck) => {
    const updated = [...decks, newDeck];
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
    }
  };

  const handleDeleteDeck = (deckId) => {
    if (!deckId.startsWith("custom-deck-")) return;
    const updated = decks.filter(d => d.id !== deckId);
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
    }
    if (selectedDeck && selectedDeck.id === deckId) {
      setSelectedDeck(updated[0] || null);
    }
  };

  const handleEditDeck = (deckId, updatedFields) => {
    if (!deckId.startsWith("custom-deck-")) return;
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

  const activeAndCustomDecks = decks.filter(d => activeDeckIds.includes(d.id) || d.id.startsWith("custom-deck-"));
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
        <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={() => setView("dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
            <Icons.BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              LingoCards <span className="text-[10px] bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded-full font-black border border-indigo-500/10">PRO</span>
            </h1>
            <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black mt-0.5">Premium Language Learning</p>
          </div>
        </div>

        {/* Tab Actions */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
          <button 
            onClick={() => setView("dashboard")} 
            className={`px-4 py-2.5 rounded-xl transition-all border ${
              view === "dashboard" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            Pulpit
          </button>

          <button 
            onClick={() => setView("library")} 
            className={`px-4 py-2.5 rounded-xl transition-all border flex items-center gap-1.5 ${
              view === "library" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm font-extrabold" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            <Icons.Compass size={14} />
            Katalog
          </button>
          
          <button 
            onClick={() => setView("learn")} 
            className={`px-4 py-2.5 rounded-xl transition-all border ${
              view === "learn" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            Fiszki
          </button>

          <button 
            onClick={() => setView("quiz")} 
            className={`px-4 py-2.5 rounded-xl transition-all border ${
              view === "quiz" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            Testy
          </button>

          <button 
            onClick={() => setView("match")} 
            className={`px-4 py-2.5 rounded-xl transition-all border ${
              view === "match" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            Gra w pary
          </button>

          <button 
            onClick={() => setView("creator")} 
            className={`px-4 py-2.5 rounded-xl transition-all border ${
              view === "creator" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            Menedżer
          </button>

          <button 
            onClick={() => setView("stats")} 
            className={`px-4 py-2.5 rounded-xl transition-all border flex items-center gap-1.5 ${
              view === "stats" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            <Icons.BarChart2 size={14} />
            Statystyki
          </button>

          <button 
            onClick={() => setView("referrals")} 
            className={`px-4 py-2.5 rounded-xl transition-all border flex items-center gap-1.5 ${
              view === "referrals" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
            }`}
          >
            <Icons.Users size={14} />
            Polecenia
          </button>
        </div>

        {/* Global Streak / Theme Selector / User Profile */}
        <div className="flex items-center gap-3">
          {view !== "dashboard" && view !== "profile" && displayedDecks.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 bg-black/30 border border-white/5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300">
              <span className="text-slate-500 font-extrabold uppercase text-[9px] tracking-wider">Talia:</span>
              <select 
                value={selectedDeck?.id || ""} 
                onChange={(e) => setSelectedDeck(displayedDecks.find(d => d.id === e.target.value))}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-bold border-none p-0 pr-6"
              >
                {displayedDecks.map(d => (
                  <option key={d.id} value={d.id} className="bg-[var(--bg-main)] text-[var(--text-primary)]">{d.title}</option>
                ))}
              </select>
            </div>
          )}

          {/* THEME SELECTOR DROPDOWN */}
          <div className="flex items-center gap-2 bg-black/30 border border-white/8 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300">
            <Icons.Palette size={14} className="text-slate-400 shrink-0" />
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-bold border-none p-0 pr-6 text-xs"
            >
              <optgroup label="Motywy podstawowe" className="bg-[var(--bg-main)] text-slate-400">
                {DEFAULT_THEMES.map(t => (
                  <option key={t.id} value={t.id} className="bg-[var(--bg-main)] text-[var(--text-primary)]">{t.label}</option>
                ))}
              </optgroup>
              {PREMIUM_THEMES.some(t => (stats.xp || 0) >= t.xpRequired) && (
                <optgroup label="Motywy premium (Odblokowane)" className="bg-[var(--bg-main)] text-indigo-400">
                  {PREMIUM_THEMES.filter(t => (stats.xp || 0) >= t.xpRequired).map(t => (
                    <option key={t.id} value={t.id} className="bg-[var(--bg-main)] text-[var(--text-primary)]">✨ {t.label}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Search button */}
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all scale-hover"
            title="Wyszukaj słówko (Ctrl+K)"
          >
            <Icons.Search size={15} />
            <span className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
              Szukaj
              <kbd className="border border-white/10 rounded px-1.5 py-0.5 font-mono text-[9px]">Ctrl K</kbd>
            </span>
          </button>

          {/* Leaderboard button */}
          <button 
            onClick={() => setView("leaderboard")}
            className={`flex items-center justify-center p-2.5 rounded-xl border scale-hover ${
              view === "leaderboard" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Ranking Rywalizacji"
          >
            <Icons.Trophy size={16} />
          </button>

          {/* Settings gear button */}
          <button 
            onClick={() => setView("settings")}
            className={`flex items-center justify-center p-2.5 rounded-xl border scale-hover ${
              view === "settings" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="Ustawienia"
          >
            <Icons.Settings size={16} />
          </button>

          <button 
            onClick={() => setView("profile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border scale-hover ${
              view === "profile" 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            {currentUser.avatar && currentUser.avatar.startsWith("data:") ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover border border-white/20" />
            ) : (
              <span className="text-base">{currentUser.avatar || "👑"}</span>
            )}
            <span className="hidden lg:inline text-xs font-bold">{currentUser.username}</span>
          </button>

          {/* Daily streak indicator */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3.5 py-2 rounded-xl font-mono text-sm font-bold shadow-sm" title="Twój codzienny streak nauki!">
            <Icons.Flame size={16} className="fill-amber-500/15" />
            <span>{stats.streak || 0} dni</span>
          </div>
        </div>
      </nav>

      {/* Bottom Nav Bar for Mobile Screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-around shadow-2xl">
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
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
        {view === "dashboard" && (
          <Dashboard 
            decks={displayedDecks} 
            stats={stats} 
            setStats={handleSetStats}
            onSelectDeck={setSelectedDeck} 
            onNavigate={setView} 
          />
        )}

        {view === "library" && (
          <Library 
            decks={decks.filter(d => !d.id.startsWith("custom-deck-"))} 
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
            decks={displayedDecks} 
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
            user={currentUser}
            onLogout={handleLogout}
            stats={stats}
            decks={decks}
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
          decks={displayedDecks}
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

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
import * as Icons from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard"); // 'dashboard', 'learn', 'quiz', 'match', 'creator', 'profile'
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [theme, setTheme] = useState("navy"); // default to navy (Deep Navy)
  // 'graphite' | 'green' | 'navy' | 'sakura' | 'forest' | 'amber'
  
  const [stats, setStats] = useState({
    streak: 0,
    dailyCount: 0,
    lastActiveDate: "",
    learnedCards: {},
    starredCards: {},
    quizTotal: 0,
    quizCorrect: 0,
    matchesWon: 0
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

  // Update HTML data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
      } catch (e) {
        console.error("Error parsing user decks", e);
        loadedDecks = defaultDecks;
      }
    } else {
      loadedDecks = defaultDecks;
      localStorage.setItem(userDecksKey, JSON.stringify(defaultDecks));
    }
    setDecks(loadedDecks);

    if (loadedDecks.length > 0) {
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
      matchesWon: 0
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

  const handleSetStats = (newStats) => {
    setStats(newStats);
    if (currentUser) {
      const userStatsKey = `lingocards_stats_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userStatsKey, JSON.stringify(newStats));
    }
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
      dailyTarget: 10
    };
    setStats(defaultStatsObj);
    localStorage.setItem(userStatsKey, JSON.stringify(defaultStatsObj));

    // Reset decks namespace
    const userDecksKey = `lingocards_decks_${username.toLowerCase()}`;
    setDecks(defaultDecks);
    localStorage.setItem(userDecksKey, JSON.stringify(defaultDecks));
    setSelectedDeck(defaultDecks[0]);
  };

  const handleCreateDeck = (newDeck) => {
    const updated = [...decks, newDeck];
    setDecks(updated);
    if (currentUser) {
      const userDecksKey = `lingocards_decks_${currentUser.username.toLowerCase()}`;
      localStorage.setItem(userDecksKey, JSON.stringify(updated));
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

  // Compile Dynamic Starred Deck
  const starredCards = decks.flatMap(d => d.cards || []).filter(c => stats.starredCards?.[c.id]);
  
  const starredDeck = starredCards.length > 0 ? {
    id: "starred",
    title: "Ulubione i trudne",
    polishTitle: "Starred & Difficult",
    description: "Twoja własna lista słówek oznaczona gwiazdką. Skup się na ich powtórce!",
    icon: "Star",
    color: "#f59e0b",
    cards: starredCards
  } : null;

  const displayedDecks = starredDeck ? [starredDeck, ...decks] : decks;

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
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

          {/* THEME SELECTOR BUTTONS */}
          <div className="flex items-center gap-1.5 bg-black/30 border border-white/8 px-2.5 py-1.5 rounded-xl" title="Zmień motyw graficzny">
            <button 
              onClick={() => handleThemeChange("graphite")} 
              className={`w-4 h-4 rounded-full bg-[#6366f1] border-2 transition-all hover:scale-110 ${
                theme === "graphite" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Aurora Graphite (Ciemny)"
            />
            <button 
              onClick={() => handleThemeChange("green")} 
              className={`w-4 h-4 rounded-full bg-[#10b981] border-2 transition-all hover:scale-110 ${
                theme === "green" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Bottle Green (Ciemny)"
            />
            <button 
              onClick={() => handleThemeChange("navy")} 
              className={`w-4 h-4 rounded-full bg-[#2563eb] border-2 transition-all hover:scale-110 ${
                theme === "navy" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Deep Navy (Ciemny)"
            />
            <div className="w-[1px] h-3 bg-white/20 mx-0.5" />
            <button 
              onClick={() => handleThemeChange("sakura")} 
              className={`w-4 h-4 rounded-full bg-[#db2777] border-2 transition-all hover:scale-110 ${
                theme === "sakura" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Light Sakura (Jasny)"
            />
            <button 
              onClick={() => handleThemeChange("forest")} 
              className={`w-4 h-4 rounded-full bg-[#059669] border-2 transition-all hover:scale-110 ${
                theme === "forest" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Light Forest (Jasny)"
            />
            <button 
              onClick={() => handleThemeChange("amber")} 
              className={`w-4 h-4 rounded-full bg-[#d97706] border-2 transition-all hover:scale-110 ${
                theme === "amber" ? "border-[var(--text-primary)] scale-105" : "border-transparent opacity-60"
              }`}
              title="Light Amber (Jasny)"
            />
          </div>

          {/* User profile button */}
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
            onSelectDeck={setSelectedDeck} 
            onNavigate={setView} 
          />
        )}
        
        {view === "learn" && (
          <Flashcards 
            selectedDeck={selectedDeck} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
          />
        )}

        {view === "quiz" && (
          <Quiz 
            selectedDeck={selectedDeck} 
            decks={displayedDecks} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
          />
        )}

        {view === "match" && (
          <Matcher 
            selectedDeck={selectedDeck} 
            stats={stats} 
            setStats={handleSetStats} 
            onNavigate={setView} 
          />
        )}

        {view === "creator" && (
          <Creator 
            decks={decks} 
            onCreateDeck={handleCreateDeck}
            onAddCard={handleAddCard}
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
          />
        )}
      </main>
    </div>
  );
}

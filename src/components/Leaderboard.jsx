import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { formatDays } from "../utils/date";

export default function Leaderboard({ stats, onNavigate, loadAllUsers, systemConfig, currentUser }) {
  const [activeTab, setActiveTab] = useState("xp"); // 'xp' | 'streak' | 'words'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users on mount
  useEffect(() => {
    let active = true;
    if (loadAllUsers) {
      loadAllUsers().then(data => {
        if (active) {
          const loaded = data || [];
          console.log(`[Leaderboard] Loaded ${loaded.length} users from Firestore:`, loaded.map(u => u.username || u.uid));
          setUsers(loaded);
          setLoading(false);
        }
      }).catch(err => {
        console.warn("Failed to load users for leaderboard:", err);
        if (active) setLoading(false);
      });
    } else {
      console.warn("[Leaderboard] loadAllUsers is not available — Firebase may not be configured");
      setLoading(false);
    }
    return () => { active = false; };
  }, [loadAllUsers]);

  const getRankTitle = (lvl) => {
    if (lvl >= 100) return "Tytan Słownictwa 🌋";
    if (lvl >= 81) return "Arcymistrz ⚡";
    if (lvl >= 66) return "Mistrz 👑";
    if (lvl >= 51) return "Mentor 🏛️";
    if (lvl >= 41) return "Ekspert 🧠";
    if (lvl >= 33) return "Uczony 🎓";
    if (lvl >= 26) return "Poliglota 🗣️";
    if (lvl >= 20) return "Praktyk 🛠️";
    if (lvl >= 15) return "Poszukiwacz 🗺️";
    if (lvl >= 10) return "Odkrywca 🧭";
    if (lvl >= 6) return "Adept ⚙️";
    if (lvl >= 3) return "Uczeń 📚";
    return "Nowicjusz 🌱";
  };

  // Competitors Mock Database
  const mockCompetitors = [
    { username: "Alex_Lingo", avatar: "🦊", xp: 2200, streak: 12, words: 62, level: 8, title: getRankTitle(8) },
    { username: "Emily_Eng", avatar: "🦉", xp: 1450, streak: 8, words: 45, level: 5, title: getRankTitle(5) },
    { username: "Lucas_Learn", avatar: "🦁", xp: 620, streak: 3, words: 24, level: 3, title: getRankTitle(3) },
    { username: "Sophia_Word", avatar: "🦄", xp: 1850, streak: 9, words: 54, level: 7, title: getRankTitle(7) },
    { username: "Kamil_Fiszka", avatar: "🐼", xp: 1100, streak: 5, words: 38, level: 4, title: getRankTitle(4) },
  ];

  // User details
  const userXp = stats.xp || 0;
  const userStreak = stats.streak || 0;
  const userWords = Object.keys(stats.learnedCards || {}).length;
  const userLevel = stats.level || 1;
  const userTitle = getRankTitle(userLevel);

  const currentUsernameLower = (currentUser?.username || stats.username || "Ty").toLowerCase();
  const currentUserUid = currentUser?.uid || "";

  // Map real users from database (filter out current user by BOTH uid and username)
  const realCompetitors = users
    .filter(u => {
      const uname = (u.username || "").toLowerCase();
      // Exclude users with empty username
      if (uname === "") return false;
      // Exclude current user by uid match
      if (currentUserUid && u.uid === currentUserUid) return false;
      // Exclude current user by username match
      if (uname === currentUsernameLower) return false;
      return true;
    })
    .map(u => ({
      username: u.username,
      avatar: u.avatar || "👑",
      xp: u.xp || 0,
      streak: u.streak || 0,
      words: u.wordsCount || 0,
      level: u.level || 1,
      title: getRankTitle(u.level || 1)
    }));

  // Combine real and mock, avoiding duplicate usernames
  const combinedCompetitors = [...realCompetitors];
  const showMocks = systemConfig?.showMocks !== false;
  if (showMocks) {
    mockCompetitors.forEach(mock => {
      if (!combinedCompetitors.some(c => c.username.toLowerCase() === mock.username.toLowerCase())) {
        combinedCompetitors.push(mock);
      }
    });
  }

  const currentUserRow = {
    username: `${currentUser?.username || stats.username || "Ty"} (Ja)`,
    avatar: currentUser?.avatar || stats.avatar || "👑",
    xp: userXp,
    streak: userStreak,
    words: userWords,
    level: userLevel,
    title: userTitle,
    isCurrentUser: true
  };

  // Combine and sort dynamically based on tab
  const allPlayers = [...combinedCompetitors, currentUserRow];

  let sortedPlayers = [];
  if (activeTab === "xp") {
    sortedPlayers = allPlayers.sort((a, b) => b.xp - a.xp);
  } else if (activeTab === "streak") {
    // Sort by streak, then by XP as fallback
    sortedPlayers = allPlayers.sort((a, b) => b.streak !== a.streak ? b.streak - a.streak : b.xp - a.xp);
  } else if (activeTab === "words") {
    sortedPlayers = allPlayers.sort((a, b) => b.words !== a.words ? b.words - a.words : b.xp - a.xp);
  }

  // Find user's position
  const userRankIndex = sortedPlayers.findIndex(p => p.isCurrentUser);
  const userRank = userRankIndex + 1;

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 animate-slide-in">
      
      {/* Header */}
      <div>
        <button 
          onClick={() => onNavigate("dashboard")}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
        >
          <Icons.ChevronLeft size={16} /> Powrót do pulpitu
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Ranking Rywalizacji
            </h2>
            <p className="text-slate-400 text-xs mt-1">Ucz się codziennie i wyprzedź rywali w rankingu globalnym!</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
            <Icons.Trophy className="text-yellow-400" size={18} />
            <div className="text-left">
              <span className="text-[9px] text-slate-400 font-extrabold uppercase block leading-none">Twoje miejsce</span>
              <strong className="text-yellow-400 text-base font-black leading-tight">#{userRank} w rankingu</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-black/20 p-1 rounded-2xl border border-white/5 flex gap-1 w-full">
        <button 
          onClick={() => setActiveTab("xp")}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
            activeTab === "xp"
              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm"
              : "text-slate-400 hover:text-white border-transparent"
          }`}
        >
          <Icons.Sparkles size={14} /> Punkty XP
        </button>
        <button 
          onClick={() => setActiveTab("streak")}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
            activeTab === "streak"
              ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-sm"
              : "text-slate-400 hover:text-white border-transparent"
          }`}
        >
          <Icons.Flame size={14} /> Seria (Streak)
        </button>
        <button 
          onClick={() => setActiveTab("words")}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
            activeTab === "words"
              ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-sm"
              : "text-slate-400 hover:text-white border-transparent"
          }`}
        >
          <Icons.BookOpen size={14} /> Poznane słowa
        </button>
      </div>

      {/* Podium Visuals (Top 3) */}
      <div className="grid grid-cols-3 gap-3 items-end max-w-lg mx-auto w-full pt-8 pb-4">
        {/* 2nd Place */}
        {sortedPlayers[1] && (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-400 flex items-center justify-center text-3xl shadow-lg relative">
                {sortedPlayers[1].avatar.startsWith("data:") ? (
                  <img src={sortedPlayers[1].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  sortedPlayers[1].avatar
                )}
                <div className="absolute -bottom-1 -right-1 bg-slate-400 text-slate-900 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border border-slate-900">
                  2
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-300 truncate max-w-[80px]">{sortedPlayers[1].username.split(" ")[0]}</span>
            <div className="bg-slate-500/10 border border-slate-500/20 w-full h-16 rounded-t-xl flex items-center justify-center text-slate-400 font-black text-sm">
              🥈 II
            </div>
          </div>
        )}

        {/* 1st Place */}
        {sortedPlayers[0] && (
          <div className="flex flex-col items-center gap-2 relative -top-4">
            <Icons.Crown className="text-yellow-400 fill-yellow-400/20 animate-bounce" size={20} />
            <div className="relative">
              <div className="w-18 h-18 rounded-full bg-slate-800 border-2 border-yellow-400 flex items-center justify-center text-4xl shadow-xl shadow-yellow-500/5 relative">
                {sortedPlayers[0].avatar.startsWith("data:") ? (
                  <img src={sortedPlayers[0].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  sortedPlayers[0].avatar
                )}
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border border-yellow-900">
                  1
                </div>
              </div>
            </div>
            <span className="text-xs font-extrabold text-yellow-400 truncate max-w-[100px]">{sortedPlayers[0].username.split(" ")[0]}</span>
            <div className="bg-yellow-500/10 border border-yellow-500/20 w-full h-24 rounded-t-xl flex flex-col items-center justify-center text-yellow-500 font-black text-base">
              🥇 I
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {sortedPlayers[2] && (
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-amber-600 flex items-center justify-center text-3xl shadow-lg relative">
                {sortedPlayers[2].avatar.startsWith("data:") ? (
                  <img src={sortedPlayers[2].avatar} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  sortedPlayers[2].avatar
                )}
                <div className="absolute -bottom-1 -right-1 bg-amber-600 text-amber-950 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border border-amber-900">
                  3
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-300 truncate max-w-[80px]">{sortedPlayers[2].username.split(" ")[0]}</span>
            <div className="bg-amber-600/10 border border-amber-600/20 w-full h-12 rounded-t-xl flex items-center justify-center text-amber-600 font-black text-sm">
              🥉 III
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="glass-card p-4 flex flex-col gap-2">
        {sortedPlayers.map((player, index) => {
          const rankNum = index + 1;
          let rankColor = "text-slate-400";
          let badgeIcon = null;

          if (rankNum === 1) {
            rankColor = "text-yellow-400";
            badgeIcon = "🥇";
          } else if (rankNum === 2) {
            rankColor = "text-slate-300";
            badgeIcon = "🥈";
          } else if (rankNum === 3) {
            rankColor = "text-amber-600";
            badgeIcon = "🥉";
          }

          return (
            <div 
              key={player.username}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 ${
                player.isCurrentUser 
                  ? "bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                  : "bg-black/10 border-white/3 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Position */}
                <div className={`w-6 text-center text-xs font-black ${rankColor}`}>
                  {badgeIcon ? badgeIcon : rankNum}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-xl overflow-hidden shrink-0">
                  {player.avatar.startsWith("data:") ? (
                    <img src={player.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    player.avatar
                  )}
                </div>

                {/* Name & Title */}
                <div className="min-w-0">
                  <h4 className={`text-xs font-extrabold truncate flex items-center gap-1.5 ${player.isCurrentUser ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                    {player.username}
                    {player.isCurrentUser && (
                      <span className="text-[8px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded-full font-black uppercase">Ja</span>
                    )}
                  </h4>
                  <span className="text-[9px] text-slate-500 font-bold block mt-0.5">
                    Lvl {player.level} • {player.title}
                  </span>
                </div>
              </div>

              {/* Dynamic Metric Value */}
              <div className="text-right">
                {activeTab === "xp" && (
                  <div>
                    <span className="text-xs font-black text-white">{player.xp}</span>
                    <span className="text-[9px] text-slate-500 font-bold block">XP</span>
                  </div>
                )}
                {activeTab === "streak" && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-amber-500">{formatDays(player.streak)}</span>
                    <Icons.Flame size={14} className="text-amber-500 fill-amber-500/20" />
                  </div>
                )}
                {activeTab === "words" && (
                  <div>
                    <span className="text-xs font-black text-cyan-400">{player.words}</span>
                    <span className="text-[9px] text-slate-500 font-bold block">słów</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

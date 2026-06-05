import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Profile({ user, onLogout, stats, decks, onUpdateAvatar }) {
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || "🧙‍♂️");
  const [successMsg, setSuccessMsg] = useState("");

  const avatarsList = ["🧙‍♂️", "👩‍🚀", "🦉", "🦊", "🕵️‍♂️", "🐼", "🤖", "🦄", "🦁", "🐨"];

  // Calculate dynamic stats
  const totalCards = decks.reduce((sum, deck) => sum + deck.cards.length, 0);
  const learnedCount = Object.keys(stats.learnedCards || {}).length;
  
  // Calculate Rank/Ranga
  let rank = "Nowicjusz";
  let rankColor = "text-slate-400";
  if (learnedCount >= 50) {
    rank = "Poliglota (Mistrz Językowy)";
    rankColor = "text-yellow-400";
  } else if (learnedCount >= 30) {
    rank = "Ekspert Językowy";
    rankColor = "text-purple-400";
  } else if (learnedCount >= 15) {
    rank = "Znawca Słownictwa";
    rankColor = "text-cyan-400";
  } else if (learnedCount >= 5) {
    rank = "Adept";
    rankColor = "text-emerald-400";
  }

  // Calculate achievements
  const achievements = [
    {
      id: "first_word",
      title: "Pierwsze kroki",
      desc: "Opanowano co najmniej 1 słówko angielskie",
      icon: "Award",
      unlocked: learnedCount >= 1,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      id: "streak_3",
      title: "Systematyczność",
      desc: "Utrzymano streak nauki przez min. 3 dni",
      icon: "Flame",
      unlocked: stats.streak >= 3,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      id: "quiz_complete",
      title: "Sprawdzona wiedza",
      desc: "Rozwiązano co najmniej 1 test słówek",
      icon: "ListChecks",
      unlocked: stats.quizTotal > 0,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: "match_win",
      title: "Szybki refleks",
      desc: "Wygrano co najmniej 1 grę w dopasowywanie",
      icon: "Zap",
      unlocked: stats.matchesWon > 0,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      id: "perfect_score",
      title: "Perfekcjonista",
      desc: "Uzyskano skuteczność w testach powyżej 80%",
      icon: "Trophy",
      unlocked: stats.quizTotal > 0 && (stats.quizCorrect / stats.quizTotal) >= 0.8,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "custom_words",
      title: "Twórca wiedzy",
      desc: "Dodano własną fiszkę w kreatorze",
      icon: "PlusCircle",
      unlocked: decks.some(d => d.id.startsWith("custom-") && d.cards.length > 0) || decks.flatMap(d => d.cards).some(c => c.id.startsWith("custom-")),
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    }
  ];

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    onUpdateAvatar(avatar);
    setSuccessMsg("Awatar został zaktualizowany!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full animate-slide-in">
      
      {/* Profile Info & Avatar Card */}
      <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden h-fit">
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* User Large Avatar Display */}
        <div className="relative group mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-5xl shadow-xl shadow-indigo-500/10 border-2 border-white/10 scale-hover">
            {user.avatar || "🧙‍♂️"}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">{user.username}</h3>
        <span className={`text-xs font-bold uppercase tracking-wider mt-1 ${rankColor}`}>
          {rank}
        </span>
        
        <p className="text-slate-500 text-[10px] mt-4 font-bold uppercase tracking-wider">
          Konto utworzone: {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString("pl-PL") : "Dzisiaj"}
        </p>

        {/* Change Avatar Picker */}
        <div className="w-full mt-6 pt-6 border-t border-white/5">
          <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-3 text-left">
            Zmień swój awatar
          </label>
          <div className="grid grid-cols-5 gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
            {avatarsList.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => handleAvatarChange(av)}
                className={`text-xl p-1.5 rounded-lg transition-all hover:scale-110 ${
                  selectedAvatar === av ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-transparent"
                }`}
              >
                {av}
              </button>
            ))}
          </div>
          {successMsg && (
            <span className="text-[10px] text-emerald-400 font-bold block mt-2 text-center animate-pulse">
              {successMsg}
            </span>
          )}
        </div>

        {/* Logout button */}
        <button 
          onClick={onLogout}
          className="btn btn-secondary w-full py-3 mt-6 flex items-center justify-center gap-2 font-bold text-rose-400 border-rose-500/10 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-300 transition-all"
        >
          <Icons.LogOut size={16} />
          Wyloguj się z konta
        </button>
      </div>

      {/* Stats and Achievements Pane */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Unlocked Achievements progress panel */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-base font-bold text-white">Zdobyte Osiągnięcia</h4>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/15">
              Odblokowano: {unlockedCount} / {achievements.length}
            </span>
          </div>

          <div className="bg-white/5 h-2 rounded-full overflow-hidden w-full border border-white/5 mb-5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => {
              const IconComponent = Icons[ach.icon] || Icons.Award;
              return (
                <div 
                  key={ach.id}
                  className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all duration-300 ${
                    ach.unlocked 
                      ? `${ach.color}` 
                      : "bg-black/10 border-white/3 text-slate-600 opacity-40 select-none"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${ach.unlocked ? 'border-white/10' : 'border-transparent'}`}>
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h5 className={`text-sm font-bold ${ach.unlocked ? 'text-white' : 'text-slate-500'}`}>
                      {ach.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 leading-relaxed">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed user statistics summary */}
        <div className="glass-card p-6">
          <h4 className="text-base font-bold text-white mb-4">Statystyki szczegółowe</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Opanowane słówka</span>
              <span className="text-2xl font-black text-white mt-1.5 block">{learnedCount}</span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Dni z rzędu</span>
              <span className="text-2xl font-black text-amber-500 mt-1.5 block">{stats.streak || 0} dni</span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ulubione fiszki</span>
              <span className="text-2xl font-black text-indigo-400 mt-1.5 block">
                {Object.keys(stats.starredCards || {}).length}
              </span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Rozwiązane testy</span>
              <span className="text-2xl font-black text-white mt-1.5 block">{stats.quizTotal || 0} pytań</span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Poprawne testy</span>
              <span className="text-2xl font-black text-emerald-400 mt-1.5 block">{stats.quizCorrect || 0}</span>
            </div>

            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Rozegrane gry</span>
              <span className="text-2xl font-black text-cyan-400 mt-1.5 block">{stats.matchesWon || 0}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

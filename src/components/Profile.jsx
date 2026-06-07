import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Profile({ user, onLogout, stats, decks, onUpdateProfile, onMigrateFromProfile }) {
  const [usernameInput, setUsernameInput] = useState(user.username);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || "👑");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [recoveryStatus, setRecoveryStatus] = useState(null);

  const getStatsScore = (s) => {
    if (!s) return 0;
    const xpVal = s.xp || 0;
    const learnedCount = Object.keys(s.learnedCards || {}).length;
    const completedCount = Object.values(s.completedDecks || {}).reduce((a, b) => a + b, 0);
    const activeCount = (s.activeDeckIds || []).length;
    return (xpVal * 10) + (learnedCount * 5) + (completedCount * 100) + activeCount;
  };

  const getLocalProfiles = () => {
    const profiles = [];
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith("lingocards_stats_"));
      for (const k of keys) {
        const dataStr = localStorage.getItem(k);
        if (dataStr) {
          try {
            const statsObj = JSON.parse(dataStr);
            const score = getStatsScore(statsObj);
            const name = k.replace("lingocards_stats_", "");
            profiles.push({
              key: k,
              name: name,
              xp: statsObj.xp || 0,
              level: statsObj.level || 1,
              learned: Object.keys(statsObj.learnedCards || {}).length,
              score: score,
              stats: statsObj
            });
          } catch (e) {
            // ignore malformed
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    // Sort profiles by score descending
    return profiles.sort((a, b) => b.score - a.score);
  };

  const handleMigrateClick = (profileKey, profileName) => {
    const confirmMsg = `Czy na pewno chcesz przenieść postępy z profilu "${profileName}" do swojego aktualnego konta? Twoje obecne postępy zostaną zastąpione danymi z tamtego konta, a następnie zsynchronizowane z chmurą.`;
    if (window.confirm(confirmMsg)) {
      if (onMigrateFromProfile) {
        const res = onMigrateFromProfile(profileKey);
        setRecoveryStatus(res);
        if (res.success) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        setRecoveryStatus({ success: false, message: "Funkcja migracji jest niedostępna." });
      }
    }
  };

  // Photo Cropper States
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const baseAvatars = ["👑", "🦄", "🐉", "🐙", "🦊", "🦁", "🐼", "🦉", "🚀", "🦖", "🦥", "🦩", "🍕", "🐱", "🐯", "👻", "🐨"];
  const premiumAvatars = ["👽", "🛸", "👾"];
  const avatarsList = (stats.referrals || []).length >= 3 ? [...baseAvatars, ...premiumAvatars] : baseAvatars;

  // Calculate dynamic stats
  const totalCards = decks.reduce((sum, deck) => sum + (deck.cards || []).length, 0);
  const learnedCount = Object.keys(stats.learnedCards || {}).length;

  // Filtrujemy medale, aby nie pokazywać medali dla usuniętych talii
  const activeMedals = Object.entries(stats.deckMedals || {}).filter(([deckId]) =>
    decks.some(d => d.id === deckId)
  );
  
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
      id: "learned_10",
      title: "Dobry start",
      desc: "Opanowano co najmniej 10 słówek",
      icon: "BookOpen",
      unlocked: learnedCount >= 10,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "learned_50",
      title: "Mistrz Pamięci",
      desc: "Opanowano co najmniej 50 słówek angielskich",
      icon: "Award",
      unlocked: learnedCount >= 50,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      id: "learned_100",
      title: "Setka!",
      desc: "Opanowano co najmniej 100 słówek — jesteś półzaawansowany",
      icon: "Star",
      unlocked: learnedCount >= 100,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      id: "learned_250",
      title: "Legenda Słów",
      desc: "Opanowano co najmniej 250 słówek",
      icon: "Crown",
      unlocked: learnedCount >= 250,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "streak_5",
      title: "Brązowy Płomień",
      desc: "Utrzymano streak nauki przez min. 5 dni",
      icon: "Flame",
      unlocked: stats.streak >= 5 || (stats.bestStreak || 0) >= 5,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      id: "streak_10",
      title: "Srebrny Płomień",
      desc: "Utrzymano streak nauki przez min. 10 dni",
      icon: "Shield",
      unlocked: stats.streak >= 10 || (stats.bestStreak || 0) >= 10,
      color: "text-slate-300 bg-slate-300/10 border-slate-300/20"
    },
    {
      id: "streak_20",
      title: "Złoty Płomień",
      desc: "Utrzymano streak nauki przez min. 20 dni",
      icon: "Trophy",
      unlocked: stats.streak >= 20 || (stats.bestStreak || 0) >= 20,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "streak_30",
      title: "Diamentowy Płomień",
      desc: "Utrzymano streak nauki przez min. 30 dni (miesiąc)",
      icon: "Crown",
      unlocked: stats.streak >= 30 || (stats.bestStreak || 0) >= 30,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      id: "quiz_10",
      title: "Sprawdzona wiedza",
      desc: "Rozwiązano co najmniej 10 testów (100+ pytań)",
      icon: "ListChecks",
      unlocked: stats.quizTotal >= 100,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: "perfect_score",
      title: "Perfekcjonista",
      desc: "Uzyskano skuteczność w testach powyżej 85% (min. 50 pytań)",
      icon: "Trophy",
      unlocked: stats.quizTotal >= 50 && (stats.quizCorrect / stats.quizTotal) >= 0.85,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "match_win",
      title: "Szybki refleks",
      desc: "Wygrano co najmniej 5 gier w dopasowywanie",
      icon: "Zap",
      unlocked: stats.matchesWon >= 5,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      id: "match_10",
      title: "Mistrz Matcher",
      desc: "Wygrano co najmniej 10 gier w dopasowywanie",
      icon: "Gamepad2",
      unlocked: stats.matchesWon >= 10,
      color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20"
    },
    {
      id: "srs_first",
      title: "Złoty podział",
      desc: "Rozpocznij naukę w trybie SRS (oceniono min. 20 słówek)",
      icon: "BrainCircuit",
      unlocked: Object.keys(stats.srsData || {}).length >= 20,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      id: "srs_master",
      title: "Pamięć absolutna",
      desc: "Osiągnij interwał powtórek >= 10 dni dla min. 10 słówek",
      icon: "Sparkles",
      unlocked: Object.values(stats.srsData || {}).filter(s => s.interval >= 10).length >= 10,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      id: "custom_words",
      title: "Twórca wiedzy",
      desc: "Dodano własną talię z min. 5 fiszkami",
      icon: "PlusCircle",
      unlocked: decks.some(d => !d.isSystem && (d.cards || []).length >= 5),
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      id: "referral_first",
      title: "Ambasador Wiedzy",
      desc: "Polecono aplikację przynajmniej 3 znajomym",
      icon: "Users",
      unlocked: (stats.referrals || []).length >= 3,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    },
    {
      id: "deck_gold",
      title: "Złota Fiszka",
      desc: "Zdobyto złoty medal w co najmniej jednej talii",
      icon: "Medal",
      unlocked: activeMedals.some(([_, m]) => m === 'gold'),
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    },
    {
      id: "deck_gold_3",
      title: "Kolekcjoner Złota",
      desc: "Zdobyto złoty medal w co najmniej 3 taliach",
      icon: "GalleryHorizontal",
      unlocked: activeMedals.filter(([_, m]) => m === 'gold').length >= 3,
      color: "text-amber-300 bg-amber-400/10 border-amber-400/20"
    }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Plik jest za duży (maksymalnie 5MB).");
      setTimeout(() => setErrorMsg(""), 3500);
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      setTempImage(base64Data);
      setZoom(1.0);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    
    // Reset output value so user can upload the same image again
    e.target.value = "";
  };

  const handleSaveCrop = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = tempImage;
    img.onload = () => {
      ctx.clearRect(0, 0, 256, 256);
      
      // Make canvas circle clip
      ctx.beginPath();
      ctx.arc(128, 128, 128, 0, Math.PI * 2);
      ctx.clip();

      ctx.save();
      ctx.translate(128, 128);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      // Center and scale image properly
      const imgRatio = img.width / img.height;
      let dWidth, dHeight;
      if (imgRatio > 1) {
        dHeight = 256;
        dWidth = 256 * imgRatio;
      } else {
        dWidth = 256;
        dHeight = 256 / imgRatio;
      }

      ctx.drawImage(img, -dWidth / 2 + offset.x, -dHeight / 2 + offset.y, dWidth, dHeight);
      ctx.restore();

      const croppedUrl = canvas.toDataURL("image/jpeg", 0.9);
      setSelectedAvatar(croppedUrl);
      setShowCropper(false);
    };
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const result = onUpdateProfile(usernameInput, selectedAvatar);
    if (result.success) {
      setSuccessMsg(result.message);
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setErrorMsg(result.message);
      setTimeout(() => setErrorMsg(""), 3500);
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Drag listeners for Crop Modal
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch listener equivalents
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full animate-slide-in">
      
      {/* Left Column wrapper */}
      <div className="flex flex-col gap-6 h-fit">
        {/* Profile Info & Avatar Card */}
        <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden w-full" data-lpignore="true" data-1p-ignore>
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* User Large Avatar Display */}
        <div className="relative group mb-4">
          <div className={`relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shadow-xl scale-hover bg-gradient-to-tr from-indigo-500 to-cyan-500 border-2 ${
            (stats.referrals || []).length >= 5 
              ? "border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]" 
              : "border-white/10 shadow-indigo-500/10"
          }`}>
            {selectedAvatar && selectedAvatar.startsWith("data:") ? (
              <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-5xl">{selectedAvatar || "👑"}</span>
            )}
            
            {/* Hover overlay to upload photo */}
            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-[9px] font-bold">
              <Icons.Camera size={18} className="mb-1" />
              Wgraj zdjęcie
              {/* display: none inline prevents password managers/extensions from attaching user icons */}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                style={{ display: "none" }} 
              />
            </label>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="w-full mt-4 flex flex-col gap-4" autoComplete="off">
          <div>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1.5 text-left">
              Nazwa użytkownika
            </label>
            <input 
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              autoComplete="off"
              data-lpignore="true"
              className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/60 font-semibold"
            />
          </div>

          {/* Poziom & XP Progress Bar */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-3 text-left">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-extrabold text-[9px]">Lvl {stats.level || 1}</span>
                <span className="text-slate-300 font-bold text-[10px]">
                  {(() => {
                    const lvl = stats.level || 1;
                    if (lvl >= 15) return "Mistrz 👑";
                    if (lvl >= 10) return "Uczony 🎓";
                    if (lvl >= 6) return "Odkrywca 🧭";
                    if (lvl >= 3) return "Uczeń 📚";
                    return "Nowicjusz 🌱";
                  })()}
                </span>
              </div>
              <span className="text-slate-400 font-black text-[10px]">{(stats.xp || 0) % 300} / 300 XP</span>
            </div>
            <div className="bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${((stats.xp || 0) % 300) / 300 * 100}%` }}
              />
            </div>
          </div>

          <span className={`text-xs font-bold uppercase tracking-wider block ${rankColor}`}>
            {rank}
          </span>
          {(stats.referrals || []).length >= 5 && (
            <span className="text-[10px] text-yellow-400 font-extrabold uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full w-max mx-auto flex items-center gap-1.5 animate-pulse mt-0.5">
              <Icons.ShieldAlert size={10} /> Ambasador VIP
            </span>
          )}
          
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
            Konto: {user.isGoogle ? "Zalogowano przez Google" : `Utworzono: ${user.registeredAt ? new Date(user.registeredAt).toLocaleDateString("pl-PL") : "Dzisiaj"}`}
          </p>

          {/* Change Avatar Picker */}
          <div className="w-full mt-2 pt-4 border-t border-white/5" data-lpignore="true" data-1p-ignore>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2.5 text-left flex justify-between items-center">
              <span>Wybierz awatar</span>
              {(stats.referrals || []).length < 3 && (
                <span className="text-[8px] text-slate-400 font-bold lowercase">Poleć 3 znajomych, aby odblokować kosmiczne awatary! 👽🛸👾</span>
              )}
            </label>
            <div className="grid grid-cols-5 gap-1.5 bg-black/20 p-2 rounded-xl border border-white/5 max-h-[120px] overflow-y-auto">
              {avatarsList.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => setSelectedAvatar(av)}
                  className={`text-xl p-1 rounded-lg transition-all hover:scale-115 ${
                    selectedAvatar === av ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="text-[11px] text-rose-400 font-bold block mt-1 leading-snug">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="text-[11px] text-emerald-400 font-bold block mt-1 leading-snug">
              {successMsg}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2 font-bold">
            <Icons.Save size={16} />
            Zapisz profil
          </button>
        </form>

        {/* Logout button */}
        <button 
          onClick={onLogout}
          type="button"
          className="btn btn-secondary w-full py-3 mt-4 flex items-center justify-center gap-2 font-bold text-rose-400 border-rose-500/10 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-300 transition-all"
        >
          <Icons.LogOut size={16} />
          Wyloguj się
        </button>
      </div>

      {/* Recovery / Migration Tool */}
      <div className="glass-card p-6 relative overflow-hidden w-full">
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <h4 className="text-base font-bold text-white flex items-center gap-2 mb-2">
          <Icons.Database className="text-amber-500" size={18} />
          Odzyskiwanie profilu
        </h4>
        <p className="text-slate-400 text-[11px] leading-relaxed mb-4 text-left">
          Jeśli grałeś wcześniej w tej przeglądarce i Twoje postępy (XP, poziom) nie zsynchronizowały się automatycznie, możesz ręcznie połączyć dowolny profil z pamięci przeglądarkki ze swoim obecnym kontem.
        </p>

        {(() => {
          const profiles = getLocalProfiles();
          if (profiles.length === 0) {
            return (
              <div className="text-center py-4 border border-dashed border-white/5 rounded-xl bg-black/10">
                <Icons.Search className="text-slate-600 mx-auto mb-1.5" size={24} />
                <p className="text-[10px] text-slate-500 font-bold">Brak zapisanych profilów</p>
                <p className="text-[8px] text-slate-600 mt-0.5">Nie znaleziono innych kont w tej przeglądarce.</p>
              </div>
            );
          }

          return (
            <div className="flex flex-col gap-2.5 max-h-[250px] overflow-y-auto pr-1">
              {profiles.map(p => {
                const isActive = p.key.toLowerCase().includes((user.uid || user.username).toLowerCase());
                return (
                  <div 
                    key={p.key} 
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                      isActive 
                        ? "bg-indigo-500/5 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]" 
                        : "bg-black/20 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block truncate">{p.name}</span>
                        <span className="text-[9px] text-slate-400 font-medium">
                          Poziom {p.level} • {p.xp} XP • {p.learned} słówek
                        </span>
                      </div>
                      {isActive && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                          Aktywny
                        </span>
                      )}
                    </div>
                    
                    {!isActive && (
                      <button
                        type="button"
                        onClick={() => handleMigrateClick(p.key, p.name)}
                        className="w-full btn btn-secondary py-1.5 text-[10px] font-bold flex items-center justify-center gap-1.5 border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/5 text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <Icons.Upload size={12} />
                        Połącz i przywróć postępy
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
        
        {recoveryStatus && (
          <div className={`mt-3 text-[10px] font-bold p-2.5 rounded-lg border text-left leading-normal ${
            recoveryStatus.success
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}>
            {recoveryStatus.message}
          </div>
        )}
      </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1">
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
              <span className="text-2xl font-black text-white mt-1.5 block">
                {`${stats.quizTotal || 0} ${(stats.quizTotal || 0) === 1 ? 'pytanie' : (stats.quizTotal || 0) <= 4 ? 'pytania' : 'pytań'}`}
              </span>
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

        {/* Gablota z Medalami */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Icons.Trophy className="text-yellow-400" size={18} />
              Gablota Medalowa Zestawów
            </h4>
            <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-xl">
              Zdobyte medale: {activeMedals.length}
            </span>
          </div>

          {activeMedals.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl bg-black/10">
              <Icons.Trophy className="text-slate-600 mx-auto mb-2" size={32} />
              <p className="text-xs text-slate-500 font-bold">Brak zdobytych medali</p>
              <p className="text-[10px] text-slate-600 mt-1 max-w-[220px] mx-auto">Ukończ sesję nauki z wysoką poprawnością, aby otrzymać medal!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeMedals.map(([deckId, medal]) => {
                const deck = decks.find(d => d.id === deckId);
                const deckTitle = deck?.title || deckId;
                return (
                  <div key={deckId} className="bg-black/30 border border-white/5 p-3.5 rounded-2xl flex flex-col items-center gap-1.5 text-center">
                    <span className="text-3xl">
                      {medal === 'gold' ? "🥇" : medal === 'silver' ? "🥈" : "🥉"}
                    </span>
                    <div className="min-w-0 w-full">
                      <span className="text-[10px] font-bold text-slate-200 block truncate">{deckTitle}</span>
                      <span className={`text-[8px] font-black uppercase tracking-wider block mt-0.5 ${
                        medal === 'gold' ? "text-yellow-400" : medal === 'silver' ? "text-slate-400" : "text-amber-500"
                      }`}>
                        {medal === 'gold' ? "Złoty" : medal === 'silver' ? "Srebrny" : "Brązowy"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CROP MODAL POPUP */}
      {showCropper && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 border-indigo-500/20 shadow-2xl flex flex-col gap-4 text-center">
            <div>
              <h3 className="text-lg font-bold text-white">Dostosuj zdjęcie profilowe</h3>
              <p className="text-[11px] text-slate-400">Przeciągnij, aby przesunąć. Użyj suwaka, aby przybliżyć.</p>
            </div>

            {/* Cropping Window */}
            <div 
              className="relative w-64 h-64 mx-auto rounded-xl overflow-hidden border border-white/10 bg-black/40 cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* The Image being cropped */}
              <img 
                src={tempImage} 
                alt="Original" 
                draggable="false"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: "center center",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  zIndex: 1
                }}
              />

              {/* Circular Overlay Guide */}
              <div className="absolute inset-0 pointer-events-none rounded-xl z-10" style={{
                position: "absolute",
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
                border: "2px solid #6366f1",
                borderRadius: "50%",
                margin: "16px",
                zIndex: 10
              }} />
            </div>

            {/* Slider zoom scale control */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                <span>Skala (Zoom)</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input 
                type="range"
                min="1.0"
                max="3.0"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Rotate control buttons */}
            <div className="flex justify-center gap-3">
              <button 
                type="button"
                onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                className="btn btn-secondary py-2 px-3 text-xs flex items-center gap-1.5"
              >
                <Icons.RotateCcw size={14} /> Obróć w lewo
              </button>
              <button 
                type="button"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="btn btn-secondary py-2 px-3 text-xs flex items-center gap-1.5"
              >
                <Icons.RotateCw size={14} /> Obróć w prawo
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-2">
              <button 
                type="button"
                onClick={handleSaveCrop}
                className="flex-grow btn btn-primary py-2.5 font-bold"
              >
                Przytnij i zapisz
              </button>
              <button 
                type="button"
                onClick={() => setShowCropper(false)}
                className="flex-grow btn btn-secondary py-2.5"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

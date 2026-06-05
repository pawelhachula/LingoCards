import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Profile({ user, onLogout, stats, decks, onUpdateProfile }) {
  const [usernameInput, setUsernameInput] = useState(user.username);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || "👑");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Photo Cropper States
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const avatarsList = ["👑", "🦄", "🐉", "🐙", "🦊", "🦁", "🐼", "🦉", "🚀", "🛸", "👾", "🦖", "🦥", "🦩", "🍕", "🐱", "🐯", "👻", "👽", "🐨"];

  // Calculate dynamic stats
  const totalCards = decks.reduce((sum, deck) => sum + (deck.cards || []).length, 0);
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

  // Calculate achievements (12 items total)
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
      id: "streak_7",
      title: "Tydzień w transie",
      desc: "Utrzymano streak nauki przez min. 7 dni",
      icon: "Flame",
      unlocked: stats.streak >= 7,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20"
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
      id: "quiz_10",
      title: "Mól Książkowy",
      desc: "Rozwiązano co najmniej 10 testów słówek",
      icon: "BookOpen",
      unlocked: stats.quizTotal >= 10,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "quiz_correct_20",
      title: "Szybki Uczeń",
      desc: "Udzielono 20 poprawnych odpowiedzi w testach",
      icon: "CheckSquare",
      unlocked: stats.quizCorrect >= 20,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
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
      id: "match_5",
      title: "Władca Czasu",
      desc: "Wygrano co najmniej 5 gier w dopasowywanie",
      icon: "Trophy",
      unlocked: stats.matchesWon >= 5,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
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
      unlocked: decks.some(d => d.id.startsWith("custom-") && (d.cards || []).length > 0) || decks.flatMap(d => d.cards || []).some(c => c.id.startsWith("custom-")),
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      id: "learned_30",
      title: "Mistrz Pamięci",
      desc: "Opanowano co najmniej 30 słówek angielskich",
      icon: "Award",
      unlocked: learnedCount >= 30,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      id: "learned_all",
      title: "Językowy Omnibus",
      desc: "Opanowano co najmniej 75 słówek angielskich",
      icon: "GraduationCap",
      unlocked: learnedCount >= 75,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20"
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full animate-slide-in">
      
      {/* Profile Info & Avatar Card */}
      <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden h-fit" data-lpignore="true" data-1p-ignore>
        <div className="absolute -left-20 -top-20 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* User Large Avatar Display */}
        <div className="relative group mb-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shadow-xl shadow-indigo-500/10 border-2 border-white/10 scale-hover bg-gradient-to-tr from-indigo-500 to-cyan-500">
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

          <span className={`text-xs font-bold uppercase tracking-wider block ${rankColor}`}>
            {rank}
          </span>
          
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
            Konto: {user.isGoogle ? "Zalogowano przez Google" : `Utworzono: ${user.registeredAt ? new Date(user.registeredAt).toLocaleDateString("pl-PL") : "Dzisiaj"}`}
          </p>

          {/* Change Avatar Picker */}
          <div className="w-full mt-2 pt-4 border-t border-white/5" data-lpignore="true" data-1p-ignore>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2.5 text-left">
              Wybierz awatar
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

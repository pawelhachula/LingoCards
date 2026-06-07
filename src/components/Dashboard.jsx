import React from "react";
import * as Icons from "lucide-react";

export default function Dashboard({ decks, stats, setStats, onSelectDeck, onNavigate }) {
  const realDecks = decks.filter(d => d.id !== "starred" && d.id !== "srs");
  const totalCards = realDecks.reduce((sum, deck) => sum + deck.cards.length, 0);
  const learnedCount = Object.keys(stats.learnedCards || {}).length;
  const progressPercent = totalCards > 0 ? Math.round((learnedCount / totalCards) * 100) : 0;
  
  const dailyTarget = stats.dailyTarget || 10;
  const dailyProgress = Math.min(stats.dailyCount || 0, dailyTarget);
  const dailyPercent = dailyTarget > 0 ? Math.round((dailyProgress / dailyTarget) * 100) : 0;

  // SRS calculations
  const srsData = stats.srsData || {};
  const todayStr = new Date().toISOString().split("T")[0];
  const allCards = realDecks.flatMap(d => d.cards || []);
  const uniqueCards = [];
  const cardIds = new Set();
  allCards.forEach(c => {
    if (!cardIds.has(c.id)) {
      cardIds.add(c.id);
      uniqueCards.push(c);
    }
  });

  const totalCardsCount = uniqueCards.length;

  const srsDueCards = uniqueCards.filter(c => {
    const srs = srsData[c.id];
    if (!srs) return true;
    return srs.nextReviewDate <= todayStr;
  });

  const newCardsCount = uniqueCards.filter(c => !srsData[c.id]).length;
  const learningCount = uniqueCards.filter(c => srsData[c.id] && srsData[c.id].interval < 7).length;
  const masteredCount = uniqueCards.filter(c => srsData[c.id] && srsData[c.id].interval >= 7).length;

  // Review calendar helper
  const addDaysStr = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const dueTomorrow = uniqueCards.filter(c => srsData[c.id] && srsData[c.id].nextReviewDate === addDaysStr(1)).length;
  const due3Days = uniqueCards.filter(c => srsData[c.id] && srsData[c.id].nextReviewDate > todayStr && srsData[c.id].nextReviewDate <= addDaysStr(3)).length;
  const due7Days = uniqueCards.filter(c => srsData[c.id] && srsData[c.id].nextReviewDate > todayStr && srsData[c.id].nextReviewDate <= addDaysStr(7)).length;

  // Słówko dnia generator
  const getWordOfTheDay = () => {
    const today = new Date().toISOString().split("T")[0];
    const savedDate = localStorage.getItem("lingocards_wod_date");
    const savedWordJson = localStorage.getItem("lingocards_wod_word");
    
    if (savedDate === today && savedWordJson) {
      try {
        return JSON.parse(savedWordJson);
      } catch (e) {
        console.error("Error parsing saved word of the day", e);
      }
    }
    
    // Pick a new random word from real decks
    const realDecks = decks.filter(d => d.id !== "srs" && d.id !== "starred");
    const allCards = realDecks.flatMap(d => d.cards || []);
    if (allCards.length === 0) return null;
    
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    localStorage.setItem("lingocards_wod_date", today);
    localStorage.setItem("lingocards_wod_word", JSON.stringify(randomCard));
    return randomCard;
  };

  const wordOfTheDay = getWordOfTheDay();

  // TTS Voice player
  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Level badge getter
  const getCardLevel = (card) => {
    if (card.level) return card.level;
    const id = card.id || "";
    if (id.startsWith("everyday")) return "A2";
    if (id.startsWith("travel")) return "A2";
    if (id.startsWith("restaurant")) return "B1";
    if (id.startsWith("business")) return "B2";
    if (id.startsWith("tech")) return "B2";
    if (id.startsWith("advanced")) return "C1";
    if (id.startsWith("idioms")) return "C2";
    return "B1";
  };

  return (
    <div className="flex flex-col gap-8 animate-slide-in">
      {/* Greeting and Global Progress Bar */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Welcome message box */}
        <div className="flex-grow flex flex-col justify-between glass-card p-8 relative overflow-hidden">
          {/* Subtle decoration blur */}
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">LingoCards Premium</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-white leading-tight">
              Witaj w swojej strefie nauki!
            </h2>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed max-w-lg">
              Poświęć kilka minut dziennie na powtórkę angielskiego. Systematyczność to najkrótsza droga do płynnego mówienia.
            </p>
            
            {/* XP Progress Bar */}
            <div className="mt-5 max-w-md bg-black/30 border border-white/5 rounded-2xl p-4">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-extrabold text-[10px]">POZIOM {stats.level || 1}</span>
                  <span className="text-slate-300 font-bold">
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
                <span className="text-slate-400 font-black">{(stats.xp || 0) % 300} / 300 XP</span>
              </div>
              <div className="bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 relative">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((stats.xp || 0) % 300) / 300 * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">
                Brakuje {300 - ((stats.xp || 0) % 300)} XP do następnego poziomu
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const realDecksOnly = decks.filter(d => d.id !== "srs" && d.id !== "starred");
              if (realDecksOnly.length > 0) {
                onSelectDeck(realDecksOnly[0]);
              } else if (decks.length > 0) {
                onSelectDeck(decks[0]);
              }
              onNavigate("learn");
            }}
            className="btn btn-primary self-start mt-6 hover:scale-105 transition-transform"
          >
            Kontynuuj naukę 
            <Icons.ArrowRight size={18} />
          </button>
        </div>

        {/* Global progress tracker */}
        <div className="glass-card p-8 flex flex-col sm:flex-row items-center gap-6 min-w-[320px]">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r="46"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * progressPercent) / 100}
                strokeLinecap="round"
                className="progress-ring-circle"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white">{progressPercent}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Opanowane</span>
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-slate-500 text-xs uppercase font-extrabold tracking-widest">Całkowity postęp</h4>
            <p className="text-3xl font-black text-white mt-1">
              {learnedCount} <span className="text-sm font-semibold text-slate-500">/ {totalCards} słówek</span>
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-3 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl w-max">
              <Icons.TrendingUp size={14} />
              <span>Opanowujesz materiał!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Słówko Dnia Widget */}
      {wordOfTheDay && (
        <div className="glass-card p-6 relative overflow-hidden border-indigo-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* subtle decoration glow */}
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
              <Icons.Lightbulb size={24} className="animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">Słówko Dnia (Nauka w pigułce)</span>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <h3 className="text-xl font-extrabold text-white tracking-tight">{wordOfTheDay.english}</h3>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase tracking-wider font-mono">
                  {getCardLevel(wordOfTheDay)}
                </span>
                <span className="text-xs text-slate-500 font-semibold italic">{wordOfTheDay.pronunciation}</span>
                <button 
                  onClick={() => playTTS(wordOfTheDay.english)}
                  className="p-1 rounded bg-white/5 hover:bg-amber-500/10 text-slate-400 hover:text-amber-500 border border-white/5 hover:border-amber-500/20 transition-all ml-1"
                  title="Odsłuchaj wymowę"
                >
                  <Icons.Volume2 size={12} />
                </button>
              </div>
              <p className="text-slate-400 text-sm font-bold mt-1">
                {wordOfTheDay.polish} <span className="text-[10px] text-slate-500 font-bold font-mono">({wordOfTheDay.partOfSpeech})</span>
              </p>
              <p className="text-xs text-slate-500 mt-2 italic leading-relaxed">
                Przykład: "{wordOfTheDay.exampleEnglish}" – {wordOfTheDay.examplePolish}
              </p>
            </div>
          </div>

          {/* Quick Add to Favorites Button */}
          <button 
            onClick={() => {
              setStats(prev => {
                const updatedStarred = { ...(prev.starredCards || {}) };
                const isStarred = updatedStarred[wordOfTheDay.id];
                if (isStarred) {
                  delete updatedStarred[wordOfTheDay.id];
                } else {
                  updatedStarred[wordOfTheDay.id] = true;
                }
                return { starredCards: updatedStarred };
              });
            }}
            className={`btn text-xs py-2.5 px-4 flex items-center gap-1.5 font-bold hover:scale-105 transition-transform shrink-0 self-start md:self-auto ${
              stats.starredCards?.[wordOfTheDay.id] 
                ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Icons.Star size={14} className={stats.starredCards?.[wordOfTheDay.id] ? "fill-amber-500" : ""} />
            {stats.starredCards?.[wordOfTheDay.id] ? "Ulubione!" : "Dodaj do ulubionych"}
          </button>
        </div>
      )}

      {/* SRS Spaced Repetition Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SRS Active due alert card */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between relative overflow-hidden border-indigo-500/15">
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Icons.BrainCircuit size={18} />
              </span>
              <span className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wider">Spaced Repetition System</span>
            </div>
            
            <h3 className="text-xl font-extrabold text-white mt-4 tracking-tight">
              {srsDueCards.length > 0 
                ? `Masz dzisiaj ${srsDueCards.length} powtórek do wykonania!` 
                : "Świetna robota! Brak oczekujących powtórek na dziś"}
            </h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Algorytm SRS automatycznie wyznacza momenty, w których powinieneś powtórzyć słówka, aby trwale zapisać je w pamięci długotrwałej.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            {srsDueCards.length > 0 ? (
              <button
                onClick={() => {
                  const srsDeckObj = decks.find(d => d.id === "srs");
                  if (srsDeckObj) {
                    onSelectDeck(srsDeckObj);
                    onNavigate("learn");
                  } else {
                    if (decks.length > 0) onSelectDeck(decks[0]);
                    onNavigate("learn");
                  }
                }}
                className="btn bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-bold text-xs py-3 px-5 shadow-lg shadow-pink-500/10 hover:scale-105 transition-transform"
              >
                Rozpocznij powtórkę SRS ({srsDueCards.length})
              </button>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 border border-emerald-500/15 px-3 py-2 rounded-xl">
                <Icons.CheckCircle size={14} />
                <span>Twój umysł jest w pełni zsynchronizowany!</span>
              </div>
            )}

            <button 
              onClick={() => onNavigate("referrals")}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-bold"
            >
              <Icons.Gift size={14} className="text-indigo-400" /> Poleć aplikację
            </button>
          </div>
        </div>

        {/* SRS distribution breakdown and calendar */}
        <div className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Podział pamięciowy</h4>
            
            {/* Segmented Bar */}
            <div className="bg-white/5 h-3 rounded-lg overflow-hidden flex w-full border border-white/5">
              <div 
                className="bg-slate-600 h-full transition-all" 
                style={{ width: `${totalCardsCount > 0 ? (newCardsCount / totalCardsCount) * 100 : 100}%` }}
                title={`Nowe słówka: ${newCardsCount}`}
              />
              <div 
                className="bg-indigo-500 h-full transition-all" 
                style={{ width: `${totalCardsCount > 0 ? (learningCount / totalCardsCount) * 100 : 0}%` }}
                title={`W nauce: ${learningCount}`}
              />
              <div 
                className="bg-emerald-500 h-full transition-all" 
                style={{ width: `${totalCardsCount > 0 ? (masteredCount / totalCardsCount) * 100 : 0}%` }}
                title={`Opanowane: ${masteredCount}`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-1 text-[9px] font-bold mt-2 text-slate-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 block" /> Nowe ({newCardsCount})</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 block" /> W nauce ({learningCount})</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block" /> Opan. ({masteredCount})</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">Kalendarz powtórek</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                <span className="text-[9px] text-slate-500 font-bold block">JUTRO</span>
                <strong className="text-white text-sm block mt-0.5">{dueTomorrow}</strong>
              </div>
              <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                <span className="text-[9px] text-slate-500 font-bold block">3 DNI</span>
                <strong className="text-white text-sm block mt-0.5">{due3Days}</strong>
              </div>
              <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                <span className="text-[9px] text-slate-500 font-bold block">7 DNI</span>
                <strong className="text-white text-sm block mt-0.5">{due7Days}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="glass-card p-6 flex items-center gap-4 hover:border-amber-500/30">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Icons.Flame size={24} className="fill-amber-500/15" />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">Seria dni (Streak)</span>
            <p className="text-2xl font-black text-white mt-0.5">{stats.streak || 0} dni</p>
            <span className="text-[9px] text-slate-400 font-bold uppercase">Rekord: {stats.bestStreak || stats.streak || 0} dni</span>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="glass-card p-6 flex items-center gap-4 hover:border-indigo-500/30">
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Icons.Calendar size={24} />
          </div>
          <div className="flex-grow">
            <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider block mb-1">
              Cel dzienny ({dailyProgress}/{dailyTarget})
            </span>
            <div className="flex items-center gap-3">
              <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dailyPercent}%` }}
                />
              </div>
              <span className="text-xs font-black text-white">{dailyPercent}%</span>
            </div>
          </div>
        </div>

        {/* Quiz Accuracy */}
        <div className="glass-card p-6 flex items-center gap-4 hover:border-emerald-500/30">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Icons.Award size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">Skuteczność quizu</span>
            <p className="text-2xl font-black text-white mt-0.5">
              {stats.quizTotal > 0 ? `${Math.round((stats.quizCorrect / stats.quizTotal) * 100)}%` : "0%"}
            </p>
          </div>
        </div>

        {/* Games Won */}
        <div className="glass-card p-6 flex items-center gap-4 hover:border-cyan-500/30">
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Icons.Trophy size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">Wygrane gry w pary</span>
            <p className="text-2xl font-black text-white mt-0.5">{stats.matchesWon || 0}</p>
          </div>
        </div>
      </div>

      {/* Shrunk activity calendar card */}
      <div className="glass-card p-6 w-full flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icons.Flame size={18} className="text-amber-500 fill-amber-500/15" />
            <div>
              <h4 className="text-sm font-extrabold text-white">Kalendarz Aktywności (Ostatnie 28 dni)</h4>
              <p className="text-[11px] text-slate-400">Ucz się codziennie, aby utrzymać streak i zwiększyć moc płomienia!</p>
            </div>
          </div>
          
          {/* Growing flame effect indicator */}
          <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-xl border border-white/5 self-start sm:self-auto text-[10px]">
            <span className="text-slate-400 font-bold">Moc płomienia:</span>
            <span className={`font-black uppercase ${
              stats.streak >= 30 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse" 
                : stats.streak >= 7 
                  ? "text-cyan-400" 
                  : "text-amber-500"
            }`}>
              {stats.streak >= 30 ? "🌈 Tęczowy" : stats.streak >= 7 ? "⚡ Elektryczny" : "🔥 Klasyczny"}
            </span>
          </div>
        </div>
        
        {/* Grid of 28 days */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 max-w-xl mx-auto w-full pt-1">
          {(() => {
            const days = [];
            const today = new Date();
            for (let i = 27; i >= 0; i--) {
              const d = new Date();
              d.setDate(today.getDate() - i);
              const dateStr = d.toISOString().split("T")[0];
              const hasStudied = (stats.studyDates || []).includes(dateStr);
              
              days.push({
                date: dateStr,
                label: d.getDate(),
                hasStudied,
                isToday: dateStr === today.toISOString().split("T")[0]
              });
            }
            return days.map((day, idx) => (
              <div 
                key={day.date} 
                className={`aspect-square flex flex-col items-center justify-center rounded-xl border text-[9px] font-black transition-all relative group cursor-pointer ${
                  day.hasStudied
                    ? stats.streak >= 30
                      ? "bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 border-transparent text-white shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                      : stats.streak >= 7
                        ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.2)]"
                        : "bg-amber-500/10 border-amber-500/40 text-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.2)]"
                    : day.isToday
                      ? "bg-white/5 border-indigo-500/40 text-indigo-400"
                      : "bg-black/20 border-white/5 text-slate-600 hover:border-white/10"
                }`}
              >
                {day.hasStudied ? (
                  <Icons.Flame size={12} className={`${
                    stats.streak >= 30
                      ? "text-white fill-white/20 animate-pulse"
                      : stats.streak >= 7
                        ? "text-cyan-400 fill-cyan-400/20"
                        : "text-amber-500 fill-amber-500/20"
                  }`} />
                ) : (
                  <span>{day.label}</span>
                )}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-955 border border-white/10 px-2 py-0.5 rounded text-[8px] text-white font-bold whitespace-nowrap z-20 pointer-events-none shadow-xl">
                  {day.date} {day.hasStudied ? "• Aktywność! 🔥" : "• Brak nauki"}
                </div>
              </div>
            ));
          })()}
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/5 my-1" />
        
        {/* Milestones Panel */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Odznaczenia za Serię Dni (Milestones)</h5>
            <span className="text-[9px] font-bold text-slate-500">Najlepszy streak: {stats.bestStreak || stats.streak || 0} dni</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 5 Dni - Brązowy Płomień */}
            {(() => {
              const bestStreak = stats.bestStreak || stats.streak || 0;
              const unlocked = bestStreak >= 5;
              return (
                <div 
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    unlocked 
                      ? "bg-amber-600/5 border-amber-600/30 text-amber-500 shadow-[0_0_12px_rgba(217,119,6,0.1)] hover:border-amber-500/40" 
                      : "bg-black/20 border-white/5 text-slate-500 opacity-40"
                  }`}
                >
                  <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${unlocked ? "border-amber-500/20 bg-amber-500/10" : "border-transparent bg-white/5"}`}>
                    <Icons.Flame size={16} className={unlocked ? "fill-amber-500/15 text-amber-500 animate-pulse" : "text-slate-600"} />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[11px] font-bold text-white block truncate">Brązowy Płomień</span>
                    <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Seria 5 dni nauki</span>
                  </div>
                  {unlocked ? (
                    <Icons.CheckCircle size={12} className="text-amber-500 shrink-0" />
                  ) : (
                    <Icons.Lock size={12} className="text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })()}

            {/* 10 Dni - Srebrny Płomień */}
            {(() => {
              const bestStreak = stats.bestStreak || stats.streak || 0;
              const unlocked = bestStreak >= 10;
              return (
                <div 
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    unlocked 
                      ? "bg-slate-400/5 border-slate-400/30 text-slate-300 shadow-[0_0_12px_rgba(148,163,184,0.1)] hover:border-slate-300/40" 
                      : "bg-black/20 border-white/5 text-slate-500 opacity-40"
                  }`}
                >
                  <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${unlocked ? "border-slate-300/20 bg-slate-300/10" : "border-transparent bg-white/5"}`}>
                    <Icons.Shield size={16} className={unlocked ? "text-slate-300" : "text-slate-600"} />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[11px] font-bold text-white block truncate">Srebrny Płomień</span>
                    <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Seria 10 dni nauki</span>
                  </div>
                  {unlocked ? (
                    <Icons.CheckCircle size={12} className="text-slate-300 shrink-0" />
                  ) : (
                    <Icons.Lock size={12} className="text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })()}

            {/* 20 Dni - Złoty Płomień */}
            {(() => {
              const bestStreak = stats.bestStreak || stats.streak || 0;
              const unlocked = bestStreak >= 20;
              return (
                <div 
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    unlocked 
                      ? "bg-yellow-500/5 border-yellow-500/30 text-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.1)] hover:border-yellow-400/40" 
                      : "bg-black/20 border-white/5 text-slate-500 opacity-40"
                  }`}
                >
                  <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${unlocked ? "border-yellow-500/20 bg-yellow-500/10" : "border-transparent bg-white/5"}`}>
                    <Icons.Trophy size={16} className={unlocked ? "text-yellow-500" : "text-slate-600"} />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[11px] font-bold text-white block truncate">Złoty Płomień</span>
                    <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Seria 20 dni nauki</span>
                  </div>
                  {unlocked ? (
                    <Icons.CheckCircle size={12} className="text-yellow-500 shrink-0" />
                  ) : (
                    <Icons.Lock size={12} className="text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })()}

            {/* 30 Dni - Diamentowy Płomień */}
            {(() => {
              const bestStreak = stats.bestStreak || stats.streak || 0;
              const unlocked = bestStreak >= 30;
              return (
                <div 
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                    unlocked 
                      ? "bg-cyan-500/5 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.1)] hover:border-cyan-400/40" 
                      : "bg-black/20 border-white/5 text-slate-500 opacity-40"
                  }`}
                >
                  <div className={`p-2 rounded-lg border flex items-center justify-center shrink-0 ${unlocked ? "border-cyan-500/20 bg-cyan-500/10" : "border-transparent bg-white/5"}`}>
                    <Icons.Crown size={16} className={unlocked ? "text-cyan-400 animate-pulse" : "text-slate-600"} />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[11px] font-bold text-white block truncate">Diamentowy Płomień</span>
                    <span className="text-[9px] font-medium text-slate-400 block mt-0.5">Seria 30 dni (Miesiąc)</span>
                  </div>
                  {unlocked ? (
                    <Icons.CheckCircle size={12} className="text-cyan-400 shrink-0" />
                  ) : (
                    <Icons.Lock size={12} className="text-slate-600 shrink-0" />
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Decks listing */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Icons.BookOpen size={20} className="text-indigo-400" />
            Twoje Talie Fiszek
          </h3>
          <button 
            onClick={() => onNavigate("creator")}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-bold bg-indigo-500/5 hover:bg-indigo-500/10 px-3.5 py-2 rounded-xl border border-indigo-500/15"
          >
            <Icons.Plus size={14} /> Stwórz nową talię
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realDecks.length === 0 ? (
            <div className="col-span-full glass-card p-10 text-center flex flex-col items-center gap-4 border border-dashed border-white/10">
              <Icons.Compass size={48} className="text-indigo-400 animate-pulse" />
              <h4 className="text-lg font-bold text-white">Twój pulpit jest pusty</h4>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                Przejdź do Katalogu Talii, aby wybrać i dodać interesujące Cię tematy do nauki! 🧭
              </p>
              <button 
                onClick={() => onNavigate("library")} 
                className="btn btn-primary text-xs py-2.5 px-5 rounded-xl scale-hover flex items-center gap-2 mt-2"
              >
                <Icons.Compass size={14} />
                Przejdź do Katalogu Talii
              </button>
            </div>
          ) : (
            realDecks.map((deck) => {
              const IconComponent = Icons[deck.icon] || Icons.BookOpen;
              
              const deckCardsList = deck.cards || [];
              const deckCardsCount = deckCardsList.length;
              const deckLearnedCount = deckCardsList.filter(card => stats.learnedCards?.[card.id]).length;
              const deckProgress = deckCardsCount > 0 ? Math.round((deckLearnedCount / deckCardsCount) * 100) : 0;
              const isCompleted100 = deckProgress === 100;

              const deckDueCount = deck.id !== "starred" && deck.id !== "srs"
                ? deckCardsList.filter(card => {
                    const srs = srsData[card.id];
                    if (!srs) return true;
                    return srs.nextReviewDate <= todayStr;
                  }).length
                : 0;

              return (
                <div 
                  key={deck.id} 
                  className={`glass-card p-6 flex flex-col justify-between hover:-translate-y-1 scale-hover border-t-4 transition-all duration-300 ${
                    isCompleted100 
                      ? "gold-deck-outline" 
                      : stats.deckMedals?.[deck.id] === 'gold' 
                        ? "border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.12)] ring-1 ring-yellow-500/20" 
                        : ""
                  }`}
                  style={{
                    borderTopColor: isCompleted100 ? '#eab308' : stats.deckMedals?.[deck.id] === 'gold' ? '#eab308' : (deck.color || '#6366f1')
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div 
                        className="p-3.5 rounded-2xl border"
                        style={{ 
                          backgroundColor: `${deck.color}10`, 
                          color: deck.color,
                          borderColor: `${deck.color}20`
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full font-bold text-slate-400 uppercase tracking-wider">
                          {deckCardsCount} fiszek
                        </span>
                        {deckDueCount > 0 && (
                          <span className="text-[9px] bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded-full font-black text-pink-400 uppercase tracking-wider animate-pulse">
                            Powtórka: {deckDueCount}
                          </span>
                        )}
                        {stats.deckMedals?.[deck.id] && (
                          <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 border ${
                            stats.deckMedals[deck.id] === 'gold' 
                              ? "bg-yellow-500/15 border-yellow-500/30 text-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.2)]" 
                              : stats.deckMedals[deck.id] === 'silver'
                                ? "bg-slate-300/15 border-slate-300/30 text-slate-300"
                                : "bg-amber-600/15 border-amber-600/30 text-amber-500"
                          }`}>
                            {stats.deckMedals[deck.id] === 'gold' ? "🥇 Złoto" : stats.deckMedals[deck.id] === 'silver' ? "🥈 Srebro" : "🥉 Brąz"}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mt-4 tracking-tight">{deck.title}</h4>
                    <span className="text-xs text-indigo-300 font-semibold">{deck.polishTitle}</span>
                    <p className="text-slate-400 text-xs mt-3 line-clamp-2 leading-relaxed">
                      {deck.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-slate-500 font-bold uppercase">Opanowane</span>
                      <span className="text-white font-extrabold">{deckProgress}%</span>
                    </div>
                    <div className="bg-white/5 h-1.5 rounded-full overflow-hidden mb-5 border border-white/5">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${deckProgress}%`,
                          backgroundColor: deck.color
                        }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          onSelectDeck(deck);
                          onNavigate("learn");
                        }}
                        className="flex-grow btn btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5 font-bold hover:scale-[1.02] transition-transform"
                      >
                        <Icons.Play size={12} /> Fiszki
                      </button>
                      <button 
                        onClick={() => {
                          onSelectDeck(deck);
                          onNavigate("quiz");
                        }}
                        className="flex-grow btn text-xs py-2.5 px-3 flex items-center justify-center gap-1.5 font-bold hover:scale-[1.02] transition-transform"
                        style={{ 
                          background: `${deck.color}12`, 
                          color: deck.color,
                          borderColor: `${deck.color}25`
                        }}
                      >
                        <Icons.Award size={12} /> Test
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

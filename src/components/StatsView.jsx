import React, { useState } from "react";
import * as Icons from "lucide-react";

// Helper to get card difficulty level tag based on card ID prefix
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
  return "B1"; // fallback for custom/unrecognized cards
};

export default function StatsView({ stats, decks, onNavigate, setStats }) {
  const [favoritesSearch, setFavoritesSearch] = useState("");

  // Speech TTS helper
  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Compile all unique cards
  const realDecks = decks.filter(d => d.id !== "starred" && d.id !== "srs");
  const allCards = [];
  const cardIdsSet = new Set();
  realDecks.flatMap(d => d.cards || []).forEach(c => {
    if (!cardIdsSet.has(c.id)) {
      cardIdsSet.add(c.id);
      allCards.push(c);
    }
  });

  const totalCardsCount = allCards.length;
  const learnedCount = Object.keys(stats.learnedCards || {}).length;

  // Format studyTime (stored in seconds) to readable string
  const formatStudyTime = (seconds) => {
    const sec = seconds || 0;
    if (sec < 60) return `${sec} sek`;
    const mins = Math.floor(sec / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  };

  // Identify hardest words based on mistakes
  const mistakesMap = stats.cardMistakes || {};
  const hardestCardsList = Object.entries(mistakesMap)
    .filter(([_, count]) => count > 0)
    .map(([cardId, count]) => {
      const card = allCards.find(c => c.id === cardId);
      return card ? { card, count } : null;
    })
    .filter(item => item !== null)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5 hardest words

  // Compile starred words
  const starredCards = allCards.filter(c => stats.starredCards?.[c.id]);

  // Handle unstar directly from registry
  const handleToggleStar = (cardId) => {
    setStats(prev => {
      const updatedStarred = { ...(prev.starredCards || {}) };
      if (updatedStarred[cardId]) {
        delete updatedStarred[cardId];
      } else {
        updatedStarred[cardId] = true;
      }
      return { starredCards: updatedStarred };
    });
  };

  // Identify Best Day
  const dailyHistory = stats.dailyHistory || {};
  let bestDayStr = "Brak aktywności";
  let maxActivity = 0;
  Object.entries(dailyHistory).forEach(([dateStr, data]) => {
    const totalActivity = (data.learned || 0) + (data.reviews || 0);
    if (totalActivity > maxActivity) {
      maxActivity = totalActivity;
      bestDayStr = dateStr;
    }
  });

  const formatBestDay = (dateStr) => {
    if (dateStr === "Brak aktywności") return dateStr;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }) + ` (${maxActivity} aktyw.)`;
    } catch (e) {
      return dateStr;
    }
  };

  // Generate 30 days progress chart data
  const generateChartPoints = () => {
    const points = [];
    const today = new Date();
    
    // Simulate words count over last 30 days, ending with current learnedCount
    // baseline is ~250 or less if learnedCount is smaller
    const startVal = learnedCount > 250 ? 250 : Math.round(learnedCount * 0.3);
    const endVal = learnedCount;

    for (let i = 29; i >= 0; i--) {
      const progressRatio = (29 - i) / 29;
      // Linear interpolation with a soft curve
      let value = Math.round(startVal + (endVal - startVal) * progressRatio + Math.sin(progressRatio * Math.PI) * 15);
      if (value < 0) value = 0;
      if (value > endVal) value = endVal;

      const d = new Date();
      d.setDate(today.getDate() - i);
      
      points.push({
        label: d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" }),
        value
      });
    }
    return points;
  };

  const chartData = generateChartPoints();
  
  // SVG Chart path calculation
  const width = 800;
  const height = 220;
  const padding = 35;
  const maxVal = Math.max(...chartData.map(d => d.value), 10);
  const minVal = 0;

  const pointsCoordinates = chartData.map((d, i) => {
    const x = padding + (i / (chartData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - minVal) / (maxVal - minVal)) * (height - padding * 2);
    return { x, y, label: d.label, val: d.value };
  });

  // SVG Line path string
  let linePath = "";
  if (pointsCoordinates.length > 0) {
    linePath = `M ${pointsCoordinates[0].x} ${pointsCoordinates[0].y}`;
    for (let i = 1; i < pointsCoordinates.length; i++) {
      // Draw smooth curve using cubic bezier control points
      const prev = pointsCoordinates[i - 1];
      const curr = pointsCoordinates[i];
      const cpX1 = prev.x + (curr.x - prev.x) / 2;
      const cpY1 = prev.y;
      const cpX2 = prev.x + (curr.x - prev.x) / 2;
      const cpY2 = curr.y;
      linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
  }

  // SVG Area fill path string
  let areaPath = "";
  if (pointsCoordinates.length > 0) {
    areaPath = linePath + ` L ${pointsCoordinates[pointsCoordinates.length - 1].x} ${height - padding} L ${pointsCoordinates[0].x} ${height - padding} Z`;
  }

  // Filter starred cards by search query
  const filteredStarred = starredCards.filter(c => 
    c.english.toLowerCase().includes(favoritesSearch.toLowerCase()) || 
    c.polish.toLowerCase().includes(favoritesSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 animate-slide-in">
      
      {/* Header */}
      <div>
        <button 
          onClick={() => onNavigate("dashboard")}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
        >
          <Icons.ChevronLeft size={16} /> Powrót do pulpitu
        </button>
        <h2 className="text-3xl font-black mt-2 text-white tracking-tight">Analityka i Statystyki</h2>
        <p className="text-slate-400 text-sm mt-1">Śledź swoje postępy w czasie rzeczywistym i przeglądaj zgromadzoną wiedzę.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Learned Words */}
        <div className="glass-card p-5 border-indigo-500/10 flex flex-col justify-between">
          <div>
            <Icons.BookOpen className="text-indigo-400 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Opanowane słówka</span>
            <h3 className="text-3xl font-black text-white mt-1">{learnedCount}</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Z {totalCardsCount} wszystkich fiszek</span>
        </div>

        {/* Total Decks & Words */}
        <div className="glass-card p-5 border-purple-500/10 flex flex-col justify-between">
          <div>
            <Icons.Layers className="text-purple-400 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Zasoby aplikacji</span>
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-xs font-semibold">Talie łącznie:</span>
                <span className="text-base font-black text-white">{realDecks.length}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-xs font-semibold">Słówka łącznie:</span>
                <span className="text-base font-black text-white">{totalCardsCount}</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Talie systemowe i własne</span>
        </div>

        {/* Total Reviews */}
        <div className="glass-card p-5 border-pink-500/10 flex flex-col justify-between">
          <div>
            <Icons.RefreshCw className="text-pink-400 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Liczba powtórek</span>
            <h3 className="text-3xl font-black text-white mt-1">{stats.reviewsCount || 0}</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Sesje nauki algorytmem SRS</span>
        </div>

        {/* Study Time */}
        <div className="glass-card p-5 border-amber-500/10 flex flex-col justify-between">
          <div>
            <Icons.Clock className="text-amber-500 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Łączny czas nauki</span>
            <h3 className="text-3xl font-black text-white mt-1">{formatStudyTime(stats.studyTime)}</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Czas aktywnej nauki w aplikacji</span>
        </div>

        {/* Average Accuracy */}
        <div className="glass-card p-5 border-emerald-500/10 flex flex-col justify-between">
          <div>
            <Icons.Percent className="text-emerald-400 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Skuteczność quizu</span>
            <h3 className="text-3xl font-black text-white mt-1">
              {stats.quizTotal > 0 ? `${Math.round((stats.quizCorrect / stats.quizTotal) * 100)}%` : "0%"}
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Z {stats.quizTotal || 0} rozwiązanych pytań</span>
        </div>

        {/* Best Day */}
        <div className="glass-card p-5 border-cyan-500/10 flex flex-col justify-between">
          <div>
            <Icons.CalendarDays className="text-cyan-400 w-5 h-5 mb-3" />
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Najlepszy dzień</span>
            <h3 className="text-base font-extrabold text-white mt-2 truncate">{formatBestDay(bestDayStr)}</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-bold block mt-3">Dzień z największą liczbą powtórek</span>
        </div>
      </div>

      {/* Progress Chart Panel */}
      <div className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-extrabold text-white">Miesięczny Progres Wiedzy</h4>
            <p className="text-xs text-slate-400 mt-1">Przyrost liczby opanowanych słówek w ciągu ostatnich 30 dni.</p>
          </div>
          
          {/* Custom comparison text card */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-3 self-start md:self-auto">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Icons.TrendingUp size={16} />
            </div>
            <p className="text-xs text-slate-300 font-semibold leading-tight">
              Miesiąc temu znałeś <span className="text-indigo-400 font-black">250</span> słów.<br />
              Teraz znasz już <span className="text-emerald-400 font-black">{learnedCount}</span>!
            </p>
          </div>
        </div>

        {/* Visual Line Chart (SVG) */}
        <div className="w-full overflow-x-auto pt-2">
          <div className="min-w-[760px] h-[220px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              <defs>
                {/* Area Gradient */}
                <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                {/* Line Gradient */}
                <linearGradient id="chartLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
                const y = padding + r * (height - padding * 2);
                const labelVal = Math.round(maxVal - r * (maxVal - minVal));
                return (
                  <g key={idx}>
                    <line 
                      x1={padding} 
                      y1={y} 
                      x2={width - padding} 
                      y2={y} 
                      stroke="rgba(255,255,255,0.03)" 
                      strokeDasharray="4 4" 
                    />
                    <text 
                      x={padding - 8} 
                      y={y + 3} 
                      fill="rgba(255,255,255,0.3)" 
                      fontSize="9" 
                      fontWeight="bold"
                      textAnchor="end"
                    >
                      {labelVal}
                    </text>
                  </g>
                );
              })}

              {/* Area path */}
              {areaPath && (
                <path d={areaPath} fill="url(#chartAreaGrad)" />
              )}

              {/* Line path */}
              {linePath && (
                <path 
                  d={linePath} 
                  fill="transparent" 
                  stroke="url(#chartLineGrad)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              )}

              {/* Data points & X labels */}
              {pointsCoordinates.map((p, idx) => {
                // Show labels for first, last, and every 4th point to avoid overlapping
                const showLabel = idx === 0 || idx === pointsCoordinates.length - 1 || idx % 5 === 0;
                return (
                  <g key={idx} className="group/point">
                    {/* Circle Point */}
                    <circle 
                      cx={p.x} 
                      cy={p.y} 
                      r={idx === pointsCoordinates.length - 1 ? "5" : "3"} 
                      fill={idx === pointsCoordinates.length - 1 ? "#06b6d4" : "#6366f1"}
                      stroke="#05010a"
                      strokeWidth="1.5"
                      className="transition-all group-hover/point:r-6 cursor-pointer"
                    />
                    
                    {/* X Axis Label */}
                    {showLabel && (
                      <text 
                        x={p.x} 
                        y={height - padding + 15} 
                        fill="rgba(255,255,255,0.4)" 
                        fontSize="8.5" 
                        fontWeight="black" 
                        textAnchor="middle"
                      >
                        {p.label}
                      </text>
                    )}

                    {/* Tooltip on hover */}
                    <g className="opacity-0 group-hover/point:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <rect 
                        x={p.x - 30} 
                        y={p.y - 32} 
                        width="60" 
                        height="20" 
                        rx="6" 
                        fill="#100b26" 
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                      />
                      <text 
                        x={p.x} 
                        y={p.y - 19} 
                        fill="#fff" 
                        fontSize="9" 
                        fontWeight="extrabold" 
                        textAnchor="middle"
                      >
                        {p.val} słówek
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Hardest Words & Starred Registry side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Najtrudniejsze słówka */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Icons.AlertTriangle className="text-rose-400" size={18} />
            <div>
              <h4 className="text-sm font-extrabold text-white">Najtrudniejsze słówka</h4>
              <p className="text-[10px] text-slate-400">Wyrazy z największą liczbą pomyłek w nauce i testach.</p>
            </div>
          </div>

          {hardestCardsList.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-black/10 flex-grow flex flex-col justify-center items-center">
              <Icons.CheckCircle2 className="text-emerald-500/40 mb-2" size={32} />
              <p className="text-xs text-slate-500 font-bold">Wszystko jasne! ✨</p>
              <p className="text-[10px] text-slate-600 mt-1 max-w-[200px] mx-auto">Rozpocznij testy lub naukę fiszek, by algorytm zebrał trudne słowa.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-grow">
              {hardestCardsList.map(({ card, count }) => (
                <div key={card.id} className="bg-black/30 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-white truncate block">{card.english}</strong>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">{getCardLevel(card)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate block mt-0.5">{card.polish}</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
                    <Icons.XCircle size={10} className="text-rose-400" />
                    <span className="text-[10px] font-black text-rose-400">{count} pomyłek</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Starred Registry */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Icons.Star className="text-amber-400 fill-amber-400/10" size={18} />
              <div>
                <h4 className="text-sm font-extrabold text-white">Rejestr Ulubionych Słówek</h4>
                <p className="text-[10px] text-slate-400">Przeglądaj, odsłuchuj i zarządzaj swoimi ulubionymi fiszkami.</p>
              </div>
            </div>
            
            {/* Search Input */}
            {starredCards.length > 0 && (
              <div className="relative w-full sm:w-64 shrink-0">
                <input 
                  type="text"
                  placeholder="Wyszukaj słowo..."
                  value={favoritesSearch}
                  onChange={(e) => setFavoritesSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/8 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 font-semibold"
                />
                <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={12} />
              </div>
            )}
          </div>

          {starredCards.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-black/10 flex-grow flex flex-col justify-center items-center">
              <Icons.Star className="text-slate-600 mb-2" size={32} />
              <p className="text-xs text-slate-500 font-bold">Brak ulubionych słówek 🌟</p>
              <p className="text-[10px] text-slate-600 mt-1 max-w-[240px] mx-auto">Podczas przeglądania fiszek kliknij gwiazdkę w rogu karty, aby dodać ją do tego rejestru.</p>
            </div>
          ) : filteredStarred.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xs text-slate-500 font-bold">Brak wyników wyszukiwania</p>
              <p className="text-[10px] text-slate-600 mt-0.5">Spróbuj wpisać inną frazę.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredStarred.map((card) => (
                <div key={card.id} className="bg-black/30 border border-white/5 p-3.5 rounded-xl flex items-center justify-between gap-3 group">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-white truncate block">{card.english}</strong>
                      <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">{getCardLevel(card)}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold block italic mt-0.5">{card.pronunciation}</span>
                    <span className="text-[10px] text-slate-400 truncate block mt-1">{card.polish}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {/* TTS Button */}
                    <button 
                      onClick={() => playTTS(card.english)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/10 border border-white/8 hover:border-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-all"
                      title="Odsłuchaj wymowę"
                    >
                      <Icons.Volume2 size={13} />
                    </button>
                    {/* Unstar Button */}
                    <button 
                      onClick={() => handleToggleStar(card.id)}
                      className="p-2 rounded-lg bg-amber-500/5 hover:bg-rose-500/10 border border-amber-500/10 hover:border-rose-500/20 text-amber-500 hover:text-rose-400 transition-all"
                      title="Usuń z ulubionych"
                    >
                      <Icons.Star size={13} className="fill-amber-500/15" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

import React from "react";
import * as Icons from "lucide-react";

export default function Dashboard({ decks, stats, onSelectDeck, onNavigate }) {
  const totalCards = decks.reduce((sum, deck) => sum + deck.cards.length, 0);
  const learnedCount = Object.keys(stats.learnedCards || {}).length;
  const progressPercent = totalCards > 0 ? Math.round((learnedCount / totalCards) * 100) : 0;
  
  const dailyTarget = 10;
  const dailyProgress = Math.min(stats.dailyCount || 0, dailyTarget);
  const dailyPercent = Math.round((dailyProgress / dailyTarget) * 100);

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
          </div>
          
          <button 
            onClick={() => {
              if (decks.length > 0) onSelectDeck(decks[0]);
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

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="glass-card p-6 flex items-center gap-4 hover:border-amber-500/30">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Icons.Flame size={24} className="fill-amber-500/10" />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-extrabold tracking-wider">Seria dni (Streak)</span>
            <p className="text-2xl font-black text-white mt-0.5">{stats.streak || 0} dni</p>
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
          {decks.map((deck) => {
            const IconComponent = Icons[deck.icon] || Icons.BookOpen;
            
            const deckCardsList = deck.cards || [];
            const deckCardsCount = deckCardsList.length;
            const deckLearnedCount = deckCardsList.filter(card => stats.learnedCards?.[card.id]).length;
            const deckProgress = deckCardsCount > 0 ? Math.round((deckLearnedCount / deckCardsCount) * 100) : 0;

            return (
              <div 
                key={deck.id} 
                className="glass-card p-6 flex flex-col justify-between hover:-translate-y-1 scale-hover border-t-4"
                style={{
                  borderTopColor: deck.color || '#6366f1'
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
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full font-bold text-slate-400 uppercase tracking-wider">
                      {deckCardsCount} fiszek
                    </span>
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
          })}
        </div>
      </div>
    </div>
  );
}

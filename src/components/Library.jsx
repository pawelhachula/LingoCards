import React, { useState } from "react";
import * as Icons from "lucide-react";
import { playSound } from "../utils/effects";

const CATEGORY_META = {
  everyday: { label: "Codzienny", icon: "MessageSquare", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  dining: { label: "Kulinarny", icon: "Utensils", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  travel: { label: "Podróże", icon: "Compass", style: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  nature: { label: "Przyroda", icon: "Leaf", style: "bg-green-500/10 text-green-400 border-green-500/20" },
  business: { label: "Biznes", icon: "Briefcase", style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  tech: { label: "Technologia", icon: "Laptop", style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  culture: { label: "Kultura", icon: "Film", style: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  general: { label: "Ogólny", icon: "GraduationCap", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  idioms: { label: "Idiomy", icon: "Flame", style: "bg-orange-500/10 text-orange-400 border-orange-500/20" }
};

const CEFR_COLORS = {
  A1: "bg-green-500/15 text-green-400 border-green-500/25",
  A2: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  B1: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  B2: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
  C1: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  C2: "bg-rose-500/15 text-rose-400 border-rose-500/25"
};

export default function Library({ decks, systemDeckIds, activeDeckIds, onToggleActiveDeck, onSelectDeck, onNavigate, stats, onUpdateStats }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCefr, setSelectedCefr] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumTriggerDeck, setPremiumTriggerDeck] = useState(null);
  const [activeTab, setActiveTab] = useState("vocabulary"); // "vocabulary" | "idioms"

  const isPro = !!stats.isPro;

  // Rozdziel talie systemowe od użytkownika
  const systemDecks = systemDeckIds ? decks.filter(d => systemDeckIds.has(d.id)) : decks;
  const userDecks = systemDeckIds ? decks.filter(d => !systemDeckIds.has(d.id)) : [];

  const handleTogglePro = () => {
    onUpdateStats({ isPro: !isPro });
    playSound("success", stats.audioStyle || "synth");
  };

  const handleOpenPremium = (deck) => {
    playSound("error", stats.audioStyle || "synth");
    setPremiumTriggerDeck(deck);
    setShowPremiumModal(true);
  };

  // Filtruj według aktywnej zakładki (Słownictwo vs Idiomy)
  const tabDecks = systemDecks.filter(deck => deck.type === activeTab);

  // Filtruj na podstawie wyszukiwania, poziomu i kategorii
  const filteredDecks = tabDecks.filter(deck => {
    const matchesSearch = 
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deck.polishTitle && deck.polishTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCefr = selectedCefr === "all" || deck.level === selectedCefr;
    
    // Dla idiomów nie filtrujemy po kategorii (są zawsze idioms)
    const matchesCategory = activeTab === "idioms" || selectedCategory === "all" || deck.category === selectedCategory;

    return matchesSearch && matchesCefr && matchesCategory;
  });

  const getIconComponent = (iconName) => {
    const Icon = Icons[iconName] || Icons.BookOpen;
    return <Icon size={16} />;
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-slide-in">
      {/* Header and PRO switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Katalog lekcji i słownictwa
          </h2>
          <p className="text-slate-400 text-xs">Przeglądaj oficjalne zestawy słownictwa i dodawaj je do swojej nauki</p>
        </div>
        <button 
          onClick={handleTogglePro} 
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 scale-hover ${
            isPro 
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-lg shadow-amber-500/5 font-extrabold" 
              : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
          }`}
        >
        <Icons.Crown size={15} className={isPro ? "fill-amber-400" : ""} />
          <span>Status: {isPro ? "Konto PRO (Aktywne)" : "Konto FREE (Zmień)"}</span>
        </button>
      </div>

      {/* Zakładki: Słownictwo vs Idiomy */}
      <div className="flex border-b border-white/10 w-full">
        <button
          onClick={() => {
            setActiveTab("vocabulary");
            playSound("tap", stats.audioStyle || "synth");
          }}
          className={`flex-1 py-4 text-center font-black text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "vocabulary"
              ? "text-indigo-400 border-indigo-500 bg-indigo-500/[0.02]"
              : "text-slate-400 border-transparent hover:text-white hover:bg-white/[0.01]"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Icons.BookOpen size={16} />
            Słownictwo
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("idioms");
            playSound("tap", stats.audioStyle || "synth");
          }}
          className={`flex-1 py-4 text-center font-black text-xs sm:text-sm uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "idioms"
              ? "text-orange-400 border-orange-500 bg-orange-500/[0.02]"
              : "text-slate-400 border-transparent hover:text-white hover:bg-white/[0.01]"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Icons.Flame size={16} />
            Idiomy i Frazale
          </span>
        </button>
      </div>

      {/* Sekcja talii użytkownika */}
      {userDecks.length > 0 && (
        <div>
          <h3 className="text-sm font-extrabold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
            <Icons.User size={14} className={activeTab === "vocabulary" ? "text-indigo-400" : "text-orange-400"} />
            Twoje własne talie
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {userDecks.map(deck => {
              const IconComponent = Icons[deck.icon] || Icons.BookOpen;
              return (
                <div key={deck.id} className="glass-card p-4 flex items-center gap-4 hover:border-indigo-500/20 transition-all">
                  <div
                    className="p-3 rounded-xl border shrink-0"
                    style={{ backgroundColor: `${deck.color}15`, color: deck.color, borderColor: `${deck.color}25` }}
                  >
                    <IconComponent size={18} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-white truncate">{deck.title}</p>
                    <p className="text-[11px] text-slate-500">{deck.cards?.length || 0} słówek</p>
                  </div>
                  <button
                    onClick={() => {
                      onSelectDeck(deck);
                      onNavigate("learn");
                      playSound("tap", stats.audioStyle || "synth");
                    }}
                    className={`shrink-0 text-xs font-extrabold px-3.5 py-2 rounded-lg bg-gradient-to-r text-white transition-all flex items-center gap-1 scale-hover shadow-lg uppercase tracking-wider ${
                      activeTab === "vocabulary"
                        ? "from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 shadow-indigo-500/10"
                        : "from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 shadow-orange-500/10"
                    }`}
                  >
                    Ucz się
                    <Icons.ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 flex flex-col gap-4">
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3 bg-black/30 border border-white/8 rounded-xl">
          <Icons.Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj talii po nazwie, opisie..."
            className="bg-transparent text-white placeholder-slate-500 text-sm font-semibold outline-none w-full"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-slate-500 hover:text-white">
              <Icons.X size={16} />
            </button>
          )}
        </div>

        {/* CEFR Level buttons */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Poziom trudności CEFR</span>
          <div className="flex flex-wrap gap-1.5">
            <button 
              onClick={() => setSelectedCefr("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedCefr === "all"
                  ? "bg-white/10 text-white border-white/20"
                  : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
              }`}
            >
              Wszystkie
            </button>
            {["A1", "A2", "B1", "B2", "C1", "C2"].map(lvl => (
              <button 
                key={lvl}
                onClick={() => setSelectedCefr(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedCefr === lvl
                    ? "bg-white/10 text-white border-white/20"
                    : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
                }`}
              >
                {lvl} {lvl === "A1" || lvl === "A2" ? "(FREE)" : "(PRO)"}
              </button>
            ))}
          </div>
        </div>

        {/* Category filters */}
        {activeTab === "vocabulary" && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">Kategoria tematyczna</span>
            <div className="flex flex-wrap gap-1.5">
              <button 
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedCategory === "all"
                    ? "bg-white/10 text-white border-white/20"
                    : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
                }`}
              >
                Wszystkie
              </button>
              {Object.entries(CATEGORY_META).map(([key, meta]) => (
                <button 
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                    selectedCategory === key
                      ? "bg-white/10 text-white border-white/20"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
                  }`}
                >
                  {getIconComponent(meta.icon)}
                  <span>{meta.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDecks.length === 0 ? (
          <div className="col-span-full glass-card p-12 text-center flex flex-col items-center gap-4">
            <Icons.BookOpen size={48} className="text-slate-600" />
            <h4 className="text-lg font-bold text-white">Brak pasujących talii</h4>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">Spróbuj zmienić filtry lub wyszukiwaną frazę, aby znaleźć interesujące Cię zestawy.</p>
          </div>
        ) : (
          filteredDecks.map(deck => {
            const isActive = activeDeckIds.includes(deck.id);
            const isDeckLocked = !isPro && deck.isPremium;
            const cat = CATEGORY_META[deck.category] || { label: "Ogólny", icon: "BookOpen", style: "bg-slate-500/10 text-slate-400 border-transparent" };
            
            return (
              <div 
                key={deck.id}
                className={`glass-card p-5 flex flex-col justify-between gap-4 border transition-all relative overflow-hidden group ${
                  isDeckLocked 
                    ? "border-white/5 opacity-40 grayscale-[60%] hover:opacity-50 transition-opacity" 
                    : isActive 
                      ? "border-indigo-500/20 shadow-[0_4px_20px_rgba(99,102,241,0.05)] bg-gradient-to-b from-indigo-500/[0.02] to-transparent" 
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.01]"
                }`}
              >
                {/* Lock Overlay for PRO */}
                {isDeckLocked && (
                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-md">
                    <Icons.Crown size={12} className="fill-amber-400/20" />
                  </div>
                )}

                {/* Deck Card Header */}
                <div className="flex flex-col gap-2">
                  <div className={`flex items-center justify-between gap-2 ${isDeckLocked ? "pr-7" : ""}`}>
                    {/* Category tag */}
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${cat.style} flex items-center gap-1`}>
                      {getIconComponent(cat.icon)}
                      {cat.label}
                    </span>
                    {/* CEFR tag */}
                    <span className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded border ${CEFR_COLORS[deck.level] || CEFR_COLORS.B1}`}>
                      {deck.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mt-1.5 tracking-tight group-hover:text-indigo-400 transition-colors">
                    {deck.title}
                  </h3>
                  {deck.polishTitle && (
                    <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-wide leading-none">
                      {deck.polishTitle}
                    </p>
                  )}
                  
                  <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
                    {deck.description}
                  </p>
                </div>

                {/* Deck Card Footer / Action */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <Icons.Layers size={12} />
                    {deck.cards?.length || 0} słówek
                  </span>
                  
                  <div className="flex gap-2">
                    {isDeckLocked ? (
                      <button 
                        onClick={() => handleOpenPremium(deck)}
                        className="px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-extrabold text-[10px] rounded-lg flex items-center gap-1 uppercase tracking-wider scale-hover shadow-lg shadow-amber-500/10"
                      >
                        <Icons.Crown size={12} className="fill-white/10" />
                        PRO
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            onToggleActiveDeck(deck.id);
                            playSound(isActive ? "error" : "success", stats.audioStyle || "synth");
                          }}
                          className={`px-3 py-2 text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition-all border ${
                            isActive
                              ? "bg-rose-500/15 text-rose-400 border-rose-500/20 hover:bg-rose-500/25"
                              : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {isActive ? "Usuń" : "Dodaj"}
                        </button>
                        
                        {isActive && (
                          <button 
                            onClick={() => {
                              onSelectDeck(deck);
                              onNavigate("learn");
                            }}
                            className="px-3.5 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-extrabold text-[10px] rounded-lg uppercase tracking-wider flex items-center gap-1 scale-hover shadow-lg shadow-indigo-500/10"
                          >
                            Ucz się
                            <Icons.ArrowRight size={12} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Premium Teaser Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-lg p-8 border-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.15)] flex flex-col items-center gap-6 text-center animate-scale-up relative">
            
            <button 
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <Icons.X size={20} />
            </button>

            <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 border-2 border-amber-400/30 animate-pulse">
              <Icons.Crown size={32} className="fill-white/10" />
            </div>

            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">✦ Plan PRO</span>
              <h3 className="text-2xl font-black text-white mt-3 tracking-tight">Odblokuj zaawansowane lekcje</h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Talia <strong className="text-white">"{premiumTriggerDeck?.title}"</strong> zawiera zaawansowane słownictwo na poziomie <strong className="text-indigo-400">{premiumTriggerDeck?.level}</strong> i wymaga konta premium.
              </p>
            </div>

            {/* Benefits list */}
            <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-4.5 text-left flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Icons.CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Poziomy B1-C2:</strong> Opanuj średnio- i zaawansowany język angielski.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Icons.CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Talie specjalistyczne:</strong> Business English, IT/Technologia, Idiomy.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Icons.CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Nielimitowane efekty i motywy:</strong> Odblokuj wszystkie szaty graficzne premium.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <Icons.CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Synchronizacja Firestore:</strong> Twoje słówka i statystyki bezpieczne w chmurze.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button 
                onClick={() => {
                  onUpdateStats({ isPro: true });
                  setShowPremiumModal(false);
                  playSound("achievement", stats.audioStyle || "synth");
                }}
                className="flex-1 btn bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/10 scale-hover uppercase tracking-wider"
              >
                Kup PRO (Symulacja) 💳
              </button>
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 btn btn-secondary text-xs py-3.5 rounded-xl"
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

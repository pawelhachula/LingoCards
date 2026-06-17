import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Icons from "lucide-react";

// CEFR level resolver (mirrors Flashcards.jsx)
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

const CEFR_COLORS = {
  A1: "bg-green-500/15 text-green-400 border-green-500/20",
  A2: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  B1: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  B2: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  C1: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  C2: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

export default function SearchModal({ decks, stats, setStats, onNavigate, onSelectDeck, onClose }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | learned | starred | unlearned
  const [cefrFilter, setCefrFilter] = useState("all"); // all | A1 | A2 | B1 | B2 | C1 | C2
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isPro = !!stats.isPro;

  // Build flat list of all unique cards with deck info
  const allCards = (() => {
    const realDecks = decks.filter(d => {
      if (d.id === "srs" || d.id === "starred") return false;
      if (!isPro && d.isPremium) return false;
      return true;
    });
    const seen = new Set();
    const result = [];
    realDecks.forEach(deck => {
      (deck.cards || []).forEach(card => {
        if (!seen.has(card.id)) {
          seen.add(card.id);
          result.push({ ...card, deckId: deck.id, deckTitle: deck.title, deckColor: deck.color });
        }
      });
    });
    return result;
  })();

  // Filter logic
  const results = allCards.filter(card => {
    const q = query.toLowerCase().trim();
    const matchesQuery = !q ||
      card.english?.toLowerCase().includes(q) ||
      card.polish?.toLowerCase().includes(q) ||
      card.pronunciation?.toLowerCase().includes(q) ||
      card.partOfSpeech?.toLowerCase().includes(q) ||
      card.exampleEnglish?.toLowerCase().includes(q);

    const isLearned = !!stats.learnedCards?.[card.id];
    const isStarred = !!stats.starredCards?.[card.id];
    const matchesStatus =
      filter === "all" ? true :
      filter === "learned" ? isLearned :
      filter === "unlearned" ? !isLearned :
      filter === "starred" ? isStarred : true;

    const level = getCardLevel(card);
    const matchesCefr = cefrFilter === "all" || level === cefrFilter;

    return matchesQuery && matchesStatus && matchesCefr;
  }).slice(0, 50);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, filter, cefrFilter]);

  // Keyboard nav within results
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    }
  }, [results.length]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIndex];
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  const playTTS = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.split('=')[0].split('-')[0].replace(/^\d+\.\s*/, '').trim();
      const u = new SpeechSynthesisUtterance(cleanText);
      u.lang = "en-US";
      const speed = localStorage.getItem("lingocards_speech_speed") || "1.0";
      u.rate = parseFloat(speed);
      window.speechSynthesis.speak(u);
    }
  };

  const toggleStar = (cardId) => {
    setStats(prev => {
      const updated = { ...(prev.starredCards || {}) };
      if (updated[cardId]) delete updated[cardId];
      else updated[cardId] = true;
      return { ...prev, starredCards: updated };
    });
  };

  const goToDeck = (card) => {
    const deck = decks.find(d => d.id === card.deckId);
    if (deck) {
      onSelectDeck(deck);
      onNavigate("learn");
      onClose();
    }
  };

  const highlightMatch = (text, q) => {
    if (!q || !text) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-indigo-500/30 text-indigo-200 rounded px-0.5 not-italic">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const q = query.toLowerCase().trim();

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4"
      onClick={onClose}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-scale-up"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: "80vh" }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
          <Icons.Search size={18} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Szukaj słówka, tłumaczenia, przykładu..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-semibold outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-500 hover:text-white transition-colors">
              <Icons.X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline text-[10px] text-slate-500 border border-white/10 rounded-lg px-2 py-1 font-mono">ESC</kbd>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-5 py-2.5 border-b border-white/5">
          {/* Status filters */}
          <div className="flex flex-wrap items-center gap-1">
            {[
              { key: "all", label: "Wszystkie", icon: Icons.List },
              { key: "learned", label: "Opanowane", icon: Icons.CheckCircle2 },
              { key: "unlearned", label: "Do nauki", icon: Icons.Circle },
              { key: "starred", label: "Ulubione", icon: Icons.Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  filter === key
                    ? "bg-[var(--primary-glow)] text-[var(--primary)] border border-[var(--border-active)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-white/10"
                }`}
              >
                <Icon size={11} />
                {label}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-[1px] h-4 bg-white/10 shrink-0" />

          {/* CEFR filters */}
          <div className="flex flex-wrap items-center gap-1">
            {["all", "A1", "A2", "B1", "B2", "C1", "C2"].map(lvl => (
              <button
                key={lvl}
                onClick={() => setCefrFilter(lvl)}
                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all border ${
                  cefrFilter === lvl
                    ? "bg-[var(--primary-glow)] text-[var(--primary)] border-[var(--border-active)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-transparent hover:border-white/10"
                }`}
              >
                {lvl === "all" ? "Wszystkie" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto py-2"
        >
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <Icons.SearchX size={36} className="text-slate-600" />
              <p className="text-sm text-slate-500 font-bold">
                {query ? `Brak wyników dla "${query}"` : "Zacznij pisać, aby wyszukać słówko"}
              </p>
              {query && (
                <p className="text-[11px] text-slate-600">Sprawdź pisownię lub zmień filtry</p>
              )}
            </div>
          ) : (
            <>
              {/* Result count */}
              <div className="px-5 pb-1.5 pt-0.5">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                  {results.length === 50 ? "50+ wyników" : `${results.length} ${results.length === 1 ? "wynik" : "wyników"}`}
                </span>
              </div>

              {results.map((card, idx) => {
                const isLearned = !!stats.learnedCards?.[card.id];
                const isStarred = !!stats.starredCards?.[card.id];
                const level = getCardLevel(card);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 mx-2 px-4 py-3 rounded-xl cursor-pointer transition-all group ${
                      isActive
                        ? "bg-indigo-500/10 border border-indigo-500/15"
                        : "hover:bg-white/3 border border-transparent"
                    }`}
                  >
                    {/* Left: card info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* English word */}
                        <span className="text-sm font-extrabold text-white truncate">
                          {highlightMatch(card.english, q)}
                        </span>

                        {/* CEFR badge */}
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider font-mono shrink-0 ${CEFR_COLORS[level] || CEFR_COLORS.B1}`}>
                          {level}
                        </span>

                        {/* Learned indicator */}
                        {isLearned && (
                          <span className="text-[9px] font-black text-emerald-400 flex items-center gap-0.5 shrink-0">
                            <Icons.CheckCircle2 size={10} className="fill-emerald-500/10" />
                            Opanowane
                          </span>
                        )}
                      </div>

                      {/* Polish translation */}
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {highlightMatch(card.polish, q)}
                        {card.partOfSpeech && (
                          <span className="text-[10px] text-slate-600 ml-2 italic">({card.partOfSpeech})</span>
                        )}
                      </p>

                      {/* Example sentence if matches */}
                      {q && card.exampleEnglish?.toLowerCase().includes(q) && (
                        <p className="text-[10px] text-slate-500 mt-0.5 italic truncate">
                          „{highlightMatch(card.exampleEnglish, q)}"
                        </p>
                      )}

                      {/* Deck tag */}
                      <div className="flex items-center gap-1 mt-1">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: card.deckColor || "#6366f1" }}
                        />
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider truncate">
                          {card.deckTitle}
                        </span>
                        {card.pronunciation && (
                          <span className="text-[9px] text-slate-600 italic ml-1">{card.pronunciation}</span>
                        )}
                      </div>
                    </div>

                    {/* Right: action buttons (visible on hover / active) */}
                    <div className={`flex items-center gap-1 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      {/* TTS */}
                      <button
                        onClick={(e) => { e.stopPropagation(); playTTS(card.english); }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/15 border border-white/5 hover:border-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-all"
                        title="Odsłuchaj wymowę"
                      >
                        <Icons.Volume2 size={12} />
                      </button>

                      {/* Star */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStar(card.id); }}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isStarred
                            ? "bg-amber-500/15 border-amber-500/20 text-amber-400"
                            : "bg-white/5 border-white/5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/15"
                        }`}
                        title={isStarred ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                      >
                        <Icons.Star size={12} className={isStarred ? "fill-amber-400/30" : ""} />
                      </button>

                      {/* Go to deck */}
                      <button
                        onClick={(e) => { e.stopPropagation(); goToDeck(card); }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-all"
                        title="Ucz się tej talii"
                      >
                        <Icons.ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border-light)] bg-[var(--bg-input)]">
          <div className="flex items-center gap-3 text-[10px] text-[var(--text-secondary)] font-bold">
            <span className="flex items-center gap-1">
              <kbd className="border border-white/10 rounded px-1.5 py-0.5 font-mono text-slate-500">↑↓</kbd>
              nawigacja
            </span>
            <span className="flex items-center gap-1">
              <kbd className="border border-white/10 rounded px-1.5 py-0.5 font-mono text-slate-500">ESC</kbd>
              zamknij
            </span>
          </div>
          <span className="text-[10px] text-slate-600 font-bold">
            {allCards.length} słówek w kolekcji
          </span>
        </div>
      </div>
    </div>
  );
}

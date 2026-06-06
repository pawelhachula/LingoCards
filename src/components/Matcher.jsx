import React, { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import { playSound, triggerConfetti } from "../utils/effects";

export default function Matcher({ selectedDeck, stats, setStats, onNavigate, onAddXp }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [failedIds, setFailedIds] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const timerRef = useRef(null);

  // Setup game board
  useEffect(() => {
    if (selectedDeck && selectedDeck.cards) {
      const deckCards = [...selectedDeck.cards];
      const selectedCards = deckCards
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(6, deckCards.length));
      
      const englishItems = selectedCards.map(c => ({
        id: `en-${c.id}`,
        cardId: c.id,
        text: c.english,
        lang: 'en'
      }));

      const polishItems = selectedCards.map(c => ({
        id: `pl-${c.id}`,
        cardId: c.id,
        text: c.polish,
        lang: 'pl'
      }));

      const combined = [...englishItems, ...polishItems].sort(() => Math.random() - 0.5);
      
      setItems(combined);
      setSelectedItem(null);
      setMatchedIds(new Set());
      setFailedIds([]);
      setGameFinished(false);
      setTime(0);
      setIsRunning(true);
    }

    return () => clearInterval(timerRef.current);
  }, [selectedDeck]);

  // Handle Timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  if (!selectedDeck) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center gap-6 max-w-md mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center border border-cyan-500/20">
          <Icons.Trophy size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Nie wybrano talii</h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">Wybierz jedną z talii na pulpicie, aby rozpocząć grę w dopasowywanie par.</p>
        </div>
        <button onClick={() => onNavigate("dashboard")} className="btn btn-primary w-full">
          Przejdź do Pulpitu
        </button>
      </div>
    );
  }

  const handleCardClick = (item) => {
    if (matchedIds.has(item.id) || failedIds.length > 0) return;
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
      return;
    }

    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      const isMatch = selectedItem.cardId === item.cardId && selectedItem.lang !== item.lang;

      if (isMatch) {
        const newMatched = new Set(matchedIds);
        newMatched.add(selectedItem.id);
        newMatched.add(item.id);
        setMatchedIds(newMatched);
        setSelectedItem(null);

        if (newMatched.size === items.length) {
          setIsRunning(false);
          setGameFinished(true);
          
          setStats(prev => ({
            ...prev,
            matchesWon: (prev.matchesWon || 0) + 1
          }));
          onAddXp(50);
          
          setTimeout(() => {
            playSound("achievement", stats.audioStyle || "synth");
            triggerConfetti(stats.confettiStyle || "standard");
          }, 100);
        }
      } else {
        setFailedIds([selectedItem.id, item.id]);
        setSelectedItem(null);
        
        setTimeout(() => {
          setFailedIds([]);
        }, 600);
      }
    }
  };

  const handleRestart = () => {
    const deckCards = [...selectedDeck.cards];
    const selectedCards = deckCards
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(6, deckCards.length));
    
    const englishItems = selectedCards.map(c => ({
      id: `en-${c.id}`,
      cardId: c.id,
      text: c.english,
      lang: 'en'
    }));

    const polishItems = selectedCards.map(c => ({
      id: `pl-${c.id}`,
      cardId: c.id,
      text: c.polish,
      lang: 'pl'
    }));

    const combined = [...englishItems, ...polishItems].sort(() => Math.random() - 0.5);
    
    setItems(combined);
    setSelectedItem(null);
    setMatchedIds(new Set());
    setFailedIds([]);
    setGameFinished(false);
    setTime(0);
    setIsRunning(true);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (gameFinished) {
    return (
      <div className="glass-card p-8 text-center flex flex-col items-center gap-6 w-full max-w-[460px] mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center border border-cyan-500/20">
          <Icons.Trophy size={32} className="text-cyan-400 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-white">Sukces!</h3>
          <p className="text-slate-400 text-sm mt-1">Połączono wszystkie pary z talii: <br /><span className="text-indigo-400 font-extrabold">{selectedDeck.title}</span></p>
        </div>

        <div className="bg-black/30 p-4 rounded-2xl border border-white/5 w-full flex items-center justify-between">
          <div className="text-left pl-2">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Uzyskany czas</span>
            <span className="text-2xl font-black text-cyan-400 font-mono block mt-1">{formatTime(time)}</span>
          </div>
          <div className="text-right pr-2">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Cel gry</span>
            <span className="text-lg font-bold text-emerald-400 mt-1 block">Zaliczono</span>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button onClick={() => onNavigate("dashboard")} className="flex-1 btn btn-secondary text-sm">
            Do Pulpitu
          </button>
          <button onClick={handleRestart} className="flex-1 btn btn-primary bg-cyan-600 hover:bg-cyan-500 text-sm">
            Zagraj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={() => onNavigate("dashboard")}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <Icons.ChevronLeft size={16} /> Przerwij grę
          </button>
          <h2 className="text-xl font-black mt-2 text-white">Gra w dopasowywanie</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 px-3.5 py-2 rounded-xl font-mono text-sm font-bold border border-cyan-500/20 shadow-sm">
            <Icons.Clock size={16} />
            <span>{formatTime(time)}</span>
          </div>
          <button 
            onClick={handleRestart} 
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all scale-hover border border-white/5"
            title="Przetasuj i restartuj"
          >
            <Icons.RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((item) => {
          const isMatched = matchedIds.has(item.id);
          const isSelected = selectedItem && selectedItem.id === item.id;
          const isFailed = failedIds.includes(item.id);

          let stateStyle = "border-white/8 text-slate-200 bg-white/3 hover:bg-white/6 hover:border-white/15";
          if (isMatched) {
            stateStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 pointer-events-none opacity-20 shadow-none";
          } else if (isSelected) {
            stateStyle = "bg-indigo-500/15 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]";
          } else if (isFailed) {
            stateStyle = "bg-rose-500/15 border-rose-500/50 text-rose-300 animate-shake";
          }

          return (
            <button
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`match-card min-h-[90px] ${stateStyle}`}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

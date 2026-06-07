import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Icons from "lucide-react";
import { playSound, triggerConfetti, triggerFireworks } from "../utils/effects";

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

export default function Flashcards({ selectedDeck, stats, setStats, onNavigate, onAddXp }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState({ known: 0, unknown: 0 });
  const [completed, setCompleted] = useState(false);
  const [speakingType, setSpeakingType] = useState(null); // 'word' | 'example' | null
  
  // Gamification & Momentum states
  const [momentumStreak, setMomentumStreak] = useState(0);
  const [momentumToast, setMomentumToast] = useState("");
  const [firstTryStats, setFirstTryStats] = useState({});
  const [awardedMedal, setAwardedMedal] = useState(null);
  
  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState(null); // 'correct' | 'incorrect' | null
  const [heardText, setHeardText] = useState("");

  // Session Timer
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionElapsed, setSessionElapsed] = useState(0);

  // Reversed mode (PL → EN)
  const [reversedMode, setReversedMode] = useState(false);

  // Missed cards tracking
  const [missedCards, setMissedCards] = useState([]);
  const [bestStreak, setBestStreak] = useState(0);

  // Ambient sound
  const [ambientSound, setAmbientSound] = useState(null);
  const [showAmbientMenu, setShowAmbientMenu] = useState(false);
  const ambientCtxRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const [canRate, setCanRate] = useState(false);

  // SRS States
  const [srsOnly, setSrsOnly] = useState(selectedDeck?.id === "srs");

  useEffect(() => {
    setSrsOnly(selectedDeck?.id === "srs");
  }, [selectedDeck]);

  useEffect(() => {
    if (selectedDeck && selectedDeck.cards) {
      let filteredCards = [...selectedDeck.cards];
      if (srsOnly) {
        const todayStr = new Date().toISOString().split("T")[0];
        filteredCards = filteredCards.filter(c => {
          const srs = stats.srsData?.[c.id];
          if (!srs) return true;
          return srs.nextReviewDate <= todayStr;
        });
      }
      setCards(filteredCards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionResults({ known: 0, unknown: 0 });
      setCompleted(false);
      setSpeakingType(null);
      resetSpeechState();
      setSessionStartTime(Date.now());
      setSessionElapsed(0);
      setMissedCards([]);
      setBestStreak(0);
    }
  }, [selectedDeck, srsOnly]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Session timer interval
  useEffect(() => {
    if (!sessionStartTime || completed) return;
    const timer = setInterval(() => {
      setSessionElapsed(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime, completed]);

  // Cleanup ambient sound on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  // Cooldown on card rating after flip
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setCanRate(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setCanRate(false);
    }
  }, [isFlipped]);

  if (!selectedDeck) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center gap-6 max-w-md mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
          <Icons.BookOpen size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Nie wybrano talii</h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">Wybierz jedną z przygotowanych talii na pulpicie, aby rozpocząć naukę fiszek.</p>
        </div>
        <button onClick={() => onNavigate("dashboard")} className="btn btn-primary w-full">
          Przejdź do Pulpitu
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const resetSpeechState = () => {
    setIsListening(false);
    setPronunciationScore(null);
    setHeardText("");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const stopAmbientSound = useCallback(() => {
    try {
      ambientNodesRef.current.forEach(node => {
        try { node.disconnect(); } catch(e) {}
      });
      ambientNodesRef.current = [];
      if (ambientCtxRef.current) {
        ambientCtxRef.current.close().catch(() => {});
        ambientCtxRef.current = null;
      }
    } catch(e) {}
  }, []);

  const startAmbientSound = useCallback((type) => {
    stopAmbientSound();
    if (!type) {
      setAmbientSound(null);
      return;
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ambientCtxRef.current = ctx;
      const nodes = [];
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.15;
      gainNode.connect(ctx.destination);
      nodes.push(gainNode);

      if (type === 'rain') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 1200;
        noise.connect(lp);
        lp.connect(gainNode);
        noise.start();
        nodes.push(noise, lp);
      } else if (type === 'forest') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
          last = (last + (Math.random() * 2 - 1) * 0.06) * 0.994;
          data[i] = last;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 400;
        bp.Q.value = 0.5;
        noise.connect(bp);
        bp.connect(gainNode);
        noise.start();
        nodes.push(noise, bp);
        // Bird-like chirps
        const chirpOsc = ctx.createOscillator();
        chirpOsc.type = 'sine';
        chirpOsc.frequency.value = 2200;
        const chirpGain = ctx.createGain();
        chirpGain.gain.value = 0;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 3;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.015;
        lfo.connect(lfoGain);
        lfoGain.connect(chirpGain.gain);
        chirpOsc.connect(chirpGain);
        chirpGain.connect(gainNode);
        chirpOsc.start();
        lfo.start();
        nodes.push(chirpOsc, chirpGain, lfo, lfoGain);
      } else if (type === 'lofi') {
        // C major chord: C4, E4, G4
        [261.63, 329.63, 392.00].forEach(freq => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const oscGain = ctx.createGain();
          oscGain.gain.value = 0.4;
          // Tremolo
          const trem = ctx.createOscillator();
          trem.frequency.value = 0.3 + Math.random() * 0.2;
          const tremGain = ctx.createGain();
          tremGain.gain.value = 0.08;
          trem.connect(tremGain);
          tremGain.connect(oscGain.gain);
          osc.connect(oscGain);
          oscGain.connect(gainNode);
          osc.start();
          trem.start();
          nodes.push(osc, oscGain, trem, tremGain);
        });
      } else if (type === 'cafe') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
          last = (last + (Math.random() * 2 - 1) * 0.04) * 0.998;
          data[i] = last;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 800;
        bp.Q.value = 0.8;
        noise.connect(bp);
        bp.connect(gainNode);
        noise.start();
        nodes.push(noise, bp);
      }

      ambientNodesRef.current = nodes;
      setAmbientSound(type);
    } catch(e) {
      console.error('Ambient sound error:', e);
    }
  }, [stopAmbientSound]);

  const playTTS = (text, type, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      utterance.onstart = () => setSpeakingType(type);
      utterance.onend = () => setSpeakingType(null);
      utterance.onerror = () => setSpeakingType(null);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleStar = (e) => {
    e.stopPropagation();
    const cardId = currentCard.id;
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

  const startListening = (e) => {
    e.stopPropagation();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Rozpoznawanie mowy nie jest obsługiwane w Twojej przeglądarce (najlepiej spróbować w Google Chrome).");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setPronunciationScore(null);
      setHeardText("");
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setHeardText(speechToText);

      // Clean string parser to evaluate correctness
      const target = currentCard.english.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
      const spoken = speechToText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();

      if (spoken === target || target.includes(spoken) || spoken.includes(target)) {
        setPronunciationScore("correct");
        // Play success chime or positive TTS
      } else {
        setPronunciationScore("incorrect");
      }
    };

    recognition.onerror = (err) => {
      console.error(err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSrsRate = (rating) => {
    const cardId = currentCard.id;
    const todayStr = new Date().toISOString().split("T")[0];
    const addDays = (dateStr, days) => {
      const date = new Date(dateStr);
      date.setDate(date.getDate() + days);
      return date.toISOString().split("T")[0];
    };

    setStats(prev => {
      const srs = prev.srsData?.[cardId] || { interval: 0, repetitions: 0, ease: 2.5, nextReviewDate: "" };
      let interval = 0;
      let repetitions = 0;
      let ease = srs.ease || 2.5;

      if (rating === "again") {
        repetitions = 0;
        interval = 0;
        ease = Math.max(1.3, ease - 0.2);
      } else if (rating === "hard") {
        repetitions = srs.repetitions + 1;
        interval = repetitions === 1 ? 1 : repetitions === 2 ? 2 : Math.ceil(srs.interval * 1.2);
        ease = Math.max(1.3, ease - 0.15);
      } else if (rating === "good") {
        repetitions = srs.repetitions + 1;
        interval = repetitions === 1 ? 1 : repetitions === 2 ? 4 : Math.ceil(srs.interval * ease);
        ease = ease;
      } else if (rating === "easy") {
        repetitions = srs.repetitions + 1;
        interval = repetitions === 1 ? 3 : repetitions === 2 ? 6 : Math.ceil(srs.interval * ease * 1.3);
        ease = ease + 0.15;
      }

      const nextReviewDate = addDays(todayStr, interval);
      const updatedSrsData = {
        ...(prev.srsData || {}),
        [cardId]: { interval, repetitions, ease, nextReviewDate }
      };

      const updatedLearnedCards = { ...(prev.learnedCards || {}) };
      if (rating !== "again") {
        updatedLearnedCards[cardId] = true;
      }

      const isAlreadyLearned = prev.learnedCards?.[cardId];
      const newDailyCount = (prev.dailyCount || 0) + (rating !== "again" && !isAlreadyLearned ? 1 : 0);

      const updatedCardMistakes = { ...(prev.cardMistakes || {}) };
      if (rating === "again" || rating === "hard") {
        updatedCardMistakes[cardId] = (updatedCardMistakes[cardId] || 0) + 1;
      }

      const newReviewsCount = (prev.reviewsCount || 0) + 1;

      const updatedDailyHistory = { ...(prev.dailyHistory || {}) };
      if (!updatedDailyHistory[todayStr]) {
        updatedDailyHistory[todayStr] = { learned: 0, reviews: 0 };
      }
      updatedDailyHistory[todayStr].reviews = (updatedDailyHistory[todayStr].reviews || 0) + 1;
      if (rating !== "again" && !isAlreadyLearned) {
        updatedDailyHistory[todayStr].learned = (updatedDailyHistory[todayStr].learned || 0) + 1;
      }

      return {
        srsData: updatedSrsData,
        learnedCards: updatedLearnedCards,
        dailyCount: newDailyCount,
        reviewsCount: newReviewsCount,
        cardMistakes: updatedCardMistakes,
        dailyHistory: updatedDailyHistory
      };
    });

    // Track first try statistics in this session
    const wasAlreadyRated = firstTryStats.hasOwnProperty(cardId);
    const updatedFirstTryStats = wasAlreadyRated 
      ? firstTryStats 
      : { ...firstTryStats, [cardId]: rating === "again" ? "unknown" : "known" };
    setFirstTryStats(updatedFirstTryStats);

    // Track missed cards
    if (rating === "again") {
      setMissedCards(prev => {
        if (prev.find(c => c.id === currentCard.id)) return prev;
        return [...prev, currentCard];
      });
    }

    // Track momentum streak
    let nextStreak = momentumStreak;
    if (rating !== "again") {
      nextStreak += 1;
      setMomentumStreak(nextStreak);
      setBestStreak(prev => Math.max(prev, nextStreak));
      if (nextStreak === 3 || nextStreak === 5 || nextStreak === 10) {
        setMomentumToast(`SERIA: ${nextStreak} POPRAWNYCH! 🔥`);
        playSound("success", stats.audioStyle || "synth");
        setTimeout(() => setMomentumToast(""), 1500);
      }
    } else {
      setMomentumStreak(0);
    }

    // Award +10 XP for rating a card
    onAddXp(10);

    // Record session results
    setSessionResults(prev => ({
      known: prev.known + (rating !== "again" ? 1 : 0),
      unknown: prev.unknown + (rating === "again" ? 1 : 0)
    }));

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingType(null);
    }
    resetSpeechState();

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Ukończenie talii!
        setCompleted(true);
        stopAmbientSound();
        setAmbientSound(null);
        
        // Calculate completion medal
        const total = cards.length;
        const firstTryCorrect = Object.values(updatedFirstTryStats).filter(v => v === "known").length;
        const pct = total > 0 ? (firstTryCorrect / total) * 100 : 0;
        
        let medal = null;
        if (pct === 100) {
          medal = "gold";
        } else if (pct >= 80) {
          medal = "silver";
        } else if (pct >= 50) {
          medal = "bronze";
        }
        
        if (medal) {
          setAwardedMedal(medal);
          
          const medalWeights = { gold: 3, silver: 2, bronze: 1, null: 0 };
          
          setStats(prev => {
            const currentMedals = prev.deckMedals || {};
            const oldMedal = currentMedals[selectedDeck.id];
            if (!oldMedal || medalWeights[medal] > medalWeights[oldMedal]) {
              const newMedals = {
                ...currentMedals,
                [selectedDeck.id]: medal
              };
              return {
                deckMedals: newMedals
              };
            }
            return {};
          });
        }
        
        // Award deck completion bonus: +100 XP
        onAddXp(100);
        
        setTimeout(() => {
          playSound("achievement", stats.audioStyle || "synth");
          if (pct === 100) {
            triggerFireworks();
          }
          triggerConfetti(stats.confettiStyle || "standard");
        }, 150);
      }
    }, 200);
  };

  const handleNext = (known) => {
    handleSrsRate(known ? "good" : "again");
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    resetSpeechState();
    setMomentumStreak(0);
    setMomentumToast("");
    setFirstTryStats({});
    setAwardedMedal(null);
  };

  const handleRestart = () => {
    if (selectedDeck && selectedDeck.cards) {
      let filteredCards = [...selectedDeck.cards];
      if (srsOnly) {
        const todayStr = new Date().toISOString().split("T")[0];
        filteredCards = filteredCards.filter(c => {
          const srs = stats.srsData?.[c.id];
          if (!srs) return true;
          return srs.nextReviewDate <= todayStr;
        });
      }
      setCards(filteredCards);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
    setSessionResults({ known: 0, unknown: 0 });
    setSpeakingType(null);
    resetSpeechState();
    setMomentumStreak(0);
    setMomentumToast("");
    setFirstTryStats({});
    setAwardedMedal(null);
    setSessionStartTime(Date.now());
    setSessionElapsed(0);
    setReversedMode(false);
    setMissedCards([]);
    setBestStreak(0);
  };

  if (cards.length === 0) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center gap-6 max-w-md mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20">
          <Icons.CheckCircle size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {srsOnly ? "Talia w pełni opanowana! 🎉" : "Ta talia jest pusta"}
          </h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            {srsOnly 
              ? "Brak oczekujących powtórek SRS w tej talii na dziś. Twoja pamięć działa świetnie!"
              : "Dodaj słówka w menedżerze lub zaznacz je gwiazdką, aby zapełnić tę talię."}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {srsOnly && selectedDeck.id !== "srs" && (
            <button onClick={() => setSrsOnly(false)} className="btn btn-primary w-full text-sm">
              Ucz się wszystkich słówek ({selectedDeck.cards?.length || 0})
            </button>
          )}
          <button onClick={() => onNavigate("dashboard")} className="btn btn-secondary w-full text-sm">
            Przejdź do Pulpitu
          </button>
        </div>
      </div>
    );
  }

  const isStarred = stats.starredCards?.[currentCard.id];

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto w-full animate-slide-in">
      {/* Momentum Streak Toast */}
      {momentumToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black text-xs px-5 py-3 rounded-2xl border border-cyan-400/30 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 animate-bounce">
          <Icons.Flame size={16} className="text-white fill-white/10" />
          <span>{momentumToast}</span>
        </div>
      )}
      {/* Header controls */}
      <div className="w-full flex items-center justify-between">
        <div>
          <button 
            onClick={() => onNavigate("dashboard")}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <Icons.ChevronLeft size={16} /> Powrót do pulpitu
          </button>
          <h2 className="text-2xl font-black mt-2 text-white tracking-tight">
            Talia: <span className="text-indigo-400 font-extrabold">{selectedDeck.title}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Session Timer */}
          <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Icons.Clock size={13} />
            <span>{formatTime(sessionElapsed)}</span>
          </div>
          {/* Reversed mode toggle */}
          <button
            onClick={() => setReversedMode(prev => !prev)}
            className={`p-3 rounded-2xl transition-all scale-hover ${
              reversedMode
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
            }`}
            title={reversedMode ? "Tryb PL → EN (aktywny)" : "Przełącz na tryb PL → EN"}
          >
            <Icons.ArrowLeftRight size={18} />
          </button>
          {/* Ambient sound button */}
          <div className="relative">
            <button
              onClick={() => setShowAmbientMenu(prev => !prev)}
              className={`p-3 rounded-2xl transition-all scale-hover ${
                ambientSound
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
              }`}
              title="Dźwięki otoczenia"
            >
              <Icons.Headphones size={18} />
            </button>
            {showAmbientMenu && (
              <div className="absolute right-0 top-full mt-2 z-50 glass-card p-2 rounded-xl min-w-[170px] border border-white/10 shadow-xl">
                {[
                  { id: 'rain', label: '🌧️ Deszcz' },
                  { id: 'forest', label: '🌲 Las' },
                  { id: 'lofi', label: '🎵 Lofi' },
                  { id: 'cafe', label: '☕ Kawiarnia' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (ambientSound === item.id) {
                        stopAmbientSound();
                        setAmbientSound(null);
                      } else {
                        startAmbientSound(item.id);
                      }
                      setShowAmbientMenu(false);
                    }}
                    className={`w-full text-left text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                      ambientSound === item.id
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                {ambientSound && (
                  <button
                    onClick={() => {
                      stopAmbientSound();
                      setAmbientSound(null);
                      setShowAmbientMenu(false);
                    }}
                    className="w-full text-left text-xs font-bold px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all mt-1 border-t border-white/5 pt-2"
                  >
                    ✕ Wyłącz dźwięk
                  </button>
                )}
              </div>
            )}
          </div>
          <button 
            onClick={handleShuffle}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 hover:text-white transition-all scale-hover"
            title="Przetasuj fiszki"
            disabled={completed}
          >
            <Icons.Shuffle size={18} />
          </button>
          <button 
            onClick={handleRestart}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-300 hover:text-white transition-all scale-hover"
            title="Zacznij od nowa"
          >
            <Icons.RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* SRS Toggle bar */}
      {selectedDeck.id !== "starred" && selectedDeck.id !== "srs" && (
        <div className="w-full bg-black/20 p-1.5 rounded-2xl border border-white/5 flex gap-1">
          <button
            onClick={() => setSrsOnly(false)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              !srsOnly 
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm font-extrabold" 
                : "text-slate-400 hover:text-white border-transparent"
            }`}
          >
            <Icons.Layers size={14} /> Nauka całej talii
          </button>
          <button
            onClick={() => setSrsOnly(true)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
              srsOnly 
                ? "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-sm font-extrabold" 
                : "text-slate-400 hover:text-white border-transparent"
            }`}
          >
            <Icons.BrainCircuit size={14} /> Powtórki SRS
          </button>
        </div>
      )}

      {/* Near-Win Alert Banner */}
      {!completed && cards.length > 3 && cards.length - currentIndex === 3 && (
        <div className="w-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-yellow-500/20 px-4.5 py-3 rounded-2xl flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2 text-yellow-400">
            <Icons.Zap size={16} className="fill-yellow-400/15" />
            <span className="text-xs font-black">Tylko 3 fiszki do końca! Dasz radę! 🎯</span>
          </div>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">+100 XP Bonus czeka!</span>
        </div>
      )}

      {!completed ? (
        <>
          {/* Card progress tracker */}
          <div className="w-full">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
              <span>FISZKA {currentIndex + 1} Z {cards.length}</span>
              <span className="text-indigo-400">Postęp sesji: {Math.round((currentIndex / cards.length) * 100)}%</span>
            </div>
            <div className="bg-white/5 h-2 rounded-full overflow-hidden w-full border border-white/5">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / cards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 3D Flashcard */}
          <div 
            className={`flashcard-container ${isFlipped ? "is-flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-inner">
              {/* Front Side */}
              <div className="flashcard-front">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[10px] font-extrabold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase">
                      {reversedMode ? "Polskie słowo" : (currentCard.partOfSpeech || "word")}
                    </span>

                    {/* CEFR level badge */}
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase font-mono">
                      {getCardLevel(currentCard)}
                    </span>

                    {/* SRS Status Plaque */}
                    {(() => {
                      const srs = stats.srsData?.[currentCard.id];
                      if (!srs) return (
                        <span className="text-[9px] font-bold tracking-wider text-slate-400 bg-slate-500/10 border border-slate-500/20 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <Icons.Sparkles size={10} /> Nowe
                        </span>
                      );
                      if (srs.interval < 7) return (
                        <span className="text-[9px] font-bold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <Icons.Hourglass size={10} /> W nauce ({srs.interval} d)
                        </span>
                      );
                      return (
                        <span className="text-[9px] font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                          <Icons.Brain size={10} className="fill-emerald-400/10" /> Opanowane ({srs.interval} d)
                        </span>
                      );
                    })()}
                    
                    {/* STARRED TRIGGER */}
                    <button 
                      onClick={toggleStar}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-amber-500 transition-colors"
                      title={isStarred ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    >
                      <Icons.Star size={16} className={isStarred ? "fill-amber-500" : "text-slate-500"} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!reversedMode && speakingType === "word" && (
                      <div className="sound-wave">
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                      </div>
                    )}
                    {!reversedMode && (
                      <button 
                        onClick={(e) => playTTS(currentCard.english, "word", e)}
                        className={`p-2.5 rounded-xl transition-all scale-hover ${
                          speakingType === "word" 
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                        title="Odsłuchaj wymowę"
                      >
                        <Icons.Volume2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="my-auto flex flex-col items-center text-center gap-3 w-full">
                  <h3 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                    {reversedMode ? currentCard.polish : currentCard.english}
                  </h3>
                  {!reversedMode && currentCard.pronunciation && (
                    <p className="text-[var(--secondary)] font-semibold font-mono text-sm tracking-wider">
                      {currentCard.pronunciation}
                    </p>
                  )}
                  
                  {/* MIC INPUT CHECKER - only in normal mode */}
                  {!reversedMode && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                      <button
                        onClick={startListening}
                        className={`p-3 rounded-full border transition-all scale-hover btn-flashcard-mic ${
                          isListening 
                            ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse" 
                            : ""
                        }`}
                        title="Przetestuj swoją wymowę"
                      >
                        <Icons.Mic size={20} />
                      </button>
                      
                      {!pronunciationScore && !isListening && (
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Sprawdź swoją wymowę</span>
                      )}
                      {isListening && (
                        <span className="text-xs text-rose-400 font-bold animate-pulse">Słucham... Mów teraz!</span>
                      )}
                      
                      {pronunciationScore === "correct" && (
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                          <Icons.CheckCircle2 size={12} />
                          <span>Świetna wymowa! 🎉</span>
                        </div>
                      )}
                      {pronunciationScore === "incorrect" && (
                        <div className="text-xs text-rose-400 font-bold flex flex-col items-center gap-1 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20">
                          <span className="flex items-center gap-1">
                            <Icons.XCircle size={12} />
                            <span>Nie do końca... Spróbuj ponownie.</span>
                          </span>
                          {heardText && (
                            <span className="text-[10px] text-[var(--text-secondary)]">Usłyszano: "{heardText}"</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-xs text-[var(--text-muted)] font-bold flex items-center justify-center gap-2 opacity-80 mt-auto">
                  <Icons.Sparkles size={14} className="text-[var(--primary)]" />
                  {reversedMode ? "Kliknij w kartę, aby zobaczyć angielskie słówko" : "Kliknij w kartę, aby zobaczyć tłumaczenie"}
                </div>
              </div>

              {/* Back Side */}
              <div className="flashcard-back">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-extrabold tracking-wider text-[var(--secondary)] bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
                      {reversedMode ? "English meaning" : "Polskie znaczenie"}
                    </span>

                    {/* CEFR level badge */}
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase font-mono">
                      {getCardLevel(currentCard)}
                    </span>
                    <button 
                      onClick={toggleStar}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-amber-500 transition-colors"
                      title={isStarred ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    >
                      <Icons.Star size={16} className={isStarred ? "fill-amber-500" : "text-slate-500"} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {speakingType === "example" && (
                      <div className="sound-wave">
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                      </div>
                    )}
                    {reversedMode && (
                      <button 
                        onClick={(e) => playTTS(currentCard.english, "word", e)}
                        className={`p-2.5 rounded-xl transition-all scale-hover ${
                          speakingType === "word" 
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                        title="Odsłuchaj wymowę"
                      >
                        <Icons.Volume2 size={18} />
                      </button>
                    )}
                    {!reversedMode && currentCard.exampleEnglish && (
                      <button 
                        onClick={(e) => playTTS(currentCard.exampleEnglish, "example", e)}
                        className={`p-2.5 rounded-xl transition-all scale-hover ${
                          speakingType === "example" 
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                            : "bg-white/5 text-slate-400 hover:text-white"
                        }`}
                        title="Odsłuchaj zdanie przykładowe"
                      >
                        <Icons.Volume2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="my-auto flex flex-col items-center text-center gap-5 w-full">
                  <h3 className="text-3xl font-black text-[var(--text-primary)] tracking-tight leading-snug">
                    {reversedMode ? currentCard.english : currentCard.polish}
                  </h3>
                  {reversedMode && currentCard.pronunciation && (
                    <p className="text-[var(--secondary)] font-semibold font-mono text-sm tracking-wider">
                      {currentCard.pronunciation}
                    </p>
                  )}
                  
                  {currentCard.exampleEnglish && (
                    <div className="text-center flashcard-example-block p-4 rounded-2xl w-full">
                      <span className="text-[10px] text-[var(--primary)] font-extrabold uppercase tracking-wider block mb-1">
                        Przykład w zdaniu
                      </span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                        {currentCard.exampleEnglish}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed font-medium">
                        {currentCard.examplePolish}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-[var(--text-muted)] font-bold flex items-center justify-center gap-2 opacity-80">
                  {reversedMode ? "Kliknij w kartę, aby zobaczyć polskie słówko" : "Kliknij w kartę, aby zobaczyć słówko"}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full max-w-[550px]">
            {isFlipped ? (
              srsOnly ? (
                /* 4 SRS Buttons */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button 
                    onClick={() => handleSrsRate("again")}
                    disabled={!canRate}
                    className="btn btn-secondary btn-srs-again py-3.5 px-2 text-xs font-bold text-rose-400 border-rose-500/10 hover:bg-rose-500/5 hover:border-rose-500/30 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Powtórz
                  </button>
                  <button 
                    onClick={() => handleSrsRate("hard")}
                    disabled={!canRate}
                    className="btn btn-secondary btn-srs-hard py-3.5 px-2 text-xs font-bold text-amber-500 border-amber-500/10 hover:bg-amber-500/5 hover:border-amber-500/30 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Trudno
                  </button>
                  <button 
                    onClick={() => handleSrsRate("good")}
                    disabled={!canRate}
                    className="btn btn-primary py-3.5 px-2 text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-600 shadow-indigo-500/10 hover:from-indigo-400 hover:to-cyan-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Dobrze
                  </button>
                  <button 
                    onClick={() => handleSrsRate("easy")}
                    disabled={!canRate}
                    className="btn btn-primary py-3.5 px-2 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/10 hover:from-emerald-400 hover:to-teal-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Łatwo
                  </button>
                </div>
              ) : (
                /* 2 Standard Buttons */
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleSrsRate("again")}
                    disabled={!canRate}
                    className="flex-1 btn btn-secondary py-4 flex items-center justify-center gap-2 font-bold text-rose-400 border-rose-500/10 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icons.X size={18} /> Jeszcze nie umiem
                  </button>
                  <button 
                    onClick={() => handleSrsRate("good")}
                    disabled={!canRate}
                    className="flex-1 btn btn-primary py-4 flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icons.Check size={18} /> Znam to słówko
                  </button>
                </div>
              )
            ) : (
              /* Hint to click card to flip */
              <button 
                onClick={() => setIsFlipped(true)}
                className="w-full btn btn-primary py-4 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform animate-pulse"
              >
                <Icons.Eye size={18} /> Pokaż tłumaczenie
              </button>
            )}
          </div>
        </>
      ) : (
        /* Session Completed view */
        <div 
          className={`glass-card p-8 text-center flex flex-col items-center gap-6 w-full max-w-[460px] mx-auto animate-slide-in border-t-4 transition-all duration-500 ${
            awardedMedal === 'gold' 
              ? "border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]" 
              : "border-indigo-500/20 shadow-indigo-500/5"
          }`}
          style={awardedMedal === 'gold' ? { borderTopColor: '#eab308' } : {}}
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Icons.Award size={32} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              {awardedMedal === 'gold' ? "Perfect Deck! ✨" : "Talia ukończona!"}
            </h3>
            <p className="text-slate-400 text-sm mt-1">Świetna robota, przejrzałeś wszystkie fiszki.</p>
          </div>

          {awardedMedal && (
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <span className="text-4xl">
                {awardedMedal === 'gold' ? "🥇" : awardedMedal === 'silver' ? "🥈" : "🥉"}
              </span>
              <span className={`text-xs font-black uppercase tracking-wider ${
                awardedMedal === 'gold' ? "text-yellow-400" : awardedMedal === 'silver' ? "text-slate-300" : "text-amber-500"
              }`}>
                Zdobyto medal: {awardedMedal === 'gold' ? "Złoty" : awardedMedal === 'silver' ? "Srebrny" : "Brązowy"}!
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 w-full bg-black/30 p-4 rounded-2xl border border-white/5">
            <div className="text-center py-1">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Opanowane</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">{sessionResults.known}</span>
            </div>
            <div className="text-center py-1 border-l border-white/5">
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Do powtórki</span>
              <span className="text-2xl font-black text-rose-400 mt-1 block">{sessionResults.unknown}</span>
            </div>
          </div>

          {/* Enhanced stats row */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-center">
              <Icons.Clock size={16} className="mx-auto text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Czas</span>
              <span className="text-sm font-black text-white mt-0.5 block">{formatTime(sessionElapsed)}</span>
            </div>
            <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-center">
              <Icons.Target size={16} className="mx-auto text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Skuteczność</span>
              <span className="text-sm font-black text-white mt-0.5 block">{cards.length > 0 ? Math.round((sessionResults.known / cards.length) * 100) : 0}%</span>
            </div>
            <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-center">
              <Icons.Flame size={16} className="mx-auto text-orange-400 mb-1" />
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Najdłuższa seria</span>
              <span className="text-sm font-black text-white mt-0.5 block">{bestStreak}</span>
            </div>
          </div>

          {/* Missed cards section */}
          {missedCards.length > 0 && (
            <div className="w-full bg-rose-500/5 border border-rose-500/10 rounded-xl p-4">
              <div className="flex items-center gap-1.5 justify-center mb-3">
                <Icons.AlertTriangle size={14} className="text-rose-400" />
                <span className="text-xs font-black text-rose-400 uppercase tracking-wider">Najtrudniejsze słowa</span>
              </div>
              <div className="flex flex-col gap-2">
                {missedCards.slice(0, 3).map((card, i) => (
                  <div key={card.id || i} className="flex items-center justify-between bg-black/20 px-3 py-2 rounded-lg">
                    <span className="text-sm font-bold text-white">{card.english}</span>
                    <span className="text-sm text-slate-400">→ {card.polish}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 w-full">
            <button onClick={() => onNavigate("dashboard")} className="flex-1 btn btn-secondary text-sm">
              Menu główne
            </button>
            <button onClick={handleRestart} className="flex-1 btn btn-primary text-sm">
              Powtórz talię
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

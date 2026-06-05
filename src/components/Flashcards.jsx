import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";

export default function Flashcards({ selectedDeck, stats, setStats, onNavigate }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState({ known: 0, unknown: 0 });
  const [completed, setCompleted] = useState(false);
  const [speakingType, setSpeakingType] = useState(null); // 'word' | 'example' | null
  
  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState(null); // 'correct' | 'incorrect' | null
  const [heardText, setHeardText] = useState("");

  useEffect(() => {
    if (selectedDeck && selectedDeck.cards) {
      setCards([...selectedDeck.cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionResults({ known: 0, unknown: 0 });
      setCompleted(false);
      setSpeakingType(null);
      resetSpeechState();
    }
  }, [selectedDeck]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
    const updatedStarred = { ...(stats.starredCards || {}) };
    if (updatedStarred[cardId]) {
      delete updatedStarred[cardId];
    } else {
      updatedStarred[cardId] = true;
    }
    setStats({
      ...stats,
      starredCards: updatedStarred
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

  const handleNext = (known) => {
    const cardId = currentCard.id;
    const isAlreadyLearned = stats.learnedCards?.[cardId];
    
    const updatedLearnedCards = { ...(stats.learnedCards || {}) };
    if (known) {
      updatedLearnedCards[cardId] = true;
    } else {
      delete updatedLearnedCards[cardId];
    }

    const newDailyCount = (stats.dailyCount || 0) + (known && !isAlreadyLearned ? 1 : 0);

    setStats({
      ...stats,
      learnedCards: updatedLearnedCards,
      dailyCount: newDailyCount
    });

    setSessionResults(prev => ({
      known: prev.known + (known ? 1 : 0),
      unknown: prev.unknown + (known ? 0 : 1)
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
        setCompleted(true);
      }
    }, 200);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    resetSpeechState();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
    setSessionResults({ known: 0, unknown: 0 });
    setSpeakingType(null);
    resetSpeechState();
  };

  if (cards.length === 0) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center gap-6 max-w-md mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20">
          <Icons.Info size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Ta talia jest pusta</h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">Dodaj słówka w kreatorze lub zaznacz je gwiazdką, aby zapełnić tę talię.</p>
        </div>
        <div className="flex gap-3 w-full">
          <button onClick={() => onNavigate("dashboard")} className="flex-1 btn btn-secondary text-sm">
            Pulpit
          </button>
          <button onClick={() => onNavigate("creator")} className="flex-1 btn btn-primary text-sm">
            Kreator
          </button>
        </div>
      </div>
    );
  }

  const isStarred = stats.starredCards?.[currentCard.id];

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full animate-slide-in">
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
        <div className="flex gap-2">
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
              {/* Front Side (English) */}
              <div className="flashcard-front">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-extrabold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full uppercase">
                      {currentCard.partOfSpeech || "word"}
                    </span>
                    
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
                    {speakingType === "word" && (
                      <div className="sound-wave">
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                        <div className="sound-wave-bar" />
                      </div>
                    )}
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
                  </div>
                </div>
                
                <div className="my-auto flex flex-col gap-3">
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {currentCard.english}
                  </h3>
                  {currentCard.pronunciation && (
                    <p className="text-cyan-400 font-semibold font-mono text-sm tracking-wider">
                      {currentCard.pronunciation}
                    </p>
                  )}
                  
                  {/* MIC INPUT CHECKER */}
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <button
                      onClick={startListening}
                      className={`p-3 rounded-full border transition-all scale-hover ${
                        isListening 
                          ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse" 
                          : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                      }`}
                      title="Przetestuj swoją wymowę"
                    >
                      <Icons.Mic size={20} />
                    </button>
                    
                    {!pronunciationScore && !isListening && (
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sprawdź swoją wymowę</span>
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
                          <span className="text-[10px] text-slate-400">Usłyszano: "{heardText}"</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-bold flex items-center justify-center gap-2 opacity-80 mt-auto">
                  <Icons.Sparkles size={14} className="text-indigo-400" />
                  Kliknij w kartę, aby zobaczyć tłumaczenie
                </div>
              </div>

              {/* Back Side (Polish) */}
              <div className="flashcard-back">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-extrabold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
                      Polskie znaczenie
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
                    {currentCard.exampleEnglish && (
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

                <div className="my-auto flex flex-col gap-5">
                  <h3 className="text-3xl font-black text-white tracking-tight leading-snug">
                    {currentCard.polish}
                  </h3>
                  
                  {currentCard.exampleEnglish && (
                    <div className="text-left bg-black/40 p-4 rounded-2xl border border-white/5">
                      <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wider block mb-1">
                        Przykład w zdaniu
                      </span>
                      <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                        {currentCard.exampleEnglish}
                      </p>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                        {currentCard.examplePolish}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-bold flex items-center justify-center gap-2 opacity-80">
                  Kliknij w kartę, aby zobaczyć słówko
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 w-full max-w-[500px]">
            <button 
              onClick={() => handleNext(false)}
              className="flex-1 btn btn-secondary py-4 flex items-center justify-center gap-2 font-bold text-rose-400 border-rose-500/10 hover:bg-rose-500/5 hover:border-rose-500/30 hover:text-rose-300"
            >
              <Icons.X size={18} /> Jeszcze nie umiem
            </button>
            <button 
              onClick={() => handleNext(true)}
              className="flex-1 btn btn-primary py-4 flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500"
            >
              <Icons.Check size={18} /> Znam to słówko
            </button>
          </div>
        </>
      ) : (
        /* Session Completed view */
        <div className="glass-card p-8 text-center flex flex-col items-center gap-6 w-full max-w-[460px] mx-auto animate-slide-in border-indigo-500/20 shadow-indigo-500/5">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Icons.Award size={32} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">Talia ukończona!</h3>
            <p className="text-slate-400 text-sm mt-1">Świetna robota, przejrzałeś wszystkie fiszki.</p>
          </div>

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

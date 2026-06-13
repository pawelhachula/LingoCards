import React, { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";

const cleanWord = (str) => {
  if (!str) return "";
  let cleaned = str.toLowerCase();
  cleaned = cleaned.replace(/\(.*\)/g, ""); // remove anything in parentheses
  cleaned = cleaned.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ""); // remove punctuation
  cleaned = cleaned.replace(/\s+/g, " "); // normalize spaces
  cleaned = cleaned.trim();
  if (cleaned.startsWith("to ")) {
    cleaned = cleaned.substring(3).trim();
  }
  return cleaned;
};

const getCardLevel = (card) => {
  if (!card) return "B1";
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

export default function Quiz({ selectedDeck, decks = [], stats, setStats, onNavigate, onAddXp }) {
  const [direction, setDirection] = useState("default"); // 'default' | 'reversed'
  const [quizMode, setQuizMode] = useState(null); // 'choice' | 'spell'
  const [quizTimer, setQuizTimer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [spellingInput, setSpellingInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [incorrectCardIds, setIncorrectCardIds] = useState([]);
  const spellInputRef = useRef(null);

  // High quality premium distractors for fallback
  const premiumFallbacks = [
    "Zacisnąć zęby / stawić czoła trudnościom",
    "Zapierający dech w piersiach",
    "Zakończyć pracę na dzisiaj",
    "Dwuznaczny / niejednoznaczny",
    "Odłożyć spotkanie na później",
    "Skrupulatna dbałość o szczegóły",
    "Wszędobylski / powszechny",
    "Myśleć nieszablonowo",
    "Przełożyć na inny termin",
    "Zacząć od nowa",
    "Wąskie gardło / zator",
    "Produkt końcowy / rezultat",
    "Wypaplać sekret",
    "Poza utartym szlakiem",
    "Być z kimś w kontakcie",
    "Źle się czuć / chory",
    "Przesiadka na lotnisku",
    "Dwuznaczne zachowanie",
    "Ulotna chwila",
    "Czekać z niecierpliwością"
  ];

  useEffect(() => {
    return () => {
      if (quizTimer) clearTimeout(quizTimer);
    };
  }, [quizTimer]);

  // Automatic input focus for spelling mode
  useEffect(() => {
    if (quizMode === "spell" && !quizFinished) {
      const timer = setTimeout(() => {
        if (spellInputRef.current) {
          spellInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [quizMode, currentIndex, isAnswered, quizFinished]);

  useEffect(() => {
    if (selectedDeck && selectedDeck.cards && quizMode) {
      const deckCards = selectedDeck.cards;
      const shuffledCards = [...deckCards].sort(() => Math.random() - 0.5);
      
      // Gather ALL translations across all decks as a wide distraction pool
      const filteredDecks = stats?.isPro ? decks : decks.filter(d => !d.isPremium);
      const allDecksCards = filteredDecks.flatMap(d => d.cards || []);
      
      const preparedQuestions = shuffledCards.map((card) => {
        if (quizMode === 'choice') {
          if (direction === 'default') {
            // ENG ➔ PL
            let distractors = allDecksCards
              .filter(c => c.id !== card.id && c.polish.toLowerCase() !== card.polish.toLowerCase())
              .map(c => c.polish);
            distractors = [...new Set(distractors)];
            if (distractors.length < 3) {
              distractors = [...distractors, ...premiumFallbacks];
            }
            distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
            const options = [...distractors, card.polish].sort(() => Math.random() - 0.5);
            return {
              card,
              prompt: card.english,
              options,
              correctAnswer: card.polish
            };
          } else {
            // PL ➔ ENG
            let distractors = allDecksCards
              .filter(c => c.id !== card.id && c.english.toLowerCase() !== card.english.toLowerCase())
              .map(c => c.english);
            distractors = [...new Set(distractors)];
            if (distractors.length < 3) {
              const englishFallbacks = [
                "Bite the bullet", "Breathtaking", "Call it a day", "Ambiguous", "Postpone the meeting",
                "Meticulous attention to detail", "Ubiquitous", "Think outside the box", "Reschedule",
                "Start from scratch", "Bottleneck", "Deliverable", "Spill the beans", "Off the beaten track",
                "Keep in touch", "Under the weather", "Layover", "Equivocal behavior", "Fleeting moment",
                "Look forward to"
              ];
              distractors = [...distractors, ...englishFallbacks];
            }
            distractors = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
            const options = [...distractors, card.english].sort(() => Math.random() - 0.5);
            return {
              card,
              prompt: card.polish,
              options,
              correctAnswer: card.english
            };
          }
        } else {
          // quizMode === 'spell'
          if (direction === 'default') {
            // PL ➔ ENG
            return {
              card,
              prompt: card.polish,
              correctAnswer: card.english
            };
          } else {
            // ENG ➔ PL
            return {
              card,
              prompt: card.english,
              correctAnswer: card.polish
            };
          }
        }
      });

      setQuestions(preparedQuestions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setSpellingInput("");
      setShowHint(false);
      setScore(0);
      setQuizFinished(false);
    }
  }, [selectedDeck, quizMode, decks, direction]);

  if (!selectedDeck) {
    return (
      <div className="glass-card p-12 text-center flex flex-col items-center gap-6 max-w-md mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
          <Icons.Award size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Nie wybrano talii</h3>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed">Wybierz jedną z przygotowanych talii na pulpicie, aby rozpocząć test.</p>
        </div>
        <button onClick={() => onNavigate("dashboard")} className="btn btn-primary w-full">
          Przejdź do Pulpitu
        </button>
      </div>
    );
  }

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      const speed = localStorage.getItem("lingocards_speech_speed") || "1.0";
      utterance.rate = parseFloat(speed);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChoiceSubmit = (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
    
    const isCorrect = option === questions[currentIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playTTS(questions[currentIndex].card.english);
      onAddXp(15);
      
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 2000);
      setQuizTimer(timer);
    } else {
      setIncorrectCardIds(prev => [...prev, questions[currentIndex].card.id]);
    }
  };

  const handleSpellSubmit = (e) => {
    if (e) e.preventDefault();
    if (isAnswered) {
      handleNextQuestion();
      return;
    }
    
    setIsAnswered(true);
    const answerClean = cleanWord(spellingInput);
    const correctAnswersList = questions[currentIndex].correctAnswer
      .split("/")
      .map(ans => cleanWord(ans))
      .filter(Boolean);
    
    const isCorrect = correctAnswersList.includes(answerClean);
    if (isCorrect) {
      setScore(prev => prev + 1);
      playTTS(questions[currentIndex].card.english);
      onAddXp(15);
      
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 2000);
      setQuizTimer(timer);
    } else {
      setIncorrectCardIds(prev => [...prev, questions[currentIndex].card.id]);
    }
  };

  const handleNextQuestion = () => {
    if (quizTimer) {
      clearTimeout(quizTimer);
      setQuizTimer(null);
    }
    setSelectedAnswer(null);
    setIsAnswered(false);
    setSpellingInput("");
    setShowHint(false);
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      
      const finalScore = score;
      setStats(prev => {
        const newTotal = (prev.quizTotal || 0) + questions.length;
        const newCorrect = (prev.quizCorrect || 0) + finalScore;
        const updatedCardMistakes = { ...(prev.cardMistakes || {}) };
        incorrectCardIds.forEach(id => {
          updatedCardMistakes[id] = (updatedCardMistakes[id] || 0) + 1;
        });
        return {
          ...prev,
          quizTotal: newTotal,
          quizCorrect: newCorrect,
          cardMistakes: updatedCardMistakes
        };
      });
    }
  };

  const isCurrentCorrect = () => {
    if (quizMode === 'choice') {
      return selectedAnswer === questions[currentIndex].correctAnswer;
    } else {
      const answerClean = cleanWord(spellingInput);
      const correctAnswersList = questions[currentIndex].correctAnswer
        .split("/")
        .map(ans => cleanWord(ans))
        .filter(Boolean);
      return correctAnswersList.includes(answerClean);
    }
  };



  const handleRestart = () => {
    setQuizMode(null);
    setQuizFinished(false);
    setIncorrectCardIds([]);
  };

  if (!quizMode) {
    const isDefault = direction === 'default';
    return (
      <div className="flex flex-col gap-8 max-w-xl mx-auto w-full animate-slide-in">
        <div>
          <button 
            onClick={() => onNavigate("dashboard")}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <Icons.ChevronLeft size={16} /> Powrót do pulpitu
          </button>
          <h2 className="text-2xl font-black mt-2 text-white">Wybierz tryb sprawdzianu</h2>
          <p className="text-slate-400 text-sm mt-1">Zestaw: <span className="text-indigo-400 font-extrabold">{selectedDeck.title}</span></p>
        </div>

        {/* Direction toggle */}
        <div className="glass-card p-5 flex flex-col gap-3">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Kierunek testu</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDirection('default')}
              className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all ${
                isDefault
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 shadow-sm'
                  : 'text-[var(--text-secondary)] border-[var(--border-light)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              ENG → PL
            </button>
            <button
              onClick={() => setDirection('reversed')}
              className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all ${
                !isDefault
                  ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 shadow-sm'
                  : 'text-[var(--text-secondary)] border-[var(--border-light)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              PL → ENG
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <button 
            onClick={() => setQuizMode('choice')}
            className="glass-card p-8 text-center flex flex-col items-center gap-5 hover:-translate-y-1 scale-hover group hover:border-indigo-500/30"
          >
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Icons.ListChecks size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Test wyboru</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                {isDefault ? 'Pytanie po angielsku → wybierz polskie tłumaczenie.' : 'Pytanie po polsku → wybierz angielski odpowiednik.'}
              </p>
            </div>
          </button>

          <button 
            onClick={() => setQuizMode('spell')}
            className="glass-card p-8 text-center flex flex-col items-center gap-5 hover:-translate-y-1 scale-hover group hover:border-cyan-500/30"
          >
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Icons.Keyboard size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Pisanie i pisownia</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                {isDefault ? 'Pytanie po polsku → wpisz słówko po angielsku.' : 'Pytanie po angielsku → wpisz tłumaczenie po polsku.'}
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const rate = Math.round((score / questions.length) * 100);
    return (
      <div className="glass-card p-8 text-center flex flex-col items-center gap-6 w-full max-w-[460px] mx-auto animate-slide-in">
        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20">
          <Icons.Trophy size={32} className="text-amber-400 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-white">Test ukończony!</h3>
          <p className="text-slate-400 text-sm mt-1">Oto podsumowanie Twoich wyników:</p>
        </div>

        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke="var(--text-muted)"
              opacity={0.15}
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke={rate >= 75 ? "#10b981" : rate >= 50 ? "#f59e0b" : "#f43f5e"}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="326.7"
              strokeDashoffset={326.7 - (326.7 * rate) / 100}
              strokeLinecap="round"
              className="progress-ring-circle"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-white">{rate}%</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{score} / {questions.length} poprawnych</span>
          </div>
        </div>

        <div className="flex gap-3 w-full mt-2">
          <button onClick={handleRestart} className="flex-1 btn btn-secondary text-sm">
            Inny tryb
          </button>
          <button onClick={() => onNavigate("dashboard")} className="flex-1 btn btn-primary text-sm">
            Pulpit
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto w-full animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={handleRestart}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <Icons.ChevronLeft size={16} /> Przerwij sprawdzian
          </button>
          <h2 className="text-xl font-black mt-2 text-white">
            {quizMode === 'choice' ? "Test wyboru" : "Pisownia słówek"}
          </h2>
        </div>
        <span className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-light)] px-3.5 py-1.5 rounded-xl">
          Pytanie {currentIndex + 1} z {questions.length}
        </span>
      </div>

      {/* Progress tracker bar */}
      <div className="bg-white/5 h-2 rounded-full overflow-hidden w-full border border-white/5">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      {/* Test Question Card */}
      <div className="glass-card p-8 flex flex-col gap-6 items-center">
        {quizMode === 'choice' ? (
          <>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-extrabold uppercase px-3.5 py-1 rounded-full border border-indigo-500/20 tracking-wider">
                {direction === 'default' ? 'Przetłumacz na polski' : 'Przetłumacz na angielski'}
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-light)] px-3 py-1 rounded-full uppercase font-mono">
                {getCardLevel(currentQuestion.card)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-black text-white">{currentQuestion.prompt}</h3>
              {direction === 'default' && (
                <button 
                  onClick={() => playTTS(currentQuestion.card.english)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-indigo-400 hover:text-white transition-all scale-hover border border-white/5"
                  title="Posłuchaj wymowy"
                >
                  <Icons.Volume2 size={16} />
                </button>
              )}
            </div>
            {direction === 'default' && currentQuestion.card.pronunciation && (
              <p className="text-slate-400 font-semibold font-mono text-sm tracking-wide -mt-3">
                {currentQuestion.card.pronunciation}
              </p>
            )}

            {/* Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mt-4">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = "bg-[var(--bg-input)] border-[var(--border-light)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:border-[var(--border-active)]";
                
                if (isAnswered) {
                  if (option === currentQuestion.correctAnswer) {
                    btnStyle = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 pointer-events-none";
                  } else if (selectedAnswer === option) {
                    btnStyle = "bg-rose-500/15 border-rose-500/40 text-rose-300 pointer-events-none";
                  } else {
                    btnStyle = "bg-[var(--bg-input)] border-[var(--border-light)] text-slate-600 opacity-40 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleChoiceSubmit(option)}
                    disabled={isAnswered}
                    className={`btn text-center justify-center p-4 rounded-xl border flex items-center gap-2 text-sm transition-all scale-hover ${btnStyle}`}
                  >
                    {isAnswered && option === currentQuestion.correctAnswer && (
                      <Icons.Check size={16} className="text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                      <Icons.X size={16} className="text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold text-center">{option}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 font-extrabold uppercase px-3.5 py-1 rounded-full border border-cyan-500/20 tracking-wider">
                {direction === 'default' ? 'Przetłumacz na angielski' : 'Przetłumacz na polski'}
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-light)] px-3 py-1 rounded-full uppercase font-mono">
                {getCardLevel(currentQuestion.card)}
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-white text-center leading-snug">{currentQuestion.prompt}</h3>

            <form onSubmit={handleSpellSubmit} className="w-full flex flex-col gap-4 mt-2">
              <div className="flex gap-3">
                <input
                  ref={spellInputRef}
                  type="text"
                  value={spellingInput}
                  onChange={(e) => setSpellingInput(e.target.value)}
                  readOnly={isAnswered}
                  placeholder={isAnswered ? 'Naciśnij Enter, aby przejść dalej...' : (direction === 'default' ? 'Wpisz słówko po angielsku...' : 'Wpisz tłumaczenie po polsku...')}
                  className="flex-grow bg-[var(--bg-input,#0d0d1a)] border border-[var(--border-light)] rounded-xl px-4 py-3.5 text-[var(--text-primary,#fff)] focus:outline-none focus:border-cyan-500/60 font-semibold placeholder-slate-600"
                />
                
                <button type="submit" className="btn btn-primary bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/10">
                  {isAnswered ? 'Dalej' : 'Sprawdź'}
                </button>
              </div>

              {/* Reveal hint trigger */}
              {!isAnswered && (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold self-start flex items-center gap-1 transition-colors"
                >
                  <Icons.HelpCircle size={14} /> 
                  Pokaż podpowiedź ({currentQuestion.correctAnswer.split('/')[0].trim().length} liter)
                </button>
              )}

              {/* Show Hint card */}
              {showHint && !isAnswered && (() => {
                const hintWord = currentQuestion.correctAnswer.split('/')[0].trim();
                return (
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs text-slate-400 w-full text-left font-mono leading-relaxed">
                    Pierwsza litera: <strong className="text-white text-sm">{hintWord.charAt(0)}</strong>,{' '}
                    ostatnia: <strong className="text-white text-sm">{hintWord.charAt(hintWord.length - 1)}</strong>
                    {direction === 'default' && (
                      <button 
                        type="button" 
                        onClick={() => playTTS(currentQuestion.card.english)} 
                        className="ml-3 text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        <Icons.Volume2 size={12} /> posłuchaj słówka
                      </button>
                    )}
                  </div>
                );
              })()}
            </form>

            {/* Answer Checker Feedback */}
            {isAnswered && (
              <div className={`w-full p-5 rounded-2xl border text-center flex flex-col items-center gap-2 mt-2 ${
                isCurrentCorrect() 
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/25 text-rose-300'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCurrentCorrect() ? (
                    <>
                      <Icons.CheckCircle2 size={18} className="text-emerald-400" />
                      <span>Świetnie! Poprawny zapis.</span>
                    </>
                  ) : (
                    <>
                      <Icons.XCircle size={18} className="text-rose-400" />
                      <span>Błędna pisownia.</span>
                    </>
                  )}
                </div>
                
                <div className="text-xs text-slate-400">
                  Wpisano: <span className="font-mono text-slate-200">{spellingInput || '(puste)'}</span>
                </div>
                <div className="text-sm text-white font-extrabold mt-1">
                  Prawidłowo: <span className="text-cyan-300 font-mono text-lg">{currentQuestion.correctAnswer}</span>
                </div>
                {direction === 'default' && currentQuestion.card.pronunciation && (
                  <span className="text-xs text-slate-500 font-mono">{currentQuestion.card.pronunciation}</span>
                )}
              </div>
            )}
          </>
        )}

        {/* Next Question / Finish Button */}
        {isAnswered && (
          <button 
            onClick={handleNextQuestion}
            className="w-full btn btn-primary flex items-center justify-center gap-2 mt-4 py-3.5"
          >
            {currentIndex + 1 < questions.length ? "Następne pytanie" : "Zakończ test"}
            <Icons.ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

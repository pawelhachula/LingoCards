import React, { useState } from "react";
import * as Icons from "lucide-react";

export default function Creator({ decks, onCreateDeck, onAddCard, onDeleteCard, onNavigate }) {
  const [activeTab, setActiveTab] = useState("add-card"); // 'add-card' | 'create-deck'
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id || "");
  
  // Card Form
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("word");
  const [exampleEnglish, setExampleEnglish] = useState("");
  const [examplePolish, setExamplePolish] = useState("");
  const [errorCard, setErrorCard] = useState("");
  const [successCard, setSuccessCard] = useState(false);
  const [level, setLevel] = useState("B1");

  // Deck Form
  const [deckTitle, setDeckTitle] = useState("");
  const [deckPolishTitle, setDeckPolishTitle] = useState("");
  const [deckDesc, setDeckDesc] = useState("");
  const [deckColor, setDeckColor] = useState("#6366f1");
  const [deckIcon, setDeckIcon] = useState("BookOpen");
  const [errorDeck, setErrorDeck] = useState("");
  const [successDeck, setSuccessDeck] = useState(false);

  const iconsList = ["BookOpen", "MessageSquare", "Briefcase", "Compass", "GraduationCap", "Flame", "Smile", "Heart", "Globe"];
  const colorsList = ["#6366f1", "#06b6d4", "#10b981", "#ec4899", "#f59e0b", "#f43f5e", "#3b82f6", "#14b8a6"];

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setErrorCard("");
    setSuccessCard(false);

    if (!selectedDeckId) {
      setErrorCard("Wybierz talię, do której chcesz dodać fiszkę.");
      return;
    }
    if (!english.trim() || !polish.trim()) {
      setErrorCard("Słówko angielskie oraz polskie znaczenie są wymagane.");
      return;
    }

    const newCard = {
      id: `custom-card-${Date.now()}`,
      english: english.trim(),
      polish: polish.trim(),
      pronunciation: pronunciation.trim() ? pronunciation.trim() : undefined,
      partOfSpeech: partOfSpeech,
      level: level,
      exampleEnglish: exampleEnglish.trim() ? exampleEnglish.trim() : undefined,
      examplePolish: examplePolish.trim() ? examplePolish.trim() : undefined
    };

    onAddCard(selectedDeckId, newCard);
    
    setEnglish("");
    setPolish("");
    setPronunciation("");
    setLevel("B1");
    setExampleEnglish("");
    setExamplePolish("");
    setSuccessCard(true);

    setTimeout(() => setSuccessCard(false), 3000);
  };

  const handleDeckSubmit = (e) => {
    e.preventDefault();
    setErrorDeck("");
    setSuccessDeck(false);

    if (!deckTitle.trim() || !deckPolishTitle.trim()) {
      setErrorDeck("Nazwa zestawu i polski odpowiednik są wymagane.");
      return;
    }

    const newDeck = {
      id: `custom-deck-${Date.now()}`,
      title: deckTitle.trim(),
      polishTitle: deckPolishTitle.trim(),
      description: deckDesc.trim() || "Własna, spersonalizowana talia fiszek.",
      icon: deckIcon,
      color: deckColor,
      cards: []
    };

    onCreateDeck(newDeck);
    
    setDeckTitle("");
    setDeckPolishTitle("");
    setDeckDesc("");
    setSelectedDeckId(newDeck.id);
    setSuccessDeck(true);
    
    setTimeout(() => {
      setSuccessDeck(false);
      setActiveTab("add-card");
    }, 1500);
  };

  const currentSelectedDeck = decks.find(d => d.id === selectedDeckId);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-slide-in">
      <div>
        <button 
          onClick={() => onNavigate("dashboard")}
          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
        >
          <Icons.ChevronLeft size={16} /> Powrót do pulpitu
        </button>
        <h2 className="text-2xl font-black mt-2 text-white">Menedżer Zestawów i Fiszek</h2>
        <p className="text-slate-400 text-sm mt-1">Zarządzaj słownictwem, modyfikuj talie i rozbudowuj swoją bazę.</p>
      </div>

      {/* Selector Tabs */}
      <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 gap-2 max-w-md">
        <button
          onClick={() => setActiveTab("add-card")}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "add-card" 
              ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 shadow-sm" 
              : "bg-transparent text-slate-400 hover:text-white border-transparent"
          }`}
        >
          <Icons.Plus size={14} />
          Nowe słówko
        </button>
        <button
          onClick={() => setActiveTab("create-deck")}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "create-deck" 
              ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 shadow-sm" 
              : "bg-transparent text-slate-400 hover:text-white border-transparent"
          }`}
        >
          <Icons.FolderPlus size={14} />
          Nowa talia
        </button>
      </div>

      {activeTab === "add-card" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Card Adding Form */}
          <div className="lg:col-span-2 glass-card p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-5">Dodaj nową fiszkę</h3>
            
            {errorCard && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.AlertCircle size={16} />
                <span>{errorCard}</span>
              </div>
            )}
            {successCard && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.CheckCircle2 size={16} />
                <span>Fiszka została pomyślnie dodana!</span>
              </div>
            )}

            <form onSubmit={handleCardSubmit} className="flex flex-col gap-5">
              {/* Deck selector */}
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Wybierz talię docelową
                </label>
                <select
                  value={selectedDeckId}
                  onChange={(e) => setSelectedDeckId(e.target.value)}
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold"
                >
                  <option value="" disabled>Zaznacz talię...</option>
                  {decks.map(deck => (
                    <option key={deck.id} value={deck.id}>{deck.title} ({deck.polishTitle})</option>
                  ))}
                </select>
              </div>

              {/* English & Polish Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                    Słówko / fraza (angielski) *
                  </label>
                  <input
                    type="text"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    placeholder="np. Resilience"
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                    Tłumaczenie (polski) *
                  </label>
                  <input
                    type="text"
                    value={polish}
                    onChange={(e) => setPolish(e.target.value)}
                    placeholder="np. Odporność, elastyczność"
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                  />
                </div>
              </div>

              {/* Phonetics, Category & CEFR Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                    Zapis fonetyczny (opcjonalnie)
                  </label>
                  <input
                    type="text"
                    value={pronunciation}
                    onChange={(e) => setPronunciation(e.target.value)}
                    placeholder="np. /rɪˈzɪl.jəns/"
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                    Część mowy
                  </label>
                  <select
                    value={partOfSpeech}
                    onChange={(e) => setPartOfSpeech(e.target.value)}
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold"
                  >
                    <option value="word">Słówko (Word)</option>
                    <option value="noun">Rzeczownik (Noun)</option>
                    <option value="verb">Czasownik (Verb)</option>
                    <option value="adjective">Przymiotnik (Adjective)</option>
                    <option value="idiom">Idiom (Idiom)</option>
                    <option value="phrase">Zwrot (Phrase)</option>
                    <option value="phrasal verb">Czasownik frazowy</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                    Poziom trudności (CEFR)
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold"
                  >
                    <option value="A1">A1 (Początkujący)</option>
                    <option value="A2">A2 (Podstawowy)</option>
                    <option value="B1">B1 (Średnio zaawansowany)</option>
                    <option value="B2">B2 (Wyższy średni)</option>
                    <option value="C1">C1 (Zaawansowany)</option>
                    <option value="C2">C2 (Biegły)</option>
                  </select>
                </div>
              </div>

              {/* Context example sentences */}
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Zdanie przykładowe (angielski - opcjonalnie)
                </label>
                <textarea
                  value={exampleEnglish}
                  onChange={(e) => setExampleEnglish(e.target.value)}
                  placeholder="np. The team showed great resilience during the crisis."
                  rows={2}
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700 resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Tłumaczenie zdania (polski - opcjonalnie)
                </label>
                <textarea
                  value={examplePolish}
                  onChange={(e) => setExamplePolish(e.target.value)}
                  placeholder="np. Zespół wykazał się ogromną odpornością w czasie kryzysu."
                  rows={2}
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700 resize-none"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2 self-start px-8">
                <Icons.Plus size={16} /> Dodaj Fiszkę
              </button>
            </form>
          </div>

          {/* Sidebar - Deck content summary */}
          <div className="glass-card p-6 flex flex-col h-[530px]">
            <h4 className="text-xs font-extrabold text-slate-500 mb-3 uppercase tracking-wider">Zawartość wybranej talii</h4>
            
            {currentSelectedDeck ? (
              <>
                <div className="flex items-center gap-3 mb-4 bg-black/25 p-3 rounded-2xl border border-white/5">
                  <div 
                    className="p-2.5 rounded-xl border"
                    style={{ 
                      backgroundColor: `${currentSelectedDeck.color}10`, 
                      color: currentSelectedDeck.color,
                      borderColor: `${currentSelectedDeck.color}20` 
                    }}
                  >
                    {React.createElement(Icons[currentSelectedDeck.icon] || Icons.BookOpen, { size: 16 })}
                  </div>
                  <div>
                    <div className="text-xs text-white font-extrabold">{currentSelectedDeck.title}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{currentSelectedDeck.cards.length} fiszek</div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-2.5">
                  {currentSelectedDeck.cards.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs font-medium leading-relaxed">
                      Ta talia nie zawiera jeszcze żadnych fiszek. Wypełnij pola i kliknij "Dodaj fiszkę".
                    </div>
                  ) : (
                    currentSelectedDeck.cards.map((card) => (
                      <div 
                        key={card.id}
                        className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs hover:border-white/10 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="font-extrabold text-white truncate">{card.english}</div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">{card.polish}</div>
                        </div>
                        <button 
                          onClick={() => onDeleteCard(currentSelectedDeck.id, card.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Usuń fiszkę"
                        >
                          <Icons.Trash2 size={13} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Wybierz talię docelową, aby zarządzać jej fiszkami.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Create New Deck Section */
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-5">Stwórz nową talię</h3>
          
          {errorDeck && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <Icons.AlertCircle size={16} />
              <span>{errorDeck}</span>
            </div>
          )}
          {successDeck && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <Icons.CheckCircle2 size={16} />
              <span>Talia została stworzona! Przełączanie...</span>
            </div>
          )}

          <form onSubmit={handleDeckSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Nazwa talii (np. po angielsku) *
                </label>
                <input
                  type="text"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  placeholder="np. Food & Cooking"
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Polski odpowiednik / podtytuł *
                </label>
                <input
                  type="text"
                  value={deckPolishTitle}
                  onChange={(e) => setDeckPolishTitle(e.target.value)}
                  placeholder="np. Jedzenie i Gotowanie"
                  className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Krótki opis talii
              </label>
              <input
                type="text"
                value={deckDesc}
                onChange={(e) => setDeckDesc(e.target.value)}
                placeholder="np. Naucz się nazw składników, potraw i słownictwa restauracyjnego."
                className="w-full bg-black/40 border border-white/8 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/60 font-semibold placeholder-slate-700"
              />
            </div>

            {/* Icons Selector */}
            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Wybierz ikonę talii
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                {iconsList.map((icoName) => {
                  const Icon = Icons[icoName] || Icons.BookOpen;
                  const isSel = deckIcon === icoName;
                  return (
                    <button
                      key={icoName}
                      type="button"
                      onClick={() => setDeckIcon(icoName)}
                      className={`btn p-3 border rounded-xl flex items-center justify-center transition-all scale-hover ${
                        isSel 
                          ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-400" 
                          : "bg-black/20 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                Kolor akcentujący talii
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colorsList.map((col) => {
                  const isSel = deckColor === col;
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setDeckColor(col)}
                      className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-105 ${
                        isSel ? "scale-110 border-white" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  );
                })}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2 self-start px-8">
              <Icons.BookOpen size={16} /> Stwórz Zestaw
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

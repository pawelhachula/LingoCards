import React, { useState } from "react";
import * as Icons from "lucide-react";
import { defaultDecks } from "../data/defaultDecks";

const systemDeckIds = new Set(defaultDecks.map(d => d.id));

export default function Creator({ 
  decks, 
  onCreateDeck, 
  onEditDeck, 
  onDeleteDeck, 
  onAddCard, 
  onEditCard, 
  onDeleteCard, 
  onNavigate 
}) {
  const customDecks = decks.filter(d => !systemDeckIds.has(d.id));
  const [activeTab, setActiveTab] = useState("add-card"); // 'add-card' | 'create-deck' | 'manage-decks' | 'import-file'
  const [selectedDeckId, setSelectedDeckId] = useState(customDecks[0]?.id || "");
  
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

  // Editing & Deletion states
  const [editingCardId, setEditingCardId] = useState(null);
  const [editingDeckId, setEditingDeckId] = useState(null);
  const [showConfirmDeleteDeckId, setShowConfirmDeleteDeckId] = useState(null);

  const iconsList = ["BookOpen", "MessageSquare", "Briefcase", "Compass", "GraduationCap", "Flame", "Smile", "Heart", "Globe"];
  const colorsList = ["#6366f1", "#06b6d4", "#10b981", "#ec4899", "#f59e0b", "#f43f5e", "#3b82f6", "#14b8a6"];

  const handleStartEditCard = (card) => {
    setEditingCardId(card.id);
    setEnglish(card.english);
    setPolish(card.polish);
    setPronunciation(card.pronunciation || "");
    setPartOfSpeech(card.partOfSpeech || "word");
    setLevel(card.level || "B1");
    setExampleEnglish(card.exampleEnglish || "");
    setExamplePolish(card.examplePolish || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEditCard = () => {
    setEditingCardId(null);
    setEnglish("");
    setPolish("");
    setPronunciation("");
    setPartOfSpeech("word");
    setLevel("B1");
    setExampleEnglish("");
    setExamplePolish("");
  };

  const handleStartEditDeck = (deck) => {
    setEditingDeckId(deck.id);
    setDeckTitle(deck.title);
    setDeckPolishTitle(deck.polishTitle);
    setDeckDesc(deck.description || "");
    setDeckIcon(deck.icon || "BookOpen");
    setDeckColor(deck.color || "#6366f1");
    setActiveTab("create-deck");
  };

  const handleCancelEditDeck = () => {
    setEditingDeckId(null);
    setDeckTitle("");
    setDeckPolishTitle("");
    setDeckDesc("");
    setDeckIcon("BookOpen");
    setDeckColor("#6366f1");
  };

  // File Import Tab States
  const [importTargetType, setImportTargetType] = useState("new"); // "new" | "existing"
  const [importSelectedDeckId, setImportSelectedDeckId] = useState(customDecks[0]?.id || "");
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [newDeckPolishTitle, setNewDeckPolishTitle] = useState("");
  const [parsedCards, setParsedCards] = useState([]);
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // File Import Helper Functions
  const loadPdfJs = () => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script.onload = async () => {
        try {
          // Pobierz skrypt workera jako blob, aby uniknąć błędu CORS dla Workerów w środowisku produkcyjnym (np. Vercel)
          const workerRes = await fetch("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js");
          const workerBlob = await workerRes.blob();
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
        } catch (err) {
          console.warn("Nie udało się pobrać workera, PDF.js użyje fake workera:", err);
        }
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Nie udało się załadować biblioteki PDF.js z CDN. Upewnij się, że masz połączenie z internetem."));
      document.head.appendChild(script);
    });
  };

  const cleanField = (str) => {
    return str.trim().replace(/^["']|["']$/g, "").trim();
  };

  const parseLines = (lines) => {
    const cards = [];
    let idCounter = 0;

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      let separator = null;
      const separators = [";", ",", " - ", " : ", "\t", "–", "—"];
      
      let bestSplit = [];
      let bestSep = null;

      for (const sep of separators) {
        const parts = line.split(sep);
        if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
          if (!bestSep || (sep !== "," && bestSep === ",")) {
            bestSep = sep;
            bestSplit = parts;
          }
        }
      }

      if (!bestSep) {
        for (const sep of ["-", ":"]) {
          const parts = line.split(sep);
          if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
            bestSep = sep;
            bestSplit = parts;
            break;
          }
        }
      }

      if (bestSep && bestSplit.length >= 2) {
        const english = cleanField(bestSplit[0]);
        const polish = cleanField(bestSplit[1]);
        
        const pronunciation = bestSplit[2] ? cleanField(bestSplit[2]) : "";
        const exampleEnglish = bestSplit[3] ? cleanField(bestSplit[3]) : "";
        const examplePolish = bestSplit[4] ? cleanField(bestSplit[4]) : "";

        if (english && polish) {
          cards.push({
            id: `parsed-${Date.now()}-${idCounter++}`,
            english,
            polish,
            pronunciation,
            partOfSpeech: "word",
            level: "B2",
            exampleEnglish,
            examplePolish
          });
        }
      }
    }

    return cards;
  };

  const parseFile = async (file) => {
    setIsParsing(true);
    setImportError("");
    setParsedCards([]);
    
    const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
    const formattedTitle = fileNameWithoutExt
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
    setNewDeckTitle(formattedTitle);
    setNewDeckPolishTitle(formattedTitle + " (Import)");

    const extension = file.name.split(".").pop().toLowerCase();

    try {
      if (extension === "json") {
        const text = await file.text();
        const data = JSON.parse(text);
        let cards = [];
        if (Array.isArray(data)) {
          cards = data;
        } else if (data.cards && Array.isArray(data.cards)) {
          cards = data.cards;
          if (data.title) setNewDeckTitle(data.title);
          if (data.polishTitle) setNewDeckPolishTitle(data.polishTitle);
        } else {
          throw new Error("Nieprawidłowy format JSON. Powinien to być spis fiszek.");
        }
        
        const mapped = cards.map((c, index) => ({
          id: `parsed-${Date.now()}-${index}`,
          english: c.english || "",
          polish: c.polish || "",
          pronunciation: c.pronunciation || "",
          partOfSpeech: c.partOfSpeech || "word",
          level: c.level || "B2",
          exampleEnglish: c.exampleEnglish || "",
          examplePolish: c.examplePolish || ""
        }));
        setParsedCards(mapped);
      } else if (extension === "pdf") {
        const pdfjs = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          let lastY;
          let text = "";
          for (let item of textContent.items) {
            if (lastY !== undefined && Math.abs(item.transform[5] - lastY) > 5) {
              text += "\n";
            }
            text += item.str + " ";
            lastY = item.transform[5];
          }
          fullText += text + "\n";
        }

        const lines = fullText.split("\n");
        const cards = parseLines(lines);
        if (cards.length === 0) {
          throw new Error("Nie znaleziono żadnych par słówek w pliku PDF. Upewnij się, że tekst jest poprawnie rozdzielony myślnikiem lub dwukropkiem.");
        }
        setParsedCards(cards);
      } else {
        const text = await file.text();
        const lines = text.split(/\r?\n/);
        const cards = parseLines(lines);
        if (cards.length === 0) {
          throw new Error("Nie znaleziono żadnych par słówek. Upewnij się, że są rozdzielone przecinkiem, średnikiem, myślnikiem lub dwukropkiem.");
        }
        setParsedCards(cards);
      }
    } catch (err) {
      setImportError(err.message || "Błąd podczas parsowania pliku.");
    } finally {
      setIsParsing(false);
    }
  };

  const updateCardField = (cardId, fieldName, value) => {
    setParsedCards(prev => prev.map(c => c.id === cardId ? { ...c, [fieldName]: value } : c));
  };

  const removeParsedCard = (cardId) => {
    setParsedCards(prev => prev.filter(c => c.id !== cardId));
  };

  const handleSaveImport = () => {
    setImportError("");
    setImportSuccess(false);

    const validCards = parsedCards.filter(c => c.english.trim() && c.polish.trim());
    if (validCards.length === 0) {
      setImportError("Brak poprawnych fiszek do zaimportowania. Upewnij się, że kolumny Angielski i Polski nie są puste.");
      return;
    }

    const cardsToSave = validCards.map((c, index) => ({
      id: `custom-card-${Date.now()}-${index}`,
      english: c.english.trim(),
      polish: c.polish.trim(),
      pronunciation: c.pronunciation.trim() || undefined,
      partOfSpeech: c.partOfSpeech || "word",
      level: c.level || "B2",
      exampleEnglish: c.exampleEnglish.trim() || undefined,
      examplePolish: c.examplePolish.trim() || undefined
    }));

    if (importTargetType === "new") {
      if (!newDeckTitle.trim() || !newDeckPolishTitle.trim()) {
        setImportError("Nazwa nowej talii i polski podtytuł są wymagane.");
        return;
      }

      const newDeckId = `custom-deck-${Date.now()}`;
      const newDeck = {
        id: newDeckId,
        title: newDeckTitle.trim(),
        polishTitle: newDeckPolishTitle.trim(),
        description: "Zestaw zaimportowany z pliku.",
        icon: "FileUp",
        color: "#6366f1",
        cards: cardsToSave
      };

      onCreateDeck(newDeck);
      setSelectedDeckId(newDeckId);
    } else {
      if (!importSelectedDeckId) {
        setImportError("Wybierz talię, do której chcesz zaimportować fiszki.");
        return;
      }

      onAddCard(importSelectedDeckId, cardsToSave);
      setSelectedDeckId(importSelectedDeckId);
    }

    setImportSuccess(true);
    setParsedCards([]);
    setTimeout(() => {
      setImportSuccess(false);
      setActiveTab("add-card");
    }, 2000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      parseFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      parseFile(e.target.files[0]);
    }
  };

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

    const cardFields = {
      english: english.trim(),
      polish: polish.trim(),
      pronunciation: pronunciation.trim() ? pronunciation.trim() : undefined,
      partOfSpeech: partOfSpeech,
      level: level,
      exampleEnglish: exampleEnglish.trim() ? exampleEnglish.trim() : undefined,
      examplePolish: examplePolish.trim() ? examplePolish.trim() : undefined
    };

    if (editingCardId) {
      onEditCard(selectedDeckId, editingCardId, cardFields);
      setEditingCardId(null);
      setSuccessCard(true);
    } else {
      const newCard = {
        id: `custom-card-${Date.now()}`,
        ...cardFields
      };
      onAddCard(selectedDeckId, newCard);
      setSuccessCard(true);
    }
    
    setEnglish("");
    setPolish("");
    setPronunciation("");
    setLevel("B1");
    setExampleEnglish("");
    setExamplePolish("");

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

    const deckFields = {
      title: deckTitle.trim(),
      polishTitle: deckPolishTitle.trim(),
      description: deckDesc.trim() || "Własna, spersonalizowana talia fiszek.",
      icon: deckIcon,
      color: deckColor
    };

    if (editingDeckId) {
      onEditDeck(editingDeckId, deckFields);
      setEditingDeckId(null);
      setSuccessDeck(true);
      
      setDeckTitle("");
      setDeckPolishTitle("");
      setDeckDesc("");
      
      setTimeout(() => {
        setSuccessDeck(false);
        setActiveTab("manage-decks");
      }, 1500);
    } else {
      const newDeck = {
        id: `custom-deck-${Date.now()}`,
        ...deckFields,
        cards: []
      };
      onCreateDeck(newDeck);
      setSuccessDeck(true);
      
      setDeckTitle("");
      setDeckPolishTitle("");
      setDeckDesc("");
      setSelectedDeckId(newDeck.id);
      
      setTimeout(() => {
        setSuccessDeck(false);
        setActiveTab("add-card");
      }, 1500);
    }
  };

  const currentSelectedDeck = decks.find(d => d.id === selectedDeckId);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-slide-in">
      <div>
        <button 
          onClick={() => onNavigate("dashboard")}
          className="text-xs text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1.5 font-bold"
        >
          <Icons.ChevronLeft size={16} /> Powrót do pulpitu
        </button>
        <h2 className="text-2xl font-black mt-2 text-white">Menedżer Zestawów i Fiszek</h2>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Zarządzaj słownictwem, modyfikuj talie i rozbudowuj swoją bazę.</p>
      </div>

      {/* Selector Tabs */}
      <div className="flex bg-[var(--bg-input)] p-1.5 rounded-2xl border border-[var(--border-light)] gap-2 max-w-2xl flex-wrap">
        <button
          onClick={() => {
            setActiveTab("add-card");
            handleCancelEditCard();
          }}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "add-card" 
              ? "bg-[var(--primary-glow)] text-[var(--text-primary)] border border-[var(--border-active)] shadow-sm" 
              : "bg-transparent text-[var(--text-secondary)] hover:text-white border-transparent"
          }`}
        >
          <Icons.Plus size={14} />
          Nowe słówko
        </button>
        <button
          onClick={() => {
            setActiveTab("create-deck");
            handleCancelEditDeck();
          }}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "create-deck" && !editingDeckId
              ? "bg-[var(--primary-glow)] text-[var(--text-primary)] border border-[var(--border-active)] shadow-sm" 
              : "bg-transparent text-[var(--text-secondary)] hover:text-white border-transparent"
          }`}
        >
          <Icons.FolderPlus size={14} />
          Nowa talia
        </button>
        <button
          onClick={() => {
            setActiveTab("import-file");
            handleCancelEditCard();
            handleCancelEditDeck();
          }}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "import-file"
              ? "bg-[var(--primary-glow)] text-[var(--text-primary)] border border-[var(--border-active)] shadow-sm" 
              : "bg-transparent text-[var(--text-secondary)] hover:text-white border-transparent"
          }`}
        >
          <Icons.FileUp size={14} />
          Import z pliku
        </button>
        <button
          onClick={() => {
            setActiveTab("manage-decks");
            handleCancelEditDeck();
          }}
          className={`flex-1 btn text-xs font-bold py-2.5 rounded-xl transition-all ${
            activeTab === "manage-decks" || (activeTab === "create-deck" && editingDeckId)
              ? "bg-[var(--primary-glow)] text-[var(--text-primary)] border border-[var(--border-active)] shadow-sm" 
              : "bg-transparent text-[var(--text-secondary)] hover:text-white border-transparent"
          }`}
        >
          <Icons.FolderEdit size={14} />
          Zarządzaj taliami
        </button>
      </div>

      {activeTab === "add-card" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Card Adding Form */}
          <div className="lg:col-span-2 glass-card p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-5">
              {editingCardId ? "Edytuj fiszkę" : "Dodaj nową fiszkę"}
            </h3>
            
            {errorCard && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.AlertCircle size={16} />
                <span>{errorCard}</span>
              </div>
            )}
            {successCard && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.CheckCircle2 size={16} />
                <span>{editingCardId ? "Zmiany zostały zapisane!" : "Fiszka została pomyślnie dodana!"}</span>
              </div>
            )}
            {customDecks.length === 0 ? (
              <div className="bg-[var(--primary-glow)] border border-[var(--border-active)] text-[var(--primary)] text-xs p-4.5 rounded-xl flex flex-col items-center text-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <Icons.AlertCircle size={16} />
                  <span className="font-extrabold uppercase tracking-wider">Brak własnych talii</span>
                </div>
                <p className="leading-relaxed text-[var(--text-primary)]">
                  Aby dodać nową fiszkę, musisz najpierw stworzyć talię. Przejdź do zakładki <strong className="text-[var(--primary)] cursor-pointer hover:opacity-80" onClick={() => setActiveTab("create-deck")}>Nowa talia</strong> lub skorzystaj z zakładki <strong className="text-[var(--primary)] cursor-pointer hover:opacity-80" onClick={() => setActiveTab("import-file")}>Import z pliku</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCardSubmit} className="flex flex-col gap-5">
                {/* Deck selector */}
                <div>
                  <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                    Wybierz talię docelową
                  </label>
                  <select
                    value={selectedDeckId}
                    onChange={(e) => setSelectedDeckId(e.target.value)}
                    disabled={!!editingCardId}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Zaznacz talię...</option>
                    {customDecks.map(deck => (
                      <option key={deck.id} value={deck.id}>{deck.title} ({deck.polishTitle})</option>
                    ))}
                  </select>
                </div>

                {/* English & Polish Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                      Słówko / fraza (angielski) *
                    </label>
                    <input
                      type="text"
                      value={english}
                      onChange={(e) => setEnglish(e.target.value)}
                      placeholder="np. Resilience"
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                      Tłumaczenie (polski) *
                    </label>
                    <input
                      type="text"
                      value={polish}
                      onChange={(e) => setPolish(e.target.value)}
                      placeholder="np. Odporność, elastyczność"
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
                    />
                  </div>
                </div>

                {/* Phonetics, Category & CEFR Level */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                      Zapis fonetyczny (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      value={pronunciation}
                      onChange={(e) => setPronunciation(e.target.value)}
                      placeholder="np. /rɪˈzɪl.jəns/"
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                      Część mowy
                    </label>
                    <select
                      value={partOfSpeech}
                      onChange={(e) => setPartOfSpeech(e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold"
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
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                      Poziom trudności (CEFR)
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold"
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
                  <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                    Zdanie przykładowe (angielski - opcjonalnie)
                  </label>
                  <textarea
                    value={exampleEnglish}
                    onChange={(e) => setExampleEnglish(e.target.value)}
                    placeholder="np. The team showed great resilience during the crisis."
                    rows={2}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700 resize-none animate-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                    Tłumaczenie zdania (polski - opcjonalnie)
                  </label>
                  <textarea
                    value={examplePolish}
                    onChange={(e) => setExamplePolish(e.target.value)}
                    placeholder="np. Zespół wykazał się ogromną odpornością w czasie kryzysu."
                    rows={2}
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700 resize-none animate-none"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button type="submit" className="btn btn-primary px-8">
                    {editingCardId ? (
                      <>
                        <Icons.Save size={16} /> Zapisz zmiany
                      </>
                    ) : (
                      <>
                        <Icons.Plus size={16} /> Dodaj Fiszkę
                      </>
                    )}
                  </button>
                  {editingCardId && (
                    <button 
                      type="button" 
                      onClick={handleCancelEditCard} 
                      className="btn btn-secondary px-6"
                    >
                      Anuluj edycję
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Sidebar - Deck content summary */}
          <div className="glass-card p-6 flex flex-col h-[530px]">
            <h4 className="text-xs font-extrabold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Zawartość wybranej talii</h4>
            
            {currentSelectedDeck ? (
              <>
                <div className="flex items-center gap-3 mb-4 bg-[var(--bg-input)] p-3 rounded-2xl border border-[var(--border-light)]">
                  <div 
                    className="p-2.5 rounded-xl border animate-none"
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
                    <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-0.5">{currentSelectedDeck.cards.length} fiszek</div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-2.5">
                  {currentSelectedDeck.cards.length === 0 ? (
                    <div className="text-center py-12 text-[var(--text-secondary)] text-xs font-medium leading-relaxed">
                      Ta talia nie zawiera jeszcze żadnych fiszek. Wypełnij pola i kliknij "Dodaj fiszkę".
                    </div>
                  ) : (
                    currentSelectedDeck.cards.map((card) => {
                      const isCustomCard = card.id && card.id.startsWith("custom-card-");
                      return (
                        <div 
                          key={card.id}
                          className="bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border-light)] flex items-center justify-between text-xs hover:border-[var(--border-light)] transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="font-extrabold text-white truncate">{card.english}</div>
                            <div className="text-[10px] text-[var(--text-secondary)] truncate mt-0.5 font-medium">{card.polish}</div>
                          </div>
                          
                          <div className="flex gap-1 items-center shrink-0">
                            {isCustomCard ? (
                              <>
                                <button 
                                  onClick={() => handleStartEditCard(card)}
                                  className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-indigo-500/10 rounded-lg transition-all"
                                  title="Edytuj fiszkę"
                                >
                                  <Icons.Edit2 size={13} />
                                </button>
                                <button 
                                  onClick={() => onDeleteCard(currentSelectedDeck.id, card.id)}
                                  className="p-1.5 text-[var(--text-secondary)] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                                  title="Usuń fiszkę"
                                >
                                  <Icons.Trash2 size={13} />
                                </button>
                              </>
                            ) : (
                              <Icons.Lock size={12} className="text-slate-600 mr-1.5" title="Karta systemowa - nieedytowalna" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-[var(--text-secondary)] text-xs">
                Wybierz talię docelową, aby zarządzać jej fiszkami.
              </div>
            )}
          </div>
        </div>
      ) : activeTab === "create-deck" || (activeTab === "manage-decks" && editingDeckId) ? (
        /* Create or Edit Deck Section */
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-lg font-bold text-white mb-5">
            {editingDeckId ? `Edytuj talię: ${deckTitle}` : "Stwórz nową talię"}
          </h3>
          
          {errorDeck && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <Icons.AlertCircle size={16} />
              <span>{errorDeck}</span>
            </div>
          )}
          {successDeck && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <Icons.CheckCircle2 size={16} />
              <span>{editingDeckId ? "Talia została zaktualizowana!" : "Talia została stworzona! Przełączanie..."}</span>
            </div>
          )}

          <form onSubmit={handleDeckSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                  Nazwa talii (np. po angielsku) *
                </label>
                <input
                  type="text"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  placeholder="np. Food & Cooking"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
                />
              </div>
              <div>
                <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                  Polski odpowiednik / podtytuł *
                </label>
                <input
                  type="text"
                  value={deckPolishTitle}
                  onChange={(e) => setDeckPolishTitle(e.target.value)}
                  placeholder="np. Jedzenie i Gotowanie"
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
                Krótki opis talii
              </label>
              <input
                type="text"
                value={deckDesc}
                onChange={(e) => setDeckDesc(e.target.value)}
                placeholder="np. Naucz się nazw składników, potraw i słownictwa restauracyjnego."
                className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] font-semibold placeholder-slate-700"
              />
            </div>

            {/* Icons Selector */}
            <div>
              <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
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
                          ? "bg-indigo-500/15 border-indigo-500/40 text-[var(--primary)]" 
                          : "bg-[var(--bg-input)] border-[var(--border-light)] text-[var(--text-secondary)] hover:text-white"
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
              <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">
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

            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-primary px-8">
                {editingDeckId ? (
                  <>
                    <Icons.Save size={16} /> Zapisz zmiany
                  </>
                ) : (
                  <>
                    <Icons.BookOpen size={16} /> Stwórz Zestaw
                  </>
                )}
              </button>
              {editingDeckId && (
                <button 
                  type="button" 
                  onClick={() => {
                    handleCancelEditDeck();
                    setActiveTab("manage-decks");
                  }} 
                  className="btn btn-secondary px-6"
                >
                  Anuluj
                </button>
              )}
            </div>
          </form>
        </div>
      ) : activeTab === "import-file" ? (
        /* File Import Section */
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Icons.FileUp className="text-[var(--primary)]" size={20} />
              Importuj fiszki z pliku
            </h3>

            {importError && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.AlertCircle size={16} />
                <span>{importError}</span>
              </div>
            )}
            {importSuccess && (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                <Icons.CheckCircle2 size={16} />
                <span>Import zakończony sukcesem! Trwa przekierowanie...</span>
              </div>
            )}

            <div className="flex flex-col gap-6">
              {/* Target options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-input)] p-4 rounded-xl border border-[var(--border-light)]">
                <div>
                  <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-2">Cel importu</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-white font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="importTarget"
                        value="new"
                        checked={importTargetType === "new"}
                        onChange={() => setImportTargetType("new")}
                        className="accent-indigo-500"
                      />
                      Utwórz nową talię
                    </label>
                    {customDecks.length > 0 && (
                      <label className="flex items-center gap-2 text-xs text-white font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="importTarget"
                          value="existing"
                          checked={importTargetType === "existing"}
                          onChange={() => setImportTargetType("existing")}
                          className="accent-indigo-500"
                        />
                        Dodaj do istniejącej
                      </label>
                    )}
                  </div>
                </div>

                {importTargetType === "new" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-1">Nazwa talii *</label>
                      <input
                        type="text"
                        value={newDeckTitle}
                        onChange={(e) => setNewDeckTitle(e.target.value)}
                        placeholder="Nazwa talii"
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-1">Polski podtytuł *</label>
                      <input
                        type="text"
                        value={newDeckPolishTitle}
                        onChange={(e) => setNewDeckPolishTitle(e.target.value)}
                        placeholder="Polski podtytuł"
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[10px] text-[var(--text-secondary)] font-extrabold uppercase tracking-wider block mb-1">Wybierz talię</label>
                    <select
                      value={importSelectedDeckId}
                      onChange={(e) => setImportSelectedDeckId(e.target.value)}
                      className="w-full bg-[var(--bg-input)] border border-[var(--border-light)] rounded-lg px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="" disabled>Wybierz talię...</option>
                      {customDecks.map(deck => (
                        <option key={deck.id} value={deck.id}>{deck.title} ({deck.polishTitle})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Drag & Drop zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                  dragActive
                    ? "border-indigo-500 bg-indigo-500/5 text-indigo-300"
                    : "border-[var(--border-light)] hover:border-indigo-500/30 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileInput}
                  accept=".csv,.txt,.pdf,.json"
                  className="hidden"
                />
                
                {isParsing ? (
                  <div className="flex flex-col items-center gap-2">
                    <Icons.Loader className="animate-spin text-indigo-500" size={32} />
                    <p className="text-sm font-bold text-white">Parsowanie pliku...</p>
                  </div>
                ) : (
                  <>
                    <Icons.Upload size={36} className="text-[var(--primary)]/80 mb-1" />
                    <p className="text-sm font-bold text-white">Przeciągnij i upuść plik tutaj lub kliknij, aby wybrać</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Obsługiwane formaty: <strong>CSV, TXT, PDF, JSON</strong>. Maksymalnie 5MB.</p>
                  </>
                )}
              </div>

              {/* Tip / Formatting help */}
              <div className="bg-white/[0.02] border border-[var(--border-light)] rounded-2xl p-4.5 text-xs text-[var(--text-secondary)] flex flex-col gap-2">
                <span className="font-extrabold text-white uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Icons.Info size={14} className="text-[var(--primary)]" />
                  Wskazówka dotycząca formatu plików
                </span>
                <p className="leading-relaxed">
                  Dla plików **TXT / CSV / PDF** upewnij się, że słówka są zapisane w osobnych liniach, np.:
                  <br />
                  <code className="text-indigo-300 font-mono text-[10px] bg-[var(--bg-input)] px-1 py-0.5 rounded inline-block mt-1">resilience - odporność</code> lub
                  <code className="text-indigo-300 font-mono text-[10px] bg-[var(--bg-input)] px-1 py-0.5 rounded inline-block mt-1 ml-2">hello, cześć</code>
                  <br />
                  Parser automatycznie wykryje separatory i wyciągnie poprawne pary słówek.
                </p>
              </div>
            </div>
          </div>

          {/* Parsed Cards Preview Table */}
          {parsedCards.length > 0 && (
            <div className="glass-card p-6 overflow-hidden flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-md font-bold text-white flex items-center gap-2">
                    <Icons.Table size={18} className="text-[var(--primary)]" />
                    Podgląd i edycja zaimportowanych fiszek ({parsedCards.length})
                  </h4>
                  <p className="text-[var(--text-secondary)] text-xs mt-1">Przejrzyj zaimportowane dane. Możesz kliknąć w dowolne pole, aby je zmodyfikować przed zapisem.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setParsedCards([]);
                      setImportError("");
                    }}
                    className="px-3.5 py-2 border border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-bold rounded-xl transition-all"
                  >
                    Usuń wszystkie
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[400px] border border-[var(--border-light)] rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[var(--bg-input)] text-[var(--text-secondary)] font-extrabold uppercase border-b border-[var(--border-light)]">
                      <th className="p-3.5 w-12 text-center">#</th>
                      <th className="p-3.5 w-1/4">Angielski *</th>
                      <th className="p-3.5 w-1/4">Polski *</th>
                      <th className="p-3.5 w-1/6">Wymowa</th>
                      <th className="p-3.5 w-1/4">Przykład EN</th>
                      <th className="p-3.5 w-1/4">Przykład PL</th>
                      <th className="p-3.5 w-12 text-center">Akcja</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {parsedCards.map((card, idx) => (
                      <tr key={card.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-3 text-[var(--text-secondary)] font-bold text-center">{idx + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={card.english}
                            onChange={(e) => updateCardField(card.id, "english", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--bg-input)] rounded px-2 py-1 text-white font-semibold outline-none"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={card.polish}
                            onChange={(e) => updateCardField(card.id, "polish", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--bg-input)] rounded px-2 py-1 text-white font-semibold outline-none"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={card.pronunciation}
                            onChange={(e) => updateCardField(card.id, "pronunciation", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--bg-input)] rounded px-2 py-1 text-[var(--text-primary)] font-mono outline-none"
                            placeholder="/.../"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={card.exampleEnglish}
                            onChange={(e) => updateCardField(card.id, "exampleEnglish", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--bg-input)] rounded px-2 py-1 text-[var(--text-primary)] outline-none"
                            placeholder="Zdanie po angielsku"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={card.examplePolish}
                            onChange={(e) => updateCardField(card.id, "examplePolish", e.target.value)}
                            className="w-full bg-transparent border border-transparent hover:border-[var(--border-light)] focus:border-[var(--primary)] focus:bg-[var(--bg-input)] rounded px-2 py-1 text-[var(--text-primary)] outline-none"
                            placeholder="Tłumaczenie zdania"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeParsedCard(card.id)}
                            className="p-1.5 text-[var(--text-secondary)] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Usuń wiersz"
                          >
                            <Icons.Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={handleSaveImport}
                  className="btn btn-primary px-8 flex items-center gap-1.5"
                  disabled={parsedCards.length === 0}
                >
                  <Icons.CheckCircle2 size={16} />
                  Importuj {parsedCards.length} fiszek
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Manage Decks Section (activeTab === "manage-decks" && !editingDeckId) */
        <div className="glass-card p-6 md:p-8 flex flex-col gap-5">
          <h3 className="text-lg font-bold text-white">Zarządzaj własnymi taliami</h3>
          
          {(() => {
            if (customDecks.length === 0) {
              return (
                <div className="text-center py-12 text-[var(--text-secondary)] text-xs font-medium leading-relaxed">
                  Nie stworzyłeś jeszcze żadnej własnej talii. <br />
                  Przejdź do zakładki <strong className="text-[var(--primary)] cursor-pointer hover:underline" onClick={() => setActiveTab("create-deck")}>Nowa talia</strong>, aby stworzyć swój pierwszy zestaw.
                </div>
              );
            }
            return (
              <div className="flex flex-col gap-4">
                {customDecks.map(deck => (
                  <div key={deck.id} className="bg-[var(--bg-input)] p-4 rounded-2xl border border-[var(--border-light)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[var(--border-light)] transition-colors">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-xl border flex items-center justify-center animate-none"
                        style={{ 
                          backgroundColor: `${deck.color}10`, 
                          color: deck.color,
                          borderColor: `${deck.color}20` 
                        }}
                      >
                        {React.createElement(Icons[deck.icon] || Icons.BookOpen, { size: 20 })}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{deck.title} <span className="text-[10px] text-[var(--text-secondary)] font-medium">({deck.polishTitle})</span></h4>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-md">{deck.description}</p>
                        <span className="text-[9px] bg-white/5 border border-[var(--border-light)] px-2 py-0.5 rounded-full text-[var(--text-secondary)] font-extrabold uppercase mt-2 inline-block tracking-wider">
                          {deck.cards.length} fiszek
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleStartEditDeck(deck)}
                        className="btn btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                      >
                        <Icons.Edit2 size={13} />
                        Edytuj
                      </button>
                      
                      {showConfirmDeleteDeckId === deck.id ? (
                        <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 p-1 rounded-xl">
                          <span className="text-[10px] text-rose-300 font-bold px-2">Na pewno?</span>
                          <button
                            onClick={() => {
                              onDeleteDeck(deck.id);
                              setShowConfirmDeleteDeckId(null);
                            }}
                            className="btn bg-rose-600 hover:bg-rose-700 text-white text-xs py-1.5 px-3 rounded-lg"
                          >
                            Tak
                          </button>
                          <button
                            onClick={() => setShowConfirmDeleteDeckId(null)}
                            className="btn btn-secondary text-xs py-1.5 px-3 rounded-lg"
                          >
                            Nie
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowConfirmDeleteDeckId(deck.id)}
                          className="btn text-xs py-2 px-4 border border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 flex items-center gap-1.5"
                        >
                          <Icons.Trash2 size={13} />
                          Usuń
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}


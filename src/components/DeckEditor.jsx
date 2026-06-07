import React, { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";

const EMPTY_FORM = { english: "", polish: "", pronunciation: "" };

export default function DeckEditor({ deck, onClose, onUpdateDeck }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState("");
  const searchRef = useRef(null);

  const activeCards = (deck.cards || []).filter(c => !c._deleted);
  const deletedCards = (deck.deletedCards || []);

  const filtered = activeCards.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.english?.toLowerCase().includes(q) ||
      c.polish?.toLowerCase().includes(q) ||
      c.pronunciation?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    searchRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  // --- ADD ---
  const handleAdd = () => {
    const eng = addForm.english.trim();
    const pol = addForm.polish.trim();
    if (!eng || !pol) return;
    const newCard = {
      id: `custom-card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      english: eng,
      polish: pol,
      pronunciation: addForm.pronunciation.trim() || "",
      example: "",
    };
    const updatedCards = [...activeCards, newCard];
    onUpdateDeck(deck.id, { cards: updatedCards, deletedCards });
    setAddForm(EMPTY_FORM);
    setShowAddForm(false);
    showToast(`✅ Dodano: "${eng}"`);
  };

  // --- EDIT ---
  const startEdit = (card) => {
    setEditingId(card.id);
    setEditForm({ english: card.english, polish: card.polish, pronunciation: card.pronunciation || "" });
  };

  const handleSaveEdit = (cardId) => {
    const eng = editForm.english.trim();
    const pol = editForm.polish.trim();
    if (!eng || !pol) return;
    const updatedCards = activeCards.map(c =>
      c.id === cardId ? { ...c, english: eng, polish: pol, pronunciation: editForm.pronunciation.trim() } : c
    );
    onUpdateDeck(deck.id, { cards: updatedCards, deletedCards });
    setEditingId(null);
    showToast(`✏️ Zapisano zmiany`);
  };

  // --- DELETE (soft) ---
  const handleDelete = (card) => {
    const updatedCards = activeCards.filter(c => c.id !== card.id);
    const newDeleted = [...deletedCards, { ...card, deletedAt: new Date().toISOString() }];
    onUpdateDeck(deck.id, { cards: updatedCards, deletedCards: newDeleted });
    showToast(`🗑️ Usunięto: "${card.english}"`);
    if (editingId === card.id) setEditingId(null);
  };

  // --- RESTORE ---
  const handleRestore = (card) => {
    const newDeleted = deletedCards.filter(c => c.id !== card.id);
    const restored = { ...card };
    delete restored.deletedAt;
    const updatedCards = [...activeCards, restored];
    onUpdateDeck(deck.id, { cards: updatedCards, deletedCards: newDeleted });
    showToast(`♻️ Przywrócono: "${card.english}"`);
  };

  // --- PERMANENTLY DELETE ---
  const handlePermanentDelete = (card) => {
    const newDeleted = deletedCards.filter(c => c.id !== card.id);
    onUpdateDeck(deck.id, { cards: activeCards, deletedCards: newDeleted });
    showToast(`🗑️ Trwale usunięto: "${card.english}"`);
  };

  const isCustomCard = (card) => card.id?.startsWith("custom-card-");
  const IconDeck = Icons[deck.icon] || Icons.BookOpen;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="glass-card w-full max-w-2xl my-8 flex flex-col gap-0 overflow-hidden animate-slide-in shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-white/8">
          <div
            className="p-2.5 rounded-xl border shrink-0"
            style={{ backgroundColor: `${deck.color}15`, color: deck.color, borderColor: `${deck.color}25` }}
          >
            <IconDeck size={20} />
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-lg font-black text-white truncate">Rejestr: {deck.title}</h2>
            <p className="text-xs text-slate-400 font-semibold">{activeCards.length} aktywnych słów · {deletedCards.length} usuniętych</p>
          </div>
          <button onClick={onClose} className="shrink-0 p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <Icons.X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 p-4 border-b border-white/5">
          <div className="relative flex-grow">
            <Icons.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Szukaj słówka..."
              className="w-full bg-black/30 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
            />
          </div>
          <button
            onClick={() => { setShowAddForm(v => !v); setEditingId(null); }}
            className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shrink-0"
          >
            <Icons.Plus size={14} /> Dodaj słowo
          </button>
        </div>

        {/* Add word form */}
        {showAddForm && (
          <div className="p-4 bg-indigo-500/5 border-b border-indigo-500/15 flex flex-col gap-3">
            <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">Nowe słowo</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={addForm.english}
                onChange={e => setAddForm(f => ({ ...f, english: e.target.value }))}
                placeholder="Angielski *"
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
                autoFocus
              />
              <input
                type="text"
                value={addForm.polish}
                onChange={e => setAddForm(f => ({ ...f, polish: e.target.value }))}
                placeholder="Polski *"
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
              />
              <input
                type="text"
                value={addForm.pronunciation}
                onChange={e => setAddForm(f => ({ ...f, pronunciation: e.target.value }))}
                placeholder="Wymowa (opcjonalnie)"
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAddForm(false)} className="btn text-xs py-2 px-3 text-slate-400">Anuluj</button>
              <button
                onClick={handleAdd}
                disabled={!addForm.english.trim() || !addForm.polish.trim()}
                className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5 disabled:opacity-40"
              >
                <Icons.Plus size={13} /> Dodaj
              </button>
            </div>
          </div>
        )}

        {/* Word list */}
        <div className="flex-grow overflow-y-auto max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              {searchQuery ? "Brak wyników dla tej frazy." : "Ta talia nie ma jeszcze żadnych słów."}
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((card, idx) => (
                <div key={card.id} className="group px-5 py-3 hover:bg-white/3 transition-colors">
                  {editingId === card.id ? (
                    /* Inline edit row */
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={editForm.english}
                          onChange={e => setEditForm(f => ({ ...f, english: e.target.value }))}
                          autoFocus
                          className="bg-black/40 border border-indigo-500/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={editForm.polish}
                          onChange={e => setEditForm(f => ({ ...f, polish: e.target.value }))}
                          className="bg-black/40 border border-indigo-500/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={editForm.pronunciation}
                          onChange={e => setEditForm(f => ({ ...f, pronunciation: e.target.value }))}
                          placeholder="Wymowa"
                          className="bg-black/40 border border-indigo-500/40 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditingId(null)} className="btn text-xs py-1.5 px-3 text-slate-400">Anuluj</button>
                        <button onClick={() => handleSaveEdit(card.id)} className="btn btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                          <Icons.Check size={12} /> Zapisz
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Normal display row */
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-600 font-bold w-6 text-right shrink-0">{idx + 1}</span>
                      <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5 min-w-0">
                        <span className="text-sm font-bold text-white truncate">{card.english}</span>
                        <span className="text-sm text-slate-300 truncate">{card.polish}</span>
                        <span className="text-xs text-slate-500 font-mono truncate hidden sm:block">{card.pronunciation || "—"}</span>
                      </div>
                      {/* Custom-card only actions */}
                      {isCustomCard(card) ? (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={() => startEdit(card)}
                            className="p-1.5 hover:bg-indigo-500/15 hover:text-indigo-400 rounded-lg text-slate-500 transition-all"
                            title="Edytuj"
                          >
                            <Icons.Pencil size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(card)}
                            className="p-1.5 hover:bg-rose-500/15 hover:text-rose-400 rounded-lg text-slate-500 transition-all"
                            title="Usuń"
                          >
                            <Icons.Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[9px] text-slate-700 font-bold uppercase tracking-wider shrink-0 opacity-0 group-hover:opacity-100">
                          systemowe
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deleted section */}
        {deletedCards.length > 0 && (
          <div className="border-t border-white/8">
            <button
              onClick={() => setShowDeleted(v => !v)}
              className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold text-slate-500 hover:text-white hover:bg-white/3 transition-all"
            >
              <span className="flex items-center gap-2">
                <Icons.Trash2 size={13} />
                Usunięte słowa ({deletedCards.length})
              </span>
              {showDeleted ? <Icons.ChevronUp size={13} /> : <Icons.ChevronDown size={13} />}
            </button>

            {showDeleted && (
              <div className="max-h-60 overflow-y-auto divide-y divide-white/5 bg-rose-500/3">
                {deletedCards.map(card => (
                  <div key={card.id} className="group flex items-center gap-3 px-5 py-2.5 hover:bg-white/3 transition-colors">
                    <div className="flex-grow grid grid-cols-2 gap-x-4 min-w-0 opacity-50">
                      <span className="text-sm font-bold text-white truncate line-through">{card.english}</span>
                      <span className="text-sm text-slate-400 truncate">{card.polish}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => handleRestore(card)}
                        className="p-1.5 hover:bg-emerald-500/15 hover:text-emerald-400 rounded-lg text-slate-500 transition-all"
                        title="Przywróć"
                      >
                        <Icons.RotateCcw size={13} />
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(card)}
                        className="p-1.5 hover:bg-rose-500/15 hover:text-rose-400 rounded-lg text-slate-500 transition-all"
                        title="Usuń na stałe"
                      >
                        <Icons.X size={13} />
                      </button>
                    </div>
                    <span className="text-[9px] text-slate-700 shrink-0 hidden sm:block">
                      {new Date(card.deletedAt).toLocaleDateString("pl-PL")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-white/2">
          <p className="text-[10px] text-slate-600 font-semibold">
            {filtered.length !== activeCards.length
              ? `Wyniki: ${filtered.length} z ${activeCards.length}`
              : `${activeCards.length} słów w talii`}
          </p>
          <button onClick={onClose} className="btn text-xs py-2 px-4 text-slate-400">
            Zamknij
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white font-bold shadow-2xl z-[300] animate-slide-in">
          {toast}
        </div>
      )}
    </div>
  );
}

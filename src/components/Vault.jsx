import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { vaultDecks } from '../data/vaultDecks.js';

export default function Vault({ onSelectDeck }) {
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  const toggleDeck = (deckId) => {
    setExpandedDeckId(prev => prev === deckId ? null : deckId);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in pb-32">
      <header className="mb-8">
        <h1 className="text-3xl font-black mb-2 text-[var(--text-primary)]">Magazyn 📦</h1>
        <p className="text-[var(--text-secondary)]">Witaj w magazynie! To miejsce widoczne tylko dla Ciebie. Tutaj przechowywane są talie wygenerowane automatycznie, które czekają na publikację. Przejrzyj je i daj znać, gdy zechcesz je opublikować w głównej bazie.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vaultDecks.map(deck => (
          <div key={deck.id} className="glass-card p-6 flex flex-col hover:border-[var(--primary)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{deck.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{deck.description}</p>
              </div>
              <span className="badge badge-primary">{deck.cards.length} fiszek</span>
            </div>
            
            <div className="mt-auto pt-4 border-t border-[var(--border-light)] flex gap-2">
              <button 
                onClick={() => toggleDeck(deck.id)}
                className="btn btn-secondary flex-1 py-2 flex items-center justify-center gap-2"
              >
                {expandedDeckId === deck.id ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />}
                {expandedDeckId === deck.id ? "Ukryj słówka" : "Podgląd słówek"}
              </button>
              <button 
                onClick={() => onSelectDeck(deck)}
                className="btn btn-primary flex-1 py-2 flex items-center justify-center gap-2"
              >
                <Icons.Play size={16} /> Rozpocznij naukę
              </button>
            </div>

            {expandedDeckId === deck.id && (
              <div className="mt-4 space-y-2 border-t border-[var(--border-light)] pt-4 max-h-60 overflow-y-auto custom-scrollbar">
                {deck.cards.map(card => (
                  <div key={card.id} className="p-3 bg-[var(--bg-input)] rounded-lg text-sm">
                    <div className="font-bold text-[var(--text-primary)]">{card.english} <span className="text-[var(--primary)] font-normal text-xs">{card.pronunciation}</span></div>
                    <div className="text-[var(--text-secondary)]">{card.polish}</div>
                    <div className="text-xs mt-2 italic text-[var(--text-secondary)] opacity-70">"{card.exampleEnglish}"</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

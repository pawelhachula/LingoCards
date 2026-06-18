const fs = require('fs');

(async () => {
  try {
    let jsContent = fs.readFileSync('./src/data/defaultDecks.js', 'utf-8');
    let jsModified = jsContent.replace(/export const defaultDecks/g, 'module.exports.defaultDecks')
                           .replace(/export default/g, 'module.exports.default');
    fs.writeFileSync('./tempDecks_dup.cjs', jsModified);

    const { defaultDecks } = require('./tempDecks_dup.cjs');
    let originalCards = [];
    defaultDecks.forEach(deck => {
       deck.cards.forEach(card => {
           originalCards.push({
               deckId: deck.id,
               cardId: card.id,
               english: card.english,
               polish: card.polish,
               exampleEnglish: card.exampleEnglish,
               examplePolish: card.examplePolish,
               type: deck.type
           });
       });
    });

    const seenEnglish = {};
    const duplicates = [];
    originalCards.forEach(card => {
        const en = card.english.toLowerCase().trim();
        if (seenEnglish[en]) {
            duplicates.push(card);
        } else {
            seenEnglish[en] = true;
        }
    });

    const flashcardDups = duplicates.filter(c => c.type !== 'idioms').length;
    const idiomDups = duplicates.filter(c => c.type === 'idioms').length;
    
    console.log(`Duplicates: Flashcards: ${flashcardDups}, Idioms: ${idiomDups}, Total: ${duplicates.length}`);
    duplicates.forEach(d => console.log(`Dup: ${d.english} (${d.type})`));
    
    fs.unlinkSync('./tempDecks_dup.cjs');
  } catch (e) {
    console.error(e);
  }
})();

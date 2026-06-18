const fs = require('fs');

(async () => {
  try {
    let jsContent = fs.readFileSync('./src/data/defaultDecks.js', 'utf-8');
    let jsModified = jsContent.replace(/export const defaultDecks/g, 'module.exports.defaultDecks')
                           .replace(/export default/g, 'module.exports.default');
    fs.writeFileSync('./tempDecks_rm.cjs', jsModified);

    // This will give us the fully mapped decks, but we want to regenerate the raw arrays if possible.
    // Actually, we can just extract the full array and rewrite the file completely.
    const { defaultDecks } = require('./tempDecks_rm.cjs');
    
    let seenEnglish = new Set();
    let removedCount = 0;
    
    // We rebuild the defaultDecks structure
    const newDecks = defaultDecks.map(deck => {
        const newCards = [];
        (deck.cards || []).forEach(card => {
            const en = card.english.toLowerCase().trim();
            if (!seenEnglish.has(en)) {
                seenEnglish.add(en);
                // remove runtime added properties so we don't hardcode them
                const { type, isPremium, level, ...restCard } = card; 
                newCards.push(restCard);
            } else {
                removedCount++;
            }
        });
        
        // Remove runtime added properties from deck
        const { type, isPremium, cards, ...restDeck } = deck;
        return {
            ...restDeck,
            cards: newCards
        };
    });

    // Now write the new file
    let newFileContent = `const rawDefaultDecks = ${JSON.stringify(newDecks, null, 2)};\n\n`;
    newFileContent += `const counts = {};\n`;
    newFileContent += `export const defaultDecks = rawDefaultDecks.map(deck => {\n`;
    newFileContent += `  const isIdiomsDeck = deck.id === "idioms-c2" || deck.id.startsWith("idioms");\n`;
    newFileContent += `  const type = isIdiomsDeck ? "idioms" : "vocabulary";\n`;
    newFileContent += `  const level = deck.level;\n`;
    newFileContent += `  \n`;
    newFileContent += `  let isPremium = false;\n`;
    newFileContent += `  if (level === "C1" || level === "C2") {\n`;
    newFileContent += `    isPremium = true;\n`;
    newFileContent += `  } else if (level === "B1" || level === "B2") {\n`;
    newFileContent += `    const key = \`\${level}-\${type}\`;\n`;
    newFileContent += `    counts[key] = (counts[key] || 0) + 1;\n`;
    newFileContent += `    if (counts[key] > 2) {\n`;
    newFileContent += `      isPremium = true;\n`;
    newFileContent += `    }\n`;
    newFileContent += `  }\n\n`;
    newFileContent += `  const cards = (deck.cards || []).map(card => ({\n`;
    newFileContent += `    ...card,\n`;
    newFileContent += `    level: deck.level,\n`;
    newFileContent += `    isPremium\n`;
    newFileContent += `  }));\n\n`;
    newFileContent += `  return {\n`;
    newFileContent += `    ...deck,\n`;
    newFileContent += `    cards,\n`;
    newFileContent += `    type,\n`;
    newFileContent += `    isPremium\n`;
    newFileContent += `  };\n`;
    newFileContent += `});\n`;

    fs.writeFileSync('./src/data/defaultDecks.js', newFileContent, 'utf-8');
    console.log(`Usunięto ${removedCount} duplikatów i zaktualizowano defaultDecks.js`);

    fs.unlinkSync('./tempDecks_rm.cjs');
  } catch (e) {
    console.error(e);
  }
})();

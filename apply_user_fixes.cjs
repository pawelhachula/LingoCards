const fs = require('fs');

(async () => {
  try {
    const userText = fs.readFileSync('Baza_Slowek_LingoCards_poprawione_tlumaczenia.txt', 'utf-8');

    const cardsFromUser = {};
    const regex = /(\d+)\.\s*EN:\s*(.*?)\r?\n\s*PL:\s*(.*?)(?:\r?\n\s*Przykład:\s*(.*?)\s*->\s*(.*?))?(?=\r?\n\d+\.\s*EN:|\r?\n===|$)/gs;
    
    let match;
    while ((match = regex.exec(userText)) !== null) {
       const en = match[2].trim().toLowerCase();
       cardsFromUser[en] = {
           english: match[2].trim(),
           polish: match[3].trim(),
           exampleEnglish: match[4] ? match[4].trim() : null,
           examplePolish: match[5] ? match[5].trim() : null
       };
    }
    console.log(`Parsed ${Object.keys(cardsFromUser).length} distinct cards from user file.`);

    let jsContent = fs.readFileSync('./src/data/defaultDecks.js', 'utf-8');
    let jsModified = jsContent.replace(/export const defaultDecks/g, 'module.exports.defaultDecks')
                           .replace(/export default/g, 'module.exports.default');
    fs.writeFileSync('./tempDecks_apply.cjs', jsModified);

    const { defaultDecks } = require('./tempDecks_apply.cjs');
    
    let updatedCount = 0;
    
    const newDecks = defaultDecks.map(deck => {
        const newCards = (deck.cards || []).map(card => {
            const enKey = card.english.toLowerCase().trim();
            const userCard = cardsFromUser[enKey];
            
            const { type, isPremium, level, ...restCard } = card;
            
            if (userCard) {
                let changed = false;
                if (restCard.polish !== userCard.polish) { restCard.polish = userCard.polish; changed = true; }
                if (restCard.exampleEnglish !== userCard.exampleEnglish && userCard.exampleEnglish) { restCard.exampleEnglish = userCard.exampleEnglish; changed = true; }
                if (restCard.examplePolish !== userCard.examplePolish && userCard.examplePolish) { restCard.examplePolish = userCard.examplePolish; changed = true; }
                
                if (changed) {
                    updatedCount++;
                }
            }
            return restCard;
        });
        
        const { type, isPremium, cards, ...restDeck } = deck;
        return {
            ...restDeck,
            cards: newCards
        };
    });

    if (updatedCount > 0) {
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
        console.log(`Applied ${updatedCount} corrections to defaultDecks.js!`);
    } else {
        console.log("No differences found.");
    }
    
    fs.unlinkSync('./tempDecks_apply.cjs');
  } catch (e) {
    console.error(e);
  }
})();

const fs = require('fs');
const pdfParse = require('pdf-parse');

(async () => {
  try {
    const dataBuffer = fs.readFileSync('C:/Users/PawełHachuła/.gemini/antigravity/brain/ecf3edbe-241c-4370-aac4-c983c4cd1281/media__1781245381166.pdf');
    const data = await pdfParse(dataBuffer);
    const pdfText = data.text;

    const cardsFromPdf = [];
    const regex = /(\d+)\.\s*EN:\s*(.*?)\n\s*PL:\s*(.*?)(?:\n\s*Przykład:\s*(.*?)\s*->\s*(.*?))?(?=\n\d+\.\s*EN:|\n===|$)/gs;
    
    let match;
    while ((match = regex.exec(pdfText)) !== null) {
       cardsFromPdf.push({
           index: parseInt(match[1]),
           english: match[2].trim().replace(/\n/g, ' '),
           polish: match[3].trim().replace(/\n/g, ' '),
           exampleEnglish: match[4] ? match[4].trim().replace(/\n/g, ' ') : null,
           examplePolish: match[5] ? match[5].trim().replace(/\n/g, ' ') : null
       });
    }
    console.log(`Parsed ${cardsFromPdf.length} cards from PDF.`);

    let jsContent = fs.readFileSync('./src/data/defaultDecks.js', 'utf-8');
    let jsModified = jsContent.replace(/export const defaultDecks/g, 'module.exports.defaultDecks')
                           .replace(/export default/g, 'module.exports.default');
    fs.writeFileSync('./tempDecks2.cjs', jsModified);

    const { defaultDecks } = require('./tempDecks2.cjs');
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

    console.log(`Loaded ${originalCards.length} cards from defaultDecks.js`);

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

    let updatedCount = 0;
    const len = Math.min(originalCards.length, cardsFromPdf.length);
    for (let i=0; i<len; i++) {
       const orig = originalCards[i];
       const pdf = cardsFromPdf.find(c => c.index === (i + 1));
       if (!pdf) continue;

       const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

       if (orig.english !== pdf.english || orig.polish !== pdf.polish || orig.exampleEnglish !== pdf.exampleEnglish || orig.examplePolish !== pdf.examplePolish) {
           let e1 = orig.english;
           let p1 = orig.polish;
           let ee1 = orig.exampleEnglish || "";
           let ep1 = orig.examplePolish || "";

           const idRegex = new RegExp(`"id":\\s*"${escapeRegExp(orig.cardId)}"`);
           const idMatch = idRegex.exec(jsContent);
           if (idMatch) {
              const startIdx = idMatch.index;
              const endIdx = jsContent.indexOf('}', startIdx);
              let block = jsContent.substring(startIdx, endIdx);
              
              if (orig.english !== pdf.english) block = block.replace(`"english": "${e1}"`, `"english": "${pdf.english.replace(/"/g, '\\"')}"`);
              if (orig.polish !== pdf.polish) block = block.replace(`"polish": "${p1}"`, `"polish": "${pdf.polish.replace(/"/g, '\\"')}"`);
              if (orig.exampleEnglish !== pdf.exampleEnglish && orig.exampleEnglish) block = block.replace(`"exampleEnglish": "${ee1}"`, `"exampleEnglish": "${pdf.exampleEnglish.replace(/"/g, '\\"')}"`);
              if (orig.examplePolish !== pdf.examplePolish && orig.examplePolish) block = block.replace(`"examplePolish": "${ep1}"`, `"examplePolish": "${pdf.examplePolish.replace(/"/g, '\\"')}"`);

              jsContent = jsContent.substring(0, startIdx) + block + jsContent.substring(endIdx);
              updatedCount++;
           }
       }
    }
    
    if (updatedCount > 0) {
        fs.writeFileSync('./src/data/defaultDecks.js', jsContent, 'utf-8');
        console.log(`Applied ${updatedCount} corrections to defaultDecks.js`);
    } else {
        console.log('No corrections found or needed.');
    }

    let dupReport = `Duplikaty Fiszki: ${flashcardDups}\nDuplikaty Idiomy: ${idiomDups}\nCałkowita liczba duplikatów: ${duplicates.length}\n\nSzczegóły:\n`;
    duplicates.forEach(d => {
        dupReport += `- [${d.type.toUpperCase()}] "${d.english}" (Karta: ${d.cardId}, Talia: ${d.deckId})\n`;
    });
    fs.writeFileSync('./duplicates_report.txt', dupReport, 'utf-8');
    
    fs.unlinkSync('./tempDecks2.cjs');
  } catch (e) {
    console.error(e);
  }
})();

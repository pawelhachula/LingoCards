const fs = require('fs');

(async () => {
  try {
    const pdfText = fs.readFileSync('pdf_text_correct.txt', 'utf-8');

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
    fs.writeFileSync('./tempDecks_correct.cjs', jsModified);

    const { defaultDecks } = require('./tempDecks_correct.cjs');
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

    let updatedCount = 0;
    const len = Math.min(originalCards.length, cardsFromPdf.length);
    let logMsg = "";
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
              
              let changed = false;
              if (orig.english !== pdf.english) {
                  block = block.replace(`"english": "${e1}"`, `"english": "${pdf.english.replace(/"/g, '\\"')}"`);
                  logMsg += `Changed EN: [${e1}] -> [${pdf.english}]\n`;
                  changed = true;
              }
              if (orig.polish !== pdf.polish) {
                  block = block.replace(`"polish": "${p1}"`, `"polish": "${pdf.polish.replace(/"/g, '\\"')}"`);
                  logMsg += `Changed PL: [${p1}] -> [${pdf.polish}]\n`;
                  changed = true;
              }
              if (orig.exampleEnglish !== pdf.exampleEnglish && orig.exampleEnglish) {
                  block = block.replace(`"exampleEnglish": "${ee1}"`, `"exampleEnglish": "${pdf.exampleEnglish.replace(/"/g, '\\"')}"`);
                  logMsg += `Changed ExEN: [${ee1}] -> [${pdf.exampleEnglish}]\n`;
                  changed = true;
              }
              if (orig.examplePolish !== pdf.examplePolish && orig.examplePolish) {
                  block = block.replace(`"examplePolish": "${ep1}"`, `"examplePolish": "${pdf.examplePolish.replace(/"/g, '\\"')}"`);
                  logMsg += `Changed ExPL: [${ep1}] -> [${pdf.examplePolish}]\n`;
                  changed = true;
              }

              if (changed) {
                  jsContent = jsContent.substring(0, startIdx) + block + jsContent.substring(endIdx);
                  updatedCount++;
              }
           }
       }
    }
    
    if (updatedCount > 0) {
        fs.writeFileSync('./src/data/defaultDecks.js', jsContent, 'utf-8');
        console.log(`Applied ${updatedCount} corrections to defaultDecks.js`);
        console.log("Changes:");
        console.log(logMsg);
    } else {
        console.log('No corrections found or needed.');
    }

    fs.unlinkSync('./tempDecks_correct.cjs');
  } catch (e) {
    console.error(e);
  }
})();

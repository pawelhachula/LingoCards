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

    let jsContent = fs.readFileSync('./src/data/defaultDecks.js', 'utf-8');
    let jsModified = jsContent.replace(/export const defaultDecks/g, 'module.exports.defaultDecks')
                           .replace(/export default/g, 'module.exports.default');
    fs.writeFileSync('./tempDecks_diff.cjs', jsModified);

    const { defaultDecks } = require('./tempDecks_diff.cjs');
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

    let realDiffs = 0;
    const len = Math.min(originalCards.length, cardsFromPdf.length);
    let logMsg = "";
    
    const isRealChange = (origStr, pdfStr) => {
        if (!origStr && !pdfStr) return false;
        if (!origStr) return true;
        if (!pdfStr) return false; // maybe PDF truncated entirely?
        if (origStr === pdfStr) return false;
        // Ignore if PDF is just a prefix of original due to line wrap/cutoff
        if (origStr.startsWith(pdfStr)) return false; 
        return true;
    };

    for (let i=0; i<len; i++) {
       const orig = originalCards[i];
       const pdf = cardsFromPdf.find(c => c.index === (i + 1));
       if (!pdf) continue;

       const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

       let changed = false;
       let e1 = orig.english; let p1 = orig.polish; let ee1 = orig.exampleEnglish || ""; let ep1 = orig.examplePolish || "";
       let p_e1 = pdf.english; let p_p1 = pdf.polish; let p_ee1 = pdf.exampleEnglish || ""; let p_ep1 = pdf.examplePolish || "";

       if (isRealChange(e1, p_e1) || isRealChange(p1, p_p1) || isRealChange(ee1, p_ee1) || isRealChange(ep1, p_ep1)) {
           const idRegex = new RegExp(`"id":\\s*"${escapeRegExp(orig.cardId)}"`);
           const idMatch = idRegex.exec(jsContent);
           if (idMatch) {
              const startIdx = idMatch.index;
              const endIdx = jsContent.indexOf('}', startIdx);
              let block = jsContent.substring(startIdx, endIdx);
              
              if (isRealChange(e1, p_e1)) {
                  block = block.replace(`"english": "${e1}"`, `"english": "${p_e1.replace(/"/g, '\\"')}"`);
                  logMsg += `Real Change EN: [${e1}] -> [${p_e1}]\n`;
                  changed = true;
              }
              if (isRealChange(p1, p_p1)) {
                  block = block.replace(`"polish": "${p1}"`, `"polish": "${p_p1.replace(/"/g, '\\"')}"`);
                  logMsg += `Real Change PL: [${p1}] -> [${p_p1}]\n`;
                  changed = true;
              }
              if (isRealChange(ee1, p_ee1) && orig.exampleEnglish) {
                  block = block.replace(`"exampleEnglish": "${ee1}"`, `"exampleEnglish": "${p_ee1.replace(/"/g, '\\"')}"`);
                  logMsg += `Real Change ExEN: [${ee1}] -> [${p_ee1}]\n`;
                  changed = true;
              }
              if (isRealChange(ep1, p_ep1) && orig.exampleEnglish) {
                  block = block.replace(`"examplePolish": "${ep1}"`, `"examplePolish": "${p_ep1.replace(/"/g, '\\"')}"`);
                  logMsg += `Real Change ExPL: [${ep1}] -> [${p_ep1}]\n`;
                  changed = true;
              }

              if (changed) {
                  jsContent = jsContent.substring(0, startIdx) + block + jsContent.substring(endIdx);
                  realDiffs++;
              }
           }
       }
    }
    
    if (realDiffs > 0) {
        fs.writeFileSync('./src/data/defaultDecks.js', jsContent, 'utf-8');
        console.log(`Applied ${realDiffs} REAL corrections to defaultDecks.js`);
        console.log("Changes:");
        console.log(logMsg);
    } else {
        console.log('No real corrections found.');
    }

    fs.unlinkSync('./tempDecks_diff.cjs');
  } catch (e) {
    console.error(e);
  }
})();

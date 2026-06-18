import fs from 'fs';
import pdfParse from 'pdf-parse';

(async () => {
  try {
    const dataBuffer = fs.readFileSync('C:/Users/PawełHachuła/.gemini/antigravity/brain/ecf3edbe-241c-4370-aac4-c983c4cd1281/media__1781245381166.pdf');
    const data = await pdfParse(dataBuffer);
    const pdfText = data.text;

    const cardsFromPdf = [];
    // The regex handles page breaks potentially breaking the structure, though usually pdfParse just adds newlines.
    // It looks for a number followed by . EN:
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

    const { defaultDecks } = await import('./tempDecks2.cjs');
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

    // Find duplicates
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

    // Apply updates
    let updatedCount = 0;
    // We only update up to the min length, they should map 1:1
    const len = Math.min(originalCards.length, cardsFromPdf.length);
    for (let i=0; i<len; i++) {
       const orig = originalCards[i];
       // PDF might skip numbers or something, so we rely on the 1:1 order if it aligns
       // Actually cardsFromPdf might be missing some if regex failed to match. 
       // Let's match by index if possible:
       const pdf = cardsFromPdf.find(c => c.index === (i + 1));
       if (!pdf) continue;

       // Escape function for regex string replacement
       const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

       if (orig.english !== pdf.english || orig.polish !== pdf.polish || orig.exampleEnglish !== pdf.exampleEnglish || orig.examplePolish !== pdf.examplePolish) {
           
           // We'll do a simple replace in the file for this exact block.
           // Since JSON strings in the file might have escaped characters, we assume simple strings for now.
           let e1 = orig.english;
           let p1 = orig.polish;
           let ee1 = orig.exampleEnglish || "";
           let ep1 = orig.examplePolish || "";

           // Find the specific card block to prevent accidental global replaces
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

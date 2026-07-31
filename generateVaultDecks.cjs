const fs = require('fs');

// Read PDF idioms
const pdfContent = fs.readFileSync('scratch/idioms_ocr.txt', 'utf8');
const lines = pdfContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

// Read our database
const dbContent = fs.readFileSync('src/data/defaultDecks.js', 'utf8');
const englishMatches = [...dbContent.matchAll(/"english":\s*"([^"]+)"/g)];
const dbIdioms = englishMatches.map(m => m[1].trim().toLowerCase().replace(/[.,!?;:]/g, ''));

const unmatchedItems = [];

for (const line of lines) {
    let found = false;
    for (const dbIdiom of dbIdioms) {
        const cleanLine = line.toLowerCase().replace(/[.,!?;:]/g, '');
        if (cleanLine.startsWith(dbIdiom + ' ') || cleanLine === dbIdiom) {
            found = true;
            break;
        }
    }
    
    if (!found) {
        // Extract idiom and meaning
        const match = line.match(/^([^A-Z]+[a-z\s'-]*)\s+([A-Z].*)$/);
        if (match) {
            unmatchedItems.push({
                idiom: match[1].trim(),
                meaning: match[2].trim()
            });
        } else {
            const firstCap = line.search(/[A-Z]/);
            if (firstCap > 0) {
                unmatchedItems.push({
                    idiom: line.substring(0, firstCap).trim(),
                    meaning: line.substring(firstCap).trim()
                });
            } else {
                unmatchedItems.push({ idiom: line, meaning: "Meaning not found" });
            }
        }
    }
}

// Now we have 269 items (approx). Group them into 20 decks.
const totalDecks = 20;
const deckSize = Math.ceil(unmatchedItems.length / totalDecks);
const vaultDecks = [];

for (let i = 0; i < totalDecks; i++) {
    const startIndex = i * deckSize;
    if (startIndex >= unmatchedItems.length) break;
    const chunk = unmatchedItems.slice(startIndex, startIndex + deckSize);
    
    const deck = {
        id: `vault-idioms-${i + 1}`,
        title: `Magazyn: Idiomy Część ${i + 1}`,
        description: `Nowa paczka idiomów do nauki. Talia przygotowana w magazynie.`,
        level: "B2-C1",
        tags: ["Idiomy", "Magazyn", "Nowe"],
        cards: chunk.map((item, index) => {
            // Capitalize first letter of idiom
            const eng = item.idiom.charAt(0).toUpperCase() + item.idiom.slice(1);
            return {
                id: `v-idm-${i + 1}-${index + 1}`,
                english: eng,
                polish: "[Tłumaczenie do wygenerowania]",
                pronunciation: "/.../",
                partOfSpeech: "idiom",
                exampleEnglish: `Definition: ${item.meaning}`,
                examplePolish: "[Przykładowe zdanie do wygenerowania]"
            };
        })
    };
    
    vaultDecks.push(deck);
}

const fileContent = `// TALIĘ Z MAGAZYNU (VAULT)
// Plik wygenerowany automatycznie. Przechowuje przygotowane talie,
// które są widoczne tylko w zakładce Magazyn dla Admina.

export const vaultDecks = ${JSON.stringify(vaultDecks, null, 2)};
`;

fs.writeFileSync('src/data/vaultDecks.js', fileContent, 'utf8');
console.log(`Generated src/data/vaultDecks.js with ${vaultDecks.length} decks containing ${unmatchedItems.length} idioms.`);

const fs = require('fs');

// Read our database
const dbContent = fs.readFileSync('../src/data/defaultDecks.js', 'utf8');
// Simple regex to extract all "english" fields
const englishMatches = [...dbContent.matchAll(/"english":\s*"([^"]+)"/g)];
const dbIdioms = englishMatches.map(m => m[1].trim().toLowerCase().replace(/[.,!?;:]/g, ''));

console.log(`Loaded ${dbIdioms.length} English phrases from DB.`);

// Read PDF idioms
const pdfContent = fs.readFileSync('idioms_ocr.txt', 'utf8');
const lines = pdfContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

let matchCount = 0;
const matchedIdioms = [];
const unmatchedIdioms = [];

for (const line of lines) {
    let found = false;
    for (const dbIdiom of dbIdioms) {
        // Some DB idioms might be "to do something", so maybe just check includes?
        // Let's do a more robust check: does the line start with the DB idiom?
        // First clean the line a bit
        const cleanLine = line.toLowerCase().replace(/[.,!?;:]/g, '');
        
        // Check exact match at the start
        // Or if the PDF idiom is exactly the DB idiom
        if (cleanLine.startsWith(dbIdiom + ' ') || cleanLine === dbIdiom) {
            found = true;
            matchedIdioms.push(dbIdiom);
            break;
        }
    }
    if (!found) {
        // Maybe try to extract the idiom part from the PDF line
        // Usually it's everything before the first capital letter that is not the first char
        const match = line.match(/^([^A-Z]+[a-z\s'-]*)/);
        if (match) {
            unmatchedIdioms.push(match[1].trim());
        } else {
            unmatchedIdioms.push(line);
        }
    } else {
        matchCount++;
    }
}

console.log(`Found ${matchCount} matches out of ${lines.length} PDF idioms.`);
fs.writeFileSync('idioms_report.md', `# Raport Idiomów\n\nPrzeanalizowano ${lines.length} idiomów z pliku PDF.\nZnaleziono **${matchCount}** powtórzeń w naszej bazie danych.\n\n## Przykładowe znalezione w naszej bazie:\n${matchedIdioms.slice(0, 20).map(i => '- ' + i).join('\n')}\n\n## Przykładowe NIEZNALEZIONE (nowe) idiomy:\n${unmatchedIdioms.slice(0, 30).map(i => '- ' + i).join('\n')}\n`);
console.log('Report saved to idioms_report.md');

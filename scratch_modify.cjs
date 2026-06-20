
const fs = require('fs');

const path = 'c:/Users/PawełHachuła/Documents/AntiG/src/data/defaultDecks.js';
let content = fs.readFileSync(path, 'utf8');

// Match the rawDefaultDecks array
const match = content.match(/const rawDefaultDecks = (\[[\s\S]*?\]);\n\nconst counts = {}/);
if (!match) {
    console.log('Array not found!');
    process.exit(1);
}

// Evaluate the array safely
let decks;
try {
    decks = eval(match[1]);
} catch (e) {
    console.log('Error evaluating array:', e);
    process.exit(1);
}

// Function to capitalize first letter
function capitalize(str) {
    if (!str) return str;
    // Don't capitalize if it's already capitalized or starts with non-letter
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let verbsModified = 0;
let capsModified = 0;

// Process decks
decks.forEach(deck => {
    if (deck.cards) {
        deck.cards.forEach(card => {
            // Check if it's a verb and doesn't start with 'to ' or 'To '
            if (card.partOfSpeech === 'verb' || card.partOfSpeech === 'czasownik') {
                if (card.english && !card.english.toLowerCase().startsWith('to ')) {
                    card.english = 'to ' + card.english;
                    verbsModified++;
                }
            }

            // Capitalize english
            if (card.english && card.english.charAt(0) !== card.english.charAt(0).toUpperCase()) {
                card.english = capitalize(card.english);
                capsModified++;
            }
            
            // Capitalize polish
            if (card.polish && card.polish.charAt(0) !== card.polish.charAt(0).toUpperCase()) {
                card.polish = capitalize(card.polish);
                capsModified++;
            }
        });
    }
});

console.log('Verbs modified:', verbsModified);
console.log('Capitalizations modified:', capsModified);

// Serialize back
const newArrayString = JSON.stringify(decks, null, 2);

// Replace in content
const newContent = content.replace(match[1], newArrayString);
fs.writeFileSync(path, newContent);
console.log('Done.');

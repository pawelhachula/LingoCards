const fs = require('fs');

const phrasesDecks = require('./phrases.json');

let content = fs.readFileSync('c:/Users/PawełHachuła/Documents/AntiG/src/data/defaultDecks.js', 'utf8');

if (!content.includes('];')) {
    console.log('Could not find the end of the array');
    process.exit(1);
}

let stringToAdd = JSON.stringify(phrasesDecks, null, 2);
stringToAdd = stringToAdd.substring(1, stringToAdd.length - 1); 
stringToAdd = ',\n' + stringToAdd.trim();

content = content.replace('];', stringToAdd + '\n];');

fs.writeFileSync('c:/Users/PawełHachuła/Documents/AntiG/src/data/defaultDecks.js', content);
console.log('Successfully appended phrase decks.');

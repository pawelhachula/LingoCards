const rawDefaultDecks = [
  {
    "id": "everyday-a1",
    "title": "Survival English (A1)",
    "polishTitle": "Angielski przetrwania",
    "category": "everyday",
    "level": "A1",
    "description": "Essential beginner phrases for greetings, saying thank you, and introducing yourself.",
    "icon": "Smile",
    "color": "#10b981",
    "cards": [
      {
        "id": "everyday-a1-1",
        "english": "Hello",
        "polish": "Witaj / Cześć",
        "pronunciation": "/həˈloʊ/",
        "partOfSpeech": "exclamation",
        "exampleEnglish": "Hello! How are you doing today?",
        "examplePolish": "Witaj! Jak się dziś miewasz?"
      },
      {
        "id": "everyday-a1-2",
        "english": "Thank you",
        "polish": "Dziękuję",
        "pronunciation": "/ˈθæŋk juː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Thank you for helping me with my luggage.",
        "examplePolish": "Dziękuję za pomoc z moim bagażem."
      },
      {
        "id": "everyday-a1-3",
        "english": "Nice to meet you",
        "polish": "Miło cię poznać",
        "pronunciation": "/naɪs tuː miːt juː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "My name is John. Nice to meet you!",
        "examplePolish": "Nazywam się John. Miło cię poznać!"
      },
      {
        "id": "everyday-a1-4",
        "english": "Please",
        "polish": "Proszę (o coś)",
        "pronunciation": "/pliːz/",
        "partOfSpeech": "adverb",
        "exampleEnglish": "Could you pass the salt, please?",
        "examplePolish": "Czy mógłbyś podać sól, proszę?"
      },
      {
        "id": "everyday-a1-5",
        "english": "Excuse me",
        "polish": "Przepraszam (zwracając uwagę)",
        "pronunciation": "/ɪkˈskjuːz miː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Excuse me, where is the nearest metro station?",
        "examplePolish": "Przepraszam, gdzie jest najbliższa stacja metra?"
      },
      {
        "id": "everyday-a1-6",
        "english": "Goodbye",
        "polish": "Do widzenia / Pożegnanie",
        "pronunciation": "/ˌɡʊdˈbaɪ/",
        "partOfSpeech": "exclamation",
        "exampleEnglish": "It is late, so I must say goodbye now.",
        "examplePolish": "Jest późno, więc muszę się już pożegnać."
      },
      {
        "id": "everyday-a1-7",
        "english": "How are you?",
        "polish": "Jak się masz?",
        "pronunciation": "/haʊ ɑːr juː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "How are you? I haven't seen you in weeks.",
        "examplePolish": "Jak się masz? Nie widziałem cię od tygodni."
      },
      {
        "id": "everyday-a1-8",
        "english": "My name is...",
        "polish": "Nazywam się...",
        "pronunciation": "/maɪ neɪm ɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "My name is Peter and I am from Poland.",
        "examplePolish": "Nazywam się Peter i jestem z Polski."
      },
      {
        "id": "everyday-a1-9",
        "english": "Where is...?",
        "polish": "Gdzie jest...?",
        "pronunciation": "/wer ɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Where is the bathroom, please?",
        "examplePolish": "Gdzie jest łazienka, proszę?"
      },
      {
        "id": "everyday-a1-10",
        "english": "Help",
        "polish": "Pomoc / Pomocy",
        "pronunciation": "/help/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I need help with this exercise.",
        "examplePolish": "Potrzebuję pomocy z tym ćwiczeniem."
      },
      {
        "id": "everyday-a1-11",
        "english": "Friend",
        "polish": "Przyjaciel / Kolega",
        "pronunciation": "/frend/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is my best friend from school.",
        "examplePolish": "Ona jest moją najlepszą przyjaciółką ze szkoły."
      },
      {
        "id": "everyday-a1-12",
        "english": "Family",
        "polish": "Rodzina",
        "pronunciation": "/ˈfæm.əl.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We have a big family.",
        "examplePolish": "Mamy dużą rodzinę."
      },
      {
        "id": "everyday-a1-13",
        "english": "House",
        "polish": "Dom (budynek)",
        "pronunciation": "/haʊs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They live in a beautiful house.",
        "examplePolish": "Mieszkają w pięknym domu."
      },
      {
        "id": "everyday-a1-14",
        "english": "Car",
        "polish": "Samochód",
        "pronunciation": "/kɑːr/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My father bought a new red car.",
        "examplePolish": "Mój ojciec kupił nowy czerwony samochód."
      },
      {
        "id": "everyday-a1-15",
        "english": "School",
        "polish": "Szkoła",
        "pronunciation": "/skuːl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Children go to school to learn.",
        "examplePolish": "Dzieci chodzą do szkoły, aby się uczyć."
      },
      {
        "id": "everyday-a1-16",
        "english": "Book",
        "polish": "Książka",
        "pronunciation": "/bʊk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I finished reading the book today.",
        "examplePolish": "Skończyłem dzisiaj czytać tę książkę."
      },
      {
        "id": "everyday-a1-17",
        "english": "Dog",
        "polish": "Pies",
        "pronunciation": "/dɔːɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The dog is barking in the garden.",
        "examplePolish": "Pies szczeka w ogrodzie."
      },
      {
        "id": "everyday-a1-18",
        "english": "Cat",
        "polish": "Kot",
        "pronunciation": "/kæt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A black cat is sleeping on the sofa.",
        "examplePolish": "Czarny kot śpi na sofie."
      },
      {
        "id": "everyday-a1-19",
        "english": "Water",
        "polish": "Woda",
        "pronunciation": "/ˈwɔː.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Can I have a glass of water?",
        "examplePolish": "Czy mogę prosić o szklankę wody?"
      },
      {
        "id": "everyday-a1-20",
        "english": "Food",
        "polish": "Jedzenie",
        "pronunciation": "/fuːd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to buy some food.",
        "examplePolish": "Musimy kupić trochę jedzenia."
      },
      {
        "id": "everyday-a1-21",
        "english": "Street",
        "polish": "Ulica",
        "pronunciation": "/striːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Watch out when you cross the street.",
        "examplePolish": "Uważaj, kiedy przechodzisz przez ulicę."
      },
      {
        "id": "everyday-a1-22",
        "english": "Money",
        "polish": "Pieniądze",
        "pronunciation": "/ˈmʌn.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I don't have enough money.",
        "examplePolish": "Nie mam wystarczająco dużo pieniędzy."
      },
      {
        "id": "everyday-a1-23",
        "english": "Time",
        "polish": "Czas / godzina",
        "pronunciation": "/taɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What time is it?",
        "examplePolish": "Która jest godzina?"
      },
      {
        "id": "everyday-a1-24",
        "english": "Day",
        "polish": "Dzień",
        "pronunciation": "/deɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Monday is the first day of the week.",
        "examplePolish": "Poniedziałek to pierwszy dzień tygodnia."
      },
      {
        "id": "everyday-a1-25",
        "english": "Week",
        "polish": "Tydzień",
        "pronunciation": "/wiːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I am traveling next week.",
        "examplePolish": "Wyjeżdżam w przyszłym tygodniu."
      },
      {
        "id": "everyday-a1-26",
        "english": "Month",
        "polish": "Miesiąc",
        "pronunciation": "/mʌnθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "January is the first month of the year.",
        "examplePolish": "Styczeń to pierwszy miesiąc roku."
      },
      {
        "id": "everyday-a1-27",
        "english": "Year",
        "polish": "Rok",
        "pronunciation": "/jɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Happy New Year!",
        "examplePolish": "Szczęśliwego Nowego Roku!"
      },
      {
        "id": "everyday-a1-28",
        "english": "Today",
        "polish": "Dzisiaj",
        "pronunciation": "/təˈdeɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Today is a sunny day.",
        "examplePolish": "Dzisiaj jest słoneczny dzień."
      },
      {
        "id": "everyday-a1-29",
        "english": "Tomorrow",
        "polish": "Jutro",
        "pronunciation": "/təˈmɒr.əʊ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Tomorrow is Saturday.",
        "examplePolish": "Jutro jest sobota."
      },
      {
        "id": "everyday-a1-30",
        "english": "Yesterday",
        "polish": "Wczoraj",
        "pronunciation": "/ˈjes.tə.deɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I saw him yesterday morning.",
        "examplePolish": "Widziałem go wczoraj rano."
      },
      {
        "id": "everyday-a1-31",
        "english": "Happy",
        "polish": "Szczęśliwy",
        "pronunciation": "/ˈhæp.i/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "She feels very happy about the news.",
        "examplePolish": "Ona czuje się bardzo szczęśliwa z powodu tych wieści."
      },
      {
        "id": "everyday-a1-32",
        "english": "Sad",
        "polish": "Smutny",
        "pronunciation": "/sæd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Why do you look so sad today?",
        "examplePolish": "Dlaczego wyglądasz dzisiaj na takiego smutnego?"
      },
      {
        "id": "everyday-a1-33",
        "english": "Good",
        "polish": "Dobry",
        "pronunciation": "/ɡʊd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This is a very good restaurant.",
        "examplePolish": "To jest bardzo dobra restauracja."
      },
      {
        "id": "everyday-a1-34",
        "english": "Bad",
        "polish": "Zły / Niedobry",
        "pronunciation": "/bæd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Eating too much sugar is bad for you.",
        "examplePolish": "Jedzenie zbyt dużej ilości cukru jest dla ciebie złe."
      },
      {
        "id": "everyday-a1-35",
        "english": "Hot",
        "polish": "Gorący",
        "pronunciation": "/hɒt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Be careful, the soup is very hot.",
        "examplePolish": "Uważaj, ta zupa jest bardzo gorąca."
      },
      {
        "id": "everyday-a1-36",
        "english": "Cold",
        "polish": "Przeziębienie",
        "pronunciation": "/kəʊld/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Drink warm tea when you have a cold.",
        "examplePolish": "Pij ciepłą herbatę, kiedy masz przeziębienie."
      },
      {
        "id": "everyday-a1-37",
        "english": "Big",
        "polish": "Duży",
        "pronunciation": "/bɪɡ/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "London is a very big city.",
        "examplePolish": "Londyn to bardzo duże miasto."
      },
      {
        "id": "everyday-a1-38",
        "english": "Small",
        "polish": "Mały",
        "pronunciation": "/smɔːl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Our apartment is cozy but small.",
        "examplePolish": "Nasze mieszkanie jest przytulne, ale małe."
      },
      {
        "id": "everyday-a1-39",
        "english": "New",
        "polish": "Nowy",
        "pronunciation": "/njuː/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "He wore his new shoes to the party.",
        "examplePolish": "Założył swoje nowe buty na imprezę."
      },
      {
        "id": "everyday-a1-40",
        "english": "Old",
        "polish": "Stary",
        "pronunciation": "/əʊld/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This old castle was built in the 12th century.",
        "examplePolish": "Ten stary zamek został zbudowany w XII wieku."
      },
      {
        "id": "everyday-a1-41",
        "english": "Open",
        "polish": "Otwarty",
        "pronunciation": "/ˈəʊ.pən/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Is the shop open on Sundays?",
        "examplePolish": "Czy sklep jest otwarty w niedziele?"
      },
      {
        "id": "everyday-a1-42",
        "english": "To Close",
        "polish": "Zamykać / Zamknąć",
        "pronunciation": "/kləʊz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Please close the door behind you.",
        "examplePolish": "Proszę, zamknij za sobą drzwi."
      },
      {
        "id": "everyday-a1-43",
        "english": "To Read",
        "polish": "Czytać",
        "pronunciation": "/riːd/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I like to read novels before sleeping.",
        "examplePolish": "Lubię czytać powieści przed snem."
      },
      {
        "id": "everyday-a1-44",
        "english": "To Write",
        "polish": "Pisać",
        "pronunciation": "/raɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Don't forget to write your name on the paper.",
        "examplePolish": "Nie zapomnij napisać swojego imienia na kartce."
      },
      {
        "id": "everyday-a1-45",
        "english": "To Speak",
        "polish": "Mówić / Rozmawiać",
        "pronunciation": "/spiːk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Do you speak English?",
        "examplePolish": "Czy mówisz po angielsku?"
      },
      {
        "id": "everyday-a1-46",
        "english": "To Listen",
        "polish": "Słuchać",
        "pronunciation": "/ˈlɪs.ən/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We should listen to the teacher's instructions.",
        "examplePolish": "Powinniśmy słuchać poleceń nauczyciela."
      },
      {
        "id": "everyday-a1-47",
        "english": "To Understand",
        "polish": "Rozumieć",
        "pronunciation": "/ˌʌn.dəˈstænd/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Sorry, I do not understand this word.",
        "examplePolish": "Przepraszam, nie rozumiem tego słowa."
      },
      {
        "id": "everyday-a1-48",
        "english": "To Learn",
        "polish": "Uczyć się",
        "pronunciation": "/lɜːn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I want to learn how to play the guitar.",
        "examplePolish": "Chcę się nauczyć grać na gitarze."
      },
      {
        "id": "everyday-a1-49",
        "english": "Sun",
        "polish": "Słońce",
        "pronunciation": "/sʌn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The sun rises in the east.",
        "examplePolish": "Słońce wschodzi na wschodzie."
      },
      {
        "id": "everyday-a1-50",
        "english": "Moon",
        "polish": "Księżyc",
        "pronunciation": "/muːn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The moon shines brightly tonight.",
        "examplePolish": "Księżyc świeci dziś jasno.\n\n\n--- TALIA: At the Cafe (A1) / W kawiarni (A1) ---\nOpis: Order drinks, snacks, and talk about your basic cafe preferences."
      }
    ]
  },
  {
    "id": "dining-a1",
    "title": "At the Cafe (A1)",
    "polishTitle": "W kawiarni",
    "category": "dining",
    "level": "A1",
    "description": "Order drinks, snacks, and talk about your basic cafe preferences.",
    "icon": "Coffee",
    "color": "#f59e0b",
    "cards": [
      {
        "id": "dining-a1-1",
        "english": "Coffee",
        "polish": "Kawa",
        "pronunciation": "/ˈkɔː.fi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I would like a cup of black coffee, please.",
        "examplePolish": "Poproszę o filiżankę czarnej kawy."
      },
      {
        "id": "dining-a1-2",
        "english": "Tea",
        "polish": "Herbata",
        "pronunciation": "/tiː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She prefers green tea over English breakfast tea.",
        "examplePolish": "Ona woli zieloną herbatę od klasycznej czarnej herbaty."
      },
      {
        "id": "dining-a1-4",
        "english": "Sugar",
        "polish": "Cukier",
        "pronunciation": "/ˈʃʊɡ.ɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Do you take sugar in your coffee?",
        "examplePolish": "Czy słodzisz kawę cukrem?"
      },
      {
        "id": "dining-a1-5",
        "english": "Milk",
        "polish": "Mleko",
        "pronunciation": "/mɪlk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I put milk in my coffee.",
        "examplePolish": "Dodaję mleko do kawy."
      },
      {
        "id": "dining-a1-6",
        "english": "Cup",
        "polish": "Filiżanka / kubek",
        "pronunciation": "/kʌp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He drank a large cup of hot cocoa.",
        "examplePolish": "Wypił duży kubek gorącego kakao."
      },
      {
        "id": "dining-a1-7",
        "english": "Menu",
        "polish": "Karta dań / menu",
        "pronunciation": "/ˈmen.juː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Could we have the menu, please?",
        "examplePolish": "Czy możemy prosić o menu?"
      },
      {
        "id": "dining-a1-8",
        "english": "Bill",
        "polish": "Rachunek",
        "pronunciation": "/bɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Excuse me, can I have the bill, please?",
        "examplePolish": "Przepraszam, czy mogę prosić o rachunek?"
      },
      {
        "id": "dining-a1-9",
        "english": "Breakfast",
        "polish": "Śniadanie",
        "pronunciation": "/ˈbrek.fəst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What did you eat for breakfast today?",
        "examplePolish": "Co jadłeś dzisiaj na śniadanie?"
      },
      {
        "id": "dining-a1-10",
        "english": "Delicious",
        "polish": "Pyszny",
        "pronunciation": "/dɪˈlɪʃ.əs/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This chocolate cake is delicious!",
        "examplePolish": "To ciasto czekoladowe jest pyszne!"
      },
      {
        "id": "dining-a1-11",
        "english": "Juice",
        "polish": "Sok",
        "pronunciation": "/dʒuːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Would you like some orange juice?",
        "examplePolish": "Czy chciałbyś trochę soku pomarańczowego?"
      },
      {
        "id": "dining-a1-12",
        "english": "Beer",
        "polish": "Piwo",
        "pronunciation": "/bɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He ordered a cold bottle of beer.",
        "examplePolish": "Zamówił butelkę zimnego piwa."
      },
      {
        "id": "dining-a1-13",
        "english": "Wine",
        "polish": "Wino",
        "pronunciation": "/waɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They drank red wine during dinner.",
        "examplePolish": "Pili czerwone wino podczas kolacji."
      },
      {
        "id": "dining-a1-14",
        "english": "Bread",
        "polish": "Chleb",
        "pronunciation": "/bred/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Would you like a slice of bread?",
        "examplePolish": "Czy chciałbyś kromkę chleba?"
      },
      {
        "id": "dining-a1-15",
        "english": "Cheese",
        "polish": "Ser",
        "pronunciation": "/tʃiːz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I love pizza with extra cheese.",
        "examplePolish": "Uwielbiam pizzę z dodatkowym serem."
      },
      {
        "id": "dining-a1-16",
        "english": "Butter",
        "polish": "Masło",
        "pronunciation": "/ˈbʌt.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Spread some butter on the toast.",
        "examplePolish": "Posmaruj tost masłem."
      },
      {
        "id": "dining-a1-17",
        "english": "Egg",
        "polish": "Jajko",
        "pronunciation": "/eɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She ate a boiled egg for breakfast.",
        "examplePolish": "Zjadła gotowane jajko na śniadanie."
      },
      {
        "id": "dining-a1-18",
        "english": "Fruit",
        "polish": "Owoce",
        "pronunciation": "/fruːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Apple is my favorite fruit.",
        "examplePolish": "Jabłko to mój ulubiony owoc."
      },
      {
        "id": "dining-a1-19",
        "english": "Cake",
        "polish": "Ciasto / Tort",
        "pronunciation": "/keɪk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We baked a chocolate cake for his birthday.",
        "examplePolish": "Upiekliśmy ciasto czekoladowe na jego urodziny."
      },
      {
        "id": "dining-a1-20",
        "english": "Cookie",
        "polish": "Ciastko",
        "pronunciation": "/ˈkʊk.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He dipped the cookie into his milk.",
        "examplePolish": "Zanurzył ciastko w mleku."
      },
      {
        "id": "dining-a1-21",
        "english": "Chocolate",
        "polish": "Czekolada",
        "pronunciation": "/ˈtʃɒk.lət/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Dark chocolate is my absolute weakness.",
        "examplePolish": "Ciemna czekolada to moja absolutna słabość."
      },
      {
        "id": "dining-a1-22",
        "english": "Salt",
        "polish": "Sól",
        "pronunciation": "/sɒlt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need more salt.",
        "examplePolish": "Potrzebujemy więcej soli.\n\n\n--- TALIA: Navigating Transit (B1) / Komunikacja i transport (B1) ---\nOpis: Learn to book accommodation, buy tickets, and ask for directions."
      },
      {
        "id": "dining-a1-23",
        "english": "Pepper",
        "polish": "Pieprz",
        "pronunciation": "/ˈpep.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Black pepper gives the dish a good taste.",
        "examplePolish": "Czarny pieprz nadaje potrawie dobry smak."
      },
      {
        "id": "dining-a1-24",
        "english": "Spoon",
        "polish": "Łyżka",
        "pronunciation": "/spuːn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Use a spoon to eat the soup.",
        "examplePolish": "Użyj łyżki, aby zjeść zupę."
      },
      {
        "id": "dining-a1-25",
        "english": "Fork",
        "polish": "Widelec",
        "pronunciation": "/fɔːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He ate the salad with a fork.",
        "examplePolish": "Zjadł sałatkę widelcem."
      },
      {
        "id": "dining-a1-26",
        "english": "Knife",
        "polish": "Nóż",
        "pronunciation": "/naɪf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Be careful, this knife is very sharp.",
        "examplePolish": "Uważaj, ten nóż jest bardzo ostry."
      },
      {
        "id": "dining-a1-27",
        "english": "Plate",
        "polish": "Talerz",
        "pronunciation": "/pleɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Put the food on the plate, please.",
        "examplePolish": "Połóż jedzenie na talerzu, proszę."
      },
      {
        "id": "dining-a1-28",
        "english": "Glass",
        "polish": "Szklanka / Kieliszek",
        "pronunciation": "/ɡlɑːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She drank a glass of lemonade.",
        "examplePolish": "Wypiła szklankę lemoniady."
      },
      {
        "id": "dining-a1-29",
        "english": "Table",
        "polish": "Stół",
        "pronunciation": "/ˈteɪ.bəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The food is on the table.",
        "examplePolish": "Jedzenie jest na stole."
      },
      {
        "id": "dining-a1-30",
        "english": "Chair",
        "polish": "Krzesło",
        "pronunciation": "/tʃeər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Please sit on this chair.",
        "examplePolish": "Proszę usiąść na tym krześle."
      },
      {
        "id": "dining-a1-31",
        "english": "Waiter",
        "polish": "Kelner",
        "pronunciation": "/ˈweɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We asked the waiter for the bill.",
        "examplePolish": "Poprosiliśmy kelnera o rachunek."
      },
      {
        "id": "dining-a1-32",
        "english": "Customer",
        "polish": "Klient",
        "pronunciation": "/ˈkʌs.tə.mər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The customer is always right.",
        "examplePolish": "Klient ma zawsze rację."
      },
      {
        "id": "dining-a1-33",
        "english": "To Eat",
        "polish": "Jeść",
        "pronunciation": "/iːt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I always eat breakfast at 8 AM.",
        "examplePolish": "Zawsze jem śniadanie o 8 rano."
      },
      {
        "id": "dining-a1-34",
        "english": "To Drink",
        "polish": "Pić",
        "pronunciation": "/drɪŋk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Drink plenty of water on hot days.",
        "examplePolish": "Pij dużo wody w gorące dni."
      },
      {
        "id": "dining-a1-35",
        "english": "To Order",
        "polish": "Zamawiać",
        "pronunciation": "/ˈɔː.dər/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We are ready to order our meal.",
        "examplePolish": "Jesteśmy gotowi zamówić nasz posiłek."
      },
      {
        "id": "dining-a1-36",
        "english": "To Pay",
        "polish": "Płacić",
        "pronunciation": "/peɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "How would you like to pay tonight?",
        "examplePolish": "Jak chciałbyś dzisiaj zapłacić?"
      },
      {
        "id": "dining-a1-37",
        "english": "Cash",
        "polish": "Gotówka",
        "pronunciation": "/kæʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Do you have any cash with you?",
        "examplePolish": "Czy masz przy sobie jakąś gotówkę?"
      },
      {
        "id": "dining-a1-38",
        "english": "Card",
        "polish": "Karta (płatnicza)",
        "pronunciation": "/kɑːd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Can I pay by credit card here?",
        "examplePolish": "Czy mogę tutaj zapłacić kartą kredytową?"
      },
      {
        "id": "dining-a1-39",
        "english": "Lunch",
        "polish": "Obiad / Drugie śniadanie",
        "pronunciation": "/lʌntʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Let's meet for lunch at noon.",
        "examplePolish": "Spotkajmy się na obiad w południe."
      },
      {
        "id": "dining-a1-40",
        "english": "Dinner",
        "polish": "Kolacja / Obiadokolacja",
        "pronunciation": "/ˈdɪn.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What are we having for dinner tonight?",
        "examplePolish": "Co mamy dzisiaj na kolację?"
      },
      {
        "id": "dining-a1-41",
        "english": "Snack",
        "polish": "Przekąska",
        "pronunciation": "/snæk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I need a quick snack between classes.",
        "examplePolish": "Potrzebuję szybkiej przekąski między zajęciami."
      },
      {
        "id": "dining-a1-42",
        "english": "Sweet",
        "polish": "Słodki",
        "pronunciation": "/swiːt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I love sweet desserts.",
        "examplePolish": "Uwielbiam słodkie desery."
      },
      {
        "id": "dining-a1-44",
        "english": "Fresh",
        "polish": "Świeży",
        "pronunciation": "/freʃ/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "These vegetables are fresh from the garden.",
        "examplePolish": "Te warzywa są świeże z ogrodu."
      },
      {
        "id": "dining-a1-45",
        "english": "Tasty",
        "polish": "Smaczny",
        "pronunciation": "/ˈteɪ.sti/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This fish is very tasty.",
        "examplePolish": "Ta ryba jest bardzo smaczna."
      },
      {
        "id": "dining-a1-46",
        "english": "Hungry",
        "polish": "Głodny",
        "pronunciation": "/ˈhʌŋ.ɡri/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I am so hungry I could eat anything.",
        "examplePolish": "Jestem tak głodny, że mógłbym zjeść cokolwiek."
      },
      {
        "id": "dining-a1-47",
        "english": "Thirsty",
        "polish": "Spragniony",
        "pronunciation": "/ˈθɜː.sti/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "After running, I was extremely thirsty.",
        "examplePolish": "Po bieganiu byłem niezwykle spragniony."
      },
      {
        "id": "dining-a1-48",
        "english": "Ice",
        "polish": "Lód",
        "pronunciation": "/aɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Would you like ice in your drink?",
        "examplePolish": "Czy chciałbyś lód do swojego napoju?"
      },
      {
        "id": "dining-a1-49",
        "english": "Kitchen",
        "polish": "Kuchnia",
        "pronunciation": "/ˈkɪtʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is cooking lunch in the kitchen.",
        "examplePolish": "Ona gotuje obiad w kuchni."
      }
    ]
  },
  {
    "id": "everyday",
    "title": "Everyday English (A2)",
    "polishTitle": "Rozmówki codzienne",
    "category": "everyday",
    "level": "A2",
    "description": "Learn essential phrases and words for daily conversations.",
    "icon": "MessageSquare",
    "color": "#6366f1",
    "cards": [
      {
        "id": "everyday-1",
        "english": "Catch up",
        "polish": "Nadrobić zaległości / spotkać się po czasie",
        "pronunciation": "/kætʃ ʌp/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "We should catch up over coffee sometime next week.",
        "examplePolish": "Powinniśmy kiedyś w przyszłym tygodniu spotkać się i pogadać przy kawie."
      },
      {
        "id": "everyday-2",
        "english": "By the way",
        "polish": "Nawiasem mówiąc / przy okazji",
        "pronunciation": "/baɪ ðə weɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "By the way, did you check the weather forecast for tomorrow?",
        "examplePolish": "Przy okazji, czy sprawdziłeś prognozę pogody na jutro?"
      },
      {
        "id": "everyday-3",
        "english": "Break a leg",
        "polish": "Połamania nóg (powodzenia)",
        "pronunciation": "/breɪk ə leɡ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Go on stage and break a leg!",
        "examplePolish": "Wyjdź na scenę i połamania nóg!"
      },
      {
        "id": "everyday-4",
        "english": "Take it easy",
        "polish": "Wyluzować / odpoczywać",
        "pronunciation": "/teɪk ɪt ˈiːzi/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Just take it easy and relax after the busy week.",
        "examplePolish": "Po prostu wyluzuj i zrelaksuj się po pracowitym tygodniu."
      },
      {
        "id": "everyday-5",
        "english": "Call it a day",
        "polish": "Skończyć na dziś",
        "pronunciation": "/kɔːl ɪt ə deɪ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "We made great progress; let's call it a day.",
        "examplePolish": "Zrobiliśmy świetne postępy – skończmy na dzisiaj."
      },
      {
        "id": "everyday-6",
        "english": "Under the weather",
        "polish": "Kiepsko się czuć / nie wyraźny",
        "pronunciation": "/ˈʌndər ðə ˈweðər/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "I am feeling a bit under the weather today.",
        "examplePolish": "Czuję się dziś trochę kiepsko."
      },
      {
        "id": "everyday-7",
        "english": "Out of the blue",
        "polish": "Nagle / jak grom z jasnego nieba",
        "pronunciation": "/aʊt əv ðə bluː/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He called me out of the blue after five years.",
        "examplePolish": "Zadzwonił do mnie po pięciu latach jak grom z jasnego nieba."
      },
      {
        "id": "everyday-8",
        "english": "Keep in touch",
        "polish": "Być w kontakcie",
        "pronunciation": "/kiːp ɪn tʌtʃ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's keep in touch via email.",
        "examplePolish": "Bądźmy w kontakcie mailowym."
      },
      {
        "id": "everyday-9",
        "english": "Make up one's mind",
        "polish": "Podjąć decyzję / zdecydować się",
        "pronunciation": "/meɪk ʌp wʌnz maɪnd/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "I can't make up my mind between the blue jacket and the black one.",
        "examplePolish": "Nie mogę się zdecydować pomiędzy niebieską a czarną kurtką."
      },
      {
        "id": "everyday-10",
        "english": "Never mind",
        "polish": "Nieważne / nie przejmuj się",
        "pronunciation": "/ˈnev.ər maɪnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Never mind the mess, I will clean it up later.",
        "examplePolish": "Nie przejmuj się bałaganem, posprzątam go później."
      },
      {
        "id": "everyday-11",
        "english": "So far so good",
        "polish": "Jak na razie wszystko w porządku",
        "pronunciation": "/soʊ fɑːr soʊ ɡʊd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "How is your new project going? - So far so good.",
        "examplePolish": "Jak idzie twój nowy projekt? - Jak na razie wszystko w porządku."
      },
      {
        "id": "everyday-12",
        "english": "On purpose",
        "polish": "Celowo / specjalnie",
        "pronunciation": "/aːn ˈpɜːr.pəs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I'm sorry, I didn't break your cup on purpose.",
        "examplePolish": "Przepraszam, nie stłukłem twojego kubka specjalnie."
      },
      {
        "id": "everyday-13",
        "english": "Hit the sack",
        "polish": "Iść spać",
        "pronunciation": "/hɪt ðə sæk/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "I am very tired, I will hit the sack now.",
        "examplePolish": "Jestem bardzo zmęczony, idę teraz spać."
      },
      {
        "id": "everyday-14",
        "english": "Piece of cake",
        "polish": "Bułka z masłem (bardzo łatwe)",
        "pronunciation": "/piːs əv keɪk/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Don't worry, the exam was a piece of cake.",
        "examplePolish": "Nie martw się, egzamin był bułką z masłem."
      },
      {
        "id": "everyday-15",
        "english": "For good",
        "polish": "Na stałe / na dobre",
        "pronunciation": "/fɔːr ɡʊd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She is planning to move to Canada for good.",
        "examplePolish": "Planuje przeprowadzić się do Kanady na stałe."
      },
      {
        "id": "everyday-16",
        "english": "To put off",
        "polish": "Odkładać na później",
        "pronunciation": "/pʊt ɔːf/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "Never put off until tomorrow what you can do today.",
        "examplePolish": "Nigdy nie odkładaj na jutro tego, co możesz zrobić dzisiaj."
      },
      {
        "id": "everyday-17",
        "english": "To Shower",
        "polish": "Brać prysznic",
        "pronunciation": "/ˈʃaʊ.ər/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I always shower in the morning.",
        "examplePolish": "Zawsze biorę prysznic rano."
      },
      {
        "id": "everyday-18",
        "english": "To Dress",
        "polish": "Ubierać się",
        "pronunciation": "/dres/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Get dressed quickly, we are leaving.",
        "examplePolish": "Ubierz się szybko, wychodzimy."
      },
      {
        "id": "everyday-19",
        "english": "To Clean",
        "polish": "Sprzątać / Czyścić",
        "pronunciation": "/kliːn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We must clean the house before guests arrive.",
        "examplePolish": "Musimy posprzątać dom przed przyjazdem gości."
      },
      {
        "id": "everyday-20",
        "english": "To Shop",
        "polish": "Sklep",
        "pronunciation": "/ʃɒp/",
        "partOfSpeech": "verb",
        "exampleEnglish": "This shop is closed on Sunday.",
        "examplePolish": "Ten sklep jest zamknięty w niedzielę."
      },
      {
        "id": "everyday-21",
        "english": "To Walk",
        "polish": "Spacerować / Chodzić",
        "pronunciation": "/wɔːk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "They walk in the forest every Sunday.",
        "examplePolish": "Oni spacerują w lesie w każdą niedzielę."
      },
      {
        "id": "everyday-22",
        "english": "To Run",
        "polish": "Biegać",
        "pronunciation": "/rʌn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "He runs five miles every morning.",
        "examplePolish": "On biega pięć mil każdego ranka."
      },
      {
        "id": "everyday-23",
        "english": "Watch TV",
        "polish": "Oglądać telewizję",
        "pronunciation": "/wɒtʃ ˌtiːˈviː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We rarely watch TV in the evening.",
        "examplePolish": "Rzadko oglądamy telewizję wieczorem."
      },
      {
        "id": "everyday-24",
        "english": "Phone",
        "polish": "Telefon / Dzwonić",
        "pronunciation": "/fəʊn/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Please answer the phone, it is ringing.",
        "examplePolish": "Proszę, odbierz telefon, dzwoni."
      },
      {
        "id": "everyday-25",
        "english": "Email",
        "polish": "E-mail",
        "pronunciation": "/ˈiː.meɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Send me the details via email.",
        "examplePolish": "Wyślij mi szczegóły e-mailem."
      },
      {
        "id": "everyday-26",
        "english": "To Chat",
        "polish": "Rozmawiać / Czatować",
        "pronunciation": "/tʃæt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We sat in the cafe and chatted for hours.",
        "examplePolish": "Siedzieliśmy w kawiarni i rozmawialiśmy godzinami."
      },
      {
        "id": "everyday-27",
        "english": "To Meet",
        "polish": "Spotykać (się)",
        "pronunciation": "/miːt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Let's meet at the train station.",
        "examplePolish": "Spotkajmy się na stacji kolejowej."
      },
      {
        "id": "everyday-28",
        "english": "To Travel",
        "polish": "Podróżować",
        "pronunciation": "/ˈtræv.əl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "They plan to travel around Europe next year.",
        "examplePolish": "Oni planują podróżować po Europie w przyszłym roku."
      },
      {
        "id": "everyday-29",
        "english": "To Visit",
        "polish": "Odwiedzać",
        "pronunciation": "/ˈvɪz.ɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We want to visit our grandparents this weekend.",
        "examplePolish": "Chcemy odwiedzić naszych dziadków w ten weekend."
      },
      {
        "id": "everyday-30",
        "english": "To Sleep",
        "polish": "Spać",
        "pronunciation": "/sliːp/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I need to sleep for at least eight hours.",
        "examplePolish": "Muszę spać przez co najmniej osiem godzin."
      },
      {
        "id": "everyday-31",
        "english": "Dream",
        "polish": "Śnić / Marzyć",
        "pronunciation": "/driːm/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "She dreams of becoming a doctor.",
        "examplePolish": "Ona marzy o zostaniu lekarzem."
      },
      {
        "id": "everyday-32",
        "english": "Rest",
        "polish": "Odpoczywać",
        "pronunciation": "/rest/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Take a short rest after this exercise.",
        "examplePolish": "Odpocznij chwilę po tym ćwiczeniu."
      },
      {
        "id": "everyday-33",
        "english": "To Wash",
        "polish": "Myć / Prać",
        "pronunciation": "/wɒʃ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Don't forget to wash your hands.",
        "examplePolish": "Nie zapomnij umyć rąk."
      },
      {
        "id": "everyday-34",
        "english": "To Buy",
        "polish": "Kupować",
        "pronunciation": "/baɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I want to buy a new shirt.",
        "examplePolish": "Chcę kupić nową koszulę."
      },
      {
        "id": "everyday-35",
        "english": "To Sell",
        "polish": "Sprzedawać",
        "pronunciation": "/sel/",
        "partOfSpeech": "verb",
        "exampleEnglish": "They sell fresh bread here.",
        "examplePolish": "Sprzedają tu świeży chleb."
      },
      {
        "id": "everyday-36",
        "english": "To Agree",
        "polish": "Zgadzać się",
        "pronunciation": "/əˈɡriː/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I completely agree with your opinion.",
        "examplePolish": "Całkowicie zgadzam się z twoją opinią."
      },
      {
        "id": "everyday-37",
        "english": "To Disagree",
        "polish": "Nie zgadzać się",
        "pronunciation": "/ˌdɪs.əˈɡriː/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We agree to disagree on this topic.",
        "examplePolish": "Zgadzamy się na różnicę zdań w tym temacie."
      },
      {
        "id": "everyday-38",
        "english": "Promise",
        "polish": "Obiecywać",
        "pronunciation": "/ˈprɒm.ɪs/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "I promise to call you when I arrive.",
        "examplePolish": "Obiecuję zadzwonić do ciebie, kiedy przyjadę."
      },
      {
        "id": "everyday-39",
        "english": "To Decide",
        "polish": "Decydować",
        "pronunciation": "/dɪˈsaɪd/",
        "partOfSpeech": "verb",
        "exampleEnglish": "It is hard to decide which one is better.",
        "examplePolish": "Trudno zdecydować, który jest lepszy."
      },
      {
        "id": "everyday-40",
        "english": "To Remember",
        "polish": "Pamiętać",
        "pronunciation": "/rɪˈmem.bər/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Do you remember the name of that street?",
        "examplePolish": "Czy pamiętasz nazwę tamtej ulicy?"
      },
      {
        "id": "everyday-41",
        "english": "To Forget",
        "polish": "Zapominać",
        "pronunciation": "/fəˈɡet/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I always forget where my keys are.",
        "examplePolish": "Zawsze zapominam, gdzie są moje klucze."
      },
      {
        "id": "everyday-42",
        "english": "To Wake up",
        "polish": "Budzić się",
        "pronunciation": "/weɪk ʌp/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I wake up early every day.",
        "examplePolish": "Budzę się wcześnie każdego dnia."
      },
      {
        "id": "everyday-43",
        "english": "Go to bed",
        "polish": "Iść spać",
        "pronunciation": "/ɡəʊ tuː bed/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It is time to go to bed.",
        "examplePolish": "Czas iść spać."
      },
      {
        "id": "everyday-44",
        "english": "Brush teeth",
        "polish": "Myć zęby",
        "pronunciation": "/brʌʃ tiːθ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You should brush your teeth twice a day.",
        "examplePolish": "Powinieneś myć zęby dwa razy dziennie."
      },
      {
        "id": "everyday-45",
        "english": "Work",
        "polish": "Praca / pracować",
        "pronunciation": "/wɜːk/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "I like my work very much.",
        "examplePolish": "Bardzo lubię swoją pracę."
      },
      {
        "id": "everyday-46",
        "english": "To Study",
        "polish": "Uczyć się / Studiować",
        "pronunciation": "/ˈstʌd.i/",
        "partOfSpeech": "verb",
        "exampleEnglish": "She studies history at university.",
        "examplePolish": "Ona studiuje historię na uniwersytecie."
      },
      {
        "id": "everyday-47",
        "english": "To Cook",
        "polish": "Kucharz",
        "pronunciation": "/kʊk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The cook prepared a delicious fish.",
        "examplePolish": "Kucharz przygotował pyszną rybę."
      },
      {
        "id": "everyday-48",
        "english": "To Get up",
        "polish": "Wstawać",
        "pronunciation": "/ɡet ʌp/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I get up at 7 o'clock every morning.",
        "examplePolish": "Wstaję o 7 rano każdego ranka."
      },
      {
        "id": "everyday-49",
        "english": "Have breakfast",
        "polish": "Jeść śniadanie",
        "pronunciation": "/hæv ˈbrek.fəst/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We have breakfast together as a family.",
        "examplePolish": "Jemy śniadanie wspólnie jako rodzina."
      },
      {
        "id": "everyday-50",
        "english": "Listen to music",
        "polish": "Słuchać muzyki",
        "pronunciation": "/ˈlɪs.ən tuː ˈmjuː.zɪk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I love to listen to music while running.",
        "examplePolish": "Uwielbiam słuchać muzyki podczas biegania.\n\n\n--- TALIA: Travel & Leisure (A2) / Podróże i wypoczynek (A2) ---\nOpis: Key vocabulary for checking in, exploring, and basic transportation."
      }
    ]
  },
  {
    "id": "travel",
    "title": "Travel & Leisure (A2)",
    "polishTitle": "Podróże i wypoczynek",
    "category": "travel",
    "level": "A2",
    "description": "Key vocabulary for checking in, exploring, and basic transportation.",
    "icon": "Compass",
    "color": "#ec4899",
    "cards": [
      {
        "id": "travel-1",
        "english": "Layover",
        "polish": "Przesiadka (z oczekiwaniem)",
        "pronunciation": "/ˈleɪ.oʊ.vɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have a four-hour layover in Munich before my flight to Tokyo.",
        "examplePolish": "Mam czterogodzinną przesiadkę w Monachium przed lotem do Tokio."
      },
      {
        "id": "travel-2",
        "english": "To check in",
        "polish": "Meldować się / odprawić się",
        "pronunciation": "/tʃek ɪn/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "You need to check in at least two hours before departure.",
        "examplePolish": "Musisz odprawić się na co najmniej dwie godziny przed odlotem."
      },
      {
        "id": "travel-3",
        "english": "Breathtaking",
        "polish": "Zapierający dech w piersiach",
        "pronunciation": "/ˈbreθˌteɪ.kɪŋ/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The view from the top of the mountain was absolutely breathtaking.",
        "examplePolish": "Widok ze szczytu góry był absolutnie zapierający dech w piersiach."
      },
      {
        "id": "travel-4",
        "english": "Itinerary",
        "polish": "Plan podróży",
        "pronunciation": "/aɪˈtɪn.ə.rer.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The travel agent gave us our itinerary.",
        "examplePolish": "Biuro podróży przekazało nam nasz plan podróży."
      },
      {
        "id": "travel-5",
        "english": "Off the beaten track",
        "polish": "Poza utartym szlakiem",
        "pronunciation": "/ɔːf ðə ˈbiː.tən træk/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "We prefer to stay in small villages off the beaten track.",
        "examplePolish": "Wolimy zatrzymywać się w małych wioskach poza utartym szlakiem."
      },
      {
        "id": "travel-6",
        "english": "Local delicacies",
        "polish": "Lokalne przysmaki",
        "pronunciation": "/ˈloʊ.kəl ˈdel.ɪ.kə.siz/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "When you visit Italy, you must try the local delicacies.",
        "examplePolish": "Kiedy odwiedzasz Włochy, musisz spróbować lokalnych przysmaków."
      },
      {
        "id": "travel-7",
        "english": "Delayed",
        "polish": "Opóźniony",
        "pronunciation": "/dɪˈleɪd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Our train was delayed by an hour due to heavy snow.",
        "examplePolish": "Nasz pociąg był opóźniony o godzinę z powodu silnych opadów śniegu."
      },
      {
        "id": "travel-8",
        "english": "Boarding pass",
        "polish": "Karta pokładowa",
        "pronunciation": "/ˈbɔːr.dɪŋ pæs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Show your boarding pass at the gate.",
        "examplePolish": "Pokaż kartę pokładową przy bramce."
      },
      {
        "id": "travel-9",
        "english": "To rent a car",
        "polish": "Wynająć samochód",
        "pronunciation": "/rent ə kɑːr/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We decided to rent a car to explore the island at our own pace.",
        "examplePolish": "Zdecydowaliśmy się wynająć samochód, aby zwiedzać wyspę we własnym tempie."
      },
      {
        "id": "travel-10",
        "english": "Sightseeing",
        "polish": "Zwiedzanie",
        "pronunciation": "/ˈsaɪtˌsiː.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We went sightseeing in Paris.",
        "examplePolish": "Poszliśmy zwiedzać Paryż."
      },
      {
        "id": "travel-11",
        "english": "Jet lag",
        "polish": "Zmęczenie po podróży (różnica czasu)",
        "pronunciation": "/ˈdʒet læɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It took me three days to get over my jet lag after flying from New York.",
        "examplePolish": "Trzy dni zajęło mi dojście do siebie po zmianie strefy czasowej po locie z Nowego Jorku."
      },
      {
        "id": "travel-12",
        "english": "Sight",
        "polish": "Widok / atrakcja turystyczna",
        "pronunciation": "/saɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We spent the day looking at the sights of Rome.",
        "examplePolish": "Spędziliśmy dzień oglądając atrakcje Rzymu."
      },
      {
        "id": "travel-13",
        "english": "To set off",
        "polish": "Wyruszyć w podróż",
        "pronunciation": "/set ɔːf/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "We need to set off early tomorrow to avoid the morning traffic.",
        "examplePolish": "Musimy wyruszyć wczesnym rankiem jutro, aby uniknąć porannego tłoku."
      },
      {
        "id": "travel-14",
        "english": "Souvenir",
        "polish": "Pamiątka",
        "pronunciation": "/ˌsuː.vəˈnɪr/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I bought a souvenir fridge magnet.",
        "examplePolish": "Kupiłem pamiątkowy magnes na lodówkę."
      },
      {
        "id": "travel-15",
        "english": "Customs",
        "polish": "Cło / Odprawa celna",
        "pronunciation": "/ˈkʌs.təmz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We had to go through customs at the airport.",
        "examplePolish": "Musieliśmy przejść przez odprawę celną na lotnisku."
      },
      {
        "id": "travel-16",
        "english": "Ticket",
        "polish": "Bilet",
        "pronunciation": "/ˈtɪk.ɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You must buy a ticket before boarding.",
        "examplePolish": "Musisz kupić bilet przed wejściem na pokład."
      },
      {
        "id": "travel-17",
        "english": "Passport",
        "polish": "Paszport",
        "pronunciation": "/ˈpɑːs.pɔːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Ensure your passport is valid for travel.",
        "examplePolish": "Upewnij się, że twój paszport jest ważny na czas podróży."
      },
      {
        "id": "travel-18",
        "english": "Luggage",
        "polish": "Bagaż",
        "pronunciation": "/ˈlʌɡ.ɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Please do not leave your luggage unattended.",
        "examplePolish": "Proszę nie zostawiać bagażu bez opieki."
      },
      {
        "id": "travel-19",
        "english": "Flight",
        "polish": "Lot",
        "pronunciation": "/flaɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our flight departs in thirty minutes.",
        "examplePolish": "Nasz lot odlatuje za trzydzieści minut."
      },
      {
        "id": "travel-20",
        "english": "Train",
        "polish": "Pociąg",
        "pronunciation": "/treɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The train to Warsaw leaves from platform 3.",
        "examplePolish": "Pociąg do Warszawy odjeżdża z peronu trzeciego."
      },
      {
        "id": "travel-21",
        "english": "Bus",
        "polish": "Autobus",
        "pronunciation": "/bʌs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Is this the correct bus to the airport?",
        "examplePolish": "Czy to jest odpowiedni autobus na lotnisko?"
      },
      {
        "id": "travel-22",
        "english": "Station",
        "polish": "Stacja / Dworzec",
        "pronunciation": "/ˈsteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Where is the nearest underground station?",
        "examplePolish": "Gdzie jest najbliższa stacja metra?"
      },
      {
        "id": "travel-23",
        "english": "Key",
        "polish": "Klucz",
        "pronunciation": "/kiː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I left the room key at the reception desk.",
        "examplePolish": "Zostawiłem klucz do pokoju w recepcji."
      },
      {
        "id": "travel-24",
        "english": "Reservation",
        "polish": "Rezerwacja",
        "pronunciation": "/ˌrez.əˈveɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have a table reservation for tonight.",
        "examplePolish": "Mam rezerwację stolika na dzisiejszy wieczór."
      },
      {
        "id": "travel-25",
        "english": "Map",
        "polish": "Mapa",
        "pronunciation": "/mæp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Let's check the map to find our way.",
        "examplePolish": "Sprawdźmy mapę, aby znaleźć drogę."
      },
      {
        "id": "travel-26",
        "english": "Tourist",
        "polish": "Turysta",
        "pronunciation": "/ˈtʊə.rɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The city center is always crowded with tourists.",
        "examplePolish": "Centrum miasta jest zawsze pełne turystów."
      },
      {
        "id": "travel-27",
        "english": "Guide",
        "polish": "Przewodnik",
        "pronunciation": "/ɡaɪd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our guide explained the history of the castle.",
        "examplePolish": "Nasz przewodnik wyjaśnił historię zamku."
      },
      {
        "id": "travel-28",
        "english": "Beach",
        "polish": "Plaża",
        "pronunciation": "/biːtʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We spent the whole day relaxing on the beach.",
        "examplePolish": "Spędziliśmy cały dzień na relaksie na plaży."
      },
      {
        "id": "travel-29",
        "english": "Sea",
        "polish": "Morze",
        "pronunciation": "/siː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The Baltic Sea is quite cold in winter.",
        "examplePolish": "Morze Bałtyckie jest dość zimne zimą."
      },
      {
        "id": "travel-30",
        "english": "Mountain",
        "polish": "Góra",
        "pronunciation": "/ˈmaʊn.tɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Mount Everest is the highest mountain in the world.",
        "examplePolish": "Mount Everest to najwyższa góra na świecie."
      },
      {
        "id": "travel-31",
        "english": "Forest",
        "polish": "Las",
        "pronunciation": "/ˈfɒr.ɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They went for a peaceful walk in the pine forest.",
        "examplePolish": "Poszli na spokojny spacer po sosnowym lesie."
      },
      {
        "id": "travel-32",
        "english": "Lake",
        "polish": "Jezioro",
        "pronunciation": "/leɪk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We swam in the cold lake.",
        "examplePolish": "Pływaliśmy w zimnym jeziorze."
      },
      {
        "id": "travel-33",
        "english": "River",
        "polish": "Rzeka",
        "pronunciation": "/ˈrɪv.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The river flows to the sea.",
        "examplePolish": "Rzeka płynie do morza.\n\n\n--- TALIA: Dining & Food (B1) / Restauracja i jedzenie (B1) ---\nOpis: Vocabulary for ordering food, describing flavors, and dining etiquette."
      },
      {
        "id": "travel-34",
        "english": "Bridge",
        "polish": "Most",
        "pronunciation": "/brɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A beautiful stone bridge crosses the river.",
        "examplePolish": "Piękny kamienny most przecina rzekę."
      },
      {
        "id": "travel-35",
        "english": "Museum",
        "polish": "Muzeum",
        "pronunciation": "/mjuːˈziː.əm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The British Museum is in London.",
        "examplePolish": "Muzeum Brytyjskie znajduje się w Londynie."
      },
      {
        "id": "travel-36",
        "english": "Park",
        "polish": "Park",
        "pronunciation": "/pɑːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I like to read my book in the park.",
        "examplePolish": "Lubię czytać książkę w parku."
      },
      {
        "id": "travel-38",
        "english": "Market",
        "polish": "Targ / rynek",
        "pronunciation": "/ˈmɑː.kɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We buy fresh eggs at the market.",
        "examplePolish": "Kupujemy świeże jajka na targu.\n\n\n--- TALIA: Numbers & Time (A1) / Liczby i Czas (A1) ---\nOpis: Essential vocabulary for telling time, days of the week, and simple numbers."
      },
      {
        "id": "travel-39",
        "english": "Taxi",
        "polish": "Taksówka",
        "pronunciation": "/ˈtæk.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Let's take a taxi to the museum.",
        "examplePolish": "Weźmy taksówkę do muzeum."
      },
      {
        "id": "travel-40",
        "english": "Driver",
        "polish": "Kierowca",
        "pronunciation": "/ˈdraɪ.vər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The taxi driver was very polite.",
        "examplePolish": "Kierowca taksówki był bardzo uprzejmy."
      },
      {
        "id": "travel-41",
        "english": "Directions",
        "polish": "Wskazówki / droga",
        "pronunciation": "/daɪˈrek.ʃənz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He gave us directions to the museum.",
        "examplePolish": "Podał nam wskazówki drogi do muzeum."
      },
      {
        "id": "travel-42",
        "english": "Lost",
        "polish": "Zagubiony",
        "pronunciation": "/lɒst/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Excuse me, I think we are lost.",
        "examplePolish": "Przepraszam, chyba się zgubiliśmy."
      },
      {
        "id": "travel-43",
        "english": "Currency",
        "polish": "Waluta",
        "pronunciation": "/ˈkʌr.ən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The euro is the currency of many EU nations.",
        "examplePolish": "Euro jest walutą wielu krajów UE."
      },
      {
        "id": "travel-44",
        "english": "Exchange",
        "polish": "Wymieniać / Wymiana",
        "pronunciation": "/ɪksˈtʃeɪndʒ/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Where is the best place to exchange money?",
        "examplePolish": "Gdzie jest najlepsze miejsce na wymianę pieniędzy?"
      },
      {
        "id": "travel-45",
        "english": "Bank",
        "polish": "Bank",
        "pronunciation": "/bæŋk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The bank closes at 5 PM today.",
        "examplePolish": "Bank jest dzisiaj czynny do godziny 17:00."
      },
      {
        "id": "travel-46",
        "english": "ATM",
        "polish": "Bankomat",
        "pronunciation": "/ˌeɪ.tiːˈem/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I need to withdraw some cash from the ATM.",
        "examplePolish": "Muszę wypłacić trochę gotówki z bankomatu."
      },
      {
        "id": "travel-47",
        "english": "Insurance",
        "polish": "Ubezpieczenie",
        "pronunciation": "/ɪnˈʃɔː.rəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We bought insurance before going skiing.",
        "examplePolish": "Kupiliśmy ubezpieczenie przed pójściem na narty."
      },
      {
        "id": "travel-48",
        "english": "Luggage tag",
        "polish": "Przywieszka bagażowa",
        "pronunciation": "/ˈlʌɡ.ɪdʒ tæɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Write your address on the luggage tag.",
        "examplePolish": "Zapisz swój adres na przywieszce bagażowej."
      },
      {
        "id": "travel-50",
        "english": "Gate",
        "polish": "Bramka",
        "pronunciation": "/ɡeɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The gate closes ten minutes before departure.",
        "examplePolish": "Bramka zamyka się dziesięć minut przed odlotem."
      }
    ]
  },
  {
    "id": "nature-a2",
    "title": "Nature & Weather (A2)",
    "polishTitle": "Przyroda i pogoda",
    "category": "nature",
    "level": "A2",
    "description": "Basic vocabulary describing nature, animals, and weather patterns.",
    "icon": "Sun",
    "color": "#22c55e",
    "cards": [
      {
        "id": "nature-a2-2",
        "english": "Rainy",
        "polish": "Deszczowy",
        "pronunciation": "/ˈreɪ.ni/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I like staying indoors reading a book on a rainy day.",
        "examplePolish": "Lubię siedzieć w domu i czytać książkę w deszczowy dzień."
      },
      {
        "id": "nature-a2-3",
        "english": "Thunderstorm",
        "polish": "Burza z piorunami",
        "pronunciation": "/ˈθʌn.dɚ.stɔːrm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The dog hides under the bed whenever there is a thunderstorm.",
        "examplePolish": "Pies chowa się pod łóżkiem, kiedy tylko jest burza."
      },
      {
        "id": "nature-a2-4",
        "english": "Wildlife",
        "polish": "Dzika przyroda",
        "pronunciation": "/ˈwaɪld.laɪf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The national park protects local wildlife.",
        "examplePolish": "Park narodowy chroni lokalną dziką przyrodę."
      },
      {
        "id": "nature-a2-5",
        "english": "Season",
        "polish": "Pora roku",
        "pronunciation": "/ˈsiː.zən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Spring is my favorite season.",
        "examplePolish": "Wiosna to moja ulubiona pora roku."
      },
      {
        "id": "nature-a2-6",
        "english": "Environment",
        "polish": "Środowisko naturalne",
        "pronunciation": "/ɪnˈvaɪ.rən.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must protect the natural environment.",
        "examplePolish": "Musimy chronić środowisko naturalne."
      },
      {
        "id": "nature-a2-7",
        "english": "Cloud",
        "polish": "Chmura (obliczeniowa)",
        "pronunciation": "/klaʊd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "All our files are stored in the cloud.",
        "examplePolish": "Wszystkie nasze pliki są przechowywane w chmurze."
      },
      {
        "id": "nature-a2-9",
        "english": "Sunny",
        "polish": "Słoneczny",
        "pronunciation": "/ˈsʌn.i/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Today is a sunny Sunday.",
        "examplePolish": "Dzisiaj jest słoneczna niedziela."
      },
      {
        "id": "nature-a2-11",
        "english": "Sky",
        "polish": "Niebo",
        "pronunciation": "/skaɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The sky is clear and blue today.",
        "examplePolish": "Niebo jest dzisiaj czyste i niebieskie."
      },
      {
        "id": "nature-a2-13",
        "english": "Rain",
        "polish": "Deszcz",
        "pronunciation": "/reɪn/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Take an umbrella, it is going to rain.",
        "examplePolish": "Weź parasol, będzie padać."
      },
      {
        "id": "nature-a2-14",
        "english": "Snow",
        "polish": "Śnieg",
        "pronunciation": "/snəʊ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Children love to play in the fresh snow.",
        "examplePolish": "Dzieci uwielbiają bawić się w świeżym śniegu."
      },
      {
        "id": "nature-a2-15",
        "english": "Wind",
        "polish": "Wiatr",
        "pronunciation": "/wɪnd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A strong wind is blowing from the north.",
        "examplePolish": "Z północy wieje silny wiatr."
      },
      {
        "id": "nature-a2-16",
        "english": "Storm",
        "polish": "Burza",
        "pronunciation": "/stɔːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The storm caused a lot of damage to trees.",
        "examplePolish": "Burza wyrządziła wiele szkód w drzewostanie."
      },
      {
        "id": "nature-a2-17",
        "english": "Weather",
        "polish": "Pogoda",
        "pronunciation": "/ˈweð.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is the weather like today?",
        "examplePolish": "Jaka jest dzisiaj pogoda?"
      },
      {
        "id": "nature-a2-18",
        "english": "Flower",
        "polish": "Kwiat",
        "pronunciation": "/ˈflaʊ.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She picked a beautiful yellow flower.",
        "examplePolish": "Zerwała piękny żółty kwiat."
      },
      {
        "id": "nature-a2-19",
        "english": "Grass",
        "polish": "Trawa",
        "pronunciation": "/ɡrɑːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The grass is green and freshly cut.",
        "examplePolish": "Trawa jest zielona i świeżo skoszona."
      },
      {
        "id": "nature-a2-20",
        "english": "Leaf",
        "polish": "Liść",
        "pronunciation": "/liːf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A dry brown leaf fell from the oak tree.",
        "examplePolish": "Suchy brązowy liść spadł z dębu."
      },
      {
        "id": "nature-a2-21",
        "english": "Plant",
        "polish": "Roślina",
        "pronunciation": "/plɑːnt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Water this plant once a week.",
        "examplePolish": "Podlewaj tę roślinę raz w tygodniu."
      },
      {
        "id": "nature-a2-22",
        "english": "Wood",
        "polish": "Drewno / Las",
        "pronunciation": "/wʊd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The table is made of solid oak wood.",
        "examplePolish": "Stół wykonany jest z litego drewna dębowego."
      },
      {
        "id": "nature-a2-23",
        "english": "Hill",
        "polish": "Wzgórze",
        "pronunciation": "/hɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Their house stands on top of a green hill.",
        "examplePolish": "Ich dom stoi na szczycie zielonego wzgórza."
      },
      {
        "id": "nature-a2-24",
        "english": "Valley",
        "polish": "Dolina",
        "pronunciation": "/ˈvæl.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A small river runs through the valley.",
        "examplePolish": "Przez dolinę przepływa mała rzeka."
      },
      {
        "id": "nature-a2-25",
        "english": "Ocean",
        "polish": "Ocean",
        "pronunciation": "/ˈəʊ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The Atlantic Ocean separates Europe and America.",
        "examplePolish": "Ocean Atlantycki dzieli Europę i Amerykę."
      },
      {
        "id": "nature-a2-26",
        "english": "Sand",
        "polish": "Piasek",
        "pronunciation": "/sænd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The sand on the beach was warm and soft.",
        "examplePolish": "Piasek na plaży był ciepły i miękki."
      },
      {
        "id": "nature-a2-27",
        "english": "Rock",
        "polish": "Skała",
        "pronunciation": "/rɒk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The boat crashed against a hidden rock.",
        "examplePolish": "Łódź rozbiła się o ukrytą skałę."
      },
      {
        "id": "nature-a2-28",
        "english": "Stone",
        "polish": "Kamień",
        "pronunciation": "/stəʊn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The boy threw a small stone into the lake.",
        "examplePolish": "Chłopiec wrzucił mały kamień do jeziora."
      },
      {
        "id": "nature-a2-29",
        "english": "Earth",
        "polish": "Ziemia (planeta)",
        "pronunciation": "/ɜːθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must protect the Earth for the future.",
        "examplePolish": "Musimy chronić Ziemię dla przyszłości."
      },
      {
        "id": "nature-a2-30",
        "english": "Soil",
        "polish": "Gleba / Ziemia",
        "pronunciation": "/sɔɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Plants need good soil to grow well.",
        "examplePolish": "Rośliny potrzebują dobrej gleby, aby dobrze rosnąć."
      },
      {
        "id": "nature-a2-31",
        "english": "Animal",
        "polish": "Zwierzę",
        "pronunciation": "/ˈæn.ɪ.məl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The lion is a dangerous wild animal.",
        "examplePolish": "Lew to niebezpieczne, dzikie zwierzę."
      },
      {
        "id": "nature-a2-32",
        "english": "Bird",
        "polish": "Ptak",
        "pronunciation": "/bɜːd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A beautiful blue bird is singing outside.",
        "examplePolish": "Na zewnątrz śpiewa piękny niebieski ptak."
      },
      {
        "id": "nature-a2-33",
        "english": "Fish",
        "polish": "Ryba",
        "pronunciation": "/fɪʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The chef prepared a grilled fish.",
        "examplePolish": "Szef kuchni przygotował grillowaną rybę."
      },
      {
        "id": "nature-a2-34",
        "english": "Insect",
        "polish": "Owad",
        "pronunciation": "/ˈɪn.sekt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A bee is a useful pollinating insect.",
        "examplePolish": "Pszczoła to pożyteczny owad zapylający."
      },
      {
        "id": "nature-a2-35",
        "english": "Horse",
        "polish": "Koń",
        "pronunciation": "/hɔːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She learned how to ride a horse.",
        "examplePolish": "Nauczyła się jeździć konno."
      },
      {
        "id": "nature-a2-36",
        "english": "Cow",
        "polish": "Krowa",
        "pronunciation": "/kaʊ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Cows eat grass and give milk.",
        "examplePolish": "Krowy jedzą trawę i dają mleko."
      },
      {
        "id": "nature-a2-37",
        "english": "Sheep",
        "polish": "Owca",
        "pronunciation": "/ʃiːp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The farmer has a large flock of sheep.",
        "examplePolish": "Rolnik ma duże stado owiec."
      },
      {
        "id": "nature-a2-38",
        "english": "Pig",
        "polish": "Świnia",
        "pronunciation": "/pɪɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pigs love to roll in the mud.",
        "examplePolish": "Świnie uwielbiają tarzać się w błocie."
      },
      {
        "id": "nature-a2-40",
        "english": "Spring",
        "polish": "Wiosna",
        "pronunciation": "/sprɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "In spring, flowers start to bloom.",
        "examplePolish": "Wiosną kwiaty zaczynają kwitnąć."
      },
      {
        "id": "nature-a2-41",
        "english": "Summer",
        "polish": "Lato",
        "pronunciation": "/ˈsʌm.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It is very warm during summer.",
        "examplePolish": "Latem jest bardzo ciepło."
      },
      {
        "id": "nature-a2-42",
        "english": "Autumn",
        "polish": "Jesień",
        "pronunciation": "/ˈɔː.təm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Leaves fall from the trees in autumn.",
        "examplePolish": "Jesienią liście spadają z drzew."
      },
      {
        "id": "nature-a2-43",
        "english": "Winter",
        "polish": "Zima",
        "pronunciation": "/ˈwɪn.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We often go skiing in winter.",
        "examplePolish": "Zimą często jeździmy na narty."
      },
      {
        "id": "nature-a2-44",
        "english": "Star",
        "polish": "Gwiazda",
        "pronunciation": "/stɑːr/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I love looking at the stars at night.",
        "examplePolish": "Uwielbiam patrzeć na gwiazdy w nocy."
      },
      {
        "id": "nature-a2-45",
        "english": "Nature",
        "polish": "Natura / Przyroda",
        "pronunciation": "/ˈneɪ.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Love and respect mother nature.",
        "examplePolish": "Kochaj i szanuj matkę naturę.\n\n\n--- TALIA: Business English (B2) / Biznes i praca (B2) ---\nOpis: Navigate corporate meetings, project deliverables, and workplace ethics."
      },
      {
        "id": "nature-a2-46",
        "english": "Warm",
        "polish": "Ciepły",
        "pronunciation": "/wɔːm/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Put on a warm sweater.",
        "examplePolish": "Załóż ciepły sweter."
      },
      {
        "id": "nature-a2-48",
        "english": "Air",
        "polish": "Powietrze",
        "pronunciation": "/eər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The mountain air is fresh and clean.",
        "examplePolish": "Górskie powietrze jest świeże i czyste."
      }
    ]
  },
  {
    "id": "restaurant",
    "title": "Dining & Food (B1)",
    "polishTitle": "Restauracja i jedzenie",
    "category": "dining",
    "level": "B1",
    "description": "Vocabulary for ordering food, describing flavors, and dining etiquette.",
    "icon": "Utensils",
    "color": "#10b981",
    "cards": [
      {
        "id": "restaurant-1",
        "english": "Appetizer",
        "polish": "Przystawka",
        "pronunciation": "/ˈæp.ə.taɪ.zɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We ordered a garlic bread appetizer.",
        "examplePolish": "Zamówiliśmy chleb czosnkowy jako przystawkę."
      },
      {
        "id": "restaurant-2",
        "english": "Main course",
        "polish": "Danie główne",
        "pronunciation": "/meɪn kɔːrs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "For the main course, I ordered chicken.",
        "examplePolish": "Na danie główne zamówiłem kurczaka."
      },
      {
        "id": "restaurant-3",
        "english": "To book a table",
        "polish": "Zarezerwować stolik",
        "pronunciation": "/tʊ bʊk ə ˈteɪ.bəl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The restaurant is very popular, so we should book a table in advance.",
        "examplePolish": "Ta restauracja jest bardzo popularna, więc powinniśmy zarezerwować stolik z wyprzedzeniem."
      },
      {
        "id": "restaurant-4",
        "english": "The bill",
        "polish": "Rachunek",
        "pronunciation": "/ðə bɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Excuse me, could we have the bill, please?",
        "examplePolish": "Przepraszam, czy możemy prosić o rachunek?"
      },
      {
        "id": "restaurant-5",
        "english": "Special of the day",
        "polish": "Danie dnia / specjalność dnia",
        "pronunciation": "/ˈspeʃ.əl əv ðə deɪ/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "Today's special of the day is seafood pasta.",
        "examplePolish": "Dzisiejszym daniem dnia jest makaron z owocami morza."
      },
      {
        "id": "restaurant-6",
        "english": "Splitting the bill",
        "polish": "Podzielić rachunek / płacić osobno",
        "pronunciation": "/ˈsplɪt.ɪŋ ðə bɪl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We had a group dinner and ended up splitting the bill equally.",
        "examplePolish": "Jedliśmy grupową kolację i ostatecznie podzieliliśmy rachunek po równo."
      },
      {
        "id": "restaurant-7",
        "english": "Course",
        "polish": "Danie (część posiłku)",
        "pronunciation": "/kɔːrs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The dinner consisted of a five-course meal.",
        "examplePolish": "Kolacja składała się z pięciodaniowego posiłku."
      },
      {
        "id": "restaurant-8",
        "english": "To recommend",
        "polish": "Polecać",
        "pronunciation": "/ˌrek.əˈmend/",
        "partOfSpeech": "verb",
        "exampleEnglish": "What dish would you recommend to a first-time visitor?",
        "examplePolish": "Jakie danie poleciłby Pan komuś, kto odwiedza Was po raz pierwszy?"
      },
      {
        "id": "restaurant-9",
        "english": "Beverage",
        "polish": "Napój",
        "pronunciation": "/ˈbev.ɚ.ɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Alcoholic beverages are not served here.",
        "examplePolish": "Napoje alkoholowe nie są tu podawane."
      },
      {
        "id": "restaurant-10",
        "english": "Garnish",
        "polish": "Przybrać potrawę / posypka / dekoracja",
        "pronunciation": "/ˈɡɑːr.nɪʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The chef added a sprinkle of parsley as a garnish.",
        "examplePolish": "Szef kuchni dodał posypkę z pietruszki jako dekorację."
      },
      {
        "id": "restaurant-11",
        "english": "Spicy",
        "polish": "Ostry / Pikantny",
        "pronunciation": "/ˈspaɪ.si/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This curry is extremely spicy.",
        "examplePolish": "To curry jest niezwykle pikantne."
      },
      {
        "id": "restaurant-12",
        "english": "Side dish",
        "polish": "Dodatek do dania głównego",
        "pronunciation": "/ˈsaɪd ˌdɪʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I ordered a side dish of roasted vegetables with my steak.",
        "examplePolish": "Zamówiłem pieczone warzywa jako dodatek do steku."
      },
      {
        "id": "restaurant-14",
        "english": "Starter",
        "polish": "Przystawka",
        "pronunciation": "/ˈstɑː.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The soup was served as a starter.",
        "examplePolish": "Zupa została podana jako danie startowe."
      },
      {
        "id": "restaurant-16",
        "english": "Dessert",
        "polish": "Deser",
        "pronunciation": "/dɪˈzɜːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Let's leave room for apple pie dessert.",
        "examplePolish": "Zostawmy miejsce na deser w postaci szarlotki."
      },
      {
        "id": "restaurant-17",
        "english": "Soda",
        "polish": "Napój gazowany",
        "pronunciation": "/ˈsəʊ.də/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Can I get a soda with ice?",
        "examplePolish": "Czy mogę dostać napój gazowany z lodem?"
      },
      {
        "id": "restaurant-18",
        "english": "Sauce",
        "polish": "Sos",
        "pronunciation": "/sɔːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The pasta was covered in tomato sauce.",
        "examplePolish": "Makaron był polany sosem pomidorowym."
      },
      {
        "id": "restaurant-19",
        "english": "Soup",
        "polish": "Zupa",
        "pronunciation": "/suːp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Tomato soup is very popular in Poland.",
        "examplePolish": "Zupa pomidorowa jest bardzo popularna w Polsce."
      },
      {
        "id": "restaurant-20",
        "english": "Salad",
        "polish": "Sałatka",
        "pronunciation": "/ˈsæl.əd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I ordered a Greek salad with feta cheese.",
        "examplePolish": "Zamówiłem sałatkę grecką z serem feta."
      },
      {
        "id": "restaurant-21",
        "english": "Meat",
        "polish": "Mięso",
        "pronunciation": "/miːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Some people do not eat meat.",
        "examplePolish": "Niektórzy ludzie nie jedzą mięsa."
      },
      {
        "id": "restaurant-23",
        "english": "Chicken",
        "polish": "Kurczak",
        "pronunciation": "/ˈtʃɪk.ɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We had roasted chicken for dinner.",
        "examplePolish": "Zjedliśmy pieczonego kurczaka na obiad."
      },
      {
        "id": "restaurant-24",
        "english": "Vegetables",
        "polish": "Warzywa",
        "pronunciation": "/ˈvedʒ.tə.bəlz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You should eat more vegetables.",
        "examplePolish": "Powinieneś jeść więcej warzyw."
      },
      {
        "id": "restaurant-25",
        "english": "Napkin",
        "polish": "Serwetka",
        "pronunciation": "/ˈnæp.kɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Use a napkin to clean your hands.",
        "examplePolish": "Użyj serwetki, aby wyczyścić ręce."
      },
      {
        "id": "restaurant-26",
        "english": "Bowl",
        "polish": "Miska / Salaterka",
        "pronunciation": "/bəʊl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She filled a bowl with fresh strawberries.",
        "examplePolish": "Napełniła miskę świeżymi truskawkami."
      },
      {
        "id": "restaurant-27",
        "english": "Salt cellar",
        "polish": "Solniczka",
        "pronunciation": "/ˈsɒlt ˌsel.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pass me the salt cellar, please.",
        "examplePolish": "Podaj mi solniczkę, proszę."
      },
      {
        "id": "restaurant-28",
        "english": "Receipt",
        "polish": "Paragon / Potwierdzenie",
        "pronunciation": "/rɪˈsiːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Keep the receipt in case of return.",
        "examplePolish": "Zatrzymaj paragon na wypadek zwrotu."
      },
      {
        "id": "restaurant-29",
        "english": "Tip",
        "polish": "Napiwek",
        "pronunciation": "/tɪp/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We left a ten percent tip for the waiter.",
        "examplePolish": "Zostawiliśmy kelnerowi dziesięcioprocentowy napiwek."
      },
      {
        "id": "restaurant-31",
        "english": "Glass of water",
        "polish": "Szklanka wody",
        "pronunciation": "/ɡlɑːs ɒv ˈwɔː.tər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Could I have a glass of water?",
        "examplePolish": "Czy mógłbym prosić o szklankę wody?"
      },
      {
        "id": "restaurant-34",
        "english": "Bitter",
        "polish": "Gorzki",
        "pronunciation": "/ˈbɪt.ər/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Dark coffee has a bitter taste.",
        "examplePolish": "Ciemna kawa ma gorzki smak."
      },
      {
        "id": "restaurant-35",
        "english": "Sour",
        "polish": "Kwaśny",
        "pronunciation": "/saʊər/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Lemon juice is very sour.",
        "examplePolish": "Sok z cytryny jest bardzo kwaśny."
      },
      {
        "id": "restaurant-36",
        "english": "Salty",
        "polish": "Słony",
        "pronunciation": "/ˈsɒl.ti/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "These potato chips are too salty.",
        "examplePolish": "Te chipsy ziemniaczane są zbyt słone."
      },
      {
        "id": "restaurant-38",
        "english": "Chef",
        "polish": "Szef kuchni",
        "pronunciation": "/ʃef/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The head chef designs the menu.",
        "examplePolish": "Główny szef kuchni projektuje menu."
      },
      {
        "id": "restaurant-39",
        "english": "Taste",
        "polish": "Smakować / Smak",
        "pronunciation": "/teɪst/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Taste this soup, it is great.",
        "examplePolish": "Spróbuj tej zupy, jest świetna."
      },
      {
        "id": "restaurant-40",
        "english": "Recommendation",
        "polish": "Rekomendacja",
        "pronunciation": "/ˌrek.ə.menˈdeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is your recommendation?",
        "examplePolish": "Jaka jest twoja rekomendacja?"
      },
      {
        "id": "restaurant-41",
        "english": "Dish",
        "polish": "Danie / Potrawa",
        "pronunciation": "/dɪʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Fish and chips is a classic British dish.",
        "examplePolish": "Ryba z frytkami to klasyczne brytyjskie danie."
      },
      {
        "id": "restaurant-42",
        "english": "Beef",
        "polish": "Wołowina",
        "pronunciation": "/biːf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We ordered medium-rare beef steaks.",
        "examplePolish": "Zamówiliśmy krwiste steki wołowe."
      },
      {
        "id": "restaurant-43",
        "english": "Pork",
        "polish": "Wieprzowina",
        "pronunciation": "/pɔːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pork chops are popular in Poland.",
        "examplePolish": "Kotlety schabowe są popularne w Polsce."
      },
      {
        "id": "restaurant-44",
        "english": "Vegetarian",
        "polish": "Wegetariański",
        "pronunciation": "/ˌvedʒ.ɪˈteə.ri.ən/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Does this cafe serve vegetarian food?",
        "examplePolish": "Czy ta kawiarnia serwuje wegetariańskie jedzenie?"
      },
      {
        "id": "restaurant-45",
        "english": "Vegan",
        "polish": "Wegański",
        "pronunciation": "/ˈviː.ɡən/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "We need a vegan cake option.",
        "examplePolish": "Potrzebujemy wegańskiej opcji ciasta."
      },
      {
        "id": "restaurant-46",
        "english": "Allergy",
        "polish": "Alergia",
        "pronunciation": "/ˈæl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have a nut allergy.",
        "examplePolish": "Mam alergię na orzechy."
      },
      {
        "id": "restaurant-47",
        "english": "Gluten-free",
        "polish": "Bezglutenowy",
        "pronunciation": "/ˌɡluː.tənˈfriː/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Do you have gluten-free bread?",
        "examplePolish": "Czy macie państwo chleb bezglutenowy?"
      }
    ]
  },
  {
    "id": "travel-b1",
    "title": "Navigating Transit (B1)",
    "polishTitle": "Komunikacja i transport",
    "category": "travel",
    "level": "B1",
    "description": "Learn to book accommodation, buy tickets, and ask for directions.",
    "icon": "Train",
    "color": "#ec4899",
    "cards": [
      {
        "id": "travel-b1-1",
        "english": "Departure",
        "polish": "Odlot / Odjazd",
        "pronunciation": "/dɪˈpɑːr.tʃɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Check the departure board.",
        "examplePolish": "Sprawdź tablicę odlotów."
      },
      {
        "id": "travel-b1-2",
        "english": "Arrival",
        "polish": "Przylot / Przyjazd",
        "pronunciation": "/əˈraɪ.vəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We met them at the arrival terminal.",
        "examplePolish": "Spotkaliśmy ich przy terminalu przylotów."
      },
      {
        "id": "travel-b1-3",
        "english": "One-way ticket",
        "polish": "Bilet w jedną stronę",
        "pronunciation": "/wʌn weɪ ˈtɪk.ɪt/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "A one-way ticket is cheaper, but I need to return next week.",
        "examplePolish": "Bilet w jedną stronę jest tańszy, ale muszę wrócić w przyszłym tygodniu."
      },
      {
        "id": "travel-b1-4",
        "english": "Round trip",
        "polish": "Bilet w dwie strony",
        "pronunciation": "/raʊnd trɪp/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "I bought a round trip train ticket to Edinburgh.",
        "examplePolish": "Kupiłem bilet kolejowy w obie strony do Edynburga."
      },
      {
        "id": "travel-b1-5",
        "english": "Platform",
        "polish": "Peron",
        "pronunciation": "/ˈplæt.fɔːrm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The train leaves from platform number two.",
        "examplePolish": "Pociąg odjeżdża z peronu numer dwa."
      },
      {
        "id": "travel-b1-7",
        "english": "Delay",
        "polish": "Opóźnienie",
        "pronunciation": "/dɪˈleɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Heavy rain caused a delay in the schedule.",
        "examplePolish": "Ulewny deszcz spowodował opóźnienie w harmonogramie."
      },
      {
        "id": "travel-b1-8",
        "english": "Passenger",
        "polish": "Pasażer",
        "pronunciation": "/ˈpæs.ən.dʒɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "All passengers must fasten their seatbelts.",
        "examplePolish": "Wszyscy pasażerowie muszą zapiąć pasy bezpieczeństwa."
      },
      {
        "id": "travel-b1-9",
        "english": "Destination",
        "polish": "Cel podróży",
        "pronunciation": "/ˌdes.təˈneɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "After a long journey, we reached our destination.",
        "examplePolish": "Po długiej podróży dotarliśmy do celu."
      },
      {
        "id": "travel-b1-10",
        "english": "To book",
        "polish": "Zarezerwować",
        "pronunciation": "/bʊk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "You should book your flights early to get the best price.",
        "examplePolish": "Powinieneś zarezerwować loty wcześniej, aby uzyskać najlepszą cenę."
      },
      {
        "id": "travel-b1-15",
        "english": "Baggage claim",
        "polish": "Odbiór bagażu",
        "pronunciation": "/ˈbæɡ.ɪdʒ kleɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We waited for our suitcases at the baggage claim.",
        "examplePolish": "Czekaliśmy na nasze walizki przy odbiorze bagażu."
      },
      {
        "id": "travel-b1-17",
        "english": "Immigration",
        "polish": "Kontrola graniczna",
        "pronunciation": "/ˌɪm.ɪˈɡreɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The immigration officer checked our passports.",
        "examplePolish": "Urzędnik kontroli granicznej sprawdził nasze paszporty."
      },
      {
        "id": "travel-b1-18",
        "english": "Visa",
        "polish": "Wiza",
        "pronunciation": "/ˈviː.zə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You need a visa to enter some countries.",
        "examplePolish": "Potrzebujesz wizy, aby wjechać do niektórych krajów."
      },
      {
        "id": "travel-b1-20",
        "english": "Hotel",
        "polish": "Hotel",
        "pronunciation": "/həʊˈtel/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We booked a room in a hotel near the beach.",
        "examplePolish": "Zarezerwowaliśmy pokój w hotelu blisko plaży."
      },
      {
        "id": "travel-b1-21",
        "english": "Check-in",
        "polish": "Odprawa / Zameldowanie",
        "pronunciation": "/ˈtʃek.ɪn/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Check-in starts two hours before flight.",
        "examplePolish": "Odprawa rozpoczyna się dwie godziny przed lotem."
      },
      {
        "id": "travel-b1-22",
        "english": "Check-out",
        "polish": "Wymeldowanie",
        "pronunciation": "/ˈtʃek.aʊt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Check-out time is before 11 AM.",
        "examplePolish": "Czas wymeldowania jest przed godziną 11:00."
      },
      {
        "id": "travel-b1-23",
        "english": "Reception",
        "polish": "Recepcja",
        "pronunciation": "/rɪˈsep.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Leave your room keys at the reception.",
        "examplePolish": "Zostaw klucze do pokoju w recepcji."
      },
      {
        "id": "travel-b1-24",
        "english": "Room service",
        "polish": "Obsługa pokoju",
        "pronunciation": "/ruːm ˈsɜː.vɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We ordered breakfast through room service.",
        "examplePolish": "Zamówiliśmy śniadanie przez obsługę pokoju."
      },
      {
        "id": "travel-b1-27",
        "english": "Ticket office",
        "polish": "Kasa biletowa",
        "pronunciation": "/ˈtɪk.ɪt ˌɒf.ɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You can buy train tickets at the ticket office.",
        "examplePolish": "Bilety kolejowe można kupić w kasie biletowej."
      },
      {
        "id": "travel-b1-28",
        "english": "Timetable",
        "polish": "Rozkład jazdy",
        "pronunciation": "/ˈteɪm.teɪ.bəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Check the timetable for train connections.",
        "examplePolish": "Sprawdź rozkład jazdy pod kątem połączeń kolejowych."
      },
      {
        "id": "travel-b1-30",
        "english": "Cancellation",
        "polish": "Odwołanie (np. lotu)",
        "pronunciation": "/ˌkæn.səlˈeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Flight cancellation caused chaos at the terminal.",
        "examplePolish": "Odwołanie lotu spowodowało chaos na terminalu."
      },
      {
        "id": "travel-b1-32",
        "english": "Fare",
        "polish": "Opłata za przejazd",
        "pronunciation": "/feər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "How much is the taxi fare to the center?",
        "examplePolish": "Ile wynosi opłata za taksówkę do centrum?"
      },
      {
        "id": "travel-b1-36",
        "english": "Tour",
        "polish": "Wycieczka / Objazd",
        "pronunciation": "/tʊər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They took a guided tour of the museum.",
        "examplePolish": "Wzięli udział w wycieczce z przewodnikiem po muzeum."
      },
      {
        "id": "travel-b1-41",
        "english": "Exchange office",
        "polish": "Kantor",
        "pronunciation": "/ɪksˈtʃeɪndʒ ˌɒf.ɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You can exchange dollars at the exchange office.",
        "examplePolish": "Dolary można wymienić w kantorze."
      },
      {
        "id": "travel-b1-44",
        "english": "Luggage scale",
        "polish": "Waga bagażowa",
        "pronunciation": "/ˈlʌɡ.ɪdʒ skeɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Check the weight using the luggage scale.",
        "examplePolish": "Sprawdź wagę bagażu za pomocą wagi."
      },
      {
        "id": "travel-b1-46",
        "english": "Crew",
        "polish": "Załoga",
        "pronunciation": "/kruː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The cabin crew was very friendly.",
        "examplePolish": "Załoga pokładowa była bardzo przyjazna."
      },
      {
        "id": "travel-b1-47",
        "english": "Pilot",
        "polish": "Pilot",
        "pronunciation": "/ˈpaɪ.lət/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The pilot welcomed us on board.",
        "examplePolish": "Pilot powitał nas na pokładzie."
      },
      {
        "id": "travel-b1-50",
        "english": "Traveler",
        "polish": "Podróżnik",
        "pronunciation": "/ˈtræv.əl.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is an experienced traveler.",
        "examplePolish": "On jest doświadczonym podróżnikiem.\n\n\n--- TALIA: Office Basics (B1) / Podstawy biurowe (B1) ---\nOpis: Essential workplace items, basic job roles, and common office routines."
      }
    ]
  },
  {
    "id": "business-b1",
    "title": "Office Basics (B1)",
    "polishTitle": "Podstawy biurowe",
    "category": "business",
    "level": "B1",
    "description": "Essential workplace items, basic job roles, and common office routines.",
    "icon": "Building",
    "color": "#2563eb",
    "cards": [
      {
        "id": "business-b1-1",
        "english": "Colleague",
        "polish": "Kolega z pracy",
        "pronunciation": "/ˈkɑː.liːɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My colleague helped me finish the report.",
        "examplePolish": "Mój kolega z pracy pomógł mi dokończyć raport."
      },
      {
        "id": "business-b1-2",
        "english": "Meeting room",
        "polish": "Sala spotkań",
        "pronunciation": "/ˈmiː.tɪŋ ruːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The meeting room is booked for the marketing presentation at 10 AM.",
        "examplePolish": "Sala konferencyjna jest zarezerwowana na prezentację marketingową o 10:00."
      },
      {
        "id": "business-b1-3",
        "english": "Salary",
        "polish": "Pensja / wynagrodzenie",
        "pronunciation": "/ˈsæl.ɚ.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His monthly salary was increased.",
        "examplePolish": "Jego miesięczna pensja została podniesiona."
      },
      {
        "id": "business-b1-4",
        "english": "To hire",
        "polish": "Zatrudnić",
        "pronunciation": "/haɪr/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Our startup is planning to hire three new software developers.",
        "examplePolish": "Nasz startup planuje zatrudnić trzech nowych programistów."
      },
      {
        "id": "business-b1-5",
        "english": "Project manager",
        "polish": "Kierownik projektu",
        "pronunciation": "/ˈprɑː.dʒekt ˈmæn.ə.dʒɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The project manager assigned daily tasks to the development team.",
        "examplePolish": "Kierownik projektu przydzielił codzienne zadania zespołowi deweloperskiemu."
      },
      {
        "id": "business-b1-6",
        "english": "Office supplies",
        "polish": "Materiały biurowe",
        "pronunciation": "/ˈɑː.fɪs səˈplaɪz/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "We need to order more office supplies like paper and notebooks.",
        "examplePolish": "Musimy zamówić więcej materiałów biurowych, takich jak papier i notatniki."
      },
      {
        "id": "business-b1-7",
        "english": "Deadline",
        "polish": "Termin ostateczny",
        "pronunciation": "/ˈded.laɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The deadline for the report is Friday.",
        "examplePolish": "Ostateczny termin złożenia raportu to piątek."
      },
      {
        "id": "business-b1-8",
        "english": "Feedback",
        "polish": "Informacja zwrotna",
        "pronunciation": "/ˈfiːd.bæk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Customer feedback helps us improve.",
        "examplePolish": "Informacja zwrotna od klientów pomaga nam się rozwijać."
      },
      {
        "id": "business-b1-9",
        "english": "To schedule",
        "polish": "Zaplanować / wyznaczyć termin",
        "pronunciation": "/ˈskedʒ.uːl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Let's schedule a conference call for tomorrow morning.",
        "examplePolish": "Zaplanujmy telekonferencję na jutro rano."
      },
      {
        "id": "business-b1-10",
        "english": "Employee",
        "polish": "Pracownik",
        "pronunciation": "/ɪmˈplɔɪ.iː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is a very valuable employee.",
        "examplePolish": "On jest bardzo wartościowym pracownikiem."
      },
      {
        "id": "business-b1-11",
        "english": "Office",
        "polish": "Biuro",
        "pronunciation": "/ˈɒf.ɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I go to the office at nine o'clock.",
        "examplePolish": "Idę do biura o dziewiątej."
      },
      {
        "id": "business-b1-12",
        "english": "Company",
        "polish": "Firma",
        "pronunciation": "/ˈkʌm.pə.ni/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She works for a tech company.",
        "examplePolish": "Ona pracuje dla firmy technologicznej."
      },
      {
        "id": "business-b1-13",
        "english": "Business",
        "polish": "Biznes / Biznesowy",
        "pronunciation": "/ˈbɪz.nɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The meeting was about business strategies.",
        "examplePolish": "Spotkanie dotyczyło strategii biznesowych."
      },
      {
        "id": "business-b1-14",
        "english": "Job",
        "polish": "Praca / Zawód",
        "pronunciation": "/dʒɒb/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She got a new job in marketing.",
        "examplePolish": "Dostała nową pracę w marketingu."
      },
      {
        "id": "business-b1-15",
        "english": "Career",
        "polish": "Kariera",
        "pronunciation": "/kəˈrɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He wants to build a career in finance.",
        "examplePolish": "On chce zbudować karierę w finansach."
      },
      {
        "id": "business-b1-16",
        "english": "Boss",
        "polish": "Szef",
        "pronunciation": "/bɒs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My boss approved my holiday request.",
        "examplePolish": "Mój szef zatwierdził mój wniosek o urlop."
      },
      {
        "id": "business-b1-17",
        "english": "Manager",
        "polish": "Menedżer / kierownik",
        "pronunciation": "/ˈmæn.ɪ.dʒər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our manager is helpful and fair.",
        "examplePolish": "Nasz menedżer jest pomocny i sprawiedliwy."
      },
      {
        "id": "business-b1-19",
        "english": "Staff",
        "polish": "Personel / Kadra",
        "pronunciation": "/stɑːf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "All staff members must attend the meeting.",
        "examplePolish": "Wszyscy członkowie personelu muszą wziąć udział w spotkaniu."
      },
      {
        "id": "business-b1-21",
        "english": "Partner",
        "polish": "Partner",
        "pronunciation": "/ˈpɑːt.nər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They became business partners in 2020.",
        "examplePolish": "Zostali partnerami biznesowymi w 2020 roku."
      },
      {
        "id": "business-b1-22",
        "english": "Client",
        "polish": "Klient",
        "pronunciation": "/ˈklaɪ.ənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We have a meeting with an important client.",
        "examplePolish": "Mamy spotkanie z ważnym klientem."
      },
      {
        "id": "business-b1-23",
        "english": "Meeting",
        "polish": "Spotkanie",
        "pronunciation": "/ˈmiː.tɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have an important business meeting tomorrow.",
        "examplePolish": "Mam jutro ważne spotkanie biznesowe."
      },
      {
        "id": "business-b1-24",
        "english": "Schedule",
        "polish": "Harmonogram",
        "pronunciation": "/ˈʃedʒ.uːl/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We must keep to the project schedule.",
        "examplePolish": "Musimy trzymać się harmonogramu projektu."
      },
      {
        "id": "business-b1-26",
        "english": "Project",
        "polish": "Projekt",
        "pronunciation": "/ˈprɒdʒ.ekt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This project requires teamwork.",
        "examplePolish": "Ten projekt wymaga pracy zespołowej."
      },
      {
        "id": "business-b1-27",
        "english": "Task",
        "polish": "Zadanie",
        "pronunciation": "/tɑːsk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Your first task is to analyze the data.",
        "examplePolish": "Twoim pierwszym zadaniem jest analiza danych."
      },
      {
        "id": "business-b1-28",
        "english": "Report",
        "polish": "Raport / Sprawozdanie",
        "pronunciation": "/rɪˈpɔːt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Please write a summary of the report.",
        "examplePolish": "Proszę napisać podsumowanie raportu."
      },
      {
        "id": "business-b1-30",
        "english": "Presentation",
        "polish": "Prezentacja",
        "pronunciation": "/ˌprez.enˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The sales manager prepared a presentation.",
        "examplePolish": "Menedżer sprzedaży przygotował prezentację."
      },
      {
        "id": "business-b1-31",
        "english": "Contract",
        "polish": "Umowa / Kontrakt",
        "pronunciation": "/ˈkɒn.trækt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Read the contract carefully before signing.",
        "examplePolish": "Przeczytaj uważnie umowę przed jej podpisaniem."
      },
      {
        "id": "business-b1-32",
        "english": "Agreement",
        "polish": "Porozumienie / Zgoda",
        "pronunciation": "/əˈɡriː.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The two parties reached an agreement.",
        "examplePolish": "Obie strony osiągnęły porozumienie."
      },
      {
        "id": "business-b1-33",
        "english": "Deal",
        "polish": "Transakcja / Umowa",
        "pronunciation": "/diːl/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We closed a great deal yesterday.",
        "examplePolish": "Wczoraj sfinalizowaliśmy świetną transakcję."
      },
      {
        "id": "business-b1-34",
        "english": "Sales",
        "polish": "Sprzedaż",
        "pronunciation": "/seɪlz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Sales have increased by ten percent.",
        "examplePolish": "Sprzedaż wzrosła o dziesięć procent."
      },
      {
        "id": "business-b1-35",
        "english": "Marketing",
        "polish": "Marketing",
        "pronunciation": "/ˈmɑː.kɪ.tɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She works in the marketing department.",
        "examplePolish": "Ona pracuje w dziale marketingu."
      },
      {
        "id": "business-b1-36",
        "english": "Product",
        "polish": "Produkt",
        "pronunciation": "/ˈprɒd.ʌkt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company launched a new product.",
        "examplePolish": "Firma wprowadziła na rynek nowy produkt."
      },
      {
        "id": "business-b1-37",
        "english": "Service",
        "polish": "Usługa",
        "pronunciation": "/ˈsɜː.vɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We aim to provide excellent service.",
        "examplePolish": "Dążymy do świadczenia doskonałych usług."
      },
      {
        "id": "business-b1-38",
        "english": "Price",
        "polish": "Cena",
        "pronunciation": "/praɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is the price of this dress?",
        "examplePolish": "Jaka jest cena tej sukienki?"
      },
      {
        "id": "business-b1-39",
        "english": "Cost",
        "polish": "Koszt",
        "pronunciation": "/kɒst/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We need to reduce production costs.",
        "examplePolish": "Musimy obniżyć koszty produkcji."
      },
      {
        "id": "business-b1-40",
        "english": "Budget",
        "polish": "Budżet",
        "pronunciation": "/ˈbʌdʒ.ɪt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We are working on a tight budget.",
        "examplePolish": "Pracujemy przy napiętym budżecie."
      },
      {
        "id": "business-b1-41",
        "english": "Finance",
        "polish": "Finanse",
        "pronunciation": "/ˈfaɪ.næns/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "He is the director of finance.",
        "examplePolish": "On jest dyrektorem ds. finansów."
      },
      {
        "id": "business-b1-42",
        "english": "Profit",
        "polish": "Zysk",
        "pronunciation": "/ˈprɒf.ɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company made a huge profit last year.",
        "examplePolish": "Firma osiągnęła ogromny zysk w zeszłym roku."
      },
      {
        "id": "business-b1-43",
        "english": "Loss",
        "polish": "Strata",
        "pronunciation": "/lɒs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We reported a small financial loss.",
        "examplePolish": "Zgłosiliśmy niewielką stratę finansową."
      },
      {
        "id": "business-b1-44",
        "english": "Tax",
        "polish": "Podatek",
        "pronunciation": "/tæks/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Income tax is deducted automatically.",
        "examplePolish": "Podatek dochodowy jest potrącany automatycznie."
      },
      {
        "id": "business-b1-46",
        "english": "Wage",
        "polish": "Tygodniówka / Stawka",
        "pronunciation": "/weɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The minimum hourly wage was increased.",
        "examplePolish": "Minimalna stawka godzinowa została podniesiona."
      },
      {
        "id": "business-b1-47",
        "english": "Invoice",
        "polish": "Faktura",
        "pronunciation": "/ˈɪn.vɔɪs/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Please send us the invoice for the goods.",
        "examplePolish": "Proszę wysłać nam fakturę za towary."
      },
      {
        "id": "business-b1-50",
        "english": "Team",
        "polish": "Zespół",
        "pronunciation": "/tiːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our team consists of five developers.",
        "examplePolish": "Nasz zespół składa się z pięciu programistów.\n\n\n--- TALIA: Digital Literacy (B1) / Podstawy cyfrowe (B1) ---\nOpis: Common vocabulary for using web software, web browsers, and computer devices."
      }
    ]
  },
  {
    "id": "tech-b1",
    "title": "Digital Literacy (B1)",
    "polishTitle": "Podstawy cyfrowe",
    "category": "tech",
    "level": "B1",
    "description": "Common vocabulary for using web software, web browsers, and computer devices.",
    "icon": "Monitor",
    "color": "#06b6d4",
    "cards": [
      {
        "id": "tech-b1-1",
        "english": "Web browser",
        "polish": "Przeglądarka internetowa",
        "pronunciation": "/web ˈbraʊ.zɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Google Chrome is currently the most popular web browser.",
        "examplePolish": "Google Chrome jest obecnie najpopularniejszą przeglądarką internetową."
      },
      {
        "id": "tech-b1-2",
        "english": "Keyboard",
        "polish": "Klawiatura",
        "pronunciation": "/ˈkiː.bɔːrd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Clean the keyboard with compressed air.",
        "examplePolish": "Wyczyść klawiaturę sprężonym powietrzem."
      },
      {
        "id": "tech-b1-3",
        "english": "To download",
        "polish": "Pobrać / ściągnąć",
        "pronunciation": "/daʊnˈloʊd/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Click the link below to download the application updates.",
        "examplePolish": "Kliknij poniższy link, aby pobrać aktualizacje aplikacji."
      },
      {
        "id": "tech-b1-4",
        "english": "Password",
        "polish": "Hasło",
        "pronunciation": "/ˈpæs.wɝːd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Choose a strong password with symbols.",
        "examplePolish": "Wybierz silne hasło z symbolami."
      },
      {
        "id": "tech-b1-5",
        "english": "File folder",
        "polish": "Folder na pliki",
        "pronunciation": "/faɪl ˈfoʊl.dɚ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Organize your project documents inside a separate file folder.",
        "examplePolish": "Uporządkuj dokumenty projektu w osobnym folderze."
      },
      {
        "id": "tech-b1-6",
        "english": "Network connection",
        "polish": "Połączenie sieciowe",
        "pronunciation": "/ˈnet.wɝːk kəˈnek.ʃən/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "The internet went down due to a poor network connection.",
        "examplePolish": "Internet przestał działać z powodu słabego połączenia sieciowego."
      },
      {
        "id": "tech-b1-7",
        "english": "Data",
        "polish": "Dane",
        "pronunciation": "/ˈdeɪ.t̬ə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to gather more user data.",
        "examplePolish": "Musimy zebrać więcej danych użytkowników."
      },
      {
        "id": "tech-b1-8",
        "english": "To install",
        "polish": "Zainstalować",
        "pronunciation": "/ɪnˈstɑːl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "You need to install the latest security updates.",
        "examplePolish": "Musisz zainstalować najnowsze aktualizacje bezpieczeństwa."
      },
      {
        "id": "tech-b1-9",
        "english": "Device",
        "polish": "Urządzenie",
        "pronunciation": "/dɪˈvaɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Make sure to connect your mobile device to the Wi-Fi.",
        "examplePolish": "Upewnij się, że podłączyłeś swoje urządzenie mobilne do Wi-Fi."
      },
      {
        "id": "tech-b1-10",
        "english": "Software",
        "polish": "Oprogramowanie",
        "pronunciation": "/ˈsɑːft.wer/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Keep your antivirus software updated.",
        "examplePolish": "Dbaj o aktualność oprogramowania antywirusowego."
      },
      {
        "id": "tech-b1-11",
        "english": "Computer",
        "polish": "Komputer",
        "pronunciation": "/kəmˈpjuː.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Restart your computer to apply updates.",
        "examplePolish": "Uruchom ponownie komputer, aby zastosować aktualizacje."
      },
      {
        "id": "tech-b1-12",
        "english": "Laptop",
        "polish": "Laptop",
        "pronunciation": "/ˈlæp.tɒp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I carry my laptop in a backpack.",
        "examplePolish": "Noszę swój laptop w plecaku."
      },
      {
        "id": "tech-b1-13",
        "english": "Screen",
        "polish": "Ekran",
        "pronunciation": "/skriːn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The laptop has a high-resolution screen.",
        "examplePolish": "Laptop ma ekran o wysokiej rozdzielczości."
      },
      {
        "id": "tech-b1-15",
        "english": "Mouse",
        "polish": "Myszka",
        "pronunciation": "/maʊs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My wireless mouse needs a new battery.",
        "examplePolish": "Moja mysz bezprzewodowa potrzebuje nowej baterii."
      },
      {
        "id": "tech-b1-16",
        "english": "Printer",
        "polish": "Drukarka",
        "pronunciation": "/ˈprɪn.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The printer is out of blue ink.",
        "examplePolish": "W drukarce skończył się niebieski tusz."
      },
      {
        "id": "tech-b1-18",
        "english": "Hardware",
        "polish": "Sprzęt (hardware)",
        "pronunciation": "/ˈhɑːd.weər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to upgrade the server hardware.",
        "examplePolish": "Musimy ulepszyć sprzęt serwerowy."
      },
      {
        "id": "tech-b1-19",
        "english": "App",
        "polish": "Aplikacja",
        "pronunciation": "/æp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Download our mobile app from the store.",
        "examplePolish": "Pobierz naszą aplikację mobilną ze sklepu."
      },
      {
        "id": "tech-b1-20",
        "english": "Application",
        "polish": "Zastosowanie / Aplikacja",
        "pronunciation": "/ˌæp.lɪˈkeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This application works on all platforms.",
        "examplePolish": "Ta aplikacja działa na wszystkich platformach."
      },
      {
        "id": "tech-b1-21",
        "english": "Website",
        "polish": "Strona internetowa",
        "pronunciation": "/ˈweb.saɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Visit our website for more information.",
        "examplePolish": "Odwiedź naszą stronę internetową, aby uzyskać więcej informacji."
      },
      {
        "id": "tech-b1-22",
        "english": "Webpage",
        "polish": "Podstrona internetowa",
        "pronunciation": "/ˈweb.peɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Bookmark this webpage for quick access.",
        "examplePolish": "Dodaj tę podstronę do zakładek, aby mieć szybki dostęp."
      },
      {
        "id": "tech-b1-23",
        "english": "Internet",
        "polish": "Internet",
        "pronunciation": "/ˈɪn.tə.net/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The internet connection is very slow today.",
        "examplePolish": "Połączenie internetowe jest dzisiaj bardzo wolne."
      },
      {
        "id": "tech-b1-24",
        "english": "Network",
        "polish": "Sieć",
        "pronunciation": "/ˈnet.wɜːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We have a secure office network.",
        "examplePolish": "Mamy bezpieczną sieć biurową."
      },
      {
        "id": "tech-b1-25",
        "english": "Wi-Fi",
        "polish": "Wi-Fi",
        "pronunciation": "/ˈwaɪ.faɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is the password for the Wi-Fi?",
        "examplePolish": "Jakie jest hasło do Wi-Fi?"
      },
      {
        "id": "tech-b1-27",
        "english": "Username",
        "polish": "Nazwa użytkownika",
        "pronunciation": "/ˈjuː.zə.neɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Enter your username and password.",
        "examplePolish": "Wprowadź swoją nazwę użytkownika i hasło."
      },
      {
        "id": "tech-b1-28",
        "english": "Message",
        "polish": "Wiadomość",
        "pronunciation": "/ˈmes.ɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I sent you a message on WhatsApp.",
        "examplePolish": "Wysłałem ci wiadomość na WhatsAppie."
      },
      {
        "id": "tech-b1-29",
        "english": "File",
        "polish": "Plik",
        "pronunciation": "/faɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Please download the attached PDF file.",
        "examplePolish": "Proszę pobrać załączony plik PDF."
      },
      {
        "id": "tech-b1-30",
        "english": "Folder",
        "polish": "Folder / Katalog",
        "pronunciation": "/ˈfəʊl.dər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Save all documents in one folder.",
        "examplePolish": "Zapisz wszystkie dokumenty w jednym folderze."
      },
      {
        "id": "tech-b1-31",
        "english": "Document",
        "polish": "Dokument",
        "pronunciation": "/ˈdɒk.jə.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Print this document and sign it.",
        "examplePolish": "Wydrukuj ten dokument i podpisz go."
      },
      {
        "id": "tech-b1-33",
        "english": "Database",
        "polish": "Baza danych",
        "pronunciation": "/ˈdeɪ.tə.beɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to optimize the database queries to improve loading speed.",
        "examplePolish": "Musimy zoptymalizować zapytania do bazy danych, aby poprawić szybkość ładowania."
      },
      {
        "id": "tech-b1-34",
        "english": "Server",
        "polish": "Serwer",
        "pronunciation": "/ˈsɜː.vər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The server went offline for maintenance.",
        "examplePolish": "Serwer przeszedł w tryb offline z powodu konserwacji."
      },
      {
        "id": "tech-b1-36",
        "english": "Backup",
        "polish": "Kopia zapasowa",
        "pronunciation": "/ˈbæk.ʌp/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Create a backup of your important files.",
        "examplePolish": "Utwórz kopię zapasową swoich ważnych plików."
      },
      {
        "id": "tech-b1-37",
        "english": "Security",
        "polish": "Bezpieczeństwo",
        "pronunciation": "/sɪˈkjʊə.rə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "IT security is a major concern.",
        "examplePolish": "Bezpieczeństwo IT to poważny problem."
      },
      {
        "id": "tech-b1-38",
        "english": "Virus",
        "polish": "Wirus",
        "pronunciation": "/ˈvaɪ.rəs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My computer has a virus infection.",
        "examplePolish": "Mój komputer ma infekcję wirusową."
      },
      {
        "id": "tech-b1-39",
        "english": "Hacker",
        "polish": "Haker",
        "pronunciation": "/ˈhæk.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A hacker breached the website security.",
        "examplePolish": "Haker złamał zabezpieczenia strony internetowej."
      },
      {
        "id": "tech-b1-40",
        "english": "Code",
        "polish": "Kod / Kodować",
        "pronunciation": "/kəʊd/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "He writes clean code in JavaScript.",
        "examplePolish": "On pisze czysty kod w JavaScript."
      },
      {
        "id": "tech-b1-41",
        "english": "Programming",
        "polish": "Programowanie",
        "pronunciation": "/ˈprəʊ.ɡræm.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Programming requires logical thinking.",
        "examplePolish": "Programowanie wymaga logicznego myślenia."
      },
      {
        "id": "tech-b1-42",
        "english": "Bug",
        "polish": "Błąd w programie / usterka",
        "pronunciation": "/bʌɡ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The developer fixed the bug that was causing the app to crash during signup.",
        "examplePolish": "Programista naprawił błąd, który powodował zawieszanie się aplikacji podczas rejestracji."
      },
      {
        "id": "tech-b1-43",
        "english": "Error",
        "polish": "Błąd (ogólny)",
        "pronunciation": "/ˈer.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The application returned a connection error.",
        "examplePolish": "Aplikacja zwróciła błąd połączenia."
      },
      {
        "id": "tech-b1-44",
        "english": "Update",
        "polish": "Aktualizacja / Aktualizować",
        "pronunciation": "/ʌpˈdeɪt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Install the latest update immediately.",
        "examplePolish": "Zainstaluj natychmiast najnowszą aktualizację."
      },
      {
        "id": "tech-b1-45",
        "english": "Upgrade",
        "polish": "Uaktualnić sprzęt",
        "pronunciation": "/ʌpˈɡreɪd/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We need to upgrade our office PCs.",
        "examplePolish": "Musimy uaktualnić nasze biurowe komputery."
      },
      {
        "id": "tech-b1-46",
        "english": "To Install",
        "polish": "Instalować",
        "pronunciation": "/ɪnˈstɔːl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Install this application on your phone.",
        "examplePolish": "Zainstaluj tę aplikację na swoim telefonie."
      },
      {
        "id": "tech-b1-47",
        "english": "To Uninstall",
        "polish": "Odinstalować",
        "pronunciation": "/ˌʌn.ɪnˈstɔːl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Uninstall unused apps to free space.",
        "examplePolish": "Odinstaluj nieużywane aplikacje, aby zwolnić miejsce."
      },
      {
        "id": "tech-b1-48",
        "english": "Download",
        "polish": "Pobierać / Ściągać",
        "pronunciation": "/ˌdaʊnˈləʊd/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Download the installation file from here.",
        "examplePolish": "Pobierz plik instalacyjny stąd."
      },
      {
        "id": "tech-b1-49",
        "english": "Upload",
        "polish": "Przesyłać na serwer",
        "pronunciation": "/ˌʌpˈləʊd/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Upload your homework to the platform.",
        "examplePolish": "Prześlij swoją pracę domową na platformę."
      },
      {
        "id": "tech-b1-50",
        "english": "User",
        "polish": "Użytkownik",
        "pronunciation": "/ˈjuː.zər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The system has active users daily.",
        "examplePolish": "System ma aktywnych użytkowników każdego dnia.\n\n\n--- TALIA: Leisure & Media (B1) / Rozrywka i media (B1) ---\nOpis: Talk about cinematography, popular literature, and your artistic hobbies."
      }
    ]
  },
  {
    "id": "culture-b1",
    "title": "Leisure & Media (B1)",
    "polishTitle": "Rozrywka i media",
    "category": "culture",
    "level": "B1",
    "description": "Talk about cinematography, popular literature, and your artistic hobbies.",
    "icon": "Film",
    "color": "#a855f7",
    "cards": [
      {
        "id": "culture-b1-1",
        "english": "Exhibition",
        "polish": "Wystawa",
        "pronunciation": "/ˌek.səˈbɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We visited a photography exhibition.",
        "examplePolish": "Odwiedziliśmy wystawę fotografii."
      },
      {
        "id": "culture-b1-2",
        "english": "Performance",
        "polish": "Występ",
        "pronunciation": "/pɚˈfɔːr.məns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The musicians gave a brilliant performance.",
        "examplePolish": "Muzycy dali genialny występ."
      },
      {
        "id": "culture-b1-3",
        "english": "To broadcast",
        "polish": "Nadawać / transmitować",
        "pronunciation": "/ˈbrɔːd.kæst/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The final match will be broadcast live to millions of sports fans.",
        "examplePolish": "Finałowy mecz będzie transmitowany na żywo do milionów fanów sportu."
      },
      {
        "id": "culture-b1-4",
        "english": "Genre",
        "polish": "Gatunek (np. literacki, muzyczny)",
        "pronunciation": "/ˈʒɑːn.rə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My favorite movie genre is science fiction.",
        "examplePolish": "Moim ulubionym gatunkiem filmowym jest fantastyka naukowa."
      },
      {
        "id": "culture-b1-5",
        "english": "Audience",
        "polish": "Widownia / publiczność",
        "pronunciation": "/ˈɑː.di.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The audience cheered at the end of the show.",
        "examplePolish": "Publiczność wiwatowała na koniec widowiska."
      },
      {
        "id": "culture-b1-6",
        "english": "Masterpiece",
        "polish": "Arcydzieło",
        "pronunciation": "/ˈmæs.tɚ.piːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Da Vinci's Mona Lisa is considered a worldwide artistic masterpiece.",
        "examplePolish": "Mona Lisa Da Vinciego jest uważana za światowe arcydzieło sztuki."
      },
      {
        "id": "culture-b1-7",
        "english": "Review",
        "polish": "Recenzja",
        "pronunciation": "/rɪˈvjuː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The new film received positive reviews from critics.",
        "examplePolish": "Nowy film otrzymał pozytywne recenzje od krytyków."
      },
      {
        "id": "culture-b1-8",
        "english": "Festival",
        "polish": "Festiwal",
        "pronunciation": "/ˈfes.tə.vəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We went to a summer film festival.",
        "examplePolish": "Pojechaliśmy na letni festiwal filmowy."
      },
      {
        "id": "culture-b1-9",
        "english": "To entertain",
        "polish": "Zapewniać rozrywkę",
        "pronunciation": "/ˌen.t̬ɚˈteɪn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The magician entertained the kids for two hours.",
        "examplePolish": "Magik zapewniał dzieciom rozrywkę przez dwie godziny."
      },
      {
        "id": "culture-b1-10",
        "english": "Creativity",
        "polish": "Kreatywność",
        "pronunciation": "/ˌkriː.eɪˈtɪv.ə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Children often show a high level of natural creativity.",
        "examplePolish": "Dzieci często wykazują wysoki poziom naturalnej kreatywności."
      },
      {
        "id": "culture-b1-11",
        "english": "Art",
        "polish": "Sztuka",
        "pronunciation": "/ɑːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Modern art is hard to understand.",
        "examplePolish": "Sztukę nowoczesną trudno zrozumieć."
      },
      {
        "id": "culture-b1-12",
        "english": "Artist",
        "polish": "Artysta",
        "pronunciation": "/ˈɑː.tɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is a talented musical artist.",
        "examplePolish": "Ona jest utalentowaną artystką muzyczną."
      },
      {
        "id": "culture-b1-13",
        "english": "Painting",
        "polish": "Obraz / Malarstwo",
        "pronunciation": "/ˈpeɪn.tɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This oil painting costs a fortune.",
        "examplePolish": "Ten obraz olejny kosztuje fortunę."
      },
      {
        "id": "culture-b1-14",
        "english": "Drawing",
        "polish": "Rysunek",
        "pronunciation": "/ˈdrɔː.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She made a pencil drawing of a cat.",
        "examplePolish": "Zrobiła ołówkowy rysunek kota."
      },
      {
        "id": "culture-b1-15",
        "english": "Sculpture",
        "polish": "Rzeźba",
        "pronunciation": "/ˈskʌlp.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The sculpture is made of white marble.",
        "examplePolish": "Rzeźba wykonana jest z białego marmuru."
      },
      {
        "id": "culture-b1-17",
        "english": "Gallery",
        "polish": "Galeria",
        "pronunciation": "/ˈɡæl.ər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The gallery exhibits modern sculptures.",
        "examplePolish": "Galeria wystawia nowoczesne rzeźby."
      },
      {
        "id": "culture-b1-19",
        "english": "Music",
        "polish": "Muzyka",
        "pronunciation": "/ˈmjuː.zɪk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Classical music helps me concentrate.",
        "examplePolish": "Muzyka klasyczna pomaga mi się skoncentrować."
      },
      {
        "id": "culture-b1-20",
        "english": "Musician",
        "polish": "Muzyk",
        "pronunciation": "/mjuːˈzɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The street musician played the violin.",
        "examplePolish": "Uliczny muzyk grał na skrzypcach."
      },
      {
        "id": "culture-b1-21",
        "english": "Song",
        "polish": "Piosenka",
        "pronunciation": "/sɒŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This song was very popular in the 90s.",
        "examplePolish": "Ta piosenka była bardzo popularna w latach 90."
      },
      {
        "id": "culture-b1-22",
        "english": "Album",
        "polish": "Album / Płyta",
        "pronunciation": "/ˈæl.bəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The band released a new studio album.",
        "examplePolish": "Zespół wydał nowy album studyjny."
      },
      {
        "id": "culture-b1-23",
        "english": "Concert",
        "polish": "Koncert",
        "pronunciation": "/ˈkɒn.sət/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We bought tickets for a rock concert.",
        "examplePolish": "Kupiliśmy bilety na koncert rockowy."
      },
      {
        "id": "culture-b1-24",
        "english": "Theatre",
        "polish": "Teatr",
        "pronunciation": "/ˈθɪə.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They go to the theatre once a month.",
        "examplePolish": "Oni chodzą do teatru raz w miesiącu."
      },
      {
        "id": "culture-b1-25",
        "english": "Play",
        "polish": "Sztuka teatralna",
        "pronunciation": "/pleɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We watched a Shakespeare play last night.",
        "examplePolish": "Wczoraj wieczorem obejrzeliśmy sztukę Szekspira."
      },
      {
        "id": "culture-b1-26",
        "english": "Actor",
        "polish": "Aktor",
        "pronunciation": "/ˈæk.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is a famous Hollywood actor.",
        "examplePolish": "On jest sławnym aktorem z Hollywood."
      },
      {
        "id": "culture-b1-27",
        "english": "Actress",
        "polish": "Aktorka",
        "pronunciation": "/ˈæk.trəs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The actress won an award for her role.",
        "examplePolish": "Aktorka otrzymała nagrodę za swoją rolę."
      },
      {
        "id": "culture-b1-28",
        "english": "Stage",
        "polish": "Scena",
        "pronunciation": "/steɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The actors performed on a dark stage.",
        "examplePolish": "Aktorzy występowali na ciemnej scenie."
      },
      {
        "id": "culture-b1-29",
        "english": "Cinema",
        "polish": "Kino",
        "pronunciation": "/ˈsɪn.ə.mɑː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Let's go to the cinema tonight.",
        "examplePolish": "Chodźmy dzisiaj wieczorem do kina."
      },
      {
        "id": "culture-b1-30",
        "english": "Movie",
        "polish": "Film",
        "pronunciation": "/ˈmuː.vi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is your favorite movie?",
        "examplePolish": "Jaki jest twój ulubiony film?"
      },
      {
        "id": "culture-b1-31",
        "english": "Director",
        "polish": "Reżyser",
        "pronunciation": "/daɪˈrek.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The director won the Oscar prize.",
        "examplePolish": "Reżyser zdobył nagrodę Oscara."
      },
      {
        "id": "culture-b1-33",
        "english": "Author",
        "polish": "Autor",
        "pronunciation": "/ˈɔː.θər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Who is the author of this novel?",
        "examplePolish": "Kto jest autorem tej powieści?"
      },
      {
        "id": "culture-b1-34",
        "english": "Writer",
        "polish": "Pisarz",
        "pronunciation": "/ˈraɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The writer is working on a new book.",
        "examplePolish": "Pisarz pracuje nad nową książką."
      },
      {
        "id": "culture-b1-35",
        "english": "Novel",
        "polish": "Powieść",
        "pronunciation": "/ˈnɒv.əl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He wrote an adventure novel for teenagers.",
        "examplePolish": "Napisał powieść przygodową dla nastolatków."
      },
      {
        "id": "culture-b1-36",
        "english": "Poetry",
        "polish": "Poezja",
        "pronunciation": "/ˈpəʊ.ɪ.tri/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She writes beautiful romantic poetry.",
        "examplePolish": "Ona pisze piękną poezję romantyczną."
      },
      {
        "id": "culture-b1-37",
        "english": "Poem",
        "polish": "Wiersz",
        "pronunciation": "/ˈpəʊ.ɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The child recited a short poem.",
        "examplePolish": "Dziecko wyrecytowało krótki wiersz."
      },
      {
        "id": "culture-b1-38",
        "english": "Dance",
        "polish": "Taniec / Tańczyć",
        "pronunciation": "/dɑːns/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Modern dance requires a lot of energy.",
        "examplePolish": "Taniec współczesny wymaga dużo energii."
      },
      {
        "id": "culture-b1-39",
        "english": "Dancer",
        "polish": "Tancerz",
        "pronunciation": "/ˈdɑːn.sər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is a professional ballet dancer.",
        "examplePolish": "Ona jest profesjonalną tancerką baletową."
      },
      {
        "id": "culture-b1-40",
        "english": "Show",
        "polish": "Przedstawienie / Widowisko",
        "pronunciation": "/ʃəʊ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The magic show was very entertaining.",
        "examplePolish": "Pokaz iluzji był bardzo zajmujący."
      },
      {
        "id": "culture-b1-43",
        "english": "Holiday",
        "polish": "Święto / Wakacje",
        "pronunciation": "/ˈhɒl.ə.deɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Christmas is a family holiday.",
        "examplePolish": "Boże Narodzenie to święto rodzinne."
      },
      {
        "id": "culture-b1-44",
        "english": "Tradition",
        "polish": "Tradycja",
        "pronunciation": "/trəˈdɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It is a tradition to eat fish on Christmas Eve.",
        "examplePolish": "Tradycją jest jedzenie ryby w Wigilię."
      },
      {
        "id": "culture-b1-45",
        "english": "Custom",
        "polish": "Zwyczaj",
        "pronunciation": "/ˈkʌs.təm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Local customs vary between regions.",
        "examplePolish": "Lokalne zwyczaje różnią się między regionami."
      },
      {
        "id": "culture-b1-46",
        "english": "History",
        "polish": "Historia",
        "pronunciation": "/ˈhɪs.tər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I like reading books about history.",
        "examplePolish": "Lubię czytać książki o historii."
      },
      {
        "id": "culture-b1-47",
        "english": "Heritage",
        "polish": "Dziedzictwo",
        "pronunciation": "/ˈher.ɪ.tɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must preserve our cultural heritage.",
        "examplePolish": "Musimy chronić nasze dziedzictwo kulturowe."
      },
      {
        "id": "culture-b1-48",
        "english": "Language",
        "polish": "Język",
        "pronunciation": "/ˈlæŋ.ɡwɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "English is a global language.",
        "examplePolish": "Angielski to język globalny."
      },
      {
        "id": "culture-b1-49",
        "english": "Dialect",
        "polish": "Dialekt",
        "pronunciation": "/ˈdaɪ.ə.lekt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He speaks a local dialect of Polish.",
        "examplePolish": "On mówi lokalnym dialektem języka polskiego."
      },
      {
        "id": "culture-b1-50",
        "english": "Culture",
        "polish": "Kultura",
        "pronunciation": "/ˈkʌl.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We learned about Japanese culture.",
        "examplePolish": "Uczyliśmy się o kulturze japońskiej.\n\n\n--- TALIA: Climate & Ecology (B1) / Klimat i ekologia (B1) ---\nOpis: Discuss environmental protection, ecosystem sustainability, and habitats."
      }
    ]
  },
  {
    "id": "nature-b1",
    "title": "Climate & Ecology (B1)",
    "polishTitle": "Klimat i ekologia",
    "category": "nature",
    "level": "B1",
    "description": "Discuss environmental protection, ecosystem sustainability, and habitats.",
    "icon": "Trees",
    "color": "#22c55e",
    "cards": [
      {
        "id": "nature-b1-1",
        "english": "Global warming",
        "polish": "Globalne ocieplenie",
        "pronunciation": "/ˌɡloʊ.bəl ˈwɔːr.mɪŋ/",
        "partOfSpeech": "noun phrase",
        "exampleEnglish": "Global warming is melting polar ice caps.",
        "examplePolish": "Globalne ocieplenie topi czapy lodowe."
      },
      {
        "id": "nature-b1-2",
        "english": "Recycling",
        "polish": "Recykling",
        "pronunciation": "/ˌriːˈsaɪ.klɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Recycling helps to save natural resources.",
        "examplePolish": "Recykling pomaga oszczędzać zasoby naturalne."
      },
      {
        "id": "nature-b1-3",
        "english": "Habitat",
        "polish": "Siedlisko / Środowisko",
        "pronunciation": "/ˈhæb.ə.tæt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The rainforest is a rich natural habitat.",
        "examplePolish": "Las deszczowy to bogate siedlisko naturalne."
      },
      {
        "id": "nature-b1-4",
        "english": "Species",
        "polish": "Gatunek (biologiczny)",
        "pronunciation": "/ˈspiː.ʃiːz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Many plant and animal species face extinction due to pollution.",
        "examplePolish": "Wiele gatunków roślin i zwierząt stoi w obliczu wyginięcia z powodu zanieczyszczeń."
      },
      {
        "id": "nature-b1-5",
        "english": "Pollution",
        "polish": "Zanieczyszczenie",
        "pronunciation": "/pəˈluː.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Air pollution is high in big cities.",
        "examplePolish": "Zanieczyszczenie powietrza jest wysokie w dużych miastach."
      },
      {
        "id": "nature-b1-6",
        "english": "Conservation",
        "polish": "Ochrona (przyrody)",
        "pronunciation": "/ˌkɑːn.sɚˈveɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Nature conservation is very important.",
        "examplePolish": "Ochrona przyrody jest bardzo ważna."
      },
      {
        "id": "nature-b1-7",
        "english": "Eco-friendly",
        "polish": "Przyjazny środowisku",
        "pronunciation": "/ˌiː.koʊˈfrend.li/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Choose eco-friendly cleaning products.",
        "examplePolish": "Wybieraj przyjazne dla środowiska środki czystości."
      },
      {
        "id": "nature-b1-8",
        "english": "Biodiversity",
        "polish": "Bioróżnorodność",
        "pronunciation": "/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pollution threatens global biodiversity.",
        "examplePolish": "Zanieczyszczenie zagraża globalnej bioróżnorodności."
      },
      {
        "id": "nature-b1-9",
        "english": "To devastate",
        "polish": "Spustoszyć / zdewastować",
        "pronunciation": "/ˈdev.ə.steɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The forest fire devastated thousands of acres of land.",
        "examplePolish": "Pożar lasu spustoszył tysiące akrów ziemi."
      },
      {
        "id": "nature-b1-10",
        "english": "Resource",
        "polish": "Zasób",
        "pronunciation": "/ˈriː.sɔːrs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Fresh water is a precious natural resource.",
        "examplePolish": "Świeża woda to cenny zasób naturalny."
      },
      {
        "id": "nature-b1-12",
        "english": "Climate",
        "polish": "Klimat",
        "pronunciation": "/ˈklaɪ.mət/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The region has a mild climate.",
        "examplePolish": "Region ma łagodny klimat."
      },
      {
        "id": "nature-b1-13",
        "english": "Temperature",
        "polish": "Temperatura",
        "pronunciation": "/ˈtem.prə.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The temperature dropped below zero.",
        "examplePolish": "Temperatura spadła poniżej zera."
      },
      {
        "id": "nature-b1-14",
        "english": "Greenhouse effect",
        "polish": "Efekt cieplarniany",
        "pronunciation": "/ˈɡriːn.haʊs ɪˌfekt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The greenhouse effect causes global heating.",
        "examplePolish": "Efekt cieplarniany powoduje globalne ocieplenie."
      },
      {
        "id": "nature-b1-16",
        "english": "Climate change",
        "polish": "Zmiany klimatyczne",
        "pronunciation": "/ˈklaɪ.mət tʃeɪndʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Climate change threatens agriculture.",
        "examplePolish": "Zmiany klimatyczne zagrażają rolnictwu."
      },
      {
        "id": "nature-b1-18",
        "english": "Waste",
        "polish": "Odpady / Marnować",
        "pronunciation": "/weɪst/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Do not waste water while brushing teeth.",
        "examplePolish": "Nie marnuj wody podczas mycia zębów."
      },
      {
        "id": "nature-b1-19",
        "english": "Garbage",
        "polish": "Śmieci (garbage)",
        "pronunciation": "/ˈɡɑː.bɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Throw your garbage in the bin.",
        "examplePolish": "Wyrzuć śmieci do kosza."
      },
      {
        "id": "nature-b1-20",
        "english": "Trash",
        "polish": "Śmieci (trash)",
        "pronunciation": "/træʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pick up the trash from the grass.",
        "examplePolish": "Podnieś śmieci z trawy."
      },
      {
        "id": "nature-b1-22",
        "english": "To Recycle",
        "polish": "Przetwarzać powtórnie",
        "pronunciation": "/ˌriːˈsaɪ.kl/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We recycle plastic, glass, and paper.",
        "examplePolish": "Przetwarzamy powtórnie plastik, szkło i papier."
      },
      {
        "id": "nature-b1-23",
        "english": "To Reuse",
        "polish": "Używać ponownie",
        "pronunciation": "/ˌriːˈjuːz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Reuse plastic bottles to reduce waste.",
        "examplePolish": "Używaj ponownie plastikowych butelek, aby zmniejszyć ilość odpadów."
      },
      {
        "id": "nature-b1-24",
        "english": "To Reduce",
        "polish": "Ograniczać / Zmniejszać",
        "pronunciation": "/rɪˈdʒuːs/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We must reduce carbon dioxide emissions.",
        "examplePolish": "Musimy ograniczyć emisję dwutlenku węgla."
      },
      {
        "id": "nature-b1-26",
        "english": "To Protect",
        "polish": "Chronić",
        "pronunciation": "/prəˈtekt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We should protect endangered species.",
        "examplePolish": "Powinniśmy chronić zagrożone gatunki zwierząt."
      },
      {
        "id": "nature-b1-27",
        "english": "To Save",
        "polish": "Oszczędzać / Ocalić",
        "pronunciation": "/seɪv/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Save energy by turning off the lights.",
        "examplePolish": "Oszczędzaj energię, wyłączając światła."
      },
      {
        "id": "nature-b1-28",
        "english": "Energy",
        "polish": "Energia",
        "pronunciation": "/ˈen.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Nuclear energy is a controversial topic.",
        "examplePolish": "Energia jądrowa to kontrowersyjny temat."
      },
      {
        "id": "nature-b1-29",
        "english": "Solar energy",
        "polish": "Energia słoneczna",
        "pronunciation": "/ˈsəʊ.lər ˈen.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Solar energy is a clean source of power.",
        "examplePolish": "Energia słoneczna to czyste źródło prądu."
      },
      {
        "id": "nature-b1-30",
        "english": "Wind energy",
        "polish": "Energia wiatrowa",
        "pronunciation": "/wɪnd ˈen.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Wind energy is growing in popularity.",
        "examplePolish": "Energia wiatrowa zyskuje na popularności."
      },
      {
        "id": "nature-b1-31",
        "english": "Renewable energy",
        "polish": "Energia odnawialna",
        "pronunciation": "/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Invest in renewable energy solutions.",
        "examplePolish": "Inwestuj w odnawialne źródła energii."
      },
      {
        "id": "nature-b1-32",
        "english": "Fossil fuels",
        "polish": "Paliwa kopalne",
        "pronunciation": "/ˈfɒs.əl ˌfjuː.əlz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Fossil fuels are running out.",
        "examplePolish": "Paliwa kopalne się wyczerpują."
      },
      {
        "id": "nature-b1-33",
        "english": "Coal",
        "polish": "Węgiel",
        "pronunciation": "/kəʊl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Coal mining is declining in Europe.",
        "examplePolish": "Wydobycie węgla spada w Europie."
      },
      {
        "id": "nature-b1-34",
        "english": "Oil",
        "polish": "Ropa naftowa / Olej",
        "pronunciation": "/ɔɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The oil spill damaged the marine ecosystem.",
        "examplePolish": "Wyciek ropy uszkodził ekosystem morski."
      },
      {
        "id": "nature-b1-35",
        "english": "Gas",
        "polish": "Gaz",
        "pronunciation": "/ɡæs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Natural gas is cleaner than coal.",
        "examplePolish": "Gaz ziemny jest czystszy niż węgiel."
      },
      {
        "id": "nature-b1-36",
        "english": "Deforestation",
        "polish": "Wylesianie",
        "pronunciation": "/diːˌfɒr.ɪˈsteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Deforestation leads to habitat loss.",
        "examplePolish": "Wylesianie prowadzi do utraty siedlisk."
      },
      {
        "id": "nature-b1-38",
        "english": "Extinction",
        "polish": "Wymarcie",
        "pronunciation": "/ɪkˈstɪŋk.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Many animal species face extinction.",
        "examplePolish": "Wielu gatunkom zwierząt grozi wymarcie."
      },
      {
        "id": "nature-b1-39",
        "english": "Endangered species",
        "polish": "Zagrożone gatunki",
        "pronunciation": "/ɪnˈdeɪn.dʒəd ˈspiː.ʃiːz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The giant panda is an endangered species.",
        "examplePolish": "Panda wielka jest zagrożonym gatunkiem."
      },
      {
        "id": "nature-b1-41",
        "english": "Ecosystem",
        "polish": "Ekosystem",
        "pronunciation": "/ˈiː.kəʊˌsɪs.təm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Every living organism has a role in the ecosystem.",
        "examplePolish": "Każdy żywy organizm ma swoją rolę w ekosystemie."
      },
      {
        "id": "nature-b1-43",
        "english": "Planet",
        "polish": "Planeta",
        "pronunciation": "/ˈplæn.ɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We live on a beautiful blue planet.",
        "examplePolish": "Mieszkamy na pięknej błękitnej planecie."
      },
      {
        "id": "nature-b1-44",
        "english": "Ecological",
        "polish": "Ekologiczny",
        "pronunciation": "/ˌiː.kəˈlɒdʒ.ɪ.kəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "We face a global ecological crisis.",
        "examplePolish": "Stoimy w obliczu globalnego kryzysu ekologicznego."
      },
      {
        "id": "nature-b1-45",
        "english": "Sustainable",
        "polish": "Zrównoważony",
        "pronunciation": "/səˈsteɪ.nə.bəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Sustainable development is our goal.",
        "examplePolish": "Zrównoważony rozwój jest naszym celem."
      },
      {
        "id": "nature-b1-46",
        "english": "Carbon footprint",
        "polish": "Ślad węglowy",
        "pronunciation": "/ˌkɑː.bən ˈfʊt.prɪnt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Calculate your personal carbon footprint.",
        "examplePolish": "Oblicz swój osobisty ślad węglowy."
      },
      {
        "id": "nature-b1-48",
        "english": "Protection",
        "polish": "Ochrona",
        "pronunciation": "/prəˈtek.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Environmental protection is crucial.",
        "examplePolish": "Ochrona środowiska jest kluczowa."
      },
      {
        "id": "nature-b1-49",
        "english": "Resources",
        "polish": "Zasoby",
        "pronunciation": "/rɪˈzɔː.sɪz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Water is a precious natural resource.",
        "examplePolish": "Woda to cenny zasób naturalny."
      }
    ]
  },
  {
    "id": "business",
    "title": "Business English (B2)",
    "polishTitle": "Biznes i praca",
    "category": "business",
    "level": "B2",
    "description": "Navigate corporate meetings, project deliverables, and workplace ethics.",
    "icon": "Briefcase",
    "color": "#2563eb",
    "cards": [
      {
        "id": "business-1",
        "english": "Touch base",
        "polish": "Skontaktować się na chwilę / omówić krótko status",
        "pronunciation": "/tʌtʃ beɪs/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Call me later and we'll touch base.",
        "examplePolish": "Zadzwoń do mnie później, to się skontaktujemy."
      },
      {
        "id": "business-2",
        "english": "To postpone",
        "polish": "Przełożyć na później",
        "pronunciation": "/poʊstˈpoʊn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We had to postpone the meeting because the CEO was busy.",
        "examplePolish": "Musieliśmy przełożyć spotkanie, ponieważ prezes był zajęty."
      },
      {
        "id": "business-3",
        "english": "Think outside the box",
        "polish": "Myśleć nieszablonowo",
        "pronunciation": "/θɪŋk aʊtˈsaɪd ðə bɑːks/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "We need creative ideas; think outside the box.",
        "examplePolish": "Potrzebujemy kreatywnych pomysłów – myślcie nieszablonowo."
      },
      {
        "id": "business-4",
        "english": "Bottleneck",
        "polish": "Wąskie gardło / zator",
        "pronunciation": "/ˈbɑːt.l.nek/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The delay in getting design approvals is creating a bottleneck.",
        "examplePolish": "Opóźnienie w zatwierdzaniu projektów tworzy wąskie gardło."
      },
      {
        "id": "business-5",
        "english": "Deliverable",
        "polish": "Produkt końcowy / rezultat projektu",
        "pronunciation": "/dɪˈlɪv.ɚ.ə.bəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What are the main deliverables for the third quarter?",
        "examplePolish": "Jakie są główne produkty końcowe na trzeci kwartał?"
      },
      {
        "id": "business-6",
        "english": "On the same page",
        "polish": "Nadawać na tych samych falach / zgadzać się",
        "pronunciation": "/aːn ðə seɪm peɪdʒ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's touch base to make sure we are on the same page.",
        "examplePolish": "Skontaktujmy się, aby upewnić się, że nadajemy na tych samych falach."
      },
      {
        "id": "business-7",
        "english": "To keep posted",
        "polish": "Informować na bieżąco",
        "pronunciation": "/kiːp poʊs.tɪd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Please keep me posted on the project's progress.",
        "examplePolish": "Proszę, informuj mnie na bieżąco o postępach w projekcie."
      },
      {
        "id": "business-8",
        "english": "To implement",
        "polish": "Wdrożyć / wprowadzić w życie",
        "pronunciation": "/ˈɪm.plə.ment/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We plan to implement the new security system next month.",
        "examplePolish": "Planujemy wdrożyć nowy system bezpieczeństwa w przyszłym miesiącu."
      },
      {
        "id": "business-9",
        "english": "Back to the drawing board",
        "polish": "Zacząć od nowa",
        "pronunciation": "/bæk tuː ðə ˈdrɔː.ɪŋ bɔːrd/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "The plan failed, so it's back to the drawing board.",
        "examplePolish": "Plan nie wypalił, więc zaczynamy od nowa."
      },
      {
        "id": "business-10",
        "english": "Feasible",
        "polish": "Wykonalny / realny",
        "pronunciation": "/ˈfiː.zə.bəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Is it financially feasible to open a new branch office?",
        "examplePolish": "Czy otwarcie nowego oddziału jest wykonalne pod kątem finansowym?"
      },
      {
        "id": "business-12",
        "english": "To delegate",
        "polish": "Delegować / przekazywać (zadania)",
        "pronunciation": "/ˈdel.ɪ.ɡeɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "A good manager knows how to delegate tasks to team members.",
        "examplePolish": "Dobry menedżer wie, jak delegować zadania członkom zespołu."
      },
      {
        "id": "business-13",
        "english": "ASAP (As Soon As Possible)",
        "polish": "Najszybciej jak to możliwe",
        "pronunciation": "/ˌeɪ.es.eɪˈpiː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Please send me the report ASAP.",
        "examplePolish": "Proszę, prześlij mi ten raport najszybciej jak to możliwe."
      },
      {
        "id": "business-14",
        "english": "Cut corners",
        "polish": "Iść na skróty / robić coś po łebkach",
        "pronunciation": "/kʌt ˈkɔːr.nərz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Never cut corners during software quality assurance.",
        "examplePolish": "Nigdy nie idź na skróty podczas kontroli jakości oprogramowania."
      },
      {
        "id": "business-15",
        "english": "Bottom line",
        "polish": "Rezultat finansowy / najważniejsza kwestia",
        "pronunciation": "/ˌbɑːt.əm ˈlaɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The bottom line is that we need to increase our sales.",
        "examplePolish": "Najważniejsza kwestia jest taka, że musimy zwiększyć naszą sprzedaż."
      },
      {
        "id": "business-16",
        "english": "Work-life balance",
        "polish": "Równowaga między pracą a życiem prywatnym",
        "pronunciation": "/ˌwɝːk.laɪf ˈbæl.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Many modern companies prioritize work-life balance for their employees.",
        "examplePolish": "Wiele nowoczesnych firm stawia na równowagę między pracą a życiem prywatnym swoich pracowników."
      },
      {
        "id": "business-17",
        "english": "Strategy",
        "polish": "Strategia",
        "pronunciation": "/ˈstræt.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need a new business strategy.",
        "examplePolish": "Potrzebujemy nowej strategii biznesowej."
      },
      {
        "id": "business-18",
        "english": "Partnership",
        "polish": "Partnerstwo",
        "pronunciation": "/ˈpɑːt.nə.ʃɪp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The partnership was dissolved after three years.",
        "examplePolish": "Partnerstwo zostało rozwiązane po trzech latach."
      },
      {
        "id": "business-19",
        "english": "Collaboration",
        "polish": "Współpraca",
        "pronunciation": "/kəˌlæb.əˈreɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Collaboration is key to project success.",
        "examplePolish": "Współpraca jest kluczem do sukcesu projektu."
      },
      {
        "id": "business-20",
        "english": "Innovation",
        "polish": "Innowacja",
        "pronunciation": "/ˌɪn.əˈveɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Innovation keeps us ahead of competitors.",
        "examplePolish": "Innowacja pozwala nam wyprzedzić konkurencję."
      },
      {
        "id": "business-21",
        "english": "Growth",
        "polish": "Wzrost / Rozwój",
        "pronunciation": "/ɡrəʊθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The economic growth has slowed down.",
        "examplePolish": "Wzrost gospodarczy spowolnił."
      },
      {
        "id": "business-22",
        "english": "Expansion",
        "polish": "Ekspansja / Rozwój",
        "pronunciation": "/ɪkˈspæn.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The expansion into new markets went well.",
        "examplePolish": "Ekspansja na nowe rynki przebiegła pomyślnie."
      },
      {
        "id": "business-23",
        "english": "Investment",
        "polish": "Inwestycja",
        "pronunciation": "/ɪnˈvest.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Buying property is usually a safe investment.",
        "examplePolish": "Kupowanie nieruchomości to zazwyczaj bezpieczna inwestycja."
      },
      {
        "id": "business-24",
        "english": "Investor",
        "polish": "Inwestor",
        "pronunciation": "/ɪnˈves.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A foreign investor backed the project.",
        "examplePolish": "Zagraniczny inwestor wsparł ten projekt."
      },
      {
        "id": "business-25",
        "english": "Shares",
        "polish": "Akcje / udziały",
        "pronunciation": "/ʃeəz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He bought shares in a startup company.",
        "examplePolish": "Kupił akcje w nowo startującej firmie."
      },
      {
        "id": "business-26",
        "english": "Stocks",
        "polish": "Akcje (giełdowe)",
        "pronunciation": "/stɒks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Stock market prices fluctuated daily.",
        "examplePolish": "Ceny na giełdzie wahały się każdego dnia."
      },
      {
        "id": "business-27",
        "english": "Competition",
        "polish": "Konkurencja",
        "pronunciation": "/ˌkɒm.pəˈtɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We face stiff competition in the sector.",
        "examplePolish": "Mamy do czynienia z silną konkurencją w tym sektorze."
      },
      {
        "id": "business-28",
        "english": "Competitor",
        "polish": "Konkurent",
        "pronunciation": "/kəmˈpet.ɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our main competitor lowered their prices.",
        "examplePolish": "Nasz główny konkurent obniżył ceny."
      },
      {
        "id": "business-29",
        "english": "Brand",
        "polish": "Marka",
        "pronunciation": "/brænd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Coca-Cola is a globally recognized brand.",
        "examplePolish": "Coca-Cola to marka rozpoznawalna na całym świecie."
      },
      {
        "id": "business-30",
        "english": "Reputation",
        "polish": "Reputacja",
        "pronunciation": "/ˌrep.jəˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The scandal damaged the company's reputation.",
        "examplePolish": "Skandal nadszarpnął reputację firmy."
      },
      {
        "id": "business-31",
        "english": "Advertising",
        "polish": "Reklama (branża)",
        "pronunciation": "/ˈæd.və.taɪ.zɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The advertising budget was increased.",
        "examplePolish": "Budżet reklamowy został zwiększony."
      },
      {
        "id": "business-32",
        "english": "Promotion",
        "polish": "Promocja / Awans",
        "pronunciation": "/prəˈməʊ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He got a promotion to sales manager.",
        "examplePolish": "Otrzymał awans na menedżera sprzedaży."
      },
      {
        "id": "business-33",
        "english": "Campaign",
        "polish": "Kampania",
        "pronunciation": "/kæmˈpeɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They launched a marketing campaign.",
        "examplePolish": "Uruchomili kampanię marketingową."
      },
      {
        "id": "business-34",
        "english": "Target audience",
        "polish": "Grupa docelowa",
        "pronunciation": "/ˈtɑː.ɡɪt ˈɔː.di.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Identify your target audience before writing.",
        "examplePolish": "Zidentyfikuj swoją grupę docelową przed pisaniem."
      },
      {
        "id": "business-36",
        "english": "Evaluation",
        "polish": "Ocena / Ewaluacja",
        "pronunciation": "/ɪˌvæl.juˈeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Performance evaluation is held annually.",
        "examplePolish": "Ocena efektów pracy odbywa się co roku."
      },
      {
        "id": "business-37",
        "english": "Assessment",
        "polish": "Ocena / Oszacowanie",
        "pronunciation": "/əˈses.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The risk assessment took two weeks.",
        "examplePolish": "Ocena ryzyka zajęła dwa tygodnie."
      },
      {
        "id": "business-38",
        "english": "Analysis",
        "polish": "Analiza",
        "pronunciation": "/əˈnæl.ə.sɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A statistical analysis of the survey results was conducted.",
        "examplePolish": "Przeprowadzono analizę statystyczną wyników ankiety."
      },
      {
        "id": "business-39",
        "english": "Statistics",
        "polish": "Statystyka / Statystyki",
        "pronunciation": "/stəˈtɪs.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The statistics indicate a rise in sales.",
        "examplePolish": "Statystyki wskazują na wzrost sprzedaży."
      },
      {
        "id": "business-40",
        "english": "Trend",
        "polish": "Trend / Tendencja",
        "pronunciation": "/trend/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Online shopping is a growing trend.",
        "examplePolish": "Zakupy online to rosnący trend."
      },
      {
        "id": "business-41",
        "english": "Forecast",
        "polish": "Prognoza",
        "pronunciation": "/ˈfɔː.kɑːst/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The sales forecast is very positive.",
        "examplePolish": "Prognoza sprzedaży jest bardzo pozytywna."
      },
      {
        "id": "business-42",
        "english": "Prediction",
        "polish": "Przewidywanie",
        "pronunciation": "/prɪˈdɪk.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Making economic predictions is difficult.",
        "examplePolish": "Tworzenie prognoz gospodarczych jest trudne."
      },
      {
        "id": "business-43",
        "english": "Risk",
        "polish": "Ryzyko",
        "pronunciation": "/rɪsk/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Calculated risk is part of business.",
        "examplePolish": "Kalkulowane ryzyko to część biznesu."
      },
      {
        "id": "business-44",
        "english": "Opportunity",
        "polish": "Okazja / Szansa",
        "pronunciation": "/ˌɒp.əˈtjuː.nə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Don't miss this career opportunity.",
        "examplePolish": "Nie przegap tej szansy na karierę."
      },
      {
        "id": "business-45",
        "english": "Challenge",
        "polish": "Wyzwanie",
        "pronunciation": "/ˈtʃæl.ɪndʒ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Managing a large team is a big challenge.",
        "examplePolish": "Zarządzanie dużym zespołem to duże wyzwanie."
      },
      {
        "id": "business-46",
        "english": "Solution",
        "polish": "Rozwiązanie",
        "pronunciation": "/səˈluː.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We found a solution to the problem.",
        "examplePolish": "Znaleźliśmy rozwiązanie problemu."
      },
      {
        "id": "business-47",
        "english": "Executive",
        "polish": "Dyrektor / Pracownik szczebla kierowniczego",
        "pronunciation": "/ɪɡˈzek.jə.tɪv/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The chief executive officer made the decision.",
        "examplePolish": "Dyrektor generalny podjął decyzję."
      },
      {
        "id": "business-48",
        "english": "Revenue",
        "polish": "Przychód / obroty",
        "pronunciation": "/ˈrev.ən.juː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Annual revenue grew by ten percent.",
        "examplePolish": "Roczny przychód wzrósł o dziesięć procent."
      },
      {
        "id": "business-49",
        "english": "Stakeholder",
        "polish": "Interesariusz",
        "pronunciation": "/ˈsteɪkˌhəʊl.dər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must ensure all key stakeholders are supportive of the strategy change.",
        "examplePolish": "Musimy się upewnić, że wszyscy kluczowi interesariusze wspierają zmianę strategii."
      },
      {
        "id": "business-50",
        "english": "Negotiator",
        "polish": "Negocjator",
        "pronunciation": "/nɪˈɡəʊ.ʃi.eɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is a skilled business negotiator.",
        "examplePolish": "Ona jest zręcznym negocjatorem biznesowym.\n\n\n--- TALIA: Tech & IT (B2) / Technologia i IT (B2) ---\nOpis: Vocabulary for software releases, database queries, and encrypted tunnels."
      }
    ]
  },
  {
    "id": "technology",
    "title": "Tech & IT (B2)",
    "polishTitle": "Technologia i IT",
    "category": "tech",
    "level": "B2",
    "description": "Vocabulary for software releases, database queries, and encrypted tunnels.",
    "icon": "Laptop",
    "color": "#06b6d4",
    "cards": [
      {
        "id": "tech-1",
        "english": "Source code",
        "polish": "Kod źródłowy",
        "pronunciation": "/sɔːrs koʊd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He pushes the source code to GitHub every evening.",
        "examplePolish": "On wysyła kod źródłowy na GitHub każdego wieczora."
      },
      {
        "id": "tech-2",
        "english": "To debug",
        "polish": "Usuwać błędy (debugować)",
        "pronunciation": "/diːˈbʌɡ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "I spent three hours trying to debug this login script.",
        "examplePolish": "Spędziłem trzy godziny próbując usunąć błędy z tego skryptu logowania."
      },
      {
        "id": "tech-3",
        "english": "User interface",
        "polish": "Interfejs użytkownika (UI)",
        "pronunciation": "/ˈjuː.zɚ ˈɪn.tɚ.feɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The new application update features a very clean user interface.",
        "examplePolish": "Nowa aktualizacja aplikacji cechuje się bardzo czystym interfejsem użytkownika."
      },
      {
        "id": "tech-4",
        "english": "Encryption",
        "polish": "Szyfrowanie",
        "pronunciation": "/ɪnˈkrɪp.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Data encryption ensures user privacy.",
        "examplePolish": "Szyfrowanie danych zapewnia prywatność użytkowników."
      },
      {
        "id": "tech-5",
        "english": "Bandwidth",
        "polish": "Przepustowość",
        "pronunciation": "/ˈbænd.wɪtθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need more bandwidth for video streaming.",
        "examplePolish": "Potrzebujemy większej przepustowości do przesyłania wideo."
      },
      {
        "id": "tech-6",
        "english": "Cloud computing",
        "polish": "Chmura obliczeniowa (usługi)",
        "pronunciation": "/klaʊd kəmˈpjuː.t̬ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Cloud computing reduced infrastructure costs.",
        "examplePolish": "Chmura obliczeniowa obniżyła koszty infrastruktury."
      },
      {
        "id": "tech-8",
        "english": "Deployment",
        "polish": "Wdrożenie",
        "pronunciation": "/dɪˈplɔɪ.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Production deployment is scheduled for Sunday.",
        "examplePolish": "Wdrożenie produkcyjne zaplanowano na niedzielę."
      },
      {
        "id": "tech-9",
        "english": "Repository",
        "polish": "Repozytorium",
        "pronunciation": "/rɪˈpɑː.zɪ.tɔːr.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Clone the repository to your local PC.",
        "examplePolish": "Sklonuj repozytorium na swój lokalny komputer."
      },
      {
        "id": "tech-10",
        "english": "Framework",
        "polish": "Ramy / struktura",
        "pronunciation": "/ˈfreɪm.wɝːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The research was conducted within a strict theoretical framework.",
        "examplePolish": "Badanie zostało przeprowadzone w ścisłych ramach teoretycznych."
      },
      {
        "id": "tech-11",
        "english": "Responsive design",
        "polish": "Responsywny wygląd (dostosowany do telefonów)",
        "pronunciation": "/rɪˈspɑːn.sɪv dɪˈzaɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A good website must have a responsive design to look great on phones.",
        "examplePolish": "Dobra strona internetowa must mieć responsywny wygląd, aby wyglądać świetnie na telefonach."
      },
      {
        "id": "technology-13",
        "english": "Algorithm",
        "polish": "Algorytm",
        "pronunciation": "/ˈæl.ɡə.rɪ.ðəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The search engine uses a complex algorithm.",
        "examplePolish": "Wyszukiwarka używa skomplikowanego algorytmu."
      },
      {
        "id": "technology-14",
        "english": "Intelligence",
        "polish": "Inteligencja",
        "pronunciation": "/ɪnˈtel.ɪ.dʒəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Emotional intelligence is important for leaders.",
        "examplePolish": "Inteligencja emocjonalna jest ważna dla liderów."
      },
      {
        "id": "technology-15",
        "english": "Artificial intelligence",
        "polish": "Sztuczna inteligencja",
        "pronunciation": "/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Artificial intelligence speeds up data classification.",
        "examplePolish": "Sztuczna inteligencja przyspiesza klasyfikację danych."
      },
      {
        "id": "technology-16",
        "english": "Machine learning",
        "polish": "Uczenie maszynowe",
        "pronunciation": "/məˈʃiːn ˌlɜː.nɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Machine learning requires massive datasets.",
        "examplePolish": "Uczenie maszynowe wymaga ogromnych zbiorów danych."
      },
      {
        "id": "technology-17",
        "english": "Deep learning",
        "polish": "Uczenie głębokie",
        "pronunciation": "/diːp ˈlɜː.nɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Deep learning is a subset of AI.",
        "examplePolish": "Uczenie głębokie to podzbiór sztucznej inteligencji."
      },
      {
        "id": "technology-18",
        "english": "Neural network",
        "polish": "Sieć neuronowa",
        "pronunciation": "/ˈnjʊə.rəl ˈnet.wɜːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Artificial neural networks mimic human brains.",
        "examplePolish": "Sztuczne sieci neuronowe naśladują ludzki mózg."
      },
      {
        "id": "technology-19",
        "english": "Data science",
        "polish": "Inżynieria danych",
        "pronunciation": "/ˈdeɪ.tə ˈsaɪ.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Data science translates data into insights.",
        "examplePolish": "Inżynieria danych tłumaczy dane na praktyczne wnioski."
      },
      {
        "id": "technology-20",
        "english": "Big data",
        "polish": "Wielkie zbiory danych",
        "pronunciation": "/bɪɡ ˈdeɪ.tə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Analyzing big data requires cloud servers.",
        "examplePolish": "Analiza wielkich zbiorów danych wymaga serwerów chmurowych."
      },
      {
        "id": "technology-21",
        "english": "Analytics",
        "polish": "Analityka",
        "pronunciation": "/ˌæn.əlˈɪt.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Web analytics track user behavior.",
        "examplePolish": "Analityka internetowa śledzi zachowanie użytkowników."
      },
      {
        "id": "technology-23",
        "english": "Decryption",
        "polish": "Deszyfrowanie",
        "pronunciation": "/diːˈkrɪp.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The decryption key is lost.",
        "examplePolish": "Klucz deszyfrujący został zgubiony."
      },
      {
        "id": "technology-24",
        "english": "Cryptography",
        "polish": "Kryptografia",
        "pronunciation": "/krɪpˈtɒɡ.rə.fi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Cryptography protects digital transactions.",
        "examplePolish": "Kryptografia chroni transakcje cyfrowe."
      },
      {
        "id": "technology-25",
        "english": "Blockchain",
        "polish": "Łańcuch bloków",
        "pronunciation": "/ˈblɒk.tʃeɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Blockchain is the technology behind Bitcoin.",
        "examplePolish": "Blockchain to technologia stojąca za Bitcoinem."
      },
      {
        "id": "technology-26",
        "english": "Cryptocurrency",
        "polish": "Kryptowaluta",
        "pronunciation": "/ˈkrɪp.təʊˌkʌr.ən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Bitcoin was the first cryptocurrency.",
        "examplePolish": "Bitcoin był pierwszą kryptowalutą."
      },
      {
        "id": "technology-27",
        "english": "Cybersecurity",
        "polish": "Cyberbezpieczeństwo",
        "pronunciation": "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Companies invest heavily in cybersecurity.",
        "examplePolish": "Firmy mocno inwestują w cyberbezpieczeństwo."
      },
      {
        "id": "technology-28",
        "english": "Firewall",
        "polish": "Zapora sieciowa",
        "pronunciation": "/ˈfaɪə.wɔːl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The firewall blocks unauthorized traffic.",
        "examplePolish": "Zapora sieciowa blokuje nieautoryzowany ruch."
      },
      {
        "id": "technology-29",
        "english": "Antivirus",
        "polish": "Program antywirusowy",
        "pronunciation": "/ˌæn.tiˈvaɪ.rəs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Install a good antivirus on your PC.",
        "examplePolish": "Zainstaluj dobry program antywirusowy na komputerze."
      },
      {
        "id": "technology-30",
        "english": "Malware",
        "polish": "Złośliwe oprogramowanie",
        "pronunciation": "/ˈmæl.weər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Malware infected the company database.",
        "examplePolish": "Złośliwe oprogramowanie zainfekowało bazę danych firmy."
      },
      {
        "id": "technology-31",
        "english": "Phishing",
        "polish": "Wyłudzanie danych",
        "pronunciation": "/ˈfɪʃ.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Watch out for phishing email scams.",
        "examplePolish": "Uważaj na oszustwa e-mailowe typu phishing."
      },
      {
        "id": "technology-32",
        "english": "Spyware",
        "polish": "Oprogramowanie szpiegujące",
        "pronunciation": "/ˈspaɪ.weər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The spyware was running undetected.",
        "examplePolish": "Oprogramowanie szpiegujące działało niewykryte."
      },
      {
        "id": "technology-33",
        "english": "Ransomware",
        "polish": "Oprogramowanie szantażujące",
        "pronunciation": "/ˈræn.səm.weər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Ransomware locked the hospital files.",
        "examplePolish": "Ransomware zablokował pliki szpitalne."
      },
      {
        "id": "technology-35",
        "english": "Virtualization",
        "polish": "Wirtualizacja",
        "pronunciation": "/ˌvɜː.tʃu.ə.laɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Virtualization maximizes hardware usage.",
        "examplePolish": "Wirtualizacja maksymalizuje wykorzystanie sprzętu."
      },
      {
        "id": "technology-36",
        "english": "SQL",
        "polish": "Język SQL",
        "pronunciation": "/ˌes.kjuːˈel/",
        "partOfSpeech": "noun",
        "exampleEnglish": "SQL is used to query databases.",
        "examplePolish": "SQL jest używany do odpytywania baz danych."
      },
      {
        "id": "technology-37",
        "english": "NoSQL",
        "polish": "Bazy NoSQL",
        "pronunciation": "/ˌnəʊ.es.kjuːˈel/",
        "partOfSpeech": "noun",
        "exampleEnglish": "NoSQL is suitable for unstructured data.",
        "examplePolish": "NoSQL nadaje się do nieustrukturyzowanych danych."
      },
      {
        "id": "technology-38",
        "english": "API",
        "polish": "Interfejs API",
        "pronunciation": "/ˌeɪ.piːˈaɪ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The developer created a REST API.",
        "examplePolish": "Programista stworzył interfejs API typu REST."
      },
      {
        "id": "technology-40",
        "english": "Library",
        "polish": "Biblioteka (kodu)",
        "pronunciation": "/ˈlaɪ.brər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Lodash is a useful helper library.",
        "examplePolish": "Lodash to użyteczna biblioteka pomocnicza."
      },
      {
        "id": "technology-41",
        "english": "Syntax",
        "polish": "Składnia",
        "pronunciation": "/ˈsɪn.tæks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A syntax error prevented compilation.",
        "examplePolish": "Błąd składni uniemożliwił kompilację."
      },
      {
        "id": "technology-42",
        "english": "Compiler",
        "polish": "Kompilator",
        "pronunciation": "/kəmˈpaɪ.lər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The compiler generates machine code.",
        "examplePolish": "Kompilator generuje kod maszynowy."
      },
      {
        "id": "technology-43",
        "english": "Interpreter",
        "polish": "Interpreter",
        "pronunciation": "/ɪnˈtɜː.prɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Python is executed by an interpreter.",
        "examplePolish": "Python jest wykonywany przez interpreter."
      },
      {
        "id": "technology-44",
        "english": "Debugging",
        "polish": "Debugowanie",
        "pronunciation": "/ˌdiːˈbʌɡ.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Debugging is a time-consuming process.",
        "examplePolish": "Debugowanie to czasochłonny proces."
      },
      {
        "id": "technology-45",
        "english": "Version control",
        "polish": "Kontrola wersji",
        "pronunciation": "/ˈvɜː.ʃən kənˌtrəʊl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Git is a distributed version control system.",
        "examplePolish": "Git to rozproszony system kontroli wersji."
      },
      {
        "id": "technology-46",
        "english": "Git",
        "polish": "Program Git",
        "pronunciation": "/ɡɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Initialize a Git repository here.",
        "examplePolish": "Zainicjalizuj tutaj repozytorium Git."
      },
      {
        "id": "technology-50",
        "english": "Backend",
        "polish": "Zaplecze systemowe",
        "pronunciation": "/ˈbæk.end/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The backend is written in Node.js.",
        "examplePolish": "Zaplecze systemowe jest napisane w Node.js.\n\n\n--- TALIA: Art & Criticism (B2) / Sztuka i krytyka (B2) ---\nOpis: Discuss aesthetics, express critical opinions on novels, films, and exhibitions."
      }
    ]
  },
  {
    "id": "culture-b2",
    "title": "Art & Criticism (B2)",
    "polishTitle": "Sztuka i krytyka",
    "category": "culture",
    "level": "B2",
    "description": "Discuss aesthetics, express critical opinions on novels, films, and exhibitions.",
    "icon": "Music",
    "color": "#a855f7",
    "cards": [
      {
        "id": "culture-b2-1",
        "english": "Aesthetic",
        "polish": "Estetyczny / estetyka",
        "pronunciation": "/esˈθet.ɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The design of LingoCards has a premium, modern aesthetic.",
        "examplePolish": "Projekt LingoCards cechuje się nowoczesną, luksusową estetyką."
      },
      {
        "id": "culture-b2-2",
        "english": "Controversial",
        "polish": "Kontrowersyjny",
        "pronunciation": "/ˌkɑːn.trəˈvɝː.ʃəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The abstract painting was controversial, sparking debate among art critics.",
        "examplePolish": "Malarstwo abstrakcyjne było kontrowersyjne, wywołując dyskusję wśród krytyków sztuki."
      },
      {
        "id": "culture-b2-3",
        "english": "To depict",
        "polish": "Przedstawiać / obrazować",
        "pronunciation": "/dɪˈpɪkt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The movie depicts the early life of a famous jazz pianist.",
        "examplePolish": "Film przedstawia wczesne życie słynnego pianisty jazzowego."
      },
      {
        "id": "culture-b2-4",
        "english": "Perspective",
        "polish": "Perspektywa / Punkt widzenia",
        "pronunciation": "/pɚˈspek.tɪv/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Get a fresh perspective on the issue.",
        "examplePolish": "Zdobądź nową perspektywę na tę kwestię."
      },
      {
        "id": "culture-b2-5",
        "english": "Subtle",
        "polish": "Subtelny",
        "pronunciation": "/ˈsʌt̬.əl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "A master diplomat uses subtle cues to guide negotiations.",
        "examplePolish": "Doświadczony dyplomata używa subtelnych wskazówek, by kierować negocjacjami."
      },
      {
        "id": "culture-b2-6",
        "english": "Abstract",
        "polish": "Abstrakcyjny",
        "pronunciation": "/ˈæb.strækt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "It is hard to define beauty because it is an abstract concept.",
        "examplePolish": "Trudno zdefiniować piękno, ponieważ jest to pojęcie abstrakcyjne."
      },
      {
        "id": "culture-b2-7",
        "english": "Mastery",
        "polish": "Mistrzostwo / biegłość",
        "pronunciation": "/ˈmæs.tɚ.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Her painting demonstrates a complete mastery of light and shadow.",
        "examplePolish": "Jej malarstwo wykazuje całkowite mistrzostwo w operowaniu światłem i cieniem."
      },
      {
        "id": "culture-b2-8",
        "english": "To critique",
        "polish": "Oceniać krytycznie / recenzować",
        "pronunciation": "/krɪˈtiːk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Students were asked to critique each other's art projects.",
        "examplePolish": "Uczniowie zostali poproszeni o krytyczną ocenę projektów artystycznych kolegów."
      },
      {
        "id": "culture-b2-9",
        "english": "Inspiring",
        "polish": "Inspirujący",
        "pronunciation": "/ɪnˈspaɪr.ɪŋ/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "His speech on persistence was highly inspiring.",
        "examplePolish": "Jego przemówienie o wytrwałości było bardzo inspirujące."
      },
      {
        "id": "culture-b2-10",
        "english": "Interpretation",
        "polish": "Interpretacja",
        "pronunciation": "/ɪnˌtɝː.prəˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This data is open to interpretation.",
        "examplePolish": "Te dane są otwarte na interpretację."
      },
      {
        "id": "culture-b2-11",
        "english": "Philosophy",
        "polish": "Filozofia",
        "pronunciation": "/fɪˈlɒs.ə.fi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Ancient Greek philosophy is fascinating.",
        "examplePolish": "Starożytna filozofia grecka jest fascynująca."
      },
      {
        "id": "culture-b2-12",
        "english": "Ethics",
        "polish": "Etyka",
        "pronunciation": "/ˈeθ.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Bioethics is a growing field of research.",
        "examplePolish": "Bioetyka to rozwijająca się dziedzina badań."
      },
      {
        "id": "culture-b2-13",
        "english": "Morals",
        "polish": "Moralność",
        "pronunciation": "/ˈmɒr.əlz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He has strong personal morals.",
        "examplePolish": "On ma silne osobiste zasady moralne."
      },
      {
        "id": "culture-b2-14",
        "english": "Values",
        "polish": "Wartości",
        "pronunciation": "/ˈvæl.juːz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Family values are important in our society.",
        "examplePolish": "Wartości rodzinne są ważne w naszym społeczeństwie."
      },
      {
        "id": "culture-b2-15",
        "english": "Beliefs",
        "polish": "Przekonania",
        "pronunciation": "/bɪˈliːfs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Respect other people's religious beliefs.",
        "examplePolish": "Szanuj przekonania religijne innych ludzi."
      },
      {
        "id": "culture-b2-16",
        "english": "Religion",
        "polish": "Religia",
        "pronunciation": "/rɪˈlɪdʒ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He studies history of world religions.",
        "examplePolish": "On studiuje historię religii świata."
      },
      {
        "id": "culture-b2-17",
        "english": "Faith",
        "polish": "Wiara",
        "pronunciation": "/feɪθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His faith helped him through hard times.",
        "examplePolish": "Jego wiara pomogła mu przetrwać trudne chwile."
      },
      {
        "id": "culture-b2-18",
        "english": "Spirituality",
        "polish": "Duchowość",
        "pronunciation": "/ˌspɪr.ɪ.tʃuˈæl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Meditation is a form of spirituality.",
        "examplePolish": "Medytacja to forma duchowości."
      },
      {
        "id": "culture-b2-19",
        "english": "Society",
        "polish": "Społeczeństwo",
        "pronunciation": "/səˈsaɪ.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Technology changes modern society rapidly.",
        "examplePolish": "Technologia szybko zmienia współczesne społeczeństwo."
      },
      {
        "id": "culture-b2-20",
        "english": "Community",
        "polish": "Społeczność",
        "pronunciation": "/kəˈmjuː.nə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The local community built a new park.",
        "examplePolish": "Lokalna społeczność zbudowała nowy park."
      },
      {
        "id": "culture-b2-21",
        "english": "Diversity",
        "polish": "Różnorodność",
        "pronunciation": "/daɪˈvɜː.sə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Cultural diversity enriches our lives.",
        "examplePolish": "Różnorodność kulturowa wzbogaca nasze życie."
      },
      {
        "id": "culture-b2-22",
        "english": "Inclusion",
        "polish": "Integracja / Włączenie społecznego",
        "pronunciation": "/ɪnˈkluː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Social inclusion is a key political goal.",
        "examplePolish": "Integracja społeczna to kluczowy cel polityczny."
      },
      {
        "id": "culture-b2-23",
        "english": "Equality",
        "polish": "Równość",
        "pronunciation": "/iˈkwɒl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Fight for equality before the law.",
        "examplePolish": "Walcz o równość wobec prawa."
      },
      {
        "id": "culture-b2-24",
        "english": "Justice",
        "polish": "Wymiar sprawiedliwości",
        "pronunciation": "/ˈdʒʌs.tɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The court administered justice.",
        "examplePolish": "Sąd wymierzył sprawiedliwość."
      },
      {
        "id": "culture-b2-25",
        "english": "Human rights",
        "polish": "Prawa człowieka",
        "pronunciation": "/ˌhjuː.mən ˈraɪts/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Amnesty International defends human rights.",
        "examplePolish": "Amnesty International broni praw człowieka."
      },
      {
        "id": "culture-b2-26",
        "english": "Democracy",
        "polish": "Demokracja",
        "pronunciation": "/dɪˈmɒk.rə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Free elections are essential in a democracy.",
        "examplePolish": "Wolne wybory są kluczowe w demokracji."
      },
      {
        "id": "culture-b2-27",
        "english": "Politics",
        "polish": "Polityka (dziedzina)",
        "pronunciation": "/ˈpɒl.ə.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He entered politics at a young age.",
        "examplePolish": "Wszedł do polityki w młodym wieku."
      },
      {
        "id": "culture-b2-28",
        "english": "Government",
        "polish": "Rząd",
        "pronunciation": "/ˈɡʌv.ən.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The government raised the sales tax.",
        "examplePolish": "Rząd podniósł podatek od sprzedaży."
      },
      {
        "id": "culture-b2-29",
        "english": "Law",
        "polish": "Prawo",
        "pronunciation": "/lɔː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Breaking the law leads to punishment.",
        "examplePolish": "Łamanie prawa prowadzi do kary."
      },
      {
        "id": "culture-b2-30",
        "english": "Constitution",
        "polish": "Konstytucja",
        "pronunciation": "/ˌkɒn.stɪˈtʃuː.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The constitution protects civil liberties.",
        "examplePolish": "Konstytucja chroni wolności obywatelskie."
      },
      {
        "id": "culture-b2-31",
        "english": "Citizenship",
        "polish": "Obywatelstwo",
        "pronunciation": "/ˈsɪt.ɪ.zən.ʃɪp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She applied for British citizenship.",
        "examplePolish": "Złożyła wniosek o brytyjskie obywatelstwo."
      },
      {
        "id": "culture-b2-32",
        "english": "Identity",
        "polish": "Tożsamość",
        "pronunciation": "/aɪˈden.tə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Art is part of our national identity.",
        "examplePolish": "Sztuka to część naszej tożsamości narodowej."
      },
      {
        "id": "culture-b2-33",
        "english": "Multiculturalism",
        "polish": "Wielokulturowość",
        "pronunciation": "/ˌmʌl.tiˈkʌl.tʃər.əl.ɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Canada is known for its multiculturalism.",
        "examplePolish": "Kanada jest znana ze swojej wielokulturowości."
      },
      {
        "id": "culture-b2-34",
        "english": "Globalization",
        "polish": "Globalizacja",
        "pronunciation": "/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Globalization affects local businesses.",
        "examplePolish": "Globalizacja wpływa na lokalne firmy."
      },
      {
        "id": "culture-b2-35",
        "english": "Modernity",
        "polish": "Nowoczesność",
        "pronunciation": "/məˈdɜː.nə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The museum bridge combines history and modernity.",
        "examplePolish": "Most muzealny łączy historię i nowoczesność."
      },
      {
        "id": "culture-b2-36",
        "english": "Progress",
        "polish": "Postęp",
        "pronunciation": "/ˈprəʊ.ɡres/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Scientific progress improves our health.",
        "examplePolish": "Postęp naukowy poprawia nasze zdrowie."
      },
      {
        "id": "culture-b2-37",
        "english": "Education",
        "polish": "Edukacja",
        "pronunciation": "/ˌed.jʊˈkeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Higher education leads to better jobs.",
        "examplePolish": "Wyższa edukacja prowadzi do lepszych miejsc pracy."
      },
      {
        "id": "culture-b2-38",
        "english": "Literacy",
        "polish": "Umiejętność czytania i pisania",
        "pronunciation": "/ˈlɪt.ər.ə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Adult literacy campaigns are successful.",
        "examplePolish": "Kampanie na rzecz czytania i pisania wśród dorosłych są skuteczne."
      },
      {
        "id": "culture-b2-39",
        "english": "Science",
        "polish": "Nauka (dziedzina)",
        "pronunciation": "/saɪ.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Space science explores other planets.",
        "examplePolish": "Nauka o kosmosie bada inne planety."
      },
      {
        "id": "culture-b2-40",
        "english": "Media",
        "polish": "Media",
        "pronunciation": "/ˈmiː.di.ə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Social media spread news instantly.",
        "examplePolish": "Media społecznościowe błyskawicznie rozpowszechniają wiadomości."
      },
      {
        "id": "culture-b2-41",
        "english": "Journalism",
        "polish": "Dziennikarstwo",
        "pronunciation": "/ˈdʒɜː.nə.lɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is studying investigative journalism.",
        "examplePolish": "Ona studiuje dziennikarstwo śledcze."
      },
      {
        "id": "culture-b2-42",
        "english": "Press",
        "polish": "Prasa",
        "pronunciation": "/pres/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The freedom of the press must be protected.",
        "examplePolish": "Wolność prasy musi być chroniona."
      },
      {
        "id": "culture-b2-43",
        "english": "Freedom of speech",
        "polish": "Wolność słowa",
        "pronunciation": "/ˈfriː.dəm ɒv spiːtʃ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Freedom of speech is guaranteed by law.",
        "examplePolish": "Wolność słowa jest gwarantowana przez prawo."
      },
      {
        "id": "culture-b2-44",
        "english": "Censorship",
        "polish": "Cenzura",
        "pronunciation": "/ˈsen.sə.ʃɪp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The film was banned due to censorship.",
        "examplePolish": "Film został zakazany z powodu cenzury."
      },
      {
        "id": "culture-b2-45",
        "english": "Propaganda",
        "polish": "Propaganda",
        "pronunciation": "/ˌprɒp.əˈɡæn.də/",
        "partOfSpeech": "noun",
        "exampleEnglish": "State media were used for political propaganda.",
        "examplePolish": "Media państwowe były używane do propagandy politycznej."
      },
      {
        "id": "culture-b2-46",
        "english": "Public opinion",
        "polish": "Opinia publiczna",
        "pronunciation": "/ˌpʌb.lɪk əˈpɪn.jən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Public opinion has changed on this issue.",
        "examplePolish": "Opinia publiczna zmieniła się w tej kwestii."
      },
      {
        "id": "culture-b2-47",
        "english": "Influence",
        "polish": "Wpływ / wpływać",
        "pronunciation": "/ˈɪn.flu.əns/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Social media has a strong influence on teenagers.",
        "examplePolish": "Media społecznościowe mają silny wpływ na nastolatków."
      },
      {
        "id": "culture-b2-48",
        "english": "Artistic",
        "polish": "Artystyczny",
        "pronunciation": "/ɑːˈtɪs.tɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "She showed great artistic talent.",
        "examplePolish": "Wykazała się wielkim talentem artystycznym."
      },
      {
        "id": "culture-b2-49",
        "english": "Folk",
        "polish": "Ludowy",
        "pronunciation": "/fəʊk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "They performed traditional folk dances.",
        "examplePolish": "Wykonali tradycyjne tańce ludowe."
      },
      {
        "id": "culture-b2-50",
        "english": "Customary",
        "polish": "Zwyczajowy",
        "pronunciation": "/ˈkʌs.tə.mər.i/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "It is customary to shake hands.",
        "examplePolish": "Zwyczajowo podaje się sobie ręce.\n\n\n--- TALIA: Advanced Vocabulary (C1) / Słownictwo zaawansowane (C1) ---\nOpis: Sophisticated words to significantly elevate your writing and formal speaking."
      }
    ]
  },
  {
    "id": "advanced",
    "title": "Advanced Vocabulary (C1)",
    "polishTitle": "Słownictwo zaawansowane",
    "category": "general",
    "level": "C1",
    "description": "Sophisticated words to significantly elevate your writing and formal speaking.",
    "icon": "GraduationCap",
    "color": "#475569",
    "cards": [
      {
        "id": "advanced-1",
        "english": "Ambiguous",
        "polish": "Dwuznaczny / Niejasny",
        "pronunciation": "/æmˈbɪɡ.ju.əs/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "His answer was ambiguous and confusing.",
        "examplePolish": "Jego odpowiedź była dwuznaczna i dezorientująca."
      },
      {
        "id": "advanced-2",
        "english": "To advocate",
        "polish": "Popierać / rzecznictwo / popierać ideę",
        "pronunciation": "/ˈæd.və.keɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "She advocates for equal pay and gender equality in the corporate world.",
        "examplePolish": "Ona opowiada się za równą płacą i równością płci w świecie korporacyjnym."
      },
      {
        "id": "advanced-3",
        "english": "Ubiquitous",
        "polish": "Wszędobylski / powszechny",
        "pronunciation": "/juːˈbɪk.wə.t̬əs/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Mobile phones have become ubiquitous in modern society.",
        "examplePolish": "Telefony komórkowe stały się powszechne we współczesnym społeczeństwie."
      },
      {
        "id": "advanced-4",
        "english": "Superfluous",
        "polish": "Zbędny / nadmiarowy",
        "pronunciation": "/suːˈpɝː.flu.əs/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Your essay is good, but you should delete these superfluous details.",
        "examplePolish": "Twój esej jest dobry, ale powinieneś usunąć te zbędne szczegóły."
      },
      {
        "id": "advanced-5",
        "english": "Ephemeral",
        "polish": "Ulotny / jednodniowy / krótkotrwały",
        "pronunciation": "/ɪˈfem.ɚ.əl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Fame in the internet age is often ephemeral.",
        "examplePolish": "Sława w erze internetu jest często ulotna."
      },
      {
        "id": "advanced-6",
        "english": "Meticulous",
        "polish": "Drobiazgowy / skrupulatny",
        "pronunciation": "/məˈtɪk.jə.ləs/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "He pays meticulous attention to detail in his carpentry work.",
        "examplePolish": "Przykłada skrupulatną dbałość o szczegóły w swoich pracach stolarskich."
      },
      {
        "id": "advanced-7",
        "english": "Conundrum",
        "polish": "Zagadka / łamigłówka / trudny problem",
        "pronunciation": "/kəˈnʌn.drəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "How to reduce carbon emissions while growing the economy is a massive conundrum.",
        "examplePolish": "Sposób na redukcję emisji dwutlenku węgla przy jednoczesnym rozwoju gospodarki to ogromna łamigłówka."
      },
      {
        "id": "advanced-8",
        "english": "Pragmatic",
        "polish": "Pragmatyczny / rozsądny",
        "pronunciation": "/præɡˈmæt.ɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "We need a pragmatic approach to resolve this trade dispute.",
        "examplePolish": "Potrzebujemy pragmatycznego podejścia, aby rozwiązać ten spór handlowy."
      },
      {
        "id": "advanced-9",
        "english": "Obsolete",
        "polish": "Przestarzały / wycofany z użycia",
        "pronunciation": "/ˌɑːb.səˈliːt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Floppy disks became obsolete shortly after CD-ROMs were introduced.",
        "examplePolish": "Dyskietki stały się przestarzałe wkrótce po wprowadzeniu płyt CD-ROM."
      },
      {
        "id": "advanced-10",
        "english": "Eloquent",
        "polish": "Elokwentny / przekonujący",
        "pronunciation": "/ˈel.ə.kwənt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "She gave an eloquent speech that moved the audience to tears.",
        "examplePolish": "Wygłosiła elokwentne przemówienie, które poruszyło widownię do łez."
      },
      {
        "id": "advanced-11",
        "english": "To Procrastinate",
        "polish": "Zwlekać / odkładać na później (prokrastynować)",
        "pronunciation": "/proʊˈkræs.tə.neɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "If you procrastinate, you will miss the deadline.",
        "examplePolish": "Jeśli będziesz zwlekać, spóźnisz się z terminem."
      },
      {
        "id": "advanced-12",
        "english": "Resilient",
        "polish": "Odporny / potrafiący się podnieść / elastyczny",
        "pronunciation": "/rɪˈzɪl.jənt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "She is a resilient person who recovers quickly from setbacks.",
        "examplePolish": "Ona jest odporną osobą, która szybko podnosi się po niepowodzeniach."
      },
      {
        "id": "advanced-13",
        "english": "To Scrutinize",
        "polish": "Szczegółowo badać",
        "pronunciation": "/ˈskruː.t̬ən.aɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Auditors will scrutinize the accounts.",
        "examplePolish": "Audytorzy szczegółowo zbadają księgi rachunkowe."
      },
      {
        "id": "advanced-14",
        "english": "Meticulously",
        "polish": "Skrupulatnie / pieczołowicie",
        "pronunciation": "/məˈtɪk.jə.ləs.li/",
        "partOfSpeech": "adverb",
        "exampleEnglish": "The data was meticulously collected over a period of three years.",
        "examplePolish": "Dane były skrupulatnie gromadzone przez okres trzech lat."
      },
      {
        "id": "advanced-15",
        "english": "Paradox",
        "polish": "Paradoks",
        "pronunciation": "/ˈpær.ə.dɑːks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It is a paradox that water is cheap.",
        "examplePolish": "Paradoksem jest, że woda jest tania."
      },
      {
        "id": "advanced-16",
        "english": "Hypothesis",
        "polish": "Hipoteza",
        "pronunciation": "/haɪˈpɒθ.ə.sɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The scientific hypothesis was tested in the lab.",
        "examplePolish": "Hipoteza naukowa została przetestowana w laboratorium."
      },
      {
        "id": "advanced-17",
        "english": "Theory",
        "polish": "Teoria",
        "pronunciation": "/ˈθɪə.ri/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Einstein's theory of relativity is famous.",
        "examplePolish": "Teoria względności Einsteina jest sławna."
      },
      {
        "id": "advanced-18",
        "english": "Methodology",
        "polish": "Metodologia",
        "pronunciation": "/ˌmeθ.əˈdɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We explained our research methodology in detail.",
        "examplePolish": "Szczegółowo wyjaśniliśmy naszą metodologię badawczą."
      },
      {
        "id": "advanced-19",
        "english": "Empirical evidence",
        "polish": "Dowody empiryczne",
        "pronunciation": "/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need empirical evidence to support this.",
        "examplePolish": "Potrzebujemy dowodów empirycznych, by to poprzeć."
      },
      {
        "id": "advanced-20",
        "english": "Data analysis",
        "polish": "Analiza danych",
        "pronunciation": "/ˈdeɪ.tə əˈnæl.ə.sɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Data analysis revealed interesting patterns.",
        "examplePolish": "Analiza danych ujawniła ciekawe wzorce."
      },
      {
        "id": "advanced-22",
        "english": "Conclusion",
        "polish": "Wniosek / Konkluzja",
        "pronunciation": "/kənˈkluː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The study leads to a clear conclusion.",
        "examplePolish": "Badanie prowadzi do jasnego wniosku."
      },
      {
        "id": "advanced-23",
        "english": "Significance",
        "polish": "Znaczenie / Istotność",
        "pronunciation": "/sɪɡˈnɪf.ɪ.kəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The significance of the discovery is huge.",
        "examplePolish": "Znaczenie tego odkrycia jest ogromne."
      },
      {
        "id": "advanced-24",
        "english": "Implication",
        "polish": "Sugestia / Implikacja",
        "pronunciation": "/ˌɪm.plɪˈkeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Her implication was that we were wrong.",
        "examplePolish": "Jej sugestią było, że się myliliśmy."
      },
      {
        "id": "advanced-25",
        "english": "Limitation",
        "polish": "Ograniczenie",
        "pronunciation": "/ˌlɪm.ɪˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Discuss the limitations of your study.",
        "examplePolish": "Omów ograniczenia swojego badania."
      },
      {
        "id": "advanced-26",
        "english": "Scope",
        "polish": "Zakres",
        "pronunciation": "/skəʊp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This issue is outside the scope of our study.",
        "examplePolish": "Ta kwestia leży poza zakresem naszego badania."
      },
      {
        "id": "advanced-28",
        "english": "Approach",
        "polish": "Podejście",
        "pronunciation": "/əˈprəʊtʃ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We decided to take a practical approach.",
        "examplePolish": "Zdecydowaliśmy się na praktyczne podejście."
      },
      {
        "id": "advanced-30",
        "english": "Concept",
        "polish": "Pojęcie / Koncepcja",
        "pronunciation": "/ˈkɒn.sept/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He explained the basic concepts of physics.",
        "examplePolish": "Wyjaśnił podstawowe pojęcia fizyki."
      },
      {
        "id": "advanced-31",
        "english": "Principle",
        "polish": "Zasada",
        "pronunciation": "/ˈprɪn.sə.pəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I refuse to do it on principle.",
        "examplePolish": "Z zasady odmawiam zrobienia tego."
      },
      {
        "id": "advanced-32",
        "english": "Phenomenon",
        "polish": "Zjawisko",
        "pronunciation": "/fəˈnɒm.ɪ.nən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A rainbow is a natural physical phenomenon.",
        "examplePolish": "Tęcza to naturalne zjawisko fizyczne."
      },
      {
        "id": "advanced-33",
        "english": "Mechanism",
        "polish": "Mechanizm",
        "pronunciation": "/ˈmek.ə.nɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What is the mechanism of this machine?",
        "examplePolish": "Jaki jest mechanizm działania tej maszyny?"
      },
      {
        "id": "advanced-34",
        "english": "Structure",
        "polish": "Struktura",
        "pronunciation": "/ˈstrʌk.tʃər/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The structure of the DNA molecule is complex.",
        "examplePolish": "Struktura cząsteczki DNA jest złożona."
      },
      {
        "id": "advanced-35",
        "english": "Function",
        "polish": "Funkcja / Funkcjonować",
        "pronunciation": "/ˈfʌŋk.ʃən/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The heart's main function is to pump blood.",
        "examplePolish": "Główną funkcją serca jest pompowanie krwi."
      },
      {
        "id": "advanced-36",
        "english": "Relationship",
        "polish": "Związek / Relacja",
        "pronunciation": "/rɪˈleɪ.ʃən.ʃɪp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "There is a direct relationship between them.",
        "examplePolish": "Istnieje między nimi bezpośredni związek."
      },
      {
        "id": "advanced-37",
        "english": "Correlation",
        "polish": "Korelacja",
        "pronunciation": "/ˌkɒr.əˈleɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Studies show a high correlation between education and income.",
        "examplePolish": "Badania pokazują wysoką korelację między wykształceniem a dochodami."
      },
      {
        "id": "advanced-38",
        "english": "Causation",
        "polish": "Związek przyczynowy",
        "pronunciation": "/kɔːˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Correlation does not prove causation.",
        "examplePolish": "Korelacja nie dowodzi związku przyczynowego."
      },
      {
        "id": "advanced-39",
        "english": "Variable",
        "polish": "Zmienna",
        "pronunciation": "/ˈveə.ri.ə.bəl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We controlled all independent variables.",
        "examplePolish": "Kontrolowaliśmy wszystkie zmienne niezależne."
      },
      {
        "id": "advanced-40",
        "english": "Control group",
        "polish": "Grupa kontrolna",
        "pronunciation": "/kənˈtrəʊl ɡruːp/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The control group received a placebo.",
        "examplePolish": "Grupa kontrolna otrzymała placebo."
      },
      {
        "id": "advanced-41",
        "english": "Sample",
        "polish": "Próbka",
        "pronunciation": "/ˈsɑːm.pəl/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "A sample of soil was tested in the lab.",
        "examplePolish": "Próbka gleby została zbadana w laboratorium."
      },
      {
        "id": "advanced-42",
        "english": "Participant",
        "polish": "Uczestnik",
        "pronunciation": "/pɑːˈtɪs.ɪ.pənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "All participants signed a consent form.",
        "examplePolish": "Wszyscy uczestnicy podpisali formularz zgody."
      },
      {
        "id": "advanced-43",
        "english": "Experiment",
        "polish": "Eksperyment",
        "pronunciation": "/ɪkˈsper.ɪ.mənt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "They conducted a scientific experiment.",
        "examplePolish": "Przeprowadzili eksperyment naukowy."
      },
      {
        "id": "advanced-44",
        "english": "Survey",
        "polish": "Ankieta / Badanie",
        "pronunciation": "/ˈsɜː.veɪ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The survey shows high user satisfaction.",
        "examplePolish": "Ankieta wykazuje wysokie zadowolenie użytkowników."
      },
      {
        "id": "advanced-45",
        "english": "Interview",
        "polish": "Wywiad / Rozmowa kwalifikacyjna",
        "pronunciation": "/ˈɪn.tə.vjuː/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We interviewed ten candidates for the job.",
        "examplePolish": "Przeprowadziliśmy wywiady z dziesięcioma kandydatami."
      },
      {
        "id": "advanced-46",
        "english": "Observation",
        "polish": "Obserwacja",
        "pronunciation": "/ˌɒb.zəˈveɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She spent years on bird observation.",
        "examplePolish": "Spędziła lata na obserwacji ptaków."
      },
      {
        "id": "advanced-47",
        "english": "Case study",
        "polish": "Studium przypadku",
        "pronunciation": "/ˈkeɪs ˌstʌd.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We analyzed a case study of a startup.",
        "examplePolish": "Przeanalizowaliśmy studium przypadku startupu."
      },
      {
        "id": "advanced-48",
        "english": "Literature review",
        "polish": "Przegląd literatury",
        "pronunciation": "/ˈlɪt.rə.tʃər rɪˈvjuː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Write a literature review on this topic.",
        "examplePolish": "Napisz przegląd literatury na ten temat."
      },
      {
        "id": "advanced-49",
        "english": "Bibliography",
        "polish": "Bibliografia",
        "pronunciation": "/ˌbɪb.liˈɒɡ.rə.fi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Include a bibliography at the end.",
        "examplePolish": "Na końcu dołącz bibliografię."
      }
    ]
  },
  {
    "id": "business-c1",
    "title": "Executive Business (C1)",
    "polishTitle": "Biznes Executive",
    "category": "business",
    "level": "C1",
    "description": "Advanced vocabulary for mergers, board strategy, and financial liabilities.",
    "icon": "TrendingUp",
    "color": "#1e3a8a",
    "cards": [
      {
        "id": "business-c1-1",
        "english": "Acquisition",
        "polish": "Przejęcie / Nabytek",
        "pronunciation": "/ˌæk.wəˈzɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The acquisition of the startup was completed.",
        "examplePolish": "Przejęcie startupu zostało zakończone."
      },
      {
        "id": "business-c1-2",
        "english": "Synergy",
        "polish": "Synergia",
        "pronunciation": "/ˈsɪn.ɚ.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We hope to achieve operational synergies.",
        "examplePolish": "Mamy nadzieję na osiągnięcie synergii operacyjnych."
      },
      {
        "id": "business-c1-4",
        "english": "Liability",
        "polish": "Odpowiedzialność prawna",
        "pronunciation": "/ˌlaɪ.əˈbɪl.ə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company admitted no liability for the accident.",
        "examplePolish": "Firma nie przyznała się do odpowiedzialności prawnej za wypadek."
      },
      {
        "id": "business-c1-5",
        "english": "To outsource",
        "polish": "Zlecać na zewnątrz (outsourcing)",
        "pronunciation": "/ˈaʊt.sɔːrs/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We decided to outsource customer support to cut overhead costs.",
        "examplePolish": "Zdecydowaliśmy się zlecić obsługę klienta na zewnątrz, aby obniżyć koszty ogólne."
      },
      {
        "id": "business-c1-7",
        "english": "Dividend",
        "polish": "Dywidenda",
        "pronunciation": "/ˈdɪv.ə.dend/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company paid out a record dividend to its shareholders.",
        "examplePolish": "Spółka wypłaciła rekordową dywidendę swoim akcjonariuszom."
      },
      {
        "id": "business-c1-8",
        "english": "To leverage",
        "polish": "Wykorzystać / lewarować",
        "pronunciation": "/ˈlev.ɚ.ɪdʒ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We want to leverage social media to boost sales.",
        "examplePolish": "Chcemy wykorzystać media społecznościowe, aby zwiększyć sprzedaż."
      },
      {
        "id": "business-c1-9",
        "english": "Compliance",
        "polish": "Zgodność z przepisami",
        "pronunciation": "/kəmˈplaɪ.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company is in compliance with safety laws.",
        "examplePolish": "Firma działa zgodnie z przepisami bezpieczeństwa."
      },
      {
        "id": "business-c1-10",
        "english": "Equity",
        "polish": "Kapitał własny / Słuszność",
        "pronunciation": "/ˈek.wə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He owns thirty percent equity in the firm.",
        "examplePolish": "On posiada trzydzieści procent kapitału własnego w firmie."
      },
      {
        "id": "business-c1-11",
        "english": "Governance",
        "polish": "Zarządzanie / Ład korporacyjny",
        "pronunciation": "/ˈɡʌv.ən.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Corporate governance principles were violated.",
        "examplePolish": "Zasady ładu korporacyjnego zostały złamane."
      },
      {
        "id": "business-c1-13",
        "english": "Regulation",
        "polish": "Przepis / rozporządzenie",
        "pronunciation": "/ˌreɡ.jəˈleɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must follow the safety regulations.",
        "examplePolish": "Musimy przestrzegać przepisów bezpieczeństwa."
      },
      {
        "id": "business-c1-15",
        "english": "Asset",
        "polish": "Aktywo / Własność",
        "pronunciation": "/ˈæs.et/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Liquid assets can be quickly sold for cash.",
        "examplePolish": "Płynne aktywa można szybko sprzedać za gotówkę."
      },
      {
        "id": "business-c1-18",
        "english": "Liquidity",
        "polish": "Płynność finansowa",
        "pronunciation": "/lɪˈkwɪd.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The bank faced serious liquidity problems.",
        "examplePolish": "Bank stanął w obliczu poważnych problemów z płynnością."
      },
      {
        "id": "business-c1-19",
        "english": "Solvency",
        "polish": "Wypłacalność",
        "pronunciation": "/ˈsɒl.vən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The audit confirmed the company's solvency.",
        "examplePolish": "Audyt potwierdził wypłacalność firmy."
      },
      {
        "id": "business-c1-20",
        "english": "Bankruptcy",
        "polish": "Bankructwo / upadłość",
        "pronunciation": "/ˈbæŋ.krəpt.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The airline declared bankruptcy in 2024.",
        "examplePolish": "Linia lotnicza ogłosiła bankructwo w 2024 roku."
      },
      {
        "id": "business-c1-21",
        "english": "Insolvency",
        "polish": "Niewypłacalność",
        "pronunciation": "/ɪnˈsɒl.vən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Insolvency led to corporate restructuring.",
        "examplePolish": "Niewypłacalność doprowadziła do restrukturyzacji firmy."
      },
      {
        "id": "business-c1-22",
        "english": "Audit",
        "polish": "Audyt / Kontrola",
        "pronunciation": "/ˈɔː.dɪt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "An external firm conducted the annual audit.",
        "examplePolish": "Zewnętrzna firma przeprowadziła coroczny audyt."
      },
      {
        "id": "business-c1-23",
        "english": "Forecasting",
        "polish": "Prognozowanie",
        "pronunciation": "/ˈfɔː.kɑːs.tɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Financial forecasting is crucial for planning.",
        "examplePolish": "Prognozowanie finansowe jest kluczowe dla planowania."
      },
      {
        "id": "business-c1-24",
        "english": "Valuation",
        "polish": "Wycena",
        "pronunciation": "/ˌvæl.juˈeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company's valuation was estimated at $1B.",
        "examplePolish": "Wycenę firmy oszacowano na 1 miliard dolarów."
      },
      {
        "id": "business-c1-25",
        "english": "Leverage",
        "polish": "Dźwignia finansowa / Wpływ",
        "pronunciation": "/ˈliː.vər.ɪdʒ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We will use our leverage to get a better deal.",
        "examplePolish": "Użyjemy naszych wpływów, aby uzyskać lepszą umowę."
      },
      {
        "id": "business-c1-26",
        "english": "Amortization",
        "polish": "Amortyzacja (wartości niematerialnych)",
        "pronunciation": "/æm.ɔː.taɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Amortization reduces taxable income.",
        "examplePolish": "Amortyzacja obniża dochód podlegający opodatkowaniu."
      },
      {
        "id": "business-c1-27",
        "english": "Depreciation",
        "polish": "Deprecjacja / Amortyzacja (środków trwałych)",
        "pronunciation": "/dɪˌpriː.ʃiˈeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Calculate the annual depreciation of office laptops.",
        "examplePolish": "Oblicz coroczną amortyzację biurowych laptopów."
      },
      {
        "id": "business-c1-29",
        "english": "Merger",
        "polish": "Fuzja / Połączenie",
        "pronunciation": "/ˈmɜː.dʒər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The merger of the two companies failed.",
        "examplePolish": "Fuzja obu firm zakończyła się niepowodzeniem."
      },
      {
        "id": "business-c1-31",
        "english": "Restructuring",
        "polish": "Restrukturyzacja",
        "pronunciation": "/ˌriːˈstrʌk.tʃər.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company underwent massive restructuring.",
        "examplePolish": "Firma przeszła ogromną restrukturyzację."
      },
      {
        "id": "business-c1-32",
        "english": "Outsourcing",
        "polish": "Zlecanie usług na zewnątrz",
        "pronunciation": "/ˈaʊtˌsɔː.sɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Outsourcing IT support saved us money.",
        "examplePolish": "Zlecanie wsparcia IT na zewnątrz pozwoliło nam zaoszczędzić pieniądze."
      },
      {
        "id": "business-c1-33",
        "english": "Insourcing",
        "polish": "Zlecanie usług wewnątrz firmy",
        "pronunciation": "/ˈɪnˌsɔː.sɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They decided on insourcing software design.",
        "examplePolish": "Zdecydowali się na projektowanie oprogramowania wewnątrz firmy."
      },
      {
        "id": "business-c1-34",
        "english": "Offshoring",
        "polish": "Przenoszenie produkcji za granicę",
        "pronunciation": "/ˌɒfˈʃɔː.rɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Offshoring manufacturing reduced labor costs.",
        "examplePolish": "Przeniesienie produkcji za granicę obniżyło koszty pracy."
      },
      {
        "id": "business-c1-35",
        "english": "Nearshoring",
        "polish": "Przenoszenie biznesu do sąsiedniego kraju",
        "pronunciation": "/ˈnɪə.ʃɔː.rɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Nearshoring offers better communication.",
        "examplePolish": "Nearshoring zapewnia lepszą komunikację."
      },
      {
        "id": "business-c1-36",
        "english": "Logistics",
        "polish": "Logistyka",
        "pronunciation": "/ləˈdʒɪs.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Logistics is the science of supply chain.",
        "examplePolish": "Logistyka to nauka o łańcuchu dostaw."
      },
      {
        "id": "business-c1-37",
        "english": "Procurement",
        "polish": "Zaopatrzenie / Zamówienia",
        "pronunciation": "/prəˈkjʊə.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The procurement department negotiates with suppliers.",
        "examplePolish": "Dział zaopatrzenia negocjuje z dostawcami."
      },
      {
        "id": "business-c1-38",
        "english": "Distributor",
        "polish": "Dystrybutor",
        "pronunciation": "/dɪˈstrɪb.jə.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Find a local distributor for our products.",
        "examplePolish": "Znajdź lokalnego dystrybutora dla naszych produktów."
      },
      {
        "id": "business-c1-39",
        "english": "Wholesaler",
        "polish": "Hurtownik",
        "pronunciation": "/ˈhəʊl.seɪ.lər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Wholesalers buy goods in large quantities.",
        "examplePolish": "Hurtownicy kupują towary w dużych ilościach."
      },
      {
        "id": "business-c1-40",
        "english": "Retailer",
        "polish": "Sprzedawca detaliczny",
        "pronunciation": "/ˈriː.teɪ.lər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The product is sold by major retailers.",
        "examplePolish": "Produkt jest sprzedawany przez głównych detalistów."
      },
      {
        "id": "business-c1-41",
        "english": "Franchise",
        "polish": "Franczyza",
        "pronunciation": "/ˈfræn.tʃaɪz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "McDonald's operates as a global franchise.",
        "examplePolish": "McDonald's działa jako globalna franczyza."
      },
      {
        "id": "business-c1-42",
        "english": "Patent",
        "polish": "Patent / Opatentować",
        "pronunciation": "/ˈpeɪ.tənt/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "They filed a patent for the new battery.",
        "examplePolish": "Złożyli wniosek o patent na nową baterię."
      },
      {
        "id": "business-c1-43",
        "english": "Trademark",
        "polish": "Znak towarowy",
        "pronunciation": "/ˈtreɪd.mɑːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The logo is a registered trademark.",
        "examplePolish": "Logo jest zarejestrowanym znakiem towarowym."
      },
      {
        "id": "business-c1-44",
        "english": "Copyright",
        "polish": "Prawa autorskie",
        "pronunciation": "/ˈkɒp.i.raɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The book is protected by copyright law.",
        "examplePolish": "Książka jest chroniona prawem autorskim."
      },
      {
        "id": "business-c1-45",
        "english": "Intellectual property",
        "polish": "Własność intelektualna",
        "pronunciation": "/ˌɪn.təlˈek.tʃu.əl ˈprɒp.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Patents protect intellectual property.",
        "examplePolish": "Patenty chronią własność intelektualną."
      },
      {
        "id": "business-c1-46",
        "english": "Arbitration",
        "polish": "Arbitraż / Rozjemstwo",
        "pronunciation": "/ˌɑː.bɪˈtreɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The dispute was settled by arbitration.",
        "examplePolish": "Spór został rozstrzygnięty w drodze arbitrażu."
      },
      {
        "id": "business-c1-47",
        "english": "Litigation",
        "polish": "Proces sądowy / Spór prawny",
        "pronunciation": "/ˌlɪt.ɪˈɡeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Avoid litigation if a settlement is possible.",
        "examplePolish": "Unikaj procesu sądowego, jeśli ugoda jest możliwa."
      },
      {
        "id": "business-c1-48",
        "english": "Settlement",
        "polish": "Ugoda / Rozstrzygnięcie",
        "pronunciation": "/ˈset.əl.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They reached a financial settlement out of court.",
        "examplePolish": "Osiągnęli ugodę finansową poza sądem."
      },
      {
        "id": "business-c1-49",
        "english": "Monopoly",
        "polish": "Monopol",
        "pronunciation": "/məˈnɒp.əl.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The state had a monopoly on salt sales.",
        "examplePolish": "Państwo miało monopol na sprzedaż soli."
      },
      {
        "id": "business-c1-50",
        "english": "Oligopoly",
        "polish": "Oligopol",
        "pronunciation": "/ˌɒl.ɪˈɡɒp.əl.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The airline industry is an oligopoly.",
        "examplePolish": "Branża lotnicza to oligopol.\n\n\n--- TALIA: Idioms & Phrasals (C2) / Idiomy i frazale (C2) ---\nOpis: Colorful expressions and common phrasals to make you sound like a native speaker."
      }
    ]
  },
  {
    "id": "idioms",
    "title": "Idioms & Phrasals (C2)",
    "polishTitle": "Idiomy i frazale",
    "category": "idioms",
    "level": "C2",
    "description": "Colorful expressions and common phrasals to make you sound like a native speaker.",
    "icon": "Flame",
    "color": "#f97316",
    "cards": [
      {
        "id": "idioms-1",
        "english": "Bite the bullet",
        "polish": "Zacisnąć zęby / stawić czoła trudnościom",
        "pronunciation": "/baɪt ðə ˈbʊl.ɪt/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "I decided to bite the bullet and tell him the truth.",
        "examplePolish": "Postanowiłem zacisnąć zęby i powiedzieć mu prawdę."
      },
      {
        "id": "idioms-2",
        "english": "Spill the beans",
        "polish": "Wygadać się / ujawnić sekret",
        "pronunciation": "/spɪl ðə biːnz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Tell me what she said – spill the beans!",
        "examplePolish": "Powiedz mi, co ona powiedziała – wygadaj się!"
      },
      {
        "id": "idioms-3",
        "english": "To look forward to",
        "polish": "Czekać z niecierpliwością",
        "pronunciation": "/lʊk ˈfɔːr.wɚd tuː/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "I am really looking forward to our holiday in Spain.",
        "examplePolish": "Naprawdę z niecierpliwością czekam na nasze wakacje w Hiszpanii."
      },
      {
        "id": "idioms-4",
        "english": "Take with a grain of salt",
        "polish": "Brać z przymrużeniem oka",
        "pronunciation": "/teɪk wɪð ə ɡreɪn əv sɑːlt/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He exaggerates, so take his stories with a grain of salt.",
        "examplePolish": "On koloryzuje, więc bierz jego historie z przymrużeniem oka."
      },
      {
        "id": "idioms-5",
        "english": "To run out of",
        "polish": "Wyczerpać się / nie mieć już",
        "pronunciation": "/rʌn aʊt əv/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "We've run out of milk, so I'll go buy some.",
        "examplePolish": "Skończyło nam się mleko, więc pójdę kupić trochę."
      },
      {
        "id": "idioms-6",
        "english": "Burn the midnight oil",
        "polish": "Pracować po nocach",
        "pronunciation": "/bɜːrn ðə ˈmɪd.naɪt ɔɪl/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "We had to burn the midnight oil to compile the data.",
        "examplePolish": "Musieliśmy pracować po nocach, aby skompilować dane."
      },
      {
        "id": "idioms-7",
        "english": "A blessing in disguise",
        "polish": "Szczęście w nieszczęściu",
        "pronunciation": "/ə ˈbles.ɪŋ ɪn dɪsˈɡaɪz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Losing that job was a blessing in disguise because I found a much better one.",
        "examplePolish": "Utrata tamtej pracy była szczęściem w nieszczęściu, bo znalazłem znacznie lepszą.\n\n\n--- TALIA: Business Idioms - Part 1 (B2) / Idiomy w biznesie – Część 1 (B2) ---\nOpis: Kluczowe idiomy i zwroty przydatne w pracy, negocjacjach i codziennej komunikacji biznesowej."
      },
      {
        "id": "idioms-8",
        "english": "To look up to",
        "polish": "Podziwiać kogoś / szanować",
        "pronunciation": "/lʊk ʌp tuː/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "I have always looked up to my father for his integrity.",
        "examplePolish": "Zawsze podziwiałem mojego ojca za jego uczciwość."
      },
      {
        "id": "idioms-9",
        "english": "Once in a blue moon",
        "polish": "Raz na ruski rok (bardzo rzadko)",
        "pronunciation": "/wʌns ɪn ə bluː muːn/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He visits us once in a blue moon.",
        "examplePolish": "Odwiedza nas raz na ruski rok."
      },
      {
        "id": "idioms-10",
        "english": "Break the ice",
        "polish": "Przełamać lody",
        "pronunciation": "/breɪk ðə aɪs/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "His funny presentation broke the ice.",
        "examplePolish": "Jego zabawna prezentacja przełamała lody."
      },
      {
        "id": "idioms-11",
        "english": "To look into",
        "polish": "Zbadać / przyjrzeć się sprawie",
        "pronunciation": "/lʊk ˈlʊk ɪn.tuː/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "The police are looking into the cause of the accident.",
        "examplePolish": "Policja bada przyczyny wypadku."
      },
      {
        "id": "idioms-12",
        "english": "Cost an arm and a leg",
        "polish": "Kosztować fortunę / słono kosztować",
        "pronunciation": "/kɔːst ən ɑːrm ənd ə leɡ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "The new laptop is great, but it cost an arm and a leg.",
        "examplePolish": "Nowy laptop jest świetny, ale kosztował fortunę."
      },
      {
        "id": "idioms-13",
        "english": "To bring up",
        "polish": "Wspomnieć o czymś / poruszyć temat",
        "pronunciation": "/brɪŋ ʌp/",
        "partOfSpeech": "phrasal verb",
        "exampleEnglish": "Don't bring up the budget problem during the lunch meeting.",
        "examplePolish": "Nie poruszaj tematu problemów z budżetem podczas lunchu biznesowego."
      },
      {
        "id": "idioms-14",
        "english": "On the tip of one's tongue",
        "polish": "Na końcu języka",
        "pronunciation": "/aːn ðə tɪp əv wʌnz tʌŋ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Her phone number was on the tip of my tongue, but I couldn't remember it.",
        "examplePolish": "Jej numer telefonu miałem na końcu języka, ale nie mogłem go sobie przypomnieć."
      },
      {
        "id": "idioms-21",
        "english": "Burn midnight oil",
        "polish": "Pracować do późna w nocy",
        "pronunciation": "/bɜːn ðə ˈmɪd.naɪt ɔɪl/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Students burn the midnight oil before exams.",
        "examplePolish": "Studenci pracują do późna w nocy przed egzaminami."
      },
      {
        "id": "idioms-22",
        "english": "Hit nail on the head",
        "polish": "Trafić w sedno",
        "pronunciation": "/hɪt ðə neɪl ɒn ðə hed/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Your analysis hit the nail on the head.",
        "examplePolish": "Twoja analiza trafiła w sedno."
      },
      {
        "id": "idioms-25",
        "english": "Devil's advocate",
        "polish": "Adwokat diabła",
        "pronunciation": "/ˈdev.əlz ˈæd.və.kət/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "She played devil's advocate during our brainstorm.",
        "examplePolish": "Wcieliła się w rolę adwokata diabła podczas naszej burzy mózgów."
      },
      {
        "id": "idioms-26",
        "english": "Face the music",
        "polish": "Wypić piwo, które się nawarzyło / ponieść konsekwencje",
        "pronunciation": "/feɪs ðə ˈmjuː.zɪk/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "You broke the window; you must face the music.",
        "examplePolish": "Wybiłeś okno; musisz ponieść tego konsekwencje."
      },
      {
        "id": "idioms-28",
        "english": "Jump on bandwagon",
        "polish": "Poddać się modzie",
        "pronunciation": "/dʒʌmp ɒn ˈbænd.wæɡ.ən/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Many firms jump on the AI bandwagon.",
        "examplePolish": "Wiele firm poddaje się modzie na sztuczną inteligencję."
      },
      {
        "id": "idioms-29",
        "english": "Keep an eye on",
        "polish": "Mieć oko na / pilnować",
        "pronunciation": "/kiːp ən aɪ ɒn/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Please keep an eye on my bags while I buy a ticket.",
        "examplePolish": "Proszę mieć oko na moje torby, gdy będę kupować bilet."
      },
      {
        "id": "idioms-30",
        "english": "Kill two birds",
        "polish": "Upiec dwie pieczenie na jednym ogniu",
        "pronunciation": "/kɪl tuː bɜːdz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Writing notes kills two birds with one stone.",
        "examplePolish": "Pisanie notatek pozwala upiec dwie pieczenie na jednym ogniu."
      },
      {
        "id": "idioms-31",
        "english": "Miss the boat",
        "polish": "Spóźnić się / stracić okazję",
        "pronunciation": "/mɪs ðə bəʊt/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "If you don't buy the ticket today, you will miss the boat.",
        "examplePolish": "Jeśli nie kupisz biletu dzisiaj, stracisz okazję."
      },
      {
        "id": "idioms-32",
        "english": "On the ball",
        "polish": "Mający głowę na karku / zorientowany",
        "pronunciation": "/ɒn ðə bɔːl/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He is very quick to learn; he is really on the ball.",
        "examplePolish": "Bardzo szybko się uczy; naprawdę ma głowę na karku."
      },
      {
        "id": "idioms-33",
        "english": "Pull someone's leg",
        "polish": "Robić sobie z kogoś żarty / nabierać kogoś",
        "pronunciation": "/pʊl ˈsʌm.wʌnz leɡ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Don't worry, he is just pulling your leg.",
        "examplePolish": "Nie martw się, on tylko stroi sobie z ciebie żarty."
      },
      {
        "id": "idioms-34",
        "english": "Rule of thumb",
        "polish": "Złota zasada / reguła oparta na doświadczeniu",
        "pronunciation": "/ruːl ɒv θʌm/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "As a rule of thumb, drink eight glasses of water daily.",
        "examplePolish": "Jako złotą zasadę przyjmij wypijanie ośmiu szklanek wody dziennie."
      },
      {
        "id": "idioms-35",
        "english": "See eye to eye",
        "polish": "Zgadzać się w zupełności",
        "pronunciation": "/siː aɪ tuː aɪ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "They don't see eye to eye on family matters.",
        "examplePolish": "Nie zgadzają się ze sobą w kwestiach rodzinnych."
      },
      {
        "id": "idioms-36",
        "english": "Grain of salt",
        "polish": "Z przymrużeniem oka",
        "pronunciation": "/ɡreɪn ɒv sɒlt/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Take his stories with a grain of salt.",
        "examplePolish": "Bierz jego opowieści z przymrużeniem oka."
      },
      {
        "id": "idioms-37",
        "english": "Thick and thin",
        "polish": "Na dobre i na złe",
        "pronunciation": "/θɪk ænd θɪn/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "They supported us through thick and thin.",
        "examplePolish": "Wspierali nas na dobre i na złe."
      },
      {
        "id": "idioms-38",
        "english": "Up in the air",
        "polish": "Pod znakiem zapytania / w zawieszeniu",
        "pronunciation": "/ʌp ɪn ði eər/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Our travel plans are still up in the air.",
        "examplePolish": "Nasze plany wyjazdowe wciąż stoją pod znakiem zapytania."
      },
      {
        "id": "idioms-39",
        "english": "Wear heart on sleeve",
        "polish": "Mieć serce na dłoni",
        "pronunciation": "/weər hɑːt ɒn sliːv/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He is sensitive and wears his heart on his sleeve.",
        "examplePolish": "Jest wrażliwy i ma serce na dłoni."
      },
      {
        "id": "idioms-40",
        "english": "Whole nine yards",
        "polish": "Wszystko, co możliwe / na całego",
        "pronunciation": "/həʊl naɪn jɑːdz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "He bought the house, furniture, yard – the whole nine yards.",
        "examplePolish": "Kupił dom, meble, ogród – wszystko, co było możliwe."
      },
      {
        "id": "idioms-41",
        "english": "Cost arm and leg",
        "polish": "Kosztować fortunę",
        "pronunciation": "/kɒst ɑːm ænd leɡ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "This luxury watch costs an arm and a leg.",
        "examplePolish": "Ten luksusowy zegarek kosztuje fortunę."
      },
      {
        "id": "idioms-42",
        "english": "Add insult to injury",
        "polish": "Dolać oliwy do ognia",
        "pronunciation": "/æd ˈɪn.sʌlt tuː ˈɪn.dʒər.i/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Canceling the flight added insult to injury.",
        "examplePolish": "Odwołanie lotu dolało oliwy do ognia."
      },
      {
        "id": "idioms-43",
        "english": "Drawing board",
        "polish": "Zacząć od nowa",
        "pronunciation": "/ˈdrɔː.ɪŋ bɔːd/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "If it fails, we go back to the drawing board.",
        "examplePolish": "Jeśli to się nie powiedzie, wrócimy do punktu wyjścia."
      },
      {
        "id": "idioms-44",
        "english": "Beat around bush",
        "polish": "Owijać w bawełnę",
        "pronunciation": "/biːt əˈraʊnd bʊʃ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Stop beating around the bush and tell me.",
        "examplePolish": "Przestań owijać w bawełnę i powiedz mi."
      },
      {
        "id": "idioms-45",
        "english": "Best of both worlds",
        "polish": "Korzyści z dwóch różnych sytuacji / idealne rozwiązanie",
        "pronunciation": "/best ɒv bəʊθ wɜːldz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Working from home part-time gives me the best of both worlds.",
        "examplePolish": "Praca z domu na pół etatu daje mi korzyści z obu tych światów."
      },
      {
        "id": "idioms-46",
        "english": "Bite off too much",
        "polish": "Porwać się z motyką na słońce",
        "pronunciation": "/baɪt ɒf tuː mʌtʃ/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Don't bite off more than you can chew.",
        "examplePolish": "Nie porywaj się z motyką na słońce."
      },
      {
        "id": "idioms-47",
        "english": "Blessing in disguise",
        "polish": "Szczęście w nieszczęściu",
        "pronunciation": "/ˈbles.ɪŋ ɪn dɪsˈɡaɪz/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "Losing that client was a blessing in disguise as we found a better one.",
        "examplePolish": "Strata tamtego klienta była szczęściem w nieszczęściu, bo znaleźliśmy lepszego."
      },
      {
        "id": "idioms-48",
        "english": "Bark up wrong tree",
        "polish": "Błędnie kogoś oskarżać",
        "pronunciation": "/bɑːk ʌp rɒŋ triː/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "You are barking up the wrong tree.",
        "examplePolish": "Błędnie mnie oskarżasz."
      },
      {
        "id": "idioms-49",
        "english": "Cry over spilled milk",
        "polish": "Płakać nad rozlanym mlekiem",
        "pronunciation": "/kraɪ ˈəʊ.vər spɪld mɪlk/",
        "partOfSpeech": "idiom",
        "exampleEnglish": "We lost the deal, but let's not cry over spilled milk.",
        "examplePolish": "Straciliśmy umowę, ale nie płaczmy nad rozlanym mlekiem."
      }
    ]
  },
  {
    "id": "academic-c1",
    "title": "Academic Writing (C1)",
    "polishTitle": "Pisanie akademickie",
    "category": "general",
    "level": "C1",
    "description": "Formal and academic vocabulary for researching, writing reports, and presenting thesis arguments.",
    "icon": "GraduationCap",
    "color": "#475569",
    "cards": [
      {
        "id": "academic-c1-2",
        "english": "Empirical",
        "polish": "Empiryczny / oparty na doświadczeniu",
        "pronunciation": "/ɪmˈpɪr.ɪ.kəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "We need empirical evidence to validate the theory.",
        "examplePolish": "Potrzebujemy empirycznych dowodów, aby zweryfikować tę teorię."
      },
      {
        "id": "academic-c1-4",
        "english": "To substantiate",
        "polish": "Uzasadnić / poprzeć dowodami",
        "pronunciation": "/səbˈstæn.ʃi.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "You must provide data to substantiate your arguments.",
        "examplePolish": "Musisz dostarczyć dane, aby uzasadnić swoje argumenty."
      },
      {
        "id": "academic-c1-8",
        "english": "To synthesize",
        "polish": "Syntetyzować / łączyć",
        "pronunciation": "/ˈsɪn.θə.saɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The literature review synthesizes findings from fifty papers.",
        "examplePolish": "Przegląd literatury syntetyzuje wnioski z pięćdziesięciu prac."
      },
      {
        "id": "academic-c1-9",
        "english": "Cognitive",
        "polish": "Poznawczy / kognitywny",
        "pronunciation": "/ˈkɑːɡ.nə.t̬ɪv/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Cognitive psychology studies mental processes.",
        "examplePolish": "Psychologia poznawcza bada procesy umysłowe."
      },
      {
        "id": "academic-c1-10",
        "english": "Objective",
        "polish": "Obiektywny",
        "pronunciation": "/əbˈdʒek.tɪv/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Scientists must try to remain completely objective in their evaluations.",
        "examplePolish": "Naukowcy muszą starać się pozostać całkowicie obiektywni w swoich ocenach."
      },
      {
        "id": "academic-c1-11",
        "english": "To Corroborate",
        "polish": "Potwierdzić / Poprzeć dowodami",
        "pronunciation": "/kəˈrɒb.ə.reɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Recent studies corroborate these findings.",
        "examplePolish": "Niedawne badania potwierdzają te odkrycia."
      },
      {
        "id": "academic-c1-12",
        "english": "To Delineate",
        "polish": "Nakreślić / Przedstawić szczegółowo",
        "pronunciation": "/dɪˈlɪn.i.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The report delineates the project goals.",
        "examplePolish": "Raport nakreśla cele projektu."
      },
      {
        "id": "academic-c1-13",
        "english": "To Elucidate",
        "polish": "Wyjaśnić / Naświetlić",
        "pronunciation": "/iˈluː.sɪ.deɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Please elucidate this difficult concept.",
        "examplePolish": "Proszę wyjaśnić to trudne pojęcie."
      },
      {
        "id": "academic-c1-14",
        "english": "Advocate",
        "polish": "Rzecznik / Obrońca",
        "pronunciation": "/ˈæd.və.keɪt/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "She is a strong advocate for education.",
        "examplePolish": "Ona jest silnym obrońcą edukacji.\n\n\n--- TALIA: Mastering Nuance (C2) / Opanowanie niuansów (C2) ---\nOpis: Subtle distinctions, idioms, and advanced vocabulary to express delicate shades of meaning."
      },
      {
        "id": "academic-c1-15",
        "english": "To Concede",
        "polish": "Przyznać rację / Ustąpić",
        "pronunciation": "/kənˈsiːd/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The politician had to concede defeat.",
        "examplePolish": "Polityk musiał przyznać się do porażki."
      },
      {
        "id": "academic-c1-16",
        "english": "To Refute",
        "polish": "Obaliwać / Wykazać fałsz",
        "pronunciation": "/rɪˈfjuːt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The scientist refuted the old theory.",
        "examplePolish": "Naukowiec obalił starą teorię."
      },
      {
        "id": "academic-c1-17",
        "english": "To Synthesize",
        "polish": "Łączyć w całość",
        "pronunciation": "/ˈsɪn.θə.saɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We need to synthesize all findings.",
        "examplePolish": "Musimy połączyć w całość wszystkie wnioski."
      },
      {
        "id": "academic-c1-18",
        "english": "To Evaluate",
        "polish": "Ewaluować",
        "pronunciation": "/ɪˈvæl.ju.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Teachers evaluate student progress.",
        "examplePolish": "Nauczyciele oceniają postępy uczniów."
      },
      {
        "id": "academic-c1-19",
        "english": "To Hypothesize",
        "polish": "Formułować hipotezę",
        "pronunciation": "/haɪˈpɒθ.ə.saɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Astronomers hypothesize a new planet's existence.",
        "examplePolish": "Astronomowie wysuwają hipotezę o istnieniu nowej planety."
      },
      {
        "id": "academic-c1-20",
        "english": "Postulate",
        "polish": "Postulować / Zakładać",
        "pronunciation": "/ˈpɒs.tʃə.leɪt/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "They postulate that memory declines with age.",
        "examplePolish": "Zakładają, że pamięć pogarsza się wraz z wiekiem."
      },
      {
        "id": "academic-c1-21",
        "english": "To Reiterate",
        "polish": "Powtórzyć wielokrotnie",
        "pronunciation": "/riˈɪt.ər.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Let me reiterate the main points.",
        "examplePolish": "Pozwólcie, że powtórzę główne punkty."
      },
      {
        "id": "academic-c1-22",
        "english": "To Exemplify",
        "polish": "Ilustrować / Stanowić przykład",
        "pronunciation": "/ɪɡˈzem.plɪ.faɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "This case exemplifies the market trend.",
        "examplePolish": "Ten przypadek ilustruje trend rynkowy."
      },
      {
        "id": "academic-c1-23",
        "english": "To Demonstrate",
        "polish": "Wykazać / Zademonstrować",
        "pronunciation": "/ˈdem.ən.streɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The experiment demonstrates the law of gravity.",
        "examplePolish": "Eksperyment wykazuje prawo grawitacji."
      },
      {
        "id": "academic-c1-24",
        "english": "To Illustrate",
        "polish": "Ilustrować / Przedstawiać",
        "pronunciation": "/ˈɪl.ə.streɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "These examples illustrate my point.",
        "examplePolish": "Te przykłady ilustrują moją tezę."
      },
      {
        "id": "academic-c1-26",
        "english": "To Assess",
        "polish": "Oceniać / Oszacować",
        "pronunciation": "/əˈses/",
        "partOfSpeech": "verb",
        "exampleEnglish": "It is hard to assess the damage.",
        "examplePolish": "Trudno jest oszacować szkody."
      },
      {
        "id": "academic-c1-27",
        "english": "To Appraise",
        "polish": "Wyceniać / Oceniać wartość",
        "pronunciation": "/əˈpreɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The art dealer will appraise the painting.",
        "examplePolish": "Marszand dokona wyceny obrazu."
      },
      {
        "id": "academic-c1-28",
        "english": "To Interpret",
        "polish": "Interpretować",
        "pronunciation": "/ɪnˈtɜː.prɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "How do you interpret this poem?",
        "examplePolish": "Jak interpretujesz ten wiersz?"
      },
      {
        "id": "academic-c1-29",
        "english": "To Clarify",
        "polish": "Wyjaśniać / Klarować",
        "pronunciation": "/ˈklær.ɪ.faɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Could you clarify your statement?",
        "examplePolish": "Czy mógłbyś wyjaśnić swoje oświadczenie?"
      },
      {
        "id": "academic-c1-30",
        "english": "Paraphrase",
        "polish": "Parafrazować",
        "pronunciation": "/ˈpær.ə.freɪz/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Try to paraphrase the text in your own words.",
        "examplePolish": "Spróbuj sparafrazować tekst własnymi słowami."
      },
      {
        "id": "academic-c1-31",
        "english": "To Cite",
        "polish": "Cytować / Powoływać się",
        "pronunciation": "/saɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Don't forget to cite your sources.",
        "examplePolish": "Nie zapomnij powołać się na źródła."
      },
      {
        "id": "academic-c1-32",
        "english": "To Plagiarize",
        "polish": "Plagiatować",
        "pronunciation": "/ˈpleɪ.dʒər.aɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Do not plagiarize other authors' work.",
        "examplePolish": "Nie plagiatuj prac innych autorów."
      },
      {
        "id": "academic-c1-33",
        "english": "To Validate",
        "polish": "Uprawomocnić / Zatwierdzić",
        "pronunciation": "/ˈvæl.ɪ.deɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We need experiments to validate the model.",
        "examplePolish": "Potrzebujemy eksperymentów, by zatwierdzić model."
      },
      {
        "id": "academic-c1-34",
        "english": "To Verify",
        "polish": "Weryfikować",
        "pronunciation": "/ˈver.ɪ.faɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Please verify your email address.",
        "examplePolish": "Proszę zweryfikować swój adres e-mail."
      },
      {
        "id": "academic-c1-35",
        "english": "To Substantiate",
        "polish": "Poprzeć dowodami / Uzasadnić",
        "pronunciation": "/səbˈstæn.ʃi.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Can you substantiate your claims?",
        "examplePolish": "Czy możesz uzasadnić swoje twierdzenia?"
      },
      {
        "id": "academic-c1-36",
        "english": "To Contradict",
        "polish": "Zaprzeczać / Być w sprzeczności",
        "pronunciation": "/ˌkɒn.trəˈdɪkt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The two statements contradict each other.",
        "examplePolish": "Te dwa oświadczenia są w sprzeczności ze sobą."
      },
      {
        "id": "academic-c1-37",
        "english": "To Oppose",
        "polish": "Sprzeciwiać się",
        "pronunciation": "/əˈpəʊz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Many residents oppose the factory project.",
        "examplePolish": "Wielu mieszkańców sprzeciwia się projektowi fabryki."
      },
      {
        "id": "academic-c1-38",
        "english": "To Analyze",
        "polish": "Analizować",
        "pronunciation": "/ˈæn.əl.aɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We must analyze the data carefully.",
        "examplePolish": "Musimy dokładnie przeanalizować dane."
      },
      {
        "id": "academic-c1-40",
        "english": "To Summarize",
        "polish": "Podsumować",
        "pronunciation": "/ˈsʌm.ər.aɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Summarize the text in three sentences.",
        "examplePolish": "Podsumuj tekst w trzech zdaniach."
      },
      {
        "id": "academic-c1-42",
        "english": "Contrast",
        "polish": "Porównać (różnice)",
        "pronunciation": "/kənˈtrɑːst/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Contrast the two economic models.",
        "examplePolish": "Porównaj oba modele ekonomiczne (różnice)."
      },
      {
        "id": "academic-c1-43",
        "english": "To Differentiate",
        "polish": "Rozróżniać",
        "pronunciation": "/ˌdɪf.əˈren.ʃi.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "It is hard to differentiate between them.",
        "examplePolish": "Trudno rozróżnić między nimi."
      },
      {
        "id": "academic-c1-44",
        "english": "Critique",
        "polish": "Krytyka / Recenzja",
        "pronunciation": "/krɪˈtiːk/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "She wrote a detailed critique of the plan.",
        "examplePolish": "Napisała szczegółową krytykę tego planu."
      },
      {
        "id": "academic-c1-45",
        "english": "To Assert",
        "polish": "Twierdzić / Zapewniać",
        "pronunciation": "/əˈsɜːt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "She asserts her innocence.",
        "examplePolish": "Ona zapewnia o swojej niewinności."
      },
      {
        "id": "academic-c1-46",
        "english": "To Formulate",
        "polish": "Formułować",
        "pronunciation": "/ˈfɔː.mjə.leɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We need to formulate a response.",
        "examplePolish": "Musimy sformułować odpowiedź."
      },
      {
        "id": "academic-c1-47",
        "english": "To Devise",
        "polish": "Opracować / Wymyślić",
        "pronunciation": "/dɪˈvaɪz/",
        "partOfSpeech": "verb",
        "exampleEnglish": "He devised a clever plan to solve it.",
        "examplePolish": "Opracował sprytny plan, aby to rozwiązać."
      },
      {
        "id": "academic-c1-48",
        "english": "To Incorporate",
        "polish": "Wcielać / Włączać",
        "pronunciation": "/ɪnˈkɔː.pər.eɪt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Incorporate feedback into your draft.",
        "examplePolish": "Włącz uwagi do swojego szkicu."
      },
      {
        "id": "academic-c1-49",
        "english": "To Acquire",
        "polish": "Nabywać / Zdobywać",
        "pronunciation": "/əˈkwaɪər/",
        "partOfSpeech": "verb",
        "exampleEnglish": "It takes time to acquire a language.",
        "examplePolish": "Zdobycie języka wymaga czasu."
      },
      {
        "id": "academic-c1-50",
        "english": "To Determine",
        "polish": "Określać / Ustalać",
        "pronunciation": "/dɪˈtɜː.mɪn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Determine the cause of the system crash.",
        "examplePolish": "Ustal przyczynę awarii systemu.\n\n\n--- TALIA: Social Issues (C1) / Problemy społeczne (C1) ---\nOpis: Discuss global demographics, migration, socio-economic challenges, and public policy."
      }
    ]
  },
  {
    "id": "social-c1",
    "title": "Social Issues (C1)",
    "polishTitle": "Problemy społeczne",
    "category": "general",
    "level": "C1",
    "description": "Discuss global demographics, migration, socio-economic challenges, and public policy.",
    "icon": "Globe",
    "color": "#3b82f6",
    "cards": [
      {
        "id": "social-c1-1",
        "english": "Demographics",
        "polish": "Demografia",
        "pronunciation": "/ˌdem.əˈɡræf.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Demographics show an aging population.",
        "examplePolish": "Demografia wykazuje starzenie się społeczeństwa."
      },
      {
        "id": "social-c1-2",
        "english": "Discrepancy",
        "polish": "Rozbieżność",
        "pronunciation": "/dɪsˈkrep.ən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We noticed a major discrepancy between the two official statistics.",
        "examplePolish": "Zauważyliśmy poważną rozbieżność między dwiema oficjalnymi statystykami."
      },
      {
        "id": "social-c1-3",
        "english": "Marginalized",
        "polish": "Marginalizowany / wykluczony",
        "pronunciation": "/ˈmɑːr.dʒɪ.nəl.aɪzd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Government programs aim to support marginalized communities.",
        "examplePolish": "Programy rządowe mają na celu wspieranie zmarginalizowanych społeczności."
      },
      {
        "id": "social-c1-4",
        "english": "To trigger",
        "polish": "Wywołać / wyzwolić",
        "pronunciation": "/ˈtrɪɡ.ɚ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The economic crisis triggered widespread public protests.",
        "examplePolish": "Kryzys gospodarczy wywołał powszechne protesty społeczne."
      },
      {
        "id": "social-c1-5",
        "english": "Prejudice",
        "polish": "Uprzedzenie",
        "pronunciation": "/ˈpredʒ.ə.dɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must fight racial prejudice.",
        "examplePolish": "Musimy walczyć z uprzedzeniami rasowymi."
      },
      {
        "id": "social-c1-6",
        "english": "Inequality",
        "polish": "Nierówność",
        "pronunciation": "/ˌɪn.ɪˈkwɑː.lə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Income inequality has increased recently.",
        "examplePolish": "Nierówność dochodowa wzrosła w ostatnim czasie."
      },
      {
        "id": "social-c1-7",
        "english": "Integration",
        "polish": "Integracja społeczna",
        "pronunciation": "/ˌɪn.t̬əˈgreɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Integration of refugees is a long process.",
        "examplePolish": "Integracja uchodźców to długi proces."
      },
      {
        "id": "social-c1-8",
        "english": "To address",
        "polish": "Zająć się (problemem)",
        "pronunciation": "/əˈdres/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The prime minister promised to address the housing crisis immediately.",
        "examplePolish": "Premier obiecał natychmiast zająć się kryzysem mieszkaniowym."
      },
      {
        "id": "social-c1-9",
        "english": "Vulnerable",
        "polish": "Wrażliwy / bezbronny",
        "pronunciation": "/ˈvʌl.nɚ.ə.bəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Elderly people are particularly vulnerable to cold winter weather.",
        "examplePolish": "Osoby starsze są szczególnie podatne na mroźną zimową pogodę."
      },
      {
        "id": "social-c1-10",
        "english": "Advancement",
        "polish": "Postęp / awans",
        "pronunciation": "/ədˈvæns.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Technological advancement changes the structure of the labor market.",
        "examplePolish": "Postęp technologiczny zmienia strukturę rynku pracy."
      },
      {
        "id": "social-c1-11",
        "english": "Migration",
        "polish": "Migracja",
        "pronunciation": "/maɪˈɡreɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Economic migration is a global phenomenon.",
        "examplePolish": "Migracja ekonomiczna to zjawisko globalne."
      },
      {
        "id": "social-c1-12",
        "english": "Urbanization",
        "polish": "Urbanizacja",
        "pronunciation": "/ˌɜː.bən.aɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Rapid urbanization leads to traffic problems.",
        "examplePolish": "Szybka urbanizacja prowadzi do problemów komunikacyjnych."
      },
      {
        "id": "social-c1-14",
        "english": "Assimilation",
        "polish": "Asymilacja",
        "pronunciation": "/əˌsɪm.ɪˈleɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Cultural assimilation is often debated.",
        "examplePolish": "Asymilacja kulturowa jest często przedmiotem debaty."
      },
      {
        "id": "social-c1-15",
        "english": "Marginalization",
        "polish": "Marginalizacja",
        "pronunciation": "/ˌmɑː.dʒɪ.nəl.aɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Unemployment leads to social marginalization.",
        "examplePolish": "Bezrobocie prowadzi do marginalizacji społecznej."
      },
      {
        "id": "social-c1-16",
        "english": "Segregation",
        "polish": "Segregacja",
        "pronunciation": "/ˌseɡ.rɪˈɡeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Racial segregation was banned in the US.",
        "examplePolish": "Segregacja rasowa została zakazana w USA."
      },
      {
        "id": "social-c1-17",
        "english": "Discrimination",
        "polish": "Dyskryminacja",
        "pronunciation": "/dɪˌskrɪm.ɪˈneɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The law prohibits workplace discrimination.",
        "examplePolish": "Prawo zakazuje dyskryminacji w miejscu pracy."
      },
      {
        "id": "social-c1-19",
        "english": "Bias",
        "polish": "Stronniczość / uprzedzenie",
        "pronunciation": "/ˈbaɪ.əs/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Some news outlets show a political bias.",
        "examplePolish": "Niektóre serwisy informacyjne wykazują stronniczość polityczną."
      },
      {
        "id": "social-c1-20",
        "english": "Stereotypes",
        "polish": "Stereotypy",
        "pronunciation": "/ˈster.i.ə.taɪps/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must challenge gender stereotypes.",
        "examplePolish": "Musimy rzucić wyzwanie stereotypom płciowym."
      },
      {
        "id": "social-c1-22",
        "english": "Poverty",
        "polish": "Ubóstwo / Bieda",
        "pronunciation": "/ˈpɒv.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Poverty is still a major global challenge.",
        "examplePolish": "Ubóstwo to wciąż główne wyzwanie globalne."
      },
      {
        "id": "social-c1-23",
        "english": "Deprivation",
        "polish": "Pozbawienie / Deprywacja",
        "pronunciation": "/ˌdep.rɪˈveɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Sleep deprivation causes concentration issues.",
        "examplePolish": "Pozbawienie snu powoduje problemy z koncentracją."
      },
      {
        "id": "social-c1-24",
        "english": "Vulnerability",
        "polish": "Wrażliwość / Podatność na zranienie",
        "pronunciation": "/ˌvʌl.nər.əˈbɪl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Reducing the vulnerability of old citizens is a goal.",
        "examplePolish": "Celem jest zmniejszenie podatności na zranienie starszych obywateli."
      },
      {
        "id": "social-c1-25",
        "english": "Resilience",
        "polish": "Odporność / Elastyczność",
        "pronunciation": "/rɪˈzɪl.i.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Psychological resilience helps cope with stress.",
        "examplePolish": "Odporność psychiczna pomaga radzić sobie ze stresem."
      },
      {
        "id": "social-c1-26",
        "english": "Empowerment",
        "polish": "Upełnomocnienie / Wzmocnienie pozycji",
        "pronunciation": "/ɪmˈpaʊ.ə.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Women's empowerment is vital for progress.",
        "examplePolish": "Wzmocnienie pozycji kobiet jest kluczowe dla postępu."
      },
      {
        "id": "social-c1-27",
        "english": "Advocacy",
        "polish": "Poparcie / Rzecznictwo",
        "pronunciation": "/ˈæd.və.kə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She dedicated her life to child advocacy.",
        "examplePolish": "Poświęciła życie obronie praw dziecka."
      },
      {
        "id": "social-c1-28",
        "english": "Activism",
        "polish": "Aktywizm",
        "pronunciation": "/ˈæk.tɪ.vɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Climate activism is growing among teenagers.",
        "examplePolish": "Aktywizm klimatyczny rośnie wśród nastolatków."
      },
      {
        "id": "social-c1-29",
        "english": "Reform",
        "polish": "Reforma / Reformować",
        "pronunciation": "/rɪˈfɔːm/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "We need a reform of the healthcare system.",
        "examplePolish": "Potrzebujemy reformy systemu opieki zdrowotnej."
      },
      {
        "id": "social-c1-30",
        "english": "Policy",
        "polish": "Polityka (strategia)",
        "pronunciation": "/ˈpɒl.ə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The company has a strict privacy policy.",
        "examplePolish": "Firma ma ścisłą politykę prywatności."
      },
      {
        "id": "social-c1-31",
        "english": "Legislation",
        "polish": "Ustawodawstwo / legislacja",
        "pronunciation": "/ˌledʒ.ɪˈsleɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The parliament passed new safety legislation.",
        "examplePolish": "Parlament przyjął nowe ustawodawstwo dotyczące bezpieczeństwa."
      },
      {
        "id": "social-c1-32",
        "english": "Welfare",
        "polish": "Opieka społeczna / Dobrobyt",
        "pronunciation": "/ˈwel.feər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The state provides welfare benefits.",
        "examplePolish": "Państwo zapewnia świadczenia socjalne."
      },
      {
        "id": "social-c1-33",
        "english": "Healthcare",
        "polish": "Opieka zdrowotna",
        "pronunciation": "/ˈhelθ.keər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Free healthcare is a public service.",
        "examplePolish": "Bezpłatna opieka zdrowotna to usługa publiczna."
      },
      {
        "id": "social-c1-34",
        "english": "Housing",
        "polish": "Mieszkalnictwo / Warunki mieszkaniowe",
        "pronunciation": "/ˈhaʊ.zɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Social housing is needed for poor families.",
        "examplePolish": "Mieszkalnictwo socjalne jest potrzebne ubogim rodzinom."
      },
      {
        "id": "social-c1-35",
        "english": "Crime",
        "polish": "Przestępczość / Przestępstwo",
        "pronunciation": "/kraɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Crime rates have dropped in the city.",
        "examplePolish": "Wskaźniki przestępczości spadły w mieście."
      },
      {
        "id": "social-c1-36",
        "english": "Rehabilitation",
        "polish": "Rehabilitacja / Resocjalizacja",
        "pronunciation": "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Prisoners need rehabilitation programs.",
        "examplePolish": "Więźniowie potrzebują programów resocjalizacji."
      },
      {
        "id": "social-c1-37",
        "english": "Sustainability",
        "polish": "Zrównoważony rozwój (ekologiczny)",
        "pronunciation": "/səˌsteɪ.nəˈbɪl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Environmental sustainability is our duty.",
        "examplePolish": "Zrównoważenie środowiskowe to nasz obowiązek."
      },
      {
        "id": "social-c1-38",
        "english": "Cohesion",
        "polish": "Spójność",
        "pronunciation": "/kəʊˈhiː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Social cohesion is essential for peace.",
        "examplePolish": "Spójność społeczna jest niezbędna dla pokoju."
      },
      {
        "id": "social-c1-39",
        "english": "Solidarity",
        "polish": "Solidarność",
        "pronunciation": "/ˌsɒl.ɪˈdær.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We stand in solidarity with the workers.",
        "examplePolish": "Solidaryzujemy się z pracownikami."
      },
      {
        "id": "social-c1-41",
        "english": "Exclusion",
        "polish": "Wykluczenie",
        "pronunciation": "/ɪkˈskluː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Social exclusion leads to anger.",
        "examplePolish": "Wykluczenie społeczne prowadzi do gniewu."
      },
      {
        "id": "social-c1-42",
        "english": "Alienation",
        "polish": "Alienacja / Wyobcowanie",
        "pronunciation": "/ˌeɪ.li.əˈneɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Urban life can cause feelings of alienation.",
        "examplePolish": "Życie w mieście może powodować uczucie wyobcowania."
      },
      {
        "id": "social-c1-43",
        "english": "Stigmatization",
        "polish": "Stygmatyzacja",
        "pronunciation": "/ˌstɪɡ.mə.taɪˈzeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Fight the stigmatization of mental illness.",
        "examplePolish": "Walcz ze stygmatyzacją chorób psychicznych."
      },
      {
        "id": "social-c1-44",
        "english": "Inequity",
        "polish": "Niesprawiedliwość / Nierówne traktowanie",
        "pronunciation": "/ɪnˈek.wɪ.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Gender inequities still exist in careers.",
        "examplePolish": "Nierówności płci wciąż istnieją w karierach."
      },
      {
        "id": "social-c1-46",
        "english": "Injustice",
        "polish": "Niesprawiedliwość",
        "pronunciation": "/ɪnˈdʒʌs.tɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We cannot tolerate social injustice.",
        "examplePolish": "Nie możemy tolerować niesprawiedliwości społecznej."
      },
      {
        "id": "social-c1-47",
        "english": "Oppression",
        "polish": "Ucisk / Prześladowanie",
        "pronunciation": "/əˈpreʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The regime was based on political oppression.",
        "examplePolish": "Reżim opierał się na ucisku politycznym."
      },
      {
        "id": "social-c1-48",
        "english": "Exploitation",
        "polish": "Wyzysk / Eksploatacja",
        "pronunciation": "/ˌek.splɔɪˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Child labor is a form of exploitation.",
        "examplePolish": "Praca dzieci to forma wyzysku."
      },
      {
        "id": "social-c1-49",
        "english": "Activist",
        "polish": "Aktywista",
        "pronunciation": "/ˈæk.tɪ.vɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Human rights activists protested outside.",
        "examplePolish": "Aktywiści praw człowieka protestowali na zewnątrz."
      }
    ]
  },
  {
    "id": "nuance-c2",
    "title": "Mastering Nuance (C2)",
    "polishTitle": "Opanowanie niuansów",
    "category": "general",
    "level": "C2",
    "description": "Subtle distinctions, idioms, and advanced vocabulary to express delicate shades of meaning.",
    "icon": "Flame",
    "color": "#ec4899",
    "cards": [
      {
        "id": "nuance-c2-2",
        "english": "Ambiguity",
        "polish": "Dwuznaczność / niejasność",
        "pronunciation": "/ˌæm.bɪˈɡjuː.ə.t̬i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The contract was rewritten to eliminate any legal ambiguity.",
        "examplePolish": "Umowa została przepisana, aby wyeliminować wszelkie niejasności prawne."
      },
      {
        "id": "nuance-c2-3",
        "english": "Euphemism",
        "polish": "Eufemizm",
        "pronunciation": "/ˈjuː.fə.mɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pass away is a common euphemism for die.",
        "examplePolish": "Odejść to powszechny eufemizm słowa umrzeć."
      },
      {
        "id": "nuance-c2-4",
        "english": "To imply",
        "polish": "Sugerować / dawać do zrozumienia",
        "pronunciation": "/ɪmˈplaɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Although she didn't say it, she implied that the plan was flawed.",
        "examplePolish": "Choć tego nie powiedziała, dała do zrozumienia, że plan ma wady."
      },
      {
        "id": "nuance-c2-5",
        "english": "Connotation",
        "polish": "Konotacja / zabarwienie",
        "pronunciation": "/ˌkɑː.nəˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The word cheap has a negative connotation compared to inexpensive.",
        "examplePolish": "Słowo tani ma negatywną konotację w porównaniu do niedrogi."
      },
      {
        "id": "nuance-c2-6",
        "english": "Insinuation",
        "polish": "Insinuacja",
        "pronunciation": "/ɪnˌsɪn.juˈeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We rejected the wild insinuation that we broke the law.",
        "examplePolish": "Odrzuciliśmy szalone insynuacje, jakobyśmy złamali prawo."
      },
      {
        "id": "nuance-c2-7",
        "english": "Delicate",
        "polish": "Delikatny / drażliwy",
        "pronunciation": "/ˈdel.ə.kət/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The peace talks are at a delicate stage right now.",
        "examplePolish": "Rozmowy pokojowe są obecnie na delikatnym etapie."
      },
      {
        "id": "nuance-c2-8",
        "english": "Implicit",
        "polish": "Ukryty / dorozumiany",
        "pronunciation": "/ɪmˈplɪs.ɪt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "There was an implicit agreement that no one would talk to the media.",
        "examplePolish": "Istniało dorozumiane porozumienie, że nikt nie będzie rozmawiał z mediami."
      },
      {
        "id": "nuance-c2-9",
        "english": "Nuanced",
        "polish": "Niuansowany / subtelny",
        "pronunciation": "/ˈnuː.ɑːnst/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "He gave a nuanced explanation of the complicated political situation.",
        "examplePolish": "Przedstawił pełne subtelności wyjaśnienie skomplikowanej sytuacji politycznej."
      },
      {
        "id": "nuance-c2-10",
        "english": "To discern",
        "polish": "Dostrzec / rozeznać",
        "pronunciation": "/dɪˈsɝːn/",
        "partOfSpeech": "verb",
        "exampleEnglish": "It is difficult to discern the truth in this conflict.",
        "examplePolish": "Trudno jest rozeznać prawdę w tym konflikcie."
      },
      {
        "id": "nuance-c2-11",
        "english": "Nuance",
        "polish": "Niuanse / Subtelność",
        "pronunciation": "/ˈnjuː.ɑːns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Understand the nuances of the language.",
        "examplePolish": "Zrozum niuanse tego języka."
      },
      {
        "id": "nuance-c2-12",
        "english": "Denotation",
        "polish": "Dosłowne znaczenie",
        "pronunciation": "/ˌdiː.nəʊˈteɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Denotation is the literal meaning of a word.",
        "examplePolish": "Denotacja to dosłowne znaczenie słowa."
      },
      {
        "id": "nuance-c2-14",
        "english": "Inference",
        "polish": "Wniosek / Inferencja",
        "pronunciation": "/ˈɪn.fər.əns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "What inference can we draw from this?",
        "examplePolish": "Jaki wniosek możemy z tego wyciągnąć?"
      },
      {
        "id": "nuance-c2-15",
        "english": "Irony",
        "polish": "Ironia",
        "pronunciation": "/ˈaɪ.rə.ni/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The irony was lost on him.",
        "examplePolish": "Ironia do niego nie dotarła."
      },
      {
        "id": "nuance-c2-16",
        "english": "Sarcasm",
        "polish": "Sarkazm",
        "pronunciation": "/ˈsɑː.kæz.əm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I detect a note of sarcasm in your voice.",
        "examplePolish": "Wykrywam nutę sarkazmu w twoim głosie."
      },
      {
        "id": "nuance-c2-17",
        "english": "Satire",
        "polish": "Satyra",
        "pronunciation": "/ˈsæt.aɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The play is a sharp political satire.",
        "examplePolish": "Sztuka to ostra satyra polityczna."
      },
      {
        "id": "nuance-c2-19",
        "english": "Oxymoron",
        "polish": "Oksymoron",
        "pronunciation": "/ˌɒk.sɪˈmɔː.rɒn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "'Deafening silence' is a classic oxymoron.",
        "examplePolish": "„Ogłuszająca cisza” to klasyczny oksymoron."
      },
      {
        "id": "nuance-c2-20",
        "english": "Metaphor",
        "polish": "Metafora",
        "pronunciation": "/ˈmet.ə.fɔːr/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The writer uses the stormy sea as a metaphor for human passion.",
        "examplePolish": "Pisarz używa wzburzonego morza jako metafory ludzkich namiętności."
      },
      {
        "id": "nuance-c2-21",
        "english": "Simile",
        "polish": "Porównanie (stylistyczne)",
        "pronunciation": "/ˈsɪm.ɪ.li/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He runs 'like the wind' is a simile.",
        "examplePolish": "Mówienie, że biega „jak wiatr”, to porównanie."
      },
      {
        "id": "nuance-c2-22",
        "english": "Analogy",
        "polish": "Analogia",
        "pronunciation": "/əˈnæl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She drew an analogy between the brain and a PC.",
        "examplePolish": "Wyciągnęła analogię między mózgiem a komputerem."
      },
      {
        "id": "nuance-c2-23",
        "english": "Allegory",
        "polish": "Alegoria",
        "pronunciation": "/ˈæl.ə.ɡər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The novel is a political allegory.",
        "examplePolish": "Powieść jest alegorią polityczną."
      },
      {
        "id": "nuance-c2-24",
        "english": "Symbolism",
        "polish": "Symbolizm",
        "pronunciation": "/ˈsɪm.bəl.ɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The yellow light in the book represents hope.",
        "examplePolish": "Żółte światło w książce symbolizuje nadzieję."
      },
      {
        "id": "nuance-c2-25",
        "english": "Imagery",
        "polish": "Obrazowanie / Metaforyka",
        "pronunciation": "/ˈɪm.ɪ.dʒər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The poet uses rich sensory imagery.",
        "examplePolish": "Poeta używa bogatego obrazowania zmysłowego."
      },
      {
        "id": "nuance-c2-26",
        "english": "Tone",
        "polish": "Ton / Wydźwięk",
        "pronunciation": "/təʊn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Her tone was formal and distant.",
        "examplePolish": "Jej ton był oficjalny i zdystansowany."
      },
      {
        "id": "nuance-c2-27",
        "english": "Mood",
        "polish": "Nastrój",
        "pronunciation": "/muːd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The rainy weather set a gloomy mood.",
        "examplePolish": "Deszczowa pogoda wprawiła w ponury nastrój."
      },
      {
        "id": "nuance-c2-28",
        "english": "Atmosphere",
        "polish": "Atmosfera",
        "pronunciation": "/ˈæt.məs.fɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The restaurant has a romantic atmosphere.",
        "examplePolish": "Restauracja ma romantyczną atmosferę."
      },
      {
        "id": "nuance-c2-29",
        "english": "Style",
        "polish": "Styl",
        "pronunciation": "/staɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His writing style is simple and direct.",
        "examplePolish": "Jego styl pisania jest prosty i bezpośredni."
      },
      {
        "id": "nuance-c2-30",
        "english": "Voice",
        "polish": "Głos / Styl autorski",
        "pronunciation": "/vɔɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The author has a unique literary voice.",
        "examplePolish": "Autor ma unikalny głos literacki."
      },
      {
        "id": "nuance-c2-33",
        "english": "Neutrality",
        "polish": "Neutralność",
        "pronunciation": "/njuːˈtræl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Switzerland is famous for its neutrality.",
        "examplePolish": "Szwajcaria jest znana ze swojej neutralności."
      },
      {
        "id": "nuance-c2-34",
        "english": "Objectivity",
        "polish": "Obiektywizm",
        "pronunciation": "/ˌɒb.dʒekˈtɪv.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Scientific research requires objectivity.",
        "examplePolish": "Badania naukowe wymagają obiektywizmu."
      },
      {
        "id": "nuance-c2-35",
        "english": "Subjectivity",
        "polish": "Subiektywizm",
        "pronunciation": "/ˌsʌb.dʒekˈtɪv.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Art evaluation involves subjectivity.",
        "examplePolish": "Ocena sztuki wiąże się z subiektywizmem."
      },
      {
        "id": "nuance-c2-38",
        "english": "Judgment",
        "polish": "Sąd / Ocena",
        "pronunciation": "/ˈdʒʌdʒ.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Do not rush to pass judgment.",
        "examplePolish": "Nie spiesz się z wydawaniem sądów."
      },
      {
        "id": "nuance-c2-39",
        "english": "Opinion",
        "polish": "Opinia",
        "pronunciation": "/əˈpɪn.jən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "In my opinion, this is the best option.",
        "examplePolish": "Moim zdaniem to najlepsza opcja."
      },
      {
        "id": "nuance-c2-40",
        "english": "Belief",
        "polish": "Wiara / Przekonanie",
        "pronunciation": "/bɪˈliːf/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He holds a strong belief in human goodness.",
        "examplePolish": "Ma silną wiarę w ludzką dobroć."
      },
      {
        "id": "nuance-c2-41",
        "english": "Fact",
        "polish": "Fakt",
        "pronunciation": "/fækt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It is an established scientific fact.",
        "examplePolish": "To jest ustalony fakt naukowy."
      },
      {
        "id": "nuance-c2-42",
        "english": "Truth",
        "polish": "Prawda",
        "pronunciation": "/truːθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The truth will come out eventually.",
        "examplePolish": "Prawda w końcu wyjdzie na jaw."
      },
      {
        "id": "nuance-c2-43",
        "english": "Reality",
        "polish": "Rzeczywistość",
        "pronunciation": "/riˈæl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We must face reality and make changes.",
        "examplePolish": "Musimy spojrzeć prawdzie w oczy i wprowadzić zmiany."
      },
      {
        "id": "nuance-c2-44",
        "english": "Illusion",
        "polish": "Iluzja / Złudzenie",
        "pronunciation": "/ɪˈluː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Optical illusions trick our brains.",
        "examplePolish": "Iluzje optyczne oszukują nasze mózgi."
      },
      {
        "id": "nuance-c2-45",
        "english": "Allusion",
        "polish": "Aluzja",
        "pronunciation": "/əˈluː.ʒən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The book contains many allusions to mythology.",
        "examplePolish": "Książka zawiera wiele aluzji do mitologii."
      },
      {
        "id": "nuance-c2-46",
        "english": "Understatement",
        "polish": "Niedopowiedzenie",
        "pronunciation": "/ˈʌn.dəˌsteɪt.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Saying it is cold in Siberia is an understatement.",
        "examplePolish": "Mówienie, że na Syberii jest zimno, to niedopowiedzenie."
      },
      {
        "id": "nuance-c2-47",
        "english": "Hyperbole",
        "polish": "Hiperbola / Przesada",
        "pronunciation": "/haɪˈpɜː.bəl.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She used hyperbole to express her anger.",
        "examplePolish": "Użyła hiperboli, by wyrazić swój gniew."
      },
      {
        "id": "nuance-c2-49",
        "english": "Subtlety",
        "polish": "Subtelność",
        "pronunciation": "/ˈsʌt.əl.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Appreciate the subtleties of classical music.",
        "examplePolish": "Doceń subtelności muzyki klasycznej."
      },
      {
        "id": "nuance-c2-50",
        "english": "Euphemistic",
        "polish": "Eufemistyczny",
        "pronunciation": "/ˌjuː.fəˈmɪs.tɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "He used a euphemistic phrase for fired.",
        "examplePolish": "Użył eufemistycznego zwrotu zamiast zwolniony.\n\n\n--- TALIA: Literature & Philosophy (C2) / Literatura i filozofia (C2) ---\nOpis: Sophisticated terminology for literary criticism, philosophical schools, and abstract reasoning."
      }
    ]
  },
  {
    "id": "literature-c2",
    "title": "Literature & Philosophy (C2)",
    "polishTitle": "Literatura i filozofia",
    "category": "culture",
    "level": "C2",
    "description": "Sophisticated terminology for literary criticism, philosophical schools, and abstract reasoning.",
    "icon": "BookOpen",
    "color": "#a855f7",
    "cards": [
      {
        "id": "literature-c2-1",
        "english": "Existential",
        "polish": "Egzystencjalny",
        "pronunciation": "/ˌeɡ.zɪˈsten.ʃəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The novel deals with existential isolation and the meaning of life.",
        "examplePolish": "Powieść traktuje o egzystencjalnej izolacji i sensie życia."
      },
      {
        "id": "literature-c2-2",
        "english": "Epistemology",
        "polish": "Epistemologia / teoria poznania",
        "pronunciation": "/ɪˌpɪs.təˈmɑː.lə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His research focuses on evolutionary epistemology.",
        "examplePolish": "Jego badania koncentrują się na epistemologii ewolucyjnej."
      },
      {
        "id": "literature-c2-4",
        "english": "To transcend",
        "polish": "Przekraczać / wykraczać poza",
        "pronunciation": "/trænˈsend/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Great works of art transcend their historical time period.",
        "examplePolish": "Wielkie dzieła sztuki wykraczają poza swój historyczny okres."
      },
      {
        "id": "literature-c2-5",
        "english": "Paradigm",
        "polish": "Paradygmat / wzorzec",
        "pronunciation": "/ˈpær.ə.daɪm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The discovery led to a paradigm shift in physics.",
        "examplePolish": "Odkrycie doprowadziło do zmiany paradygmatu w fizyce."
      },
      {
        "id": "literature-c2-6",
        "english": "Nihilism",
        "polish": "Nihilizm",
        "pronunciation": "/ˈnaɪ.ə.lɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Nihilism rejects moral values.",
        "examplePolish": "Nihilizm odrzuca wartości moralne."
      },
      {
        "id": "literature-c2-7",
        "english": "Aesthetics",
        "polish": "Estetyka",
        "pronunciation": "/esˈθet.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Aesthetics explores beauty and art.",
        "examplePolish": "Estetyka bada piękno i sztukę."
      },
      {
        "id": "literature-c2-8",
        "english": "To ponder",
        "polish": "Rozważać / rozmyślać",
        "pronunciation": "/ˈpɑːn.dɚ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "She sat by the window, pondering the mysteries of the universe.",
        "examplePolish": "Siedziała przy oknie, rozmyślając nad tajemnicami wszechświata."
      },
      {
        "id": "literature-c2-9",
        "english": "Dogma",
        "polish": "Dogmat / pewnik",
        "pronunciation": "/ˈdɔːɡ.mə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Critical thinkers question religious and political dogmas.",
        "examplePolish": "Krytyczni myśliciele kwestionują dogmaty religijne i polityczne."
      },
      {
        "id": "literature-c2-10",
        "english": "Altruism",
        "polish": "Altruizm",
        "pronunciation": "/ˈæl.tru.ɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Volunteering is an act of pure altruism.",
        "examplePolish": "Wolontariat to akt czystego altruizmu."
      },
      {
        "id": "literature-c2-12",
        "english": "Absurdism",
        "polish": "Absurdyzm",
        "pronunciation": "/əbˈzɜː.dɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Camus wrote about absurdism in his essays.",
        "examplePolish": "Camus pisał o absurdyzmie w swoich esejach."
      },
      {
        "id": "literature-c2-13",
        "english": "Phenomenology",
        "polish": "Fenomenologia",
        "pronunciation": "/fɪˌnɒm.ɪˈnɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Phenomenology explores conscious experience.",
        "examplePolish": "Fenomenologia bada świadome doświadczenie."
      },
      {
        "id": "literature-c2-14",
        "english": "Hermeneutics",
        "polish": "Hermeneutyka",
        "pronunciation": "/ˌhɜː.məˈnjuː.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Hermeneutics is the science of text interpretation.",
        "examplePolish": "Hermeneutyka to nauka o interpretacji tekstów."
      },
      {
        "id": "literature-c2-15",
        "english": "Metaphysics",
        "polish": "Metafizyka",
        "pronunciation": "/ˌmet.əˈfɪz.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is lecturing on classical metaphysics.",
        "examplePolish": "Ona wykłada metafizykę klasyczną."
      },
      {
        "id": "literature-c2-16",
        "english": "Ontology",
        "polish": "Ontologia",
        "pronunciation": "/ɒnˈtɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Ontology is the branch of philosophy about being.",
        "examplePolish": "Ontologia to dział filozofii zajmujący się bytem."
      },
      {
        "id": "literature-c2-19",
        "english": "Logic",
        "polish": "Logika",
        "pronunciation": "/ˈlɒdʒ.ɪk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Mathematical logic is crucial for programming.",
        "examplePolish": "Logika matematyczna jest kluczowa dla programowania."
      },
      {
        "id": "literature-c2-20",
        "english": "Reason",
        "polish": "Rozsądek / Rozum",
        "pronunciation": "/ˈriː.zən/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Use your reason to make the decision.",
        "examplePolish": "Użyj rozumu, aby podjąć decyzję."
      },
      {
        "id": "literature-c2-21",
        "english": "Rationalism",
        "polish": "Racjonalizm",
        "pronunciation": "/ˈræʃ.ən.əl.ɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Descartes is a key figure in rationalism.",
        "examplePolish": "Kartezjusz to kluczowa postać racjonalizmu."
      },
      {
        "id": "literature-c2-22",
        "english": "Empiricism",
        "polish": "Empiryzm",
        "pronunciation": "/ɪmˈpɪr.ɪ.sɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Empiricism values sensory experience.",
        "examplePolish": "Empiryzm ceni doświadczenie zmysłowe."
      },
      {
        "id": "literature-c2-23",
        "english": "Idealism",
        "polish": "Idealizm",
        "pronunciation": "/aɪˈdɪə.lɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Philosophical idealism prioritizes the mind.",
        "examplePolish": "Idealizm filozoficzny stawia umysł na pierwszym miejscu."
      },
      {
        "id": "literature-c2-24",
        "english": "Materialism",
        "polish": "Materializm",
        "pronunciation": "/məˈtɪə.ri.ə.lɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Materialism asserts only matter exists.",
        "examplePolish": "Materializm twierdzi, że istnieje tylko materia."
      },
      {
        "id": "literature-c2-25",
        "english": "Pragmatism",
        "polish": "Pragmatyzm",
        "pronunciation": "/ˈpræɡ.mə.tɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pragmatism evaluates theories by their practice.",
        "examplePolish": "Pragmatyzm ocenia teorie na podstawie ich praktyki."
      },
      {
        "id": "literature-c2-26",
        "english": "Utilitarianism",
        "polish": "Utylitaryzm",
        "pronunciation": "/ˌjuː.tɪ.lɪˈteə.ri.ə.nɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Utilitarianism aims for the greatest happiness.",
        "examplePolish": "Utylitaryzm dąży do jak największego szczęścia."
      },
      {
        "id": "literature-c2-27",
        "english": "Deontology",
        "polish": "Deontologia (etyka obowiązku)",
        "pronunciation": "/ˌdiː.ɒnˈtɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Kant's ethics is a form of deontology.",
        "examplePolish": "Etyka Kanta to forma deontologii."
      },
      {
        "id": "literature-c2-28",
        "english": "Virtue ethics",
        "polish": "Etyka cnót",
        "pronunciation": "/ˈvɜː.tʃuː ˈeθ.ɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Aristotle developed virtue ethics.",
        "examplePolish": "Arystoteles stworzył etykę cnót."
      },
      {
        "id": "literature-c2-29",
        "english": "Social contract",
        "polish": "Umowa społeczna",
        "pronunciation": "/ˈsəʊ.ʃəl ˈkɒn.trækt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Rousseau wrote about the social contract.",
        "examplePolish": "Rousseau pisał o umowie społecznej."
      },
      {
        "id": "literature-c2-30",
        "english": "Sovereignty",
        "polish": "Suwerenność",
        "pronunciation": "/ˈsɒv.rɪn.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The treaty respects national sovereignty.",
        "examplePolish": "Traktat respektuje suwerenność narodową."
      },
      {
        "id": "literature-c2-31",
        "english": "Power",
        "polish": "Władza / Moc / Siła",
        "pronunciation": "/paʊər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The division of power is key in democracy.",
        "examplePolish": "Podział władzy jest kluczowy w demokracji."
      },
      {
        "id": "literature-c2-32",
        "english": "Authority",
        "polish": "Autorytet / Władza",
        "pronunciation": "/ɔːˈθɒr.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Do you respect political authority?",
        "examplePolish": "Czy szanujesz władzę polityczną?"
      },
      {
        "id": "literature-c2-33",
        "english": "Legimacy",
        "polish": "Legitymizacja / Prawowitość",
        "pronunciation": "/lɪˈdʒɪt.ə.mə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The government lost its legitimacy.",
        "examplePolish": "Rząd stracił swoją legitymizację."
      },
      {
        "id": "literature-c2-34",
        "english": "Freedom",
        "polish": "Wolność",
        "pronunciation": "/ˈfriː.dəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Freedom of expression is vital.",
        "examplePolish": "Wolność słowa jest kluczowa."
      },
      {
        "id": "literature-c2-35",
        "english": "Liberty",
        "polish": "Swoboda / Wolność obywatelska",
        "pronunciation": "/ˈlɪb.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Statue of Liberty stands in New York.",
        "examplePolish": "Statuła Wolności stoi w Nowym Jorku."
      },
      {
        "id": "literature-c2-38",
        "english": "Rights",
        "polish": "Prawa (uprawnienia)",
        "pronunciation": "/raɪts/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Know your legal rights.",
        "examplePolish": "Znaj swoje prawa."
      },
      {
        "id": "literature-c2-39",
        "english": "Duty",
        "polish": "Obowiązek",
        "pronunciation": "/ˈdʒuː.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "It is your civic duty to vote.",
        "examplePolish": "Głosowanie to twój obywatelski obowiązek."
      },
      {
        "id": "literature-c2-40",
        "english": "Obligation",
        "polish": "Zobowiązanie / Obowiązek",
        "pronunciation": "/ˌɒb.lɪˈɡeɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We have a moral obligation to help.",
        "examplePolish": "Mamy moralny obowiązek pomagać."
      },
      {
        "id": "literature-c2-41",
        "english": "Responsibility",
        "polish": "Odpowiedzialność",
        "pronunciation": "/rɪˌspɒn.sɪˈbɪl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Take responsibility for your actions.",
        "examplePolish": "Weź odpowiedzialność za swoje czyny."
      },
      {
        "id": "literature-c2-42",
        "english": "Choice",
        "polish": "Wybór",
        "pronunciation": "/tʃɔɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "You always have a choice.",
        "examplePolish": "Zawsze masz wybór."
      },
      {
        "id": "literature-c2-43",
        "english": "Will",
        "polish": "Wola",
        "pronunciation": "/wɪl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He had a strong will to survive.",
        "examplePolish": "Miał silną wolę przetrwania."
      },
      {
        "id": "literature-c2-44",
        "english": "Agency",
        "polish": "Sprawczość / Agencja",
        "pronunciation": "/ˈeɪ.dʒən.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Human agency is the power to act.",
        "examplePolish": "Ludzka sprawczość to zdolność do działania."
      },
      {
        "id": "literature-c2-45",
        "english": "Subject",
        "polish": "Podmiot / Temat",
        "pronunciation": "/ˈsʌb.dʒekt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The subject of the experiment was code quality.",
        "examplePolish": "Podmiotem eksperymentu była jakość kodu."
      },
      {
        "id": "literature-c2-46",
        "english": "Object",
        "polish": "Przedmiot / Obiekt",
        "pronunciation": "/ˈɒb.dʒɪkt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The object is made of wood.",
        "examplePolish": "Przedmiot jest wykonany z drewna."
      },
      {
        "id": "literature-c2-47",
        "english": "Consciousness",
        "polish": "Świadomość",
        "pronunciation": "/ˈkɒn.ʃəs.nəs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Lose consciousness after the blow.",
        "examplePolish": "Stracić przytomność (świadomość) po uderzeniu."
      },
      {
        "id": "literature-c2-48",
        "english": "Mind",
        "polish": "Umysł",
        "pronunciation": "/maɪnd/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Keep your mind open to new ideas.",
        "examplePolish": "Trzymaj swój umysł otwarty na nowe pomysły."
      },
      {
        "id": "literature-c2-49",
        "english": "Metaphysical",
        "polish": "Metafizyczny",
        "pronunciation": "/ˌmet.əˈfɪz.ɪ.kəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Love is a metaphysical concept.",
        "examplePolish": "Miłość to metafizyczne pojęcie."
      },
      {
        "id": "literature-c2-50",
        "english": "Epistemological",
        "polish": "Epistemologiczny",
        "pronunciation": "/ɪˌpɪs.tə.məˈlɒdʒ.ɪ.kəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Explain the epistemological basis.",
        "examplePolish": "Wyjaśnij podstawy epistemologiczne.\n\n\n--- TALIA: Business Idioms (B2) / Idiomy w biznesie (B2) ---\nOpis: Idiomy i wyrażenia przydatne w pracy, negocjacjach i biznesie."
      }
    ]
  },
  {
    "id": "idioms-business",
    "title": "Business Idioms (B2)",
    "polishTitle": "Idiomy w biznesie",
    "category": "idioms",
    "level": "B2",
    "description": "Idiomy i wyrażenia przydatne w pracy, negocjacjach i biznesie.",
    "icon": "Briefcase",
    "color": "#f59e0b",
    "cards": [
      {
        "id": "idioms-business-2",
        "english": "Get the ball rolling",
        "polish": "Zacząć działać",
        "pronunciation": "/ɡet ðə bɔːl ˈroʊ.lɪŋ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's get the ball rolling with the initial testing.",
        "examplePolish": "Zacznijmy działać od wstępnych testów."
      },
      {
        "id": "idioms-business-3",
        "english": "In the loop",
        "polish": "Być na bieżąco / być poinformowanym",
        "pronunciation": "/ɪn ðə luːp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Please keep me in the loop regarding any updates on the new project.",
        "examplePolish": "Proszę, trzymaj mnie na bieżąco w kwestii wszelkich aktualizacji dotyczących nowego projektu."
      },
      {
        "id": "idioms-business-9",
        "english": "By the book",
        "polish": "Zgodnie z przepisami / jak w podręczniku",
        "pronunciation": "/baɪ ðə bʊk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The auditor will check if we did everything by the book.",
        "examplePolish": "Audytor sprawdzi, czy zrobiliśmy wszystko zgodnie z przepisami."
      },
      {
        "id": "idioms-business-10",
        "english": "Ahead of the curve",
        "polish": "Przed szeregiem / innowacyjny",
        "pronunciation": "/əˈhed əv ðə kɜːrv/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Our R&D team works hard to keep our products ahead of the curve.",
        "examplePolish": "Nasz zespół badawczo-rozwojowy ciężko pracuje, aby nasze produkty były innowacyjne.\n\n\n--- TALIA: Phrasal Verbs with 'Get' (B2) / Czasowniki frazowe z 'Get' (B2) ---\nOpis: Kluczowe phrasal verbs z czasownikiem 'get' w codziennej komunikacji."
      }
    ]
  },
  {
    "id": "idioms-phrasals-essential",
    "title": "Phrasal Verbs with 'Get' (B2)",
    "polishTitle": "Czasowniki frazowe z 'Get'",
    "category": "idioms",
    "level": "B2",
    "description": "Kluczowe phrasal verbs z czasownikiem 'get' w codziennej komunikacji.",
    "icon": "GraduationCap",
    "color": "#ec4899",
    "cards": [
      {
        "id": "idioms-get-1",
        "english": "Get along with",
        "polish": "Mieć dobre stosunki / dogadywać się z kimś",
        "pronunciation": "/ɡet əˈlɔːŋ wɪð/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Do you get along with your new co-workers?",
        "examplePolish": "Czy dogadujesz się ze swoimi nowymi współpracownikami?"
      },
      {
        "id": "idioms-get-2",
        "english": "Get over",
        "polish": "Przeboleć / dojść do siebie po czymś",
        "pronunciation": "/ɡet ˈoʊ.vər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It took her months to get over the breakup.",
        "examplePolish": "Zajęło jej miesiące dojście do siebie po rozstaniu."
      },
      {
        "id": "idioms-get-3",
        "english": "Get by",
        "polish": "Radzić sobie finansowo / dawać sobie radę",
        "pronunciation": "/ɡet baɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "My English is not perfect, but I can get by.",
        "examplePolish": "Mój angielski nie jest idealny, ale potrafię sobie poradzić."
      },
      {
        "id": "idioms-get-4",
        "english": "Get away with",
        "polish": "Ujść na sucho / uniknąć kary",
        "pronunciation": "/ɡet əˈweɪ wɪð/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He thought he could get away with cheating on the exam.",
        "examplePolish": "Myślał, że ujdzie mu na sucho ściąganie na egzaminie."
      },
      {
        "id": "idioms-get-5",
        "english": "Get through to",
        "polish": "Dodzwonić się / dotrzeć do kogoś (przekonać go)",
        "pronunciation": "/ɡet θruː tuː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I tried to call him, but I couldn't get through.",
        "examplePolish": "Próbowałem do niego zadzwonić, ale nie mogłem się połączyć."
      },
      {
        "id": "idioms-get-6",
        "english": "Get down to",
        "polish": "Zabrać się do czegoś (np. do pracy)",
        "pronunciation": "/ɡet daʊn tuː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Enough talking, let's get down to business.",
        "examplePolish": "Dość gadania, zabierzmy się do interesów."
      },
      {
        "id": "idioms-get-7",
        "english": "Get across",
        "polish": "Przekazać / jasno wytłumaczyć",
        "pronunciation": "/ɡet əˈkrɔːs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The teacher struggled to get the concept across to the students.",
        "examplePolish": "Nauczyciel miał trudności z jasnym przekazaniem tego pojęcia uczniom."
      },
      {
        "id": "idioms-get-8",
        "english": "Get behind",
        "polish": "Mieć zaległości (np. z pracą, płatnościami)",
        "pronunciation": "/ɡet bɪˈhaɪnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If you miss classes, you will quickly get behind.",
        "examplePolish": "Jeśli opuścisz zajęcia, szybko narobisz sobie zaległości."
      },
      {
        "id": "idioms-get-9",
        "english": "Get rid of",
        "polish": "Pozbyć się czegoś/kogoś",
        "pronunciation": "/ɡet rɪd ɒv/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I need to get rid of these old newspapers.",
        "examplePolish": "Muszę pozbyć się tych starych gazet."
      },
      {
        "id": "idioms-get-10",
        "english": "Get wind of",
        "polish": "Dowiedzieć się o czymś pocztą pantoflową / zwietrzyć coś",
        "pronunciation": "/ɡet wɪnd ɒv/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The media got wind of the secret merger before the announcement.",
        "examplePolish": "Media dowiedziały się o tajnej fuzji przed oficjalnym ogłoszeniem.\n\n\n--- TALIA: Phrasal Verbs: Take & Put (B2) / Phrasal Verbs: Take i Put (B2) ---\nOpis: Kluczowe czasowniki frazowe z 'take' oraz 'put' wraz z przykładowymi zdaniami."
      }
    ]
  },
  {
    "id": "idioms-take-put",
    "title": "Phrasal Verbs: Take & Put (B2)",
    "polishTitle": "Phrasal Verbs: Take i Put",
    "category": "idioms",
    "level": "B2",
    "description": "Kluczowe czasowniki frazowe z 'take' oraz 'put' wraz z przykładowymi zdaniami.",
    "icon": "GraduationCap",
    "color": "#ec4899",
    "cards": [
      {
        "id": "idioms-take-1",
        "english": "Take on",
        "polish": "Podjąć się czegoś / zatrudnić kogoś",
        "pronunciation": "/teɪk ɒn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She decided to take on the new project despite her busy schedule.",
        "examplePolish": "Zdecydowała się podjąć nowego projektu pomimo napiętego grafiku."
      },
      {
        "id": "idioms-take-2",
        "english": "Take off",
        "polish": "Wystartować (o samolocie) / zacząć odnosić nagły sukces",
        "pronunciation": "/teɪk ɒf/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The plane took off on time despite the bad weather.",
        "examplePolish": "Samolot wystartował o czasie pomimo złej pogody."
      },
      {
        "id": "idioms-take-3",
        "english": "Take over",
        "polish": "Przejąć kontrolę / przejąć obowiązki",
        "pronunciation": "/teɪk ˈoʊ.vər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The deputy manager will take over while the director is away.",
        "examplePolish": "Zastępca kierownika przejmie obowiązki podczas nieobecności dyrektora."
      },
      {
        "id": "idioms-take-4",
        "english": "Take up",
        "polish": "Zacząć uprawiać (hobby) / zajmować (czas, miejsce)",
        "pronunciation": "/teɪk ʌp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I decided to take up swimming to improve my fitness.",
        "examplePolish": "Zdecydowałem się zacząć pływać, aby poprawić kondycję."
      },
      {
        "id": "idioms-put-1",
        "english": "Put off",
        "polish": "Odłożyć na później / zniechęcać",
        "pronunciation": "/pʊt ɒf/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Never put off until tomorrow what you can do today.",
        "examplePolish": "Nigdy nie odkładaj na jutro tego, co możesz zrobić dzisiaj."
      },
      {
        "id": "idioms-put-2",
        "english": "Put up with",
        "polish": "Znosić / tolerować kogoś lub coś",
        "pronunciation": "/pʊt ʌp wɪð/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I don't know how she puts up with his constant complaining.",
        "examplePolish": "Nie wiem, jak ona znosi jego ciągłe narzekanie."
      },
      {
        "id": "idioms-put-3",
        "english": "Put out",
        "polish": "Ugasić (ogień) / sprawić kłopot komuś",
        "pronunciation": "/pʊt aʊt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It took the firefighters three hours to put out the blaze.",
        "examplePolish": "Ugaszenie pożaru zajęło strażakom trzy godziny."
      },
      {
        "id": "idioms-put-4",
        "english": "Put through",
        "polish": "Połączyć telefonicznie / narazić na trudne doświadczenie",
        "pronunciation": "/pʊt θruː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Hold on a moment, please, I will put you through to the manager.",
        "examplePolish": "Proszę chwilę poczekać, połączę pana z kierownikiem."
      },
      {
        "id": "idioms-take-5",
        "english": "Take after",
        "polish": "Być podobnym do kogoś (z rodziny)",
        "pronunciation": "/teɪk ˈæf.tər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He really takes after his father in both looks and character.",
        "examplePolish": "On naprawdę wrodził się w swojego ojca, zarówno z wyglądu, jak i z charakteru."
      },
      {
        "id": "idioms-put-5",
        "english": "Put forward",
        "polish": "Proponować / przedstawiać (np. pomysł, kandydaturę)",
        "pronunciation": "/pʊt ˈfɔːr.wərd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The committee put forward several interesting proposals.",
        "examplePolish": "Komitet przedstawił kilka ciekawych propozycji.\n\n\n--- TALIA: Idioms of Emotion (C1) / Idiomy opisujące emocje (C1) ---\nOpis: Kolorowe wyrażenia idiomatyczne służące do opisywania skrajnych emocji, radości, złości i smutku."
      }
    ]
  },
  {
    "id": "idioms-emotion",
    "title": "Idioms of Emotion (C1)",
    "polishTitle": "Idiomy opisujące emocje",
    "category": "idioms",
    "level": "C1",
    "description": "Kolorowe wyrażenia idiomatyczne służące do opisywania skrajnych emocji, radości, złości i smutku.",
    "icon": "Smile",
    "color": "#f59e0b",
    "cards": [
      {
        "id": "idioms-em-1",
        "english": "Over the moon",
        "polish": "Wniebowzięty / niezwykle szczęśliwy",
        "pronunciation": "/ˈoʊ.vər ðə muːn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She was over the moon when she passed her driving test.",
        "examplePolish": "Była wniebowzięta, kiedy zdała egzamin na prawo jazdy."
      },
      {
        "id": "idioms-em-2",
        "english": "Down in the dumps",
        "polish": "Zdołowany / w kiepskim nastroju",
        "pronunciation": "/daʊn ɪn ðə dʌmps/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He has been a bit down in the dumps since he lost his job.",
        "examplePolish": "Jest trochę zdołowany odkąd stracił pracę."
      },
      {
        "id": "idioms-em-3",
        "english": "Fly off the handle",
        "polish": "Wpaść w szał / łatwo się wściec",
        "pronunciation": "/flaɪ ɒf ðə ˈhæn.dəl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He is normally calm, but he flew off the handle when he heard the news.",
        "examplePolish": "Zazwyczaj jest spokojny, ale wpadł w szał, kiedy usłyszał te wieści."
      },
      {
        "id": "idioms-em-4",
        "english": "On cloud nine",
        "polish": "W siódmym niebie",
        "pronunciation": "/ɑːn klaʊd naɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "After winning the gold medal, the athlete was on cloud nine.",
        "examplePolish": "Po zdobyciu złotego medalu lekkoatleta był w siódmym niebie."
      },
      {
        "id": "idioms-em-5",
        "english": "Make someone's blood boil",
        "polish": "Doprowadzać kogoś do szewskiej pasji / sprawiać, że krew w żyłach wrze",
        "pronunciation": "/meɪk ˈsʌm.wʌnz blʌd bɔɪl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The way they treat animals makes my blood boil.",
        "examplePolish": "Sposób, w jaki traktują zwierzęta, doprowadza mnie do szewskiej pasji."
      },
      {
        "id": "idioms-em-6",
        "english": "Grin and bear it",
        "polish": "Robić dobrą minę do złej gry / zacisnąć zęby",
        "pronunciation": "/ɡrɪn ænd ber ɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We don't like the new rules, but we just have to grin and bear it.",
        "examplePolish": "Nie podobają nam się nowe zasady, ale musimy po prostu robić dobrą minę do złej gry."
      },
      {
        "id": "idioms-em-7",
        "english": "On pins and needles",
        "polish": "Jak na szpilkach",
        "pronunciation": "/ɑːn pɪnz ænd ˈniː.dəlz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We were on pins and needles waiting for the exam results.",
        "examplePolish": "Czekaliśmy na wyniki egzaminów jak na szpilkach."
      },
      {
        "id": "idioms-em-8",
        "english": "Green with envy",
        "polish": "Zielony z zazdrości",
        "pronunciation": "/ɡriːn wɪð ˈen.vi/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She was green with envy when she saw my new car.",
        "examplePolish": "Była zielona z zazdrości, kiedy zobaczyła mój nowy samochód."
      },
      {
        "id": "idioms-em-9",
        "english": "Keep one's chin up",
        "polish": "Głowa do góry / trzymać fason",
        "pronunciation": "/kiːp wʌnz tʃɪn ʌp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Keep your chin up, things will get better soon.",
        "examplePolish": "Głowa do góry, wkrótce wszystko się ułoży."
      },
      {
        "id": "idioms-em-10",
        "english": "Drive someone up the wall",
        "polish": "Doprowadzać kogoś do szału / wkurzać",
        "pronunciation": "/draɪv ˈsʌm.wʌn ʌp ðə wɔːl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "That constant dripping noise is driving me up the wall.",
        "examplePolish": "Ten ciągły dźwięk kapiącej wody doprowadza mnie do szału.\n\n\n--- TALIA: Idioms with Body Parts (C1) / Idiomy z częściami ciała (C1) ---\nOpis: Najważniejsze idiomy angielskie zawierające części ciała (oczy, uszy, ręce, nogi)."
      }
    ]
  },
  {
    "id": "idioms-body",
    "title": "Idioms with Body Parts (C1)",
    "polishTitle": "Idiomy z częściami ciała",
    "category": "idioms",
    "level": "C1",
    "description": "Najważniejsze idiomy angielskie zawierające części ciała (oczy, uszy, ręce, nogi).",
    "icon": "Flame",
    "color": "#10b981",
    "cards": [
      {
        "id": "idioms-bd-3",
        "english": "Play it by ear",
        "polish": "Decydować na bieżąco / improwizować",
        "pronunciation": "/pleɪ ɪt baɪ ɪər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We don't have a plan, so let's just play it by ear.",
        "examplePolish": "Nie mamy planu, więc po prostu będziemy decydować na bieżąco."
      },
      {
        "id": "idioms-bd-6",
        "english": "Give someone the cold shoulder",
        "polish": "Traktować kogoś ozięble / ignorować",
        "pronunciation": "/ɡɪv ˈsʌm.wʌn ðə koʊld ˈʃoʊl.dər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I don't know why she is giving me the cold shoulder today.",
        "examplePolish": "Nie wiem, dlaczego ona mnie dzisiaj ignoruje."
      },
      {
        "id": "idioms-bd-7",
        "english": "Let one's hair down",
        "polish": "Wyluzować się / pójść w tango",
        "pronunciation": "/let wʌnz her daʊn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "After a hard week of work, it is good to let your hair down.",
        "examplePolish": "Po ciężkim tygodniu pracy dobrze jest wyluzować się."
      },
      {
        "id": "idioms-bd-9",
        "english": "All ears",
        "polish": "Zamienić się w słuch",
        "pronunciation": "/ɔːl ɪərz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Tell me about your vacation, I am all ears.",
        "examplePolish": "Opowiedz mi o wakacjach, zamieniam się w słuch."
      },
      {
        "id": "idioms-bd-10",
        "english": "Get cold feet",
        "polish": "Stchórzyć / przestraszyć się w ostatniej chwili",
        "pronunciation": "/ɡet koʊld fiːt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He was going to ask her out, but got cold feet.",
        "examplePolish": "Miał zaprosić ją na randkę, ale stchórzył."
      }
    ]
  },
  {
    "id": "idioms-conversational",
    "title": "Slang & Colloquial English (C2)",
    "polishTitle": "Slang i zwroty potoczne",
    "category": "idioms",
    "level": "C2",
    "description": "Najbardziej zaawansowane wyrażenia idiomatyczne i potoczne stosowane przez native speakerów.",
    "icon": "Flame",
    "color": "#ec4899",
    "cards": [
      {
        "id": "idioms-sl-8",
        "english": "Bite the dust",
        "polish": "Gryźć ziemię / zepsuć się",
        "pronunciation": "/baɪt ðə dʌst/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "My old phone finally bit the dust yesterday.",
        "examplePolish": "Mój stary telefon wczoraj ostatecznie wyzionął ducha."
      }
    ]
  },
  {
    "id": "idioms-business-p1",
    "title": "Business Idioms - Part 1 (B2)",
    "polishTitle": "Idiomy w biznesie – Część 1",
    "category": "idioms",
    "level": "B2",
    "description": "Kluczowe idiomy i zwroty przydatne w pracy, negocjacjach i codziennej komunikacji biznesowej.",
    "icon": "Briefcase",
    "color": "#f59e0b",
    "cards": [
      {
        "id": "idioms-bus1-1",
        "english": "Go back to the drawing board",
        "polish": "Wrócić do punktu wyjścia / zacząć od nowa",
        "pronunciation": "/ɡoʊ bæk tuː ðə ˈdrɔː.ɪŋ bɔːrd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Our initial design failed the safety test, so we had to go back to the drawing board.",
        "examplePolish": "Nasz początkowy projekt nie przeszedł testu bezpieczeństwa, więc musieliśmy zacząć od nowa."
      },
      {
        "id": "idioms-bus1-2",
        "english": "Way off the mark",
        "polish": "Bardzo nietrafiony / bardzo błędny",
        "pronunciation": "/weɪ ɔːf ðə mɑːrk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Her sales forecast for the last quarter was way off the mark.",
        "examplePolish": "Jej prognoza sprzedaży na ostatni kwartał była bardzo nietrafiona."
      },
      {
        "id": "idioms-bus1-3",
        "english": "To Tweak",
        "polish": "Wprowadzić drobne poprawki",
        "pronunciation": "/twiːk/",
        "partOfSpeech": "verb",
        "exampleEnglish": "We just need to tweak the settings a bit to make the system run faster.",
        "examplePolish": "Musimy tylko trochę zmodyfikować ustawienia, aby system działał szybciej."
      },
      {
        "id": "idioms-bus1-5",
        "english": "A lot on your plate",
        "polish": "Mieć dużo na głowie / mieć wiele spraw do załatwienia",
        "pronunciation": "/ə lɑːt ɑːn jɔːr pleɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I won't assign you any more tasks since you already have a lot on your plate.",
        "examplePolish": "Nie przypiszę ci więcej zadań, skoro masz już dużo na głowie."
      },
      {
        "id": "idioms-bus1-7",
        "english": "Set the record straight",
        "polish": "Wyjaśnić nieporozumienie / przedstawić fakty",
        "pronunciation": "/set ðə ˈrek.ɚd streɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let me set the record straight: we did not lose any client data during the migration.",
        "examplePolish": "Pozwólcie, że wyjaśnię nieporozumienie: nie straciliśmy żadnych danych klientów podczas migracji."
      },
      {
        "id": "idioms-bus1-8",
        "english": "Put something on the back burner",
        "polish": "Odłożyć coś na później / nadać niski priorytet",
        "pronunciation": "/pʊt ˈsʌm.θɪŋ ɑːn ðə bæk ˈbɜːr.nər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We decided to put the website redesign on the back burner until next year.",
        "examplePolish": "Zdecydowaliśmy się odłożyć redesign strony na później, aż do przyszłego roku."
      },
      {
        "id": "idioms-bus1-9",
        "english": "Pull the plug",
        "polish": "Zakończyć projekt / wstrzymać działanie",
        "pronunciation": "/pʊl ðə plʌɡ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The board decided to pull the plug on the project due to a lack of funding.",
        "examplePolish": "Zarząd zdecydował o zakończeniu projektu z powodu braku funduszy."
      },
      {
        "id": "idioms-bus1-10",
        "english": "In a nutshell",
        "polish": "W skrócie / krótko mówiąc",
        "pronunciation": "/ɪn ə ˈnʌt.ʃel/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "To put it in a nutshell, the deal fell through because we couldn't agree on a price.",
        "examplePolish": "Mówiąc w skrócie, transakcja nie doszła do skutku, ponieważ nie mogliśmy uzgodnić ceny."
      },
      {
        "id": "idioms-bus1-11",
        "english": "Bring someone up to speed",
        "polish": "Wdrożyć kogoś / przekazać najnowsze informacje",
        "pronunciation": "/brɪŋ ˈsʌm.wʌn ʌp tuː spiːd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Take some time to bring the new team members up to speed on our workflow.",
        "examplePolish": "Poświęć trochę czasu, aby wdrożyć nowych członków zespołu w nasz przepływ pracy."
      },
      {
        "id": "idioms-bus1-12",
        "english": "Call the shots",
        "polish": "Podejmować kluczowe decyzje / rządzić",
        "pronunciation": "/kɔːl ðə ʃɑːts/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Since she is the director, she is the one calling the shots.",
        "examplePolish": "Skoro jest dyrektorem, to ona podejmuje kluczowe decyzje."
      }
    ]
  },
  {
    "id": "vocab-a1-family",
    "title": "Family & Home (A1)",
    "polishTitle": "Rodzina i Dom",
    "category": "everyday",
    "level": "A1",
    "description": "Basic vocabulary for members of the family and rooms in a house.",
    "icon": "Home",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-a1-f1",
        "english": "Mother",
        "polish": "Matka / mama",
        "pronunciation": "/ˈmʌð.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My mother is a doctor.",
        "examplePolish": "Moja mama jest lekarzem."
      },
      {
        "id": "v-a1-f2",
        "english": "Father",
        "polish": "Ojciec / tata",
        "pronunciation": "/ˈfɑː.ðər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His father works in a bank.",
        "examplePolish": "Jego tata pracuje w banku."
      },
      {
        "id": "v-a1-f3",
        "english": "Brother",
        "polish": "Brat",
        "pronunciation": "/ˈbrʌð.ər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have one older brother.",
        "examplePolish": "Mam jednego starszego brata."
      },
      {
        "id": "v-a1-f4",
        "english": "Sister",
        "polish": "Siostra",
        "pronunciation": "/ˈsɪs.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She is my younger sister.",
        "examplePolish": "Ona jest moją młodszą siostrą."
      },
      {
        "id": "v-a1-f7",
        "english": "Home",
        "polish": "Dom (miejsce zamieszkania)",
        "pronunciation": "/hoʊm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I am going home now.",
        "examplePolish": "Idę teraz do domu."
      },
      {
        "id": "v-a1-f8",
        "english": "Room",
        "polish": "Pokój",
        "pronunciation": "/ruːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My room has blue walls.",
        "examplePolish": "Mój pokój ma niebieskie ściany."
      },
      {
        "id": "v-a1-f10",
        "english": "Bedroom",
        "polish": "Sypialnia",
        "pronunciation": "/ˈbed.ruːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "There is a big bed in the bedroom.",
        "examplePolish": "W sypialni jest duże łóżko."
      },
      {
        "id": "v-a1-f11",
        "english": "Bathroom",
        "polish": "Łazienka",
        "pronunciation": "/ˈbæθ.ruːm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I need to clean the bathroom.",
        "examplePolish": "Muszę posprzątać łazienkę."
      },
      {
        "id": "v-a1-f12",
        "english": "Door",
        "polish": "Drzwi",
        "pronunciation": "/dɔːr/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Please close the door.",
        "examplePolish": "Proszę zamknąć drzwi."
      },
      {
        "id": "v-a1-f13",
        "english": "Window",
        "polish": "Okno",
        "pronunciation": "/ˈwɪn.doʊ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Open the window, it's hot.",
        "examplePolish": "Otwórz okno, jest gorąco."
      },
      {
        "id": "v-a1-f16",
        "english": "Bed",
        "polish": "Łóżko",
        "pronunciation": "/bed/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This bed is very comfortable.",
        "examplePolish": "To łóżko jest bardzo wygodne."
      },
      {
        "id": "v-a1-f17",
        "english": "Son",
        "polish": "Syn",
        "pronunciation": "/sʌn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is their only son.",
        "examplePolish": "On jest ich jedynym synem."
      },
      {
        "id": "v-a1-f18",
        "english": "Daughter",
        "polish": "Córka",
        "pronunciation": "/ˈdɔː.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My daughter is five years old.",
        "examplePolish": "Moja córka ma pięć lat."
      },
      {
        "id": "v-a1-f19",
        "english": "Parents",
        "polish": "Rodzice",
        "pronunciation": "/ˈper.ənts/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My parents live in Warsaw.",
        "examplePolish": "Moi rodzice mieszkają w Warszawie."
      },
      {
        "id": "v-a1-f20",
        "english": "Baby",
        "polish": "Niemowlę / dziecko",
        "pronunciation": "/ˈbeɪ.bi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The baby is sleeping.",
        "examplePolish": "Dziecko śpi.\n\n\n--- TALIA: Shopping & Colors (A1) / Zakupy i Kolory (A1) ---\nOpis: Essential beginner vocabulary for shopping and recognizing basic colors."
      }
    ]
  },
  {
    "id": "vocab-a1-shopping",
    "title": "Shopping & Colors (A1)",
    "polishTitle": "Zakupy i Kolory",
    "category": "everyday",
    "level": "A1",
    "description": "Essential beginner vocabulary for shopping and recognizing basic colors.",
    "icon": "ShoppingBag",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-a1-s1",
        "english": "Red",
        "polish": "Czerwony",
        "pronunciation": "/red/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I bought a red apple.",
        "examplePolish": "Kupiłem czerwone jabłko."
      },
      {
        "id": "v-a1-s2",
        "english": "Blue",
        "polish": "Niebieski",
        "pronunciation": "/bluː/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The sky is blue today.",
        "examplePolish": "Niebo jest dziś niebieskie."
      },
      {
        "id": "v-a1-s3",
        "english": "Green",
        "polish": "Zielony",
        "pronunciation": "/ɡriːn/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The grass is green in summer.",
        "examplePolish": "Trawa jest zielona latem."
      },
      {
        "id": "v-a1-s4",
        "english": "Yellow",
        "polish": "Żółty",
        "pronunciation": "/ˈjel.oʊ/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Bananas are yellow.",
        "examplePolish": "Banany są żółte."
      },
      {
        "id": "v-a1-s5",
        "english": "Black",
        "polish": "Czarny",
        "pronunciation": "/blæk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I wear black shoes.",
        "examplePolish": "Noszę czarne buty."
      },
      {
        "id": "v-a1-s6",
        "english": "White",
        "polish": "Biały",
        "pronunciation": "/waɪt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The milk is white.",
        "examplePolish": "Mleko jest białe."
      },
      {
        "id": "v-a1-s12",
        "english": "Cheap",
        "polish": "Tani",
        "pronunciation": "/tʃiːp/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "This book is very cheap.",
        "examplePolish": "Ta książka jest bardzo tania."
      },
      {
        "id": "v-a1-s13",
        "english": "Expensive",
        "polish": "Drogi",
        "pronunciation": "/ɪkˈspen.sɪv/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Gold is very expensive.",
        "examplePolish": "Złoto jest bardzo drogie."
      }
    ]
  },
  {
    "id": "vocab-a1-time",
    "title": "Numbers & Time (A1)",
    "polishTitle": "Liczby i Czas",
    "category": "everyday",
    "level": "A1",
    "description": "Essential vocabulary for telling time, days of the week, and simple numbers.",
    "icon": "Clock",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-a1-t6",
        "english": "Hour",
        "polish": "Godzina (trwanie)",
        "pronunciation": "/aʊər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The film lasts for one hour.",
        "examplePolish": "Film trwa jedną godzinę."
      },
      {
        "id": "v-a1-t7",
        "english": "Minute",
        "polish": "Minuta",
        "pronunciation": "/ˈmɪn.ɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Give me one minute, please.",
        "examplePolish": "Daj mi jedną minutę, proszę."
      },
      {
        "id": "v-a1-t8",
        "english": "Second",
        "polish": "Drugi",
        "pronunciation": "/ˈsek.ənd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This is my second cup of tea.",
        "examplePolish": "To moja druga filiżanka herbaty."
      },
      {
        "id": "v-a1-t12",
        "english": "Morning",
        "polish": "Poranek / rano",
        "pronunciation": "/ˈmɔːr.nɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Good morning! How did you sleep?",
        "examplePolish": "Dzień dobry! Jak spałeś?"
      },
      {
        "id": "v-a1-t13",
        "english": "Afternoon",
        "polish": "Popołudnie",
        "pronunciation": "/ˌæf.tərˈnuːn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I will call you in the afternoon.",
        "examplePolish": "Zadzwonię do ciebie po południu."
      },
      {
        "id": "v-a1-t14",
        "english": "Evening",
        "polish": "Wieczór",
        "pronunciation": "/ˈiːv.nɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We watch TV in the evening.",
        "examplePolish": "Wieczorem oglądamy telewizję."
      },
      {
        "id": "v-a1-t15",
        "english": "Night",
        "polish": "Noc",
        "pronunciation": "/naɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The stars shine bright at night.",
        "examplePolish": "Gwiazdy świecą jasno w nocy."
      },
      {
        "id": "v-a1-t16",
        "english": "Clock",
        "polish": "Zegar",
        "pronunciation": "/klɑːk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The clock is on the wall.",
        "examplePolish": "Zegar wisi na ścianie."
      },
      {
        "id": "v-a1-t17",
        "english": "Number",
        "polish": "Liczba / numer",
        "pronunciation": "/ˈnʌm.bər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Choose a number from one to ten.",
        "examplePolish": "Wybierz liczbę od jednego do dziesięciu."
      },
      {
        "id": "v-a1-t18",
        "english": "First",
        "polish": "Pierwszy",
        "pronunciation": "/fɜːrst/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "He won the first prize.",
        "examplePolish": "Zdobył pierwszą nagrodę."
      },
      {
        "id": "v-a1-t20",
        "english": "Third",
        "polish": "Trzeci",
        "pronunciation": "/θɜːrd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Our office is on the third floor.",
        "examplePolish": "Nasze biuro jest na trzecim piętrze.\n\n\n--- TALIA: Everyday Idioms (A1) / Codzienne Idiomy (A1) ---\nOpis: Super common daily idioms that even beginners will encounter."
      }
    ]
  },
  {
    "id": "idioms-a1-1",
    "title": "Everyday Idioms (A1)",
    "polishTitle": "Codzienne Idiomy",
    "category": "everyday",
    "level": "A1",
    "description": "Super common daily idioms that even beginners will encounter.",
    "icon": "Smile",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a1-4",
        "english": "So far, so good",
        "polish": "Jak na razie wszystko w porządku",
        "pronunciation": "/soʊ fɑːr soʊ ɡʊd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "How is the new job? So far, so good.",
        "examplePolish": "Jak nowa praca? Na razie wszystko w porządku."
      },
      {
        "id": "id-a1-6",
        "english": "Easy does it",
        "polish": "Ostrożnie / powoli",
        "pronunciation": "/ˈiː.zi dʌz ɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Easy does it! Don't drop that glass box.",
        "examplePolish": "Ostrożnie! Nie upuść tego szklanego pudła."
      },
      {
        "id": "id-a1-9",
        "english": "Beat around the bush",
        "polish": "Owijać w bawełnę",
        "pronunciation": "/biːt əˈraʊnd ðə bʊʃ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Stop beating around the bush and state your terms.",
        "examplePolish": "Przestań owijać w bawełnę i podaj swoje warunki."
      },
      {
        "id": "id-a1-10",
        "english": "No pain, no gain",
        "polish": "Bez pracy nie ma kołaczy",
        "pronunciation": "/noʊ peɪn noʊ ɡeɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Gym is hard, but no pain, no gain.",
        "examplePolish": "Siłownia jest ciężka, ale bez pracy nie ma kołaczy.\n\n\n--- TALIA: Starter Idioms (A1) / Zwroty na Start (A1) ---\nOpis: Essential expressions to jumpstart your daily English conversations."
      }
    ]
  },
  {
    "id": "idioms-a1-2",
    "title": "Starter Idioms (A1)",
    "polishTitle": "Zwroty na Start",
    "category": "everyday",
    "level": "A1",
    "description": "Essential expressions to jumpstart your daily English conversations.",
    "icon": "MessageCircle",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a1-11",
        "english": "Time flies",
        "polish": "Czas szybko leci",
        "pronunciation": "/taɪm flaɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Time flies when you are having fun.",
        "examplePolish": "Czas szybko leci, kiedy dobrze się bawisz."
      },
      {
        "id": "id-a1-12",
        "english": "Nice try",
        "polish": "Dobra próba / ładny usiłowanie",
        "pronunciation": "/naɪs traɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You didn't win, but nice try!",
        "examplePolish": "Nie wygrałeś, ale dobra próba!"
      },
      {
        "id": "id-a1-13",
        "english": "Cross your fingers",
        "polish": "Trzymać kciuki",
        "pronunciation": "/krɔːs jɔːr ˈfɪŋ.ɡərz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Cross your fingers that I pass the exam.",
        "examplePolish": "Trzymaj kciuki, abym zdał egzamin."
      },
      {
        "id": "id-a1-14",
        "english": "Better late than never",
        "polish": "Lepiej późno niż wcale",
        "pronunciation": "/ˈbet.ər leɪt ðæn ˈnev.ər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You arrived an hour late, but better late than never.",
        "examplePolish": "Przyjechałeś godzinę spóźniony, ale lepiej późno niż wcale."
      },
      {
        "id": "id-a1-15",
        "english": "Lose your touch",
        "polish": "Stracić wprawę",
        "pronunciation": "/luːz jɔːr tʌtʃ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I missed three shots; I am losing my touch.",
        "examplePolish": "Chybiłem trzy strzały; tracę wprawę."
      },
      {
        "id": "id-a1-16",
        "english": "Under your nose",
        "polish": "Pod samym nosem (bardzo blisko)",
        "pronunciation": "/ˈʌn.dər jɔːr noʊz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Your keys are right under your nose on the table.",
        "examplePolish": "Klucze są tuż pod Twoim nosem na stole."
      },
      {
        "id": "id-a1-17",
        "english": "You bet",
        "polish": "No jasne / masz to jak w banku",
        "pronunciation": "/juː bet/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Are you coming tonight? You bet!",
        "examplePolish": "Przyjdziesz dziś wieczorem? No jasne!"
      },
      {
        "id": "id-a1-18",
        "english": "Don't sweat it",
        "polish": "Nie przejmuj się tym / bez obaw",
        "pronunciation": "/doʊnt swet ɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I broke the pen. Don't sweat it, I have another one.",
        "examplePolish": "Złamałem długopis. Nie przejmuj się, mam kolejny."
      },
      {
        "id": "id-a1-19",
        "english": "Go with the flow",
        "polish": "Iść z prądem / płynąć z prądem",
        "pronunciation": "/ɡoʊ wɪð ðə floʊ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I don't have a plan, I will just go with the flow.",
        "examplePolish": "Nie mam planu, po prostu popłynę z prądem."
      },
      {
        "id": "id-a1-20",
        "english": "Draw the line",
        "polish": "Wyznaczyć nieprzekraczalną granicę",
        "pronunciation": "/drɔː ðə laɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I want to help, but I draw the line at lending money.",
        "examplePolish": "Chcę pomóc, ale wyznaczam granicę na pożyczaniu pieniędzy.\n\n\n--- TALIA: Simple Sayings (A1) / Proste Zwroty (A1) ---\nOpis: Short and sweet idioms useful in every social conversation."
      }
    ]
  },
  {
    "id": "idioms-a1-3",
    "title": "Simple Sayings (A1)",
    "polishTitle": "Proste Zwroty",
    "category": "everyday",
    "level": "A1",
    "description": "Short and sweet idioms useful in every social conversation.",
    "icon": "Award",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a1-22",
        "english": "Ring a bell",
        "polish": "Brzmieć znajomo",
        "pronunciation": "/rɪŋ ə bel/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Does the name John Smith ring a bell?",
        "examplePolish": "Czy nazwisko John Smith brzmi znajomo?"
      },
      {
        "id": "id-a1-23",
        "english": "Wear your heart on your sleeve",
        "polish": "Mieć serce na dłoni / łatwo okazywać uczucia",
        "pronunciation": "/wer jɔːr hɑːrt ɑːn jɔːr sliːv/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She wears her heart on her sleeve and cries easily.",
        "examplePolish": "Ona ma serce na dłoni i łatwo płacze."
      },
      {
        "id": "id-a1-24",
        "english": "Wouldn't hurt a fly",
        "polish": "Nie skrzywdziłby muchy",
        "pronunciation": "/ˈwʊd.ənt hɜːt ə flaɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Don't fear our dog; he wouldn't hurt a fly.",
        "examplePolish": "Nie bój się naszego psa; on nie skrzywdziłby muchy."
      },
      {
        "id": "id-a1-25",
        "english": "Safe and sound",
        "polish": "Cały i zdrowy",
        "pronunciation": "/seɪf ænd saʊnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The children returned from the trip safe and sound.",
        "examplePolish": "Dzieci wróciły z wycieczki całe i zdrowe."
      },
      {
        "id": "id-a1-27",
        "english": "In the same boat",
        "polish": "Jechać na tym samym wózku / w tej samej sytuacji",
        "pronunciation": "/ɪn ðə seɪm boʊt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We both lost our jobs, so we are in the same boat.",
        "examplePolish": "Oboje straciliśmy pracę, więc jedziemy na tym samym wózku."
      },
      {
        "id": "id-a1-28",
        "english": "Let the cat out of the bag",
        "polish": "Puścić parę z ust / wygadać tajemnicę",
        "pronunciation": "/let ðə kæt aʊt əv ðə bæɡ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It was a secret, but he let the cat out of the bag.",
        "examplePolish": "To był sekret, ale on puścił parę z ust."
      }
    ]
  },
  {
    "id": "idioms-a1-4",
    "title": "Easy Phrases (A1)",
    "polishTitle": "Łatwe Zwroty",
    "category": "everyday",
    "level": "A1",
    "description": "Idioms that are easy to remember and incorporate into conversation.",
    "icon": "Heart",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a1-34",
        "english": "Ring in the new year",
        "polish": "Powitać Nowy Rok",
        "pronunciation": "/rɪŋ ɪn ðə nuː jɪr/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We went to Times Square to ring in the new year.",
        "examplePolish": "Poszliśmy na Times Square, aby powitać nowy rok."
      },
      {
        "id": "id-a1-36",
        "english": "Through thick and thin",
        "polish": "Na dobre i na złe",
        "pronunciation": "/θruː θɪk ænd θɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Our partnership lasted through thick and thin.",
        "examplePolish": "Nasze partnerstwo przetrwało na dobre i na złe."
      },
      {
        "id": "id-a1-37",
        "english": "Step up your game",
        "polish": "Wziąć się w garść / zacząć lepiej grać",
        "pronunciation": "/step ʌp jɔːr ɡeɪm/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If you want to win, you need to step up your game.",
        "examplePolish": "Jeśli chcesz wygrać, musisz zacząć grać lepiej."
      },
      {
        "id": "id-a1-38",
        "english": "Make a long story short",
        "polish": "Krótko mówiąc",
        "pronunciation": "/meɪk ə lɔːŋ ˈstɔː.ri ʃɔːrt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "To make a long story short, they moved to London.",
        "examplePolish": "Krótko mówiąc, przeprowadzili się do Londynu."
      },
      {
        "id": "id-a1-39",
        "english": "Keep your chin up",
        "polish": "Głowa do góry (nie poddawaj się)",
        "pronunciation": "/kiːp jɔːr tʃɪn ʌp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Keep your chin up! Tomorrow is another day.",
        "examplePolish": "Głowa do góry! Jutro też jest dzień."
      },
      {
        "id": "id-a1-40",
        "english": "It's not rocket science",
        "polish": "To nie filozofia / żadna wielka sztuka",
        "pronunciation": "/ɪts nɑːt ˈrɑː.kɪt ˈsaɪ.əns/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Just click this button; it's not rocket science.",
        "examplePolish": "Po prostu kliknij ten przycisk; to nie filozofia.\n\n\n--- TALIA: Basic Expressions (A1) / Podstawowe Wyrażenia (A1) ---\nOpis: Essential beginner expressions to expand your figurative vocabulary."
      }
    ]
  },
  {
    "id": "idioms-a1-5",
    "title": "Basic Expressions (A1)",
    "polishTitle": "Podstawowe Wyrażenia",
    "category": "everyday",
    "level": "A1",
    "description": "Essential beginner expressions to expand your figurative vocabulary.",
    "icon": "ThumbsUp",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a1-41",
        "english": "Barking up the wrong tree",
        "polish": "Szukać w złym miejscu / błędny adres",
        "pronunciation": "/ˈbɑːr.kɪŋ ʌp ðə rɔːŋ triː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If you think I broke it, you are barking up the wrong tree.",
        "examplePolish": "Jeśli myślisz, że to ja to zepsułem, szukasz pod złym adresem.\n\n\n--- TALIA: Mastering Idioms 2 (C2) / Zaawansowane Idiomy 2 (C2) ---\nOpis: More complex native idioms to showcase absolute fluency in English."
      },
      {
        "id": "id-a1-42",
        "english": "Bite off more than you can chew",
        "polish": "Porywać się z motyką na słońce",
        "pronunciation": "/baɪt ɔːf mɔːr ðæn juː kæn tʃuː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Starting three businesses at once is biting off more than you can chew.",
        "examplePolish": "Zakładanie trzech firm na raz to porywanie się z motyką na słońce."
      },
      {
        "id": "id-a1-43",
        "english": "Burn bridges",
        "polish": "Palić za sobą mosty",
        "pronunciation": "/bɜːrn ˈbrɪdʒ.ɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Leaving the team in anger is a way to burn bridges.",
        "examplePolish": "Odejście z zespołu w złości to sposób na spalenie za sobą mostów."
      },
      {
        "id": "id-a1-44",
        "english": "Catch someone's eye",
        "polish": "Wpaść komuś w oko / przykuć uwagę",
        "pronunciation": "/kætʃ ˈsʌm.wʌnz aɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "That beautiful picture on the wall caught my eye.",
        "examplePolish": "Ten piękny obraz na ścianie wpadł mi w oko."
      },
      {
        "id": "id-a1-45",
        "english": "Cut some slack",
        "polish": "Przymknąć na kogoś oko / dać komuś luzu",
        "pronunciation": "/kʌt sʌm slæk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It was his first day at work, so cut him some slack.",
        "examplePolish": "To był jego pierwszy dzień w pracy, więc przymknij na niego oko."
      },
      {
        "id": "id-a1-46",
        "english": "Get out of hand",
        "polish": "Wymknąć się spod kontroli",
        "pronunciation": "/ɡet aʊt əv hænd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The children's party got a bit out of hand.",
        "examplePolish": "Przyjęcie dla dzieci trochę wymknęło się spod kontroli."
      }
    ]
  },
  {
    "id": "vocab-a2-jobs",
    "title": "Jobs & Occupations (A2)",
    "polishTitle": "Zawody i Praca",
    "category": "everyday",
    "level": "A2",
    "description": "Useful vocabulary representing various career paths and working fields.",
    "icon": "Briefcase",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-a2-j1",
        "english": "Teacher",
        "polish": "Nauczyciel",
        "pronunciation": "/ˈtiː.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My teacher explains everything very well.",
        "examplePolish": "Mój nauczyciel wyjaśnia wszystko bardzo dobrze."
      },
      {
        "id": "v-a2-j2",
        "english": "Doctor",
        "polish": "Lekarz",
        "pronunciation": "/ˈdɒk.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The doctor gave me a prescription.",
        "examplePolish": "Lekarz dał mi receptę."
      },
      {
        "id": "v-a2-j3",
        "english": "Nurse",
        "polish": "Pielęgniarka",
        "pronunciation": "/nɜːs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The nurse checked my body temperature.",
        "examplePolish": "Pielęgniarka sprawdziła temperaturę mojego ciała."
      },
      {
        "id": "v-a2-j7",
        "english": "Engineer",
        "polish": "Inżynier",
        "pronunciation": "/ˌen.dʒɪˈnɪər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "An engineer designed this long bridge.",
        "examplePolish": "Ten długi most zaprojektował inżynier."
      },
      {
        "id": "v-a2-j9",
        "english": "Shop assistant",
        "polish": "Sprzedawca w sklepie",
        "pronunciation": "/ˈʃɒp əˌsɪs.tənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The shop assistant helped me find a jacket.",
        "examplePolish": "Sprzedawca pomógł mi znaleźć kurtkę."
      },
      {
        "id": "v-a2-j17",
        "english": "Job interview",
        "polish": "Rozmowa kwalifikacyjna",
        "pronunciation": "/dʒɒb ˈɪn.tə.vjuː/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She did well at her job interview.",
        "examplePolish": "Dobrze wypadła na rozmowie kwalifikacyjnej."
      },
      {
        "id": "v-a2-j18",
        "english": "Skills",
        "polish": "Umiejętności",
        "pronunciation": "/skɪlz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to learn new digital skills.",
        "examplePolish": "Musimy uczyć się nowych umiejętności cyfrowych."
      },
      {
        "id": "v-a2-j20",
        "english": "Retired",
        "polish": "Na emeryturze",
        "pronunciation": "/rɪˈtaɪəd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "My grandfather is retired.",
        "examplePolish": "Mój dziadek jest na emeryturze.\n\n\n--- TALIA: Health & Body (A2) / Zdrowie i Ciało (A2) ---\nOpis: Essential terms relating to human health, simple illnesses, and basic anatomy."
      }
    ]
  },
  {
    "id": "vocab-a2-health",
    "title": "Health & Body (A2)",
    "polishTitle": "Zdrowie i Ciało",
    "category": "everyday",
    "level": "A2",
    "description": "Essential terms relating to human health, simple illnesses, and basic anatomy.",
    "icon": "Heart",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-a2-h1",
        "english": "Body",
        "polish": "Ciało",
        "pronunciation": "/ˈbɒd.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Healthy food keeps your body strong.",
        "examplePolish": "Zdrowe jedzenie utrzymuje Twoje ciało w sile."
      },
      {
        "id": "v-a2-h2",
        "english": "Head",
        "polish": "Głowa",
        "pronunciation": "/hed/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Wear a hat to protect your head.",
        "examplePolish": "Noś czapkę, aby chronić głowę."
      },
      {
        "id": "v-a2-h3",
        "english": "Hand",
        "polish": "Dłoń / ręka",
        "pronunciation": "/hænd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Hold my hand to cross the street.",
        "examplePolish": "Trzymaj mnie za rękę, aby przejść przez ulicę."
      },
      {
        "id": "v-a2-h4",
        "english": "Foot",
        "polish": "Stopa",
        "pronunciation": "/fʊt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His left foot was injured.",
        "examplePolish": "Jego lewa stopa uległa kontuzji."
      },
      {
        "id": "v-a2-h5",
        "english": "Health",
        "polish": "Zdrowie",
        "pronunciation": "/helθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Health is more important than wealth.",
        "examplePolish": "Zdrowie jest ważniejsze niż bogactwo."
      },
      {
        "id": "v-a2-h6",
        "english": "Sick",
        "polish": "Chory",
        "pronunciation": "/sɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "I stayed in bed because I was sick.",
        "examplePolish": "Zostałem w łóżku, ponieważ byłem chory."
      },
      {
        "id": "v-a2-h7",
        "english": "Pain",
        "polish": "Ból",
        "pronunciation": "/peɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have a sharp pain in my back.",
        "examplePolish": "Mam ostry ból w plecach."
      },
      {
        "id": "v-a2-h8",
        "english": "Headache",
        "polish": "Ból głowy",
        "pronunciation": "/ˈhed.eɪk/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Aspiring helps to cure a headache.",
        "examplePolish": "Aspiryna pomaga wyleczyć ból głowy."
      },
      {
        "id": "v-a2-h10",
        "english": "Cough",
        "polish": "Kaszel",
        "pronunciation": "/kɒf/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "He had a bad cough all night.",
        "examplePolish": "Miał silny kaszel przez całą noc."
      },
      {
        "id": "v-a2-h11",
        "english": "Medicine",
        "polish": "Lek / lekarstwo",
        "pronunciation": "/ˈmed.ɪ.sən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "This medicine must be taken with water.",
        "examplePolish": "To lekarstwo należy popić wodą."
      },
      {
        "id": "v-a2-h12",
        "english": "Pharmacy",
        "polish": "Apteka",
        "pronunciation": "/ˈfɑː.mə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Is there a pharmacy nearby?",
        "examplePolish": "Czy w pobliżu jest apteka?"
      },
      {
        "id": "v-a2-h13",
        "english": "Hospital",
        "polish": "Szpital",
        "pronunciation": "/ˈhɒs.pɪ.təl/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He was taken to the city hospital.",
        "examplePolish": "Został zabrany do szpitala miejskiego."
      },
      {
        "id": "v-a2-h14",
        "english": "Fever",
        "polish": "Gorączka",
        "pronunciation": "/ˈfiː.vər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "A high fever is a sign of infection.",
        "examplePolish": "Wysoka gorączka to objaw infekcji."
      },
      {
        "id": "v-a2-h15",
        "english": "Dentist",
        "polish": "Dentysta",
        "pronunciation": "/ˈden.tɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I have an appointment with the dentist.",
        "examplePolish": "Mam umówioną wizytę u dentysty."
      },
      {
        "id": "v-a2-h16",
        "english": "Stomach",
        "polish": "Żołądek",
        "pronunciation": "/ˈstʌm.ək/",
        "partOfSpeech": "noun",
        "exampleEnglish": "My stomach is empty.",
        "examplePolish": "Mój żołądek jest pusty."
      },
      {
        "id": "v-a2-h17",
        "english": "Blood",
        "polish": "Krew",
        "pronunciation": "/blʌd/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Blood carries oxygen throughout the body.",
        "examplePolish": "Krew przenosi tlen po całym ciele."
      },
      {
        "id": "v-a2-h18",
        "english": "Appointment",
        "polish": "Umówione spotkanie / wizyta",
        "pronunciation": "/əˈpɔɪnt.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I need to make a doctor's appointment.",
        "examplePolish": "Muszę umówić się na wizytę u lekarza."
      },
      {
        "id": "v-a2-h19",
        "english": "Healthy",
        "polish": "Zdrowy",
        "pronunciation": "/ˈhel.θi/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Vegetables are a healthy food choice.",
        "examplePolish": "Warzywa to zdrowy wybór żywieniowy."
      },
      {
        "id": "v-a2-h20",
        "english": "Exercise",
        "polish": "Ćwiczenia / ćwiczyć",
        "pronunciation": "/ˈek.sə.saɪz/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Daily exercise helps to stay fit.",
        "examplePolish": "Codzienne ćwiczenia pomagają zachować formę.\n\n\n--- TALIA: Everyday Idioms 1 (A2) / Codzienne Idiomy 1 (A2) ---\nOpis: Improve your figurative expression with these highly popular idioms."
      }
    ]
  },
  {
    "id": "idioms-a2-1",
    "title": "Everyday Idioms 1 (A2)",
    "polishTitle": "Codzienne Idiomy 1",
    "category": "everyday",
    "level": "A2",
    "description": "Improve your figurative expression with these highly popular idioms.",
    "icon": "MessageSquare",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a2-1",
        "english": "Hold your horses",
        "polish": "Chwileczkę / wstrzymaj konie (poczekaj)",
        "pronunciation": "/hoʊld jɔːr ˈhɔːr.sɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Hold your horses! We are not ready to go yet.",
        "examplePolish": "Wstrzymaj konie! Nie jesteśmy jeszcze gotowi, by iść."
      },
      {
        "id": "id-a2-2",
        "english": "Kill two birds with one stone",
        "polish": "Upiec dwie pieczenie na jednym ogniu",
        "pronunciation": "/kɪl tuː bɜːrdz wɪð wʌn stoʊn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I will drop you off on my way to work to kill two birds with one stone.",
        "examplePolish": "Podrzucę cię po drodze do pracy, aby upiec dwie pieczenie na jednym ogniu."
      },
      {
        "id": "id-a2-3",
        "english": "Piece of the pie",
        "polish": "Udział w zyskach / część tortu",
        "pronunciation": "/piːs əv ðə paɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If the business succeeds, everyone wants a piece of the pie.",
        "examplePolish": "Jeśli firma odniesie sukces, każdy będzie chciał część tortu."
      },
      {
        "id": "id-a2-4",
        "english": "Raining cats and dogs",
        "polish": "Lać jak z cebra",
        "pronunciation": "/ˈreɪ.nɪŋ kæts ænd dɑːɡz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Take an umbrella, it is raining cats and dogs outside.",
        "examplePolish": "Weź parasol, na zewnątrz leje jak z cebra."
      },
      {
        "id": "id-a2-7",
        "english": "Throw in the towel",
        "polish": "Poddać się / rzucić ręcznik",
        "pronunciation": "/θroʊ ɪn ðə ˈtaʊ.əl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The test was too hard, and he threw in the towel.",
        "examplePolish": "Test był zbyt trudny i poddał się."
      },
      {
        "id": "id-a2-8",
        "english": "Your guess is as good as mine",
        "polish": "Wiem tyle samo co ty (nie mam pojęcia)",
        "pronunciation": "/jɔːr ɡes ɪz æz ɡʊd æz maɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Where are my keys? Your guess is as good as mine.",
        "examplePolish": "Gdzie są moje klucze? Wiem tyle samo co ty."
      },
      {
        "id": "id-a2-10",
        "english": "Actions speak louder than words",
        "polish": "Czyny znaczą więcej niż słowa",
        "pronunciation": "/ˈæk.ʃənz spiːk ˈlaʊ.dər ðæn wɜːrdz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Don't promise to help; actions speak louder than words.",
        "examplePolish": "Nie obiecuj pomocy; czyny znaczą więcej niż słowa.\n\n\n--- TALIA: Everyday Idioms 2 (A2) / Codzienne Idiomy 2 (A2) ---\nOpis: More common idioms to keep your casual English lively and natural."
      }
    ]
  },
  {
    "id": "idioms-a2-2",
    "title": "Everyday Idioms 2 (A2)",
    "polishTitle": "Codzienne Idiomy 2",
    "category": "everyday",
    "level": "A2",
    "description": "More common idioms to keep your casual English lively and natural.",
    "icon": "MessageCircle",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a2-11",
        "english": "Add fuel to the fire",
        "polish": "Dolać oliwy do ognia",
        "pronunciation": "/æd fjuːəl tuː ðə faɪər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "His angry comment only added fuel to the fire.",
        "examplePolish": "Jego gniewny komentarz dolał tylko oliwy do ognia."
      },
      {
        "id": "id-a2-13",
        "english": "Between a rock and a hard place",
        "polish": "Między młotem a kowadłem",
        "pronunciation": "/bɪˈtwiːn ə rɑːk ænd ə hɑːrd pleɪs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Having to choose between those two is being between a rock and a hard place.",
        "examplePolish": "Konieczność wyboru między nimi to bycie między młotem a kowadłem."
      },
      {
        "id": "id-a2-16",
        "english": "Catch someone red-handed",
        "polish": "Złapać kogoś na gorącym uczynku",
        "pronunciation": "/kætʃ ˈsʌm.wʌn red ˈhæn.dɪd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The thief was caught red-handed taking the money.",
        "examplePolish": "Złodziej został złapany na gorącym uczynku podczas kradzieży pieniędzy."
      },
      {
        "id": "id-a2-17",
        "english": "Cry wolf",
        "polish": "Wszczynać fałszywy alarm / wołać na pomoc bez powodu",
        "pronunciation": "/kraɪ wʊlf/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If you cry wolf too often, nobody will help you when you really need it.",
        "examplePolish": "Jeśli będziesz zbyt często wszczynać fałszywy alarm, nikt ci nie pomoże, gdy naprawdę będziesz tego potrzebować."
      },
      {
        "id": "id-a2-18",
        "english": "Curiosity killed the cat",
        "polish": "Ciekawość to pierwszy stopień do piekła",
        "pronunciation": "/ˌkjʊr.iˈɒs.ə.ti kɪld ðə kæt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Don't open that locked drawer; curiosity killed the cat.",
        "examplePolish": "Nie otwieraj tej zamkniętej szuflady; ciekawość to pierwszy stopień do piekła."
      },
      {
        "id": "id-a2-20",
        "english": "Don't judge a book by its cover",
        "polish": "Nie oceniaj książki po okładce",
        "pronunciation": "/doʊnt dʒʌdʒ ə bʊk baɪ ɪts ˈkʌv.ər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He looks scary, but he is kind; don't judge a book by its cover.",
        "examplePolish": "Wygląda groźnie, ale jest miły; nie oceniaj książki po okładce.\n\n\n--- TALIA: Phrases in Action (A2) / Zwroty w Akcji (A2) ---\nOpis: Idiomatic expressions that show action and motion in daily situations."
      }
    ]
  },
  {
    "id": "idioms-a2-3",
    "title": "Phrases in Action (A2)",
    "polishTitle": "Zwroty w Akcji",
    "category": "everyday",
    "level": "A2",
    "description": "Idiomatic expressions that show action and motion in daily situations.",
    "icon": "Activity",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a2-21",
        "english": "Drop the subject",
        "polish": "Zmienić temat / odpuścić temat",
        "pronunciation": "/drɑːp ðə ˈsʌb.dʒekt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We started arguing, so I decided to drop the subject.",
        "examplePolish": "Zaczęliśmy się kłócić, więc postanowiłem odpuścić temat."
      },
      {
        "id": "id-a2-22",
        "english": "Far cry from",
        "polish": "Bardzo daleki od / zupełnie inny niż",
        "pronunciation": "/fɑːr kraɪ frʌm/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The tiny apartment was a far cry from the photos online.",
        "examplePolish": "To maleńkie mieszkanie było bardzo dalekie od zdjęć w internecie."
      },
      {
        "id": "id-a2-23",
        "english": "Feel like a million dollars",
        "polish": "Czuć się znakomicie / jak nowo narodzony",
        "pronunciation": "/fiːl laɪk ə ˈmɪl.jən ˈdɑː.lərz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I slept for nine hours and now I feel like a million dollars.",
        "examplePolish": "Spałem dziewięć godzin i teraz czuję się jak nowo narodzony."
      },
      {
        "id": "id-a2-24",
        "english": "Get your act together",
        "polish": "Wziąć się w garść / zorganizować się lepiej",
        "pronunciation": "/ɡet jɔːr ækt təˈɡeð.ər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You need to get your act together if you want to pass the exam.",
        "examplePolish": "Musisz wziąć się w garść, jeśli chcesz zdać ten egzamin."
      },
      {
        "id": "id-a2-25",
        "english": "Give someone the benefit of the doubt",
        "polish": "Dać komuś kredyt zaufania / uwierzyć komuś na słowo",
        "pronunciation": "/ɡɪv ˈsʌm.wʌn ðə ˈben.ə.fɪt əv ðə daʊt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He is late, but let's give him the benefit of the doubt.",
        "examplePolish": "Spóźnia się, ale dajmy mu kredyt zaufania."
      },
      {
        "id": "id-a2-26",
        "english": "Go cold turkey",
        "polish": "Nagle i całkowicie rzucić nałóg",
        "pronunciation": "/ɡoʊ koʊld ˈtɜː.ki/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He quit smoking by going cold turkey.",
        "examplePolish": "Rzucił palenie z dnia na dzień."
      },
      {
        "id": "id-a2-27",
        "english": "Hit the nail on the head",
        "polish": "Trafić w sedno",
        "pronunciation": "/hɪt ðə neɪl ɑːn ðə hed/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Her analysis of our financial problems hit the nail on the head.",
        "examplePolish": "Jej analiza naszych problemów finansowych trafiła w sedno."
      },
      {
        "id": "id-a2-28",
        "english": "Jump on the bandwagon",
        "polish": "Poddać się modzie / zacząć robić to co inni",
        "pronunciation": "/dʒʌmp ɑːn ðə ˈbændˌwæɡ.ən/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Many shops are jumping on the bandwagon of online delivery.",
        "examplePolish": "Wiele sklepów ulega modzie na dostawy online."
      },
      {
        "id": "id-a2-30",
        "english": "Last straw",
        "polish": "Kropla przelewająca czarę goryczy",
        "pronunciation": "/læst strɔː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He was late again, and that was the last straw.",
        "examplePolish": "Znowu się spóźnił i to była kropla przelewająca czarę goryczy.\n\n\n--- TALIA: Basic Figures of Speech (A2) / Proste Figury Retoryczne (A2) ---\nOpis: Idioms that express daily logic and social principles."
      }
    ]
  },
  {
    "id": "idioms-a2-4",
    "title": "Basic Figures of Speech (A2)",
    "polishTitle": "Proste Figury Retoryczne",
    "category": "everyday",
    "level": "A2",
    "description": "Idioms that express daily logic and social principles.",
    "icon": "Smile",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a2-31",
        "english": "Let bygones be bygones",
        "polish": "Puścić w niepamięć / co było, minęło",
        "pronunciation": "/let ˈbaɪ.ɡɔːnz biː ˈbaɪ.ɡɔːnz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's forget our argument and let bygones be bygones.",
        "examplePolish": "Zapomnijmy o naszej kłótni – co było, minęło."
      },
      {
        "id": "id-a2-32",
        "english": "Make ends meet",
        "polish": "Wiązać koniec z końcem",
        "pronunciation": "/meɪk endz miːt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "With prices rising, it's hard to make ends meet.",
        "examplePolish": "Przy rosnących cenach ciężko wiązać koniec z końcem."
      },
      {
        "id": "id-a2-33",
        "english": "On the fence",
        "polish": "Wahać się / stać na rozdrożu",
        "pronunciation": "/ɑːn ðə fens/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I am on the fence about accepting the promotion.",
        "examplePolish": "Waham się przed przyjęciem awansu.\n\n\n--- TALIA: Mastering Idioms 3 (C2) / Zaawansowane Idiomy 3 (C2) ---\nOpis: More elite expressions to complete your C2 vocabulary arsenal."
      },
      {
        "id": "id-a2-34",
        "english": "Play devil's advocate",
        "polish": "Adwokat diabła",
        "pronunciation": "/pleɪ ˈdev.əlz ˈæd.və.kət/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's play devil's advocate to examine the weak points.",
        "examplePolish": "Wcielmy się w rolę adwokata diabła, aby zbadać słabe punkty."
      },
      {
        "id": "id-a2-36",
        "english": "Put all eggs in one basket",
        "polish": "Postawić wszystko na jedną kartę",
        "pronunciation": "/pʊt ɔːl eɡz ɪn wʌn ˈbæs.kɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Invest in different companies; don't put all your eggs in one basket.",
        "examplePolish": "Inwestuj w różne firmy; nie stawiaj wszystkiego na jedną kartę."
      },
      {
        "id": "id-a2-37",
        "english": "Put yourself in someone's shoes",
        "polish": "Postawić się na czyimś miejscu",
        "pronunciation": "/pʊt jɔːrˈself ɪn ˈsʌm.wʌnz ʃuːz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Put yourself in his shoes before you criticize him.",
        "examplePolish": "Postaw się na jego miejscu, zanim go skrytykujesz."
      },
      {
        "id": "id-a2-38",
        "english": "Read between the lines",
        "polish": "Czytać między wierszami",
        "pronunciation": "/riːd bɪˈtwiːn ðə laɪnz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He said he was fine, but reading between the lines, he seemed sad.",
        "examplePolish": "Powiedział, że wszystko w porządku, ale czytając między wierszami, wydawał się smutny."
      },
      {
        "id": "id-a2-39",
        "english": "Speak your mind",
        "polish": "Mówić to co się myśli / szczerze wyrażać zdanie",
        "pronunciation": "/spiːk jɔːr maɪnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Don't be afraid to speak your mind at the meeting.",
        "examplePolish": "Nie bój się szczerze wyrazić swojego zdania na spotkaniu."
      },
      {
        "id": "id-a2-40",
        "english": "Take something with a grain of salt",
        "polish": "Brać coś z przymrużeniem oka / podchodzić z dystansem",
        "pronunciation": "/teɪk ˈsʌm.θɪŋ wɪð ə ɡreɪn əv sɔːlt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He exaggerates stories, so take what he says with a grain of salt.",
        "examplePolish": "On koloryzuje historie, więc bierz to, co mówi, z przymrużeniem oka.\n\n\n--- TALIA: Social Sayings (A2) / Zwroty Towarzyskie (A2) ---\nOpis: Common idioms related to social behavior and interactions."
      }
    ]
  },
  {
    "id": "idioms-a2-5",
    "title": "Social Sayings (A2)",
    "polishTitle": "Zwroty Towarzyskie",
    "category": "everyday",
    "level": "A2",
    "description": "Common idioms related to social behavior and interactions.",
    "icon": "Users",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-a2-41",
        "english": "The elephant in the room",
        "polish": "Temat tabu / oczywisty, ale ignorowany problem",
        "pronunciation": "/ði ˈel.ɪ.fənt ɪn ðə ruːm/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Nobody mentioned his debt; it was the elephant in the room.",
        "examplePolish": "Nikt nie wspomniał o jego długu; to był oczywisty, ale ignorowany problem."
      },
      {
        "id": "id-a2-42",
        "english": "Two heads are better than one",
        "polish": "Co dwie głowy, to nie jedna",
        "pronunciation": "/tuː hedz ɑːr ˈbet.ər ðæn wʌn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Let's solve this puzzle together; two heads are better than one.",
        "examplePolish": "Rozwiążmy tę łamigłówkę razem; co dwie głowy, to nie jedna."
      },
      {
        "id": "id-a2-43",
        "english": "Under lock and key",
        "polish": "Pod kluczem (bezpiecznie zamknięte)",
        "pronunciation": "/ˈʌn.dər lɑːk ænd kiː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The jewels are kept safe under lock and key.",
        "examplePolish": "Klejnoty są bezpiecznie przechowywane pod kluczem."
      },
      {
        "id": "id-a2-44",
        "english": "Up a creek without a paddle",
        "polish": "W tarapatach / w ciemnej nienazwanej dolinie",
        "pronunciation": "/ʌp ə kriːk wɪðˈaʊt ə ˈpæd.əl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If our car breaks down here, we are up a creek without a paddle.",
        "examplePolish": "Jeśli nasz samochód się tu zepsuje, będziemy w niezłych tarapatach."
      },
      {
        "id": "id-a2-45",
        "english": "Wet behind the ears",
        "polish": "Mieć jeszcze mleko pod nosem / niedoświadczony",
        "pronunciation": "/wet bɪˈhaɪnd ði ɪəz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The new programmer is young and still wet behind the ears.",
        "examplePolish": "Nowy programista jest młody i ma jeszcze mleko pod nosem."
      },
      {
        "id": "id-a2-46",
        "english": "Wild goose chase",
        "polish": "Szukanie wiatru w polu / skazana na niepowodzenie pogoni",
        "pronunciation": "/waɪld ɡuːs tʃeɪs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Looking for the receipt was a wild goose chase.",
        "examplePolish": "Szukanie tego paragonu było jak szukanie wiatru w polu."
      },
      {
        "id": "id-a2-47",
        "english": "Wolf in sheep's clothing",
        "polish": "Wilk w owczej skórze",
        "pronunciation": "/wʊlf ɪn ʃiːps ˈkloʊ.ðɪŋ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Be careful with him; he is a wolf in sheep's clothing.",
        "examplePolish": "Uważaj na niego; to wilk w owczej skórze."
      },
      {
        "id": "id-a2-48",
        "english": "You can't have your cake and eat it too",
        "polish": "Nie można mieć ciastka i zjeść ciastka",
        "pronunciation": "/juː kænt hæv jɔːr keɪk ænd iːt ɪt tuː/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You want to travel but save money; you can't have your cake and eat it too.",
        "examplePolish": "Chcesz podróżować, ale oszczędzać pieniądze – nie można mieć ciastka i zjeść ciastka."
      },
      {
        "id": "id-a2-49",
        "english": "Zero in on",
        "polish": "Skupić się na czymś / wziąć coś na celownik",
        "pronunciation": "/ˈzɪə.roʊ ɪn ɑːn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We need to zero in on the main source of the problem.",
        "examplePolish": "Musimy skupić się na głównym źródle problemu."
      },
      {
        "id": "id-a2-50",
        "english": "All in a day's work",
        "polish": "Chleb powszedni / nic nadzwyczajnego",
        "pronunciation": "/ɔːl ɪn ə deɪz wɜːrk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Solving computer bugs is all in a day's work for me.",
        "examplePolish": "Rozwiązywanie błędów komputerowych to dla mnie chleb powszedni.\n\n\n--- TALIA: Common Sayings (B1) / Popularne Powiedzenia (B1) ---\nOpis: Standard intermediate idioms frequently used in daily social environments."
      }
    ]
  },
  {
    "id": "idioms-b1-1",
    "title": "Common Sayings (B1)",
    "polishTitle": "Popularne Powiedzenia",
    "category": "everyday",
    "level": "B1",
    "description": "Standard intermediate idioms frequently used in daily social environments.",
    "icon": "Award",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b1-4",
        "english": "Don't put all your eggs in one basket",
        "polish": "Nie stawiaj wszystkiego na jedną kartę",
        "pronunciation": "/doʊnt pʊt ɔːl jɔːr eɡz ɪn wʌn ˈbæs.kɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Apply to different jobs; don't put all your eggs in one basket.",
        "examplePolish": "Aplikuj o różne posady; nie stawiaj wszystkiego na jedną kartę."
      },
      {
        "id": "id-b1-5",
        "english": "Every cloud has a silver lining",
        "polish": "Nie ma tego złego, co by na dobre nie wyszło",
        "pronunciation": "/ˈev.ri klaʊd hæz ə ˈsɪl.vər ˈlaɪ.nɪŋ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I got laid off but started a business; every cloud has a silver lining.",
        "examplePolish": "Zostałem zwolniony, ale założyłem firmę – nie ma tego złego, co by na dobre nie wyszło."
      },
      {
        "id": "id-b1-7",
        "english": "Hear it on the grapevine",
        "polish": "Dowiedzieć się pocztą pantoflową",
        "pronunciation": "/hɪr ɪt ɑːn ðə ˈɡreɪp.vaɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I heard it on the grapevine that they are getting married.",
        "examplePolish": "Dowiedziałem się pocztą pantoflową, że biorą ślub."
      },
      {
        "id": "id-b1-8",
        "english": "It takes two to tango",
        "polish": "Do tanga trzeba dwojga",
        "pronunciation": "/ɪt teɪks tuː tuː ˈtæŋ.ɡoʊ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "They are both to blame; it takes two to tango.",
        "examplePolish": "Oboje są winni – do tanga trzeba dwojga."
      },
      {
        "id": "id-b1-9",
        "english": "Keep something at bay",
        "polish": "Trzymać coś na dystans / powstrzymywać",
        "pronunciation": "/kiːp ˈsʌm.θɪŋ æt beɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Regular exercise helps to keep stress at bay.",
        "examplePolish": "Regularne ćwiczenia pomagają trzymać stres na dystans."
      },
      {
        "id": "id-b1-10",
        "english": "Method to madness",
        "polish": "Metoda w tym szaleństwie",
        "pronunciation": "/ˈmeθ.əd tuː ˈmæd.nəs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "His filing system looks messy, but there is a method to his madness.",
        "examplePolish": "Jego system segregacji wygląda na zabałaganiony, ale w tym szaleństwie jest metoda.\n\n\n--- TALIA: Idioms of Life (B1) / Idiomy Życiowe (B1) ---\nOpis: Idioms that reflect lifestyle choices, situations, and changes of attitude."
      }
    ]
  },
  {
    "id": "idioms-b1-2",
    "title": "Idioms of Life (B1)",
    "polishTitle": "Idiomy Życiowe",
    "category": "everyday",
    "level": "B1",
    "description": "Idioms that reflect lifestyle choices, situations, and changes of attitude.",
    "icon": "Heart",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b1-12",
        "english": "Picture paints a thousand words",
        "polish": "Jeden obraz jest wart więcej niż tysiąc słów",
        "pronunciation": "/ˈpɪk.tʃər peɪnts ə ˈθaʊ.zənd wɜːrdz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Show them the chart; a picture paints a thousand words.",
        "examplePolish": "Pokaż im wykres – jeden obraz jest wart więcej niż tysiąc słów."
      },
      {
        "id": "id-b1-13",
        "english": "Run like clockwork",
        "polish": "Chodzić jak w zegarku",
        "pronunciation": "/rʌn laɪk ˈklɒk.wɜːrk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The conference was organized so well that it ran like clockwork.",
        "examplePolish": "Konferencja była tak dobrze zorganizowana, że chodziła jak w zegarku."
      },
      {
        "id": "id-b1-14",
        "english": "Sit on the fence",
        "polish": "Wahać się / zwlekać z podjęciem decyzji",
        "pronunciation": "/sɪt ɑːn ðə fens/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Stop sitting on the fence and choose one side.",
        "examplePolish": "Przestań się wahać i wybierz jedną stronę."
      },
      {
        "id": "id-b1-15",
        "english": "Steal someone's thunder",
        "polish": "Skraść show / przypisać sobie cudze zasługi",
        "pronunciation": "/stiːl ˈsʌm.wʌnz ˈθʌn.dər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He announced his discovery first, stealing my thunder.",
        "examplePolish": "Ogłosił swoje odkrycie jako pierwszy, skradając mi całe show."
      },
      {
        "id": "id-b1-18",
        "english": "Wouldn't be caught dead",
        "polish": "Za nic w świecie",
        "pronunciation": "/ˈwʊd.ənt biː kɔːt ded/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I wouldn't be caught dead listening to that pop singer.",
        "examplePolish": "Za nic w świecie nie słuchałabym tego piosenkarza pop."
      },
      {
        "id": "id-b1-19",
        "english": "Burn the candle at both ends",
        "polish": "Pracować ponad siły (od rana do nocy)",
        "pronunciation": "/bɜːrn ðə ˈkæn.dəl æt boʊθ endz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Working two jobs is burning the candle at both ends.",
        "examplePolish": "Praca na dwa etaty to praca ponad siły od rana do nocy."
      },
      {
        "id": "id-b1-20",
        "english": "Change of heart",
        "polish": "Zmiana zdania / nastawienia",
        "pronunciation": "/tʃeɪndʒ əv hɑːrt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I was going to sell my house, but I had a change of heart.",
        "examplePolish": "Zamierzałem sprzedać mój dom, ale zmieniłem zdanie.\n\n\n--- TALIA: Expressions (B1) / Przydatne Wyrażenia (B1) ---\nOpis: Standard phrases to communicate complex ideas in a casual way."
      }
    ]
  },
  {
    "id": "idioms-b1-3",
    "title": "Expressions (B1)",
    "polishTitle": "Przydatne Wyrażenia",
    "category": "everyday",
    "level": "B1",
    "description": "Standard phrases to communicate complex ideas in a casual way.",
    "icon": "MessageCircle",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b1-21",
        "english": "Clean slate",
        "polish": "Czysta karta (zacząć od nowa)",
        "pronunciation": "/kliːn sleɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Moving to a new city allowed her to start with a clean slate.",
        "examplePolish": "Przeprowadzka do nowego miasta pozwoliła jej zacząć z czystą kartą."
      },
      {
        "id": "id-b1-22",
        "english": "Down to earth",
        "polish": "Twardo stąpający po ziemi / praktyczny",
        "pronunciation": "/daʊn tuː ɜːrθ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Despite his fame, the actor is very down to earth.",
        "examplePolish": "Mimo swojej sławy, ten aktor stąpa twardo po ziemi."
      },
      {
        "id": "id-b1-23",
        "english": "Fit as a fiddle",
        "polish": "Zdrów jak ryba",
        "pronunciation": "/fɪt æz ə ˈfɪd.əl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Grandfather walks 5 miles daily and is fit as a fiddle.",
        "examplePolish": "Dziadek spaceruje codziennie 5 mil i jest zdrów jak ryba."
      },
      {
        "id": "id-b1-24",
        "english": "Go the extra mile",
        "polish": "Dać z siebie więcej niż się wymaga / dołożyć starań",
        "pronunciation": "/ɡoʊ ði ˈek.strə maɪl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "To satisfy customers, we must always go the extra mile.",
        "examplePolish": "Aby zadowolić klientów, musimy zawsze dawać z siebie więcej."
      },
      {
        "id": "id-b1-25",
        "english": "Have a heart of gold",
        "polish": "Mieć złote serce",
        "pronunciation": "/hæv ə hɑːrt əv ɡoʊld/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She helps poor children; she has a heart of gold.",
        "examplePolish": "Ona pomaga ubogim dzieciom; ma złote serce."
      },
      {
        "id": "id-b1-26",
        "english": "In hot water",
        "polish": "Mieć kłopoty / narobić sobie biedy",
        "pronunciation": "/ɪn hɑːt ˈwɔː.tər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He got in hot water with the boss for being late again.",
        "examplePolish": "Wpadł w kłopoty u szefa, ponieważ znowu się spóźnił."
      },
      {
        "id": "id-b1-27",
        "english": "Keep fingers crossed",
        "polish": "Trzymać kciuki",
        "pronunciation": "/kiːp ˈfɪŋ.ɡərz krɔːst/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Keep your fingers crossed for my test result.",
        "examplePolish": "Trzymaj kciuki za wynik mojego testu."
      },
      {
        "id": "id-b1-28",
        "english": "Make a mountain out of a molehill",
        "polish": "Robić widły z igły",
        "pronunciation": "/meɪk ə ˈmaʊn.tɪn aʊt əv ə ˈmoʊl.hɪl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "It was a tiny mistake; don't make a mountain out of a molehill.",
        "examplePolish": "To był mały błąd; nie rób widły z igły."
      },
      {
        "id": "id-b1-29",
        "english": "Once in a lifetime",
        "polish": "Jedyna w życiu (szansa)",
        "pronunciation": "/wʌns ɪn ə ˈlaɪf.taɪm/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "This scholarship is a once in a lifetime opportunity.",
        "examplePolish": "To stypendium to jedyna w życiu szansa."
      },
      {
        "id": "id-b1-30",
        "english": "Out of the woods",
        "polish": "Mieć najgorsze za sobą / wyjść na prostą",
        "pronunciation": "/aʊt əv ðə wʊdz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The patient is improving, but she is not out of the woods yet.",
        "examplePolish": "Stan pacjentki się poprawia, ale nie ma jeszcze najgorszego za sobą.\n\n\n--- TALIA: Mind & Body Idioms (B1) / Idiomy o Umyśle i Ciele (B1) ---\nOpis: Intermediate idioms describing thoughts, emotions, and physical reactions."
      }
    ]
  },
  {
    "id": "idioms-b1-4",
    "title": "Mind & Body Idioms (B1)",
    "polishTitle": "Idiomy o Umyśle i Ciele",
    "category": "everyday",
    "level": "B1",
    "description": "Intermediate idioms describing thoughts, emotions, and physical reactions.",
    "icon": "UserCheck",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b1-31",
        "english": "Penny for your thoughts",
        "polish": "O czym tak myślisz? / zdradź swoje myśli",
        "pronunciation": "/ˈpen.i fɔːr jɔːr θɔːts/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "You look so quiet today. A penny for your thoughts?",
        "examplePolish": "Wyglądasz dziś na cichego. O czym tak myślisz?"
      },
      {
        "id": "id-b1-32",
        "english": "Save face",
        "polish": "Wyjść z twarzą (uniknąć upokorzenia)",
        "pronunciation": "/seɪv feɪs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He offered to resign to save face rather than get fired.",
        "examplePolish": "Zaproponował rezygnację, aby wyjść z twarzą, zamiast zostać wyrzuconym."
      },
      {
        "id": "id-b1-33",
        "english": "Skating on thin ice",
        "polish": "Stąpać po cienkim lodzie",
        "pronunciation": "/ˈskeɪ.tɪŋ ɑːn θɪn aɪs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "By skipping classes, he is skating on thin ice.",
        "examplePolish": "Opuszczając lekcje, stąpa po cienkim lodzie."
      },
      {
        "id": "id-b1-35",
        "english": "Storm in a teacup",
        "polish": "Burza w szklance wody",
        "pronunciation": "/stɔːrm ɪn ə ˈtiː.kʌp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Their argument was just a storm in a teacup.",
        "examplePolish": "Ich kłótnia była tylko burzą w szklance wody."
      },
      {
        "id": "id-b1-36",
        "english": "Take a back seat",
        "polish": "Odsunąć się na dalszy plan / oddać stery",
        "pronunciation": "/teɪk ə bæk siːt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I decided to take a back seat and let him lead the project.",
        "examplePolish": "Postanowiłem odsunąć się na dalszy plan i pozwolić mu poprowadzić projekt."
      },
      {
        "id": "id-b1-38",
        "english": "Up to speed",
        "polish": "Zorientowany na bieżąco / wdrożony",
        "pronunciation": "/ʌp tuː spiːd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Read this document to get up to speed with our progress.",
        "examplePolish": "Przeczytaj ten dokument, aby zorientować się na bieżąco w naszych postępach."
      },
      {
        "id": "id-b1-39",
        "english": "When pigs fly",
        "polish": "Święty nigdy / jak mi kaktus na dłoni urośnie",
        "pronunciation": "/wen pɪɡz flaɪ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He will clean his room when pigs fly.",
        "examplePolish": "On posprząta swój pokój, jak mi kaktus na dłoni urośnie."
      },
      {
        "id": "id-b1-40",
        "english": "Worst-case scenario",
        "polish": "W najgorszym wypadku / czarny scenariusz",
        "pronunciation": "/wɜːrst keɪs sɪˈnær.i.oʊ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "In the worst-case scenario, we will lose the deposit money.",
        "examplePolish": "W najgorszym wypadku stracimy pieniądze z kaucji.\n\n\n--- TALIA: Idioms of Action (B1) / Idiomy Działania (B1) ---\nOpis: Expressive idioms related to sports, decisions, and fast activities."
      }
    ]
  },
  {
    "id": "idioms-b1-5",
    "title": "Idioms of Action (B1)",
    "polishTitle": "Idiomy Działania",
    "category": "everyday",
    "level": "B1",
    "description": "Expressive idioms related to sports, decisions, and fast activities.",
    "icon": "Zap",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b1-41",
        "english": "Jump the gun",
        "polish": "Pospieszyć się przedwcześnie / wyjść przed szereg",
        "pronunciation": "/dʒʌmp ðə ɡʌn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Don't buy the tickets yet; you are jumping the gun.",
        "examplePolish": "Nie kupuj jeszcze biletów – za bardzo się pospieszyłeś."
      },
      {
        "id": "id-b1-42",
        "english": "Keep your head above water",
        "polish": "Utrzymywać się na powierzchni (finansowo)",
        "pronunciation": "/kiːp jɔːr hed əˈbʌv ˈwɔː.tər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "With so many bills, it's hard to keep my head above water.",
        "examplePolish": "Przy tylu rachunkach ciężko utrzymać się na powierzchni."
      },
      {
        "id": "id-b1-43",
        "english": "Leave no stone unturned",
        "polish": "Poruszyć niebo i ziemię / nie szczędzić starań",
        "pronunciation": "/liːv noʊ stoʊn ʌnˈtɜːnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The detectives will leave no stone unturned to find the truths.",
        "examplePolish": "Detektywi poruszą niebo i ziemię, aby odnaleźć prawdę."
      },
      {
        "id": "id-b1-46",
        "english": "Put a damper on",
        "polish": "Popsuć plany / ostudzić zapał",
        "pronunciation": "/put ə ˈdæm.pər ɑːn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The sudden rain put a damper on our picnic plans.",
        "examplePolish": "Nagły deszcz popsuł nasze plany piknikowe."
      },
      {
        "id": "id-b1-47",
        "english": "Rain check",
        "polish": "Przełożenie spotkania na inny termin",
        "pronunciation": "/reɪn tʃek/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I can't go tonight, but can I take a rain check?",
        "examplePolish": "Nie mogę pójść dzisiaj, ale czy możemy to przełożyć na inny termin?"
      },
      {
        "id": "id-b1-49",
        "english": "Stand your ground",
        "polish": "Nie dawać za wygraną / obstawać przy swoim",
        "pronunciation": "/stænd jɔːr ɡraʊnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Even though they disagreed, she stood her ground.",
        "examplePolish": "Mimo że się nie zgadzali, nie dała za wygraną."
      },
      {
        "id": "id-b1-50",
        "english": "Throw caution to the wind",
        "polish": "Rzucić ostrożność na wiatr / zaryzykować",
        "pronunciation": "/θroʊ ˈkɔː.ʃən tuː ðə wɪnd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He decided to throw caution to the wind and quit his secure job.",
        "examplePolish": "Zdecydował się zaryzykować i rzucić swoją bezpieczną posadę.\n\n\n--- TALIA: Media & Communication (B2) / Media i Komunikacja (B2) ---\nOpis: Vocabulary relating to news reporting, public relations, broadcasting, and social media trends."
      }
    ]
  },
  {
    "id": "vocab-b2-media",
    "title": "Media & Communication (B2)",
    "polishTitle": "Media i Komunikacja",
    "category": "everyday",
    "level": "B2",
    "description": "Vocabulary relating to news reporting, public relations, broadcasting, and social media trends.",
    "icon": "Tv",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-b2-m1",
        "english": "Broadcast",
        "polish": "Nadawać / program / audycja",
        "pronunciation": "/ˈbrɔːd.kɑːst/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "The interview was broadcast live around the world.",
        "examplePolish": "Wywiad był nadawany na żywo na całym świecie."
      },
      {
        "id": "v-b2-m2",
        "english": "Censor",
        "polish": "Cenzurować / cenzor",
        "pronunciation": "/ˈsen.sər/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "Certain parts of the movie were censored.",
        "examplePolish": "Niektóre części filmu zostały ocenzurowane."
      },
      {
        "id": "v-b2-m3",
        "english": "Coverage",
        "polish": "Relacja / sprawozdanie / zasięg",
        "pronunciation": "/ˈkʌv.ər.ɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The media coverage of the election was huge.",
        "examplePolish": "Relacja mediów z wyborów była ogromna."
      },
      {
        "id": "v-b2-m5",
        "english": "Headline",
        "polish": "Nagłówek prasowy",
        "pronunciation": "/ˈhed.laɪn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The scandal was the main headline of the newspapers.",
        "examplePolish": "Skandal był głównym nagłówkiem gazet."
      },
      {
        "id": "v-b2-m8",
        "english": "Source",
        "polish": "Źródło",
        "pronunciation": "/sɔːrs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The journalist refused to reveal his source.",
        "examplePolish": "Dziennikarz odmówił ujawnienia swojego źródła."
      },
      {
        "id": "v-b2-m9",
        "english": "Public relations",
        "polish": "Relacje publiczne (PR)",
        "pronunciation": "/ˌpʌb.lɪk rɪˈleɪ.ʃənz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He works in the public relations department.",
        "examplePolish": "On pracuje w dziale relacji publicznych (PR)."
      },
      {
        "id": "v-b2-m11",
        "english": "Post",
        "polish": "Zamieścić / post (w sieci)",
        "pronunciation": "/poʊst/",
        "partOfSpeech": "verb/noun",
        "exampleEnglish": "He posted a video on social media.",
        "examplePolish": "Zamieścił wideo w mediach społecznościowych."
      },
      {
        "id": "v-b2-m12",
        "english": "Subscriber",
        "polish": "Subskrybent",
        "pronunciation": "/səbˈskraɪ.bər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Our YouTube channel reached one million subscribers.",
        "examplePolish": "Nasz kanał na YouTube osiągnął milion subskrybentów."
      },
      {
        "id": "v-b2-m13",
        "english": "Viral",
        "polish": "Wirusowy / wiralowy (szybko się rozprzestrzeniający)",
        "pronunciation": "/ˈvaɪ.rəl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "The cat picture went viral in a few hours.",
        "examplePolish": "Zdjęcie kota stało się wiralem w kilka godzin."
      },
      {
        "id": "v-b2-m14",
        "english": "Advertisement",
        "polish": "Reklama",
        "pronunciation": "/ədˈvɜː.tɪs.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We saw an advertisement for new cars.",
        "examplePolish": "Widzieliśmy reklamę nowych samochodów."
      },
      {
        "id": "v-b2-m16",
        "english": "Editor",
        "polish": "Redaktor",
        "pronunciation": "/ˈed.ɪ.tər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The editor corrected the article.",
        "examplePolish": "Redaktor poprawił artykuł."
      },
      {
        "id": "v-b2-m17",
        "english": "Fake news",
        "polish": "Fałszywe informacje",
        "pronunciation": "/feɪk nuːz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The internet is full of fake news.",
        "examplePolish": "Internet jest pełen fałszywych informacji."
      },
      {
        "id": "v-b2-m18",
        "english": "Podcast",
        "polish": "Podcast / audycja internetowa",
        "pronunciation": "/ˈpɒd.kɑːst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "I listen to an English learning podcast.",
        "examplePolish": "Słucham podcastu do nauki angielskiego."
      },
      {
        "id": "v-b2-m19",
        "english": "To interact",
        "polish": "Wchodzić w interakcję / oddziaływać na siebie",
        "pronunciation": "/ˌɪn.təˈrækt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Users can interact with each other in the app.",
        "examplePolish": "Użytkownicy mogą wchodzić ze sobą w interakcje w aplikacji."
      },
      {
        "id": "v-b2-m20",
        "english": "Trends",
        "polish": "Trendy / tendencje",
        "pronunciation": "/trendz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She follows the latest fashion trends.",
        "examplePolish": "Ona śledzi najnowsze trendy mody.\n\n\n--- TALIA: Finance & Economy (B2) / Finanse i Gospodarka (B2) ---\nOpis: Vocabulary for business markets, investment, inflation, and corporate banking."
      }
    ]
  },
  {
    "id": "vocab-b2-finance",
    "title": "Finance & Economy (B2)",
    "polishTitle": "Finanse i Gospodarka",
    "category": "business",
    "level": "B2",
    "description": "Vocabulary for business markets, investment, inflation, and corporate banking.",
    "icon": "DollarSign",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-b2-f2",
        "english": "Inflation",
        "polish": "Inflacja",
        "pronunciation": "/ɪnˈfleɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "High inflation reduces the value of money.",
        "examplePolish": "Wysoka inflacja obniża wartość pieniądza."
      },
      {
        "id": "v-b2-f5",
        "english": "Expenditure",
        "polish": "Wydatki / nakłady",
        "pronunciation": "/ɪkˈspen.dɪ.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to limit our monthly expenditure.",
        "examplePolish": "Musimy ograniczyć nasze miesięczne wydatki."
      },
      {
        "id": "v-b2-f8",
        "english": "Stock market",
        "polish": "Giełda papierów wartościowych",
        "pronunciation": "/ˈstɒk ˌmɑː.kɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The stock market crashed on Tuesday.",
        "examplePolish": "Giełda papierów wartościowych załamała się we wtorek."
      },
      {
        "id": "v-b2-f9",
        "english": "Debt",
        "polish": "Dług / zadłużenie",
        "pronunciation": "/det/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is trying to pay off his bank debt.",
        "examplePolish": "Próbuje spłacić swój dług bankowy."
      },
      {
        "id": "v-b2-f10",
        "english": "Taxes",
        "polish": "Podatki",
        "pronunciation": "/tæks.ɪz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Citizens pay taxes to the government.",
        "examplePolish": "Obywatele płacą podatki rządowi."
      },
      {
        "id": "v-b2-f11",
        "english": "Interest rate",
        "polish": "Stopa procentowa",
        "pronunciation": "/ˈɪn.trəst reɪt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The central bank lowered the interest rate.",
        "examplePolish": "Bank centralny obniżył stopę procentową."
      },
      {
        "id": "v-b2-f12",
        "english": "Loan",
        "polish": "Pożyczka / kredyt",
        "pronunciation": "/loʊn/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She took a loan to buy a new flat.",
        "examplePolish": "Wzięła pożyczkę na zakup nowego mieszkania."
      },
      {
        "id": "v-b2-f13",
        "english": "Mortgage",
        "polish": "Kredyt hipoteczny",
        "pronunciation": "/ˈmɔː.ɡɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They applied for a thirty-year mortgage.",
        "examplePolish": "Złożyli wniosek o trzydziestoletni kredyt hipoteczny."
      },
      {
        "id": "v-b2-f14",
        "english": "Economy",
        "polish": "Gospodarka / ekonomia",
        "pronunciation": "/iˈkɒn.ə.mi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The country's economy is growing steadily.",
        "examplePolish": "Gospodarka kraju stale rośnie."
      },
      {
        "id": "v-b2-f18",
        "english": "Fund",
        "polish": "Fundusz / finansować",
        "pronunciation": "/fʌnd/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The charity set up a research fund.",
        "examplePolish": "Organizacja charytatywna założyła fundusz badawczy."
      },
      {
        "id": "v-b2-f19",
        "english": "Transaction",
        "polish": "Transakcja",
        "pronunciation": "/trænˈzæk.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The bank transaction was processed securely.",
        "examplePolish": "Transakcja bankowa została przetworzona bezpiecznie."
      },
      {
        "id": "v-b2-f20",
        "english": "Wealth",
        "polish": "Bogactwo / majątek",
        "pronunciation": "/welθ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He accumulated great wealth through property.",
        "examplePolish": "Zgromadził wielki majątek dzięki nieruchomościom.\n\n\n--- TALIA: General Idioms (B2) / Idiomy Ogólne B2 (B2) ---\nOpis: Essential intermediate-advanced idioms required to sound natural in daily conversations."
      }
    ]
  },
  {
    "id": "idioms-b2-general",
    "title": "General Idioms (B2)",
    "polishTitle": "Idiomy Ogólne B2",
    "category": "everyday",
    "level": "B2",
    "description": "Essential intermediate-advanced idioms required to sound natural in daily conversations.",
    "icon": "Smile",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-b2-51",
        "english": "By the skin of your teeth",
        "polish": "O mały włos / cudem",
        "pronunciation": "/baɪ ðə skɪn əv jɔːr tiːθ/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He escaped the crash by the skin of his teeth.",
        "examplePolish": "Cudem uniknął wypadku."
      }
    ]
  },
  {
    "id": "vocab-c1-law",
    "title": "Law & Justice (C1)",
    "polishTitle": "Prawo i Sprawiedliwość",
    "category": "academic",
    "level": "C1",
    "description": "Advanced legal vocabulary, courtroom procedures, regulations, and constitutional concepts.",
    "icon": "Scale",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-c1-l2",
        "english": "Judiciary",
        "polish": "Sądownictwo / władza sądownicza",
        "pronunciation": "/dʒuːˈdɪʃ.ər.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The independence of the judiciary is crucial.",
        "examplePolish": "Niezależność sądownictwa jest kluczowa."
      },
      {
        "id": "v-c1-l3",
        "english": "Lawsuit",
        "polish": "Proces sądowy / pozew",
        "pronunciation": "/ˈlɔː.suːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "They filed a lawsuit against the contractor.",
        "examplePolish": "Złożyli pozew przeciwko wykonawcy."
      },
      {
        "id": "v-c1-l4",
        "english": "To prosecute",
        "polish": "Oskarżać / wnieść oskarżenie",
        "pronunciation": "/ˈprɒs.ɪ.kjuːt/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Shoplifters will be prosecuted.",
        "examplePolish": "Złodzieje sklepowi będą ścigani sądownie."
      },
      {
        "id": "v-c1-l5",
        "english": "Defense attorney",
        "polish": "Obrońca (w sądzie)",
        "pronunciation": "/dɪˈfens əˈtɜː.ni/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The defense attorney argued for acquittal.",
        "examplePolish": "Obrońca wnioskował o uniewinnienie."
      },
      {
        "id": "v-c1-l6",
        "english": "Defendant",
        "polish": "Pozwany / oskarżony",
        "pronunciation": "/dɪˈfen.dənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The defendant pleaded not guilty.",
        "examplePolish": "Oskarżony nie przyznał się do winy."
      },
      {
        "id": "v-c1-l7",
        "english": "Verdict",
        "polish": "Werdykt / wyrok",
        "pronunciation": "/ˈvɜː.dɪkt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The jury reached a unanimous verdict.",
        "examplePolish": "Ława przysięgłych wydała jednomyślny werdykt."
      },
      {
        "id": "v-c1-l8",
        "english": "Testimony",
        "polish": "Zeznanie / świadectwo",
        "pronunciation": "/ˈtes.tɪ.mən.i/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Her testimony convinced the judge.",
        "examplePolish": "Jej zeznanie przekonało sędziego."
      },
      {
        "id": "v-c1-l9",
        "english": "Constitutional",
        "polish": "Konstytucyjny",
        "pronunciation": "/ˌkɒn.stɪˈtʃuː.ʃən.əl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Citizens have a constitutional right to protest.",
        "examplePolish": "Obywatele mają konstytucyjne prawo do protestu."
      },
      {
        "id": "v-c1-l10",
        "english": "To comply",
        "polish": "Przestrzegać / zastosować się",
        "pronunciation": "/kəmˈplaɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "Companies must comply with environmental laws.",
        "examplePolish": "Firmy muszą przestrzegać praw ochrony środowiska."
      },
      {
        "id": "v-c1-l11",
        "english": "Statute",
        "polish": "Ustawa / statut / prawo pisane",
        "pronunciation": "/ˈstætʃ.uːt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The statute defines the crime of fraud.",
        "examplePolish": "Ustawa definiuje przestępstwo oszustwa."
      },
      {
        "id": "v-c1-l12",
        "english": "Breach",
        "polish": "Naruszenie / złamanie (prawa/umowy)",
        "pronunciation": "/briːtʃ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "They were sued for breach of contract.",
        "examplePolish": "Zostali pozwani o naruszenie umowy."
      },
      {
        "id": "v-c1-l13",
        "english": "Exempt",
        "polish": "Zwolniony (z cła/podatku/obowiązku)",
        "pronunciation": "/ɪɡˈzempt/",
        "partOfSpeech": "adjective/verb",
        "exampleEnglish": "Non-profit organizations are exempt from taxes.",
        "examplePolish": "Organizacje non-profit są zwolnione z podatków."
      },
      {
        "id": "v-c1-l16",
        "english": "Appeal",
        "polish": "Apelacja / odwołanie",
        "pronunciation": "/əˈpiːl/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The lawyer decided to file an appeal.",
        "examplePolish": "Prawnik postanowił wnieść apelację."
      },
      {
        "id": "v-c1-l17",
        "english": "Conviction",
        "polish": "Skazanie / przekonanie",
        "pronunciation": "/kənˈvɪk.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He has a prior conviction for theft.",
        "examplePolish": "Był już wcześniej skazany za kradzież."
      },
      {
        "id": "v-c1-l19",
        "english": "Lease",
        "polish": "Najem / dzierżawa / wynajmować",
        "pronunciation": "/liːs/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "They signed a three-year office lease.",
        "examplePolish": "Podpisali trzyletnią umowę najmu biura."
      },
      {
        "id": "v-c1-l20",
        "english": "Valid",
        "polish": "Ważny / prawomocny / uzasadniony",
        "pronunciation": "/ˈvæl.ɪd/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "You need a valid passport to travel abroad.",
        "examplePolish": "Do podróży zagranicznych potrzebujesz ważnego paszportu.\n\n\n--- TALIA: Abstract Concepts (C1) / Abstrakcyjne Pojęcia (C1) ---\nOpis: Advanced idioms representing theoretical situations, logic, and philosophies."
      }
    ]
  },
  {
    "id": "idioms-c1-abstract",
    "title": "Abstract Concepts (C1)",
    "polishTitle": "Abstrakcyjne Pojęcia",
    "category": "everyday",
    "level": "C1",
    "description": "Advanced idioms representing theoretical situations, logic, and philosophies.",
    "icon": "Zap",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c1-3",
        "english": "Double-edged sword",
        "polish": "Miecz obosieczny",
        "pronunciation": "/ˈdʌb.əl.edʒd sɔːrd/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Fame is a double-edged sword.",
        "examplePolish": "Sława to miecz obosieczny."
      },
      {
        "id": "id-c1-8",
        "english": "Familiarity breeds contempt",
        "polish": "Poufałość rodzi lekceważenie",
        "pronunciation": "/fəˌmɪl.iˈær.ə.ti briːdz kənˈtempt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "They fought after living together; familiarity breeds contempt.",
        "examplePolish": "Pokłócili się po wspólnym mieszkaniu – poufałość rodzi lekceważenie."
      },
      {
        "id": "id-c1-10",
        "english": "Ignorance is bliss",
        "polish": "Niewiedza jest błogosławieństwem",
        "pronunciation": "/ˈɪɡ.nər.əns ɪz blɪs/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I don't know the future, and ignorance is bliss.",
        "examplePolish": "Nie znam przyszłości, a niewiedza jest błogosławieństwem."
      }
    ]
  },
  {
    "id": "idioms-c1-professional",
    "title": "Professional Context (C1)",
    "polishTitle": "Biznes i Kariera",
    "category": "business",
    "level": "C1",
    "description": "Idioms representing business strategies, negotiations, and corporate operations.",
    "icon": "Briefcase",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c1-16",
        "english": "Keep someone in the loop",
        "polish": "Informować kogoś na bieżąco",
        "pronunciation": "/kiːp ˈsʌm.wʌn ɪn ðə luːp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Please keep the manager in the loop regarding the release schedule.",
        "examplePolish": "Proszę informować menedżera na bieżąco o harmonogramie wdrożenia."
      },
      {
        "id": "id-c1-17",
        "english": "Bring to the table",
        "polish": "Wnosić coś do rozmów / wnosić wartość",
        "pronunciation": "/brɪŋ tuː ðə ˈteɪ.bəl/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She brings ten years of marketing experience to the table.",
        "examplePolish": "Ona wnosi do rozmów dziesięć lat doświadczenia w marketingu."
      },
      {
        "id": "id-c1-18",
        "english": "Behind the scenes",
        "polish": "Za kulisami (nieoficjalnie)",
        "pronunciation": "/bɪˈhaɪnd ðə siːnz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Many decisions are made behind the scenes before the meeting.",
        "examplePolish": "Wiele decyzji zapada za kulisami przed spotkaniem."
      },
      {
        "id": "id-c1-20",
        "english": "Play by the rules",
        "polish": "Grać według zasad",
        "pronunciation": "/pleɪ baɪ ðə ruːlz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "If you want to keep your license, you must play by the rules.",
        "examplePolish": "Jeśli chcesz zachować licencję, musisz grać według zasad.\n\n\n--- TALIA: Interpersonal Relations (C1) / Relacje Międzyludzkie (C1) ---\nOpis: C1 idioms for describing human connection, communication conflicts, and agreements."
      }
    ]
  },
  {
    "id": "idioms-c1-relations",
    "title": "Interpersonal Relations (C1)",
    "polishTitle": "Relacje Międzyludzkie",
    "category": "everyday",
    "level": "C1",
    "description": "C1 idioms for describing human connection, communication conflicts, and agreements.",
    "icon": "Users",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c1-22",
        "english": "Give the cold shoulder",
        "polish": "Traktować chłodno / ignorować",
        "pronunciation": "/ɡɪv ðə koʊld ˈʃoʊl.dər/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "She gave me the cold shoulder after our small argument.",
        "examplePolish": "Zignorowała mnie po naszej małej kłótni."
      },
      {
        "id": "id-c1-23",
        "english": "Clear the air",
        "polish": "Oczyścić atmosferę / wyjaśnić nieporozumienia",
        "pronunciation": "/klɪr ði er/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We had a long talk to clear the air.",
        "examplePolish": "Odbyliśmy długą rozmowę, aby oczyścić atmosferę."
      },
      {
        "id": "id-c1-24",
        "english": "Build bridges",
        "polish": "Budować mosty (zasypywać podziały)",
        "pronunciation": "/bɪld ˈbrɪdʒ.ɪz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The diplomat worked hard to build bridges between the two groups.",
        "examplePolish": "Dyplomata ciężko pracował, aby budować mosty między obiema grupami."
      },
      {
        "id": "id-c1-25",
        "english": "Get along famously",
        "polish": "Świetnie się dogadywać",
        "pronunciation": "/ɡet əˈlɒŋ ˈfeɪ.məs.li/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "The roommates got along famously from the first day.",
        "examplePolish": "Współlokatorzy świetnie się dogadywali od pierwszego dnia."
      },
      {
        "id": "id-c1-26",
        "english": "Cross paths",
        "polish": "Skrzyżować drogi / spotkać się przypadkiem",
        "pronunciation": "/krɒs pæðz/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "We crossed paths at a conference in Berlin.",
        "examplePolish": "Nasze drogi skrzyżowały się na konferencji w Berlinie."
      },
      {
        "id": "id-c1-28",
        "english": "Read someone like a book",
        "polish": "Czytać w kimś jak w otwartej książce",
        "pronunciation": "/riːd ˈsʌm.wʌn laɪk ə bʊk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I knew she was lying; I can read her like a book.",
        "examplePolish": "Wiedziałem, że kłamie – czytam w niej jak w otwartej książce."
      },
      {
        "id": "id-c1-30",
        "english": "Close-knit",
        "polish": "Zżyty",
        "pronunciation": "/ˌkloʊsˈnɪt/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Our neighborhood is very close-knit.",
        "examplePolish": "Nasze sąsiedztwo jest bardzo zżyte."
      }
    ]
  },
  {
    "id": "vocab-c2-science",
    "title": "Science & Philosophy (C2)",
    "polishTitle": "Nauka i Filozofia",
    "category": "academic",
    "level": "C2",
    "description": "Extremely advanced vocabulary for theoretical physics, molecular biology, epistemology, and ethics.",
    "icon": "Globe",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-c2-s4",
        "english": "Quantum",
        "polish": "Kwant / kwantowy",
        "pronunciation": "/ˈkwɒn.təm/",
        "partOfSpeech": "noun/adjective",
        "exampleEnglish": "Quantum computing will revolutionize information systems.",
        "examplePolish": "Komputery kwantowe zrewolucjonizują systemy informacyjne."
      },
      {
        "id": "v-c2-s8",
        "english": "Synthesis",
        "polish": "Synteza",
        "pronunciation": "/ˈsɪn.θə.sɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The essay is a synthesis of different concepts.",
        "examplePolish": "Esej jest syntezą różnych koncepcji."
      },
      {
        "id": "v-c2-s9",
        "english": "Entropy",
        "polish": "Entropia",
        "pronunciation": "/ˈen.trə.pi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Entropy measures disorder in a thermodynamic system.",
        "examplePolish": "Entropia mierzy nieuporządkowanie w układzie termodynamicznym."
      },
      {
        "id": "v-c2-s10",
        "english": "Determinism",
        "polish": "Determinizm",
        "pronunciation": "/dɪˈtɜː.mɪ.nɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Hard determinism rejects the existence of free will.",
        "examplePolish": "Twardy determinizm odrzuca istnienie wolnej woli."
      },
      {
        "id": "v-c2-s13",
        "english": "Quantum entanglement",
        "polish": "Splątanie kwantowe",
        "pronunciation": "/ˈkwɒn.təm ɪnˈtæŋ.ɡəl.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Quantum entanglement is a puzzling physical phenomenon.",
        "examplePolish": "Splątanie kwantowe to zagadkowe zjawisko fizyczne."
      },
      {
        "id": "v-c2-s14",
        "english": "Nanotechnology",
        "polish": "Nanotechnologia",
        "pronunciation": "/ˌnæn.əʊ.tekˈnɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Nanotechnology improves medicine delivery systems.",
        "examplePolish": "Nanotechnologia usprawnia systemy dostarczania leków."
      },
      {
        "id": "v-c2-s15",
        "english": "Causality",
        "polish": "Przyczynowość / związek przyczynowo-skutkowy",
        "pronunciation": "/kɔːˈzæl.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Philosophy analyzes the relation of causality.",
        "examplePolish": "Filozofia analizuje relację przyczynowości."
      },
      {
        "id": "v-c2-s16",
        "english": "Axiomatic",
        "polish": "Aksjomatyczny / bezsporny",
        "pronunciation": "/ˌæk.si.əˈmæt.ɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "His argument starts from axiomatic principles.",
        "examplePolish": "Jego argumentacja opiera się na zasadach aksjomatycznych."
      },
      {
        "id": "v-c2-s17",
        "english": "Evolutionary biology",
        "polish": "Biologia ewolucyjna",
        "pronunciation": "/ˌiː.vəˈluː.ʃən.ər.i baɪˈɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "He is an expert in evolutionary biology.",
        "examplePolish": "Jest ekspertem w dziedzinie biologii ewolucyjnej."
      },
      {
        "id": "v-c2-s19",
        "english": "Gene expression",
        "polish": "Ekspresja genów",
        "pronunciation": "/dʒiːn ɪkˈspreʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Environmental factors can affect gene expression.",
        "examplePolish": "Czynniki środowiskowe mogą wpływać na ekspresję genów."
      },
      {
        "id": "v-c2-s20",
        "english": "Heuristics",
        "polish": "Heurystyka / metody heurystyczne",
        "pronunciation": "/hjuːˈrɪs.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Heuristics provide quick problem-solving rules.",
        "examplePolish": "Metody heurystyczne dostarczają szybkich reguł rozwiązywania problemów.\n\n\n--- TALIA: Politics & Diplomacy (C2) / Polityka i Dyplomacja (C2) ---\nOpis: Elite-level terms for international relations, geopolitics, statecraft, and governance."
      }
    ]
  },
  {
    "id": "vocab-c2-politics",
    "title": "Politics & Diplomacy (C2)",
    "polishTitle": "Polityka i Dyplomacja",
    "category": "academic",
    "level": "C2",
    "description": "Elite-level terms for international relations, geopolitics, statecraft, and governance.",
    "icon": "Milestone",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-c2-p2",
        "english": "Geopolitics",
        "polish": "Geopolityka",
        "pronunciation": "/ˌdʒiː.oʊˈpɒl.ɪ.tɪks/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The conflict is shaped by regional geopolitics.",
        "examplePolish": "Konflikt jest kształtowany przez regionalną geopolitykę."
      },
      {
        "id": "v-c2-p3",
        "english": "Hegemony",
        "polish": "Hegemonia / przywództwo",
        "pronunciation": "/hɪˈdʒem.ə.ni/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The superpower maintained its economic hegemony.",
        "examplePolish": "Supermocarstwo utrzymało swoją hegemonię gospodarczą."
      },
      {
        "id": "v-c2-p4",
        "english": "Diplomatic immunity",
        "polish": "Immunitet dyplomatyczny",
        "pronunciation": "/ˌdɪp.ləˈmæt.ɪk ɪˈmjuː.nə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The ambassador has diplomatic immunity.",
        "examplePolish": "Ambasador posiada immunitet dyplomatyczny."
      },
      {
        "id": "v-c2-p5",
        "english": "Sanction",
        "polish": "Sankcja / nałożyć sankcje",
        "pronunciation": "/ˈsæŋk.ʃən/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "Economic sanctions were imposed on the nation.",
        "examplePolish": "Na ten naród nałożono sankcje gospodarcze."
      },
      {
        "id": "v-c2-p6",
        "english": "Bilateral",
        "polish": "Dwustronny (np. układ)",
        "pronunciation": "/baɪˈlæt.ər.əl/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "They signed a bilateral trade agreement.",
        "examplePolish": "Podpisali dwustronną umowę handlową."
      },
      {
        "id": "v-c2-p7",
        "english": "Embargo",
        "polish": "Embargo / zakaz handlu",
        "pronunciation": "/ɪmˈbɑːr.ɡoʊ/",
        "partOfSpeech": "noun/verb",
        "exampleEnglish": "The government declared a grain embargo.",
        "examplePolish": "Rząd ogłosił embargo na zboże."
      },
      {
        "id": "v-c2-p8",
        "english": "Coalition",
        "polish": "Koalicja",
        "pronunciation": "/ˌkoʊ.əˈlɪʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The parties formed a governing coalition.",
        "examplePolish": "Partie utworzyły koalicję rządzącą."
      },
      {
        "id": "v-c2-p9",
        "english": "Bureaucracy",
        "polish": "Biurokracja",
        "pronunciation": "/bjʊəˈrɒk.rə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "We need to cut through state bureaucracy.",
        "examplePolish": "Musimy ograniczyć państwową biurokrację."
      },
      {
        "id": "v-c2-p10",
        "english": "Legislature",
        "polish": "Ciało ustawodawcze / parlament",
        "pronunciation": "/ˈledʒ.ɪ.slə.tʃər/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The proposal was sent to the legislature.",
        "examplePolish": "Wniosek został przesłany do ciała ustawodawczego."
      },
      {
        "id": "v-c2-p11",
        "english": "To ratify",
        "polish": "Ratyfikować / zatwierdzić",
        "pronunciation": "/ˈræt.ɪ.faɪ/",
        "partOfSpeech": "verb",
        "exampleEnglish": "The parliament ratified the environmental treaty.",
        "examplePolish": "Parlament ratyfikował traktat środowiskowy."
      },
      {
        "id": "v-c2-p12",
        "english": "Referendum",
        "polish": "Referendum",
        "pronunciation": "/ˌref.əˈren.dəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The nation will vote in a referendum.",
        "examplePolish": "Naród zagłosuje w referendum."
      },
      {
        "id": "v-c2-p13",
        "english": "Suffrage",
        "polish": "Prawo do głosowania / prawo wyborcze",
        "pronunciation": "/ˈsʌf.rɪdʒ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Universal suffrage is a core democratic value.",
        "examplePolish": "Powszechne prawo wyborcze to kluczowa wartość demokratyczna."
      },
      {
        "id": "v-c2-p14",
        "english": "Autocracy",
        "polish": "Autokracja / samowładztwo",
        "pronunciation": "/ɔːˈtɒk.rə.si/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The country transitioned from autocracy to democracy.",
        "examplePolish": "Kraj przeszedł od autokracji do demokracji."
      },
      {
        "id": "v-c2-p15",
        "english": "Lobbyist",
        "polish": "Lobbysta",
        "pronunciation": "/ˈlɒb.i.ɪst/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Lobbyists influence energy policy decisions.",
        "examplePolish": "Lobbyści wpływają na decyzje dotyczące polityki energetycznej."
      },
      {
        "id": "v-c2-p16",
        "english": "Annexation",
        "polish": "Aneksja / przyłączenie",
        "pronunciation": "/ˌæn.ekˈseɪ.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The international community condemned the annexation.",
        "examplePolish": "Społeczność międzynarodowa potępiła aneksję."
      },
      {
        "id": "v-c2-p17",
        "english": "Appeasement",
        "polish": "Ugłaskiwanie / polityka ustępstw",
        "pronunciation": "/əˈpiːz.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The policy of appeasement failed to prevent the war.",
        "examplePolish": "Polityka ustępstw nie zdołała zapobiec wojnie."
      },
      {
        "id": "v-c2-p18",
        "english": "Diplomat",
        "polish": "Dyplomata",
        "pronunciation": "/ˈdɪp.lə.mæt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "An experienced diplomat managed the crisis.",
        "examplePolish": "Doświadczony dyplomata zarządzał kryzysem."
      },
      {
        "id": "v-c2-p19",
        "english": "Envoys",
        "polish": "Wysłannicy / posłowie",
        "pronunciation": "/ˈen.vɔɪz/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Peace envoys were dispatched to the region.",
        "examplePolish": "Wysłannicy pokojowi zostali wysłani do tego regionu."
      },
      {
        "id": "v-c2-p20",
        "english": "Statecraft",
        "polish": "Sztuka rządzenia państwem",
        "pronunciation": "/ˈsteɪt.kræft/",
        "partOfSpeech": "noun",
        "exampleEnglish": "The prime minister showed masterful statecraft.",
        "examplePolish": "Premier wykazał się mistrzowską sztuką rządzenia państwem.\n\n\n--- TALIA: Psychology & Behaviour (C2) / Psychologia i Zachowanie (C2) ---\nOpis: Vocabulary for neuropsychology, psychoanalysis, cognitive theories, and behavior analysis."
      }
    ]
  },
  {
    "id": "vocab-c2-psychology",
    "title": "Psychology & Behaviour (C2)",
    "polishTitle": "Psychologia i Zachowanie",
    "category": "academic",
    "level": "C2",
    "description": "Vocabulary for neuropsychology, psychoanalysis, cognitive theories, and behavior analysis.",
    "icon": "User",
    "color": "#10b981",
    "cards": [
      {
        "id": "v-c2-ps1",
        "english": "Neuroplasticity",
        "polish": "Neuroplastyczność",
        "pronunciation": "/ˌnjʊə.rəʊ.plæsˈtɪs.ə.ti/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Brain recovery relies heavily on neuroplasticity.",
        "examplePolish": "Regeneracja mózgu w dużej mierze opiera się na neuroplastyczności."
      },
      {
        "id": "v-c2-ps2",
        "english": "Subconscious",
        "polish": "Podświadomość / podświadomy",
        "pronunciation": "/ˌsʌbˈkɒn.ʃəs/",
        "partOfSpeech": "noun/adjective",
        "exampleEnglish": "Dreams reveal our subconscious desires.",
        "examplePolish": "Sny ujawniają nasze podświadome pragnienia."
      },
      {
        "id": "v-c2-ps3",
        "english": "Projection",
        "polish": "Projekcja (mechanizm obronny)",
        "pronunciation": "/prəˈdʒek.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Psychology defines projection as accusing others of your own faults.",
        "examplePolish": "Psychologia definiuje projekcję jako oskarżanie innych o własne wady."
      },
      {
        "id": "v-c2-ps4",
        "english": "Cognitive dissonance",
        "polish": "Dysonans poznawczy",
        "pronunciation": "/ˈkɒɡ.nɪ.tɪv ˈdɪs.ə.nəns/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Smoking while knowing it is unhealthy causes cognitive dissonance.",
        "examplePolish": "Palenie przy świadomości, że jest niezdrowe, powoduje dysonans poznawczy."
      },
      {
        "id": "v-c2-ps5",
        "english": "Behaviorism",
        "polish": "Behawioryzm",
        "pronunciation": "/bɪˈheɪ.vjə.rɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Behaviorism focuses on observable actions rather than thoughts.",
        "examplePolish": "Behawioryzm skupia się na obserwowalnych działaniach, a nie na myślach."
      },
      {
        "id": "v-c2-ps6",
        "english": "Conditioning",
        "polish": "Warunkowanie",
        "pronunciation": "/kənˈdɪʃ.ən.ɪŋ/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Pavlov is famous for classical conditioning experiments.",
        "examplePolish": "Pawłow jest sławny z eksperymentów nad warunkowaniem klasycznym."
      },
      {
        "id": "v-c2-ps7",
        "english": "Psychoanalysis",
        "polish": "Psychoanaliza",
        "pronunciation": "/ˌsaɪ.koʊ.əˈnæl.ə.sɪs/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Freud developed the theory of psychoanalysis.",
        "examplePolish": "Freud opracował teorię psychoanalizy."
      },
      {
        "id": "v-c2-ps8",
        "english": "Empathy",
        "polish": "Empatia",
        "pronunciation": "/ˈem.pə.θi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Empathy helps us connect with others.",
        "examplePolish": "Empatia pomaga nam łączyć się z innymi."
      },
      {
        "id": "v-c2-ps10",
        "english": "Psychopathology",
        "polish": "Psychopatologia",
        "pronunciation": "/ˌsaɪ.koʊ.pəˈθɒl.ə.dʒi/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Psychopathology studies mental disorders.",
        "examplePolish": "Psychopatologia bada zaburzenia psychiczne."
      },
      {
        "id": "v-c2-ps11",
        "english": "Trauma",
        "polish": "Trauma / uraz psychiczny",
        "pronunciation": "/ˈtrɔː.mə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Therapy helps people heal from emotional trauma.",
        "examplePolish": "Terapia pomaga ludziom wyleczyć się z traumy emocjonalnej."
      },
      {
        "id": "v-c2-ps12",
        "english": "Psychiatry",
        "polish": "Psychiatria",
        "pronunciation": "/saɪˈkaɪ.ə.tri/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Psychiatry involves medical treatment of mental illness.",
        "examplePolish": "Psychiatria obejmuje medyczne leczenie chorób psychicznych."
      },
      {
        "id": "v-c2-ps13",
        "english": "Somatic",
        "polish": "Somatyczny / fizyczny",
        "pronunciation": "/səˈmæt.ɪk/",
        "partOfSpeech": "adjective",
        "exampleEnglish": "Stress can lead to somatic complaints like headaches.",
        "examplePolish": "Stres może prowadzić do dolegliwości somatycznych, takich jak bóle głowy."
      },
      {
        "id": "v-c2-ps14",
        "english": "Perception",
        "polish": "Percepcja / postrzeganie",
        "pronunciation": "/pəˈsep.ʃən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Perception can differ from objective reality.",
        "examplePolish": "Percepcja może różnić się od obiektywnej rzeczywistości."
      },
      {
        "id": "v-c2-ps15",
        "english": "Temperament",
        "polish": "Temperament",
        "pronunciation": "/ˈtem.prə.mənt/",
        "partOfSpeech": "noun",
        "exampleEnglish": "She has a calm and patient temperament.",
        "examplePolish": "Ona ma spokojny i cierpliwy temperament."
      },
      {
        "id": "v-c2-ps16",
        "english": "Narcissism",
        "polish": "Narcyzm",
        "pronunciation": "/ˈnɑːr.sɪ.sɪ.zəm/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Narcissism is characterized by excessive self-love.",
        "examplePolish": "Narcyzm charakteryzuje się nadmierną miłością własną."
      },
      {
        "id": "v-c2-ps17",
        "english": "Phobia",
        "polish": "Fobia / lęk",
        "pronunciation": "/ˈfoʊ.bi.ə/",
        "partOfSpeech": "noun",
        "exampleEnglish": "Claustrophobia is a fear of enclosed spaces.",
        "examplePolish": "Klaustrofobia to lęk przed zamkniętymi przestrzeniami."
      },
      {
        "id": "v-c2-ps18",
        "english": "Obsession",
        "polish": "Obsesja",
        "pronunciation": "/əbˈseʃ.ən/",
        "partOfSpeech": "noun",
        "exampleEnglish": "His obsession with cleanliness became a problem.",
        "examplePolish": "Jego obsesja na punkcie czystości stała się problemem."
      },
      {
        "id": "v-c2-ps19",
        "english": "Introvert",
        "polish": "Introwertyk / introwertyczny",
        "pronunciation": "/ˈɪn.trə.vɜːt/",
        "partOfSpeech": "noun/adjective",
        "exampleEnglish": "As an introvert, she enjoys quiet evenings alone.",
        "examplePolish": "Jako introwertyczka lubi ciche wieczory w samotności."
      },
      {
        "id": "v-c2-ps20",
        "english": "Extrovert",
        "polish": "Ekstrawertyk / ekstrawertyczny",
        "pronunciation": "/ˈek.strə.vɜːt/",
        "partOfSpeech": "noun/adjective",
        "exampleEnglish": "He is an extrovert who loves busy parties.",
        "examplePolish": "Jest ekstrawertykiem, który uwielbia tłumne imprezy.\n\n\n--- TALIA: Mastering Idioms 1 (C2) / Zaawansowane Idiomy 1 (C2) ---\nOpis: Native-level idioms expressing complex human conditions and ironies."
      }
    ]
  },
  {
    "id": "idioms-c2-advanced-1",
    "title": "Mastering Idioms 1 (C2)",
    "polishTitle": "Zaawansowane Idiomy 1",
    "category": "everyday",
    "level": "C2",
    "description": "Native-level idioms expressing complex human conditions and ironies.",
    "icon": "Activity",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c2-5",
        "english": "Don't put all eggs in one basket",
        "polish": "Nie stawiaj wszystkiego na jedną kartę",
        "pronunciation": "/doʊnt pʊt ɔːl eɡz ɪn wʌn ˈbæs.kɪt/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Invest in multiple areas; don't put all eggs in one basket.",
        "examplePolish": "Inwestuj w wiele obszarów; nie stawiaj wszystkiego na jedną kartę."
      }
    ]
  },
  {
    "id": "idioms-c2-advanced-2",
    "title": "Mastering Idioms 2 (C2)",
    "polishTitle": "Zaawansowane Idiomy 2",
    "category": "everyday",
    "level": "C2",
    "description": "More complex native idioms to showcase absolute fluency in English.",
    "icon": "Award",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c2-11",
        "english": "Heard on the grapevine",
        "polish": "Dowiedzieć się pocztą pantoflową",
        "pronunciation": "/hɜːd ɑːn ðə ˈɡreɪp.vaɪn/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "I heard on the grapevine that a merger is coming.",
        "examplePolish": "Dowiedziałem się pocztą pantoflową, że nadchodzi fuzja."
      },
      {
        "id": "id-c2-16",
        "english": "Elephant in the room",
        "polish": "Oczywisty problem, o którym nikt nie chce rozmawiać",
        "pronunciation": "/ði ˈel.ɪ.fənt ɪn ðə ruːm/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "His absence was the elephant in the room.",
        "examplePolish": "Jego nieobecność była oczywistym, ale ignorowanym tematem."
      }
    ]
  },
  {
    "id": "idioms-c2-advanced-3",
    "title": "Mastering Idioms 3 (C2)",
    "polishTitle": "Zaawansowane Idiomy 3",
    "category": "everyday",
    "level": "C2",
    "description": "More elite expressions to complete your C2 vocabulary arsenal.",
    "icon": "Shield",
    "color": "#10b981",
    "cards": [
      {
        "id": "id-c2-23",
        "english": "Read like a book",
        "polish": "Czytać w kimś jak w otwartej książce",
        "pronunciation": "/riːd laɪk ə bʊk/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "He tried to smile, but I read him like a book.",
        "examplePolish": "Próbował się uśmiechnąć, ale czytałem w nim jak w otwartej książce."
      },
      {
        "id": "id-c2-30",
        "english": "Keep in the loop",
        "polish": "Informować na bieżąco",
        "pronunciation": "/kiːp ɪn ðə luːp/",
        "partOfSpeech": "phrase",
        "exampleEnglish": "Keep me in the loop regarding the deal.",
        "examplePolish": "Informuj mnie na bieżąco o tej transakcji."
      }
    ]
  }
];

const counts = {};
export const defaultDecks = rawDefaultDecks.map(deck => {
  const isIdiomsDeck = deck.id === "idioms-c2" || deck.id.startsWith("idioms");
  const type = isIdiomsDeck ? "idioms" : "vocabulary";
  const level = deck.level;
  
  let isPremium = false;
  if (level === "C1" || level === "C2") {
    isPremium = true;
  } else if (level === "B1" || level === "B2") {
    const key = `${level}-${type}`;
    counts[key] = (counts[key] || 0) + 1;
    if (counts[key] > 2) {
      isPremium = true;
    }
  }

  const cards = (deck.cards || []).map(card => ({
    ...card,
    level: deck.level,
    isPremium
  }));

  return {
    ...deck,
    cards,
    type,
    isPremium
  };
});

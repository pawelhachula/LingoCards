<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06b6d4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-Auth-ffca28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

# 🇵🇱 LingoCards — Ucz się angielskiego z fiszkami

**LingoCards** to nowoczesna aplikacja webowa do nauki angielskiego, oparta na metodzie fiszek i algorytmie powtórek Spaced Repetition (SRS). Zaprojektowana z myślą o polskich użytkownikach, oferuje intuicyjny interfejs, gamifikację i różnorodne tryby nauki.

## ✨ Funkcje

### 📚 Nauka
- **7 tematycznych talii** (~100 fiszek) — Everyday English, Business, Travel, Advanced Vocabulary, Idioms, Restaurant, Technology
- **Algorytm SRS** (Spaced Repetition System) — inteligentne powtórki w optymalnych odstępach czasu
- **Quiz wielokrotnego wyboru** — testuj swoją wiedzę z natychmiastowym feedbackiem
- **Gra w pary (Matcher)** — łącz angielskie słowa z polskimi tłumaczeniami na czas
- **Kreator talii** — twórz własne talie z własnymi słówkami
- **Wyszukiwarka słów** (`Ctrl+K`) — przeszukuj całą kolekcję z filtrami CEFR i statusu nauki
- **Słówko dnia** — codziennie nowe losowe słowo na dashboardzie

### 🎮 Gamifikacja
- **System XP i poziomów** — zdobywaj doświadczenie za każdą aktywność
- **Streak (seria dni)** — utrzymuj codzienną passę nauki
- **Medale za talie** — brąz, srebro, złoto za opanowanie talii
- **Ranking (Leaderboard)** — rywalizuj z innymi użytkownikami
- **Program poleceń (Referrals)** — zaproś znajomych i odblokowuj nagrody

### 🎨 Personalizacja
- **9 motywów graficznych** — 3 ciemne (Graphite, Green, Navy), 3 jasne (Sakura, Forest, Amber), 3 premium (Cyberpunk, Nebula, Gold)
- **Konfigurowalne efekty** — styl dźwięków i animacji konfetti
- **Awatary** — wybierz emoji lub prześlij własne zdjęcie
- **TTS (Text-to-Speech)** — odsłuchaj wymowę każdego słowa

### 📊 Statystyki
- Poznane słowa, liczba powtórek, czas nauki
- Średnia skuteczność i najtrudniejsze słowa
- Wykres progresu 30 dni
- Najlepszy dzień nauki

### 🔍 Wyszukiwarka (Command Palette)
- Otwierana skrótem `Ctrl+K` lub przyciskiem w navbarze
- Wyszukiwanie po: słowie EN, tłumaczeniu PL, transkrypcji, części mowy, zdaniu przykładowym
- Filtrowanie: status (opanowane / do nauki / ulubione) + poziom CEFR (A1–C2)
- Akcje: odsłuchaj wymowę, dodaj do ulubionych, przejdź do talii

## 🛠️ Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Frontend | React 18 + JSX |
| Bundler | Vite 6 |
| Stylowanie | TailwindCSS 3 |
| Ikony | Lucide React |
| Auth | Firebase Authentication (Google + Email) |
| Dane | localStorage (migracja do Firestore w planie) |
| Hosting | Vercel (auto-deploy z GitHub) |
| CI/CD | GitHub → Vercel |

## 🚀 Uruchomienie lokalne

```bash
# Klonowanie repozytorium
git clone https://github.com/pawelhachula/LingoCards.git
cd LingoCards

# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build
```

Aplikacja będzie dostępna pod `http://localhost:5173`

## 📁 Struktura projektu

```
src/
├── components/
│   ├── Auth.jsx          # Logowanie i rejestracja
│   ├── Dashboard.jsx     # Pulpit główny ze słówkiem dnia
│   ├── Flashcards.jsx    # Nauka fiszek z SRS
│   ├── Quiz.jsx          # Testy wielokrotnego wyboru
│   ├── Matcher.jsx       # Gra w łączenie par
│   ├── Creator.jsx       # Kreator własnych talii
│   ├── StatsView.jsx     # Statystyki i wykresy
│   ├── SearchModal.jsx   # Wyszukiwarka słów (Ctrl+K)
│   ├── Profile.jsx       # Profil użytkownika
│   ├── Settings.jsx      # Ustawienia aplikacji
│   ├── Leaderboard.jsx   # Ranking graczy
│   └── Referrals.jsx     # Program poleceń
├── data/
│   └── defaultDecks.js   # 7 domyślnych talii (~100 fiszek)
├── utils/
│   └── effects.js        # Dźwięki, konfetti, fajerwerki
├── firebase.js           # Konfiguracja Firebase Auth
├── App.jsx               # Główny komponent aplikacji
└── index.css             # Style globalne + motywy
```

## 📋 Roadmapa

- [x] Fiszki z algorytmem SRS
- [x] Quiz, Matcher, Kreator talii
- [x] System XP, poziomów i medali
- [x] 9 motywów graficznych
- [x] Statystyki i wykresy progresu
- [x] Wyszukiwarka słów (Command Palette)
- [x] Słówko dnia i ulubione
- [ ] Firebase Auth + Firestore (baza danych w chmurze)
- [ ] PWA (Progressive Web App)
- [ ] Talie specjalistyczne PRO
- [ ] Analiza słabych punktów
- [ ] Push Notifications

## 📄 Licencja

MIT

---

# 🇬🇧 LingoCards — Learn English with Flashcards

**LingoCards** is a modern web application for learning English, built on the flashcard method and Spaced Repetition System (SRS) algorithm. Designed for Polish-speaking learners, it features an intuitive interface, gamification mechanics, and diverse learning modes.

## ✨ Features

### 📚 Learning
- **7 themed decks** (~100 flashcards) — Everyday English, Business, Travel, Advanced Vocabulary, Idioms, Restaurant, Technology
- **SRS algorithm** (Spaced Repetition System) — intelligent reviews at optimal intervals
- **Multiple-choice Quiz** — test your knowledge with instant feedback
- **Matching Game (Matcher)** — pair English words with Polish translations against the clock
- **Deck Creator** — build custom decks with your own vocabulary
- **Word Search** (`Ctrl+K`) — search your entire collection with CEFR level and status filters
- **Word of the Day** — a new random word on your dashboard every day

### 🎮 Gamification
- **XP & leveling system** — earn experience for every activity
- **Daily streak** — maintain your learning consistency
- **Deck medals** — bronze, silver, gold for mastering decks
- **Leaderboard** — compete with other learners
- **Referral program** — invite friends and unlock rewards

### 🎨 Customization
- **9 color themes** — 3 dark (Graphite, Green, Navy), 3 light (Sakura, Forest, Amber), 3 premium (Cyberpunk, Nebula, Gold)
- **Configurable effects** — sound style and confetti animations
- **Avatars** — choose an emoji or upload a custom photo
- **TTS (Text-to-Speech)** — listen to pronunciation for every word

### 📊 Statistics
- Learned words count, review count, study time
- Average accuracy and hardest words
- 30-day progress chart
- Best study day

### 🔍 Search (Command Palette)
- Open with `Ctrl+K` or the search button in the navbar
- Search by: English word, Polish translation, pronunciation, part of speech, example sentence
- Filter: status (learned / unlearned / starred) + CEFR level (A1–C2)
- Actions: play pronunciation, add to favorites, navigate to deck

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + JSX |
| Bundler | Vite 6 |
| Styling | TailwindCSS 3 |
| Icons | Lucide React |
| Auth | Firebase Authentication (Google + Email) |
| Data | localStorage (Firestore migration planned) |
| Hosting | Vercel (auto-deploy from GitHub) |
| CI/CD | GitHub → Vercel |

## 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/pawelhachula/LingoCards.git
cd LingoCards

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth.jsx          # Login & registration
│   ├── Dashboard.jsx     # Main dashboard with Word of the Day
│   ├── Flashcards.jsx    # Flashcard learning with SRS
│   ├── Quiz.jsx          # Multiple-choice tests
│   ├── Matcher.jsx       # Pair matching game
│   ├── Creator.jsx       # Custom deck creator
│   ├── StatsView.jsx     # Statistics & charts
│   ├── SearchModal.jsx   # Word search (Ctrl+K)
│   ├── Profile.jsx       # User profile
│   ├── Settings.jsx      # App settings
│   ├── Leaderboard.jsx   # Player rankings
│   └── Referrals.jsx     # Referral program
├── data/
│   └── defaultDecks.js   # 7 default decks (~100 flashcards)
├── utils/
│   └── effects.js        # Sounds, confetti, fireworks
├── firebase.js           # Firebase Auth configuration
├── App.jsx               # Main application component
└── index.css             # Global styles + themes
```

## 📋 Roadmap

- [x] Flashcards with SRS algorithm
- [x] Quiz, Matcher, Deck Creator
- [x] XP, leveling & medal system
- [x] 9 color themes
- [x] Statistics & progress charts
- [x] Word Search (Command Palette)
- [x] Word of the Day & favorites
- [ ] Firebase Auth + Firestore (cloud database)
- [ ] PWA (Progressive Web App)
- [ ] Specialized PRO decks
- [ ] Weak points analysis
- [ ] Push Notifications

## 📄 License

MIT

---

<p align="center">
  Made with ❤️ in Poland
</p>

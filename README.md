# 🇵🇱 LingoCards — Moja aplikacja do nauki angielskiego

Cześć! Stworzyłem **LingoCards**, czyli prostą, a zarazem zaawansowaną aplikację internetową do nauki słówek z języka angielskiego. Chciałem zrobić coś, co z jednej strony będzie ładne i nowoczesne, a z drugiej naprawdę pomoże w zapamiętywaniu słownictwa dzięki sprawdzonym metodom naukowym.

Aplikacja opiera się na metodzie fiszek oraz inteligentnym algorytmie powtórek **Spaced Repetition System (SRS)**. Dzięki temu program sam podpowiada słówka do powtórzenia w takich odstępach czasu, aby zapisać je w pamięci długotrwałej.

---

## 🚀 Co znajdziesz w aplikacji?

### 1. Różne tryby nauki i zabawy
*   **Fiszki (SRS)**: Nauka ze sprawdzaniem wymowy (TTS) i zaznaczaniem, czy słówko już znasz, czy wymaga jeszcze powtórki.
*   **Testy**: Dwa tryby sprawdzania wiedzy – test wyboru (A, B, C, D) lub wpisywanie słówka z klawiatury (trening pisowni).
*   **Gra w pary**: Szybka gra na czas polegająca na łączeniu angielskich słów z polskimi znaczeniami.

### 2. Moje własne talie, Menedżer i Import z plików
*   **Własne zestawy**: Możesz stworzyć własną talię, nazwać ją, wybrać dla niej ikonę, kolor akcentujący i samodzielnie dodawać, edytować lub usuwać z niej słówka.
*   **Import z plików**: Zaawansowany import słówek z formatów **CSV, TXT, JSON** oraz **PDF** (dynamiczne wyciąganie tekstu po stronie klienta za pomocą PDF.js).
*   **Podgląd i edycja (Live Preview)**: Po załadowaniu pliku aplikacja wyświetla interaktywną tabelę, w której możesz w locie edytować słówka, definicje, zapis fonetyczny i zdania przykładowe lub usuwać wiersze przed ostatecznym zapisem.
*   **Wykrywanie duplikatów**: System automatycznie sprawdza unikalność (case-insensitive) i ignoruje zdublowane fiszki.

### 3. Model Hybrydowy (Słownictwo vs Idiomy)
*   Podział katalogu lekcji na dwie estetyczne zakładki: **Słownictwo (Vocabulary)** oraz **Idiomy i Frazale (Idioms & Phrasals)**.
*   Rozbudowana baza oficjalnych zestawów o przydatne idiomy oraz phrasal verbs na poziomach B2-C2 (np. *Business Idioms*, *Phrasal Verbs with GET*, *Take & Put*, *Idioms of Emotion* i inne).
*   **Wersja PRO**: Sekcja idiomatyczna posiada ograniczenia premium (PRO lock) – większość zaawansowanych talii idiomów jest zablokowana kłódką PRO, podczas gdy talia *"Phrasal Verbs z Get (B2)"* pozostaje w pełni darmowa dla każdego użytkownika.

### 4. Statystyki i Kalendarz Aktywności
*   Szczegółowy panel statystyk pokazuje, ile słówek już opanowałeś, ile masz łącznie talii, ile czasu spędziłeś na nauce oraz Twoją skuteczność w testach.
*   Kalendarz aktywności (ostatnie 28 dni) rejestruje dni, w których się uczyłeś, i motywuje Cię do utrzymywania serii (streaka).

### 5. Gamifikacja i personalizacja
*   **Streak (seria dni)**: Codzienna nauka buduje serię. Za osiągnięcie kamieni milowych (5, 10, 20, 30 dni z rzędu) odblokowujesz specjalne odznaczenia w kalendarzu.
*   **Punkty XP i Poziomy**: Za naukę, testy i gry otrzymujesz punkty doświadczenia. Awansujesz na wyższe poziomy i zdobywasz nowe tytuły.
*   **Motywy graficzne**: Podstawowe motywy są dostępne od razu, a unikalne motywy Premium (np. Midnight Mint, Cyberpunk, Royal Gold) odblokowują się automatycznie po osiągnięciu odpowiedniego poziomu XP.
*   **Globalny ranking**: Rywalizacja z innymi użytkownikami na żywo na tablicy wyników.
*   **Dźwięki i konfetti**: Personalizacja dźwięków (np. retro, synth) oraz animacji za poprawne odpowiedzi.

### 6. Szybka wyszukiwarka (Ctrl + K)
*   Z każdego miejsca w aplikacji możesz wcisnąć `Ctrl + K`, aby otworzyć wyszukiwarkę słówek. Działa błyskawicznie, pozwala odsłuchać wymowę i odfiltrować słówka według poziomów CEFR czy ulubionych.

---

## 🛠️ Jak to u siebie uruchomić?

Aplikacja jest napisana przy użyciu biblioteki **React** oraz narzędzia **Vite**. Do stylizowania użyłem **TailwindCSS**.

Aby uruchomić projekt na swoim komputerze, wykonaj poniższe kroki w terminalu:

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/pawelhachula/LingoCards.git
cd LingoCards

# 2. Zainstaluj biblioteki
npm install

# 3. Uruchom serwer lokalny
npm run dev
```

Po wpisaniu ostatniej komendy aplikacja będzie działać pod adresem:  
👉 **`http://localhost:5173`**

---

## 📁 Struktura plików projektu
*   `src/App.jsx` — główny plik sterujący aplikacją, motywami i nawigacją.
*   `src/components/` — komponenty widoków: dashboard (Pulpit), flashcards (Fiszki), quiz (Testy), matcher (Gra w pary), library (Katalog), creator (Menedżer), stats (Statystyki), profile (Profil), settings (Ustawienia), leaderboard (Ranking), referrals (Polecenia), searchmodal (Wyszukiwarka).
*   `src/data/defaultDecks.js` — baza ponad 1000 słówek.
*   `src/index.css` — style globalne, zmienne CSS oraz definicje wszystkich motywów kolorystycznych.
*   `src/utils/effects.js` — obsługa dźwięków, animacji konfetti oraz fajerwerków.

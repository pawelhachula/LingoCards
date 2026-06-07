const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'defaultDecks.js');
let content = fs.readFileSync(filePath, 'utf8');

// Convert ESM to CommonJS dynamically to evaluate it
content = content.replace(/export\s+const\s+defaultDecks\s*=/, 'const defaultDecks =');
content += '\nmodule.exports = { defaultDecks };';

const m = { exports: {} };
const fn = new Function('module', 'exports', content);
fn(m, m.exports);

const defaultDecks = m.exports.defaultDecks;

// Card additions database for existing short decks
const additions = {
  "everyday-a1": [
    { id: "everyday-a1-7", english: "How are you?", polish: "Jak się masz?", pronunciation: "/haʊ ɑːr juː/", partOfSpeech: "phrase", exampleEnglish: "How are you? I haven't seen you in weeks.", examplePolish: "Jak się masz? Nie widziałem cię od tygodni." },
    { id: "everyday-a1-8", english: "My name is...", polish: "Nazywam się...", pronunciation: "/maɪ neɪm ɪz/", partOfSpeech: "phrase", exampleEnglish: "My name is Peter and I am from Poland.", examplePolish: "Nazywam się Peter i jestem z Polski." },
    { id: "everyday-a1-9", english: "Where is...?", polish: "Gdzie jest...?", pronunciation: "/wer ɪz/", partOfSpeech: "phrase", exampleEnglish: "Where is the bathroom, please?", examplePolish: "Gdzie jest łazienka, proszę?" },
    { id: "everyday-a1-10", english: "Help", polish: "Pomoc / Pomocy", pronunciation: "/help/", partOfSpeech: "noun", exampleEnglish: "I need help with this exercise.", examplePolish: "Potrzebuję pomocy z tym ćwiczeniem." }
  ],
  "dining-a1": [
    { id: "dining-a1-7", english: "Menu", polish: "Karta dań / menu", pronunciation: "/ˈmen.juː/", partOfSpeech: "noun", exampleEnglish: "Could we have the menu, please?", examplePolish: "Czy możemy prosić o menu?" },
    { id: "dining-a1-8", english: "Bill", polish: "Rachunek", pronunciation: "/bɪl/", partOfSpeech: "noun", exampleEnglish: "Excuse me, can I have the bill, please?", examplePolish: "Przepraszam, czy mogę prosić o rachunek?" },
    { id: "dining-a1-9", english: "Breakfast", polish: "Śniadanie", pronunciation: "/ˈbrek.fəst/", partOfSpeech: "noun", exampleEnglish: "What did you eat for breakfast today?", examplePolish: "Co jadłeś dzisiaj na śniadanie?" },
    { id: "dining-a1-10", english: "Delicious", polish: "Pyszny", pronunciation: "/dɪˈlɪʃ.əs/", partOfSpeech: "adjective", exampleEnglish: "This chocolate cake is delicious!", examplePolish: "To ciasto czekoladowe jest pyszne!" }
  ],
  "nature-a2": [
    { id: "nature-a2-7", english: "Cloud", polish: "Chmura", pronunciation: "/klaʊd/", partOfSpeech: "noun", exampleEnglish: "There is not a single cloud in the sky today.", examplePolish: "Na niebie nie ma dziś ani jednej chmury." },
    { id: "nature-a2-8", english: "River", polish: "Rzeka", pronunciation: "/ˈrɪv.ɚ/", partOfSpeech: "noun", exampleEnglish: "They decided to camp near the bank of the river.", examplePolish: "Zdecydowali się rozbić obóz blisko brzegu rzeki." },
    { id: "nature-a2-9", english: "Sunny", polish: "Słoneczny", pronunciation: "/ˈsʌn.i/", partOfSpeech: "adjective", exampleEnglish: "I hope we have sunny weather for our picnic on Saturday.", examplePolish: "Mam nadzieję na słoneczną pogodę na nasz piknik w sobotę." },
    { id: "nature-a2-10", english: "Mountain", polish: "Góra", pronunciation: "/ˈmaʊn.tən/", partOfSpeech: "noun", exampleEnglish: "Mount Everest is the highest mountain in the world.", examplePolish: "Mount Everest to najwyższa góra na świecie." }
  ],
  "travel-b1": [
    { id: "travel-b1-7", english: "Delay", polish: "Opóźnienie", pronunciation: "/dɪˈleɪ/", partOfSpeech: "noun", exampleEnglish: "The train delay was caused by heavy snowfall.", examplePolish: "Opóźnienie pociągu było spowodowane dużymi opadami śniegu." },
    { id: "travel-b1-8", english: "Passenger", polish: "Pasażer", pronunciation: "/ˈpæs.ən.dʒɚ/", partOfSpeech: "noun", exampleEnglish: "All passengers must remain seated during takeoff.", examplePolish: "Wszyscy pasażerowie muszą pozostać w fotelach podczas startu." },
    { id: "travel-b1-9", english: "Destination", polish: "Cel podróży", pronunciation: "/ˌdes.təˈneɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "After a long journey, we finally reached our destination.", examplePolish: "Po długiej podróży w końcu dotarliśmy do celu." },
    { id: "travel-b1-10", english: "To book", polish: "Zarezerwować", pronunciation: "/bʊk/", partOfSpeech: "verb", exampleEnglish: "You should book your flights early to get the best price.", examplePolish: "Powinieneś zarezerwować loty wcześniej, aby uzyskać najlepszą cenę." }
  ],
  "business-b1": [
    { id: "business-b1-7", english: "Deadline", polish: "Termin ostateczny", pronunciation: "/ˈded.laɪn/", partOfSpeech: "noun", exampleEnglish: "We must work hard to meet the project deadline.", examplePolish: "Musimy ciężko pracować, aby dotrzymać terminu projektu." },
    { id: "business-b1-8", english: "Feedback", polish: "Opinia zwrotna / feedback", pronunciation: "/ˈfiːd.bæk/", partOfSpeech: "noun", exampleEnglish: "The manager gave me constructive feedback on my presentation.", examplePolish: "Menedżer przekazał mi konstruktywny feedback na temat mojej prezentacji." },
    { id: "business-b1-9", english: "To schedule", polish: "Zaplanować / wyznaczyć termin", pronunciation: "/ˈskedʒ.uːl/", partOfSpeech: "verb", exampleEnglish: "Let's schedule a brief call for tomorrow morning.", examplePolish: "Zaplanujmy krótką rozmowę na jutro rano." },
    { id: "business-b1-10", english: "Employee", polish: "Pracownik", pronunciation: "/ɪmˈplɔɪ.iː/", partOfSpeech: "noun", exampleEnglish: "The company has over five hundred employees worldwide.", examplePolish: "Wszyscy pracownicy otrzymali podwyżkę roczną." }
  ],
  "tech-b1": [
    { id: "tech-b1-7", english: "Data", polish: "Dane", pronunciation: "/ˈdeɪ.t̬ə/", partOfSpeech: "noun", exampleEnglish: "Our system backs up all user data every night.", examplePolish: "Nasz system tworzy kopię zapasową wszystkich danych użytkowników każdej nocy." },
    { id: "tech-b1-8", english: "To install", polish: "Zainstalować", pronunciation: "/ɪnˈstɑːl/", partOfSpeech: "verb", exampleEnglish: "You need to install the latest security updates.", examplePolish: "Musisz zainstalować najnowsze aktualizacje bezpieczeństwa." },
    { id: "tech-b1-9", english: "Device", polish: "Urządzenie", pronunciation: "/dɪˈvaɪs/", partOfSpeech: "noun", exampleEnglish: "Make sure to connect your mobile device to the Wi-Fi.", examplePolish: "Upewnij się, że podłączyłeś swoje urządzenie mobilne do Wi-Fi." },
    { id: "tech-b1-10", english: "Software", polish: "Oprogramowanie", pronunciation: "/ˈsɑːft.wer/", partOfSpeech: "noun", exampleEnglish: "LingoCards is a software application designed for learning English.", examplePolish: "LingoCards to oprogramowanie stworzone do nauki angielskiego." }
  ],
  "culture-b1": [
    { id: "culture-b1-7", english: "Review", polish: "Recenzja", pronunciation: "/rɪˈvjuː/", partOfSpeech: "noun", exampleEnglish: "The new film received positive reviews from critics.", examplePolish: "Nowy film otrzymał pozytywne recenzje od krytyków." },
    { id: "culture-b1-8", english: "Festival", polish: "Festiwal", pronunciation: "/ˈfes.tə.vəl/", partOfSpeech: "noun", exampleEnglish: "We are planning to attend the international music festival.", examplePolish: "Planujemy wziąć udział w międzynarodowym festiwalu muzycznym." },
    { id: "culture-b1-9", english: "To entertain", polish: "Zapewniać rozrywkę", pronunciation: "/ˌen.t̬ɚˈteɪn/", partOfSpeech: "verb", exampleEnglish: "The magician entertained the kids for two hours.", examplePolish: "Magik zapewniał dzieciom rozrywkę przez dwie godziny." },
    { id: "culture-b1-10", english: "Creativity", polish: "Kreatywność", pronunciation: "/ˌkriː.eɪˈtɪv.ə.t̬i/", partOfSpeech: "noun", exampleEnglish: "Children often show a high level of natural creativity.", examplePolish: "Dzieci często wykazują wysoki poziom naturalnej kreatywności." }
  ],
  "nature-b1": [
    { id: "nature-b1-7", english: "Eco-friendly", polish: "Przyjazny dla środowiska", pronunciation: "/ˌiː.koʊˈfrend.li/", partOfSpeech: "adjective", exampleEnglish: "Using reusable bags is an eco-friendly choice.", examplePolish: "Używanie toreb wielorazowych to wybór przyjazny dla środowiska." },
    { id: "nature-b1-8", english: "Biodiversity", polish: "Bioróżnorodność", pronunciation: "/ˌbaɪ.oʊ.dɪˈvɝː.sə.t̬i/", partOfSpeech: "noun", exampleEnglish: "Protecting rainforests preserves global biodiversity.", examplePolish: "Ochrona lasów deszczowych pozwala zachować globalną bioróżnorodność." },
    { id: "nature-b1-9", english: "To devastate", polish: "Spustoszyć / zdewastować", pronunciation: "/ˈdev.ə.steɪt/", partOfSpeech: "verb", exampleEnglish: "The forest fire devastated thousands of acres of land.", examplePolish: "Pożar lasu spustoszył tysiące akrów ziemi." },
    { id: "nature-b1-10", english: "Resource", polish: "Zasób", pronunciation: "/ˈriː.sɔːrs/", partOfSpeech: "noun", exampleEnglish: "Fresh water is a precious natural resource.", examplePolish: "Świeża woda to cenny zasób naturalny." }
  ],
  "culture-b2": [
    { id: "culture-b2-7", english: "Mastery", polish: "Mistrzostwo / biegłość", pronunciation: "/ˈmæs.tɚ.i/", partOfSpeech: "noun", exampleEnglish: "Her painting demonstrates a complete mastery of light and shadow.", examplePolish: "Jej malarstwo wykazuje całkowite mistrzostwo w operowaniu światłem i cieniem." },
    { id: "culture-b2-8", english: "To critique", polish: "Oceniać krytycznie / recenzować", pronunciation: "/krɪˈtiːk/", partOfSpeech: "verb", exampleEnglish: "Students were asked to critique each other's art projects.", examplePolish: "Uczniowie zostali poproszeni o krytyczną ocenę projektów artystycznych kolegów." },
    { id: "culture-b2-9", english: "Inspiring", polish: "Inspirujący", pronunciation: "/ɪnˈspaɪr.ɪŋ/", partOfSpeech: "adjective", exampleEnglish: "His speech on persistence was highly inspiring.", examplePolish: "Jego przemówienie o wytrwałości było bardzo inspirujące." },
    { id: "culture-b2-10", english: "Interpretation", polish: "Interpretacja", pronunciation: "/ɪnˌtɝː.prəˈteɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "Every art gallery visitor may have a different interpretation.", examplePolish: "Każdy zwiedzający galerię sztuki może mieć inną interpretację." }
  ],
  "business-c1": [
    { id: "business-c1-7", english: "Dividend", polish: "Dywidenda", pronunciation: "/ˈdɪv.ə.dend/", partOfSpeech: "noun", exampleEnglish: "The company paid out a record dividend to its shareholders.", examplePolish: "Spółka wypłaciła rekordową dywidendę swoim akcjonariuszom." },
    { id: "business-c1-8", english: "To leverage", polish: "Wykorzystać / lewarować", pronunciation: "/ˈlev.ɚ.ɪdʒ/", partOfSpeech: "verb", exampleEnglish: "We want to leverage social media to boost sales.", examplePolish: "Chcemy wykorzystać media społecznościowe, aby zwiększyć sprzedaż." },
    { id: "business-c1-9", english: "Compliance", polish: "Zgodność z przepisami", pronunciation: "/kəmˈplaɪ.əns/", partOfSpeech: "noun", exampleEnglish: "The firm audits its accounts to ensure full tax compliance.", examplePolish: "Firma audytuje swoje konta, aby zapewnić pełną zgodność podatkową." },
    { id: "business-c1-10", english: "Equity", polish: "Udział w kapitale / kapitał własny", pronunciation: "/ˈek.wə.t̬i/", partOfSpeech: "noun", exampleEnglish: "He decided to sell his equity in the company for ten million dollars.", examplePolish: "Zdecydował się sprzedać swoje udziały w firmie za dziesięć milionów dolarów." }
  ]
};

// Add cards to existing decks
defaultDecks.forEach(deck => {
  if (additions[deck.id]) {
    const originalIds = new Set(deck.cards.map(c => c.id));
    additions[deck.id].forEach(card => {
      if (!originalIds.has(card.id)) {
        deck.cards.push(card);
      }
    });
  }
});

// Define 4 new decks (2 for C1, 2 for C2)
const newDecks = [
  {
    id: "academic-c1",
    title: "Academic Writing (C1)",
    polishTitle: "Pisanie akademickie",
    category: "general",
    level: "C1",
    description: "Formal and academic vocabulary for researching, writing reports, and presenting thesis arguments.",
    icon: "GraduationCap",
    color: "#475569",
    cards: [
      { id: "academic-c1-1", english: "Hypothesis", polish: "Hipoteza", pronunciation: "/haɪˈpɑː.θə.sɪs/", partOfSpeech: "noun", exampleEnglish: "The researcher formulated a hypothesis based on early observations.", examplePolish: "Badacz sformułował hipotezę na podstawie wczesnych obserwacji." },
      { id: "academic-c1-2", english: "Empirical", polish: "Empiryczny", pronunciation: "/ɪmˈpɪr.ɪ.kəl/", partOfSpeech: "adjective", exampleEnglish: "There is no empirical evidence to support this claim.", examplePolish: "Nie ma dowodów empirycznych na poparcie tego twierdzenia." },
      { id: "academic-c1-3", english: "Methodology", polish: "Metodologia", pronunciation: "/ˌmeθ.əˈdɑː.lə.dʒi/", partOfSpeech: "noun", exampleEnglish: "In the second chapter, we describe our research methodology.", examplePolish: "W drugim rozdziale opisujemy naszą metodologię badawczą." },
      { id: "academic-c1-4", english: "To substantiate", polish: "Uzasadnić / poprzeć dowodami", pronunciation: "/səbˈstæn.ʃi.eɪt/", partOfSpeech: "verb", exampleEnglish: "You must provide data to substantiate your arguments.", examplePolish: "Musisz dostarczyć dane, aby uzasadnić swoje argumenty." },
      { id: "academic-c1-5", english: "Analysis", polish: "Analiza", pronunciation: "/əˈnæl.ə.sɪs/", partOfSpeech: "noun", exampleEnglish: "A statistical analysis of the survey results was conducted.", examplePolish: "Przeprowadzono analizę statystyczną wyników ankiety." },
      { id: "academic-c1-6", english: "Framework", polish: "Ramy / struktura", pronunciation: "/ˈfreɪm.wɝːk/", partOfSpeech: "noun", exampleEnglish: "The research was conducted within a strict theoretical framework.", examplePolish: "Badanie zostało przeprowadzone w ścisłych ramach teoretycznych." },
      { id: "academic-c1-7", english: "Correlation", polish: "Korelacja", pronunciation: "/ˌkɔːr.əˈleɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "Studies show a high correlation between education and income.", examplePolish: "Badania pokazują wysoką korelację między wykształceniem a dochodami." },
      { id: "academic-c1-8", english: "To synthesize", polish: "Syntetyzować / łączyć", pronunciation: "/ˈsɪn.θə.saɪz/", partOfSpeech: "verb", exampleEnglish: "The literature review synthesizes findings from fifty papers.", examplePolish: "Przegląd literatury syntetyzuje wnioski z pięćdziesięciu prac." },
      { id: "academic-c1-9", english: "Cognitive", polish: "Poznawczy", pronunciation: "/ˈkɑːɡ.nə.t̬ɪv/", partOfSpeech: "adjective", exampleEnglish: "Reading has positive effects on children's cognitive development.", examplePolish: "Czytanie ma pozytywny wpływ na rozwój poznawczy dzieci." },
      { id: "academic-c1-10", english: "Objective", polish: "Obiektywny", pronunciation: "/əbˈdʒek.tɪv/", partOfSpeech: "adjective", exampleEnglish: "Scientists must try to remain completely objective in their evaluations.", examplePolish: "Naukowcy muszą starać się pozostać całkowicie obiektywni w swoich ocenach." }
    ]
  },
  {
    id: "social-c1",
    title: "Social Issues (C1)",
    polishTitle: "Problemy społeczne",
    category: "general",
    level: "C1",
    description: "Discuss global demographics, migration, socio-economic challenges, and public policy.",
    icon: "Globe",
    color: "#3b82f6",
    cards: [
      { id: "social-c1-1", english: "Demographics", polish: "Demografia", pronunciation: "/ˌdem.əˈɡræf.ɪks/", partOfSpeech: "noun", exampleEnglish: "Changing demographics pose challenges for the pension system.", examplePolish: "Zmieniająca się demografia stawia wyzwania przed systemem emerytalnym." },
      { id: "social-c1-2", english: "Discrepancy", polish: "Rozbieżność", pronunciation: "/dɪsˈkrep.ən.si/", partOfSpeech: "noun", exampleEnglish: "We noticed a major discrepancy between the two official statistics.", examplePolish: "Zauważyliśmy poważną rozbieżność między dwiema oficjalnymi statystykami." },
      { id: "social-c1-3", english: "Marginalized", polish: "Marginalizowany / wykluczony", pronunciation: "/ˈmɑːr.dʒɪ.nəl.aɪzd/", partOfSpeech: "adjective", exampleEnglish: "Government programs aim to support marginalized communities.", examplePolish: "Programy rządowe mają na celu wspieranie zmarginalizowanych społeczności." },
      { id: "social-c1-4", english: "To trigger", polish: "Wywołać / wyzwolić", pronunciation: "/ˈtrɪɡ.ɚ/", partOfSpeech: "verb", exampleEnglish: "The economic crisis triggered widespread public protests.", examplePolish: "Kryzys gospodarczy wywołał powszechne protesty społeczne." },
      { id: "social-c1-5", english: "Prejudice", polish: "Uprzedzenie", pronunciation: "/ˈpredʒ.ə.dɪs/", partOfSpeech: "noun", exampleEnglish: "Education plays a key role in eliminating cultural prejudice.", examplePolish: "Edukacja odgrywa kluczową rolę w eliminowaniu uprzedzeń kulturowych." },
      { id: "social-c1-6", english: "Inequality", polish: "Nierówność", pronunciation: "/ˌɪn.ɪˈkwɑː.lə.t̬i/", partOfSpeech: "noun", exampleEnglish: "Income inequality has risen in many developed countries.", examplePolish: "Nierówność dochodowa wzrosła w wielu krajach rozwiniętych." },
      { id: "social-c1-7", english: "Integration", polish: "Integracja", pronunciation: "/ˌɪn.t̬əˈgreɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "Language learning is essential for successful immigrant integration.", examplePolish: "Nauka języka jest kluczowa dla udanej integracji imigrantów." },
      { id: "social-c1-8", english: "To address", polish: "Zająć się (problemem)", pronunciation: "/əˈdres/", partOfSpeech: "verb", exampleEnglish: "The prime minister promised to address the housing crisis immediately.", examplePolish: "Premier obiecał natychmiast zająć się kryzysem mieszkaniowym." },
      { id: "social-c1-9", english: "Vulnerable", polish: "Wrażliwy / bezbronny", pronunciation: "/ˈvʌl.nɚ.ə.bəl/", partOfSpeech: "adjective", exampleEnglish: "Elderly people are particularly vulnerable to cold winter weather.", examplePolish: "Osoby starsze są szczególnie podatne na mroźną zimową pogodę." },
      { id: "social-c1-10", english: "Advancement", polish: "Postęp / awans", pronunciation: "/ədˈvæns.mənt/", partOfSpeech: "noun", exampleEnglish: "Technological advancement changes the structure of the labor market.", examplePolish: "Postęp technologiczny zmienia strukturę rynku pracy." }
    ]
  },
  {
    id: "nuance-c2",
    title: "Mastering Nuance (C2)",
    polishTitle: "Opanowanie niuansów",
    category: "general",
    level: "C2",
    description: "Subtle distinctions, idioms, and advanced vocabulary to express delicate shades of meaning.",
    icon: "Flame",
    color: "#ec4899",
    cards: [
      { id: "nuance-c2-1", english: "Subtle", polish: "Subtelny", pronunciation: "/ˈsʌt̬.əl/", partOfSpeech: "adjective", exampleEnglish: "A master diplomat uses subtle cues to guide negotiations.", examplePolish: "Doświadczony dyplomata używa subtelnych wskazówek, by kierować negocjacjami." },
      { id: "nuance-c2-2", english: "Ambiguity", polish: "Dwuznaczność / niejasność", pronunciation: "/ˌæm.bɪˈɡjuː.ə.t̬i/", partOfSpeech: "noun", exampleEnglish: "The contract was rewritten to eliminate any legal ambiguity.", examplePolish: "Umowa została przepisana, aby wyeliminować wszelkie niejasności prawne." },
      { id: "nuance-c2-3", english: "Euphemism", polish: "Eufemizm", pronunciation: "/ˈjuː.fə.mɪ.zəm/", partOfSpeech: "noun", exampleEnglish: "Pass away is a common euphemism for die.", examplePolish: "Odejść to powszechny eufemizm słowa umrzeć." },
      { id: "nuance-c2-4", english: "To imply", polish: "Sugerować / dawać do zrozumienia", pronunciation: "/ɪmˈplaɪ/", partOfSpeech: "verb", exampleEnglish: "Although she didn't say it, she implied that the plan was flawed.", examplePolish: "Choć tego nie powiedziała, dała do zrozumienia, że plan ma wady." },
      { id: "nuance-c2-5", english: "Connotation", polish: "Konotacja / zabarwienie", pronunciation: "/ˌkɑː.nəˈteɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "The word cheap has a negative connotation compared to inexpensive.", examplePolish: "Słowo tani ma negatywną konotację w porównaniu do niedrogi." },
      { id: "nuance-c2-6", english: "Insinuation", polish: "Insinuacja", pronunciation: "/ɪnˌsɪn.juˈeɪ.ʃən/", partOfSpeech: "noun", exampleEnglish: "We rejected the wild insinuation that we broke the law.", examplePolish: "Odrzuciliśmy szalone insynuacje, jakobyśmy złamali prawo." },
      { id: "nuance-c2-7", english: "Delicate", polish: "Delikatny / drażliwy", pronunciation: "/ˈdel.ə.kət/", partOfSpeech: "adjective", exampleEnglish: "The peace talks are at a delicate stage right now.", examplePolish: "Rozmowy pokojowe są obecnie na delikatnym etapie." },
      { id: "nuance-c2-8", english: "Implicit", polish: "Ukryty / dorozumiany", pronunciation: "/ɪmˈplɪs.ɪt/", partOfSpeech: "adjective", exampleEnglish: "There was an implicit agreement that no one would talk to the media.", examplePolish: "Istniało dorozumiane porozumienie, że nikt nie będzie rozmawiał z mediami." },
      { id: "nuance-c2-9", english: "Nuanced", polish: "Niuansowany / subtelny", pronunciation: "/ˈnuː.ɑːnst/", partOfSpeech: "adjective", exampleEnglish: "He gave a nuanced explanation of the complicated political situation.", examplePolish: "Przedstawił pełne subtelności wyjaśnienie skomplikowanej sytuacji politycznej." },
      { id: "nuance-c2-10", english: "To discern", polish: "Dostrzec / rozeznać", pronunciation: "/dɪˈsɝːn/", partOfSpeech: "verb", exampleEnglish: "It is difficult to discern the truth in this conflict.", examplePolish: "Trudno jest rozeznać prawdę w tym konflikcie." }
    ]
  },
  {
    id: "literature-c2",
    title: "Literature & Philosophy (C2)",
    polishTitle: "Literatura i filozofia",
    category: "culture",
    level: "C2",
    description: "Sophisticated terminology for literary criticism, philosophical schools, and abstract reasoning.",
    icon: "BookOpen",
    color: "#a855f7",
    cards: [
      { id: "literature-c2-1", english: "Existential", polish: "Egzystencjalny", pronunciation: "/ˌeɡ.zɪˈsten.ʃəl/", partOfSpeech: "adjective", exampleEnglish: "The novel deals with existential isolation and the meaning of life.", examplePolish: "Powieść traktuje o egzystencjalnej izolacji i sensie życia." },
      { id: "literature-c2-2", english: "Epistemology", polish: "Epistemologia", pronunciation: "/ɪˌpɪs.təˈmɑː.lə.dʒi/", partOfSpeech: "noun", exampleEnglish: "Epistemology is the branch of philosophy concerned with the theory of knowledge.", examplePolish: "Epistemologia to dział filozofii zajmujący się teorią poznania." },
      { id: "literature-c2-3", english: "Metaphor", polish: "Metafora", pronunciation: "/ˈmet.ə.fɔːr/", partOfSpeech: "noun", exampleEnglish: "The writer uses the stormy sea as a metaphor for human passion.", examplePolish: "Pisarz używa wzburzonego morza jako metafory ludzkich namiętności." },
      { id: "literature-c2-4", english: "To transcend", polish: "Przekraczać / wykraczać poza", pronunciation: "/trænˈsend/", partOfSpeech: "verb", exampleEnglish: "Great works of art transcend their historical time period.", examplePolish: "Wielkie dzieła sztuki wykraczają poza swój historyczny okres." },
      { id: "literature-c2-5", english: "Paradigm", polish: "Paradygmat / wzorzec", pronunciation: "/ˈpær.ə.daɪm/", partOfSpeech: "noun", exampleEnglish: "The scientific discovery shifted the entire psychological paradigm.", examplePolish: "Odkrycie naukowe przesunęło cały paradygmat psychologiczny." },
      { id: "literature-c2-6", english: "Nihilism", polish: "Nihilizm", pronunciation: "/ˈnaɪ.ə.lɪ.zəm/", partOfSpeech: "noun", exampleEnglish: "His extreme nihilism led him to believe that values are meaningless.", examplePolish: "Jego skrajny nihilizm doprowadził go do przekonania, że wartości są bez znaczenia." },
      { id: "literature-c2-7", english: "Aesthetics", polish: "Estetyka (dziedzina)", pronunciation: "/esˈθet.ɪks/", partOfSpeech: "noun", exampleEnglish: "Aesthetics is a core branch of philosophy studying art and beauty.", examplePolish: "Estetyka to główny dział filozofii badający sztukę i piękno." },
      { id: "literature-c2-8", english: "To ponder", polish: "Rozważać / rozmyślać", pronunciation: "/ˈpɑːn.dɚ/", partOfSpeech: "verb", exampleEnglish: "She sat by the window, pondering the mysteries of the universe.", examplePolish: "Siedziała przy oknie, rozmyślając nad tajemnicami wszechświata." },
      { id: "literature-c2-9", english: "Dogma", polish: "Dogmat / pewnik", pronunciation: "/ˈdɔːɡ.mə/", partOfSpeech: "noun", exampleEnglish: "Critical thinkers question religious and political dogmas.", examplePolish: "Krytyczni myśliciele kwestionują dogmaty religijne i polityczne." },
      { id: "literature-c2-10", english: "Altruism", polish: "Altruizm", pronunciation: "/ˈæl.tru.ɪ.zəm/", partOfSpeech: "noun", exampleEnglish: "Pure altruism is doing good for others without expecting a reward.", examplePolish: "Czysty altruizm to czynienie dobra dla innych bez oczekiwania nagrody." }
    ]
  }
];

// Append new C1/C2 decks if they don't exist
newDecks.forEach(newDeck => {
  if (!defaultDecks.some(d => d.id === newDeck.id)) {
    defaultDecks.push(newDeck);
  }
});

// Format back as ESM default export
const newContent = 'export const defaultDecks = ' + JSON.stringify(defaultDecks, null, 2) + ';\n';
fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully expanded decks and added new C1/C2 decks!");

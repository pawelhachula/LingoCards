const fs = require('fs');

const phrasesDecks = [
  // --- A1 ---
  {
    id: 'phrases-a1-1',
    title: 'Codzienne zwroty (A1)',
    polishTitle: 'Codzienne zwroty (Część 1)',
    category: 'everyday',
    level: 'A1',
    description: 'Podstawowe, najczęściej używane zwroty na poziomie początkującym.',
    icon: 'MessageSquare',
    color: '#10b981',
    cards: [
      { id: 'pa11-1', english: 'How are you?', polish: 'Jak się masz?', pronunciation: '/haʊ ɑr ju/', partOfSpeech: 'phrase', exampleEnglish: 'Hi John, how are you?', examplePolish: 'Cześć John, jak się masz?' },
      { id: 'pa11-2', english: 'I am fine, thank you', polish: 'Czuję się dobrze, dziękuję', pronunciation: '/aɪ æm faɪn θæŋk ju/', partOfSpeech: 'phrase', exampleEnglish: 'I am fine, thank you. And you?', examplePolish: 'Czuję się dobrze, dziękuję. A ty?' },
      { id: 'pa11-3', english: 'What is your name?', polish: 'Jak masz na imię?', pronunciation: '/wɒt ɪz jɔːr neɪm/', partOfSpeech: 'phrase', exampleEnglish: 'Hello, what is your name?', examplePolish: 'Cześć, jak masz na imię?' },
      { id: 'pa11-4', english: 'My name is...', polish: 'Mam na imię...', pronunciation: '/maɪ neɪm ɪz/', partOfSpeech: 'phrase', exampleEnglish: 'My name is Anna.', examplePolish: 'Mam na imię Anna.' },
      { id: 'pa11-5', english: 'Where are you from?', polish: 'Skąd pochodzisz?', pronunciation: '/weər ɑr ju frɒm/', partOfSpeech: 'phrase', exampleEnglish: 'I am from Poland. Where are you from?', examplePolish: 'Jestem z Polski. Skąd pochodzisz?' },
      { id: 'pa11-6', english: 'I am from...', polish: 'Pochodzę z...', pronunciation: '/aɪ æm frɒm/', partOfSpeech: 'phrase', exampleEnglish: 'I am from London.', examplePolish: 'Pochodzę z Londynu.' },
      { id: 'pa11-7', english: 'Nice to meet you', polish: 'Miło mi cię poznać', pronunciation: '/naɪs tu miːt ju/', partOfSpeech: 'phrase', exampleEnglish: 'Nice to meet you too.', examplePolish: 'Mnie również miło cię poznać.' },
      { id: 'pa11-8', english: 'Have a good day', polish: 'Miłego dnia', pronunciation: '/hæv ə gʊd deɪ/', partOfSpeech: 'phrase', exampleEnglish: 'Goodbye, have a good day!', examplePolish: 'Do widzenia, miłego dnia!' },
      { id: 'pa11-9', english: 'I do not understand', polish: 'Nie rozumiem', pronunciation: '/aɪ duː nɒt ˌʌndərˈstænd/', partOfSpeech: 'phrase', exampleEnglish: 'I am sorry, I do not understand.', examplePolish: 'Przepraszam, nie rozumiem.' },
      { id: 'pa11-10', english: 'Can you repeat, please?', polish: 'Czy możesz powtórzyć, proszę?', pronunciation: '/kæn ju rɪˈpiːt pliːz/', partOfSpeech: 'phrase', exampleEnglish: 'Can you repeat, please? I did not hear you.', examplePolish: 'Czy możesz powtórzyć, proszę? Nie słyszałem cię.' }
    ]
  },
  {
    id: 'phrases-a1-2',
    title: 'Podstawy konwersacji (A1)',
    polishTitle: 'Podstawy konwersacji (Część 2)',
    category: 'everyday',
    level: 'A1',
    description: 'Niezbędne zwroty pomagające w pierwszych konwersacjach.',
    icon: 'Users',
    color: '#10b981',
    cards: [
      { id: 'pa12-1', english: 'Excuse me', polish: 'Przepraszam (zaczepiając)', pronunciation: '/ɪkˈskjuːz mi/', partOfSpeech: 'phrase', exampleEnglish: 'Excuse me, where is the toilet?', examplePolish: 'Przepraszam, gdzie jest toaleta?' },
      { id: 'pa12-2', english: 'I am sorry', polish: 'Przepraszam (za coś)', pronunciation: '/aɪ æm ˈsɒri/', partOfSpeech: 'phrase', exampleEnglish: 'I am sorry I am late.', examplePolish: 'Przepraszam za spóźnienie.' },
      { id: 'pa12-3', english: 'How old are you?', polish: 'Ile masz lat?', pronunciation: '/haʊ oʊld ɑr ju/', partOfSpeech: 'phrase', exampleEnglish: 'How old are you? I am 20.', examplePolish: 'Ile masz lat? Mam 20 lat.' },
      { id: 'pa12-4', english: 'I am lost', polish: 'Zgubiłem się', pronunciation: '/aɪ æm lɒst/', partOfSpeech: 'phrase', exampleEnglish: 'Can you help me? I am lost.', examplePolish: 'Możesz mi pomóc? Zgubiłem się.' },
      { id: 'pa12-5', english: 'How much is it?', polish: 'Ile to kosztuje?', pronunciation: '/haʊ mʌtʃ ɪz ɪt/', partOfSpeech: 'phrase', exampleEnglish: 'How much is it? It is five dollars.', examplePolish: 'Ile to kosztuje? To kosztuje pięć dolarów.' },
      { id: 'pa12-6', english: 'I would like...', polish: 'Chciałbym...', pronunciation: '/aɪ wʊd laɪk/', partOfSpeech: 'phrase', exampleEnglish: 'I would like a coffee, please.', examplePolish: 'Poproszę kawę.' },
      { id: 'pa12-7', english: 'Yes, please', polish: 'Tak, proszę', pronunciation: '/jɛs pliːz/', partOfSpeech: 'phrase', exampleEnglish: 'Do you want some tea? Yes, please.', examplePolish: 'Chcesz herbaty? Tak, proszę.' },
      { id: 'pa12-8', english: 'No, thank you', polish: 'Nie, dziękuję', pronunciation: '/noʊ θæŋk ju/', partOfSpeech: 'phrase', exampleEnglish: 'More cake? No, thank you.', examplePolish: 'Więcej ciasta? Nie, dziękuję.' },
      { id: 'pa12-9', english: 'Do you speak English?', polish: 'Czy mówisz po angielsku?', pronunciation: '/du ju spiːk ˈɪŋglɪʃ/', partOfSpeech: 'phrase', exampleEnglish: 'Excuse me, do you speak English?', examplePolish: 'Przepraszam, czy mówisz po angielsku?' },
      { id: 'pa12-10', english: 'Just a moment', polish: 'Chwileczkę', pronunciation: '/dʒʌst ə ˈmoʊmənt/', partOfSpeech: 'phrase', exampleEnglish: 'Just a moment, please.', examplePolish: 'Chwileczkę, proszę.' }
    ]
  },
  // --- A2 ---
  {
    id: 'phrases-a2-1',
    title: 'W drodze i w sklepie (A2)',
    polishTitle: 'W drodze i w sklepie (Część 1)',
    category: 'travel',
    level: 'A2',
    description: 'Zwroty przydatne w sklepie, w restauracji i na ulicy.',
    icon: 'ShoppingCart',
    color: '#059669',
    cards: [
      { id: 'pa21-1', english: 'Can I help you?', polish: 'W czym mogę pomóc?', pronunciation: '/kæn aɪ hɛlp ju/', partOfSpeech: 'phrase', exampleEnglish: 'Can I help you find something?', examplePolish: 'W czym mogę pomóc w znalezieniu czegoś?' },
      { id: 'pa21-2', english: 'I am just looking', polish: 'Tylko się rozglądam', pronunciation: '/aɪ æm dʒʌst ˈlʊkɪŋ/', partOfSpeech: 'phrase', exampleEnglish: 'No thanks, I am just looking.', examplePolish: 'Nie, dziękuję, tylko się rozglądam.' },
      { id: 'pa21-3', english: 'Can I try it on?', polish: 'Czy mogę to przymierzyć?', pronunciation: '/kæn aɪ traɪ ɪt ɒn/', partOfSpeech: 'phrase', exampleEnglish: 'I like this shirt. Can I try it on?', examplePolish: 'Podoba mi się ta koszula. Czy mogę ją przymierzyć?' },
      { id: 'pa21-4', english: 'Do you take credit cards?', polish: 'Czy akceptujecie karty kredytowe?', pronunciation: '/du ju teɪk ˈkrɛdɪt kɑrdz/', partOfSpeech: 'phrase', exampleEnglish: 'I do not have cash. Do you take credit cards?', examplePolish: 'Nie mam gotówki. Czy akceptujecie karty kredytowe?' },
      { id: 'pa21-5', english: 'A table for two, please', polish: 'Stolik dla dwojga, proszę', pronunciation: '/ə ˈteɪbəl fɔr tuː pliːz/', partOfSpeech: 'phrase', exampleEnglish: 'Good evening, a table for two, please.', examplePolish: 'Dobry wieczór, poproszę stolik dla dwojga.' },
      { id: 'pa21-6', english: 'Could we have the bill?', polish: 'Czy moglibyśmy prosić o rachunek?', pronunciation: '/kʊd wi hæv ðə bɪl/', partOfSpeech: 'phrase', exampleEnglish: 'We are ready to leave. Could we have the bill?', examplePolish: 'Jesteśmy gotowi do wyjścia. Czy moglibyśmy prosić o rachunek?' },
      { id: 'pa21-7', english: 'Keep the change', polish: 'Reszty nie trzeba', pronunciation: '/kiːp ðə tʃeɪndʒ/', partOfSpeech: 'phrase', exampleEnglish: 'Here is twenty dollars. Keep the change.', examplePolish: 'Oto dwadzieścia dolarów. Reszty nie trzeba.' },
      { id: 'pa21-8', english: 'Turn left / Turn right', polish: 'Skręć w lewo / Skręć w prawo', pronunciation: '/tɜrn lɛft / tɜrn raɪt/', partOfSpeech: 'phrase', exampleEnglish: 'Go straight and turn left.', examplePolish: 'Idź prosto i skręć w lewo.' },
      { id: 'pa21-9', english: 'Is it far?', polish: 'Czy to daleko?', pronunciation: '/ɪz ɪt fɑr/', partOfSpeech: 'phrase', exampleEnglish: 'Is it far from here to the station?', examplePolish: 'Czy stąd jest daleko na stację?' },
      { id: 'pa21-10', english: 'I have a reservation', polish: 'Mam rezerwację', pronunciation: '/aɪ hæv ə ˌrɛzərˈveɪʃən/', partOfSpeech: 'phrase', exampleEnglish: 'Hello, I have a reservation under the name Smith.', examplePolish: 'Dzień dobry, mam rezerwację na nazwisko Smith.' }
    ]
  },
  {
    id: 'phrases-a2-2',
    title: 'Spotkania i znajomi (A2)',
    polishTitle: 'Spotkania i znajomi (Część 2)',
    category: 'everyday',
    level: 'A2',
    description: 'Umawianie się na spotkania i luźne rozmowy ze znajomymi.',
    icon: 'Coffee',
    color: '#059669',
    cards: [
      { id: 'pa22-1', english: 'What do you do?', polish: 'Czym się zajmujesz? (zawodowo)', pronunciation: '/wɒt du ju du/', partOfSpeech: 'phrase', exampleEnglish: 'What do you do for a living?', examplePolish: 'Czym się zajmujesz zawodowo?' },
      { id: 'pa22-2', english: 'What are you doing?', polish: 'Co teraz robisz?', pronunciation: '/wɒt ɑr ju ˈduɪŋ/', partOfSpeech: 'phrase', exampleEnglish: 'What are you doing right now?', examplePolish: 'Co teraz robisz?' },
      { id: 'pa22-3', english: 'Are you free tonight?', polish: 'Masz wolne dziś wieczorem?', pronunciation: '/ɑr ju friː təˈnaɪt/', partOfSpeech: 'phrase', exampleEnglish: 'Are you free tonight? Let us go to the cinema.', examplePolish: 'Masz czas dziś wieczorem? Chodźmy do kina.' },
      { id: 'pa22-4', english: 'That sounds great', polish: 'Brzmi świetnie', pronunciation: '/ðæt saʊndz greɪt/', partOfSpeech: 'phrase', exampleEnglish: 'Pizza for dinner? That sounds great.', examplePolish: 'Pizza na obiad? Brzmi świetnie.' },
      { id: 'pa22-5', english: 'I am looking forward to it', polish: 'Nie mogę się doczekać', pronunciation: '/aɪ æm ˈlʊkɪŋ ˈfɔrwərd tu ɪt/', partOfSpeech: 'phrase', exampleEnglish: 'See you tomorrow. I am looking forward to it.', examplePolish: 'Do zobaczenia jutro. Nie mogę się doczekać.' },
      { id: 'pa22-6', english: 'Do not worry about it', polish: 'Nie przejmuj się tym', pronunciation: '/du nɒt ˈwʌri əˈbaʊt ɪt/', partOfSpeech: 'phrase', exampleEnglish: 'I broke your cup. Do not worry about it.', examplePolish: 'Stłukłem twój kubek. Nie przejmuj się.' },
      { id: 'pa22-7', english: 'It does not matter', polish: 'To nie ma znaczenia', pronunciation: '/ɪt dʌz nɒt ˈmætər/', partOfSpeech: 'phrase', exampleEnglish: 'Red or blue? It does not matter.', examplePolish: 'Czerwony czy niebieski? To nie ma znaczenia.' },
      { id: 'pa22-8', english: 'What do you mean?', polish: 'Co masz na myśli?', pronunciation: '/wɒt du ju miːn/', partOfSpeech: 'phrase', exampleEnglish: 'I am confused. What do you mean?', examplePolish: 'Jestem zdezorientowany. Co masz na myśli?' },
      { id: 'pa22-9', english: 'Could you spell that?', polish: 'Czy mógłbyś to przeliterować?', pronunciation: '/kʊd ju spɛl ðæt/', partOfSpeech: 'phrase', exampleEnglish: 'My surname is Kowalski. Could you spell that?', examplePolish: 'Moje nazwisko to Kowalski. Czy mógłbyś to przeliterować?' },
      { id: 'pa22-10', english: 'See you later', polish: 'Do zobaczenia później', pronunciation: '/siː ju ˈleɪtər/', partOfSpeech: 'phrase', exampleEnglish: 'I have to go now. See you later!', examplePolish: 'Muszę już iść. Do zobaczenia później!' }
    ]
  },
  // --- B1 ---
  {
    id: 'phrases-b1-1',
    title: 'Wyrażanie opinii (B1)',
    polishTitle: 'Wyrażanie opinii (Część 1)',
    category: 'general',
    level: 'B1',
    description: 'Zwroty służące do wyrażania własnego zdania i dyskusji.',
    icon: 'ThumbsUp',
    color: '#3b82f6',
    cards: [
      { id: 'pb11-1', english: 'In my opinion...', polish: 'Moim zdaniem...', pronunciation: '/ɪn maɪ əˈpɪnjən/', partOfSpeech: 'phrase', exampleEnglish: 'In my opinion, this is the best solution.', examplePolish: 'Moim zdaniem, to najlepsze rozwiązanie.' },
      { id: 'pb11-2', english: 'To be honest...', polish: 'Szczerze mówiąc...', pronunciation: '/tu bi ˈɒnɪst/', partOfSpeech: 'phrase', exampleEnglish: "To be honest, I didn't like the movie.", examplePolish: 'Szczerze mówiąc, film mi się nie podobał.' },
      { id: 'pb11-3', english: 'I completely agree', polish: 'Zgadzam się w pełni', pronunciation: '/aɪ kəmˈpliːtli əˈgriː/', partOfSpeech: 'phrase', exampleEnglish: "That's a great point. I completely agree.", examplePolish: 'To świetny argument. W pełni się zgadzam.' },
      { id: 'pb11-4', english: 'I am not sure about that', polish: 'Nie jestem co do tego przekonany', pronunciation: '/aɪ æm nɒt ʃʊər əˈbaʊt ðæt/', partOfSpeech: 'phrase', exampleEnglish: 'Are you certain? I am not sure about that.', examplePolish: 'Jesteś pewien? Nie jestem co do tego przekonany.' },
      { id: 'pb11-5', english: 'On the one hand...', polish: 'Z jednej strony...', pronunciation: '/ɒn ðə wʌn hænd/', partOfSpeech: 'phrase', exampleEnglish: "On the one hand, it's cheap. On the other hand, it's far.", examplePolish: 'Z jednej strony jest tanio. Z drugiej strony jest daleko.' },
      { id: 'pb11-6', english: 'On the other hand...', polish: 'Z drugiej strony...', pronunciation: '/ɒn ði ˈʌðər hænd/', partOfSpeech: 'phrase', exampleEnglish: "It's expensive. On the other hand, the quality is perfect.", examplePolish: 'To jest drogie. Z drugiej strony, jakość jest idealna.' },
      { id: 'pb11-7', english: 'As far as I know...', polish: 'Z tego co wiem...', pronunciation: '/æz fɑr æz aɪ noʊ/', partOfSpeech: 'phrase', exampleEnglish: 'As far as I know, the meeting is cancelled.', examplePolish: 'Z tego co wiem, spotkanie jest odwołane.' },
      { id: 'pb11-8', english: 'It seems to me that...', polish: 'Wydaje mi się, że...', pronunciation: '/ɪt siːmz tu mi ðæt/', partOfSpeech: 'phrase', exampleEnglish: 'It seems to me that we are lost.', examplePolish: 'Wydaje mi się, że się zgubiliśmy.' },
      { id: 'pb11-9', english: 'What do you think?', polish: 'Co o tym myślisz?', pronunciation: '/wɒt du ju θɪŋk/', partOfSpeech: 'phrase', exampleEnglish: 'I like this plan. What do you think?', examplePolish: 'Podoba mi się ten plan. Co myślisz?' },
      { id: 'pb11-10', english: "I couldn't agree more", polish: 'Całkowicie się zgadzam', pronunciation: '/aɪ ˈkʊdənt əˈgriː mɔr/', partOfSpeech: 'phrase', exampleEnglish: "This is brilliant. I couldn't agree more.", examplePolish: 'To jest genialne. Całkowicie się zgadzam.' }
    ]
  },
  {
    id: 'phrases-b1-2',
    title: 'Życie codzienne i plany (B1)',
    polishTitle: 'Życie codzienne i plany (Część 2)',
    category: 'everyday',
    level: 'B1',
    description: 'Zwroty przydatne podczas opowiadania o swoich planach, nadziejach i intencjach.',
    icon: 'Calendar',
    color: '#3b82f6',
    cards: [
      { id: 'pb12-1', english: 'I am planning to...', polish: 'Planuję...', pronunciation: '/aɪ æm ˈplænɪŋ tu/', partOfSpeech: 'phrase', exampleEnglish: 'I am planning to visit Italy next year.', examplePolish: 'Planuję odwiedzić Włochy w przyszłym roku.' },
      { id: 'pb12-2', english: 'I am thinking of...', polish: 'Zastanawiam się nad...', pronunciation: '/aɪ æm ˈθɪŋkɪŋ ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'I am thinking of changing my job.', examplePolish: 'Zastanawiam się nad zmianą pracy.' },
      { id: 'pb12-3', english: 'Make up your mind', polish: 'Podejmij decyzję', pronunciation: '/meɪk ʌp jɔːr maɪnd/', partOfSpeech: 'phrase', exampleEnglish: 'You have to make up your mind quickly.', examplePolish: 'Musisz szybko podjąć decyzję.' },
      { id: 'pb12-4', english: 'I changed my mind', polish: 'Zmieniłem zdanie', pronunciation: '/aɪ tʃeɪndʒd maɪ maɪnd/', partOfSpeech: 'phrase', exampleEnglish: 'I was going to buy it, but I changed my mind.', examplePolish: 'Miałem to kupić, ale zmieniłem zdanie.' },
      { id: 'pb12-5', english: 'It depends on...', polish: 'To zależy od...', pronunciation: '/ɪt dɪˈpɛndz ɒn/', partOfSpeech: 'phrase', exampleEnglish: 'It depends on the weather.', examplePolish: 'To zależy od pogody.' },
      { id: 'pb12-6', english: 'Let me know', polish: 'Daj mi znać', pronunciation: '/lɛt mi noʊ/', partOfSpeech: 'phrase', exampleEnglish: 'Let me know when you are ready.', examplePolish: 'Daj znać, kiedy będziesz gotowy.' },
      { id: 'pb12-7', english: 'Keep in touch', polish: 'Bądźmy w kontakcie', pronunciation: '/kiːp ɪn tʌtʃ/', partOfSpeech: 'phrase', exampleEnglish: 'It was great seeing you. Keep in touch!', examplePolish: 'Miło było cię widzieć. Bądźmy w kontakcie!' },
      { id: 'pb12-8', english: 'By the way', polish: 'Swoją drogą / Przy okazji', pronunciation: '/baɪ ðə weɪ/', partOfSpeech: 'phrase', exampleEnglish: 'By the way, did you see the news?', examplePolish: 'Swoją drogą, widziałeś wiadomości?' },
      { id: 'pb12-9', english: 'To make a long story short...', polish: 'Krótko mówiąc...', pronunciation: '/tu meɪk ə lɒŋ ˈstɔri ʃɔrt/', partOfSpeech: 'phrase', exampleEnglish: 'To make a long story short, we missed the flight.', examplePolish: 'Krótko mówiąc, spóźniliśmy się na lot.' },
      { id: 'pb12-10', english: 'So far, so good', polish: 'Jak dotąd jest dobrze', pronunciation: '/soʊ fɑr soʊ gʊd/', partOfSpeech: 'phrase', exampleEnglish: 'How is the project going? So far, so good.', examplePolish: 'Jak idzie projekt? Jak dotąd wszystko dobrze.' }
    ]
  },
  // --- B2 ---
  {
    id: 'phrases-b2-1',
    title: 'Spotkania Biznesowe (B2)',
    polishTitle: 'Rozmowy i Negocjacje (Część 1)',
    category: 'business',
    level: 'B2',
    description: 'Zwroty wykorzystywane w środowisku zawodowym i podczas dyskusji.',
    icon: 'Briefcase',
    color: '#6366f1',
    cards: [
      { id: 'pb21-1', english: "Let's get down to business", polish: 'Przejdźmy do rzeczy', pronunciation: '/lɛts gɛt daʊn tu ˈbɪznɪs/', partOfSpeech: 'phrase', exampleEnglish: "Enough small talk, let's get down to business.", examplePolish: 'Koniec pogawędek, przejdźmy do rzeczy.' },
      { id: 'pb21-2', english: 'From my perspective...', polish: 'Z mojego punktu widzenia...', pronunciation: '/frɒm maɪ pərˈspɛktɪv/', partOfSpeech: 'phrase', exampleEnglish: 'From my perspective, this is a huge risk.', examplePolish: 'Z mojego punktu widzenia to ogromne ryzyko.' },
      { id: 'pb21-3', english: 'Bear in mind that...', polish: 'Weź pod uwagę, że...', pronunciation: '/bɛər ɪn maɪnd ðæt/', partOfSpeech: 'phrase', exampleEnglish: 'Bear in mind that we have a strict deadline.', examplePolish: 'Weź pod uwagę, że mamy ścisły termin.' },
      { id: 'pb21-4', english: 'Take it into account', polish: 'Wziąć to pod uwagę', pronunciation: '/teɪk ɪt ˈɪntu əˈkaʊnt/', partOfSpeech: 'phrase', exampleEnglish: 'You should take their feedback into account.', examplePolish: 'Powinieneś wziąć ich opinię pod uwagę.' },
      { id: 'pb21-5', english: 'As a matter of fact', polish: 'Prawdę mówiąc / Właściwie', pronunciation: '/æz ə ˈmætər ɒv fækt/', partOfSpeech: 'phrase', exampleEnglish: 'As a matter of fact, I already finished the report.', examplePolish: 'Prawdę mówiąc, już skończyłem raport.' },
      { id: 'pb21-6', english: 'To point out', polish: 'Zwrócić uwagę na / Zaznaczyć', pronunciation: '/tu pɔɪnt aʊt/', partOfSpeech: 'phrase', exampleEnglish: 'I would like to point out a few errors in the text.', examplePolish: 'Chciałbym zwrócić uwagę na kilka błędów w tekście.' },
      { id: 'pb21-7', english: 'In the meantime', polish: 'W międzyczasie', pronunciation: '/ɪn ðə ˈmiːntaɪm/', partOfSpeech: 'phrase', exampleEnglish: 'I will prepare dinner. In the meantime, you can relax.', examplePolish: 'Przygotuję kolację. W międzyczasie możesz odpocząć.' },
      { id: 'pb21-8', english: 'It goes without saying', polish: 'To rozumie się samo przez się', pronunciation: '/ɪt goʊz wɪðˈaʊt ˈseɪɪŋ/', partOfSpeech: 'phrase', exampleEnglish: 'It goes without saying that you will be paid for extra hours.', examplePolish: 'To rozumie się samo przez się, że dostaniesz zapłatę za nadgodziny.' },
      { id: 'pb21-9', english: 'To cut a long story short', polish: 'Krótko mówiąc', pronunciation: '/tu kʌt ə lɒŋ ˈstɔri ʃɔrt/', partOfSpeech: 'phrase', exampleEnglish: 'To cut a long story short, we won the match.', examplePolish: 'Krótko mówiąc, wygraliśmy mecz.' },
      { id: 'pb21-10', english: "I couldn't care less", polish: 'Nic mnie to nie obchodzi', pronunciation: '/aɪ ˈkʊdənt kɛər lɛs/', partOfSpeech: 'phrase', exampleEnglish: "He is complaining again? I couldn't care less.", examplePolish: 'Znowu narzeka? Nic mnie to nie obchodzi.' }
    ]
  },
  {
    id: 'phrases-b2-2',
    title: 'Wyrażanie emocji i odczuć (B2)',
    polishTitle: 'Emocje i odczucia (Część 2)',
    category: 'general',
    level: 'B2',
    description: 'Zwroty ułatwiające wyrażanie uczuć, obaw i relacji międzyludzkich.',
    icon: 'Heart',
    color: '#6366f1',
    cards: [
      { id: 'pb22-1', english: 'I am fed up with...', polish: 'Mam dość...', pronunciation: '/aɪ æm fɛd ʌp wɪð/', partOfSpeech: 'phrase', exampleEnglish: 'I am fed up with this rainy weather.', examplePolish: 'Mam dość tej deszczowej pogody.' },
      { id: 'pb22-2', english: 'Take it easy', polish: 'Wyluzuj / Spokojnie', pronunciation: '/teɪk ɪt ˈiːzi/', partOfSpeech: 'phrase', exampleEnglish: 'Take it easy, everything will be fine.', examplePolish: 'Wyluzuj, wszystko będzie dobrze.' },
      { id: 'pb22-3', english: 'Out of the blue', polish: 'Nagle, niespodziewanie', pronunciation: '/aʊt ɒv ðə bluː/', partOfSpeech: 'phrase', exampleEnglish: 'He arrived out of the blue.', examplePolish: 'Przyjechał nagle i niespodziewanie.' },
      { id: 'pb22-4', english: 'To be under the weather', polish: 'Czuć się niewyraźnie / Być lekko chorym', pronunciation: '/tu bi ˈʌndər ðə ˈwɛðər/', partOfSpeech: 'phrase', exampleEnglish: 'I am feeling a bit under the weather today.', examplePolish: 'Czuję się dzisiaj trochę niewyraźnie.' },
      { id: 'pb22-5', english: 'It rings a bell', polish: 'Brzmi znajomo', pronunciation: '/ɪt rɪŋz ə bɛl/', partOfSpeech: 'phrase', exampleEnglish: 'That name rings a bell, but I cannot remember his face.', examplePolish: 'To nazwisko brzmi znajomo, ale nie pamiętam jego twarzy.' },
      { id: 'pb22-6', english: 'To cross one\\'s mind', polish: 'Przejść komuś przez myśl', pronunciation: '/tu krɒs wʌnz maɪnd/', partOfSpeech: 'phrase', exampleEnglish: 'It never crossed my mind that he could lie.', examplePolish: 'Nigdy nie przeszło mi przez myśl, że mógłby kłamać.' },
      { id: 'pb22-7', english: 'To make matters worse', polish: 'Na domiar złego', pronunciation: '/tu meɪk ˈmætərz wɜrs/', partOfSpeech: 'phrase', exampleEnglish: 'It was raining, and to make matters worse, I lost my keys.', examplePolish: 'Padało, a na domiar złego zgubiłem klucze.' },
      { id: 'pb22-8', english: 'To take something for granted', polish: 'Brać coś za pewnik', pronunciation: '/tu teɪk ˈsʌmθɪŋ fɔr ˈgræntɪd/', partOfSpeech: 'phrase', exampleEnglish: 'We often take our health for granted.', examplePolish: 'Często bierzemy nasze zdrowie za pewnik.' },
      { id: 'pb22-9', english: 'To get rid of', polish: 'Pozbyć się', pronunciation: '/tu gɛt rɪd ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'I need to get rid of these old clothes.', examplePolish: 'Muszę pozbyć się tych starych ubrań.' },
      { id: 'pb22-10', english: 'To keep an eye on', polish: 'Mieć oko na', pronunciation: '/tu kiːp ən aɪ ɒn/', partOfSpeech: 'phrase', exampleEnglish: 'Can you keep an eye on my bag for a minute?', examplePolish: 'Możesz mieć oko na moją torbę przez minutę?' }
    ]
  },
  // --- C1 ---
  {
    id: 'phrases-c1-1',
    title: 'Zaawansowana Argumentacja (C1)',
    polishTitle: 'Zaawansowana Argumentacja (Część 1)',
    category: 'business',
    level: 'C1',
    description: 'Wyrafinowane zwroty niezbędne w debatach, prezentacjach i na spotkaniach.',
    icon: 'MessageCircle',
    color: '#a855f7',
    cards: [
      { id: 'pc11-1', english: 'By and large', polish: 'Ogólnie rzecz biorąc', pronunciation: '/baɪ ænd lɑrdʒ/', partOfSpeech: 'phrase', exampleEnglish: 'By and large, the project was a success.', examplePolish: 'Ogólnie rzecz biorąc, projekt zakończył się sukcesem.' },
      { id: 'pc11-2', english: 'Contrary to popular belief', polish: 'Wbrew powszechnemu przekonaniu', pronunciation: '/ˈkɒntrəri tu ˈpɒpjʊlər bɪˈliːf/', partOfSpeech: 'phrase', exampleEnglish: 'Contrary to popular belief, bats are not blind.', examplePolish: 'Wbrew powszechnemu przekonaniu, nietoperze nie są ślepe.' },
      { id: 'pc11-3', english: 'To weigh the pros and cons', polish: 'Rozważyć za i przeciw', pronunciation: '/tu weɪ ðə proʊz ænd kɒnz/', partOfSpeech: 'phrase', exampleEnglish: 'We need to weigh the pros and cons before making a decision.', examplePolish: 'Musimy rozważyć za i przeciw przed podjęciem decyzji.' },
      { id: 'pc11-4', english: 'It stands to reason that...', polish: 'Jest logiczne, że... / Wydaje się oczywiste, że...', pronunciation: '/ɪt stændz tu ˈriːzən ðæt/', partOfSpeech: 'phrase', exampleEnglish: 'It stands to reason that if you work hard, you will succeed.', examplePolish: 'Jest logiczne, że jeśli ciężko pracujesz, odniesiesz sukces.' },
      { id: 'pc11-5', english: 'To take issue with', polish: 'Nie zgadzać się z czymś', pronunciation: '/tu teɪk ˈɪʃuː wɪð/', partOfSpeech: 'phrase', exampleEnglish: 'I must take issue with the latter part of your statement.', examplePolish: 'Muszę nie zgodzić się z drugą częścią twojej wypowiedzi.' },
      { id: 'pc11-6', english: "To play devil's advocate", polish: 'Grać adwokata diabła', pronunciation: '/tu pleɪ ˈdɛvəlz ˈædvəkət/', partOfSpeech: 'phrase', exampleEnglish: "Let me play devil's advocate for a moment.", examplePolish: 'Pozwól, że zagram adwokata diabła przez chwilę.' },
      { id: 'pc11-7', english: 'To draw a line', polish: 'Wyznaczyć granicę', pronunciation: '/tu drɔː ə laɪn/', partOfSpeech: 'phrase', exampleEnglish: 'We have to draw a line between work and private life.', examplePolish: 'Musimy wyznaczyć granicę między pracą a życiem prywatnym.' },
      { id: 'pc11-8', english: 'To be bound to', polish: 'Musieć się wydarzyć / Być skazanym na', pronunciation: '/tu bi baʊnd tu/', partOfSpeech: 'phrase', exampleEnglish: 'They are bound to find out eventually.', examplePolish: 'Oni w końcu na pewno się dowiedzą.' },
      { id: 'pc11-9', english: 'Given the circumstances', polish: 'W zaistniałych okolicznościach', pronunciation: '/ˈgɪvən ðə ˈsɜrkəmstænsɪz/', partOfSpeech: 'phrase', exampleEnglish: 'Given the circumstances, we did our best.', examplePolish: 'W zaistniałych okolicznościach zrobiliśmy co w naszej mocy.' },
      { id: 'pc11-10', english: 'To boil down to', polish: 'Sprowadzać się do', pronunciation: '/tu bɔɪl daʊn tu/', partOfSpeech: 'phrase', exampleEnglish: 'It all boils down to lack of money.', examplePolish: 'Wszystko sprowadza się do braku pieniędzy.' }
    ]
  },
  {
    id: 'phrases-c1-2',
    title: 'Wyrafinowany Język (C1)',
    polishTitle: 'Zaawansowane zwroty i idiomy (Część 2)',
    category: 'general',
    level: 'C1',
    description: 'Zwroty na poziomie C1, które wzbogacają wypowiedź i pozwalają na płynną dyskusję.',
    icon: 'Feather',
    color: '#a855f7',
    cards: [
      { id: 'pc12-1', english: "To go out of one's way", polish: 'Zrobić wszystko, co w czyjejś mocy (dla kogoś)', pronunciation: '/tu goʊ aʊt ɒv wʌnz weɪ/', partOfSpeech: 'phrase', exampleEnglish: "She went out of her way to help me.", examplePolish: 'Ona zrobiła wszystko co w jej mocy, żeby mi pomóc.' },
      { id: 'pc12-2', english: 'To take its toll', polish: 'Odbić się (negatywnie) na', pronunciation: '/tu teɪk ɪts toʊl/', partOfSpeech: 'phrase', exampleEnglish: 'The stress is starting to take its toll on his health.', examplePolish: 'Stres zaczyna odbijać się na jego zdrowiu.' },
      { id: 'pc12-3', english: 'To be on the verge of', polish: 'Być na skraju (czegoś)', pronunciation: '/tu bi ɒn ðə vɜrdʒ ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'She was on the verge of tears.', examplePolish: 'Ona była na skraju łez.' },
      { id: 'pc12-4', english: 'In light of', polish: 'W świetle (czegoś)', pronunciation: '/ɪn laɪt ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'In light of recent events, we are changing our policy.', examplePolish: 'W świetle ostatnich wydarzeń zmieniamy naszą politykę.' },
      { id: 'pc12-5', english: 'To jump to conclusions', polish: 'Wyciągać pochopne wnioski', pronunciation: '/tu dʒʌmp tu kənˈkluːʒənz/', partOfSpeech: 'phrase', exampleEnglish: "Let's not jump to conclusions before we know the facts.", examplePolish: 'Nie wyciągajmy pochopnych wniosków, dopóki nie znamy faktów.' },
      { id: 'pc12-6', english: 'To bear fruit', polish: 'Przynieść owoce (rezultaty)', pronunciation: '/tu bɛər fruːt/', partOfSpeech: 'phrase', exampleEnglish: 'Finally, our hard work is beginning to bear fruit.', examplePolish: 'W końcu nasza ciężka praca zaczyna przynosić rezultaty.' },
      { id: 'pc12-7', english: 'At the expense of', polish: 'Kosztem (czegoś/kogoś)', pronunciation: '/æt ði ɪkˈspɛns ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'He achieved success at the expense of his family.', examplePolish: 'Osiągnął sukces kosztem swojej rodziny.' },
      { id: 'pc12-8', english: 'To put it bluntly', polish: 'Mówiąc bez ogródek', pronunciation: '/tu pʊt ɪt ˈblʌntli/', partOfSpeech: 'phrase', exampleEnglish: 'To put it bluntly, your performance has been terrible.', examplePolish: 'Mówiąc bez ogródek, twoje wyniki są okropne.' },
      { id: 'pc12-9', english: 'To cast doubt on', polish: 'Podać w wątpliwość', pronunciation: '/tu kɑːst daʊt ɒn/', partOfSpeech: 'phrase', exampleEnglish: 'New evidence has cast doubt on his testimony.', examplePolish: 'Nowe dowody poddały w wątpliwość jego zeznania.' },
      { id: 'pc12-10', english: 'To nip something in the bud', polish: 'Zniszczyć w zarodku', pronunciation: '/tu nɪp ˈsʌmθɪŋ ɪn ðə bʌd/', partOfSpeech: 'phrase', exampleEnglish: 'We need to nip this problem in the bud.', examplePolish: 'Musimy zdusić ten problem w zarodku.' }
    ]
  },
  // --- C2 ---
  {
    id: 'phrases-c2-1',
    title: 'Biegłość Absolutna (C2)',
    polishTitle: 'Biegłość Absolutna (Część 1)',
    category: 'general',
    level: 'C2',
    description: 'Zwroty idiomatyczne i kolokacje używane niemal wyłącznie przez native speakerów.',
    icon: 'Crown',
    color: '#e11d48',
    cards: [
      { id: 'pc21-1', english: 'To be completely at a loss', polish: 'Być w kompletnej kropce / Nie wiedzieć co począć', pronunciation: '/tu bi kəmˈpliːtli æt ə lɒs/', partOfSpeech: 'phrase', exampleEnglish: 'When she asked me that, I was completely at a loss for words.', examplePolish: 'Kiedy mnie o to zapytała, kompletnie zabrakło mi słów.' },
      { id: 'pc21-2', english: 'To have no qualms about', polish: 'Nie mieć żadnych skrupułów przed', pronunciation: '/tu hæv noʊ kwɑːmz əˈbaʊt/', partOfSpeech: 'phrase', exampleEnglish: 'He had no qualms about lying to the committee.', examplePolish: 'Nie miał żadnych skrupułów przed okłamaniem komisji.' },
      { id: 'pc21-3', english: 'To be tantamount to', polish: 'Być równoznacznym z', pronunciation: '/tu bi ˈtæntəmaʊnt tu/', partOfSpeech: 'phrase', exampleEnglish: 'Her refusal to answer was tantamount to an admission of guilt.', examplePolish: 'Jej odmowa odpowiedzi była równoznaczna z przyznaniem się do winy.' },
      { id: 'pc21-4', english: 'With hindsight', polish: 'Z perspektywy czasu', pronunciation: '/wɪð ˈhaɪndsaɪt/', partOfSpeech: 'phrase', exampleEnglish: 'With hindsight, we should have seen the warning signs.', examplePolish: 'Z perspektywy czasu, powinniśmy byli dostrzec sygnały ostrzegawcze.' },
      { id: 'pc21-5', english: 'To turn a blind eye to', polish: 'Przymknąć oko na', pronunciation: '/tu tɜrn ə blaɪnd aɪ tu/', partOfSpeech: 'phrase', exampleEnglish: 'The manager turned a blind eye to the employees arriving late.', examplePolish: 'Menedżer przymknął oko na spóźnienia pracowników.' },
      { id: 'pc21-6', english: 'To pay lip service to', polish: 'Składać gołosłowne deklaracje', pronunciation: '/tu peɪ lɪp ˈsɜrvɪs tu/', partOfSpeech: 'phrase', exampleEnglish: 'They pay lip service to environmental issues but do nothing.', examplePolish: 'Oni jedynie składają puste deklaracje o ekologii, a nic nie robią.' },
      { id: 'pc21-7', english: 'To be at odds with', polish: 'Nie zgadzać się z / Pozostawać w sprzeczności', pronunciation: '/tu bi æt ɒdz wɪð/', partOfSpeech: 'phrase', exampleEnglish: 'His behavior is at odds with his principles.', examplePolish: 'Jego zachowanie jest sprzeczne z jego zasadami.' },
      { id: 'pc21-8', english: 'To fly in the face of', polish: 'Być jawnym zaprzeczeniem', pronunciation: '/tu flaɪ ɪn ðə feɪs ɒv/', partOfSpeech: 'phrase', exampleEnglish: 'This decision flies in the face of all logic.', examplePolish: 'Ta decyzja zaprzecza wszelkiej logice.' },
      { id: 'pc21-9', english: 'To take something in stride', polish: 'Znieść coś spokojnie', pronunciation: '/tu teɪk ˈsʌmθɪŋ ɪn straɪd/', partOfSpeech: 'phrase', exampleEnglish: 'She took the disappointing news in stride.', examplePolish: 'Ona przyjęła rozczarowującą wiadomość na chłodno.' },
      { id: 'pc21-10', english: 'To give someone the benefit of the doubt', polish: 'Dać komuś kredyt zaufania', pronunciation: '/tu gɪv ˈsʌmwʌn ðə ˈbɛnɪfɪt ɒv ðə daʊt/', partOfSpeech: 'phrase', exampleEnglish: "Let's give him the benefit of the doubt until we know more.", examplePolish: 'Dajmy mu kredyt zaufania dopóki nie będziemy wiedzieć więcej.' }
    ]
  },
  {
    id: 'phrases-c2-2',
    title: 'Literackie i Rzadkie Zwroty (C2)',
    polishTitle: 'Rzadkie i Literackie Zwroty (Część 2)',
    category: 'culture',
    level: 'C2',
    description: 'Rzadko używane zwroty dowodzące prawdziwej maestrii na poziomie C2.',
    icon: 'Book',
    color: '#e11d48',
    cards: [
      { id: 'pc22-1', english: "To rest on one's laurels", polish: 'Spocząć na laurach', pronunciation: '/tu rɛst ɒn wʌnz ˈlɒrəlz/', partOfSpeech: 'phrase', exampleEnglish: "Even after his massive success, he refuses to rest on his laurels.", examplePolish: 'Nawet po swoim wielkim sukcesie, odmawia spoczęcia na laurach.' },
      { id: 'pc22-2', english: 'To leave no stone unturned', polish: 'Poruszyć niebo i ziemię / Sprawdzić wszystkie możliwości', pronunciation: '/tu liːv noʊ stoʊn ʌnˈtɜrnd/', partOfSpeech: 'phrase', exampleEnglish: 'The investigators left no stone unturned in their search.', examplePolish: 'Śledczy sprawdzili każdy trop w swoim śledztwie.' },
      { id: 'pc22-3', english: 'To be a far cry from', polish: 'Znacznie odbiegać od', pronunciation: '/tu bi ə fɑr kraɪ frɒm/', partOfSpeech: 'phrase', exampleEnglish: 'The apartment was a far cry from what they had advertised.', examplePolish: 'Mieszkanie bardzo się różniło od tego, co reklamowali.' },
      { id: 'pc22-4', english: 'To take the bull by the horns', polish: 'Wziąć byka za rogi', pronunciation: '/tu teɪk ðə bʊl baɪ ðə hɔrnz/', partOfSpeech: 'phrase', exampleEnglish: "It's time to take the bull by the horns and fix this mess.", examplePolish: 'Czas wziąć byka za rogi i naprawić ten bałagan.' },
      { id: 'pc22-5', english: 'To read between the lines', polish: 'Czytać między wierszami', pronunciation: '/tu riːd bɪˈtwiːn ðə laɪnz/', partOfSpeech: 'phrase', exampleEnglish: 'If you read between the lines, she is actually very unhappy.', examplePolish: 'Jeśli czytasz między wierszami, ona jest właściwie bardzo nieszczęśliwa.' },
      { id: 'pc22-6', english: 'To throw caution to the wind', polish: 'Zaryzykować / Zignorować ryzyko', pronunciation: '/tu θroʊ ˈkɔːʃən tu ðə wɪnd/', partOfSpeech: 'phrase', exampleEnglish: 'He decided to throw caution to the wind and quit his job.', examplePolish: 'Postanowił odrzucić ostrożność i rzucić pracę.' },
      { id: 'pc22-7', english: 'To hit the nail on the head', polish: 'Trafić w sedno', pronunciation: '/tu hɪt ðə neɪl ɒn ðə hɛd/', partOfSpeech: 'phrase', exampleEnglish: 'You hit the nail on the head with that observation.', examplePolish: 'Trafiłeś w samo sedno tą uwagą.' },
      { id: 'pc22-8', english: 'To be in the same boat', polish: 'Jechać na tym samym wózku', pronunciation: '/tu bi ɪn ðə seɪm boʊt/', partOfSpeech: 'phrase', exampleEnglish: "Don't worry, everyone taking this exam is in the same boat.", examplePolish: 'Nie martw się, każdy, kto pisze ten egzamin, jedzie na tym samym wózku.' },
      { id: 'pc22-9', english: 'To beat around the bush', polish: 'Owijać w bawełnę', pronunciation: '/tu biːt əˈraʊnd ðə bʊʃ/', partOfSpeech: 'phrase', exampleEnglish: 'Stop beating around the bush and tell me the truth.', examplePolish: 'Przestań owijać w bawełnę i powiedz mi prawdę.' },
      { id: 'pc22-10', english: 'To be the tip of the iceberg', polish: 'Być wierzchołkiem góry lodowej', pronunciation: '/tu bi ðə tɪp ɒv ði ˈaɪsbɜrg/', partOfSpeech: 'phrase', exampleEnglish: 'These complaints are just the tip of the iceberg.', examplePolish: 'Te skargi to tylko wierzchołek góry lodowej.' }
    ]
  }
];

let content = fs.readFileSync('c:/Users/PawełHachuła/Documents/AntiG/src/data/defaultDecks.js', 'utf8');

const arrayEndRegex = /(}\n  \]\n}\n];)(\n\nconst counts = {};)/;

if (!arrayEndRegex.test(content)) {
    console.log('Could not find the end of the array');
    process.exit(1);
}

let stringToAdd = JSON.stringify(phrasesDecks, null, 2);
stringToAdd = stringToAdd.substring(1, stringToAdd.length - 1); 
stringToAdd = ',\n' + stringToAdd.trim();

content = content.replace(arrayEndRegex, '}  ]\n}' + stringToAdd + '\n];$2');

fs.writeFileSync('c:/Users/PawełHachuła/Documents/AntiG/src/data/defaultDecks.js', content);
console.log('Successfully appended phrase decks.');

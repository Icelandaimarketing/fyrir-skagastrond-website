// All UI translations for 7 languages
// is = Icelandic, en = English, es = Spanish, pl = Polish, de = German, da = Danish, no = Norwegian

const translations = {
  // ─── NAV ───
  'nav.stefna': {
    is: 'Stefna', en: 'Policy', es: 'Políticas', pl: 'Polityka', de: 'Politik', da: 'Politik', no: 'Politikk',
  },
  'nav.frambod': {
    is: 'Framboðslisti', en: 'Candidates', es: 'Candidatos', pl: 'Kandydaci', de: 'Kandidaten', da: 'Kandidater', no: 'Kandidater',
  },
  'nav.um': {
    is: 'Um okkur', en: 'About us', es: 'Sobre nosotros', pl: 'O nas', de: 'Über uns', da: 'Om os', no: 'Om oss',
  },
  'nav.samband': {
    is: 'Samband', en: 'Contact', es: 'Contacto', pl: 'Kontakt', de: 'Kontakt', da: 'Kontakt', no: 'Kontakt',
  },
  'nav.subtitle': {
    is: 'Sveitarstjórnarkosningar', en: 'Municipal Elections', es: 'Elecciones Municipales', pl: 'Wybory Samorządowe', de: 'Kommunalwahlen', da: 'Kommunalvalg', no: 'Kommunevalg',
  },

  // ─── HERO ───
  'hero.badge': {
    is: 'Sveitarstjórnarkosningar 2026', en: 'Municipal Elections 2026', es: 'Elecciones Municipales 2026', pl: 'Wybory Samorządowe 2026', de: 'Kommunalwahlen 2026', da: 'Kommunalvalg 2026', no: 'Kommunevalg 2026',
  },
  'hero.headline': {
    is: 'Fyrir fólkið, fyrir samfélagið, fyrir framtíðina.',
    en: 'For the people, for the community, for the future.',
    es: 'Por la gente, por la comunidad, por el futuro.',
    pl: 'Dla ludzi, dla społeczności, dla przyszłości.',
    de: 'Für die Menschen, für die Gemeinschaft, für die Zukunft.',
    da: 'For folket, for fællesskabet, for fremtiden.',
    no: 'For folket, for samfunnet, for fremtiden.',
  },
  'hero.headline.part1': {
    is: 'Fyrir fólkið,', en: 'For the people,', es: 'Por la gente,', pl: 'Dla ludzi,', de: 'Für die Menschen,', da: 'For folket,', no: 'For folket,',
  },
  'hero.headline.accent': {
    is: 'fyrir samfélagið,', en: 'for the community,', es: 'por la comunidad,', pl: 'dla społeczności,', de: 'für die Gemeinschaft,', da: 'for fællesskabet,', no: 'for samfunnet,',
  },
  'hero.headline.part3': {
    is: 'fyrir framtíðina.', en: 'for the future.', es: 'por el futuro.', pl: 'dla przyszłości.', de: 'für die Zukunft.', da: 'for fremtiden.', no: 'for fremtiden.',
  },
  'hero.description': {
    is: 'Við erum fólk úr ólíkum áttum, með sameiginlegt markmið: að byggja upp sterkt, sanngjarnt og lifandi samfélag í Skagaströnd. Ábyrg fjármál, gagnsæi og raunhæf framtíðarsýn.',
    en: 'We are people from different walks of life, with a common goal: to build a strong, fair, and vibrant community in Skagaströnd. Responsible finances, transparency, and a realistic vision for the future.',
    es: 'Somos personas de diferentes ámbitos, con un objetivo común: construir una comunidad fuerte, justa y vibrante en Skagaströnd. Finanzas responsables, transparencia y una visión realista del futuro.',
    pl: 'Jesteśmy ludźmi z różnych środowisk, z wspólnym celem: budowania silnej, sprawiedliwej i tętniącej życiem społeczności w Skagaströnd. Odpowiedzialne finanse, przejrzystość i realistyczna wizja przyszłości.',
    de: 'Wir sind Menschen aus verschiedenen Lebensbereichen mit einem gemeinsamen Ziel: eine starke, gerechte und lebendige Gemeinschaft in Skagaströnd aufzubauen. Verantwortungsvolle Finanzen, Transparenz und eine realistische Zukunftsvision.',
    da: 'Vi er mennesker fra forskellige baggrunde med et fælles mål: at opbygge et stærkt, retfærdigt og levende samfund i Skagaströnd. Ansvarlig økonomi, gennemsigtighed og en realistisk fremtidsvision.',
    no: 'Vi er mennesker fra ulike bakgrunner, med et felles mål: å bygge et sterkt, rettferdig og levende samfunn i Skagaströnd. Ansvarlig økonomi, åpenhet og en realistisk fremtidsvisjon.',
  },
  'hero.cta': {
    is: 'X við K', en: 'Vote K', es: 'Vota K', pl: 'Głosuj K', de: 'Wähle K', da: 'Stem K', no: 'Stem K',
  },
  'hero.cta2': {
    is: 'Skoða framboðslista', en: 'See candidates', es: 'Ver candidatos', pl: 'Zobacz kandydatów', de: 'Kandidaten ansehen', da: 'Se kandidater', no: 'Se kandidater',
  },
  'hero.stat.candidates': {
    is: 'frambjóðendur', en: 'candidates', es: 'candidatos', pl: 'kandydatów', de: 'Kandidaten', da: 'kandidater', no: 'kandidater',
  },
  'hero.stat.slogans': {
    is: 'kjarnaslagorð', en: 'core slogans', es: 'lemas centrales', pl: 'hasła kluczowe', de: 'Kernslogans', da: 'kerneslogans', no: 'kjerneslagord',
  },
  'hero.stat.policy': {
    is: 'sameiginleg stefna', en: 'shared policy', es: 'política común', pl: 'wspólna polityka', de: 'gemeinsame Politik', da: 'fælles politik', no: 'felles politikk',
  },
  'hero.brand.slogan': {
    is: 'X við K · Fyrir fólkið, samfélagið og framtíðina',
    en: 'Vote K · For the people, community and future',
    es: 'Vota K · Por la gente, la comunidad y el futuro',
    pl: 'Głosuj K · Dla ludzi, społeczności i przyszłości',
    de: 'Wähle K · Für Menschen, Gemeinschaft und Zukunft',
    da: 'Stem K · For folket, fællesskabet og fremtiden',
    no: 'Stem K · For folket, samfunnet og fremtiden',
  },

  // ─── PILLARS ───
  'pillars.badge': {
    is: 'Stefna og áherslur', en: 'Policy & priorities', es: 'Políticas y prioridades', pl: 'Polityka i priorytety', de: 'Politik & Prioritäten', da: 'Politik & prioriteter', no: 'Politikk og prioriteringer',
  },
  'pillars.title': {
    is: 'Skýr sýn sem hægt er að treysta', en: 'A clear vision you can trust', es: 'Una visión clara en la que confiar', pl: 'Jasna wizja, której można zaufać', de: 'Eine klare Vision, der Sie vertrauen können', da: 'En klar vision du kan stole på', no: 'En klar visjon du kan stole på',
  },
  'pillars.subtitle': {
    is: 'Þrjár meginstoðir sem leiða allar ákvarðanir okkar – ábyrgð, réttlæti og framtíðarsýn fyrir Skagaströnd.',
    en: 'Three pillars that guide all our decisions – responsibility, justice, and a vision for the future of Skagaströnd.',
    es: 'Tres pilares que guían todas nuestras decisiones: responsabilidad, justicia y una visión para el futuro de Skagaströnd.',
    pl: 'Trzy filary, które kierują naszymi decyzjami — odpowiedzialność, sprawiedliwość i wizja przyszłości Skagaströnd.',
    de: 'Drei Säulen, die alle unsere Entscheidungen leiten – Verantwortung, Gerechtigkeit und eine Zukunftsvision für Skagaströnd.',
    da: 'Tre søjler der styrer alle vores beslutninger – ansvar, retfærdighed og en fremtidsvision for Skagaströnd.',
    no: 'Tre pilarer som styrer alle våre beslutninger — ansvar, rettferdighet og en fremtidsvisjon for Skagaströnd.',
  },
  'pillar.finance.title': {
    is: 'Ábyrg fjármál', en: 'Responsible finance', es: 'Finanzas responsables', pl: 'Odpowiedzialne finanse', de: 'Verantwortungsvolle Finanzen', da: 'Ansvarlig økonomi', no: 'Ansvarlig økonomi',
  },
  'pillar.finance.text': {
    is: 'Við viljum ábyrga fjármálastjórn – ekki loforð sem byggja á lánum, heldur raunhæfar ákvarðanir sem styrkja sveitarfélagið til lengri tíma.',
    en: 'We want responsible financial management – not promises built on loans, but realistic decisions that strengthen the municipality long-term.',
    es: 'Queremos una gestión financiera responsable: no promesas basadas en préstamos, sino decisiones realistas que fortalezcan el municipio a largo plazo.',
    pl: 'Chcemy odpowiedzialnego zarządzania finansami — nie obietnic opartych na pożyczkach, ale realistycznych decyzji wzmacniających gminę na dłuższą metę.',
    de: 'Wir wollen eine verantwortungsvolle Finanzverwaltung – keine auf Krediten basierenden Versprechen, sondern realistische Entscheidungen, die die Gemeinde langfristig stärken.',
    da: 'Vi ønsker ansvarlig økonomisk styring – ikke løfter baseret på lån, men realistiske beslutninger der styrker kommunen på lang sigt.',
    no: 'Vi ønsker ansvarlig økonomisk styring — ikke løfter basert på lån, men realistiske beslutninger som styrker kommunen på lang sikt.',
  },
  'pillar.people.title': {
    is: 'Fyrir fólkið', en: 'For the people', es: 'Por la gente', pl: 'Dla ludzi', de: 'Für die Menschen', da: 'For folket', no: 'For folket',
  },
  'pillar.people.text': {
    is: 'Ákvarðanir sveitarfélagsins eiga að endurspegla þarfir íbúanna. Við viljum opið samtal, gagnsæi og virka þátttöku íbúa í mótun framtíðar Skagastrandar.',
    en: 'Municipal decisions should reflect the needs of residents. We want open dialogue, transparency, and active citizen participation in shaping the future of Skagaströnd.',
    es: 'Las decisiones municipales deben reflejar las necesidades de los residentes. Queremos diálogo abierto, transparencia y participación activa de los ciudadanos en la configuración del futuro de Skagaströnd.',
    pl: 'Decyzje gminy powinny odzwierciedlać potrzeby mieszkańców. Chcemy otwartego dialogu, przejrzystości i aktywnego udziału obywateli w kształtowaniu przyszłości Skagaströnd.',
    de: 'Kommunale Entscheidungen sollten die Bedürfnisse der Einwohner widerspiegeln. Wir wollen offenen Dialog, Transparenz und aktive Bürgerbeteiligung bei der Gestaltung der Zukunft von Skagaströnd.',
    da: 'Kommunale beslutninger bør afspejle beboernes behov. Vi ønsker åben dialog, gennemsigtighed og aktiv borgerdeltagelse i udformningen af Skagaströnds fremtid.',
    no: 'Kommunale beslutninger bør gjenspeile innbyggernes behov. Vi ønsker åpen dialog, åpenhet og aktiv innbyggermedvirkning i utformingen av Skagaströnds fremtid.',
  },
  'pillar.future.title': {
    is: 'Fyrir framtíðina', en: 'For the future', es: 'Por el futuro', pl: 'Dla przyszłości', de: 'Für die Zukunft', da: 'For fremtiden', no: 'For fremtiden',
  },
  'pillar.future.text': {
    is: 'Við horfum til framtíðar með ábyrgð – í umhverfismálum, innviðum og menntun. Ákvarðanir dagsins í dag eiga að nýtast komandi kynslóðum.',
    en: 'We look to the future with responsibility – in environmental matters, infrastructure, and education. Today\'s decisions should benefit future generations.',
    es: 'Miramos al futuro con responsabilidad: en asuntos ambientales, infraestructura y educación. Las decisiones de hoy deben beneficiar a las generaciones futuras.',
    pl: 'Patrzymy w przyszłość z odpowiedzialnością — w sprawach środowiskowych, infrastrukturze i edukacji. Dzisiejsze decyzje powinny służyć przyszłym pokoleniom.',
    de: 'Wir blicken verantwortungsvoll in die Zukunft – bei Umweltfragen, Infrastruktur und Bildung. Die Entscheidungen von heute sollen zukünftigen Generationen zugutekommen.',
    da: 'Vi ser fremad med ansvar – i miljøspørgsmål, infrastruktur og uddannelse. Dagens beslutninger skal gavne kommende generationer.',
    no: 'Vi ser fremover med ansvar — i miljøspørsmål, infrastruktur og utdanning. Dagens beslutninger skal komme fremtidige generasjoner til gode.',
  },

  // ─── CANDIDATES ───
  'candidates.badge': {
    is: 'Framboðslisti', en: 'Candidate list', es: 'Lista de candidatos', pl: 'Lista kandydatów', de: 'Kandidatenliste', da: 'Kandidatliste', no: 'Kandidatliste',
  },
  'candidates.title': {
    is: 'Okkar fólk', en: 'Our people', es: 'Nuestra gente', pl: 'Nasi ludzie', de: 'Unsere Leute', da: 'Vores folk', no: 'Våre folk',
  },
  'candidates.desc': {
    is: 'Við erum fólk úr ólíkum áttum, með sameiginlegt markmið: að byggja upp sterkt, sanngjarnt og lifandi samfélag í Skagaströnd.',
    en: 'We are people from different backgrounds, with a common goal: to build a strong, fair, and vibrant community in Skagaströnd.',
    es: 'Somos personas de diferentes orígenes, con un objetivo común: construir una comunidad fuerte, justa y vibrante en Skagaströnd.',
    pl: 'Jesteśmy ludźmi z różnych środowisk, z wspólnym celem: budowania silnej, sprawiedliwej i tętniącej życiem społeczności w Skagaströnd.',
    de: 'Wir sind Menschen aus verschiedenen Lebensbereichen mit einem gemeinsamen Ziel: eine starke, gerechte und lebendige Gemeinschaft in Skagaströnd aufzubauen.',
    da: 'Vi er mennesker fra forskellige baggrunde med et fælles mål: at opbygge et stærkt, retfærdigt og levende samfund i Skagaströnd.',
    no: 'Vi er mennesker fra ulike bakgrunner, med et felles mål: å bygge et sterkt, rettferdig og levende samfunn i Skagaströnd.',
  },

  // ─── ABOUT ───
  'about.badge': {
    is: 'Um Fyrir Skagaströnd', en: 'About Fyrir Skagaströnd', es: 'Sobre Fyrir Skagaströnd', pl: 'O Fyrir Skagaströnd', de: 'Über Fyrir Skagaströnd', da: 'Om Fyrir Skagaströnd', no: 'Om Fyrir Skagaströnd',
  },
  'about.title': {
    is: 'Listi sem byggir á nánd, ábyrgð og framtíðarsýn',
    en: 'A party built on closeness, responsibility, and vision',
    es: 'Un partido construido sobre cercanía, responsabilidad y visión',
    pl: 'Partia zbudowana na bliskości, odpowiedzialności i wizji',
    de: 'Eine Partei, aufgebaut auf Nähe, Verantwortung und Vision',
    da: 'Et parti bygget på nærhed, ansvar og fremtidsvision',
    no: 'Et parti bygget på nærhet, ansvar og fremtidsvisjon',
  },
  'about.text1': {
    is: 'Fyrir Skagaströnd er byggt á þeirri hugsjón að sveitarfélagið eigi að vinna með íbúum, fyrir íbúa og með langtímahagsmuni samfélagsins að leiðarljósi.',
    en: 'Fyrir Skagaströnd is built on the ideal that the municipality should work with residents, for residents, with the long-term interests of the community as its guiding principle.',
    es: 'Fyrir Skagaströnd se basa en el ideal de que el municipio debe trabajar con los residentes, para los residentes, con los intereses a largo plazo de la comunidad como principio rector.',
    pl: 'Fyrir Skagaströnd opiera się na ideale, że gmina powinna pracować z mieszkańcami, dla mieszkańców, z długoterminowymi interesami społeczności jako zasadą przewodnią.',
    de: 'Fyrir Skagaströnd basiert auf dem Ideal, dass die Gemeinde mit den Einwohnern, für die Einwohner und mit den langfristigen Interessen der Gemeinschaft als Leitprinzip arbeiten sollte.',
    da: 'Fyrir Skagaströnd er bygget på idealet om, at kommunen skal arbejde med beboerne, for beboerne, med samfundets langsigtede interesser som ledestjerne.',
    no: 'Fyrir Skagaströnd er bygget på idealet om at kommunen skal jobbe med innbyggerne, for innbyggerne, med samfunnets langsiktige interesser som ledestjerne.',
  },
  'about.text2': {
    is: 'Framboðið Fyrir Skagaströnd ætlar að vinna markvisst og skipulega að því að laða að fyrirtæki. Ekki með almennum orðum eða vonum, heldur með raunverulegri vinnu.',
    en: 'Fyrir Skagaströnd aims to work systematically to attract businesses. Not with general words or hopes, but with real, tangible work.',
    es: 'Fyrir Skagaströnd tiene como objetivo trabajar sistemáticamente para atraer empresas. No con palabras generales o esperanzas, sino con trabajo real y tangible.',
    pl: 'Fyrir Skagaströnd dąży do systematycznej pracy nad przyciąganiem firm. Nie ogólnymi słowami czy nadziejami, ale prawdziwą, namacalną pracą.',
    de: 'Fyrir Skagaströnd will systematisch daran arbeiten, Unternehmen anzuziehen. Nicht mit allgemeinen Worten oder Hoffnungen, sondern mit echter, greifbarer Arbeit.',
    da: 'Fyrir Skagaströnd sigter mod at arbejde systematisk for at tiltrække virksomheder. Ikke med generelle ord eller håb, men med reelt, håndgribeligt arbejde.',
    no: 'Fyrir Skagaströnd sikter mot å jobbe systematisk for å tiltrekke bedrifter. Ikke med generelle ord eller håp, men med reelt, håndgripelig arbeid.',
  },
  'about.core.label': {
    is: 'Kjarnaskilaboð', en: 'Core message', es: 'Mensaje central', pl: 'Główne przesłanie', de: 'Kernbotschaft', da: 'Kernebudskab', no: 'Kjernebudskap',
  },
  'about.core.slogan': {
    is: 'Fyrir fólkið · Fyrir samfélagið · Fyrir framtíðina',
    en: 'For the people · For the community · For the future',
    es: 'Por la gente · Por la comunidad · Por el futuro',
    pl: 'Dla ludzi · Dla społeczności · Dla przyszłości',
    de: 'Für die Menschen · Für die Gemeinschaft · Für die Zukunft',
    da: 'For folket · For fællesskabet · For fremtiden',
    no: 'For folket · For samfunnet · For fremtiden',
  },
  'about.feature1.title': {
    is: 'Gagnsæi í stjórnun', en: 'Transparency in governance', es: 'Transparencia en la gobernanza', pl: 'Przejrzystość w zarządzaniu', de: 'Transparenz in der Verwaltung', da: 'Gennemsigtighed i styring', no: 'Åpenhet i styring',
  },
  'about.feature1.text': {
    is: 'Allar ákvarðanir eiga að vera opnar og aðgengilegar íbúum. Við trúum á opið samtal og íbúaþátttöku.',
    en: 'All decisions should be open and accessible to residents. We believe in open dialogue and citizen participation.',
    es: 'Todas las decisiones deben ser abiertas y accesibles para los residentes. Creemos en el diálogo abierto y la participación ciudadana.',
    pl: 'Wszystkie decyzje powinny być otwarte i dostępne dla mieszkańców. Wierzymy w otwarty dialog i udział obywateli.',
    de: 'Alle Entscheidungen sollten offen und zugänglich für die Einwohner sein. Wir glauben an offenen Dialog und Bürgerbeteiligung.',
    da: 'Alle beslutninger bør være åbne og tilgængelige for beboerne. Vi tror på åben dialog og borgerdeltagelse.',
    no: 'Alle beslutninger bør være åpne og tilgjengelige for innbyggerne. Vi tror på åpen dialog og innbyggermedvirkning.',
  },
  'about.feature2.title': {
    is: 'Styrkja innviði', en: 'Strengthen infrastructure', es: 'Fortalecer infraestructura', pl: 'Wzmocnić infrastrukturę', de: 'Infrastruktur stärken', da: 'Styrke infrastruktur', no: 'Styrke infrastruktur',
  },
  'about.feature2.text': {
    is: 'Ábyrg uppbygging á vegum, hafnarmannvirkjum og opinberum byggingum – fyrir komandi kynslóðir.',
    en: 'Responsible construction of roads, harbor facilities, and public buildings – for future generations.',
    es: 'Construcción responsable de caminos, instalaciones portuarias y edificios públicos, para las generaciones futuras.',
    pl: 'Odpowiedzialna budowa dróg, obiektów portowych i budynków publicznych — dla przyszłych pokoleń.',
    de: 'Verantwortungsvoller Bau von Straßen, Hafenanlagen und öffentlichen Gebäuden – für zukünftige Generationen.',
    da: 'Ansvarlig opbygning af veje, havnefaciliteter og offentlige bygninger – for kommende generationer.',
    no: 'Ansvarlig bygging av veier, havneanlegg og offentlige bygninger — for kommende generasjoner.',
  },
  'about.feature3.title': {
    is: 'Atvinnuuppbygging', en: 'Economic development', es: 'Desarrollo económico', pl: 'Rozwój gospodarczy', de: 'Wirtschaftsentwicklung', da: 'Økonomisk udvikling', no: 'Økonomisk utvikling',
  },
  'about.feature3.text': {
    is: 'Við viljum vinna markvisst og skipulega að því að laða að fyrirtæki — ekki með almennum orðum eða vonum, heldur með raunverulegri vinnu.',
    en: 'We want to work systematically to attract businesses — not with general words or hopes, but with real, tangible work.',
    es: 'Queremos trabajar sistemáticamente para atraer empresas — no con palabras generales o esperanzas, sino con trabajo real y tangible.',
    pl: 'Chcemy systematycznie pracować nad przyciąganiem firm — nie ogólnymi słowami czy nadziejami, ale prawdziwą pracą.',
    de: 'Wir wollen systematisch daran arbeiten, Unternehmen anzuziehen – nicht mit allgemeinen Worten oder Hoffnungen, sondern mit echter Arbeit.',
    da: 'Vi ønsker at arbejde systematisk for at tiltrække virksomheder — ikke med generelle ord eller håb, men med reelt arbejde.',
    no: 'Vi ønsker å jobbe systematisk for å tiltrekke bedrifter — ikke med generelle ord eller håp, men med reelt arbeid.',
  },

  // ─── CONTACT ───
  'contact.badge': {
    is: 'Hafðu samband', en: 'Get in touch', es: 'Contáctanos', pl: 'Skontaktuj się', de: 'Kontakt', da: 'Kontakt os', no: 'Kontakt oss',
  },
  'contact.title': {
    is: 'X við K — veldu Fyrir Skagaströnd', en: 'Vote K — choose Fyrir Skagaströnd', es: 'Vota K — elige Fyrir Skagaströnd', pl: 'Głosuj K — wybierz Fyrir Skagaströnd', de: 'Wähle K — wähle Fyrir Skagaströnd', da: 'Stem K — vælg Fyrir Skagaströnd', no: 'Stem K — velg Fyrir Skagaströnd',
  },
  'contact.desc': {
    is: 'Hafðu samband við okkur ef þú vilt fá nánari upplýsingar um stefnu okkar, framboðslistann eða ef þú vilt taka þátt í uppbyggingu samfélagsins.',
    en: 'Contact us if you want more information about our policies, candidate list, or if you want to participate in building the community.',
    es: 'Contáctanos si deseas más información sobre nuestras políticas, lista de candidatos, o si deseas participar en la construcción de la comunidad.',
    pl: 'Skontaktuj się z nami, jeśli chcesz uzyskać więcej informacji o naszej polityce, liście kandydatów lub jeśli chcesz uczestniczyć w budowaniu społeczności.',
    de: 'Kontaktieren Sie uns, wenn Sie weitere Informationen über unsere Politik, die Kandidatenliste wünschen oder an der Gemeinschaftsentwicklung teilnehmen möchten.',
    da: 'Kontakt os hvis du ønsker mere information om vores politik, kandidatliste, eller hvis du vil deltage i opbygningen af samfundet.',
    no: 'Kontakt oss om du ønsker mer informasjon om vår politikk, kandidatliste, eller om du vil delta i oppbyggingen av samfunnet.',
  },
  'contact.facebook': {
    is: 'Facebook síða', en: 'Facebook page', es: 'Página de Facebook', pl: 'Strona Facebook', de: 'Facebook-Seite', da: 'Facebook side', no: 'Facebook-side',
  },
  'contact.email.btn': {
    is: 'Senda tölvupóst', en: 'Send email', es: 'Enviar correo', pl: 'Wyślij e-mail', de: 'E-Mail senden', da: 'Send e-mail', no: 'Send e-post',
  },
  'contact.phone': {
    is: 'Sími', en: 'Phone', es: 'Teléfono', pl: 'Telefon', de: 'Telefon', da: 'Telefon', no: 'Telefon',
  },
  'contact.email': {
    is: 'Netfang', en: 'Email', es: 'Correo electrónico', pl: 'E-mail', de: 'E-Mail', da: 'E-mail', no: 'E-post',
  },
  'contact.location': {
    is: 'Staðsetning', en: 'Location', es: 'Ubicación', pl: 'Lokalizacja', de: 'Standort', da: 'Placering', no: 'Beliggenhet',
  },

  // ─── CANDIDATE PROFILE ───
  'profile.back': {
    is: 'Framboðslisti', en: 'Candidate list', es: 'Lista de candidatos', pl: 'Lista kandydatów', de: 'Kandidatenliste', da: 'Kandidatliste', no: 'Kandidatliste',
  },
  'profile.oddviti': {
    is: 'Oddviti', en: 'Lead candidate', es: 'Candidato principal', pl: 'Główny kandydat', de: 'Spitzenkandidat', da: 'Spidskandidat', no: 'Toppkandidat',
  },
  'profile.nr': {
    is: 'Nr.', en: 'No.', es: 'Nº', pl: 'Nr', de: 'Nr.', da: 'Nr.', no: 'Nr.',
  },
  'profile.onlist': {
    is: 'á lista', en: 'on the list', es: 'en la lista', pl: 'na liście', de: 'auf der Liste', da: 'på listen', no: 'på listen',
  },
  'profile.about': {
    is: 'Um frambjóðandann', en: 'About the candidate', es: 'Sobre el candidato', pl: 'O kandydacie', de: 'Über den Kandidaten', da: 'Om kandidaten', no: 'Om kandidaten',
  },
  'profile.policy': {
    is: 'Stefna framboðsins', en: 'Party policy', es: 'Política del partido', pl: 'Polityka partii', de: 'Parteipolitik', da: 'Partiets politik', no: 'Partiets politikk',
  },
  'profile.prev': {
    is: 'Fyrri', en: 'Previous', es: 'Anterior', pl: 'Poprzedni', de: 'Vorheriger', da: 'Forrige', no: 'Forrige',
  },
  'profile.next': {
    is: 'Næsti', en: 'Next', es: 'Siguiente', pl: 'Następny', de: 'Nächster', da: 'Næste', no: 'Neste',
  },
  'profile.all': {
    is: 'Allir frambjóðendur', en: 'All candidates', es: 'Todos los candidatos', pl: 'Wszyscy kandydaci', de: 'Alle Kandidaten', da: 'Alle kandidater', no: 'Alle kandidater',
  },
  'profile.notfound': {
    is: 'Frambjóðandi fannst ekki', en: 'Candidate not found', es: 'Candidato no encontrado', pl: 'Nie znaleziono kandydata', de: 'Kandidat nicht gefunden', da: 'Kandidat ikke fundet', no: 'Kandidat ikke funnet',
  },
  'profile.notfound.text': {
    is: 'Þessi frambjóðandi er ekki á listanum.', en: 'This candidate is not on the list.', es: 'Este candidato no está en la lista.', pl: 'Ten kandydat nie jest na liście.', de: 'Dieser Kandidat steht nicht auf der Liste.', da: 'Denne kandidat er ikke på listen.', no: 'Denne kandidaten er ikke på listen.',
  },
  'profile.back.btn': {
    is: 'Til baka', en: 'Go back', es: 'Volver', pl: 'Wróć', de: 'Zurück', da: 'Tilbage', no: 'Tilbake',
  },

  // ─── FOOTER ───
  'footer.links': {
    is: 'Tenglar', en: 'Links', es: 'Enlaces', pl: 'Linki', de: 'Links', da: 'Links', no: 'Lenker',
  },
  'footer.contact': {
    is: 'Samband', en: 'Contact', es: 'Contacto', pl: 'Kontakt', de: 'Kontakt', da: 'Kontakt', no: 'Kontakt',
  },
  'footer.legal': {
    is: 'Lög og reglur', en: 'Legal', es: 'Legal', pl: 'Prawne', de: 'Rechtliches', da: 'Juridisk', no: 'Juridisk',
  },
  'footer.privacy': {
    is: 'Persónuverndarstefna', en: 'Privacy policy', es: 'Política de privacidad', pl: 'Polityka prywatności', de: 'Datenschutz', da: 'Privatlivspolitik', no: 'Personvern',
  },
  'footer.cookies': {
    is: 'Vafrakökustefna', en: 'Cookie policy', es: 'Política de cookies', pl: 'Polityka cookies', de: 'Cookie-Richtlinie', da: 'Cookiepolitik', no: 'Informasjonskapsel',
  },
  'footer.copyright': {
    is: 'Allur réttur áskilinn.', en: 'All rights reserved.', es: 'Todos los derechos reservados.', pl: 'Wszelkie prawa zastrzeżone.', de: 'Alle Rechte vorbehalten.', da: 'Alle rettigheder forbeholdes.', no: 'Alle rettigheter forbeholdt.',
  },
  'footer.developer': {
    is: 'Vefhönnun og þróun:', en: 'Design & development:', es: 'Diseño y desarrollo:', pl: 'Projekt i rozwój:', de: 'Design & Entwicklung:', da: 'Design & udvikling:', no: 'Design og utvikling:',
  },

  // ─── FACEBOOK POSTS ───
  'fb.badge': {
    is: 'Fréttir og uppfærslur', en: 'News & updates', es: 'Noticias y actualizaciones', pl: 'Aktualności', de: 'Neuigkeiten', da: 'Nyheder og opdateringer', no: 'Nyheter og oppdateringer',
  },
  'fb.title': {
    is: 'Nýjustu fréttir', en: 'Latest news', es: 'Últimas noticias', pl: 'Najnowsze wiadomości', de: 'Neueste Nachrichten', da: 'Seneste nyheder', no: 'Siste nytt',
  },
  'fb.subtitle': {
    is: 'Fylgstu með okkur á Facebook og vertu með í samtalinu um framtíð Skagastrandar.',
    en: 'Follow us on Facebook and join the conversation about the future of Skagaströnd.',
    es: 'Síguenos en Facebook y únete a la conversación sobre el futuro de Skagaströnd.',
    pl: 'Śledź nas na Facebooku i dołącz do rozmowy o przyszłości Skagaströnd.',
    de: 'Folgen Sie uns auf Facebook und nehmen Sie an der Diskussion über die Zukunft von Skagaströnd teil.',
    da: 'Følg os på Facebook og deltag i samtalen om Skagaströnds fremtid.',
    no: 'Følg oss på Facebook og bli med i samtalen om Skagaströnds fremtid.',
  },
  'fb.seeall': {
    is: 'Sjá allar færslur á Facebook', en: 'See all posts on Facebook', es: 'Ver todas las publicaciones en Facebook', pl: 'Zobacz wszystkie posty na Facebooku', de: 'Alle Beiträge auf Facebook anzeigen', da: 'Se alle opslag på Facebook', no: 'Se alle innlegg på Facebook',
  },
  'nav.frettir': {
    is: 'Fréttir', en: 'News', es: 'Noticias', pl: 'Aktualności', de: 'Neuigkeiten', da: 'Nyheder', no: 'Nyheter',
  },

  // ─── CANDIDATE ROLES ───
  'candidate.1.role': {
    is: 'kennari', en: 'teacher', es: 'profesora', pl: 'nauczycielka', de: 'Lehrerin', da: 'lærer', no: 'lærer',
  },
  'candidate.2.role': {
    is: 'sjálfstætt starfandi athafnamaður', en: 'self-employed entrepreneur', es: 'empresario autónomo', pl: 'samozatrudniony przedsiębiorca', de: 'selbstständiger Unternehmer', da: 'selvstændig iværksætter', no: 'selvstendig næringsdrivende',
  },
  'candidate.3.role': {
    is: 'kennari og leikhúsfræðingur', en: 'teacher & theatre specialist', es: 'profesora y especialista en teatro', pl: 'nauczycielka i specjalistka teatralna', de: 'Lehrerin & Theaterspezialistin', da: 'lærer og teaterspecialist', no: 'lærer og teaterspesialist',
  },
  'candidate.4.role': {
    is: 'athafnamaður', en: 'entrepreneur', es: 'empresario', pl: 'przedsiębiorca', de: 'Unternehmer', da: 'iværksætter', no: 'gründer',
  },
  'candidate.5.role': {
    is: 'kennari', en: 'teacher', es: 'profesora', pl: 'nauczycielka', de: 'Lehrerin', da: 'lærer', no: 'lærer',
  },
  'candidate.6.role': {
    is: 'vélstjóri', en: 'marine engineer', es: 'maquinista naval', pl: 'mechanik okrętowy', de: 'Schiffsingenieur', da: 'skibsmaskinmester', no: 'skipsmaskinist',
  },
  'candidate.7.role': {
    is: 'stuðningsfulltrúi', en: 'support worker', es: 'trabajadora de apoyo', pl: 'pracownik wsparcia', de: 'Unterstützungskraft', da: 'støtteperson', no: 'støttekontakt',
  },
  'candidate.8.role': {
    is: 'stýrimaður', en: 'deck officer', es: 'oficial de puente', pl: 'oficer pokładowy', de: 'nautischer Offizier', da: 'styrmand', no: 'styrmann',
  },
  'candidate.9.role': {
    is: 'yfirmatráður og deildarstjóri frístundar', en: 'head cook in the school kitchen and after-school program manager', es: 'jefa de cocina del comedor escolar y directora del programa extraescolar', pl: 'główna kucharka w kuchni szkolnej i kierowniczka zajęć pozalekcyjnych', de: 'leitende Köchin in der Schulküche und Leiterin der schulischen Nachmittagsbetreuung', da: 'ledende kok i skolens køkken og leder af skolens fritidsordning', no: 'ledende kokk på skolekjøkkenet og leder for skolens fritidsordning',
  },
  'candidate.10.role': {
    is: 'skipstjóri', en: 'ship captain', es: 'capitán de barco', pl: 'kapitan statku', de: 'Schiffskapitän', da: 'skibsfører', no: 'skipsfører',
  },

  // ─── CANDIDATE BIOS ───
  'candidate.1.bio': {
    is: 'Vigdís Elva er kennari sem hefur starfað í menntakerfinu í mörg ár. Hún leggur áherslu á góða menntun og öruggt uppeldisumhverfi fyrir börn á Skagaströnd. Sem oddviti framboðsins leiðir hún hópinn með reynslu, ástríðu og skýra framtíðarsýn.',
    en: 'Vigdís Elva is a teacher who has worked in the education system for many years. She emphasizes quality education and a safe upbringing environment for children in Skagaströnd. As the lead candidate, she guides the group with experience, passion, and a clear vision for the future.',
    es: 'Vigdís Elva es profesora con muchos años de experiencia en el sistema educativo. Ella prioriza la educación de calidad y un entorno seguro para los niños en Skagaströnd. Como candidata principal, lidera el grupo con experiencia, pasión y una visión clara del futuro.',
    pl: 'Vigdís Elva jest nauczycielką, która pracuje w systemie edukacji od wielu lat. Kładzie nacisk na dobrą edukację i bezpieczne środowisko wychowawcze dla dzieci w Skagaströnd. Jako liderka kandydatów, prowadzi grupę z doświadczeniem, pasją i jasną wizją przyszłości.',
    de: 'Vigdís Elva ist eine Lehrerin, die seit vielen Jahren im Bildungssystem arbeitet. Sie legt Wert auf gute Bildung und ein sicheres Erziehungsumfeld für Kinder in Skagaströnd. Als Spitzenkandidatin führt sie die Gruppe mit Erfahrung, Leidenschaft und einer klaren Zukunftsvision.',
    da: 'Vigdís Elva er lærer med mange års erfaring i uddannelsessystemet. Hun lægger vægt på god uddannelse og et trygt opvækstmiljø for børn i Skagaströnd. Som spidskandidat leder hun gruppen med erfaring, passion og en klar fremtidsvision.',
    no: 'Vigdís Elva er lærer som har jobbet i utdanningssystemet i mange år. Hun legger vekt på god utdanning og et trygt oppvekstmiljø for barn i Skagaströnd. Som toppkandidat leder hun gruppen med erfaring, lidenskap og en klar fremtidsvisjon.',
  },
  'candidate.2.bio': {
    is: 'Ragnar er sjálfstætt starfandi athafnamaður sem þekkir vel áskoranir og tækifæri í rekstri á landsbyggðinni. Hann vill styrkja atvinnulíf á Skagaströnd og skapa skilyrði fyrir nýsköpun og fjölbreytni í atvinnulífinu.',
    en: 'Ragnar is a self-employed entrepreneur who understands the challenges and opportunities of running businesses in rural areas. He wants to strengthen the economy in Skagaströnd and create conditions for innovation and diversity in the job market.',
    es: 'Ragnar es un empresario autónomo que conoce bien los desafíos y oportunidades de dirigir negocios en zonas rurales. Quiere fortalecer la economía en Skagaströnd y crear condiciones para la innovación y diversidad en el mercado laboral.',
    pl: 'Ragnar jest samozatrudnionym przedsiębiorcą, który dobrze zna wyzwania i możliwości prowadzenia biznesu na terenach wiejskich. Chce wzmocnić gospodarkę w Skagaströnd i stworzyć warunki dla innowacji i różnorodności na rynku pracy.',
    de: 'Ragnar ist ein selbstständiger Unternehmer, der die Herausforderungen und Chancen des ländlichen Geschäftsbetriebs gut kennt. Er möchte die Wirtschaft in Skagaströnd stärken und Bedingungen für Innovation und Vielfalt auf dem Arbeitsmarkt schaffen.',
    da: 'Ragnar er selvstændig iværksætter, der kender udfordringerne og mulighederne ved at drive virksomhed i landområder. Han vil styrke erhvervslivet i Skagaströnd og skabe betingelser for innovation og mangfoldighed på arbejdsmarkedet.',
    no: 'Ragnar er selvstendig næringsdrivende som kjenner utfordringene og mulighetene ved å drive virksomhet i distriktene. Han vil styrke næringslivet i Skagaströnd og skape vilkår for innovasjon og mangfold i arbeidsmarkedet.',
  },
  'candidate.3.bio': {
    is: 'Ástrós er bæði kennari og leikhúsfræðingur sem tengir saman menntun og menningu. Hún leggur áherslu á að styrkja menningarlíf á Skagaströnd og tryggja fjölbreytt tómstundastarf fyrir alla aldurshópa.',
    en: 'Ástrós is both a teacher and theatre specialist who connects education and culture. She emphasizes strengthening cultural life in Skagaströnd and ensuring diverse recreational activities for all age groups.',
    es: 'Ástrós es profesora y especialista en teatro que conecta la educación con la cultura. Prioriza fortalecer la vida cultural en Skagaströnd y garantizar actividades recreativas diversas para todas las edades.',
    pl: 'Ástrós jest zarówno nauczycielką, jak i specjalistką teatralną, łączącą edukację z kulturą. Kładzie nacisk na wzmocnienie życia kulturalnego w Skagaströnd i zapewnienie różnorodnych zajęć rekreacyjnych dla wszystkich grup wiekowych.',
    de: 'Ástrós ist sowohl Lehrerin als auch Theaterspezialistin und verbindet Bildung mit Kultur. Sie setzt sich für ein stärkeres Kulturleben in Skagaströnd ein und für vielfältige Freizeitangebote für alle Altersgruppen.',
    da: 'Ástrós er både lærer og teaterspecialist, der forbinder uddannelse og kultur. Hun lægger vægt på at styrke kulturlivet i Skagaströnd og sikre varierede fritidsaktiviteter for alle aldersgrupper.',
    no: 'Ástrós er både lærer og teaterspesialist som kobler utdanning og kultur. Hun legger vekt på å styrke kulturlivet i Skagaströnd og sikre varierte fritidsaktiviteter for alle aldersgrupper.',
  },
  'candidate.4.bio': {
    is: 'Jóhann Guðbjartur er athafnamaður með víðtæka reynslu af rekstri og viðskiptum. Hann leggur áherslu á ábyrga fjármálastjórn og skipulagða uppbyggingu innviða í sveitarfélaginu.',
    en: 'Jóhann Guðbjartur is an entrepreneur with extensive experience in business management. He emphasizes responsible financial management and organized infrastructure development in the municipality.',
    es: 'Jóhann Guðbjartur es un empresario con amplia experiencia en gestión empresarial. Prioriza la gestión financiera responsable y el desarrollo organizado de infraestructura municipal.',
    pl: 'Jóhann Guðbjartur jest przedsiębiorcą z szerokim doświadczeniem w zarządzaniu biznesem. Kładzie nacisk na odpowiedzialne zarządzanie finansami i zorganizowaną budowę infrastruktury gminnej.',
    de: 'Jóhann Guðbjartur ist ein Unternehmer mit umfangreicher Geschäftserfahrung. Er betont verantwortungsvolle Finanzverwaltung und planmäßige Infrastrukturentwicklung in der Gemeinde.',
    da: 'Jóhann Guðbjartur er iværksætter med bred erfaring inden for forretningsdrift. Han lægger vægt på ansvarlig økonomisk styring og organiseret infrastrukturudvikling i kommunen.',
    no: 'Jóhann Guðbjartur er gründer med bred erfaring innen forretningsdrift. Han legger vekt på ansvarlig økonomistyring og organisert infrastrukturutvikling i kommunen.',
  },
  'candidate.5.bio': {
    is: 'Halla María er kennari sem hefur brennandi áhuga á velferð barna og ungmenna. Hún vill tryggja að Skagaströnd sé fjölskylduvænt samfélag þar sem öll fá tækifæri til að dafna.',
    en: 'Halla María is a teacher with a strong passion for children and youth welfare. She wants to ensure Skagaströnd is a family-friendly community where everyone gets the opportunity to thrive.',
    es: 'Halla María es profesora con una gran pasión por el bienestar de niños y jóvenes. Quiere que Skagaströnd sea una comunidad familiar donde todos tengan la oportunidad de prosperar.',
    pl: 'Halla María jest nauczycielką z wielką pasją do dobro dzieci i młodzieży. Chce zapewnić, że Skagaströnd będzie przyjazną dla rodzin społecznością, gdzie każdy ma szansę na rozwój.',
    de: 'Halla María ist eine Lehrerin mit großer Leidenschaft für das Wohlergehen von Kindern und Jugendlichen. Sie möchte sicherstellen, dass Skagaströnd eine familienfreundliche Gemeinschaft ist, in der alle die Chance haben, sich zu entfalten.',
    da: 'Halla María er lærer med en stærk passion for børn og unges trivsel. Hun vil sikre, at Skagaströnd er et familievenligt samfund, hvor alle får mulighed for at trives.',
    no: 'Halla María er lærer med et sterkt engasjement for barn og unges velferd. Hun vil sørge for at Skagaströnd er et familievennlig samfunn der alle får muligheten til å trives.',
  },
  'candidate.6.bio': {
    is: 'Patrik Snær er vélstjóri með mikla hagnýta reynslu. Hann þekkir vel innviði sveitarfélagsins og leggur áherslu á raunhæfar og ábyrgar fjárfestingar sem nýtast til lengri tíma.',
    en: 'Patrik Snær is a marine engineer with extensive practical experience. He knows the municipality\'s infrastructure well and emphasizes realistic and responsible investments that last long-term.',
    es: 'Patrik Snær es maquinista naval con amplia experiencia práctica. Conoce bien la infraestructura municipal y prioriza inversiones realistas y responsables que perduren a largo plazo.',
    pl: 'Patrik Snær jest mechanikiem okrętowym z dużym doświadczeniem praktycznym. Dobrze zna infrastrukturę gminy i kładzie nacisk na realistyczne i odpowiedzialne inwestycje długoterminowe.',
    de: 'Patrik Snær ist Schiffsingenieur mit umfangreicher praktischer Erfahrung. Er kennt die Infrastruktur der Gemeinde gut und legt Wert auf realistische und verantwortungsvolle langfristige Investitionen.',
    da: 'Patrik Snær er skibsmaskinmester med stor praktisk erfaring. Han kender kommunens infrastruktur godt og lægger vægt på realistiske og ansvarlige investeringer der holder på lang sigt.',
    no: 'Patrik Snær er skipsmaskinist med bred praktisk erfaring. Han kjenner kommunens infrastruktur godt og legger vekt på realistiske og ansvarlige investeringer som varer over tid.',
  },
  'candidate.7.bio': {
    is: 'Eva Dís er stuðningsfulltrúi sem leggur áherslu á félagslegan stuðning og velferðarþjónustu. Hún vill tryggja að allir íbúar Skagastrandar fái þá þjónustu sem þeir þurfa.',
    en: 'Eva Dís is a support worker who emphasizes social support and welfare services. She wants to ensure that all residents of Skagaströnd receive the services they need.',
    es: 'Eva Dís es trabajadora de apoyo que prioriza el apoyo social y los servicios de bienestar. Quiere asegurar que todos los residentes de Skagaströnd reciban los servicios que necesitan.',
    pl: 'Eva Dís jest pracownikiem wsparcia, który kładzie nacisk na wsparcie społeczne i usługi socjalne. Chce zapewnić, aby wszyscy mieszkańcy Skagaströnd otrzymywali potrzebne usługi.',
    de: 'Eva Dís ist eine Unterstützungskraft, die sozialen Beistand und Wohlfahrtsdienste betont. Sie möchte sicherstellen, dass alle Einwohner von Skagaströnd die Dienstleistungen erhalten, die sie benötigen.',
    da: 'Eva Dís er støtteperson med fokus på social støtte og velfærdstjenester. Hun vil sikre, at alle beboere i Skagaströnd får de ydelser, de har brug for.',
    no: 'Eva Dís er støttekontakt som legger vekt på sosial støtte og velferdstjenester. Hun vil sørge for at alle innbyggere i Skagaströnd får de tjenestene de trenger.',
  },
  'candidate.8.bio': {
    is: 'Andri Már er stýrimaður með víðtæka reynslu á sjó. Hann þekkir vel mikilvægi hafnarinnar og sjávarútvegsins fyrir samfélagið og vill tryggja öflugan sjávarútveg til framtíðar.',
    en: 'Andri Már is a deck officer with extensive maritime experience. He understands the importance of the harbor and fishing industry for the community and wants to ensure a strong fishing industry for the future.',
    es: 'Andri Már es oficial de puente con amplia experiencia marítima. Comprende la importancia del puerto y la industria pesquera para la comunidad y quiere asegurar una industria pesquera fuerte para el futuro.',
    pl: 'Andri Már jest oficerem pokładowym z szerokim doświadczeniem morskim. Rozumie znaczenie portu i rybołówstwa dla społeczności i chce zapewnić silny przemysł rybny na przyszłość.',
    de: 'Andri Már ist nautischer Offizier mit umfangreicher Seefahrtserfahrung. Er versteht die Bedeutung des Hafens und der Fischereiindustrie für die Gemeinschaft und möchte eine starke Fischerei für die Zukunft sichern.',
    da: 'Andri Már er styrmand med bred maritim erfaring. Han forstår havnens og fiskeriindustriens betydning for samfundet og vil sikre en stærk fiskeriindustri for fremtiden.',
    no: 'Andri Már er styrmann med bred maritim erfaring. Han forstår betydningen av havnen og fiskerinæringen for samfunnet og vil sikre en sterk fiskerinæring for fremtiden.',
  },
  'candidate.9.bio': {
    is: 'Daniela Esmeralda starfar sem yfirmatráður í eldhúsi skólans og sem deildarstjóri frístundar. Hún leggur áherslu á góða umönnun barna, traust skólasamfélag og öflugt frístundastarf á Skagaströnd.',
    en: 'Daniela Esmeralda works as the head cook in the school kitchen and as the manager of the after-school program. She emphasizes strong care for children, a trustworthy school community, and a strong after-school program in Skagaströnd.',
    es: 'Daniela Esmeralda trabaja como jefa de cocina del comedor escolar y como directora del programa extraescolar. Da prioridad al buen cuidado de los niños, a una comunidad escolar de confianza y a un programa extraescolar sólido en Skagaströnd.',
    pl: 'Daniela Esmeralda pracuje jako główna kucharka w kuchni szkolnej oraz jako kierowniczka zajęć pozalekcyjnych. Kładzie nacisk na dobrą opiekę nad dziećmi, zaufaną społeczność szkolną i silny program zajęć pozalekcyjnych w Skagaströnd.',
    de: 'Daniela Esmeralda arbeitet als leitende Köchin in der Schulküche und als Leiterin der Nachmittagsbetreuung. Sie legt Wert auf gute Betreuung von Kindern, eine verlässliche Schulgemeinschaft und ein starkes Nachmittagsangebot in Skagaströnd.',
    da: 'Daniela Esmeralda arbejder som ledende kok i skolens køkken og som leder af fritidsordningen. Hun lægger vægt på god omsorg for børn, et trygt skolefællesskab og en stærk fritidsordning i Skagaströnd.',
    no: 'Daniela Esmeralda jobber som ledende kokk på skolekjøkkenet og som leder for fritidsordningen. Hun legger vekt på god omsorg for barn, et trygt skolemiljø og en sterk fritidsordning i Skagaströnd.',
  },
  'candidate.10.bio': {
    is: 'Ágúst Óðinn er skipstjóri sem þekkir vel sjávarútveg og siglingagreinina. Hann leggur áherslu á öfluga hafnarstarfsemi og sjálfbæra nýtingu auðlinda.',
    en: 'Ágúst Óðinn is a ship captain who knows the fishing and maritime industries well. He emphasizes strong harbor operations and sustainable use of resources.',
    es: 'Ágúst Óðinn es capitán de barco con buen conocimiento de la industria pesquera y marítima. Prioriza operaciones portuarias sólidas y el uso sostenible de los recursos.',
    pl: 'Ágúst Óðinn jest kapitanem statku, który dobrze zna przemysł rybny i morski. Kładzie nacisk na silną działalność portową i zrównoważone wykorzystanie zasobów.',
    de: 'Ágúst Óðinn ist Schiffskapitän und kennt die Fischerei- und Schifffahrtsindustrie gut. Er betont starke Hafenoperationen und nachhaltige Ressourcennutzung.',
    da: 'Ágúst Óðinn er skibsfører med godt kendskab til fiskeri- og søfartsindustrien. Han lægger vægt på stærk havnedrift og bæredygtig udnyttelse af ressourcer.',
    no: 'Ágúst Óðinn er skipsfører som kjenner fiskeri- og sjøfartsnæringen godt. Han legger vekt på sterk havnedrift og bærekraftig ressursutnyttelse.',
  },

  // ─── LEGAL PAGES ───
  'legal.back': {
    is: 'Til baka', en: 'Go back', es: 'Volver', pl: 'Wróć', de: 'Zurück', da: 'Tilbage', no: 'Tilbake',
  },
  'privacy.title': {
    is: 'Persónuverndarstefna', en: 'Privacy Policy', es: 'Política de privacidad', pl: 'Polityka prywatności', de: 'Datenschutzerklärung', da: 'Privatlivspolitik', no: 'Personvernerklæring',
  },
  'privacy.updated': {
    is: 'Síðast uppfært:', en: 'Last updated:', es: 'Última actualización:', pl: 'Ostatnia aktualizacja:', de: 'Zuletzt aktualisiert:', da: 'Sidst opdateret:', no: 'Sist oppdatert:',
  },
  'privacy.1.title': {
    is: '1. Ábyrgðaraðili', en: '1. Data Controller', es: '1. Responsable del tratamiento', pl: '1. Administrator danych', de: '1. Verantwortliche Stelle', da: '1. Dataansvarlig', no: '1. Behandlingsansvarlig',
  },
  'privacy.1.text': {
    is: 'Fyrir Skagaströnd (hér eftir „framboðið") ber ábyrgð á meðhöndlun persónuupplýsinga sem safnað er í gegnum vefsíðuna fyrirskagastrond.com. Framboðið starfar í samræmi við lög nr. 90/2018 um persónuvernd og meðferð persónuupplýsinga og reglugerð (ESB) 2016/679 (GDPR).',
    en: 'Fyrir Skagaströnd (hereafter "the party") is responsible for the processing of personal data collected through the website fyrirskagastrond.com. The party operates in accordance with Icelandic Act No. 90/2018 on Data Protection and EU Regulation 2016/679 (GDPR).',
    es: 'Fyrir Skagaströnd (en adelante "el partido") es responsable del tratamiento de datos personales recopilados a través del sitio web fyrirskagastrond.com. El partido opera conforme a la Ley islandesa 90/2018 sobre Protección de Datos y el Reglamento (UE) 2016/679 (RGPD).',
    pl: 'Fyrir Skagaströnd (dalej „partia") jest odpowiedzialna za przetwarzanie danych osobowych zbieranych za pośrednictwem strony fyrirskagastrond.com. Partia działa zgodnie z islandzką ustawą nr 90/2018 o ochronie danych osobowych oraz rozporządzeniem (UE) 2016/679 (RODO).',
    de: 'Fyrir Skagaströnd (nachfolgend „die Partei") ist verantwortlich für die Verarbeitung personenbezogener Daten, die über die Website fyrirskagastrond.com erhoben werden. Die Partei handelt in Übereinstimmung mit dem isländischen Datenschutzgesetz Nr. 90/2018 und der EU-Verordnung 2016/679 (DSGVO).',
    da: 'Fyrir Skagaströnd (herefter "partiet") er ansvarlig for behandlingen af personoplysninger indsamlet via hjemmesiden fyrirskagastrond.com. Partiet opererer i overensstemmelse med den islandske databeskyttelseslov nr. 90/2018 og EU-forordning 2016/679 (GDPR).',
    no: 'Fyrir Skagaströnd (heretter «partiet») er ansvarlig for behandling av personopplysninger samlet inn gjennom nettsiden fyrirskagastrond.com. Partiet opererer i samsvar med den islandske personvernloven nr. 90/2018 og EU-forordning 2016/679 (GDPR).',
  },
  'privacy.2.title': {
    is: '2. Hvaða upplýsingum er safnað', en: '2. What data is collected', es: '2. Qué datos se recopilan', pl: '2. Jakie dane są zbierane', de: '2. Welche Daten werden erhoben', da: '2. Hvilke oplysninger indsamles', no: '2. Hvilke data samles inn',
  },
  'privacy.2.text': {
    is: 'Vefsíðan safnar aðeins þeim upplýsingum sem eru nauðsynlegar:', en: 'The website only collects information that is necessary:', es: 'El sitio web solo recopila la información necesaria:', pl: 'Strona internetowa zbiera wyłącznie niezbędne informacje:', de: 'Die Website erhebt nur die notwendigen Informationen:', da: 'Hjemmesiden indsamler kun de nødvendige oplysninger:', no: 'Nettsiden samler bare inn nødvendig informasjon:',
  },
  'privacy.2.item1': {
    is: 'Tengiliðaupplýsingar: Ef þú hefur samband við okkur í gegnum tölvupóst eða síma, geymum við nafn þitt, netfang og skilaboð.',
    en: 'Contact information: If you contact us via email or phone, we store your name, email address, and message.',
    es: 'Información de contacto: Si nos contacta por correo electrónico o teléfono, almacenamos su nombre, dirección de correo electrónico y mensaje.',
    pl: 'Dane kontaktowe: Jeśli skontaktujesz się z nami przez e-mail lub telefon, przechowujemy Twoje imię, adres e-mail i wiadomość.',
    de: 'Kontaktdaten: Wenn Sie uns per E-Mail oder Telefon kontaktieren, speichern wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht.',
    da: 'Kontaktoplysninger: Hvis du kontakter os via e-mail eller telefon, gemmer vi dit navn, din e-mailadresse og din besked.',
    no: 'Kontaktinformasjon: Hvis du kontakter oss via e-post eller telefon, lagrer vi navn, e-postadresse og melding.',
  },
  'privacy.2.item2': {
    is: 'Tækniupplýsingar: Vafrakökur (cookies) sem eru nauðsynlegar til að vefsíðan virki rétt.',
    en: 'Technical information: Cookies that are necessary for the website to function properly.',
    es: 'Información técnica: Cookies necesarias para que el sitio web funcione correctamente.',
    pl: 'Informacje techniczne: pliki cookie niezbędne do prawidłowego działania strony.',
    de: 'Technische Informationen: Cookies, die für das ordnungsgemäße Funktionieren der Website notwendig sind.',
    da: 'Tekniske oplysninger: Cookies der er nødvendige for at hjemmesiden fungerer korrekt.',
    no: 'Teknisk informasjon: Informasjonskapsler som er nødvendige for at nettsiden skal fungere riktig.',
  },
  'privacy.contact.title': {
    is: '9. Samband', en: '9. Contact', es: '9. Contacto', pl: '9. Kontakt', de: '9. Kontakt', da: '9. Kontakt', no: '9. Kontakt',
  },
  'privacy.contact.text': {
    is: 'Ef þú hefur spurningar um persónuverndarstefnu okkar eða vilt nýta réttindi þín, vinsamlegast hafðu samband:',
    en: 'If you have questions about our privacy policy or want to exercise your rights, please contact:',
    es: 'Si tiene preguntas sobre nuestra política de privacidad o desea ejercer sus derechos, por favor contacte:',
    pl: 'Jeśli masz pytania dotyczące naszej polityki prywatności lub chcesz skorzystać ze swoich praw, skontaktuj się:',
    de: 'Wenn Sie Fragen zu unserer Datenschutzerklärung haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte:',
    da: 'Hvis du har spørgsmål om vores privatlivspolitik eller vil udøve dine rettigheder, kontakt os venligst:',
    no: 'Hvis du har spørsmål om vår personvernerklæring eller ønsker å utøve dine rettigheter, ta kontakt:',
  },
  'cookie.title': {
    is: 'Vafrakökustefna', en: 'Cookie Policy', es: 'Política de cookies', pl: 'Polityka cookies', de: 'Cookie-Richtlinie', da: 'Cookiepolitik', no: 'Informasjonskapsler',
  },
  'cookie.what.title': {
    is: '1. Hvað eru vafrakökur?', en: '1. What are cookies?', es: '1. ¿Qué son las cookies?', pl: '1. Czym są pliki cookie?', de: '1. Was sind Cookies?', da: '1. Hvad er cookies?', no: '1. Hva er informasjonskapsler?',
  },
  'cookie.what.text': {
    is: 'Vafrakökur (cookies) eru litlar textaskrár sem vefsíður vista á tölvu þinni eða snjalltæki þegar þú heimsækir þær. Þær eru notaðar til að bæta upplifun þína á vefsíðunni.',
    en: 'Cookies are small text files that websites store on your computer or smart device when you visit them. They are used to improve your experience on the website.',
    es: 'Las cookies son pequeños archivos de texto que los sitios web almacenan en su computadora o dispositivo inteligente cuando los visita. Se utilizan para mejorar su experiencia en el sitio web.',
    pl: 'Cookies to małe pliki tekstowe, które strony internetowe zapisują na komputerze lub urządzeniu mobilnym podczas odwiedzin. Służą do poprawy doświadczenia użytkownika.',
    de: 'Cookies sind kleine Textdateien, die Websites auf Ihrem Computer oder Smartgerät speichern, wenn Sie sie besuchen. Sie dienen dazu, Ihre Erfahrung auf der Website zu verbessern.',
    da: 'Cookies er små tekstfiler, som hjemmesider gemmer på din computer eller smartenhed, når du besøger dem. De bruges til at forbedre din oplevelse på hjemmesiden.',
    no: 'Informasjonskapsler er små tekstfiler som nettsteder lagrer på datamaskinen eller smartenheten din når du besøker dem. De brukes til å forbedre opplevelsen din på nettsiden.',
  },
  'cookie.which.title': {
    is: '2. Hvaða vafrakökur notar vefsíðan?', en: '2. Which cookies does the website use?', es: '2. ¿Qué cookies utiliza el sitio web?', pl: '2. Jakie pliki cookie używa strona?', de: '2. Welche Cookies verwendet die Website?', da: '2. Hvilke cookies bruger hjemmesiden?', no: '2. Hvilke informasjonskapsler bruker nettsiden?',
  },
  'cookie.which.text': {
    is: 'Vefsíðan fyrirskagastrond.com notar eingöngu tæknilega nauðsynlegar vafrakökur. Engar rekjandi vafrakökur eða þriðja aðila vafrakökur eru notaðar.',
    en: 'The website fyrirskagastrond.com uses only technically necessary cookies. No tracking cookies or third-party cookies are used.',
    es: 'El sitio web fyrirskagastrond.com utiliza únicamente cookies técnicamente necesarias. No se utilizan cookies de rastreo ni de terceros.',
    pl: 'Strona fyrirskagastrond.com używa wyłącznie technicznie niezbędnych plików cookie. Nie są używane pliki cookie śledzące ani pliki cookie stron trzecich.',
    de: 'Die Website fyrirskagastrond.com verwendet ausschließlich technisch notwendige Cookies. Es werden keine Tracking-Cookies oder Drittanbieter-Cookies verwendet.',
    da: 'Hjemmesiden fyrirskagastrond.com bruger kun teknisk nødvendige cookies. Der bruges ingen sporings-cookies eller tredjepartscookies.',
    no: 'Nettsiden fyrirskagastrond.com bruker bare teknisk nødvendige informasjonskapsler. Ingen sporings- eller tredjeparts-informasjonskapsler brukes.',
  },
};

export default translations;

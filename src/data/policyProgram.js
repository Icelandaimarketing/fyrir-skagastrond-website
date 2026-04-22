import policyTranslations from './policyTranslations.js';

const SITE_IMAGES_BASE = 'https://yestlkukcdjlrtvxugkg.supabase.co/storage/v1/object/public/site-images';

function siteImage(path) {
  return `${SITE_IMAGES_BASE}/${String(path || '').replace(/^\/+/, '')}`;
}

export const POLICY_POSTER_IMAGES = {
  'abyrg-fjarmal': siteImage('stefna/675125640_122107452140882862_283659940078139276_n.jpg'),
  'atvinnulif-og-ny-taekifaeri': siteImage('stefna/675649976_122107452074882862_4567181385660591120_n.jpg'),
  'fjarvinna-og-folksfjolgun': siteImage('stefna/677117813_122107452032882862_7459279326040651006_n.jpg'),
  husnaedismal: siteImage('stefna/674881536_122107452332882862_1864268138474204687_n.jpg'),
  'skolamal-og-uppeldi': siteImage('stefna/677077557_122107452290882862_6379230204381601_n.jpg'),
  'samgongur-og-adgengi': siteImage('stefna/677100951_122107452248882862_8628416463933919303_n.jpg'),
  'thjonusta-vid-eldri-borgara': siteImage('stefna/677122285_122107452206882862_3349739488365878084_n.jpg'),
  'ferdathjonusta-og-ny-taekifaeri': siteImage('stefna/677058999_122107452374882862_7423076807560138486_n.jpg'),
  'umhverfi-og-asynd-baejarins': siteImage('stefna/677146856_122107452416882862_5029237448341108586_n.jpg'),
  'atvinnutakifaeri-fyrir-alla': siteImage('stefna/677205359_122107452452882862_2493515143882674201_n.jpg'),
  'samstarf-gagnsaei-og-traust': siteImage('stefna/677255803_122107452500882862_3969729102058301953_n.jpg'),
  sameiningarmal: siteImage('stefna/677249623_122107452542882862_2201707547156806135_n.jpg'),
};

export function getPolicyPosterImage(slug) {
  return POLICY_POSTER_IMAGES[slug] || null;
}

export const SUPPORTED_POLICY_LANGUAGES = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];

const POLICY_SHORT_TITLES = {
  'abyrg-fjarmal': 'Ábyrg fjármál',
  'atvinnulif-og-ny-taekifaeri': 'Atvinnulíf',
  'fjarvinna-og-folksfjolgun': 'Fjarvinna',
  husnaedismal: 'Húsnæðismál',
  'skolamal-og-uppeldi': 'Skólamál',
  'samgongur-og-adgengi': 'Samgöngur',
  'thjonusta-vid-eldri-borgara': 'Eldri borgarar',
  'ferdathjonusta-og-ny-taekifaeri': 'Ferðaþjónusta',
  'umhverfi-og-asynd-baejarins': 'Umhverfi',
  'menning-vidburdir-og-imynd': 'Menning',
  'atvinnutakifaeri-fyrir-alla': 'Atvinnutækifæri',
  'samstarf-gagnsaei-og-traust': 'Samstarf',
  'skyr-syn-og-framtid': 'Skýr sýn',
  sameiningarmal: 'Sameiningarmál',
};

export const POLICY_PROGRAM = [
  {
    slug: 'abyrg-fjarmal',
    title: 'Ábyrg fjármál og traustur rekstur',
    summary: 'Traustur rekstur, ráðdeild í fjármálum og skynsamleg nýting fjármuna með hagsmuni íbúa að leiðarljósi.',
    category: 'Rekstur',
    image: '/Generated Image April 16, 2026 - 12_54AM.jpg',
    body: [
      'Fyrir Skagaströnd er fjölbreyttur hópur fólks sem vill vinna af ábyrgð fyrir samfélagið á Skagaströnd. Við leggjum áherslu á að byggja á traustum rekstrargrunni sveitarfélagsins og leitast við að halda rekstrinum jákvæðum áfram, gæta að ráðdeild í fjármálum og forðast að skuldsetja sveitarfélagið um efni fram.',
      'Við viljum tryggja að fjármunir séu nýttir skynsamlega og með hagsmuni íbúa að leiðarljósi.',
    ],
  },
  {
    slug: 'atvinnulif-og-ny-taekifaeri',
    title: 'Atvinnulíf og ný tækifæri',
    summary: 'Raunhæfar leiðir til að laða að fyrirtæki, styðja staðbundna þjónustu og skapa ný störf.',
    category: 'Atvinna',
    image: '/32811cdf-7de7-43d4-87a2-2fabf2cdcc0a.jpg',
    body: [
      'Við viljum efla atvinnulíf á Skagaströnd með því að skoða raunhæfar leiðir til að laða að fyrirtæki til starfa. Þar horfum við bæði til fjarvinnu og uppbyggingar starfa á staðnum.',
      'Okkur þykir einnig eðlilegt þegar kemur að verkefnum á vegum sveitarfélagsins að leitast sé við að kaupa þjónustu af fyrirtækjum á svæðinu þegar því verður við komið. Með því styðjum við beint við atvinnulífið og styrkjum rekstrargrundvöll fyrirtækja.',
    ],
  },
  {
    slug: 'fjarvinna-og-folksfjolgun',
    title: 'Fjarvinna og fólksfjölgun',
    summary: 'Gera Skagaströnd að raunverulegum valkosti fyrir fjarvinnu, nýja íbúa og fjölskyldur.',
    category: 'Samfélag',
    image: '/Group images/31.jpg',
    body: [
      'Við viljum efla Skagaströnd sem raunverulegan valkost fyrir fjarvinnu. Með góðum innviðum, aðstöðu og markvissri kynningu getum við laðað að nýja íbúa og nýtt aðstöðu sem fyrir er í samfélaginu.',
      'Við viljum vinna markvisst að fjölgun íbúa með því að taka vel á móti nýju fólki og skapa raunveruleg tækifæri til búsetu og atvinnu.',
      'Við viljum styðja nýja íbúa frá fyrstu stundu með því að færa öllum nýburum í bænum táknræna gjöf. Með því sýnum við hlýhug samfélagsins og leggjum áherslu á velferð barna og fjölskyldna.',
    ],
  },
  {
    slug: 'husnaedismal',
    title: 'Húsnæðismál',
    summary: 'Auka framboð íbúðarhúsnæðis, minni aðgengilegra íbúða og iðnaðar- og atvinnulóða.',
    category: 'Uppbygging',
    image: '/Group images/30.jpg',
    body: [
      'Við viljum stuðla að aukinni uppbyggingu íbúðarhúsnæðis á Skagaströnd til að mæta fjölbreyttum þörfum íbúa og styðja við vöxt samfélagsins. Sérstök áhersla verður lögð á að kanna möguleika á minni og aðgengilegum íbúðum fyrir heldra fólk t.d. með byggingu þjónustukjarna. Með því skapast fleiri valkostir fyrir þann hóp, auk þess sem stærri eignir geta losnað og orðið aðgengilegar fyrir fjölskyldur.',
      'Við leggjum einnig áherslu á að hvetja verktaka á svæðinu til virkrar þátttöku í þessari uppbyggingu og skapa þannig öflugt samstarf sem nýtist samfélaginu í heild.',
      'Samhliða þessu viljum við tryggja gott framboð af iðnaðar- og atvinnulóðum, þannig að fyrirtæki og einstaklingar hafi tækifæri til að byggja upp starfsemi sína á svæðinu. Með markvissri skipulagningu getum við laðað að ný tækifæri, styrkt atvinnulíf og stuðlað að sjálfbærri þróun Skagastrandar.',
      'Við viljum jafnframt lækka fasteignagjöld þegar góð rekstrarstaða skapar svigrúm til þess.',
    ],
  },
  {
    slug: 'skolamal-og-uppeldi',
    title: 'Skólamál og uppeldi',
    summary: 'Bæta daglegt skólaumhverfi, tryggja góða leikskólaþjónustu og móta framtíðarsýn til lengri tíma.',
    category: 'Fjölskyldur',
    image: '/Fyrir Skagaströnd.jpg',
    body: [
      'Við viljum bæta aðstöðu í skólanum með það að markmiði að mötuneyti/móttökueldhús verði innan skólans. Þá er það framtíðarmarkmið að tónlistarskólinn verði undir sama þaki og grunnskólinn. Með því styrkjum við skólastarf á Skagaströnd og bætum daglegt umhverfi nemenda.',
      'Leikskólinn á Skagaströnd er þegar sterkur, og viljum við tryggja áfram góða þjónustu, þar á meðal inntöku barna frá 12 mánaða aldri og góðan opnunartíma. Sveitarfélagið tryggi börnum möguleika á leikskólavist frá 12 mánaða aldri og með undantekningum frá 9 mánaða aldri.',
      'Jafnframt viljum við skoða rekstur og húsnæðismál leikskólans með hliðsjón af kostnaði og gæðaviðmiðum fyrir starfsfólk. Mikilvægt er að vinna þetta markvisst, til dæmis með stofnun starfshóps sem mótar framtíðarsýn til lengri tíma.',
    ],
  },
  {
    slug: 'samgongur-og-adgengi',
    title: 'Samgöngur og aðgengi',
    summary: 'Betri samgöngur, vel sinnt snjómokstur, viðhald gatna og lagfæring á mikilvægum leiðum.',
    category: 'Innviðir',
    image: '/Generated Image April 16, 2026 - 12_57AM.jpg',
    body: [
      'Við viljum láta reyna á það hvort hægt sé að fara í samstarf við Strætó varðandi betri samgöngur fyrir svæðið.',
      'Tryggja það að snjómokstri sé vel sinnt og að götum og gangstéttum sé haldið við.',
      'Meðal þess sem þarf að laga er vegurinn meðfram Sandlæk (Skagavegur) upp á „Kosningabraut“. Það ætlum við að gera.',
    ],
  },
  {
    slug: 'thjonusta-vid-eldri-borgara',
    title: 'Þjónusta við eldri borgara',
    summary: 'Styrkja þjónustu og félagslíf svo heldra fólk geti búið lengur heima við góðar aðstæður.',
    category: 'Velferð',
    image: '/Group images/28.jpg',
    body: [
      'Við viljum styrkja þjónustu við heldra fólk með það að markmiði að gera þeim kleift að búa lengur heima við góðar aðstæður. Sjá nánar í kaflanum um Húsnæðismál.',
      'Einnig viljum við efla félagslíf og aðstöðu fyrir heldri borgara þannig að þeir geti notið virks og innihaldsríks lífs í samfélaginu.',
    ],
  },
  {
    slug: 'ferdathjonusta-og-ny-taekifaeri',
    title: 'Ferðaþjónusta og ný tækifæri',
    summary: 'Skoða markvisst hvernig ferðaþjónusta getur skapað ný störf og auknar tekjur í samfélaginu.',
    category: 'Tækifæri',
    image: '/Spákonufell.jpg',
    body: [
      'Við viljum að sveitarfélagið kanni markvisst hvernig hægt sé að efla ferðaþjónustu á Skagaströnd.',
      'Þar verði meðal annars skoðað hvort og með hvaða hætti hægt sé að laða að skemmtiferðaskip og aðra ferðamenn, með það að markmiði að skapa ný störf og auka tekjur í samfélaginu. Jafnframt viljum við gera fjallahjólabraut og skoða hvort hægt sé að nýta þann slóða sem þegar hefur verið lagður við Spákonufell.',
    ],
  },
  {
    slug: 'umhverfi-og-asynd-baejarins',
    title: 'Umhverfi og ásýnd bæjarins',
    summary: 'Halda áfram að fegra Skagaströnd og bæta viðhald á eignum sveitarfélagsins.',
    category: 'Umhverfi',
    image: '/Frambjódendur.jpg',
    body: [
      'Við viljum halda áfram að fegra Skagaströnd. Sveitarfélagið á að ganga þar fremst í flokki með því að bæta viðhald á eigin eignum og stuðla að snyrtilegu og aðlaðandi umhverfi.',
      'Við viljum jafnframt tryggja að sveitarfélagið uppfylli skyldur sínar í úrgangsmálum og stuðli þannig að hreinu og heilnæmu umhverfi.',
      'Við viljum halda áfram að vinna að fráveitumálum og tryggja að innviðir sveitafélagsins standist nútímakröfur um umhverfisvernd og öryggi.',
    ],
  },
  {
    slug: 'menning-vidburdir-og-imynd',
    title: 'Menning, viðburðir og ímynd',
    summary: 'Efla Skagaströnd sem áfangastað fyrir viðburði, listir og menningu.',
    category: 'Menning',
    image: '/672687758_122106851792882862_7544970561132018983_n.jpg',
    body: [
      'Við viljum efla Skagaströnd sem áfangastað fyrir viðburði, listir og menningu.',
      'Með markvissri kynningu og uppbyggingu viljum við skapa meira líf í bænum og styrkja ímynd hans út á við. Við viljum halda áfram að styðja við viðburðahald í bænum, t.d. Hetjur hafsins.',
      'Til að styðja við sundmenningu bæjarins og þjónustu við íbúa á öllum aldri hefur framboðið hug á að bæta aðstöðu við sundlaugina á ábyrgan hátt og kanna möguleika á því að bæta við öðrum potti eða vaðlaug.',
    ],
  },
  {
    slug: 'atvinnutakifaeri-fyrir-alla',
    title: 'Atvinnutækifæri fyrir alla',
    summary: 'Fjölbreytt og raunhæf atvinnutækifæri fyrir fólk með mismunandi bakgrunn og getu.',
    category: 'Jafnræði',
    image: '/Generated Image April 16, 2026 - 12_59AM.jpg',
    body: [
      'Við viljum leggja áherslu á að skapa fjölbreytt og raunhæf atvinnutækifæri fyrir fólk með skerta starfsgetu, sem og fyrir einstaklinga sem eru að stíga sín fyrstu skref aftur inn á vinnumarkaðinn eftir hlé, til dæmis vegna veikinda, endurhæfingar eða annarra aðstæðna. Markmið okkar er að byggja upp samfélag þar sem allir fá tækifæri til að nýta hæfileika sína og taka virkan þátt, óháð fyrri reynslu eða aðstæðum.',
      'Við teljum mikilvægt að atvinnulífið sé sveigjanlegt og móttækilegt fyrir mismunandi þörfum einstaklinga. Með því að bjóða upp á aðlagað vinnuumhverfi, hlutastörf og stigvaxandi endurkomu í starf getum við stuðlað að auknu sjálfstæði, bættri líðan og aukinni þátttöku í samfélaginu.',
      'Einnig viljum við vinna náið með fyrirtækjum, stofnunum og öðrum hagsmunaaðilum til að auka vitund um mikilvægi fjölbreytileika á vinnumarkaði og hvetja til jákvæðra viðhorfa gagnvart ráðningu fólks með mismunandi bakgrunn og getu. Með sameiginlegu átaki getum við skapað vinnumarkað sem er réttlátari, mannúðlegri og opnari fyrir alla.',
    ],
  },
  {
    slug: 'samstarf-gagnsaei-og-traust',
    title: 'Samstarf, gagnsæi og traust',
    summary: 'Sterkt samstarf við íbúa, reglulegt samtal og opin stjórnsýsla þar sem upplýsingar eru aðgengilegar.',
    category: 'Traust',
    image: '/F Skagastrond.jpg',
    body: [
      'Við viljum byggja upp sterkt og náið samstarf við íbúa, þar sem rödd þeirra fær raunverulegt vægi í ákvörðunartöku. Mikilvægt er að skapa vettvang fyrir opið samtal og tryggja að íbúar hafi tækifæri til að koma sjónarmiðum sínum á framfæri. Við munum því standa fyrir reglulegum íbúafundum og leggja áherslu á virkt samráð við samfélagið.',
      'Fulltrúar framboðsins verða aðgengilegir og tilbúnir til samtals við alla sem vilja ræða málefni sem snerta samfélagið okkar. Til að gera tækifærin til samtals sem hagkvæmust verður brugðist skjótt við spurningum og ábendingum, og kjörnir fulltrúar verða m.a. til viðtals í hverri viku og hægt að taka frá tíma til spjalls á heimasíðu sveitarfélagsins eða í síma. Með því viljum við efla traust, skilning og sameiginlega ábyrgð á þróun sveitarfélagsins.',
      'Við leggjum jafnframt ríka áherslu á opna og gagnsæja stjórnsýslu, þar sem upplýsingar eru aðgengilegar og ákvarðanir teknar á skýran og málefnalegan hátt. Traust er grunnforsenda góðrar stjórnsýslu og við munum vinna markvisst að því að viðhalda því.',
    ],
  },
  {
    slug: 'skyr-syn-og-framtid',
    title: 'Skýr sýn og framtíð',
    summary: 'Móta skýra stefnu um framtíð Skagastrandar og nýta bæði nýjar hugmyndir og reynslu.',
    category: 'Framtíð',
    image: '/Group images/32.jpg',
    body: [
      'Við viljum móta skýra stefnu um framtíð Skagastrandar, hvernig samfélag við viljum vera og hvert við stefnum. Með skýrri sýn getum við tekið betri ákvarðanir og byggt upp sterkara samfélag til framtíðar.',
      'Með nýju fólki koma nýjar hugmyndir, ný sýn og nýjar áherslur. Það teljum við mikilvægt fyrir framtíð samfélagsins. Einnig er mikilvægt að ný sveitarstjórn nýti sér þau tengsl og þá þekkingu sem þeir sem reynsluna hafa búa yfir.',
      'Fái framboðið Fyrir Skagaströnd umboð kjósenda, mun það kanna hvort núverandi sveitarstjóri, Alexandra Jóhannesdóttir, hafi áhuga á að starfa áfram sem sveitarstjóri á komandi kjörtímabili, undir nýrri pólitískri forystu. Sé Alexandra ekki tilbúin til að starfa áfram, munum við auglýsa starfið í gegnum ráðningarskrifstofu sem mun sjá um ráðningarferlið.',
    ],
  },
  {
    slug: 'sameiningarmal',
    title: 'Sameiningarmál',
    summary: 'Ekki tímabært að kjósa aftur strax; leggja frekar áherslu á aukið samstarf milli sveitarfélaga.',
    category: 'Stjórnsýsla',
    image: '/Fyrir Skagaströnd.jpg',
    body: [
      'Stutt er síðan kosið var um sameiningu sveitarfélaga á svæðinu og var þeirri tillögu hafnað. Við teljum ekki tímabært að kjósa aftur um það strax.',
      'Eins og staðan er í dag eru engar lögbundnar kröfur sem knýja á um sameiningu sveitarfélaga. Því teljum við eðlilegra að leggja áherslu á aukið og markvisst samstarf milli sveitarfélaga frekar en að þrýsta á formlega sameiningu.',
    ],
  },
];

export const POLICY_ALIASES = {
  'fyrir-folkid': 'samstarf-gagnsaei-og-traust',
  'fyrir-framtidina': 'skyr-syn-og-framtid',
  'gagnsaei-i-stjornun': 'samstarf-gagnsaei-og-traust',
  'styrkja-innvidi': 'husnaedismal',
  atvinnuuppbygging: 'atvinnulif-og-ny-taekifaeri',
};

export const HOME_PILLARS = [
  {
    slug: 'abyrg-fjarmal',
    title: 'Ábyrg fjármál',
    summary: 'Traustur rekstur, ráðdeild og ákvarðanir sem byggja Skagaströnd upp til lengri tíma.',
    category: 'Rekstur',
  },
  {
    slug: 'fyrir-folkid',
    title: 'Fyrir fólkið',
    summary: 'Opið samtal, íbúasamráð og samfélag þar sem rödd fólks fær raunverulegt vægi.',
    category: 'Samfélag',
  },
  {
    slug: 'fyrir-framtidina',
    title: 'Fyrir framtíðina',
    summary: 'Skýr sýn, ný tækifæri og uppbygging sem nýtist komandi kynslóðum.',
    category: 'Framtíð',
  },
];

export const ABOUT_POLICY_CARDS = [
  {
    slug: 'samstarf-gagnsaei-og-traust',
    titleKey: 'about.card.transparency.title',
    summaryKey: 'about.card.transparency.summary',
    categoryKey: 'about.card.transparency.category',
  },
  {
    slug: 'husnaedismal',
    titleKey: 'about.card.infrastructure.title',
    summaryKey: 'about.card.infrastructure.summary',
    categoryKey: 'about.card.infrastructure.category',
  },
  {
    slug: 'atvinnulif-og-ny-taekifaeri',
    titleKey: 'about.card.business.title',
    summaryKey: 'about.card.business.summary',
    categoryKey: 'about.card.business.category',
  },
];

export function findPolicyPage(slug) {
  const resolved = POLICY_ALIASES[slug] || slug;
  return POLICY_PROGRAM.find((page) => page.slug === resolved) || null;
}

function getBasePolicyTranslation(page) {
  return {
    title: page?.title || '',
    summary: page?.summary || '',
    category: page?.category || '',
    deckTitle: POLICY_SHORT_TITLES[page?.slug] || page?.title || '',
    body: Array.isArray(page?.body) ? page.body : [],
  };
}

export function getPolicyTranslation(pageOrSlug, lang = 'is') {
  const page = typeof pageOrSlug === 'string'
    ? findPolicyPage(pageOrSlug)
    : pageOrSlug;
  if (!page) return null;

  if (lang === 'is') {
    return getBasePolicyTranslation(page);
  }

  const translated = policyTranslations[page.slug]?.[lang]
    || policyTranslations[page.slug]?.en;

  if (!translated) {
    return getBasePolicyTranslation(page);
  }

  return {
    ...getBasePolicyTranslation(page),
    ...translated,
    body: Array.isArray(translated.body)
      ? translated.body
      : getBasePolicyTranslation(page).body,
  };
}

export function getPolicyParagraphs(page, lang = 'is') {
  const translation = getPolicyTranslation(page, lang);
  if (Array.isArray(translation?.body)) {
    return translation.body.map((paragraph) => paragraph?.trim()).filter(Boolean);
  }

  if (!page) return [];
  if (Array.isArray(page.body)) {
    return page.body.map((paragraph) => paragraph?.trim()).filter(Boolean);
  }
  if (typeof page.body !== 'string') return [];
  return page.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function buildPolicyPageContent(page, lang = 'is') {
  const translation = getPolicyTranslation(page, lang);
  const [fallbackSummary = '', ...rest] = getPolicyParagraphs(page, lang);
  return {
    title: translation?.title || page?.title || '',
    summary: translation?.summary || fallbackSummary,
    body: rest.join('\n\n'),
  };
}

export function buildPolicyDocumentSections(lang = 'is') {
  return POLICY_PROGRAM.map((page, index) => {
    const translation = getPolicyTranslation(page, lang);
    const paragraphs = getPolicyParagraphs(page, lang);
    return {
      ...page,
      title: translation?.title || page.title,
      summary: translation?.summary || page.summary,
      category: translation?.category || page.category,
      deckTitle: translation?.deckTitle || translation?.title || page.title,
      href: `/malefni/${page.slug}`,
      position: index + 1,
      excerpt: translation?.summary || paragraphs[0] || '',
      paragraphs,
    };
  });
}

export function groupPolicyDocumentSections(itemsPerPage = 2, lang = 'is') {
  const safeItemsPerPage = Math.max(1, itemsPerPage);
  const sections = buildPolicyDocumentSections(lang);
  const groups = [];

  for (let index = 0; index < sections.length; index += safeItemsPerPage) {
    groups.push(sections.slice(index, index + safeItemsPerPage));
  }

  return groups;
}

export function policyProgramAsPages() {
  return POLICY_PROGRAM.map((page, index) => ({
    id: `policy-${page.slug}`,
    slug: page.slug,
    hero_image_url: page.image,
    og_image_url: page.image,
    sort_order: index,
    is_published: true,
    page_translations: SUPPORTED_POLICY_LANGUAGES.map((lang) => ({
      lang,
      ...buildPolicyPageContent(page, lang),
    })),
  }));
}

export function campaignBannerItems() {
  return POLICY_PROGRAM.map((page, index) => ({
    id: `campaign-banner-${page.slug}`,
    type: Object.fromEntries(
      SUPPORTED_POLICY_LANGUAGES.map((lang) => [
        lang,
        getPolicyTranslation(page, lang)?.category || page.category,
      ]),
    ),
    image_url: getPolicyPosterImage(page.slug) || page.image || '/Generated Image April 16, 2026 - 12_54AM.jpg',
    link_url: `/malefni/${page.slug}`,
    sort_order: index,
    title: Object.fromEntries(
      SUPPORTED_POLICY_LANGUAGES.map((lang) => [
        lang,
        getPolicyTranslation(page, lang)?.title || page.title,
      ]),
    ),
    description: Object.fromEntries(
      SUPPORTED_POLICY_LANGUAGES.map((lang) => [
        lang,
        getPolicyTranslation(page, lang)?.summary || page.summary,
      ]),
    ),
  }));
}

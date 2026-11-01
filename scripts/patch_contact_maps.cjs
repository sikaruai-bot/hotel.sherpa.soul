const fs = require('fs');
const path = require('path');

const contactMaps = {
  en: {
    title: "Hotel Sherpa Soul – Thamel, Kathmandu",
    description: "We are located in Thamel, the bustling heart of Kathmandu — just steps away from cultural landmarks, restaurants, shops, and local experiences.",
    address: "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Hotel Sherpa Soul Location"
  },
  ne: {
    title: "होटल शेर्पा सोल – ठमेल, काठमाडौँ",
    description: "हामी काठमाडौँको मुख्य पर्यटकीय केन्द्र ठमेलमा अवस्थित छौँ — सांस्कृतिक सम्पदा, रेस्टुरेन्ट र पसलहरूबाट केही कदमको दूरीमा।",
    address: "ठमेल भगवती मार्ग २६, काठमाडौँ, नेपाल",
    email: "info@hotelsherpasoul.com",
    mapTitle: "होटल शेर्पा सोल स्थान"
  },
  hi: {
    title: "होटल शेरपा सोल – ठमेल, काठमांडू",
    description: "हम काठमांडू के जीवंत केंद्र ठमेल में स्थित हैं — सांस्कृतिक स्थलों, रेस्तरां और दुकानों से कुछ ही कदम की दूरी पर।",
    address: "ठमेल भगवती मार्ग 26, काठमांडू, नेपाल",
    email: "info@hotelsherpasoul.com",
    mapTitle: "होटल शेरपा सोल का नक्शा"
  },
  es: {
    title: "Hotel Sherpa Soul – Thamel, Katmandú",
    description: "Estamos ubicados en Thamel, el vibrante corazón de Katmandú, a pocos pasos de monumentos, restaurantes y tiendas.",
    address: "Thamel Bhagawati Marg 26, Katmandú, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Ubicación de Hotel Sherpa Soul"
  },
  fra: {
    title: "Hôtel Sherpa Soul – Thamel, Katmandou",
    description: "Nous sommes situés à Thamel, le cœur animé de Katmandou, à quelques pas des sites culturels, restaurants et boutiques.",
    address: "Thamel Bhagawati Marg 26, Katmandou, Népal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Emplacement de l'Hôtel Sherpa Soul"
  },
  de: {
    title: "Hotel Sherpa Soul – Thamel, Kathmandu",
    description: "Wir befinden uns in Thamel, dem pulsierenden Herzen von Kathmandu – nur wenige Schritte von Sehenswürdigkeiten und Cafés entfernt.",
    address: "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Standort Hotel Sherpa Soul"
  },
  it: {
    title: "Hotel Sherpa Soul – Thamel, Katmandu",
    description: "Ci troviamo a Thamel, nel cuore vivace di Katmandu, a pochi passi da monumenti storici, ristoranti e negozi.",
    address: "Thamel Bhagawati Marg 26, Katmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Posizione Hotel Sherpa Soul"
  },
  pt: {
    title: "Hotel Sherpa Soul – Thamel, Katmandu",
    description: "Estamos localizados em Thamel, no coração de Katmandu, a poucos passos de atrações históricas, restaurantes e lojas.",
    address: "Thamel Bhagawati Marg 26, Katmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Localização do Hotel Sherpa Soul"
  },
  nl: {
    title: "Hotel Sherpa Soul – Thamel, Kathmandu",
    description: "Wij zijn gevestigd in Thamel, het levendige hart van Kathmandu – op loopafstand van bezienswaardigheden en restaurants.",
    address: "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Locatie Hotel Sherpa Soul"
  },
  rs: {
    title: "Hotel Sherpa Soul – Тамель, Катманду",
    description: "Мы находимся в Тамеле, самом оживленном районе Катманду, в шаговой доступности от достопримечательностей и кафе.",
    address: "Thamel Bhagawati Marg 26, Катманду, Непал",
    email: "info@hotelsherpasoul.com",
    mapTitle: "Расположение Hotel Sherpa Soul"
  },
  ch: {
    title: "夏尔巴之魂酒店 – 加德满都泰梅尔",
    description: "我们坐落于加德满都繁华的泰梅尔中心，距离著名历史文化古迹、特色餐厅和商店仅几步之遥。",
    address: "尼泊尔加德满都泰梅尔巴格瓦蒂路26号",
    email: "info@hotelsherpasoul.com",
    mapTitle: "夏尔巴之魂酒店地理位置"
  },
  ja: {
    title: "ホテル・シェルパ・ソウル – カトマンズ・タメル",
    description: "カトマンズの活気あるタメルの中心に位置し、観光名所やレストラン、ショップまで徒歩すぐの便利な立地です。",
    address: "26 Thamel Bhagawati Marg, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "ホテル・シェルパ・ソウルの地図"
  },
  ko: {
    title: "호텔 셰르파 소울 – 카트만두 타멜",
    description: "카트만두의 활기 넘치는 타멜 중심에 위치하여 주요 명소, 레스토랑, 상점까지 도보로 편리하게 이동하실 수 있습니다.",
    address: "26 Thamel Bhagawati Marg, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "호텔 셰르파 소울 위치 지도"
  },
  ar: {
    title: "فندق شيربا سول – ثاميل، كاتماندو",
    description: "يقع فندقنا في قلب حي ثاميل النابض بالحياة في كاتماندو، على بعد خطوات قليلة من المعالم الثقافية والمطاعم والمتاجر.",
    address: "26 ثاميل بهاغاواتي مارغ، كاتماندو، نيبال",
    email: "info@hotelsherpasoul.com",
    mapTitle: "موقع فندق شيربا سول على الخريطة"
  },
  he: {
    title: "מלון שרפה סול – טאמל, קטמנדו",
    description: "אנו ממוקמים בטאמל, הלב השוקק של קטמנדו – במרחק פסיעות ספורות מאתרים היסטוריים, מסעדות וחנויות.",
    address: "26 Thamel Bhagawati Marg, Kathmandu, Nepal",
    email: "info@hotelsherpasoul.com",
    mapTitle: "מיקום מלון שרפה סול"
  }
};

for (const [lang, data] of Object.entries(contactMaps)) {
  const jsonPath = path.resolve(__dirname, `../src/Locales/${lang}.json`);
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const json = JSON.parse(raw);
  json.contactMap = Object.assign(json.contactMap || {}, data);
  fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ Patched contactMap for ${lang}`);
}

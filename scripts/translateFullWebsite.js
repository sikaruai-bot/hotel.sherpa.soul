import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, "../src/Locales");

const commonNav = {
  en: {
    home: "Home",
    about: "About Us",
    room: "Rooms",
    gallery: "Gallery",
    location: "Location",
    blog: "Blog",
    contact: "Contact",
    quick: "Book Your Stay",
    ribbonBadge: "10% OFF",
    ribbonSpecial: "Direct Booking Special: Get",
    ribbonDiscount: "10% Discount",
    ribbonOnAll: "on all rooms!",
    ribbonBestRate: "• Best Rate Guaranteed",
    ribbonClaim: "Claim 10% Off →",
    mobileSpecial: "Direct Booking Special",
    mobileDiscountDesc: "Book direct on our website & save 10% on your entire stay in Thamel.",
    mobileBookBtn: "Book with 10% Discount"
  },
  ne: {
    home: "गृहपृष्ठ",
    about: "हाम्रो बारेमा",
    room: "कोठाहरू",
    gallery: "ग्यालरी",
    location: "स्थान",
    blog: "ब्लग",
    contact: "सम्पर्क",
    quick: "कोठा बुक गर्नुहोस्",
    ribbonBadge: "१०% छुट",
    ribbonSpecial: "सिधा बुकिङ विशेष: पाउनुहोस्",
    ribbonDiscount: "१०% छुट",
    ribbonOnAll: "सबै कोठामा!",
    ribbonBestRate: "• उत्कृष्ट दरको ग्यारेन्टी",
    ribbonClaim: "१०% छुट लिनुहोस् →",
    mobileSpecial: "सिधा बुकिङ विशेष अफर",
    mobileDiscountDesc: "हाम्रो वेबसाइटबाट सिधै बुक गर्नुहोस् र ठमेलको बसाइमा १०% छुट पाउनुहोस्।",
    mobileBookBtn: "१०% छुटमा बुक गर्नुहोस्"
  },
  ja: {
    home: "ホーム",
    about: "当ホテルについて",
    room: "客室",
    gallery: "ギャラリー",
    location: "ロケーション",
    blog: "ブログ",
    contact: "お問い合わせ",
    quick: "ご宿泊予約",
    ribbonBadge: "10%オフ",
    ribbonSpecial: "公式サイト直販特典：全室",
    ribbonDiscount: "10%割引",
    ribbonOnAll: "適用！",
    ribbonBestRate: "• 最安値保証",
    ribbonClaim: "10%オフで予約する →",
    mobileSpecial: "公式サイト直販特別特典",
    mobileDiscountDesc: "公式サイトからの直接予約で全宿泊料金が10%オフになります。",
    mobileBookBtn: "10%オフで予約する"
  },
  es: {
    home: "Inicio",
    about: "Sobre Nosotros",
    room: "Habitaciones",
    gallery: "Galería",
    location: "Ubicación",
    blog: "Blog",
    contact: "Contacto",
    quick: "Reservar Estancia",
    ribbonBadge: "10% DESC",
    ribbonSpecial: "Especial Reserva Directa: Obtenga",
    ribbonDiscount: "10% Descuento",
    ribbonOnAll: "¡en todas las habitaciones!",
    ribbonBestRate: "• Mejor Tarifa Garantizada",
    ribbonClaim: "Obtener 10% Desc. →",
    mobileSpecial: "Especial Reserva Directa",
    mobileDiscountDesc: "Reserve directamente en nuestra web y ahorre un 10% en toda su estancia en Thamel.",
    mobileBookBtn: "Reservar con 10% de Descuento"
  },
  fra: {
    home: "Accueil",
    about: "À propos",
    room: "Chambres",
    gallery: "Galerie",
    location: "Emplacement",
    blog: "Blog",
    contact: "Contact",
    quick: "Réserver",
    ribbonBadge: "-10% DIRECT",
    ribbonSpecial: "Offre Réservation Directe : Obtenez",
    ribbonDiscount: "10% de Réduction",
    ribbonOnAll: "sur toutes les chambres !",
    ribbonBestRate: "• Meilleur Tarif Garanti",
    ribbonClaim: "Profiter de 10% de réduction →",
    mobileSpecial: "Spécial Réservation Directe",
    mobileDiscountDesc: "Réservez directement sur notre site et économisez 10 % sur tout votre séjour à Thamel.",
    mobileBookBtn: "Réserver avec 10 % de Réduction"
  },
  de: {
    home: "Startseite",
    about: "Über Uns",
    room: "Zimmer",
    gallery: "Galerie",
    location: "Standort",
    blog: "Blog",
    contact: "Kontakt",
    quick: "Zimmer Buchen",
    ribbonBadge: "10% RABATT",
    ribbonSpecial: "Direktbuchungs-Special: Erhalten Sie",
    ribbonDiscount: "10% Rabatt",
    ribbonOnAll: "auf alle Zimmer!",
    ribbonBestRate: "• Bestpreisgarantie",
    ribbonClaim: "10% Rabatt sichern →",
    mobileSpecial: "Direktbuchungs-Special",
    mobileDiscountDesc: "Buchen Sie direkt auf unserer Website und sparen Sie 10% auf Ihren gesamten Aufenthalt in Thamel.",
    mobileBookBtn: "Mit 10% Rabatt buchen"
  },
  it: {
    home: "Home",
    about: "Chi Siamo",
    room: "Camere",
    gallery: "Galleria",
    location: "Posizione",
    blog: "Blog",
    contact: "Contatti",
    quick: "Prenota Ora",
    ribbonBadge: "10% SCONTO",
    ribbonSpecial: "Speciale Prenotazione Diretta: Ottieni",
    ribbonDiscount: "10% di Sconto",
    ribbonOnAll: "su tutte le camere!",
    ribbonBestRate: "• Miglior Tariffa Garantita",
    ribbonClaim: "Richiedi 10% di Sconto →",
    mobileSpecial: "Speciale Prenotazione Diretta",
    mobileDiscountDesc: "Prenota direttamente sul nostro sito e risparmia il 10% sull'intero soggiorno a Thamel.",
    mobileBookBtn: "Prenota con il 10% di Sconto"
  },
  ch: {
    home: "首页",
    about: "关于我们",
    room: "客房",
    gallery: "画廊",
    location: "位置",
    blog: "博客",
    contact: "联系我们",
    quick: "预订住宿",
    ribbonBadge: "立减10%",
    ribbonSpecial: "官网直订特惠：享受",
    ribbonDiscount: "10% 专属折扣",
    ribbonOnAll: "（所有房型适用）！",
    ribbonBestRate: "• 最优价格保证",
    ribbonClaim: "领取 10% 优惠 →",
    mobileSpecial: "官网直订特惠",
    mobileDiscountDesc: "直接在官网预订，在泰梅尔的全程住宿均可享 10% 折扣。",
    mobileBookBtn: "享受 10% 优惠预订"
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    room: "कमरे",
    gallery: "गैलरी",
    location: "स्थान",
    blog: "ब्लॉग",
    contact: "संपर्क",
    quick: "कमरा बुक करें",
    ribbonBadge: "10% छूट",
    ribbonSpecial: "डायरेक्ट बुकिंग विशेष: पाएं",
    ribbonDiscount: "10% की छूट",
    ribbonOnAll: "सभी कमरों पर!",
    ribbonBestRate: "• सर्वश्रेष्ठ दर की गारंटी",
    ribbonClaim: "10% छूट पाएं →",
    mobileSpecial: "डायरेक्ट बुकिंग विशेष ऑफर",
    mobileDiscountDesc: "हमारी वेबसाइट से सीधे बुक करें और ठमेल में अपने पूरे प्रवास पर 10% की बचत करें।",
    mobileBookBtn: "10% छूट के साथ बुक करें"
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    room: "الغرف",
    gallery: "المعرض",
    location: "الموقع",
    blog: "المدونة",
    contact: "اتصل بنا",
    quick: "احجز إقامتك",
    ribbonBadge: "خصم 10%",
    ribbonSpecial: "عرض الحجز المباشر: احصل على",
    ribbonDiscount: "خصم 10%",
    ribbonOnAll: "على جميع الغرف!",
    ribbonBestRate: "• أفضل سعر مضمون",
    ribbonClaim: "احصل على خصم 10% →",
    mobileSpecial: "عرض الحجز المباشر الخاص",
    mobileDiscountDesc: "احجز مباشرة من موقعنا ووفر 10% على إقامتك بالكامل في تاميل.",
    mobileBookBtn: "احجز بخصم 10%"
  },
  rs: {
    home: "Главная",
    about: "О нас",
    room: "Номера",
    gallery: "Галерея",
    location: "Расположение",
    blog: "Блог",
    contact: "Контакты",
    quick: "Забронировать",
    ribbonBadge: "СКИДКА 10%",
    ribbonSpecial: "Спецпредложение прямого бронирования: Скидка",
    ribbonDiscount: "10%",
    ribbonOnAll: "на все номера!",
    ribbonBestRate: "• Гарантия лучшей цены",
    ribbonClaim: "Получить скидку 10% →",
    mobileSpecial: "Спецпредложение прямого бронирования",
    mobileDiscountDesc: "Бронируйте напрямую на нашем сайте и экономьте 10% на проживании в Тамеле.",
    mobileBookBtn: "Забронировать со скидкой 10%"
  },
  ja: {
    home: "ホーム",
    about: "当ホテルについて",
    room: "客室",
    gallery: "ギャラリー",
    location: "ロケーション",
    blog: "ブログ",
    contact: "お問い合わせ",
    quick: "ご宿泊予約",
    ribbonBadge: "10%オフ",
    ribbonSpecial: "公式サイト直販特典：全室",
    ribbonDiscount: "10%割引",
    ribbonOnAll: "適用！",
    ribbonBestRate: "• 最安値保証",
    ribbonClaim: "10%オフで予約する →",
    mobileSpecial: "公式サイト直販特別特典",
    mobileDiscountDesc: "公式サイトからの直接予約で全宿泊料金が10%オフになります。",
    mobileBookBtn: "10%オフで予約する"
  },
  ko: {
    home: "홈",
    about: "소개",
    room: "객실",
    gallery: "갤러리",
    location: "위치",
    blog: "블로그",
    contact: "문의하기",
    quick: "객실 예약",
    ribbonBadge: "10% 할인",
    ribbonSpecial: "직접 예약 특가: 모든 객실",
    ribbonDiscount: "10% 할인",
    ribbonOnAll: "혜택!",
    ribbonBestRate: "• 최저가 보장",
    ribbonClaim: "10% 할인 혜택 받기 →",
    mobileSpecial: "직접 예약 특별 혜택",
    mobileDiscountDesc: "공식 웹사이트 직접 예약 시 타멜 숙박 전체 요금의 10%를 절약할 수 있습니다.",
    mobileBookBtn: "10% 할인 가격으로 예약하기"
  },
  nl: {
    home: "Home",
    about: "Over Ons",
    room: "Kamers",
    gallery: "Galerij",
    location: "Locatie",
    blog: "Blog",
    contact: "Contact",
    quick: "Boek Uw Verblijf",
    ribbonBadge: "10% KORTING",
    ribbonSpecial: "Direct Boeken Special: Ontvang",
    ribbonDiscount: "10% Korting",
    ribbonOnAll: "op alle kamers!",
    ribbonBestRate: "• Beste Prijs Garantie",
    ribbonClaim: "Claim 10% Korting →",
    mobileSpecial: "Direct Boeken Special",
    mobileDiscountDesc: "Boek rechtstreeks via onze website & bespaar 10% op uw gehele verblijf in Thamel.",
    mobileBookBtn: "Boek met 10% Korting"
  },
  pt: {
    home: "Início",
    about: "Sobre Nós",
    room: "Quartos",
    gallery: "Galeria",
    location: "Localização",
    blog: "Blog",
    contact: "Contato",
    quick: "Reservar Estadia",
    ribbonBadge: "10% DESC",
    ribbonSpecial: "Especial Reserva Direta: Ganhe",
    ribbonDiscount: "10% de Desconto",
    ribbonOnAll: "em todos os quartos!",
    ribbonBestRate: "• Melhor Tarifa Garantida",
    ribbonClaim: "Garantir 10% Desc. →",
    mobileSpecial: "Especial Reserva Direta",
    mobileDiscountDesc: "Reserve diretamente em nosso site e economize 10% em toda a sua estadia em Thamel.",
    mobileBookBtn: "Reservar com 10% de Desconto"
  },
  he: {
    home: "בית",
    about: "אודותינו",
    room: "חדרים",
    gallery: "גלריה",
    location: "מיקום",
    blog: "בלוג",
    contact: "צור קשר",
    quick: "הזמינו שהייה",
    ribbonBadge: "10% הנחה",
    ribbonSpecial: "מבצע הזמנה ישירה: קבלו",
    ribbonDiscount: "10% הנחה",
    ribbonOnAll: "על כל החדרים!",
    ribbonBestRate: "• התחייבות למחיר הטוב ביותר",
    ribbonClaim: "קבלו 10% הנחה →",
    mobileSpecial: "מבצע הזמנה ישירה מיוחד",
    mobileDiscountDesc: "הזמינו ישירות באתר שלנו וחסכו 10% על כל השהייה שלכם בתאמל.",
    mobileBookBtn: "הזמינו ב-10% הנחה"
  }
};

const blogPostTranslations = {
  ja: {
    posts: {
      p1: { title: "カトマンズ・タメルのおすすめ観光＆アクティビティ", summary: "伝統工芸の路地や屋上オーガニックカフェから、歴史ある中庭やライブミュージックまで、昼夜を問わずタメルの魅力をご紹介します。", readTime: "読了時間 5分" },
      p2: { title: "カトマンズ・タメルのおすすめ宿泊ガイド", summary: "カトマンズでの宿泊エリア選びは旅行の満足度を左右します。バガワティ・マーグのような静かな通りに宿泊することで、騒音なしで中心部にアクセスできる理由をご紹介します。", readTime: "読了時間 6分" },
      p3: { title: "カトマンズ初訪問で訪れるべきおすすめ観光スポット10選", summary: "スワヤンブナート（モンキーテンプル）、ボดナート・ストゥーパ、パシュパティナート、歴史あるカトマンズ・ダルバール広場などの世界遺産を巡ります。", readTime: "読了時間 7分" },
      p4: { title: "カトマンズからエベレスト・ベースキャンプへ：準備ガイド", summary: "フライト予約、許可証、高度順応、クンブ地域への出発前にカトマンズで準備すべきロジスティクスを解説します。", readTime: "読了時間 8分" },
      p5: { title: "カトマンズとネパールを訪れるのに最適なベストシーズン", summary: "秋の澄み切った空（9月〜11月）、春のシャクナゲの開花（3月〜5月）、冬の静かな散策、雨季の緑豊かな景色まで季節ごとのガイド。", readTime: "読了時間 4分" },
      p6: { title: "夜のタメル：旅行者が知っておくべき夜の過ごし方", summary: "静かなディナースポット、アコースティックライブ、そして快適なお部屋でぐっすり休むタイミングまで安全に夜を楽しむ方法。", readTime: "読了時間 5分" },
      p7: { title: "初めてネパールを訪れる旅行者のためのカトマンズガイド", summary: "空港到着、SIMカード、両替、マナー、配車アプリ（Pathao/InDrive）、谷の生活リズムに馴染むための実用的なアドバイス。", readTime: "読了時間 7分" },
      p8: { title: "ネパールトレッキングの持ち物・パッキングリスト", summary: "レイヤリング、トレッキング boots、ダウンジャケット、浄水剤、モバイルバッテリー、ホテルでの無料荷物預かりサービス。", readTime: "読了時間 6分" },
      p9: { title: "カトマンズ空港からタメルへのアクセス完全ガイド", summary: "トリブバン国際空港からタメル（約5.5km）への前払いタクシー、配車アプリ、ホテルの空港送迎サービスと料金の目安。", readTime: "読了時間 4分" },
      p10: { title: "なぜタメルがカトマンズで最も人気の宿泊エリアなのか", summary: "世界中の旅行者や登山家がタメルを拠点に選ぶ理由と、中心部に位置しながら静かで快適な睡眠を確保する方法。", readTime: "読了時間 5分" }
    }
  },
  ne: {
    posts: {
      p1: { title: "ठमेल, काठमाडौँमा गर्नुपर्ने उत्कृष्ट गतिविधिहरू", summary: "हस्तकला गल्लीहरू, रुफटप क्याफेहरूदेखि ऐतिहासिक बहालहरू र सङ्गीत स्थलहरूसम्म, ठमेलका उत्कृष्ट अनुभवहरू।", readTime: "५ मिनेट पढाइ" },
      p2: { title: "ठमेलमा कहाँ बस्ने? यात्रुहरूका लागि गाइड", summary: "भगवती मार्ग जस्तो शान्त गल्लीमा बस्दा पाइने सुविधा र आरामदायी बसाइको अनुभव।", readTime: "६ मिनेट पढाइ" },
      p3: { title: "काठमाडौँका १० उत्कृष्ट पर्यटकीय स्थलहरू", summary: "स्वयम्भूनाथ, बौद्धनाथ, पशुपतिनाथ र काठमाडौँ दरबार स्क्वायर जस्ता युनेस्को विश्व सम्पदा स्थलहरू।", readTime: "७ मिनेट पढाइ" },
      p4: { title: "काठमाडौँबाट सगरमाथा आधार शिविर: जान्नैपर्ने कुराहरू", summary: "लुक्ला उडान, अनुमतिपत्र, अल्टिच्युड र पदयात्रा अघिको तयारी।", readTime: "८ मिनेट पढाइ" },
      p5: { title: "काठमाडौँ र नेपाल भ्रमण गर्ने उत्कृष्ट समय", summary: "शरद् ऋतुको सफा आकाश, वसन्तको गुराँस, हिउँद र वर्षा यामको मौसम सम्बन्धी गाइड।", readTime: "४ मिनेट पढाइ" },
      p6: { title: "रातको ठमेल: यात्रुहरूले जान्नैपर्ने जानकारी", summary: "साँझको वातावरण, सङ्गीत र शान्त कोठामा आरामदायी निद्राका लागि सल्लाह।", readTime: "५ मिनेट पढाइ" },
      p7: { title: "पहिलो पटक काठमाडौँ आउने यात्रुहरूका लागि गाइड", summary: "विमानस्थल, सिम कार्ड, मुद्रा सट्टापट्टा र स्थानीय ट्याक्सी सम्बन्धी उपयोगी जानकारी।", readTime: "७ मिनेट पढाइ" },
      p8: { title: "नेपाल पदयात्राका लागि के-के प्याकिङ गर्ने?", summary: "पदयात्राका लागि आवश्यक लत्ताकपडा, जुत्ता, डाउन ज्याकेट र नि:शुल्क लगेज भण्डारण।", readTime: "६ मिनेट पढाइ" },
      p9: { title: "काठमाडौँ विमानस्थलबाट ठमेलसम्मको यातायात गाइड", summary: "प्रिपेड ट्याक्सी, राइड-सेयरिङ एप्स र होटल एयरपोर्ट पिकअप सुविधा।", readTime: "४ मिनेट पढाइ" },
      p10: { title: "ठमेल किन काठमाडौँमा बस्नका लागि उत्कृष्ट छ?", summary: "विश्वभरका यात्रुहरूले ठमेल छान्नुका कारणहरू र शान्त बसाइको अनुभव।", readTime: "५ मिनेट पढाइ" }
    }
  }
};

const langFileMap = {
  en: 'en.json',
  ne: 'ne.json',
  es: 'es.json',
  fra: 'fra.json',
  de: 'de.json',
  it: 'it.json',
  ch: 'ch.json',
  hi: 'hi.json',
  ar: 'ar.json',
  rs: 'rs.json',
  ja: 'ja.json',
  ko: 'ko.json',
  nl: 'nl.json',
  pt: 'pt.json',
  he: 'he.json'
};

let updatedCount = 0;

Object.keys(langFileMap).forEach((langCode) => {
  const fileName = langFileMap[langCode];
  const filePath = path.join(localesDir, fileName);

  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // 1. Update nav
      const navTrans = commonNav[langCode] || commonNav['en'];
      content.nav = { ...content.nav, ...navTrans };

      // 2. Update blog posts if defined
      if (blogPostTranslations[langCode]) {
        content.blog = content.blog || {};
        content.blog.posts = blogPostTranslations[langCode].posts;
      }

      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log(`Updated ${fileName} with nav and blog translations.`);
      updatedCount++;
    } catch (e) {
      console.error(`Error updating ${fileName}:`, e);
    }
  }
});

console.log(`\nSuccessfully updated ${updatedCount} locale files with full website translations!`);

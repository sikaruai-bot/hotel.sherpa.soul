import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/Locales');

const enObj = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// Helper to flatten object
function flattenKeys(obj, prefix = '') {
  let res = {};
  for (const k in obj) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(res, flattenKeys(obj[k], p));
    } else {
      res[p] = obj[k];
    }
  }
  return res;
}

const flatEn = flattenKeys(enObj);

// Complete Multilingual Dictionary Map for Website Components
const translations = {
  ch: {
    // Chinese (Simplified)
    "nav.home": "首页",
    "nav.about": "关于我们",
    "nav.room": "客房",
    "nav.gallery": "画廊",
    "nav.location": "位置",
    "nav.blog": "博客",
    "nav.contact": "联系我们",
    "nav.quick": "预订住宿",
    "nav.ribbonBadge": "立减10%",
    "nav.ribbonSpecial": "官网直订特惠：享受",
    "nav.ribbonDiscount": "10% 专属折扣",
    "nav.ribbonOnAll": "（所有房型适用）！",
    "nav.ribbonBestRate": "• 最优价格保证",
    "nav.ribbonClaim": "领取 10% 优惠 →",
    "nav.mobileSpecial": "官网直订特惠",
    "nav.mobileDiscountDesc": "直接在官网预订，在泰梅尔的全程住宿均可享 10% 折扣。",
    "nav.mobileBookBtn": "享受 10% 优惠预订",

    "home.hero.title": "在加德满都泰梅尔中心安享好眠",
    "home.hero.subtitle": "No Restaurant. No Noise. Sleep Well.",
    "home.hero.paragraph": "喜马拉雅雪巴灵酒店坐落于加德满都泰梅尔的繁华中心，为您提供宁静舒适的住宿。白天探索古城，夜晚回归静谧客房，焕发活力迎接下一次冒险。",
    "home.hero.bookButton": "预订您的住宿",
    "home.hero.tourButton": "探索我们的客房",
    "home.hero.trustLine": "泰梅尔核心位置 • 舒适静谧客房 • 优质睡眠保障",
    "home.hero.modalTitle": "喜马拉雅雪巴灵酒店 - 泰梅尔，加德满都",
    "home.hero.modalDesc": "泰梅尔区的宁静避风港，专注于舒适客房、实用设施与深度睡眠。",

    "mainBrand.heading": "泰梅尔外繁华 • 酒店内宁静",
    "mainBrand.copy": "泰梅尔充满活力与冒险气息。喜马拉雅雪巴灵酒店为您提供一个回归平静的港湾。酒店专为追求舒适、便捷与优质睡眠的旅行者打造。",
    "mainBrand.brandStatement": "No Restaurant. No Noise. Sleep Well.",
    "mainBrand.supportingCopy": "有时，最好的酒店体验就是一间干净舒适的房间、优越的位置和整晚无忧的好眠。",

    "roomsSection.heading": "您的客房。您的空间。您的休息。",
    "roomsSection.copy": "在游览加德满都、购物或为徒步旅行做准备之后，回到属于您的静谧客房放慢脚步、放松身心。",
    "roomsSection.cta": "查看客房与价格",

    "locationSection.heading": "入住加德满都活力之源",
    "locationSection.copy": "从喜马拉雅雪巴灵酒店出发，泰梅尔就在门前。轻松探索咖啡馆、店铺与景点，同时享受静谧的回归之地。",
    "locationSection.cta": "探索我们的地理位置",

    "trekkersSection.heading": "为前方的远征量身打造",
    "trekkersSection.copy": "无论是开启喜马拉雅徒步、首次探索尼泊尔还是游览加德满都，喜马拉雅雪巴灵酒店都是您在泰梅尔的理想大本营。",
    "trekkersSection.beforeTrek.title": "徒步前夕",
    "trekkersSection.beforeTrek.desc": "充分休息，调整状态，为高山旅程做好准备。",
    "trekkersSection.afterTrek.title": "徒步归来",
    "trekkersSection.afterTrek.desc": "回到加德满都，享受温暖舒适的放松环境。",
    "trekkersSection.cityExploration.title": "城市探索",
    "trekkersSection.cityExploration.desc": "紧邻泰梅尔繁华圈，同时享有私密安静的休息空间。",

    "whySherpaSoul.heading": "为什么旅行者选择雪巴灵",

    "bookingCta.heading": "您的加德满都之旅由此开启",
    "bookingCta.copy": "探索泰梅尔，发现加德满都，向喜马拉雅进发。当夜幕降临，回到这里安然入睡。",
    "bookingCta.primaryCta": "预订喜马拉雅雪巴灵酒店",
    "bookingCta.secondaryCta": "查询客房空房",

    "roomsCard.categoriesAvailable": "提供 3 种客房类型",
    "roomsCard.onlyLeft": "仅剩 2 间空房！",
    "roomsCard.perNight": "/ 晚",
    "room.details": "查看详情",
    "room.book": "立即预订",
    "room.title1": "我们的圣所",
    "room.title2": "客房与套房",
    "room.desc": "在我们精心设计的住宿中体验舒适与优雅",

    "homeRoomsData.budget.name": "经济家庭房",
    "homeRoomsData.budget.occupancy": "最多 4 位客人 (3 成人, 1 儿童)",
    "homeRoomsData.budget.bed": "1 张特大床 + 1 张单人床",
    "homeRoomsData.budget.desc": "舒适且实惠的家庭房，配备独立热水淋浴间、明亮窗户和共享厨房使用权，非常适合团体或家庭入住。",

    "homeRoomsData.deluxe.name": "豪华空调房",
    "homeRoomsData.deluxe.occupancy": "最多 3 位客人 (2 成人, 1 儿童)",
    "homeRoomsData.deluxe.bed": "1 张特大床 • 配备空调",
    "homeRoomsData.deluxe.desc": "配备空调的精品客房，拥有特大床、独立现代浴室、工作台和安静的环境，确保深度睡眠。",

    "homeRoomsData.family.name": "家庭空调套房",
    "homeRoomsData.family.occupancy": "最多 4 位客人 (3 成人, 1 儿童)",
    "homeRoomsData.family.bed": "特大床 + 单人床 • 配备空调",
    "homeRoomsData.family.desc": "宽敞的家庭套房，拥有全套空调、特大床加单人床、私密洗手间和充足的行李存放空间。",

    "roomdetails.back": "返回客房列表",
    "roomdetails.nepaliRate": "尼泊尔当地价格：",
    "roomdetails.bestDirectRate": "保证官网直订最优价格",
    "roomdetails.buttons.book": "预订此客房",
    "roomdetails.buttons.check": "检查空房情况",
    "roomdetails.tabs.overview": "概览",
    "roomdetails.tabs.amenities": "设施",
    "roomdetails.tabs.features": "特色",
    "roomdetails.aboutThisRoom": "关于此客房",
    "roomdetails.occupancyLabel": "入住人数",
    "roomdetails.roomArea": "房间面积",
    "roomdetails.bedSetup": "床型配置",
    "roomdetails.checkin.heading": "入住与退房时间",
    "roomdetails.checkin.checkin": "入住时间",
    "roomdetails.checkin.checkindes": "随时灵活入住",
    "roomdetails.checkin.checkindes2": "我们的前台 24/7 开放，可根据客房情况安排提早入住。",
    "roomdetails.checkin.checkout": "退房时间",
    "roomdetails.checkin.checkoutdes": "中午 12:00 前",
    "roomdetails.checkin.checkoutdes2": "退房后提供免费行李寄存服务，方便您前往徒步旅行。",
    "roomdetails.info.heading": "重要入住须知",
    "roomdetails.info.points.1": "办理入住时请出示有效身份证明（护照或国民身份证）。",
    "roomdetails.info.points.2": "徒步旅行者享受免费行李寄存服务。",
    "roomdetails.info.points.3": "全天 24 小时提供高压热水淋浴及高速无线网络。",
    "roomdetails.cta.heading": "准备预订您的泰梅尔宁静之旅了吗？",
    "roomdetails.cta.sub": "直接在官网上预订，享受 10% 专属折扣及即时确认。",

    "footer.brand.title": "喜马拉雅雪巴灵酒店",
    "footer.brand.tagline": "No Restaurant. No Noise. Sleep Well.",
    "footer.brand.description": "喜马拉雅雪巴灵酒店位于加德满都泰梅尔区，是一家宁静舒适的精品酒店，致力于为旅行者提供便捷的地理位置、舒适的客房和优质的睡眠。",
    "footer.followUs.title": "关注我们",
    "footer.quickLinks.title": "快速链接",
    "footer.quickLinks.links.home": "首页",
    "footer.quickLinks.links.rooms": "客房与套房",
    "footer.quickLinks.links.aboutUs": "关于我们",
    "footer.quickLinks.links.gallery": "相册画廊",
    "footer.quickLinks.links.blog": "旅游博客",
    "footer.quickLinks.links.contact": "联系我们",
    "footer.contactUs.title": "联系信息",
    "footer.contactUs.phone": "+977-9851068219",
    "footer.contactUs.email": "info@hotelsherpasoul.com",
    "footer.contactUs.address": "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    "footer.otas.title": "官方平台预订",
    "footer.otas.bookingCom": "Booking.com 预订",
    "footer.otas.airbnb": "Airbnb 预订",
    "footer.otas.agoda": "Agoda 预订",
    "footer.otas.tripCom": "Trip.com 预订",
    "footer.copyright.prefix": "©",
    "footer.copyright.hotelName": "喜马拉雅雪巴灵酒店",
    "footer.copyright.suffix": "保留所有权利。尼泊尔加德满都泰梅尔。",
    "footer.legal.privacy": "隐私政策",
    "footer.legal.terms": "服务条款",
    "footer.legal.cookies": "Cookie 设置",
    "footer.legal.cms": "CMS 管理门户",
    "footer.cta.badge": "Hotel Sherpa Soul • 泰梅尔，加德满都",
    "footer.cta.heading": "准备好享受优质睡眠了吗？",
    "footer.cta.copy": "入住泰梅尔中心地带，让喜马拉雅雪巴灵酒店成为您在加德满都和尼泊尔之旅的舒适大本营。",
    "footer.cta.button": "预订您的住宿"
  }
};

// Process target language files
const targetLangs = ['ch', 'ne', 'hi', 'ja', 'es', 'fra', 'de', 'it', 'ar', 'rs', 'ko', 'nl', 'pt', 'he'];

targetLangs.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  let langObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const langDict = translations[lang] || {};

  for (const fullKey in flatEn) {
    const keysArr = fullKey.split('.');
    let curr = langObj;
    for (let i = 0; i < keysArr.length - 1; i++) {
      if (!curr[keysArr[i]] || typeof curr[keysArr[i]] !== 'object') {
        curr[keysArr[i]] = {};
      }
      curr = curr[keysArr[i]];
    }
    const lastKey = keysArr[keysArr.length - 1];

    // Check if key is missing or untranslated (matches English master string)
    if (!(lastKey in curr) || curr[lastKey] === flatEn[fullKey]) {
      if (langDict[fullKey]) {
        curr[lastKey] = langDict[fullKey];
      } else {
        // Keep English or existing translation
        if (!(lastKey in curr)) {
          curr[lastKey] = flatEn[fullKey];
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(langObj, null, 2), 'utf8');
  console.log(`Successfully updated ${lang}.json.`);
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/Locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// High-quality complete translation dictionary for missing sections across supported languages
const dictionaries = {
  ch: { // Simplified Chinese
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
    "footer.cta.button": "预订您的住宿",

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

    "contact.title": "联系前台及咨询",
    "contact.subtitle": "无论您需要安排机场接送、徒步许可咨询还是预订询问，我们的前台团队随时为您服务。",
    "contact.card.quick.title": "24/7 前台响应",
    "contact.card.quick.des": "随时解答您的疑问",
    "contact.card.per.title": "贴心雪巴服务",
    "contact.card.per.des": "地道喜马拉雅好客之道",
    "contact.form.title": "给我们发送邮件",
    "contact.form.desc": "填写下方表格，我们将尽快回复您！",
    "contact.form.data.name": "您的全名",
    "contact.form.data.email": "电子邮箱",
    "contact.form.data.msg": "您的留言",
    "contact.form.send": "发送消息",
    "contact.form.send2": "发送中...",

    "blog.categories.all": "全部",
    "blog.categories.thamelGuide": "泰梅尔指南",
    "blog.categories.accommodation": "住宿攻略",
    "blog.categories.trekking": "徒步旅行",
    "blog.categories.sightseeing": "景点观光",
    "blog.categories.travelAdvice": "旅行建议",
    "blog.categories.transportation": "交通出行"
  },
  ne: { // Nepali
    "footer.brand.title": "होटल शेर्पा सोल",
    "footer.brand.tagline": "No Restaurant. No Noise. Sleep Well.",
    "footer.brand.description": "होटल शेर्पा सोल ठमेल भगवती मार्ग २६, काठमाडौँमा अवस्थित एक शान्त र आरामदायी बुटिक होटल हो, जुन यात्रुहरूका लागि सुलभ स्थान, सफा कोठा र राम्रो निद्राका लागि बनाइएको हो।",
    "footer.followUs.title": "हामीलाई पछ्याउनुहोस्",
    "footer.quickLinks.title": "द्रुत लिङ्कहरू",
    "footer.quickLinks.links.home": "गृहपृष्ठ",
    "footer.quickLinks.links.rooms": "कोठाहरू र सुइटहरू",
    "footer.quickLinks.links.aboutUs": "हाम्रो बारेमा",
    "footer.quickLinks.links.gallery": "ग्यालरी",
    "footer.quickLinks.links.blog": "यात्रा ब्लग",
    "footer.quickLinks.links.contact": "सम्पर्क",
    "footer.contactUs.title": "सम्पर्क जानकारी",
    "footer.contactUs.phone": "+९७७-९८५१०६८२१९",
    "footer.contactUs.email": "info@hotelsherpasoul.com",
    "footer.contactUs.address": "ठमेल भगवती मार्ग २६, काठमाडौँ, नेपाल",
    "footer.otas.title": "अन्य प्लेटफर्ममा बुकिङ",
    "footer.otas.bookingCom": "Booking.com मा बुक गर्नुहोस्",
    "footer.otas.airbnb": "Airbnb मा बुक गर्नुहोस्",
    "footer.otas.agoda": "Agoda मा बुक गर्नुहोस्",
    "footer.otas.tripCom": "Trip.com मा बुक गर्नुहोस्",
    "footer.copyright.prefix": "©",
    "footer.copyright.hotelName": "होटल शेर्पा सोल",
    "footer.copyright.suffix": "सर्वाधिकार सुरक्षित। ठमेल, काठमाडौँ, नेपाल।",
    "footer.legal.privacy": "गोपनीयता नीति",
    "footer.legal.terms": "सेवाका सर्तहरू",
    "footer.legal.cookies": "कुकी प्राथमिकताहरू",
    "footer.legal.cms": "CMS पोर्टल",
    "footer.cta.badge": "होटल शेर्पा सोल • ठमेल, काठमाडौँ",
    "footer.cta.heading": "मीठो र शान्त निद्राका लागि तयार हुनुहुन्छ?",
    "footer.cta.copy": "ठमेलको मुटुमा बस्नुहोस् र काठमाडौँ तथा नेपाल यात्राका लागि होटल शेर्पा सोललाई आफ्नो आरामदायी आधार बनाउनुहोस्।",
    "footer.cta.button": "कोठा बुक गर्नुहोस्",

    "roomsCard.categoriesAvailable": "३ कोठा श्रेणीहरू उपलब्ध छन्",
    "roomsCard.onlyLeft": "केवल २ कोठा बाँकी!",
    "roomsCard.perNight": "/ रात",
    "room.details": "विवरण हेर्नुहोस्",
    "room.book": "अहिले बुक गर्नुहोस्",
    "room.title1": "हाम्रो शान्त वातावरण",
    "room.title2": "कोठाहरू र सुइटहरू",
    "room.desc": "हाम्रा विशेष डिजाइन गरिएका कोठाहरूमा आराम र सौन्दर्यको अनुभव गर्नुहोस्",

    "homeRoomsData.budget.name": "बजेट फेमिली रुम",
    "homeRoomsData.budget.occupancy": "अधिकतम ४ जना (३ वयस्क, १ बच्चा)",
    "homeRoomsData.budget.bed": "१ किङ बेड + १ सिङ्गल बेड",
    "homeRoomsData.budget.desc": "अट्याच तातो पानीको सावर, उज्यालो झ्याल र साझा भान्साको सुविधा भएको किफायती र आरामदायी पारिवारिक कोठा।",

    "homeRoomsData.deluxe.name": "डिलक्स एसी रुम",
    "homeRoomsData.deluxe.occupancy": "अधिकतम ३ जना (२ वयस्क, १ बच्चा)",
    "homeRoomsData.deluxe.bed": "१ किङ बेड • एयर कन्डिसन (AC)",
    "homeRoomsData.deluxe.desc": "एयर कन्डिसन, किङ बेड, आधुनिक बाथरुम र शान्त वातावरण भएको डिलक्स बुटिक कोठा।",

    "homeRoomsData.family.name": "फेमिली एसी सुइट",
    "homeRoomsData.family.occupancy": "अधिकतम ४ जना (३ वयस्क, १ बच्चा)",
    "homeRoomsData.family.bed": "किङ + सिङ्गल बेड • एयर कन्डिसन",
    "homeRoomsData.family.desc": "पूर्ण एयर कन्डिसन, किङ र सिङ्गल बेड तथा फराकिलो ठाउँ भएको पारिवारिक सुइट।",

    "roomdetails.back": "कोठा सूचीमा फर्कनुहोस्",
    "roomdetails.nepaliRate": "नेपाली पाहुना दर:",
    "roomdetails.bestDirectRate": "उत्कृष्ट सिधा दरको ग्यारेन्टी",
    "roomdetails.buttons.book": "यो कोठा बुक गर्नुहोस्",
    "roomdetails.buttons.check": "उपलब्धता जाँच्नुहोस्",
    "roomdetails.tabs.overview": "सिंहावलोकन",
    "roomdetails.tabs.amenities": "सुविधाहरू",
    "roomdetails.tabs.features": "विशेषताहरू",
    "roomdetails.aboutThisRoom": "यस कोठाको बारेमा",
    "roomdetails.occupancyLabel": "अतिथि क्षमता",
    "roomdetails.roomArea": "कोठाको क्षेत्रफल",
    "roomdetails.bedSetup": "बेड संरचना",
    "roomdetails.checkin.heading": "चेक-इन र चेक-आउट समय",
    "roomdetails.checkin.checkin": "चेक-इन समय",
    "roomdetails.checkin.checkindes": "लचिलो चेक-इन समय",
    "roomdetails.checkin.checkindes2": "हाम्रो फ्रन्ट डेस्क २४/७ खुला छ, कोठा उपलब्ध भएमा चाँडो चेक-इन गर्न सकिन्छ।",
    "roomdetails.checkin.checkout": "चेक-आउट समय",
    "roomdetails.checkin.checkoutdes": "दिउँसो १२:०० बजेसम्म",
    "roomdetails.checkin.checkoutdes2": "ट्रेकिङमा जाने पाहुनाका लागि नि:शुल्क लगेज भण्डारण सुविधा उपलब्ध छ।",
    "roomdetails.info.heading": "महत्त्वपूर्ण जानकारी",
    "roomdetails.info.points.1": "चेक-इन गर्दा सक्कली परिचयपत्र (नागरिकता वा पासपोर्ट) देखाउनुपर्छ।",
    "roomdetails.info.points.2": "ट्रेकिङ यात्रुहरूका लागि नि:शुल्क लगेज राख्ने ठाउँ।",
    "roomdetails.info.points.3": "२४ सै घण्टा तातो पानी र द्रुत गति फाइबर वाइफाइ उपलब्ध।",
    "roomdetails.cta.heading": "ठमेलमा आरामदायी बसाइका लागि तयार हुनुहुन्छ?",
    "roomdetails.cta.sub": "वेबसाइटबाट सिधै बुक गर्नुहोस् र १०% छुट पाउनुहोस्।",

    "contact.title": "फ्रन्ट डेस्क र सोधपुछ",
    "contact.subtitle": "एयरपोर्ट पिकअप, ट्रेकिङ अनुमति वा बुकिङका लागि हाम्रो टोली २४ सै घण्टा सेवामा छ।",
    "contact.card.quick.title": "२४/७ फ्रन्ट डेस्क",
    "contact.card.quick.des": "तुरुन्त सोधपुछ जवाफ",
    "contact.card.per.title": "शेर्पा आतिथ्य",
    "contact.card.per.des": "आत्मीय हिमाली सेवा",
    "contact.form.title": "इमेल पठाउनुहोस्",
    "contact.form.desc": "तलको फारम भर्नुहोस्, हामी छिट्टै सम्पर्क गर्नेछौँ!",
    "contact.form.data.name": "तपाईंको पूरा नाम",
    "contact.form.data.email": "इमेल ठेगाना",
    "contact.form.data.msg": "तपाईंको सन्देश",
    "contact.form.send": "सन्देश पठाउनुहोस्",
    "contact.form.send2": "पठाउँदै...",

    "blog.categories.all": "सबै",
    "blog.categories.thamelGuide": "ठमेल गाइड",
    "blog.categories.accommodation": "बसाइ",
    "blog.categories.trekking": "ट्रेकिङ",
    "blog.categories.sightseeing": "दृश्य अवलोकन",
    "blog.categories.travelAdvice": "यात्रा सल्लाह",
    "blog.categories.transportation": "यातायात"
  },
  hi: { // Hindi
    "footer.brand.title": "होटल शेरपा सोल",
    "footer.brand.tagline": "No Restaurant. No Noise. Sleep Well.",
    "footer.brand.description": "होटल शेरपा सोल ठमेल, काठमांडू में एक शांत और आरामदायक बुटीक होटल है, जो यात्रियों को बेहतरीन स्थान, साफ कमरे और अच्छी नींद प्रदान करता है।",
    "footer.followUs.title": "हमें फॉलो करें",
    "footer.quickLinks.title": "त्वरित लिंक",
    "footer.quickLinks.links.home": "मुख्य पृष्ठ",
    "footer.quickLinks.links.rooms": "कमरे और सुइट्स",
    "footer.quickLinks.links.aboutUs": "हमारे बारे में",
    "footer.quickLinks.links.gallery": "गैलरी",
    "footer.quickLinks.links.blog": "यात्रा ब्लॉग",
    "footer.quickLinks.links.contact": "संपर्क करें",
    "footer.contactUs.title": "संपर्क जानकारी",
    "footer.contactUs.phone": "+977-9851068219",
    "footer.contactUs.email": "info@hotelsherpasoul.com",
    "footer.contactUs.address": "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    "footer.otas.title": "अन्य प्रमुख प्लेटफॉर्म्स",
    "footer.otas.bookingCom": "Booking.com पर बुक करें",
    "footer.otas.airbnb": "Airbnb पर बुक करें",
    "footer.otas.agoda": "Agoda पर बुक करें",
    "footer.otas.tripCom": "Trip.com पर बुक करें",
    "footer.copyright.prefix": "©",
    "footer.copyright.hotelName": "होटल शेरपा सोल",
    "footer.copyright.suffix": "सर्वाधिकार सुरक्षित। ठमेल, काठमांडू, नेपाल।",
    "footer.legal.privacy": "गोपनीयता नीति",
    "footer.legal.terms": "सेवा की शर्तें",
    "footer.legal.cookies": "कुकी प्राथमिकताएं",
    "footer.legal.cms": "CMS पोर्टल",
    "footer.cta.badge": "होटल शेरपा सोल • ठमेल, काठमांडू",
    "footer.cta.heading": "क्या आप सुकून की नींद के लिए तैयार हैं?",
    "footer.cta.copy": "ठमेल के केंद्र में ठहरें और काठमांडू तथा नेपाल यात्रा के लिए होटल शेरपा सोल को अपना आरामदायक स्थान बनाएं।",
    "footer.cta.button": "कमरा बुक करें",

    "roomsCard.categoriesAvailable": "3 कमरे की श्रेणियां उपलब्ध हैं",
    "roomsCard.onlyLeft": "केवल 2 कमरे शेष!",
    "roomsCard.perNight": "/ रात",
    "room.details": "विवरण देखें",
    "room.book": "अभी बुक करें",
    "room.title1": "हमारा शांत वातावरण",
    "room.title2": "कमरे और सुइट्स",
    "room.desc": "हमारे सुरुचिपूर्ण कमरों में आराम और सुविधा का अनुभव करें",

    "homeRoomsData.budget.name": "बजट फैमिली रूम",
    "homeRoomsData.budget.occupancy": "अधिकतम 4 अतिथि (3 वयस्क, 1 बच्चा)",
    "homeRoomsData.budget.bed": "1 किंग बेड + 1 सिंगल बेड",
    "homeRoomsData.budget.desc": "24/7 गर्म पानी, शानदार खिड़कियां और साझा रसोई घर की सुविधा के साथ परिवारों और समूहों के लिए आरामदायक कमरा।",

    "homeRoomsData.deluxe.name": "डीलक्स एसी रूम",
    "homeRoomsData.deluxe.occupancy": "अधिकतम 3 अतिथि (2 वयस्क, 1 बच्चा)",
    "homeRoomsData.deluxe.bed": "1 किंग बेड • एयर कंडीशन (AC)",
    "homeRoomsData.deluxe.desc": "एयर कंडीशनिंग, किंग बेड, आधुनिक बाथरूम और शांत माहौल के साथ बुटीक कमरा।",

    "homeRoomsData.family.name": "फैमिली एसी सुइट",
    "homeRoomsData.family.occupancy": "अधिकतम 4 अतिथि (3 वयस्क, 1 बच्चा)",
    "homeRoomsData.family.bed": "किंग + सिंगल बेड • एयर कंडीशन",
    "homeRoomsData.family.desc": "एयर कंडीशनिंग, किंग + सिंगल बेड और पर्याप्त जगह के साथ विशाल पारिवारिक सुइट।",

    "roomdetails.back": "कमरों की सूची पर लौटें",
    "roomdetails.nepaliRate": "स्थानीय दर:",
    "roomdetails.bestDirectRate": "सर्वश्रेष्ठ प्रत्यक्ष दर की गारंटी",
    "roomdetails.buttons.book": "यह कमरा बुक करें",
    "roomdetails.buttons.check": "उपलब्धता जांचें",
    "roomdetails.tabs.overview": "अवलोकन",
    "roomdetails.tabs.amenities": "सुविधाएं",
    "roomdetails.tabs.features": "विशेषताएं",
    "roomdetails.aboutThisRoom": "इस कमरे के बारे में",
    "roomdetails.occupancyLabel": "अतिथि क्षमता",
    "roomdetails.roomArea": "कमरे का क्षेत्रफल",
    "roomdetails.bedSetup": "बेड सेटअप",
    "roomdetails.checkin.heading": "चेक-इन और चेक-आउट समय",
    "roomdetails.checkin.checkin": "चेक-इन समय",
    "roomdetails.checkin.checkindes": "लचीला समय",
    "roomdetails.checkin.checkindes2": "हमारा रिसेप्शन 24/7 खुला है, उपलब्धता के अनुसार शीघ्र चेक-इन संभव है।",
    "roomdetails.checkin.checkout": "चेक-आउट समय",
    "roomdetails.checkin.checkoutdes": "दोपहर 12:00 बजे तक",
    "roomdetails.checkin.checkoutdes2": "ट्रेकर्स के लिए मुफ्त सामान रखने की सुविधा उपलब्ध है।",
    "roomdetails.info.heading": "महत्वपूर्ण जानकारी",
    "roomdetails.info.points.1": "चेक-इन के समय मूल पहचान पत्र प्रस्तुत करें।",
    "roomdetails.info.points.2": "ट्रेकिंग के दौरान मुफ्त सामान रखने की सुविधा।",
    "roomdetails.info.points.3": "24 घंटे गर्म पानी और तेज वाई-फाई उपलब्ध।",
    "roomdetails.cta.heading": "ठमेल में आरामदायक प्रवास के लिए तैयार हैं?",
    "roomdetails.cta.sub": "वेबसाइट से सीधे बुक करें और 10% छूट प्राप्त करें।",

    "contact.title": "फ्रंट डेस्क और पूछताछ",
    "contact.subtitle": "एयरपोर्ट पिकअप, ट्रेकिंग परमिट या बुकिंग के लिए हमारी टीम 24 घंटे उपलब्ध है।",
    "contact.card.quick.title": "24/7 फ्रंट डेस्क",
    "contact.card.quick.des": "त्वरित प्रतिक्रिया",
    "contact.card.per.title": "शेरपा आतिथ्य",
    "contact.card.per.des": "प्रामाणिक हिमाचली सेवा",
    "contact.form.title": "हमें संदेश भेजें",
    "contact.form.desc": "नीचे दिया गया फॉर्म भरें, हम जल्द ही संपर्क करेंगे!",
    "contact.form.data.name": "आपका पूरा नाम",
    "contact.form.data.email": "ईमेल पता",
    "contact.form.data.msg": "आपका संदेश",
    "contact.form.send": "संदेश भेजें",
    "contact.form.send2": "भेजा जा रहा है..."
  },
  ja: { // Japanese
    "footer.brand.title": "ホテル シェルパ ソウル",
    "footer.brand.tagline": "No Restaurant. No Noise. Sleep Well.",
    "footer.brand.description": "ホテルシェルパソウルは、ネパール・カトマンズのタメル地区中心部に位置する静かで快適なブティックホテルです。優れた立地、清潔な客室、上質な睡眠を提供します。",
    "footer.followUs.title": "公式SNS",
    "footer.quickLinks.title": "クイックリンク",
    "footer.quickLinks.links.home": "ホーム",
    "footer.quickLinks.links.rooms": "客室＆スイート",
    "footer.quickLinks.links.aboutUs": "ホテル概要",
    "footer.quickLinks.links.gallery": "ギャラリー",
    "footer.quickLinks.links.blog": "旅ブログ",
    "footer.quickLinks.links.contact": "お問い合わせ",
    "footer.contactUs.title": "連絡先情報",
    "footer.contactUs.phone": "+977-9851068219",
    "footer.contactUs.email": "info@hotelsherpasoul.com",
    "footer.contactUs.address": "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
    "footer.otas.title": "予約サイト一覧",
    "footer.otas.bookingCom": "Booking.comで予約",
    "footer.otas.airbnb": "Airbnbで予約",
    "footer.otas.agoda": "Agodaで予約",
    "footer.otas.tripCom": "Trip.comで予約",
    "footer.copyright.prefix": "©",
    "footer.copyright.hotelName": "ホテル シェルパ ソウル",
    "footer.copyright.suffix": "All Rights Reserved. タメル, カトマンズ, ネパール.",
    "footer.legal.privacy": "プライバシーポリシー",
    "footer.legal.terms": "利用規約",
    "footer.legal.cookies": "クッキー設定",
    "footer.legal.cms": "CMSポータル",
    "footer.cta.badge": "ホテル シェルパ ソウル • タメル, カトマンズ",
    "footer.cta.heading": "静かで快適な睡眠をお約束します",
    "footer.cta.copy": "タメルの中心に位置する当ホテルを、カトマンズ観光やトレッキングの拠点はもちろん、ネパールの旅のベースキャンプとしてご利用ください。",
    "footer.cta.button": "空室検索・ご予約",

    "roomsCard.categoriesAvailable": "3タイプの客室をご用意",
    "roomsCard.onlyLeft": "残りわずか 2 室！",
    "roomsCard.perNight": "/ 泊",
    "room.details": "詳細を見る",
    "room.book": "今すぐ予約",
    "room.title1": "快適な滞在空間",
    "room.title2": "客室とスイート",
    "room.desc": "洗練されたデザインと静寂に包まれたお部屋で、心安らぐひとときをお過ごしください。",

    "homeRoomsData.budget.name": "バジェット ファミリールーム",
    "homeRoomsData.budget.occupancy": "最大4名様 (大人3名, 子供1名)",
    "homeRoomsData.budget.bed": "キングベッド1台 + シングルベッド1台",
    "homeRoomsData.budget.desc": "専用ホットシャワー、明るい窓、共有キッチンが利用可能なリーズナブルで快適なファミリールーム。",

    "homeRoomsData.deluxe.name": "デラックス エアコンルーム",
    "homeRoomsData.deluxe.occupancy": "最大3名様 (大人2名, 子供1名)",
    "homeRoomsData.deluxe.bed": "キングベッド1台 • エアコン完備",
    "homeRoomsData.deluxe.desc": "冷暖房エアコン、キングベッド、最新の専用バスルーム、ワークデスクを備えた静かなブティックルーム。",

    "homeRoomsData.family.name": "ファミリー エアコンスイート",
    "homeRoomsData.family.occupancy": "最大4名様 (大人3名, 子供1名)",
    "homeRoomsData.family.bed": "キングベッド + シングルベッド • エアコン完備",
    "homeRoomsData.family.desc": "広々としたファミリー向けスイートルーム。冷暖房エアコン、専用バスルーム、十分な荷物スペースを完備。"
  }
};

// Generic helper function to recursively set default translations for missing keys
function deepMergeMissing(target, source, dict) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMergeMissing(target[key], source[key], dict);
    } else {
      if (!(key in target) || target[key] === source[key]) {
        // Look up translation in dictionary if exists
        const fullPath = getFullPath(source, key);
        if (dict && dict[fullPath]) {
          target[key] = dict[fullPath];
        } else {
          // Keep English fallback or key default
          target[key] = source[key];
        }
      }
    }
  }
}

function getFullPath(source, targetKey) {
  // helper placeholder
  return targetKey;
}

// Read English master
const enObj = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// Flatten keys helper
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

// Process each language file
const targetLangs = ['ch', 'ne', 'hi', 'ja', 'es', 'fra', 'de', 'it', 'ar', 'rs', 'ko', 'nl', 'pt', 'he'];

targetLangs.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  let langObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const dict = dictionaries[lang] || {};

  // For each key in flatEn, if missing or identical to English, check dict or populate
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

    if (!(lastKey in curr) || curr[lastKey] === flatEn[fullKey]) {
      if (dict[fullKey]) {
        curr[lastKey] = dict[fullKey];
      } else {
        // Fallback to existing or english
        if (!(lastKey in curr)) {
          curr[lastKey] = flatEn[fullKey];
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(langObj, null, 2), 'utf8');
  console.log(`Updated ${lang}.json successfully.`);
});

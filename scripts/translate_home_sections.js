import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/Locales');

const homeSectionTranslations = {
  ch: {
    homeHero: {
      welcome: "欢迎来到喜马拉雅雪巴灵酒店 • 尼泊尔加德满都泰梅尔",
      title: "位于加德满都泰梅尔中心的舒适宁静精品酒店",
      description: "位于泰梅尔 Bhagawati Marg 26 的精品酒店 — 干净客房、宁静夜晚、24/7 热水淋浴、免费行李寄存和温馨的喜马拉雅雪巴热情好客。",
      checkAvailability: "检查空房情况",
      bookDirect: "官网直订立减 10%",
      trust1: "泰梅尔核心位置",
      trust2: "舒适静谧客房",
      trust3: "深度安眠体验"
    },
    directOffer: {
      badge: "为什么选择官网直订",
      title: "直接在我们官网预订，立享 10% 优惠",
      discountTitle: "10% 官网直订专属折扣",
      discountDesc: "在官网直接预订立享 10% 优惠 — 无中介佣金加价。",
      luggageTitle: "徒步者免费行李寄存",
      luggageDesc: "在喜马拉雅山脉徒步旅行时，安全免费地寄存您的额外行李。",
      whatsappTitle: "WhatsApp 即时确认",
      whatsappDesc: "24/7 全天候在线回复、机场接送协助和专属贴心服务。",
      bestRateTitle: "最优价格保证",
      bestRateDesc: "透明诚实的定价，没有任何隐藏费用。",
      cta: "官网直订立减 10%",
      disclaimer: "直订最优优惠。欢迎联系我们查询空房及预订。"
    },
    homeStatsPillars: {
      badge: "为什么选择喜马拉雅雪巴灵酒店",
      title: "泰梅尔舒适、宁静的品质住宿",
      subtitle: "加德满都诚实、实用的精品好客之道。没有夸大宣传 — 只有干净舒适、安静的夜晚和贴心关怀。",
      p1Badge: "泰梅尔静谧位置",
      p1Title: "静谧小巷环境",
      p1Desc: "位于 Thamel Bhagawati Marg 26，距离中心商店和面包店仅几步之遥，同时绝妙地隔绝了深夜酒吧和街道喧嚣。",
      p2Badge: "宁静环境氛围",
      p2Title: "安稳不受打扰的睡眠",
      p2Desc: "酒店内部不设嘈杂的餐厅和酒吧，专为宁静住宿而设计。一尘不染的房间和深度恢复活力的睡眠是我们的首要任务。",
      p3Badge: "共享客人厨房",
      p3Title: "可轻度烹饪的共享厨房",
      p3Desc: "配备电磁炉、冰箱、微波炉和电热水壶，为客人提供灵活准备简单家常便饭和冲泡新鲜喜马拉雅茶的便利。",
      p4Badge: "徒步旅行者友好",
      p4Title: "免费行李寄存 & 24/7 前台",
      p4Desc: "准备前往珠峰、安纳普尔纳或朗塘徒步？您可以将额外装备安全存放在我们的行李房中，完全免费，直到您徒步归来。"
    },
    homeRoomsData: {
      badge: "房型分类与最新价格",
      title: "泰梅尔干净、宁静的客房",
      subtitle: "每间客房均包含带 24/7 连续热水淋浴的独立私密浴室、高速光纤 Wi-Fi 和共享自助厨房使用权。",
      mostPopular: "最受欢迎",
      perNight: "/ 晚",
      bedLabel: "床型:",
      occupancyLabel: "入住人数:",
      sizeLabel: "房间面积:",
      keyAmenities: "核心设施",
      viewDetails: "查看详情",
      checkAvailability: "检查空房情况",
      directOfferText: "官网直订最优特惠",
      directOfferSub: "没有任何第三方佣金加价。请直接联系我们查询空房并获得 WhatsApp 即时确认。",
      compareAll: "对比所有房型",
      budget: {
        name: "经济家庭房",
        bed: "1 张特大床 + 1 张单人床",
        occupancy: "最多 4 位客人 (3 成人, 1 儿童)",
        desc: "舒适且实惠的家庭房，配备独立热水淋浴间、明亮窗户和共享厨房使用权，非常适合团体或家庭入住。",
        f1: "1 张特大床 + 1 张单人床",
        f2: "独立私密浴室 (24/7 连续热水)",
        f3: "免费高速光纤 Wi-Fi",
        f4: "共享自助厨房使用权",
        f5: "包含徒步旅行者行李寄存"
      },
      deluxe: {
        name: "豪华空调房",
        bed: "1 张特大床 • 配备空调",
        occupancy: "最多 3 位客人 (2 成人, 1 儿童)",
        desc: "配备空调的精品客房，拥有特大床、独立现代浴室、工作台和安静的环境，确保深度睡眠。",
        f1: "独立冷暖空调 (AC)",
        f2: "1 张舒适特大床",
        f3: "独立现代浴室 (24/7 热水淋浴)",
        f4: "免费高速光纤 Wi-Fi",
        f5: "共享自助厨房使用权"
      },
      family: {
        name: "家庭空调套房",
        bed: "1 张特大床 + 1 张单人床 • 配备空调",
        occupancy: "最多 4 位客人 (3 成人, 1 儿童)",
        desc: "宽敞的家庭套房，拥有全套空调、特大床加单人床、私密洗手间和充足的行李存放空间。",
        f1: "独立冷暖空调 (AC)",
        f2: "1 张特大床 + 1 张单人床",
        f3: "宽敞私密浴室 (24/7 连续热水)",
        f4: "免费高速光纤 Wi-Fi",
        f5: "共享自助厨房使用权"
      }
    },
    facilitiesSection: {
      badge: "❖ 认证酒店设施与服务",
      title: "酒店设施与实用服务",
      subtitle: "为注重实用与舒适的国际游客、背包客和徒步团队精心规划。",
      f1: "免费高速光纤 Wi-Fi",
      d1: "覆盖所有客房和公共区域的高速稳定光纤网络连接。",
      f2: "24/7 前台接待服务",
      d2: "全天候前台服务，支持灵活入住、深夜到达和加德满都当地建议。",
      f3: "徒步者免费行李寄存",
      d3: "在珠峰大本营、安纳普尔纳或朗塘徒步期间，提供安全免费的行李寄存。",
      f4: "机场接送服务",
      d4: "提供加德满都特里布万国际机场 (KTM) 与酒店之间的便捷接送服务。",
      f5: "共享自助厨房",
      d5: "干净的厨房，配备电磁炉、冰箱、微波炉和电热水壶，方便自助烹饪。",
      f6: "徒步协助与建议",
      d6: "提供徒步许可证办理协助、卢克拉/博克拉机票预订及雪巴地道建议。",
      f7: "24/7 高压热水淋浴",
      d7: "所有私密独立浴室全天候提供连续高压冷热水。",
      f8: "每日客房清洁",
      d8: "细致的每日客房清洁、新鲜床单更换及卫生间维护。",
      f9: "冷暖空调设施",
      d9: "豪华房和家庭房配备独立冷暖空调，四季舒适。",
      f10: "办公友好环境",
      d10: "工作台与稳定网络，适合远程专业人士和数字游民。",
      card1Badge: "自助烹饪便利",
      card1Title: "共享客人厨房",
      card1Desc: "随时烹饪您喜欢的食物、准备特殊饮食需求或冲泡喜马拉雅温茶。配备电磁炉、冰箱、微波炉和烹饪用具。",
      card2Badge: "随时待命服务",
      card2Title: "24/7 前台与旅游服务台",
      card2Desc: "无论您是乘坐深夜国际航班到达，还是在黎明前出发前往雪山徒步，我们的团队随时恭候并协助行李与交通。"
    },
    homeLocationSection: {
      badge: "泰梅尔黄金位置",
      title: "喜马拉雅雪巴灵酒店 — 尼泊尔加德满都泰梅尔",
      subtitle: "便利地坐落于 Thamel Bhagawati Marg 26。出门即是泰梅尔热闹的文化与美食，夜晚回归安静隔音的精品酒店。",
      addressTitle: "酒店地址与联系方式",
      frontDesk: "24/7 前台电话",
      whatsapp: "WhatsApp 即时客服",
      email: "官方电子邮箱",
      openMaps: "在 Google 地图中打开",
      viewContact: "查看位置与联系方式",
      landmarksTitle: "周边认证地标",
      l1: "泰梅尔装备店与咖啡馆",
      l1Dist: "紧邻区域 (步行 1-2 分钟)",
      l1Note: "就在 Thamel Bhagawati Marg 门外",
      l2: "梦想花园 (Garden of Dreams)",
      l2Dist: "~800 米 (步行约 10 分钟)",
      l2Note: "历史悠久的新古典主义花园绿洲",
      l3: "加德满都杜巴广场 (Durbar Square)",
      l3Dist: "~1.8 公里 (步行约 20 分钟或短途出租车)",
      l3Note: "联合国教科文组织世界遗产古老皇宫建筑群",
      l4: "斯瓦扬布纳特寺 (猴庙)",
      l4Dist: "~3 公里 (车程约 15 分钟)",
      l4Note: "古老的山顶佛塔，俯瞰加德满都全景",
      l5: "特里布万国际机场 (KTM)",
      l5Dist: "~6 公里 (车程约 20 至 30 分钟)",
      l5Note: "可根据要求安排机场接送服务"
    },
    homeTrekkersSection: {
      badge: "徒步旅行者专属服务",
      title: "为您的喜马拉雅之旅打造",
      subtitle: "加德满都通往尼泊尔雪山徒步路线的大门。无论您是前往珠峰大本营、安纳普尔纳大环线、朗塘，还是探索山谷，喜马拉雅雪巴灵酒店都是您可靠温馨的大本营。",
      step1Tag: "装备准备 & 免费寄存",
      step1Title: "徒步开启之前",
      step1Desc: "国际航班后充分休息，整理徒步装备，确认路线许可证，并将您额外的城市行李免费存放在我们的安全行李房中。",
      step2Tag: "24/7 热水淋浴 & 深度睡眠",
      step2Title: "徒步归来之后",
      step2Desc: "从喜马拉雅山脉归来，享受高压热水淋浴、干净的床铺、宁静的环境以及在泰梅尔应得的深度好眠。",
      step3Tag: "雪巴地道地接经验",
      step3Title: "雪巴指引与全程协助",
      step3Desc: "源自地道的喜马拉雅山脉传统，我们的前台协助办理许可证建议、卢克拉/博克拉机票协调以及实用尼泊尔旅行建议。",
      complimentary: "所有入住客人均可免费享受"
    },
    homeGoogleReviewsSection: {
      badge: "❖ 诚实好客 & 认证位置",
      title1: "真实的好客之道。",
      title2: "真实的客人体验。",
      desc: "在喜马拉雅雪巴灵酒店，我们秉持诚实的好客之道，绝无捏造的故事或星级酒店的夸大其词。我们是位于泰梅尔 Bhagawati Marg 的一家小型精品酒店，致力于为旅行者在加德满都提供一个安静、一尘不染和舒适的住宿环境。",
      perk1: "直订最优价格保证 — 绝无第三方中介佣金加价",
      perk2: "前台 24/7 即时 WhatsApp 确认",
      perk3: "徒步期间免费安全的行李寄存服务",
      perk4: "灵活的提早入住与延迟退房（视房态而定）",
      bookDirectBtn: "在官网直接预订",
      reviewPrompt: "您曾入住过我们的酒店吗？我们热烈欢迎客人在 Google 地图上留下真实的评价，帮助更多旅行者做出明智的决策。",
      writeReviewBtn: "撰写 Google 评价或查看地图",
      verifiedNote: "100% 真实认证的 Google 旅行者反馈"
    },
    homeFAQSection: {
      badge: "常见问题解答",
      title: "住宿实用信息",
      subtitle: "关于入住加德满都泰梅尔喜马拉雅雪巴灵酒店的真实认证信息。",
      haveQuestion: "还有其他问题吗？",
      helpText: "我们的 24/7 前台接待随时可通过 WhatsApp 或电话为您服务。",
      whatsappBtn: "WhatsApp 在线咨询",
      callBtn: "拨打前台电话",
      q1: "喜马拉雅雪巴灵酒店位于哪里？",
      a1: "喜马拉雅雪巴灵酒店位于尼泊尔加德满都泰梅尔区的 Thamel Bhagawati Marg 26。酒店位于安静的小巷内，步行即可到达徒步装备店、面包店、咖啡馆和历史悠久的杜巴广场。",
      q2: "如何从特里布万国际机场到达酒店？",
      a2: "酒店距离特里布万国际机场 (KTM) 约 6 公里。根据城市交通状况，乘出租车或私人接送通常需要 20 至 30 分钟。",
      q3: "酒店提供机场接机服务吗？",
      a3: "是的，我们安排加德满都机场与酒店之间的可靠接送服务。您可以在官网直接预订时或通过 WhatsApp (+977 9818259472) 联系前台申请接机。",
      q4: "徒步旅行者可以寄存行李吗？",
      a4: "是的，我们为所有客人提供免费的安全行李寄存服务。前往珠峰、安纳普尔纳或朗塘徒步数日的客人可以免费将非徒步行李安全寄存于此，直至归来。",
      q5: "酒店内部有餐厅吗？",
      a5: "酒店专为远离噪音的宁静住宿而设计。虽然我们内部不经营商业餐厅或酒吧，但我们为客人提供设施齐全的共享厨房，且泰梅尔数百家备受赞誉的餐厅和面包店距离酒店仅 1 至 3 分钟步行路程。",
      q6: "酒店有共享厨房吗？",
      a6: "是的，喜马拉雅雪巴灵酒店提供干净且配备齐全的共享客人厨房，配备电磁炉、冰箱、微波炉和电热水壶，客人可以制作简单餐食、烹饪个人偏好的饮食或冲泡新鲜喜马拉雅茶。",
      q7: "入住和退房时间是什么时候？",
      a7: "标准入住时间从 14:00 (下午 2:00) 开始，退房时间至 12:00 (中午 12:00)。我们的前台 24/7 有人值守，只要客房情况允许，均可灵活安排提早入住或延迟退房。",
      q8: "酒店提供 Wi-Fi 吗？",
      a8: "是的，整个酒店区域（包括所有客房、套房和公共休息区）均提供免费高速光纤 Wi-Fi。",
      q9: "哪些房间配备空调？",
      a9: "我们的豪华房和家庭房配备具有冷暖气候控制的空调 (AC)。经济家庭房配备吊扇和辅助加热设备。",
      q10: "酒店的取消政策是什么？",
      a10: "通过我们的官网、WhatsApp 或电话直接预订享有灵活取消政策。如果您的旅行计划有变，请至少在预定入住日期前 24 小时通知我们的前台。",
      q11: "如何直接预订？",
      a11: "您可以点击官网上的“检查空房情况”进行预订，或通过 WhatsApp (+977 9818259472) 直接联系前台，享受官网直订立减 10% 最优价格保证及即时确认。"
    },
    homeBookingCTASection: {
      badge: "官网直订专属特权",
      title: "准备好在加德满都泰梅尔安享好眠了吗？",
      subtitle: "享受干净的客房、宁静的夜晚、24/7 热水淋浴和徒步行李寄存。直接在喜马拉雅雪巴灵酒店官网预订，获取最优价格与 WhatsApp 即时支持。",
      bookBtn: "官网直订立减 10%",
      callBtn: "拨打 +977 9851068219",
      disclaimer: "直订最优优惠。欢迎联系我们查询空房及日期。"
    }
  }
};

const targetLangs = ['ch', 'ne', 'hi', 'ja', 'es', 'fra', 'de', 'it', 'ar', 'rs', 'ko', 'nl', 'pt', 'he'];

targetLangs.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;

  let langObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const langDict = homeSectionTranslations[lang] || homeSectionTranslations['ch'];

  function recursiveAssign(target, source) {
    for (const key in source) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') {
          target[key] = {};
        }
        recursiveAssign(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  recursiveAssign(langObj, langDict);

  fs.writeFileSync(filePath, JSON.stringify(langObj, null, 2), 'utf8');
  console.log(`Updated home sections in ${lang}.json`);
});

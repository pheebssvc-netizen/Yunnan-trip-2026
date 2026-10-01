// ================================================================
//  1. FIREBASE CONFIG
// ================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAtthBBNoHJkN6B_e8DVjzDpK_eB0wfExo",
    authDomain: "yunnan-trip-d5626.firebaseapp.com",
    databaseURL: "https://yunnan-trip-d5626-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "yunnan-trip-d5626",
    storageBucket: "yunnan-trip-d5626.firebasestorage.app",
    messagingSenderId: "956753515518",
    appId: "1:956753515518:web:ef19ac8a7b45bdf83426af"
};

let firebaseInitialized = false;
try {
    firebase.initializeApp(firebaseConfig);
    firebaseInitialized = true;
} catch (e) { console.warn('Firebase init error:', e); }
const db = firebaseInitialized ? firebase.database() : null;

// ================================================================
//  2. 完整行程數據（12日）
// ================================================================
const DAYS_DATA = [{
    id: 1,
    date: "11 Nov",
    weekday: "三",
    title: "香港 ✈️ 昆明（夜機）",
    hotel: "昆明長水國際機場美居酒店",
    hotelStatus: "✅ 已確認",
    place: "昆明",
    altitude: 1900,
    breakfast: "酒店早餐（可選）",
    lunch: "機上／機場",
    dinner: "昆明市區（可選）",
    attractions: [
        { name: "香港國際機場 T1", time: "19:00 抵達 · 21:15 起飛" },
        { name: "昆明長水國際機場", time: "23:55 抵達" }
    ],
    shops: [],
    others: [],
    warnings: ["建議提前2-3小時到機場"]
}, {
    id: 2,
    date: "12 Nov",
    weekday: "四",
    title: "昆明 → 高鐵 → 大理 → 雙廊",
    hotel: "大理牧心堡·法式懸崖海景度假莊園",
    hotelStatus: "✅ 訂單可保留",
    place: "大理",
    altitude: 1970,
    breakfast: "酒店早餐 (約¥58/人)",
    lunch: "高鐵上／大理市區",
    dinner: "雙廊海邊餐廳 (推薦大理酸辣魚)",
    attractions: [
        { name: "昆明站", time: "11:11 高鐵 C4322" },
        { name: "大理站", time: "13:28 抵達 · 包車接站" },
        { name: "雙廊牧心堡", time: "14:30 入住" },
        { name: "理想邦聖托里尼 (可選)", time: "16:00" },
        { name: "洱海日落", time: "18:30" }
    ],
    shops: [],
    others: [],
    warnings: ["包車正式開始 · 大理站→雙廊 約50公里"]
}, {
    id: 3,
    date: "13 Nov",
    weekday: "五",
    title: "雙廊 → 沙溪古鎮（深度遊）",
    hotel: "沙溪古鎮五柳心宿",
    hotelStatus: "✅ 已確認",
    place: "沙溪",
    altitude: 2100,
    breakfast: "酒店早餐",
    lunch: "沙溪地道農家菜 (推薦沙溪火腿)",
    dinner: "沙溪農家菜",
    attractions: [
        { name: "牧心堡露台日出", time: "07:15" },
        { name: "沙溪古鎮", time: "11:30 抵達" },
        { name: "古戲台 · 寺登街 · 興教寺", time: "14:00" },
        { name: "玉津橋", time: "17:00" }
    ],
    shops: [],
    others: [],
    warnings: ["雙廊→沙溪 約110公里 · 車程2小時"]
}, {
    id: 4,
    date: "14 Nov",
    weekday: "六",
    title: "沙溪 → 麗江古城",
    hotel: "麗江古城大水車亞朵酒店",
    hotelStatus: "✅ 已確認",
    place: "麗江",
    altitude: 2400,
    breakfast: "早餐後退房",
    lunch: "麗江古城",
    dinner: "麗江古城",
    attractions: [
        { name: "沙溪晨光漫步 (可選)", time: "08:00" },
        { name: "麗江古城大水車 · 四方街", time: "14:00" },
        { name: "木府", time: "15:30 門票約¥40" },
        { name: "獅子山萬古樓", time: "17:00 門票約¥35" }
    ],
    shops: [],
    others: [],
    warnings: ["⚠️ 海拔2,400m · 今晚嚴禁洗頭洗澡 · 嚴禁飲酒跑跳"]
}, {
    id: 5,
    date: "15 Nov",
    weekday: "日",
    title: "麗江 → 瀘沽湖",
    hotel: "瀘沽湖水天壹舍",
    hotelStatus: "✅ 已確認 (連住2晚)",
    place: "瀘沽湖",
    altitude: 2690,
    breakfast: "酒店早餐",
    lunch: "寧蒗縣城 (途中午餐)",
    dinner: "摩梭火塘",
    attractions: [
        { name: "麗寧十八彎觀景台", time: "10:30" },
        { name: "瀘沽湖景區", time: "13:30 門票約¥70" },
        { name: "大落水村碼頭", time: "17:30 欣賞日落" }
    ],
    shops: [],
    others: [],
    warnings: ["⚠️ 海拔2,690m · 今晚嚴禁洗頭洗澡 · 車程約4小時"]
}, {
    id: 6,
    date: "16 Nov",
    weekday: "一",
    title: "瀘沽湖環湖全日",
    hotel: "瀘沽湖水天壹舍",
    hotelStatus: "✅ 已確認",
    place: "瀘沽湖",
    altitude: 2690,
    breakfast: "酒店早餐",
    lunch: "里格半島或四川側",
    dinner: "瀘沽湖",
    attractions: [
        { name: "瀘沽湖晨霧日出 (可選)", time: "06:30" },
        { name: "雲南情人灘", time: "09:50" },
        { name: "里格半島觀景台", time: "10:30" },
        { name: "尼塞村 · 格姆女神山", time: "11:15" },
        { name: "小洛水", time: "11:45" },
        { name: "瀘源崖", time: "12:15" },
        { name: "四川情人灘", time: "12:50" },
        { name: "草海 · 走婚橋", time: "13:30" },
        { name: "女神灣", time: "14:45" },
        { name: "豬槽船遊湖 (可選)", time: "16:00" }
    ],
    shops: [],
    others: [],
    warnings: ["環湖約70公里 · 逆時針方向 · 篝火晚會可選"]
}, {
    id: 7,
    date: "17 Nov",
    weekday: "二",
    title: "瀘沽湖 → 束河古鎮 → 白沙古鎮",
    hotel: "不晚里予·Wild Aurora",
    hotelStatus: "✅ 已確認",
    place: "白沙",
    altitude: 2500,
    breakfast: "早餐後退房",
    lunch: "束河古鎮",
    dinner: "白沙古鎮",
    attractions: [
        { name: "瀘沽湖晨霧 (可選)", time: "06:30" },
        { name: "束河古鎮 · 青龍橋 · 九鼎龍潭", time: "14:00" },
        { name: "茶馬古道博物館", time: "14:00" },
        { name: "白沙古鎮民宿", time: "17:00" },
        { name: "玉龍雪山日落", time: "17:30" }
    ],
    shops: [],
    others: [],
    warnings: ["瀘沽湖→束河 約200公里 · 車程4小時"]
}, {
    id: 8,
    date: "18 Nov",
    weekday: "三",
    title: "白沙 → 虎跳峽 → 白水台 → 香格里拉",
    hotel: "香格里拉（待定）",
    hotelStatus: "⏳ 未確認",
    place: "香格里拉",
    altitude: 3300,
    breakfast: "早餐後退房",
    lunch: "虎跳峽附近",
    dinner: "香格里拉 (藏式火鍋)",
    attractions: [
        { name: "日照金山", time: "07:00" },
        { name: "白沙壁畫", time: "08:30" },
        { name: "虎跳峽 (上虎跳)", time: "11:00" },
        { name: "白水台", time: "15:30" },
        { name: "香格里拉", time: "19:30" }
    ],
    shops: [],
    others: [],
    warnings: ["⭐ 最高海拔 · 3,300m · 今晚嚴禁洗頭洗澡"]
}, {
    id: 9,
    date: "19 Nov",
    weekday: "四",
    title: "普達措國家公園全日",
    hotel: "香格里拉（待定）",
    hotelStatus: "⏳ 未確認",
    place: "香格里拉",
    altitude: 3300,
    breakfast: "酒店早餐",
    lunch: "景區內或自備乾糧",
    dinner: "香格里拉 (藏式火鍋)",
    attractions: [
        { name: "普達措國家公園", time: "09:30" },
        { name: "屬都湖徒步", time: "10:00" },
        { name: "碧塔海", time: "14:00" }
    ],
    shops: [],
    others: [],
    warnings: ["海拔3,400m · 週一閉園 · 嚴禁洗頭洗澡"]
}, {
    id: 10,
    date: "20 Nov",
    weekday: "五",
    title: "香格里拉 → 納帕海 → 松贊林寺 → 麗江",
    hotel: "麗江古城大水車亞朵酒店（加訂）",
    hotelStatus: "⏳ 需加訂1晚",
    place: "麗江",
    altitude: 2400,
    breakfast: "酒店早餐",
    lunch: "香格里拉",
    dinner: "麗江古城",
    attractions: [
        { name: "納帕海 (依拉草原)", time: "09:00" },
        { name: "松贊林寺", time: "11:30" },
        { name: "返回麗江", time: "15:00" }
    ],
    shops: [],
    others: [],
    warnings: ["海拔回落至2,400m · 今晚可以舒服沖涼 🎉"]
}, {
    id: 11,
    date: "21 Nov",
    weekday: "六",
    title: "麗江 → 高鐵 → 昆明",
    hotel: "昆明南屏步行街老街亞朵酒店",
    hotelStatus: "✅ 已確認",
    place: "昆明",
    altitude: 1900,
    breakfast: "自然醒 · 酒店早餐",
    lunch: "麗江",
    dinner: "昆明 (過橋米線)",
    attractions: [
        { name: "麗江古城／束河自由活動", time: "10:00" },
        { name: "麗江站", time: "14:30" },
        { name: "昆明南屏步行街", time: "21:00" }
    ],
    shops: [],
    others: [],
    warnings: ["包車服務結束 · 高鐵約3.5-4小時"]
}, {
    id: 12,
    date: "22 Nov",
    weekday: "日",
    title: "昆明半日遊 → ✈️ 香港",
    hotel: "-",
    hotelStatus: "-",
    place: "昆明",
    altitude: 1900,
    breakfast: "自然醒 · 酒店早餐",
    lunch: "昆明 (過橋米線)",
    dinner: "機上",
    attractions: [
        { name: "翠湖公園", time: "10:00" },
        { name: "雲南大學 (可選)", time: "11:30" },
        { name: "昆明長水機場", time: "13:50" },
        { name: "香港國際機場 T1", time: "16:05" }
    ],
    shops: [],
    others: [],
    warnings: ["🎉 旅程完結！"]
}];

// ================================================================
//  3. TIPS
// ================================================================
const TIPS = [
    "今晚唔好沖涼住啦～",
    "海拔越高，心跳越快 ❤️",
    "記住飲多啲水，防高山症！",
    "慢啲行，享受每一刻 🚶",
    "影多啲相，留低美好回憶 📸",
    "天氣乾燥，記得搽潤唇膏！",
    "夜晚會好凍，著多件衫 🧥",
    "呢度嘅星空超靚，記得抬頭睇 ✨",
    "當地酥油茶好暖胃，試吓！",
    "今日行程好正，慢慢享受～"
];

// ================================================================
//  4. 工具函數
// ================================================================
function getNoteKey(dayId, category, index) {
    if (category === 'attraction') return `day-${dayId}-attr-${index}`;
    if (category === 'shop') return `day-${dayId}-shop-${index}`;
    if (category === 'other') return `day-${dayId}-other-${index}`;
    return `day-${dayId}-${category}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================================================
//  5. 倒數計時
// ================================================================
function updateCountdown() {
    const target = new Date('2026-11-11T21:15:00+08:00').getTime();
    const now = Date.now();
    const diff = target - now;
    const el = document.getElementById('countdown');
    if (!el) return;
    if (diff <= 0) {
        el.innerHTML = '🎉 旅程已開始！';
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((
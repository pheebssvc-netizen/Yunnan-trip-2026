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
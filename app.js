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
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    el.innerHTML =
        `⏳ 距離出發仲有 <span class="highlight">${days}</span> 日 <span class="highlight">${hours}</span> 小時 <span class="highlight">${minutes}</span> 分鐘 <span class="highlight">${seconds}</span> 秒`;
}

// ================================================================
//  6. 天氣小工具
// ================================================================
const WEATHER_API_KEY = '236796fae33215243c53c1a42b345773';

const dayCityMap = {
    1: 'Kunming',
    2: 'Dali',
    3: 'Shaxi',
    4: 'Lijiang',
    5: 'Lugu Lake',
    6: 'Lugu Lake',
    7: 'Lijiang',
    8: 'Shangri-La',
    9: 'Shangri-La',
    10: 'Lijiang',
    11: 'Kunming',
    12: 'Kunming'
};

const cityNameMap = {
    'Kunming': '昆明',
    'Dali': '大理',
    'Shaxi': '沙溪',
    'Lijiang': '麗江',
    'Lugu Lake': '瀘沽湖',
    'Shangri-La': '香格里拉'
};

const weatherIconMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️'
};

function getTodayDayIndex() {
    const now = new Date();
    const start = new Date('2026-11-11');
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 1;
    if (diff >= 12) return 12;
    return diff + 1;
}

// ================================================================
//  今日私人導遊
//  只使用現有 DAYS_DATA，不改動原本行程資料
// ================================================================
const TODAY_GUIDE_DATA = {
    1: { speech: '👧「大家好～今日我哋正式出發啦！第一站係昆明，今晚先好好休息，之後先慢慢開始滇西之旅～」', notice: '今晚抵達昆明，先休息好', tip: '早啲休息，為聽日去大理做準備' },
    2: { speech: '👧「今日正式向大理出發！坐高鐵之後就開始包車旅程，雙廊嘅洱海風景記得留意呀～」', notice: '雙廊洱海 · 理想邦 · 洱海日落', tip: '包車正式開始，慢慢享受旅程' },
    3: { speech: '👧「今日去沙溪古鎮。呢度唔需要趕住打卡，慢慢行入寺登街，感受一下古鎮嘅節奏。」', notice: '寺登街 · 古戲台 · 興教寺 · 玉津橋', tip: '沙溪適合慢慢行，留時間畀自己' },
    4: { speech: '👧「今日由沙溪去麗江啦！下午可以慢慢探索古城，傍晚上獅子山睇下麗江嘅景色。」', notice: '大水車 · 四方街 · 木府 · 萬古樓', tip: '麗江海拔約2,400米，今日開始慢慢適應' },
    5: { speech: '👧「今日我哋去瀘沽湖！沿途有麗寧十八彎，抵達之後記得留意湖面同山景。」', notice: '麗寧十八彎 · 瀘沽湖 · 大落水', tip: '海拔約2,690米，慢慢行、記得飲水' },
    6: { speech: '👧「今日成日都係瀘沽湖～唔使趕，慢慢環湖，睇下里格半島、草海同女神灣。」', notice: '里格半島 · 草海 · 走婚橋 · 女神灣', tip: '今日車程較多，沿途風景先係主角' },
    7: { speech: '👧「今日由瀘沽湖返麗江方向，會經過束河同白沙。下晝開始，可以慢慢感受古鎮嘅氣氛。」', notice: '束河古鎮 · 茶馬古道 · 白沙', tip: '今日車程較長，途中記得休息' },
    8: { speech: '👧「今日正式進入高原旅程啦！我哋會去虎跳峽、白水台，最後到香格里拉。今日最重要係慢慢適應。」', notice: '虎跳峽 · 白水台 · 香格里拉', tip: '最高海拔約3,300米，唔好急、唔好劇烈活動' },
    9: { speech: '👧「今日係普達措！呢度海拔高，景色亦好靚。唔需要行得快，舒服最重要。」', notice: '屬都湖 · 碧塔海 · 高原森林', tip: '海拔約3,300米，按自己狀態慢慢行' },
    10: { speech: '👧「今日我哋離開香格里拉，先去納帕海同松贊林寺，之後慢慢返麗江。」', notice: '納帕海 · 松贊林寺', tip: '海拔開始下降，今晚可以好好休息' },
    11: { speech: '👧「今日由麗江返昆明，旅程開始進入尾聲啦。唔使急，最後幾日就慢慢享受。」', notice: '麗江自由活動 · 高鐵 · 昆明', tip: '包車旅程正式結束，記得整理行李' },
    12: { speech: '👧「今日就係最後一日啦～仲有半日時間留喺昆明，慢慢食、慢慢行，然後帶住滿滿回憶返香港！」', notice: '翠湖公園 · 雲南大學 · 昆明', tip: '旅程最後一天，記得影張4人合照 📸' }
};

function getActiveDayIndex() {
    const testDay = new URLSearchParams(window.location.search).get('day');
    const n = Number(testDay);
    if (Number.isInteger(n) && n >= 1 && n <= 12) return n;
    return getTodayDayIndex();
}

// ================================================================
//  今日私人導遊：只更新靜態 HTML 入面嘅文字
//  （唔再重建整塊 HTML，避免重複卡片）
// ================================================================
function renderTodayGuide() {
    const dayId = getActiveDayIndex();
    const dayData = DAYS_DATA.find(d => d.id === dayId);
    const guideData = TODAY_GUIDE_DATA[dayId];
    if (!dayData || !guideData) return;

    const dayDate  = dayData.date || '';
    const place    = dayData.place || '雲南';
    const altitude = dayData.altitude ? ` · ${dayData.altitude.toLocaleString()}m` : '';

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('guideDay',         `DAY ${dayId} · ${dayDate}${altitude}`);
    setText('guidePlace',       `📍 ${place}`);
    setText('guideSpeech',      guideData.speech);
    setText('guideDestination', place);
    setText('guideNotice',      guideData.notice);
    setText('guideTip',         guideData.tip);
}

// ================================================================
//  天氣
// ================================================================
function fetchWeather() {
    const container = document.getElementById('weatherContainer');
    if (!container) return;
    const dayIndex = getTodayDayIndex();
    const cityKey = dayCityMap[dayIndex] || 'Kunming';
    const cityName = cityNameMap[cityKey] || cityKey;

    if (WEATHER_API_KEY === '你的OpenWeatherMap_API_Key') {
        container.innerHTML = `
            <div class="weather-loading">⚠️ 請設定 OpenWeatherMap API Key</div>
        `;
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityKey}&appid=${WEATHER_API_KEY}&units=metric&lang=zh_tw`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('API 請求失敗');
            return res.json();
        })
        .then(data => {
            const tempDay = Math.round(data.main.temp);
            let tempNight = data.main.temp_min ? Math.round(data.main.temp_min) : Math.round(data.main.temp - 14);
            if (tempNight >= tempDay) {
                tempNight = Math.round(tempDay - 12);
            }

            const icon = weatherIconMap[data.weather[0].main] || '🌤️';
            const desc = data.weather[0].description || '';
            const humidity = data.main.humidity || 0;

            const sunrise = data.sys.sunrise ? new Date(data.sys.sunrise * 1000) : null;
            const sunset = data.sys.sunset ? new Date(data.sys.sunset * 1000) : null;
            const sunriseStr = sunrise ? sunrise.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }) : '--:--';
            const sunsetStr = sunset ? sunset.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }) : '--:--';

            container.innerHTML = `
                <div class="weather-card">
                    <div class="weather-compact">
                        <div class="weather-main">
                            <div class="city">📍 ${cityName}</div>
                            <div class="main-center">
                                <span class="main-temp">${tempDay}°C</span>
                                <span class="main-humidity">💧 ${humidity}%</span>
                            </div>
                            <div class="main-icon">${icon}</div>
                        </div>
                        <div class="weather-periods">
                            <div class="period-card day">
                                <div class="period-label">日間</div>
                                <span class="period-icon">☀️</span>
                                <div class="period-temp">${tempDay}°C</div>
                                <div class="period-desc">${desc}</div>
                            </div>
                            <div class="period-card night">
                                <div class="period-label">夜間</div>
                                <span class="period-icon">🌙</span>
                                <div class="period-temp">${tempNight}°C</div>
                                <div class="period-desc">${desc}</div>
                            </div>
                        </div>
                        <div class="sun-info">
                            <span class="sun-item"><span class="sun-emoji">🌅</span> 日出 ${sunriseStr}</span>
                            <span class="sun-item"><span class="sun-emoji">🌇</span> 日落 ${sunsetStr}</span>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.warn('天氣載入失敗:', err);
            container.innerHTML = `
                <div class="weather-loading">⚠️ 無法載入天氣，請稍後再試</div>
            `;
        });
}

// ================================================================
//  7. 行程總覽
// ================================================================
function renderRouteTable() {
    const tbody = document.getElementById('routeTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    DAYS_DATA.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="day-cell">Day ${d.id}</td>
            <td>${d.date}</td>
            <td class="route-cell">${d.title}</td>
            <td class="place-cell">${d.place || '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ================================================================
//  8. 狀態列表（Firebase 同步）
// ================================================================
function renderStatusList() {
    const container = document.getElementById('statusList');
    if (!container) return;
    container.innerHTML = '';

    if (!db) {
        container.innerHTML = `<div style="color:#C07A5A; padding:10px 0;">⚠️ Firebase 未連線，無法同步住宿資料</div>`;
        return;
    }

    DAYS_DATA.forEach(d => {
        if (d.hotel && d.hotel !== '-') {
            const row = document.createElement('div');
            row.className = 'row';
            row.id = `status-row-${d.id}`;
            row.innerHTML = `
                <span class="day-label">Day ${d.id}</span>
                <input type="text" class="hotel-input" data-day="${d.id}" value="⏳ 載入中..." placeholder="酒店名" />
                <input type="text" class="status-input" data-day="${d.id}" value="⏳ 載入中..." placeholder="狀態" />
            `;
            container.appendChild(row);
        }
    });

    DAYS_DATA.forEach(d => {
        if (d.hotel && d.hotel !== '-') {
            const hotelRef = db.ref(`hotels/${d.id}/name`);
            const statusRef = db.ref(`hotels/${d.id}/status`);

            hotelRef.on('value', (snap) => {
                const val = snap.val();
                if (val !== null && val !== undefined) {
                    d.hotel = val;
                }
                const input = document.querySelector(`#status-row-${d.id} .hotel-input`);
                if (input) input.value = d.hotel;
            });

            statusRef.on('value', (snap) => {
                const val = snap.val();
                if (val !== null && val !== undefined) {
                    d.hotelStatus = val;
                }
                const input = document.querySelector(`#status-row-${d.id} .status-input`);
                if (input) input.value = d.hotelStatus;
            });
        }
    });

    container.querySelectorAll('.hotel-input').forEach(input => {
        input.addEventListener('change', function() {
            const dayId = parseInt(this.dataset.day);
            const val = this.value.trim();
            if (!val) { alert('請輸入酒店名'); return; }
            if (!db) return;
            db.ref(`hotels/${dayId}/name`).set(val);
            const dayData = DAYS_DATA.find(d => d.id === dayId);
            if (dayData) dayData.hotel = val;
            updateDailyHeaderIfVisible(dayId);
        });
    });

    container.querySelectorAll('.status-input').forEach(input => {
        input.addEventListener('change', function() {
            const dayId = parseInt(this.dataset.day);
            const val = this.value.trim();
            if (!db) return;
            db.ref(`hotels/${dayId}/status`).set(val);
            const dayData = DAYS_DATA.find(d => d.id === dayId);
            if (dayData) dayData.hotelStatus = val;
            updateDailyHeaderIfVisible(dayId);
        });
    });
}

function updateDailyHeaderIfVisible(dayId) {
    const dailyPage = document.getElementById('page-daily');
    if (dailyPage) {
        const currentDay = currentDayId;
        if (currentDay === dayId) {
            renderDayDetail(currentDay);
        }
    }
}

// ================================================================
//  9. 高鐵輸入（Firebase 同步）
// ================================================================
function initTrainInputs() {
    const area = document.getElementById('trainInputArea');
    if (!area) return;

    const inputs = area.querySelectorAll('.train-input');

    inputs.forEach(input => {
        input.value = '⏳ 載入中...';
    });

    const trainKeys = ['kunming-dali', 'lijiang-kunming'];
    trainKeys.forEach(key => {
        const ref = db.ref(`trains/${key}`);
        ref.on('value', (snap) => {
            const val = snap.val();
            const input = area.querySelector(`.train-input[data-train="${key}"]`);
            if (input) {
                input.value = (val !== null && val !== undefined) ? val : '';
            }
        });
    });

    inputs.forEach(input => {
        input.addEventListener('change', function() {
            const key = this.dataset.train;
            const val = this.value.trim();
            if (!db) return;
            db.ref(`trains/${key}`).set(val);
        });
    });
}

// ================================================================
//  10. 團友備註（Firebase 同步）
// ================================================================
function renderGroupNotes() {
    const container = document.getElementById('groupNoteContainer');
    if (!container) return;
    if (!db) {
        container.innerHTML = `<div style="color:#C07A5A; padding:10px 0;">⚠️ Firebase 未連線，無法同步團友備註</div>`;
        return;
    }

    const notesRef = db.ref('groupNotes');
    notesRef.on('value', (snap) => {
        const notes = snap.val() || [];
        const emptyMsg = document.getElementById('groupNoteEmpty');

        container.querySelectorAll('.group-note-item').forEach(el => el.remove());

        if (notes.length === 0) {
            if (emptyMsg) emptyMsg.style.display = 'block';
            return;
        }
        if (emptyMsg) emptyMsg.style.display = 'none';

        notes.forEach((note, idx) => {
            const div = document.createElement('div');
            div.className = 'group-note-item';
            div.innerHTML = `
                <span class="note-text">${escapeHtml(note)}</span>
                <button class="del-btn" data-idx="${idx}">✕</button>
            `;
            container.appendChild(div);
        });

        container.querySelectorAll('.group-note-item .del-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.dataset.idx);
                db.ref('groupNotes').once('value').then(snap => {
                    const arr = snap.val() || [];
                    arr.splice(idx, 1);
                    db.ref('groupNotes').set(arr);
                });
            };
        });
    });
}

function addGroupNote() {
    const input = document.getElementById('groupNoteInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) { alert('請輸入內容'); return; }
    if (!db) { alert('❌ Firebase 未連線'); return; }

    db.ref('groupNotes').once('value').then(snap => {
        const notes = snap.val() || [];
        notes.push(text);
        db.ref('groupNotes').set(notes);
    });
    input.value = '';
}

// ================================================================
//  11. 每日行程
// ================================================================
let currentDayId = 1;

function renderDayTabs() {
    const container = document.getElementById('dayTabs');
    if (!container) return;
    container.innerHTML = '';
    DAYS_DATA.forEach(d => {
        const btn = document.createElement('button');
        btn.textContent = `Day ${d.id} (${d.date})`;
        btn.dataset.dayId = d.id;
        if (d.id === currentDayId) btn.classList.add('active');
        btn.onclick = () => {
            currentDayId = d.id;
            renderDayTabs();
            renderDayDetail(d.id);
            drawAltitude(currentDayId);
            setTimeout(() => {
                const detail = document.querySelector('.day-detail');
                if (detail) {
                    const topOffset = 160;
                    const elementPosition = detail.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - topOffset, behavior: 'smooth' });
                }
            }, 100);
        };
        container.appendChild(btn);
    });
}

function renderDayDetail(dayId) {
    const container = document.getElementById('dayDetailContainer');
    if (!container) return;
    const day = DAYS_DATA.find(d => d.id === dayId);
    if (!day) return;

    if (db) {
        db.ref(`hotels/${dayId}/name`).once('
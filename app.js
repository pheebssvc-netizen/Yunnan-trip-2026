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
//  2. 行程數據 ⚠️ 請貼返你原本嘅 12 日行程數據
// ================================================================
const DAYS_DATA = [
    // ⚠️ 請將你原本嘅 12 日行程數據貼返喺呢度
    // 即係由 { id: 1, date: "11 Nov", ... } 開始嗰段
];

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
            const icon = weatherIconMap[data.weather[0].main] || '🌤️';
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].description || '';
            const humidity = data.main.humidity || 0;

            container.innerHTML = `
                <div class="weather-card">
                    <div class="weather-left">
                        <div class="weather-icon">${icon}</div>
                        <div>
                            <div class="weather-city">📍 ${cityName}</div>
                            <div class="weather-desc">${desc}</div>
                        </div>
                    </div>
                    <div>
                        <div class="weather-temp">${temp}<small>°C</small></div>
                        <div class="weather-extra">💧 ${humidity}%</div>
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
        db.ref(`hotels/${dayId}/name`).once('value', (snap) => {
            if (snap.val() !== null && snap.val() !== undefined) {
                day.hotel = snap.val();
            }
        });
        db.ref(`hotels/${dayId}/status`).once('value', (snap) => {
            if (snap.val() !== null && snap.val() !== undefined) {
                day.hotelStatus = snap.val();
            }
        });
    }

    let html = `<div class="day-detail">`;

    html += `
        <div class="day-head">
            <span class="day-label">Day ${day.id} · ${day.date} (${day.weekday})</span>
            <span class="day-sub">${day.title}</span>
            ${day.hotel && day.hotel !== '-' ? `<span class="hotel">🏨 ${day.hotel} ${day.hotelStatus || ''}</span>` : ''}
        </div>
    `;

    if (day.warnings && day.warnings.length) {
        html += `<div class="warning-banner"><strong>⚠️ 提示</strong>${day.warnings.join(' · ')}</div>`;
    }

    html += `<div class="attractions-header">📍 景點</div>`;
    if (day.attractions && day.attractions.length) {
        day.attractions.forEach((attr, idx) => {
            const label = attr.name;
            const timeStr = attr.time ? ` · <span class="time-tag">${attr.time}</span>` : '';
            html += renderAttractionItem(day.id, 'attraction', label + timeStr, '', idx);
        });
    }

    const mealCategories = [
        { key: 'breakfast', emoji: '🍳', label: '早餐', value: day.breakfast, cls: 'breakfast' },
        { key: 'lunch', emoji: '🥢', label: '午餐', value: day.lunch, cls: 'lunch' },
        { key: 'dinner', emoji: '🍽️', label: '晚餐', value: day.dinner, cls: 'dinner' },
        { key: 'other', emoji: '📌', label: '其他', value: '', cls: 'other' }
    ];
    mealCategories.forEach(cat => {
        html += renderMealItem(day.id, cat.key, `${cat.emoji} ${cat.label}`, cat.value, cat.cls);
    });

    html += `</div>`;
    container.innerHTML = html;

    setTimeout(() => {
        const noteAreas = container.querySelectorAll('.note-area');
        noteAreas.forEach(area => {
            const key = area.id.replace('note-area-', '');
            if (db) {
                db.ref(key).once('value').then(snap => {
                    const notes = snap.val() || [];
                    if (notes.length === 0) {
                        area.innerHTML = `<div class="empty-msg">💬 未有備註 · 你嚟加第一條！</div>`;
                    } else {
                        let html = '';
                        notes.forEach((note, idx) => {
                            const text = note.text || '';
                            const linkedText = text.replace(
                                /(https?:\/\/[^\s]+)/g,
                                '<a href="$1" target="_blank" rel="noopener">$1</a>'
                            );
                            html += `
                                <div class="note-item">
                                    <span class="note-text">${linkedText}</span>
                                    <button class="del-btn" data-key="${key}" data-idx="${idx}">✕</button>
                                </div>
                            `;
                        });
                        area.innerHTML = html;
                        area.querySelectorAll('.del-btn').forEach(btn => {
                            btn.onclick = function() {
                                const k = this.dataset.key;
                                const idx = parseInt(this.dataset.idx);
                                if (!db) return;
                                db.ref(k).once('value').then(snap => {
                                    const arr = snap.val() || [];
                                    arr.splice(idx, 1);
                                    db.ref(k).set(arr);
                                }).catch(e => alert('刪除失敗: ' + e.message));
                            };
                        });
                    }
                }).catch(() => {});
            }
        });
    }, 50);

    container.querySelectorAll('.add-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.stopPropagation();
            const form = this.closest('.day-item-meal')?.querySelector('.add-note-form') ||
                this.closest('.day-item-attraction')?.querySelector('.add-note-form');
            if (form) {
                form.classList.toggle('open');
                if (form.classList.contains('open')) {
                    form.querySelector('.msg-input')?.focus();
                }
            }
        };
    });

    container.querySelectorAll('.submit-btn').forEach(btn => {
        btn.onclick = function() {
            const form = this.closest('.add-note-form');
            const dayId = parseInt(this.dataset.dayId);
            const category = this.dataset.category;
            const index = this.dataset.index !== undefined ? parseInt(this.dataset.index) : undefined;
            const msgInput = form.querySelector('.msg-input');
            const text = msgInput.value.trim();
            if (!text) { alert('請輸入內容'); return; }
            if (!db) {
                alert('❌ Firebase 未連線');
                return;
            }
            const key = getNoteKey(dayId, category, index);
            db.ref(key).once('value').then(snap => {
                const existing = snap.val() || [];
                existing.push({ text, time: Date.now() });
                return db.ref(key).set(existing);
            }).then(() => {
                msgInput.value = '';
                form.classList.remove('open');
            }).catch(e => {
                if (e.code === 'PERMISSION_DENIED') {
                    alert('❌ 權限不足！請去 Firebase 控制台將 Realtime Database 規則設為「測試模式」');
                } else {
                    alert('儲存失敗: ' + e.message);
                }
            });
        };
    });

    container.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.onclick = function() {
            const form = this.closest('.add-note-form');
            form.querySelector('.msg-input').value = '';
            form.classList.remove('open');
        };
    });
}

function renderMealItem(dayId, category, label, defaultValue, cls) {
    const key = getNoteKey(dayId, category, undefined);
    const hasDefault = defaultValue && defaultValue.length > 0;
    return `
        <div class="day-item-meal ${cls}">
            <div class="item-label">
                <span>${label}</span>
                ${hasDefault ? `<span class="badge">${defaultValue}</span>` : ''}
                <button class="add-btn">＋</button>
            </div>
            <div class="note-area" id="note-area-${key}">
                <div class="empty-msg">⏳ 載入中...</div>
            </div>
            <div class="add-note-form">
                <input type="text" class="msg-input" placeholder="寫低分享... (可貼 Link)" />
                <button class="submit-btn" data-day-id="${dayId}" data-category="${category}">新增</button>
                <button class="cancel-btn">取消</button>
            </div>
        </div>
    `;
}

function renderAttractionItem(dayId, category, label, defaultValue, index) {
    const key = getNoteKey(dayId, category, index);
    const hasDefault = defaultValue && defaultValue.length > 0;
    const idxAttr = `data-index="${index}"`;
    return `
        <div class="day-item-attraction">
            <div class="item-label">
                <span>${label}</span>
                ${hasDefault ? `<span class="badge">${defaultValue}</span>` : ''}
                <button class="add-btn">＋</button>
            </div>
            <div class="note-area" id="note-area-${key}">
                <div class="empty-msg">⏳ 載入中...</div>
            </div>
            <div class="add-note-form">
                <input type="text" class="msg-input" placeholder="寫低分享... (可貼 Link)" />
                <button class="submit-btn" data-day-id="${dayId}" data-category="${category}" ${idxAttr}>新增</button>
                <button class="cancel-btn">取消</button>
            </div>
        </div>
    `;
}

// ================================================================
//  12. Firebase 監聽（每日行程備註）
// ================================================================
function setupAllListeners() {
    if (!db) {
        document.querySelectorAll('.note-area').forEach(el => {
            el.innerHTML = `<div class="empty-msg" style="color:#C07A5A;">❌ Firebase 未連線</div>`;
        });
        return;
    }
    DAYS_DATA.forEach(day => {
        const cats = ['breakfast', 'lunch', 'dinner', 'other'];
        day.attractions.forEach((_, idx) => {
            const key = getNoteKey(day.id, 'attraction', idx);
            listenNote(key);
        });
        day.shops.forEach((_, idx) => {
            const key = getNoteKey(day.id, 'shop', idx);
            listenNote(key);
        });
        cats.forEach(cat => {
            const key = getNoteKey(day.id, cat, undefined);
            listenNote(key);
        });
    });
}

function listenNote(key) {
    if (!db) return;
    db.ref(key).on('value', (snap) => {
        const notes = snap.val() || [];
        const area = document.getElementById(`note-area-${key}`);
        if (!area) return;
        if (notes.length === 0) {
            area.innerHTML = `<div class="empty-msg">💬 未有備註 · 你嚟加第一條！</div>`;
            return;
        }
        let html = '';
        notes.forEach((note, idx) => {
            const text = note.text || '';
            const linkedText = text.replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" target="_blank" rel="noopener">$1</a>'
            );
            html += `
                <div class="note-item">
                    <span class="note-text">${linkedText}</span>
                    <button class="del-btn" data-key="${key}" data-idx="${idx}">✕</button>
                </div>
            `;
        });
        area.innerHTML = html;
        area.querySelectorAll('.del-btn').forEach(btn => {
            btn.onclick = function() {
                const k = this.dataset.key;
                const idx = parseInt(this.dataset.idx);
                if (!db) return;
                db.ref(k).once('value').then(snap => {
                    const arr = snap.val() || [];
                    arr.splice(idx, 1);
                    db.ref(k).set(arr);
                }).catch(e => alert('刪除失敗: ' + e.message));
            };
        });
    }, (error) => {
        const area = document.getElementById(`note-area-${key}`);
        if (area) {
            area.innerHTML = `<div class="empty-msg" style="color:#C07A5A;">⚠️ 讀取失敗</div>`;
        }
    });
}

// ================================================================
//  13. 海拔線
// ================================================================
let toastTimer = null;

function showToast(dayId) {
    const day = DAYS_DATA.find(d => d.id === dayId);
    if (!day) return;
    const container = document.getElementById('toastContainer');
    if (!container) return;
    document.getElementById('toastIcon').textContent = '🏔️';
    document.getElementById('toastTitle').textContent = `Day ${day.id} · ${day.place}`;
    document.getElementById('toastSub').textContent = `${day.altitude}m`;

    let tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    if (day.warnings && day.warnings.length) {
        const raw = day.warnings[0];
        if (raw.includes('嚴禁洗頭') || raw.includes('唔沖涼')) {
            tip = '今晚唔好沖涼住啦～';
        } else if (raw.includes('車程')) {
            tip = '🚗 車程較長，記得準備小食～';
        } else if (raw.includes('海拔')) {
            tip = '⛰️ 留意高山反應，慢慢行！';
        } else {
            tip = '💡 ' + raw.replace(/⚠️/g, '').trim();
        }
    }
    document.getElementById('toastTip').textContent = tip;

    container.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        container.classList.remove('show');
    }, 2800);
}

function drawAltitude(activeDayId) {
    const canvas = document.getElementById('altitudeCanvas');
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width - 12;
    const h = 80;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const data = DAYS_DATA;
    const n = data.length;
    const padL = 8,
        padR = 8,
        padT = 14,
        padB = 16;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const minAlt = 1800,
        maxAlt = 3500,
        range = maxAlt - minAlt;

    const points = data.map((d, i) => {
        const x = padL + (i / (n - 1)) * chartW;
        const y = padT + chartH - ((d.altitude - minAlt) / range) * chartH;
        const wave = Math.sin(i / n * Math.PI * 2) * 1.2;
        return { x, y: y + wave, alt: d.altitude, id: d.id, place: d.place };
    });

    ctx.clearRect(0, 0, w, h);

    const bgGrad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    bgGrad.addColorStop(0, 'rgba(200, 215, 230, 0.05)');
    bgGrad.addColorStop(0.5, 'rgba(220, 200, 180, 0.05)');
    bgGrad.addColorStop(1, 'rgba(210, 180, 170, 0.05)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(padL, padT, chartW, chartH);

    ctx.beginPath();
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else {
            const cpX = (points[i - 1].x + p.x) / 2;
            const cpY = (points[i - 1].y + p.y) / 2 + (i % 2 === 0 ? 1 : -1) * 0.8;
            ctx.quadraticCurveTo(cpX, cpY, p.x, p.y);
        }
    });
    ctx.lineTo(points[points.length - 1].x, padT + chartH);
    ctx.lineTo(points[0].x, padT + chartH);
    ctx.closePath();

    const fillGrad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    fillGrad.addColorStop(0, 'rgba(224, 122, 95, 0.30)');
    fillGrad.addColorStop(0.4, 'rgba(224, 122, 95, 0.12)');
    fillGrad.addColorStop(1, 'rgba(224, 122, 95, 0.0)');
    ctx.fillStyle = fillGrad;
    ctx.fill();

    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, '#1A3A5C');
    grad.addColorStop(0.3, '#2D6A4F');
    grad.addColorStop(0.6, '#B88A3A');
    grad.addColorStop(1, '#D97A4A');

    ctx.beginPath();
    points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else {
            const cpX = (points[i - 1].x + p.x) / 2;
            const cpY = (points[i - 1].y + p.y) / 2 + (i % 2 === 0 ? 1 : -1) * 0.8;
            ctx.quadraticCurveTo(cpX, cpY, p.x, p.y);
        }
    });
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    const y3000 = padT + chartH - ((3000 - minAlt) / range) * chartH;
    ctx.beginPath();
    ctx.moveTo(padL, y3000);
    ctx.lineTo(w - padR, y3000);
    ctx.strokeStyle = 'rgba(224, 122, 95, 0.30)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(224, 122, 95, 0.40)';
    ctx.font = '8px sans-serif';
    ctx.fillText('3000m', 2, y3000 - 3);

    points.forEach((p) => {
        const isActive = p.id === activeDayId;
        const isHigh = p.alt >= 3000;

        let color;
        if (isHigh) {
            color = '#FF5722';
        } else {
            const altRatio = (p.alt - minAlt) / range;
            const r = Math.round(50 + altRatio * 180);
            const g = Math.round(180 - altRatio * 140);
            const b = Math.round(80 - altRatio * 60);
            color = `rgb(${r}, ${g}, ${b})`;
        }

        const size = isActive ? 9 : 6.5;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fillStyle = color;
        ctx.shadowColor = isActive ? 'rgba(224, 122, 95, 0.25)' : 'rgba(0,0,0,0.04)';
        ctx.shadowBlur = isActive ? 10 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();

        if (isActive) {
            const time = Date.now() / 800;
            const pulse = 0.7 + 0.3 * Math.sin(time);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 12 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(224, 122, 95, ${0.12 * pulse})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.fillStyle = isActive ? '#E07A5F' : 'rgba(80, 70, 60, 0.35)';
        ctx.font = isActive ? 'bold 7px sans-serif' : '6px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.alt + 'm', p.x, p.y - 10);
    });

    canvas._points = points;
    canvas._activeId = activeDayId;
}

document.addEventListener('click', function(e) {
    const canvas = document.getElementById('altitudeCanvas');
    if (!canvas) return;
    if (e.target === canvas || canvas.contains(e.target)) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const points = canvas._points || [];
        let found = null;
        let minDist = 30;
        points.forEach(p => {
            const dist = Math.abs(x - p.x);
            if (dist < minDist) {
                minDist = dist;
                found = p;
            }
        });
        if (found) {
            currentDayId = found.id;
            renderDayTabs();
            renderDayDetail(currentDayId);
            drawAltitude(currentDayId);
            showToast(found.id);
            if (window.location.pathname.includes('daily.html')) {
                // 已經喺 daily 頁
            } else {
                window.location.href = 'daily.html';
            }
        }
    }
});

let pulseAnimId = null;

function startPulseAnimation() {
    function pulseLoop() {
        const canvas = document.getElementById('altitudeCanvas');
        if (canvas && canvas._activeId !== undefined) {
            drawAltitude(canvas._activeId);
        }
        pulseAnimId = requestAnimationFrame(pulseLoop);
    }
    if (pulseAnimId) cancelAnimationFrame(pulseAnimId);
    pulseLoop();
}

// ================================================================
//  14. Hero Header 隨機背景圖
// ================================================================
(function setRandomHero() {
    const images = [
        'https://raw.githubusercontent.com/pheebssvc-netizen/Yunnan-trip-2026/main/images/Lijenglake.jpg',
        'https://raw.githubusercontent.com/pheebssvc-netizen/Yunnan-trip-2026/main/images/Lijiang.jpg',
        'https://raw.githubusercontent.com/pheebssvc-netizen/Yunnan-trip-2026/main/images/Mountain.png',
        'https://raw.githubusercontent.com/pheebssvc-netizen/Yunnan-trip-2026/main/images/Pudacuo.jpg',
        'https://raw.githubusercontent.com/pheebssvc-netizen/Yunnan-trip-2026/main/images/suzheng.jpeg'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const header = document.getElementById('heroHeader');
    if (header) {
        header.style.backgroundImage = `url('${images[randomIndex]}')`;
    }
})();

// ================================================================
//  15. Resize
// ================================================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const canvas = document.getElementById('altitudeCanvas');
        if (canvas && canvas._activeId !== undefined) {
            drawAltitude(canvas._activeId);
        }
    }, 200);
});

// ================================================================
//  16. 頁面初始化（DOMContentLoaded）
// ================================================================
document.addEventListener('DOMContentLoaded', function() {
    // 倒數計時
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 海拔線
    setTimeout(function() {
        drawAltitude(1);
        startPulseAnimation();
    }, 300);

    // 每日行程
    if (document.getElementById('dayTabs') || document.getElementById('dayDetailContainer')) {
        renderDayTabs();
        renderDayDetail(currentDayId);
        setupAllListeners();
    }

    // 重要資訊
    if (document.getElementById('statusList')) {
        renderStatusList();
    }
    if (document.getElementById('trainInputArea')) {
        initTrainInputs();
    }
    if (document.getElementById('groupNoteContainer')) {
        renderGroupNotes();
    }

    // 行程總覽
    if (document.getElementById('routeTableBody')) {
        renderRouteTable();
    }
    if (document.getElementById('weatherContainer')) {
        fetchWeather();
    }

    // ================================================================
    //  返回頂部功能
    // ================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================================================
    //  緊急求助 Modal（卡片版）
    // ================================================================
    const emergencyBtnCard = document.getElementById('emergencyBtnCard');
    const emergencyOverlay = document.getElementById('emergencyOverlay');
    const emergencyClose = document.getElementById('emergencyClose');

    if (emergencyBtnCard && emergencyOverlay) {
        emergencyBtnCard.addEventListener('click', function() {
            emergencyOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        emergencyClose.addEventListener('click', function() {
            emergencyOverlay.classList.remove('show');
            document.body.style.overflow = '';
        });
        emergencyOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                emergencyOverlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    console.log('🌄 雲南滇西12日行程網頁已啟動！');
    if (!db) console.warn('⚠️ Firebase 未連線');
    else console.log('✅ Firebase 已連線');
});
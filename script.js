let currentLang = 'ru';
let i18n = {};

// Загрузка переводов конкретного языка
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        const data = await response.json();
        i18n[lang] = data[lang];
        return true;
    } catch (error) {
        console.error(`Ошибка загрузки языка ${lang}:`, error);
        return false;
    }
}

// Загрузка переводов
async function loadTranslations() {
    try {
        await loadLanguage('ru');
        initApp();
    } catch (error) {
        console.error('Ошибка загрузки переводов:', error);
    }
}

const rawBuildings = [
    { id: 1, ru: "Пекарня", en: "Bakery", uk: "Пекарня", lvl: 2, price: 20, time: "10с", exp: 3, extra: "3х3, 2 слота, ускор: 1💎", icon: "🥖" },
    { id: 2, ru: "Дробилка (Кормозавод)", en: "Crusher", uk: "Дробарка", lvl: "3 / 12", price: "5 / 3200", time: "40с", exp: 4, extra: "3х3, 3 слота, ускор: 1💎", icon: "🚜" },
    { id: 3, ru: "Молокозавод", en: "Dairy plant", uk: "Молокозавод", lvl: 6, price: 50, time: "2ч", exp: 8, extra: "4х4, 2 слота, ускор: 16💎", icon: "🧀" },
    { id: 4, ru: "Сахарный завод", en: "Sugar factory", uk: "Цукровий завод", lvl: "7 / 76", price: "350 / 200k", time: "6ч", exp: 0, extra: "2х2, 2 слота", icon: "🍬" },
    { id: 5, ru: "Попкорница", en: "Popcorn maker", uk: "Попкорниця", lvl: 8, price: 650, time: "8ч", exp: 14, extra: "3х3, 2 слота, ускор: 29💎", icon: "🍿" },
    { id: 6, ru: "Гриль", en: "Grill", uk: "Гриль", lvl: 9, price: 730, time: "8ч", exp: 14, extra: "2х2, 2 слота, ускор: 29💎", icon: "🍳" },
    { id: 7, ru: "Печь для пирогов", en: "Pie Oven", uk: "Піч для пирогів", lvl: 14, price: 2200, time: "12ч", exp: 17, extra: "3х3, 2 слота, ускор: 35💎", icon: "🥧" },
    { id: 8, ru: "Ткацкий станок", en: "Loom", uk: "Ткацький станок", lvl: 17, price: 3200, time: "1д", exp: 24, extra: "2х2, 2 слота, ускор: 47💎", icon: "🧶" },
    { id: 9, ru: "Швейная машинка", en: "Sewing Machine", uk: "Швейна машинка", lvl: 19, price: 4500, time: "20ч", exp: 24, extra: "2х2, 2 слота, ускор: 44💎", icon: "👗" },
    { id: 10, ru: "Печь для тортов", en: "Cake Oven", uk: "Піч для тортів", lvl: 21, price: 12100, time: "1д", exp: 24, extra: "3х3, 2 слота, ускор: 47💎", icon: "🎂" },
    { id: 11, ru: "Плавильня", en: "Smelter", uk: "Плавильня", lvl: 24, price: "12500 - 50500", time: "18ч", exp: 21, extra: "1я:12.5k, 2я:22k, 3я:31.5k, 4я:41k, 5я:50.5k,\n3х3, 2 слота, ускор: 1💎", icon: "🔥" },
    { id: 12, ru: "Соковыжималка", en: "Juicer", uk: "Соковитискач", lvl: 26, price: 31000, time: "1д 8ч", exp: 27, extra: "2х2, 2 слота, ускор: 54💎", icon: "🍹" },
    { id: 13, ru: "Станок для приманок", en: "Lure machine", uk: "Верстат для приманок", lvl: 27, price: 0, time: "Построено", exp: 0, extra: "2х2, 2 слота,", icon: "🎣" },
    { id: 14, ru: "Мороженица", en: "Freezer", uk: "Морозниця", lvl: 29, price: 38000, time: "1д 8ч", exp: 27, extra: "Ванильное, вишневое", icon: "🍦" },
    { id: 15, ru: "Вязальщик сетей", en: "Net knitter", uk: "В'язальник сіток", lvl: 30, price: 28000, time: "2д", exp: 32, extra: "Для озера", icon: "🕸️" },
    { id: 16, ru: "Вареньеварка", en: "Jam Maker", uk: "Варенняварка", lvl: 35, price: 59000, time: "1д 12ч", exp: 28, extra: "Долгое хранение", icon: "🍓" },
    { id: 17, ru: "Ювелир", en: "Jeweler", uk: "Ювелір", lvl: 38, price: 68000, time: "1д 12ч", exp: 28, extra: "Кольца, ожерелья", icon: "💍" },
    { id: 18, ru: "Медогонка", en: "Honey extractor", uk: "Медогонка", lvl: 39, price: 35000, time: "1д", exp: 24, extra: "Мед и воск", icon: "🍯" },
    { id: 19, ru: "Кофейный киоск", en: "Coffee Kiosk", uk: "Кавовий кіоск", lvl: 42, price: 75000, time: "1д 11ч", exp: 35, extra: "Латте, Мокко", icon: "☕" },
    { id: 20, ru: "Суповая кухня", en: "Soup kitchen", uk: "Супова кухня", lvl: 46, price: 115000, time: "1д 12ч", exp: 28, extra: "Горячие супы", icon: "🍲" },
    { id: 21, ru: "Свечник", en: "Candlestik maker", uk: "Свічник", lvl: 48, price: 118000, time: "1д 14ч", exp: 24, extra: "Арома свечи", icon: "🕯️" },
    { id: 22, ru: "Цветочный магазин", en: "Flower shop", uk: "Квітковий магазин", lvl: 49, price: 120000, time: "1д 16ч", exp: 30, extra: "Букеты", icon: "💐" },
    { id: 23, ru: "Конфетный автомат", en: "Candy machine", uk: "Цукерковий автомат", lvl: 51, price: 120000, time: "1д", exp: 27, extra: "Сладости", icon: "🍭" },
    { id: 24, ru: "Соусоварня", en: "Sauce factory", uk: "Соусоварня", lvl: 54, price: 135000, time: "1д 16ч", exp: 30, extra: "Майонез, соус", icon: "🍶" },
    { id: 25, ru: "Суши-бар", en: "Sushi bar", uk: "Суші-бар", lvl: 56, price: 150000, time: "1д 20ч", exp: 38, extra: "Нигири, роллы", icon: "🍣" },
    { id: 26, ru: "Салатный бар", en: "Salad bar", uk: "Салатний бар", lvl: 58, price: 165000, time: "2д", exp: 32, extra: "Овощные салаты", icon: "🥗" },
    { id: 27, ru: "Бутербродная", en: "Sandwich shop", uk: "Бутербродна", lvl: 61, price: 180000, time: "2д 4ч", exp: 34, extra: "Тосты, панини", icon: "🥪" },
    { id: 28, ru: "Смузи-машина", en: "Smoothie machine", uk: "Смузі-машина", lvl: 64, price: 220000, time: "3д", exp: 39, extra: "Ягодные миксы", icon: "🥤" },
    { id: 29, ru: "Машинка для лапши", en: "Noodle machine", uk: "Машинка для локшини", lvl: 67, price: 400000, time: "3д 7ч", exp: 43, extra: "Лазанья, гноччи", icon: "🍝" },
    { id: 30, ru: "Лаборатория масел", en: "Oil laboratory", uk: "Лабораторія олій", lvl: 68, price: 85000, time: "3д 8ч", exp: 44, extra: "Фруктовые заготовки", icon: "🥫" },
    { id: 31, ru: "Вок-кухня", en: "Wok cuisine", uk: "Вок-кухня", lvl: 69, price: 350000, time: "3д 8ч", exp: 41, extra: "Стир-фрай", icon: "🍱" },
    { id: 32, ru: "Шляпник", en: "The hatter", uk: "Капелюшник", lvl: 70, price: 260000, time: "3д 4ч", exp: 40, extra: "Цилиндры, панамы", icon: "🎩" },
    { id: 33, ru: "Макаронная кухня", en: "Pasta cuisine", uk: "Макаронна кухня", lvl: 72, price: 550000, time: "3д 12ч", exp: 42, extra: "Фузилли, равиоли", icon: "🥟" },
    { id: 34, ru: "Киоск хот-догов", en: "Hot dog stand", uk: "Кіоск хот-догів", lvl: 75, price: 650000, time: "3д 16ч", exp: 41, extra: "Разные сосиски", icon: "🌭" },
    { id: 35, ru: "Пончиковая", en: "Donut shop", uk: "Пончикова", lvl: 76, price: 680000, time: "3д 18ч", exp: 42, extra: "Глазированные пончики", icon: "🍩" },
    { id: 36, ru: "Тако-кухня", en: "Taco Kitchen", uk: "Тако-кухня", lvl: 77, price: 700000, time: "3д 18ч", exp: 43, extra: "Острая еда", icon: "🌮" },
    { id: 37, ru: "Омлетница", en: "Omelete maker", uk: "Омлетниця", lvl: 77, price: 600000, time: "3д 8ч", exp: 41, extra: "Завтраки", icon: "🍳" },
    { id: 38, ru: "Чайная", en: "Tea room", uk: "Чайна", lvl: 80, price: 750000, time: "3д 23ч", exp: 44, extra: "Зеленый, черный чай", icon: "🍵" },
    { id: 39, ru: "Фондюшница", en: "Fondue pot", uk: "Фондюшниця", lvl: 81, price: 800000, time: "4д", exp: 44, extra: "Сырное, шоколадное", icon: "🫕" },
    { id: 40, ru: "Мыловарня", en: "Soap factory", uk: "Миловарня", lvl: 84, price: 850000, time: "4д", exp: 44, extra: "Мыло, лосьоны", icon: "🧼" },
    { id: 41, ru: "Фритюрница", en: "Deep Fryer", uk: "Фритюрниця", lvl: 87, price: 900000, time: "4д", exp: 44, extra: "Картошка фри", icon: "🍟" },
    { id: 42, ru: "Консервный завод", en: "Cannery", uk: "Консервний завод", lvl: 91, price: 950000, time: "4д", exp: 44, extra: "Тушенка", icon: "🥩" },
    { id: 43, ru: "Гончарная печь", en: "Pottery kiln", uk: "Гончарна піч", lvl: 94, price: 1000000, time: "4д", exp: 46, extra: "Вазы, кружки", icon: "🏺" },
    { id: 44, ru: "Магазин ириса", en: "Iris Shop", uk: "Магазин ірису", lvl: 99, price: 1050000, time: "4д", exp: 44, extra: "Ириски", icon: "🍫" },
    { id: 45, ru: "Йогуртница", en: "Yogurt maker", uk: "Йогуртниця", lvl: 103, price: 1100000, time: "4д", exp: 44, extra: "Фруктовый йогурт", icon: "🍨" },
    { id: 46, ru: "Рагушница", en: "Ragushnitsa", uk: "Рагушниця", lvl: 106, price: 1150000, time: "4д", exp: 44, extra: "Мясное рагу", icon: "🥘" },
    { id: 47, ru: "Кондитерская", en: "Confectionery", uk: "Кондитерська", lvl: 109, price: 1200000, time: "4д", exp: 44, extra: "Капкейки", icon: "🧁" },
    { id: 48, ru: "Парфюмерная лавка", en: "Perfume shop", uk: "Парфумерна крамниця", lvl: 110, price: 1000000, time: "4д", exp: 44, extra: "Духи", icon: "🧪" },
    { id: 49, ru: "Вафельница", en: "Waffle iron", uk: "Вафельниця", lvl: 114, price: 1250000, time: "4д", exp: 44, extra: "Бельгийские вафли", icon: "🧇" },
    { id: 50, ru: "Кашеварня", en: "Porridge factory", uk: "Кашеварня", lvl: 119, price: 1300000, time: "4д", exp: 44, extra: "Здоровый завтрак", icon: "🥣" },
    { id: 51, ru: "Милкшейк-бар", en: "Milkshake bar", uk: "Мілкшейк-бар", lvl: 124, price: 1350000, time: "4д", exp: 44, extra: "Коктейли", icon: "🥤" }
];

const products = {
    1: [
        { name: { ru: "Хлеб", en: "Bread", uk: "Хліб" }, lvl: 2, timeByStars: { 3: "4 мин" }, buildTime: "5м", price: 21, diamonds: 1, exp: 3, ing: ["3 пшеницы"] },
        { name: { ru: "Кукурузный хлеб", en: "Corn Bread", uk: "Кукурузний хліб" }, lvl: 7, buildTime: "3д", price: 21, diamonds: 1, exp: 3, ing: ["3 кукурузы"] },
        { name: { ru: "Пицца", en: "Pizza", uk: "Піца" }, lvl: 33, buildTime: "5д", price: 190, diamonds: 3, exp: 23, ing: ["2 пшеницы", "1 помидор", "1 сыр"] },
    ],
    2: [
        { name: { ru: "Курячий корм", en: "Chicken Feed", uk: "Курячий корм" }, lvl: 3, time: "2ч", buildTime: "1д", price: 8, diamonds: 0, exp: 2, ing: ["2 пшеницы"] },
        { name: { ru: "Коровий корм", en: "Cow Feed", uk: "Коровий корм" }, lvl: 6, time: "4ч", buildTime: "2д", price: 16, diamonds: 0, exp: 4, ing: ["3 пшеницы", "1 кукурузы"] },
        { name: { ru: "Овечий корм", en: "Sheep Feed", uk: "Овечий корм" }, lvl: 10, time: "6ч", buildTime: "3д", price: 24, diamonds: 1, exp: 6, ing: ["2 кукурузы", "1 пшеницы"] },
        { name: { ru: "Свиной корм", en: "Pig Feed", uk: "Свиячий корм" }, lvl: 12, time: "8ч", buildTime: "3д", price: 32, diamonds: 1, exp: 8, ing: ["3 кукурузы", "2 пшеницы"] }
    ]
};

const resources = {
    ru: {
        "пшеницы": { lvl: 1, price: 3, time: "2 мин", exp: 1, icon: "🌾", name: "Пшеница" },
        "помидор": { lvl: 30, price: 13, time: "6 ч", exp: 12, icon: "🍅", name: "Помидор" },
        "кукурудза": { lvl: 1, price: 3, time: "2 мин", exp: 1, icon: "🌾", name: "Кукурудза" },
        "сыр": { lvl: 12, price: 122, time: "1 ч", exp: 15, icon: "🧀", name: "Сыр" }
    },
    en: {
        "wheat": { lvl: 1, price: 3, time: "2 min", exp: 1, icon: "🌾", name: "Wheat" }
    },
    uk: {
        "пшениці": { lvl: 1, price: 3, time: "2 хв", exp: 1, icon: "🌾", name: "Пшениця" }
    }
};

function initApp() {
    changeLang('ru');
}

function changeLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');

    // Загузаем язык если его еще нет
    if (!i18n[lang]) {
        loadLanguage(lang).then(() => {
            document.getElementById('ui-title').innerText = i18n[lang].title;
            document.getElementById('ui-subtitle').innerText = i18n[lang].subtitle;
            document.getElementById('search-input').placeholder = i18n[lang].search;
            handleSearch();
        });
    } else {
        document.getElementById('ui-title').innerText = i18n[lang].title;
        document.getElementById('ui-subtitle').innerText = i18n[lang].subtitle;
        document.getElementById('search-input').placeholder = i18n[lang].search;
        handleSearch();
    }
}

function renderBuildings(list) {
    const grid = document.getElementById('buildings-grid');
    grid.innerHTML = '';

    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-amber-800 font-bold">${i18n[currentLang].empty}</div>`;
        return;
    }

    list.forEach((b) => {
        const card = document.createElement('div');
        card.className = "farm-card bg-white rounded-3xl p-5 flex flex-col items-center text-center shadow-sm";
        card.onclick = () => openBuilding(b.id);
        card.innerHTML = `
            <div class="text-5xl mb-3">${b.icon}</div>
            <h2 class="text-lg font-black mb-1 line-clamp-1">${b[currentLang]}</h2>
            <div class="flex flex-wrap justify-center gap-1 mt-1">
                <span class="stat-badge badge-lvl">${i18n[currentLang].lvl} ${b.lvl}</span>
                <span class="stat-badge badge-coin">${b.price} 💰</span>
                <span class="stat-badge badge-extra">✨ ${b.exp}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function handleSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = rawBuildings.filter(b =>
        b.ru.toLowerCase().includes(query) ||
        b.en.toLowerCase().includes(query) ||
        b.uk.toLowerCase().includes(query)
    );
    renderBuildings(filtered);
}

function openBuilding(id) {
    const b = rawBuildings.find(x => x.id === id);
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    const prodList = products[id] || [];

    modalBody.innerHTML = `
        <div class="flex items-center gap-4 mb-4 border-b-2 border-amber-100 pb-4">
            <div class="text-5xl">${b.icon}</div>
            <div>
                <h2 class="text-2xl font-black text-amber-900">${b[currentLang]}</h2>
                <div class="flex flex-wrap gap-2 mt-1">
                    <span class="stat-badge badge-time">⏱ ${b.time}</span>
                    <span class="stat-badge badge-extra">ℹ️ ${b.extra}</span>
                </div>
            </div>
        </div>
        <h3 class="font-bold text-amber-800 mb-3">${i18n[currentLang].products}</h3>
        <div class="space-y-3">
            ${prodList.length > 0 ? prodList.map(item => `
                <div class="item-row pb-3">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-between">
                            <span class="font-bold text-amber-900">${item.name[currentLang]}</span>
                            <span class="stat-badge badge-coin">${item.price} 💰</span>
                        </div>
                        <div class="flex flex-wrap gap-1 text-[10px]">
                            <span class="stat-badge badge-lvl">Lvl ${item.lvl}</span>
                            <span class="stat-badge badge-extra">💎 ${item.diamonds}</span>
                            <span class="stat-badge badge-lvl">✨ ${item.exp}</span>
                            ${item.time ? `<span class="stat-badge badge-time">⏱ ${item.time}</span>` : ''}
                            
                            ${item.timeByStars ? Object.entries(item.timeByStars).map(([k, v]) => `<span class="stat-badge badge-star">${k}★ ${v}</span>`).join('') : ''}
                            ${item.buildTime ? `<span class="stat-badge badge-time">🏗 ${item.buildTime}</span>` : ''}
                        </div>
                        <div class="flex flex-wrap gap-1 mt-1">
                            ${item.ing.map(ing => `<span class="ingredient" onclick="showIngredientInfo('${ing}')">${ing}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('') : `<p class="text-sm text-amber-500 italic">... (Продукция скоро будет добавлена)</p>`}
        </div>
    `;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function showIngredientInfo(ingString) {
    const subModal = document.getElementById('sub-modal');
    const subBody = document.getElementById('sub-modal-body');

    const parts = ingString.toLowerCase().trim().split(' ');
    let key = parts.length > 1 ? parts.slice(1).join(' ') : parts[0];

    let res = resources[currentLang][key] || resources['ru'][key];

    if (res) {
        subBody.innerHTML = `
            <div class="text-5xl mb-2">${res.icon}</div>
            <h4 class="text-xl font-black text-amber-900 mb-3">${res.name}</h4>
            <div class="space-y-1 text-sm text-left">
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].lvl}:</span> <b>${res.lvl}</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].price}:</span> <b>${res.price} 💰</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].time}:</span> <b>${res.time}</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].exp}:</span> <b>${res.exp} ✨</b></div>
            </div>
            <button onclick="closeSubModal()" class="mt-4 w-full bg-amber-600 text-white py-3 rounded-2xl font-bold">${i18n[currentLang].close}</button>
        `;
    } else {
        subBody.innerHTML = `<div class="p-4"><p class="font-bold">${ingString}</p><p class="text-sm text-amber-600">Детали скоро...</p></div><button onclick="closeSubModal()" class="mt-2 w-full bg-amber-600 text-white py-2 rounded-xl">OK</button>`;
    }

    subModal.style.display = 'flex';
    setTimeout(() => subModal.classList.add('active'), 10);
}

function closeModal(e) {
    if (e && e.target !== document.getElementById('modal')) return;
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }, 300);
}

function closeSubModal() {
    const subModal = document.getElementById('sub-modal');
    subModal.classList.remove('active');
    setTimeout(() => { subModal.style.display = 'none'; }, 300);
}

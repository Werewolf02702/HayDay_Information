let currentLang = 'uk';
let i18n = {};
// список доступных языков (можно дополнять)
const availableLangs = ['ru','en','uk'];

// создает options в селекте на основе текущих переводов
function renderLangSelector() {
    const sel = document.getElementById('lang-select');
    if (!sel) return;
    sel.innerHTML = availableLangs.map(code => {
        const label = (i18n[currentLang] && i18n[currentLang].langs && i18n[currentLang].langs[code]) || code.toUpperCase();
        return `<option value="${code}">${label}</option>`;
    }).join('');
    sel.value = currentLang;
}


// Форматирование чисел с разделителями
function formatPrice(price) {
    if (typeof price === 'number') {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    if (typeof price === 'string') {
        // Для строк типа "5 / 3200" или "12500 - 50500"
        return price.replace(/\d+/g, (match) => {
            return match.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        });
    }
    return price;
}

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
        await loadLanguage('uk');
        initApp();
    } catch (error) {
        console.error('Ошибка загрузки переводов:', error);
    }
}

const rawBuildings = [
    { id: 1, ru: "Пекарня", en: "Bakery", uk: "Пекарня", lvl: 2, price: 20, time: "10с", exp: 3, extra: "3х3, 2 слота, ускор: 1💎", icon: "🥖" },
    { id: 2, ru: "Дробилка (Кормозавод)", en: "Crusher", uk: "Дробарка", lvl: "3 / 12", price: "5 / 3200", time: "40с", exp: 4, extra: "3х3, 3 слота, ускор: 1💎", icon: "🚜" },
    { id: 3, ru: "Молокозавод", en: "Dairy plant", uk: "Молокозавод", lvl: 6, price: 50, time: "2ч", exp: 8, extra: "4х4, 2 слота, ускор: 16💎", icon: "🧀" },
    { id: 4, ru: "Сахарный завод", en: "Sugar factory", uk: "Цукровий завод", lvl: "7 / 76", price: "350 / 200000", time: "6ч", exp: 0, extra: "2х2, 2 слота", icon: "🍬" },
    { id: 5, ru: "Попкорница", en: "Popcorn maker", uk: "Попкорниця", lvl: 8, price: 650, time: "8ч", exp: 14, extra: "3х3, 2 слота, ускор: 29💎", icon: "🍿" },
    { id: 6, ru: "Гриль", en: "Grill", uk: "Гриль", lvl: 9, price: 730, time: "8ч", exp: 14, extra: "2х2 ,2 слота ,ускор :29💎", icon: "🍳" },
    { id: 7, ru: "Печь для пирогов", en: "Pie Oven", uk: "Піч для пирогів", lvl: 14, price: 2200, time: "12ч", exp: 17, extra: "3х3 ,2 слота ,ускор :35💎", icon: "🥧" },
    { id: 8, ru: "Ткацкий станок", en: "Loom", uk: "Ткацький станок", lvl: 17, price: 3200, time: "1д", exp: 24, extra: "2х2 ,2 слота ускор :47💎", icon: "🧶" },
    { id: 9, ru: "Швейная машинка", en: "Sewing Machine", uk: "Швейна машинка", lvl: 19, price: 4500, time: "20ч", exp: 24, extra: "Для озера", icon: "👗" },
    { id: 10, ru: "Печь для тортов", en: "Cake Oven", uk: "Піч для тортів", lvl: 21, price: 12100, time: "1д", exp: 24, extra: "3х3, 2 слота, ускор: 47💎", icon: "🎂" },
    { id: 11, ru: "Плавильня", en: "Smelter", uk: "Плавильня", lvl: 24, price: "12500 - 50500", time: "18ч", exp: 21, extra: "1я:12.5k, 2я:22k, 3я:31.5k, 4я:41k, 5я:50.5k,\n3х3, 2 слота, ускор: 42💎", icon: "🔥" },
    { id: 12, ru: "Соковыжималка", en: "Juicer", uk: "Соковитискач", lvl: 26, price: 31000, time: "1д 8ч", exp: 27, extra: "2х2, 2 слота, ускор: 54💎", icon: "🍹" },
    { id: 13, ru: "Станок для приманок", en: "Lure machine", uk: "Верстат для приманок", lvl: 27, price: 0, time: "Построено", exp: 0, extra: "2х2, 2 слота,", icon: "🎣" },
    { id: 14, ru: "Мороженица", en: "Freezer", uk: "Морозниця", lvl: 29, price: 38000, time: "1д 8ч", exp: 27, extra: "2х3, 2 слота, ускор: 54💎", icon: "🍦" },
    { id: 15, ru: "Вязальщик сетей", en: "Net knitter", uk: "В'язальник сіток", lvl: 30, price: 28000, time: "2д", exp: 32, extra: "2х2, 2 слота, ускор: 65💎", icon: "🕸️" },
    { id: 16, ru: "Вареньеварка", en: "Jam Maker", uk: "Варенняварка", lvl: 35, price: 59000, time: "1д 12ч", exp: 28, extra: "2х2, 2 слота, ускор: 57💎", icon: "🍓" },
    { id: 17, ru: "Ювелир", en: "Jeweler", uk: "Ювелір", lvl: 38, price: 68000, time: "1д 12ч", exp: 28, extra: "2х2, 2 слота, ускор: 57💎", icon: "💍" },
    { id: 18, ru: "Медогонка", en: "Honey extractor", uk: "Медогонка", lvl: 39, price: 35000, time: "1д", exp: 24, extra: "2х2, 2 слота, ускор: 47💎", icon: "🍯" },
    { id: 19, ru: "Кофейный киоск", en: "Coffee Kiosk", uk: "Кавовий кіоск", lvl: 42, price: 75000, time: "1д 11ч", exp: 35, extra: "2х2, 2 слота, ускор: 57💎", icon: "☕" },
    { id: 20, ru: "Суповая кухня", en: "Soup kitchen", uk: "Супова кухня", lvl: 46, price: 115000, time: "1д 12ч", exp: 28, extra: "2х2, 2 слота, ускор: 57💎", icon: "🍲" },
    { id: 21, ru: "Свечник", en: "Candlestik maker", uk: "Свічник", lvl: 48, price: 118000, time: "1д 14ч", exp: 24, extra: "2х2, 2 слота, ускор: 58💎", icon: "🕯️" },
    { id: 22, ru: "Цветочный магазин", en: "Flower shop", uk: "Квітковий магазин", lvl: 49, price: 120000, time: "1д 16ч", exp: 30, extra: "2х2, 2 слота, ускор: 60💎", icon: "💐" },
    { id: 23, ru: "Конфетный автомат", en: "Candy machine", uk: "Цукерковий автомат", lvl: 51, price: 120000, time: "1д", exp: 27, extra: "2х2, 2 слота, ускор: 71💎", icon: "🍭" },
    { id: 24, ru: "Соусоварня", en: "Sauce factory", uk: "Соусоварня", lvl: 54, price: 135000, time: "1д 16ч", exp: 30, extra: "3х3, 2 слота, ускор: 59💎", icon: "🍶" },
    { id: 25, ru: "Суши-бар", en: "Sushi bar", uk: "Суші-бар", lvl: 56, price: 150000, time: "1д 20ч", exp: 38, extra: "2х2, 2 слота, ускор: 61💎", icon: "🍣" },
    { id: 26, ru: "Салатный бар", en: "Salad bar", uk: "Салатний бар", lvl: 58, price: 165000, time: "2д", exp: 32, extra: "3х3, 2 слота, ускор: 65💎", icon: "🥗" },
    { id: 27, ru: "Бутербродная", en: "Sandwich shop", uk: "Бутербродна", lvl: 61, price: 180000, time: "2д 4ч", exp: 34, extra: "3х3, 2 слота, ускор: 67💎", icon: "🥪" },
    { id: 28, ru: "Смузи-машина", en: "Smoothie machine", uk: "Смузі-машина", lvl: 64, price: 220000, time: "3д", exp: 39, extra: "2х2, 2 слота, ускор: 80💎", icon: "🥤" },
    { id: 29, ru: "Машинка для лапши", en: "Noodle machine", uk: "Машинка для локшини", lvl: 67, price: 400000, time: "3д 7ч", exp: 43, extra: "2х2, 2 слота, ускор: 81💎", icon: "🍝" },
    { id: 30, ru: "Лаборатория масел", en: "Oil laboratory", uk: "Лабораторія олій", lvl: 68, price: 85000, time: "3д 8ч", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🥫" },
    { id: 31, ru: "Вок-кухня", en: "Wok cuisine", uk: "Вок-кухня", lvl: 69, price: 350000, time: "3д 8ч", exp: 41, extra: "2х2, 2 слота, ускор: 82💎", icon: "🍱" },
    { id: 32, ru: "Шляпник", en: "The hatter", uk: "Капелюшник", lvl: 70, price: 260000, time: "3д 4ч", exp: 40, extra: "2х2, 2 слота, ускор: 80💎", icon: "🎩" },
    { id: 33, ru: "Макаронная кухня", en: "Pasta cuisine", uk: "Макаронна кухня", lvl: 72, price: 550000, time: "3д 12ч", exp: 42, extra: "2х2, 2 слота, ускор: 86💎", icon: "🥟" },
    { id: 34, ru: "Киоск для хот-догов", en: "Hot dog stand", uk: "Кіоск хот-догів", lvl: 75, price: 650000, time: "3д 16ч", exp: 41, extra: "2х2, 2 слота, ускор: 85💎", icon: "🌭" },
    { id: 35, ru: "Пончиковая", en: "Donut shop", uk: "Пончикова", lvl: 76, price: 680000, time: "3д 18ч", exp: 42, extra: "2х2, 2 слота, ускор: 86💎", icon: "🍩" },
    { id: 36, ru: "Тако-кухня", en: "Taco Kitchen", uk: "Тако-кухня", lvl: 77, price: 700000, time: "3д 18ч", exp: 43, extra: "2х2, 2 слота, ускор: 86💎", icon: "🌮" },
    { id: 37, ru: "Омлетница", en: "Omelete maker", uk: "Омлетниця", lvl: 77, price: 600000, time: "3д 8ч", exp: 41, extra: "2х2, 2 слота, ускор: 82💎", icon: "🍳" },
    { id: 38, ru: "Чайная", en: "Tea room", uk: "Чайна", lvl: 80, price: 750000, time: "3д 23ч", exp: 44, extra: "2х2, 2 слота, ускор: 88💎", icon: "🍵" },
    { id: 39, ru: "Фондюшница", en: "Fondue pot", uk: "Фондюшниця", lvl: 81, price: 800000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🫕" },
    { id: 40, ru: "Мыловарня", en: "Soap factory", uk: "Миловарня", lvl: 84, price: 850000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 88💎", icon: "🧼" },
    { id: 41, ru: "Фритюрница", en: "Deep Fryer", uk: "Фритюрниця", lvl: 87, price: 900000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🍟" },
    { id: 42, ru: "Консервный завод", en: "Cannery", uk: "Консервний завод", lvl: 91, price: 950000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🥩" },
    { id: 43, ru: "Гончарная печь", en: "Pottery kiln", uk: "Гончарна піч", lvl: 94, price: 1000000, time: "4д", exp: 46, extra: "2х2, 2 слота, ускор: 89💎", icon: "🏺" },
    { id: 44, ru: "Магазин ириса", en: "Iris Shop", uk: "Магазин ірису", lvl: 99, price: 1050000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🍫" },
    { id: 45, ru: "Йогуртница", en: "Yogurt maker", uk: "Йогуртниця", lvl: 103, price: 1100000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🍨" },
    { id: 46, ru: "Рагушница", en: "Ragushnitsa", uk: "Рагушниця", lvl: 106, price: 1150000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🥘" },
    { id: 47, ru: "Кондитерская", en: "Confectionery", uk: "Кондитерська", lvl: 109, price: 1200000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🧁" },
    { id: 48, ru: "Парфюмерная лавка", en: "Perfume shop", uk: "Парфумерна крамниця", lvl: 110, price: 1000000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🧪" },
    { id: 49, ru: "Вафельница", en: "Waffle iron", uk: "Вафельниця", lvl: 114, price: 1250000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🧇" },
    { id: 50, ru: "Кашеварня", en: "Porridge factory", uk: "Кашеварня", lvl: 119, price: 1300000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🥣" },
    { id: 51, ru: "Милкшейк-бар", en: "Milkshake bar", uk: "Мілкшейк-бар", lvl: 124, price: 1350000, time: "4д", exp: 44, extra: "2х2, 2 слота, ускор: 89💎", icon: "🥤" }
];

const products = {
    1: [
        { name: { ru: "Хлеб", en: "Bread", uk: "Хліб" }, lvl: 2, buildTime: "5м", timeByStars: { 3: "4 мин" }, price: 21, diamonds: 1, exp: 3, ing: ["3 пшеницы"] },
        { name: { ru: "Кукурузный хлеб", en: "Cornbread", uk: "Кукурузний хліб" }, lvl: 7, buildTime: "30м", timeByStars: { 3: "25 мин" }, price: 72, diamonds: 3, exp: 8, ing: ["2 кукурузи", "2 яйця"] },
        { name: { ru: "Печенье", en: "Cookie", uk: "Печиво" }, lvl: 10, buildTime: "1ч", timeByStars: { 3: "51 мин" }, price: 29, diamonds: 4, exp: 13, ing: ["2 пшеницы", "2 коричневый сахар", "2 яйця"] },
        { name: { ru: "Кекс с малиной", en: "Berry Cookie", uk: "Печиво з малиною" }, lvl: 19, buildTime: "45м", timeByStars: { 3: "38 мин" }, price: 39, diamonds: 3, exp: 17, ing: ["2 малины", "2 пшеницы", "1 яйце"] },
        { name: { ru: "Пицца", en: "Pizza", uk: "Піца" }, lvl: 33, buildTime: "15м", timeByStars: { 3: "12 мин" }, price: 53, diamonds: 2, exp: 23, ing: ["2 пшеницы", "1 помидор", "1 сыр"] },
        { name: { ru: "Кекс с черникой", en: "Blueberry Cookie", uk: "Печиво з чорникою" }, lvl: 33, buildTime: "45м", timeByStars: { 3: "38 мин" }, price: 64, diamonds: 3, exp: 28, ing: ["1 пшеница", "2 яйця", "2 черники"] },
        { name: { ru: "Острая пицца", en: "Spicy Pizza", uk: "Гостра піца" }, lvl: 37, buildTime: "15м", timeByStars: { 3: "12 мин" }, price: 63, diamonds: 2, exp: 27, ing: ["2 пшеницы", "1 помидор", "1 сыр", "1 перец чили"] },
        { name: { ru: "Картофельный хлеб", en: "Potato Bread", uk: "Картопляний хліб" }, lvl: 39, buildTime: "45м", timeByStars: { 3: "38 мин" }, price: 79, diamonds: 3, exp: 34, ing: ["2 картошки", "1 белый сахар", "2 яйця", "1 масло"] },
        { name: { ru: "Пицца с морепродуктами", en: "Seafood Pizza", uk: "Піца з морепродуктами" }, lvl: 45, buildTime: "15м", timeByStars: { 3: "12 мин" }, price: 112, diamonds: 2, exp: 48, ing: ["2 пшеницы", "1 сыр", "1 рыба", "1 раковая шейка"] },
        { name: { ru: "Пряник", en: "Gingerbread", uk: "Пряник" }, lvl: 86, buildTime: "30м", timeByStars: { 3: "25 мин" }, price: 76, diamonds: 3, exp: 33, ing: ["5 пшеницы", "1 сироп", "1 масло", "2 имбиря"] },
        { name: { ru: "Банановый хлеб", en: "Banana Bread", uk: "Банановий хліб" }, lvl: 91, buildTime: "30м", timeByStars: { 3: "25 мин" }, price: 424, diamonds: 3, exp: 50, ing: ["3 банана", "2 винограда", "3 пшеницы", "1 яйцо"] },
        { name: { ru: "Макарун", en: "Macaron", uk: "Макарун" }, lvl: 101, buildTime: "30м", timeByStars: { 3: "25 мин" }, price: 421, diamonds: 3, exp: 50, ing: ["2 кокоса", "2 белого сахара", "1 какао боб"] },
        { name: { ru: "Ананасно-кокосовые батончики", en: "Pineapple Coconut Biscuits", uk: "Ананасно-кокосові батончики" }, lvl: 120, buildTime: "40м", timeByStars: { 3: "34 мин" }, price: 284, diamonds: 3, exp: 34, ing: ["1 кокос", "2 белого сахара", "3 овес", "2 ананаса"] },
    ],
    2: [
        { name: { ru: "Корм для кур", en: "Chicken Feed", uk: "Курячий корм" }, lvl: 3, time: "5м", timeByStars: { 3: "4 мин" }, price: 7, diamonds: 1, exp: 1, ing: ["2 пшеницы", "1 кукуруза"] },
        { name: { ru: "Корм для коров", en: "Cow Feed", uk: "Коровячий корм" }, lvl: 6, time: "10м", timeByStars: { 3: "8 мин" }, price: 14, diamonds: 2, exp: 2, ing: ["2 сои", "1 кукуруза"] },
        { name: { ru: "Корм для свиней", en: "Sheep Feed", uk: "Овечий корм" }, lvl: 10, time: "20м", timeByStars: { 3: "17 мин" }, price: 14, diamonds: 2, exp: 2, ing: ["2 моркви", "1 соя"] },
        { name: { ru: "Корм для овец", en: "Pig Feed", uk: "Свинячий корм" }, lvl: 16, time: "30м", timeByStars: { 3: "25 мин" }, price: 14, diamonds: 3, exp: 3, ing: ["1 соя", "3 пшеницы"] },
        { name: { ru: "Корм для коз", en: "Goat Feed", uk: "Козячий корм" }, lvl: 32, time: "40м", timeByStars: { 3: "34 мин" }, price: 14, diamonds: 3, exp: 3, ing: ["1 пшеница", "2 моркови", "1 кукуруза"] },
        { name: { ru: "Охапка пшеницы", en: "Wheat Bundle", uk: "Пачка пшениці" }, lvl: 34, time: "40м", timeByStars: { 3: "34 мин" }, price: 14, diamonds: 3, exp: 3, rep: 3, ing: ["75 пшеницы"] }
    ]
};

const resources = {
    ru: {
        "пшеницы": { lvl: 1, price: 3, time: "2 мин", exp: 1, icon: "🌾", name: "Пшеница", translationKey: "pshenyca" },

    },
    en: {
        "wheat": { lvl: 1, price: 3, time: "2 min", exp: 1, icon: "🌾", name: "Wheat", translationKey: "pshenyca" },


        "яйця": { lvl: 5, price: 8, time: "3 h", exp: 3, icon: "🥚", name: "Eggs", translationKey: "yaytsa" },
        "сыр": { lvl: 12, price: 122, time: "1 h", exp: 15, icon: "🧀", name: "Cheese", translationKey: "syr" }
    },
    uk: {
        "пшениці": { lvl: 1, price: 3, time: "2 хв", exp: 1, icon: "🌾", name: "Пшениця", translationKey: "pshenyca" },

    }
};

// Маппинг ингредиентов между языками
const ingredientTranslations = {
    pshenyca: { ru: "пшеницы", en: "wheat", uk: "пшениці" },
    pomidor: { ru: "помидор", en: "tomato", uk: "помідор" },
    kukuruza: { ru: "кукурузы", en: "corn", uk: "кукурудзи" },
    yaytsa: { ru: "яйця", en: "eggs", uk: "яйця" },
    syr: { ru: "сыр", en: "cheese", uk: "сир" }
};

// Функция для перевода ингредиента
function translateIngredient(ingString, toLang) {
    const match = ingString.match(/^(\d+)\s+(.+)$/);
    if (!match) return ingString;

    const quantity = match[1];
    const ingName = match[2];

    // Ингредиенты всегда хранятся на русском, ищем в русских ресурсах
    let translationKey = null;
    for (const key in resources['ru']) {
        if (key === ingName) {
            translationKey = resources['ru'][key].translationKey;
            break;
        }
    }

    if (!translationKey || !ingredientTranslations[translationKey]) {
        return ingString;
    }

    const translatedKey = ingredientTranslations[translationKey][toLang];
    return `${quantity} ${translatedKey}`;
}

function initApp() {
    changeLang(currentLang);
}

function changeLang(lang) {
    currentLang = lang;

    // Загружаем язык если его еще нет
    if (!i18n[lang]) {
        loadLanguage(lang).then(() => {
            document.getElementById('ui-title').innerText = i18n[lang].title;
            document.getElementById('ui-subtitle').innerText = i18n[lang].subtitle;
            document.getElementById('search-input').placeholder = i18n[lang].search;
            handleSearch();
            renderLangSelector();
        });
    } else {
        document.getElementById('ui-title').innerText = i18n[lang].title;
        document.getElementById('ui-subtitle').innerText = i18n[lang].subtitle;
        document.getElementById('search-input').placeholder = i18n[lang].search;
        handleSearch();
        renderLangSelector();
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
                <span class="stat-badge badge-coin">${formatPrice(b.price)} 💰</span>
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
                            <span class="stat-badge badge-coin">${formatPrice(item.price)} 💰</span>
                        </div>
                        <div class="flex flex-wrap gap-1 text-[10px]">
                            <span class="stat-badge badge-lvl">Lvl ${item.lvl}</span>
                            ${item.rep ? `<span class="stat-badge badge-extra">🏅 ${item.rep}</span>` : ''}
                            <span class="stat-badge badge-extra">💎 ${item.diamonds}</span>
                            <span class="stat-badge badge-lvl">✨ ${item.exp}</span>
                            ${item.time ? `<span class="stat-badge badge-time">⏱ ${item.time}</span>` : ''}
                            ${item.buildTime ? `<span class="stat-badge badge-time">⏱ ${item.buildTime}</span>` : ''}
                            ${item.timeByStars ? Object.entries(item.timeByStars).map(([k, v]) => `<span class="stat-badge badge-star">${k}★ ${v}</span>`).join('') : ''}
                            
                        </div>
                        <div class="flex flex-wrap gap-1 mt-1">
                            ${item.ing.map(ing => {
        const translated = translateIngredient(ing, currentLang);
        return `<span class="ingredient" onclick="showIngredientInfo('${translated}')">${translated}</span>`;
    }).join('')}
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
            <h3 class="text-lg font-bold text-amber-900 mb-3">${i18n[currentLang].ing_details}</h3>
            <div class="text-5xl mb-2">${res.icon}</div>
            <h4 class="text-xl font-black text-amber-900 mb-3">${res.name}</h4>
            <div class="space-y-1 text-sm text-left">
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].lvl}:</span> <b>${res.lvl}</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].price}:</span> <b>${formatPrice(res.price)} 💰</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].time}:</span> <b>${res.time}</b></div>
                <div class="flex justify-between p-2 bg-white rounded-lg"><span>${i18n[currentLang].exp}:</span> <b>${res.exp} ✨</b></div>
            </div>
            <button onclick="closeSubModal()" class="mt-4 w-full bg-amber-600 text-white py-3 rounded-2xl font-bold">${i18n[currentLang].close}</button>
        `;
    } else {
        subBody.innerHTML = `
            <h3 class="text-lg font-bold text-amber-900 mb-3">${i18n[currentLang].ing_details}</h3>
            <div class="p-4"><p class="font-bold">${ingString}</p><p class="text-sm text-amber-600">${i18n[currentLang].ing_details} скоро...</p></div>
            <button onclick="closeSubModal()" class="mt-2 w-full bg-amber-600 text-white py-2 rounded-xl">${i18n[currentLang].close}</button>`;
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

// простой информационный модал
function showInfo() {
    const modal = document.getElementById('info-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}
function closeInfo(e) {
    if (e && e.target !== document.getElementById('info-modal')) return;
    const modal = document.getElementById('info-modal');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

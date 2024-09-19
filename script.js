// Хешовані VAM-коди користувачів
const vamCodes = {
    "5f4dcc3b5aa765d61d8327deb882cf99": "Oleg",   // Пароль: "password"
    "098f6bcd4621d373cade4e832627b4f6": "Anna"    // Пароль: "test"
};

// Функція для хешування введеного VAM-коду (MD5)
function hashPassword(password) {
    return CryptoJS.MD5(password).toString();
}

// Функція для роботи з cookies
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookiesArray = document.cookie.split(';');
    for(let i = 0; i < cookiesArray.length; i++) {
        let c = cookiesArray[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Функція для обробки введеного VAM-коду
function submitVAMCode() {
    let vamCode = document.getElementById("vam").value.trim();
    let hashedVamCode = hashPassword(vamCode);

    let blocked = getCookie("blocked");
    if (blocked) {
        alert("Вас заблоковано назавжди!");
        return;
    }

    // Перевірка, чи є VAM-код у списку
    if (vamCodes[hashedVamCode]) {
        let user = vamCodes[hashedVamCode];
        alert("Успішна авторизація, вітаю " + user + "!");
        setCookie("authUser", user, 7);  // Записуємо в cookies на 7 днів
    } else {
        alert("Невірний VAM-код! Ви заблоковані назавжди.");
        setCookie("blocked", true, 365);  // Блокуємо користувача на рік
    }
}

// Функція для перевірки статусу авторизації при завантаженні сторінки
function checkAuthStatus() {
    let blocked = getCookie("blocked");
    let authUser = getCookie("authUser");

    if (blocked) {
        alert("Ви заблоковані і не можете здійснити вхід!");
        document.getElementById("vam").disabled = true;
        return;
    }

    if (authUser) {
        alert("Ви вже авторизовані як " + authUser + ".");
        document.getElementById("vam").disabled = true;
    }
}

// Перевірка статусу авторизації під час завантаження сторінки
window.onload = function() {
    checkAuthStatus();
};

// Підключаємо бібліотеку для хешування паролів
var script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js";
document.head.appendChild(script);

// Хешовані VAM-коди користувачів
const vamCodes = {
    "cf17f8a1642a3af3718d6747f8a987ff": "Олег Гавришків",   // Пароль: "fw28jq3f"
    "0dfb91e942b295d98f21e92b9a6633c0": "Володя Будзівула", // Пароль: "fnw0v7q0"
    "f6436d18083c5cf1dbd26d6d6b80a0bb": "Марія Олійник",    // Пароль: "e5k4f8t4"
    "b681aeff3f9a54fe73553f3b9f344187": "Остап Кілик",      // Пароль: "qgzgxt2x"
    "3d8c58fa5875f5b056c70548e27d53b4": "Анна Гусельникова" // 5h1qrkuu
    
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

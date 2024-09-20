// Ваш список дозволених VAM кодів
const validVAMCodes = ["rubobr72u1", "gba373qjch","z5s984v532","kt034ihc"]; // Замініть на реальні коди
const ExpiredVAMcodes = ["gqpm417s0x"]

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const d = new Date();
    if (days) {
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    } else {
        d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000)); // Блокуємо назавжди
    }
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function submitVAMCode() {
    const vamInput = document.getElementById('vam').value.trim();
    const blocked = getCookie('blocked');

    // Перевіряємо, чи користувач заблокований
    if (blocked === 'true') {
        alert('Ви заблоковані. Зверніться до адміністратора.');
        return;
    }

    if (validVAMCodes.includes(vamInput)) {
        // Успішний вхід, записуємо cookie для автоматичного входу
        setCookie('loggedIn', 'true', 7); // Користувач буде залогінений протягом 7 днів
        document.getElementById('auth').style.display = 'none';
        document.getElementById('homework').style.display = 'flex';
    } else {
        if (ExpiredVAMcodes.includes(vamInput)) {
            alert('Ви ввели VAM код що вже був використаний іншим учнем/ученицею. В доступі відмовлено')
        }else {
        // Невірний код, блокування користувача
        setCookie('blocked', 'true'); // Блокуємо назавжди
        alert('Невірний VAM код. Ви заблоковані.');
        document.getElementById('auth').style.display = 'none';
    }
}

// Перевіряємо, чи користувач уже залогінений
const loggedIn = getCookie('loggedIn');
if (loggedIn === 'true') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('homework').style.display = 'flex';
} else {
    document.getElementById('homework').style.display = 'none';
};

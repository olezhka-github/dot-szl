const auth = document.getElementById('auth');
const main_page = document.getElementById('main-page');
const anonim_forum = document.getElementById('anonim_forum');
const my_diary = document.getElementById('my_diary');
const calc = document.getElementById('calculator');

calc.style.display = 'none';

auth.style.display = 'block';

function authFunc() {
    auth.style.display = 'none';
    main_page.style.display = 'block';
}
function afFunc() {
    anonim_forum.style.display = 'block';
    main_page.style.display = 'none';
}
function diaryFunc() {
    main_page.style.display = 'none';
    my_diary.style.display = 'block';
}
function calcFunc() {
    alert('агов,абоба!Це бета версія,тож якщо щось зламається - я не винен!')
    main_page.style.display = 'none';
    calc.style.display = 'block';
}

// Елементи калькулятору
// Отримуємо всі елементи
const output = document.getElementById('calc-output');
const buttons = document.querySelectorAll('.btn-calc');

// Змінні для обчислень
let num1 = '';
let num2 = '';
let operation = null;

// Додаємо обробку кнопок цифр
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (!operation) {
            num1 += value;
            output.value = num1;
        } else {
            num2 += value;
            output.value = num2;
        }
    });
});

// Додаємо функцію для НСД
function gcd(a, b) {
    while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Додаємо функцію для НСК
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Додаємо функцію для квадратного кореня
function sqrt(a) {
    return Math.sqrt(a);
}

// Функція для виконання основних математичних операцій
function calculate() {
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    let result;

    switch (operation) {
        case 'НСД':
            result = gcd(a, b);
            break;
        case 'НСК':
            result = lcm(a, b);
            break;
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b !== 0) {
                result = a / b;
            } else {
                result = 'Помилка: ділення на нуль';
            }
            break;
        case 'sqrt':
            result = sqrt(a);
            break;
        default:
            result = 'Невідома операція';
    }

    output.value = result;
    // Очищаємо для наступного обчислення
    num1 = '';
    num2 = '';
    operation = null;
}

// Додаємо функціонал для кнопок НСД, НСК і квадратного кореня
document.getElementById('nsd').addEventListener('click', () => {
    operation = 'НСД';
    output.value = 'НСД';
});

document.getElementById('nsc').addEventListener('click', () => {
    operation = 'НСК';
    output.value = 'НСК';
});

document.getElementById('sqrt').addEventListener('click', () => {
    operation = 'sqrt';
    output.value = '√';
});

// Додаємо функціонал для кнопок додавання, віднімання, множення та ділення
document.getElementById('add').addEventListener('click', () => {
    operation = '+';
    output.value = '+';
});

document.getElementById('subtract').addEventListener('click', () => {
    operation = '-';
    output.value = '-';
});

document.getElementById('multiply').addEventListener('click', () => {
    operation = '*';
    output.value = '*';
});

document.getElementById('divide').addEventListener('click', () => {
    operation = '/';
    output.value = '/';
});

// Додаємо кнопку для обчислення
document.getElementById('equals').addEventListener('click', () => {
    calculate();
});

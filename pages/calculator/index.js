// pages/calculator/index.js
import { NavbarComponent } from "../../components/navbar/index.js";
import { FooterComponent } from "../../components/footer/index.js";

export class CalculatorPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <main class="flex-grow-1 d-flex flex-column">
                <section class="calculator gradient-bg flex-grow-1 d-flex align-items-center justify-content-center">
                    <div class="container">
                        <div class="calculator-container">
                            <!-- Группа кнопок -->
                            <div class="btn-group">
                                <!-- Смена фонов -->
                                <button id="btn_backgroundColor" class="my-btn primary">Сменить фон</button>
                                <!-- Индивидуальная операция - округление чисел -->
                                <button id="btn_op_sum_digit" class="my-btn primary">123 → 1+2+3</button>
                            </div>

                            <!-- блок с экраном калькулятора, где будет выводиться результат вычислений. -->
                            <div id="result" class="result">
                                0
                            </div>

                            <!-- блок с кнопками калькулятора. -->
                            <div class="buttons">
                                <!--горизонтальный ряд из четырех кнопок-->
                                <div class="buttons-row">
                                    <button id="btn_op_clear" class="my-btn secondary">C</button>
                                    <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                                    <button id="btn_op_backspace" class="my-btn secondary">←</button>
                                    <button id="btn_op_percent" class="my-btn primary">%</button>
                                    <button id="btn_op_div" class="my-btn primary">/</button>
                                </div>

                                <div class="buttons-row">
                                    <button id="btn_digit_7" class="my-btn">7</button>
                                    <button id="btn_digit_8" class="my-btn">8</button>
                                    <button id="btn_digit_9" class="my-btn">9</button>
                                    <button id="btn_op_mult" class="my-btn primary">x</button>
                                    <button id="btn_op_sqrt" class="my-btn primary">√</button>
                                </div>

                                <div class="buttons-row">
                                    <button id="btn_digit_4" class="my-btn">4</button>
                                    <button id="btn_digit_5" class="my-btn">5</button>
                                    <button id="btn_digit_6" class="my-btn">6</button>
                                    <button id="btn_op_minus" class="my-btn primary">–</button>
                                    <button id="btn_op_pow" class="my-btn primary">x²</button>
                                </div>

                                <div class="buttons-row">
                                    <button id="btn_digit_1" class="my-btn">1</button>
                                    <button id="btn_digit_2" class="my-btn">2</button>
                                    <button id="btn_digit_3" class="my-btn">3</button>
                                    <button id="btn_op_plus" class="my-btn primary">+</button>
                                    <button id="btn_op_fact" class="my-btn primary">x!</button>
                                </div>

                                <div class="buttons-row">
                                    <button id="btn_digit_0" class="my-btn">0</button>
                                    <button id="btn_digit_10" class="my-btn">000</button>
                                    <button id="btn_digit_dot" class="my-btn">.</button>
                                    <button id="btn_op_equal" class="my-btn primary execute">=</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }

    initCalculator() {
        let a = ''           // Первое число
        let b = ''           // Второе число
        let expressionResult = ''  // Результат вычисления
        let selectedOperation = null  // Выбранная операция
        // Получаем доступ к экрану калькулятора в поле вывода
        const outputElement = document.getElementById("result")

        // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
        const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

        function onDigitButtonClicked(digit) {
            // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
            if (!selectedOperation) {
                // Проверяем, не пытаемся ли мы добавить вторую точку
                if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                    // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                    // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5',
                    // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'

                    // Запрещаем лидирующие нули
                    if (a === '0' && (digit === '0' || digit === '000') || a === '' && (digit === '0' || digit === '000')) {
                        return
                    }

                    // Максимум 8 символов
                    if (a.length >= 8) {
                        alert('Максимум 8 символов');
                        return;
                    }
                    a += digit;
                }
                outputElement.innerHTML = a;
            }
            // Если операция выбрана, работаем со вторым числом (b)
            else {
                if ((digit != '.') || (digit == '.' && !b.includes(digit))) {

                    // Запрещаем лидирующие нули
                    if (b === '0' && (digit === '0' || digit === '000') || b === '' && (digit === '0' || digit === '000')) {
                        return
                    }

                    // Максимум 8 символов
                    if (b.length >= 8) {
                        alert('Максимум 8 символов');
                        return;
                    }
                    b += digit;
                    outputElement.innerHTML = b;
                }
            }
        }

        // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
        digitButtons.forEach(button => {
            button.onclick = function() {
                // берем текст, написанный на кнопке - он и является цифрой
                const digitValue = button.innerHTML;
                onDigitButtonClicked(digitValue);
            }
        });

        // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
        document.getElementById("btn_op_mult").onclick = function() {
            if (a === '') return;
            selectedOperation = 'x';
        }
        document.getElementById("btn_op_plus").onclick = function() {
            if (a === '') return;
            selectedOperation = '+';
        }
        document.getElementById("btn_op_minus").onclick = function() {
            if (a === '') return;
            selectedOperation = '-';
        }
        document.getElementById("btn_op_div").onclick = function() {
            if (a === '') return;
            selectedOperation = '/';
        }

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
        document.getElementById("btn_op_clear").onclick = function() {
            a = ''
            b = ''
            selectedOperation = ''
            expressionResult = ''
            outputElement.innerHTML = 0
            document.querySelector('.result').style.backgroundColor = '';
        }

        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
        document.getElementById("btn_op_equal").onclick = function() {
            // Проверяем, что у нас есть оба числа и операция
            if (a === '' || b === '' || !selectedOperation)
                return

            // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
            switch(selectedOperation) {
                case 'x':
                    expressionResult = (+a) * (+b)
                    // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                    break;
                case '+':
                    expressionResult = (+a) + (+b)
                    break;
                case '-':
                    expressionResult = (+a) - (+b)
                    break;
                case '/':
                    expressionResult = (+a) / (+b)
                    break;
                // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
                default:
                    break;
            }

            // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
            a = expressionResult.toString()
            b = ''
            selectedOperation = null

            // Показываем результат на экране
            a = (+a).toFixed(8)
            a = +a
            a = a.toString()
            outputElement.innerHTML = a

            // Разноцветным после результата
            const hue = Math.random() * 360;
            document.querySelector('.result').style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        }

        // Смена знака
        document.getElementById("btn_op_sign").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = (-a).toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    b = (-b).toString()
                    outputElement.innerHTML = b
                }
            }
        }

        // Процент
        document.getElementById("btn_op_percent").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = (+a) / 100
                    a = a.toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    b = (+b) / 100
                    b = (+b).toFixed(8)
                    b = +b
                    b = b.toString()
                    outputElement.innerHTML = b
                }
            }
        }

        // Вспомогательная функция для стирания введенной цифры назад
        function removeLastChar(value) {
            let newValue = ''
            newValue = value.slice(0, -1)
            if (newValue == '' || newValue == '-') {
                return ''
            }
            if (newValue[newValue.length - 1] == '.') {
                newValue = newValue.slice(0, -1)
            }
            return newValue
        }

        // Стирания введенной цифры назад
        document.getElementById("btn_op_backspace").onclick = function() {
            if (!selectedOperation) {
                a = removeLastChar(a)
                outputElement.innerHTML = a || '0'
            }
            else {
                b = removeLastChar(b)
                outputElement.innerHTML = b || '0'
            }
        }

        // Изменить цвет фона
        document.getElementById("btn_backgroundColor").onclick = function() {
            let calculator = document.querySelector('.calculator-container')
            let currentColor = calculator.style.background || 'white'
            let nextColor = {
                'white':'red',
                'red':'black',
                'black':'green',
                'green':'white'
            }

            calculator.style.background = nextColor[currentColor];
        }

        // Квадратный корень
        document.getElementById("btn_op_sqrt").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = Math.sqrt((+a))
                    a = a.toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    b = Math.sqrt((+b))
                    b = b.toString()
                    outputElement.innerHTML = b
                }
            }
        }

        // Возведение числа в степень 2
        document.getElementById("btn_op_pow").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = a * a
                    a = a.toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    b = b * b
                    b = b.toString()
                    outputElement.innerHTML = b
                }
            }
        }

        // Вспомогательная функция факториала
        function factorial(n) {
            if (n < 0) return undefined;
            if (n <= 1) return 1;
            return n * factorial(n - 1);
        }

        // Факториал
        document.getElementById("btn_op_fact").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = factorial((+a))
                    a = a.toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    b = factorial((+b))
                    b = b.toString()
                    outputElement.innerHTML = b
                }
            }
        }

        // Сумма цифр
        document.getElementById("btn_op_sum_digit").onclick = function() {
            if (!selectedOperation) {
                if (a != '') {
                    a = a.split('')
                        .reduce((sum, digit) => sum + Number(digit), 0);
                    a = a.toString()
                    outputElement.innerHTML = a
                }
            }
            else {
                if (b != '') {
                    alert(b)
                    b = b.split('')
                        .reduce((sum, digit) => sum + Number(digit), 0);
                    b = b.toString()
                    outputElement.innerHTML = b
                }
            }
        }
    }

    render() {
        this.parent.innerHTML = '';

        const navbar = new NavbarComponent(this.parent);
        navbar.render();

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footer = new FooterComponent(this.parent);
        footer.render();

        this.initCalculator();


    }
}

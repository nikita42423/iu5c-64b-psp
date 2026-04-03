window.onload = function(){
    // Переменные для хранения чисел и операций
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
                if (a === '0' && digit === '0' || a === '' && digit === '0') {
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
                if (b === '0' && digit === '0' || b === '' && digit === '0') {
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
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.querySelector('.result').style.backgroundColor = randomColor;
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
                a = Math.pow((+a), 2)
                a = a.toString()
                outputElement.innerHTML = a
            }
        }
        else {
            if (b != '') {
                b = Math.pow((+b), 2)
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
};

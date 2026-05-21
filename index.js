// Задание 1.7 (1 уровень)
function isEqualObj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// Задание 2.7 (2 уровень)
function sumDiagonals(matrix) {
    const n = matrix.length;
    if (n === 0) return 0;

    let mainSum = 0;
    let secondarySum = 0;

    for (let i = 0; i < n; i++) {
        mainSum += matrix[i][i];
        secondarySum += matrix[i][n - 1 - i];
    }

    if (n % 2 === 1) {
        const center = matrix[Math.floor(n / 2)][Math.floor(n / 2)];
        return mainSum + secondarySum - center;
    }

    return mainSum + secondarySum;
}

// Задание 3.7 (3 уровень)
function plainify(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            const value = obj[key];

            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                plainify(value, newKey, result);
            } else {
                result[newKey] = value;
            }
        }
    }
    return result;
}

// --------------------------------------------------------
// Тесты
// --------------------------------------------------------
function runTests() {
    let allPassed = true;

    function test(description, fn) {
        try {
            const passed = fn();
            console.log(passed ? '  TRUE' : '  FALSE', `- ${description}`);
            if (!passed) allPassed = false;
        } catch (e) {
            console.log('  FALSE', `- ${description} (${e.message})`);
            allPassed = false;
        }
    }

    // --- 1.7 isEqualObj ---
    console.log('\n=== 1.7 isEqualObj ===');
    test('равные простые объекты', () => isEqualObj({ a: 1, b: 2 }, { a: 1, b: 2 }));
    test('разные простые объекты', () => !isEqualObj({ a: 1 }, { a: 2 }));
    test('равные вложенные объекты', () => isEqualObj({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } }));
    test('разные вложенные объекты', () => !isEqualObj({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 4 } }));
    test('пустые объекты', () => isEqualObj({}, {}));
    test('разные ключи', () => !isEqualObj({ a: 1 }, { b: 1 }));
    test('null / undefined', () => isEqualObj({ a: null }, { a: null }));
    test('объект с массивом', () => isEqualObj({ a: [1, 2] }, { a: [1, 2] }));

    // --- 2.7 sumDiagonals ---
    console.log('\n=== 2.7 sumDiagonals ===');
    test('матрица 3x3', () => sumDiagonals([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) === 25);
    test('матрица 1x1', () => sumDiagonals([[5]]) === 5);
    test('матрица 2x2', () => sumDiagonals([[1, 2], [3, 4]]) === 10);
    test('пустая матрица', () => sumDiagonals([]) === 0);
    test('матрица 4x4', () => sumDiagonals([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
    ]) === 68); // главная 1+6+11+16=34, побочная 4+7+10+13=34 = 68
    test('матрица 3x3 с отрицательными', () => sumDiagonals([[-1, 2, 3], [4, -5, 6], [7, 8, -9]]) === -5);

    // --- 3.7 plainify ---
    console.log('\n=== 3.7 plainify ===');
    const expected1 = { 'a': 1, 'b.c': 2, 'b.d.e': 3, 'b.d.f': [4, 5], 'g': null, 'h': 'hello' };
    test('вложенный объект', () =>
        JSON.stringify(plainify({ a: 1, b: { c: 2, d: { e: 3, f: [4, 5] } }, g: null, h: 'hello' }))
        === JSON.stringify(expected1)
    );
    test('пустой объект', () => JSON.stringify(plainify({})) === JSON.stringify({}));
    test('плоский объект', () => JSON.stringify(plainify({ x: 10, y: 20 })) === JSON.stringify({ x: 10, y: 20 }));
    test('глубокая вложенность', () =>
        JSON.stringify(plainify({ a: { b: { c: { d: 1 } } } }))
        === JSON.stringify({ 'a.b.c.d': 1 })
    );
    test('массивы не сплющиваются', () => {
        const obj = { a: [1, { b: 2 }] };
        const res = plainify(obj);
        return Array.isArray(res.a) && res.a[1].b === 2;
    });

    console.log(allPassed ? '\n✅ Все тесты пройдены!' : '\n❌ Некоторые тесты не пройдены.');
}

runTests();

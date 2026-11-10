import { sortArrayString } from "../../src";

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayString(array, 'a-z')).toStrictEqual(result);
    expect(sortArrayString(array, 'a-z', 'first')).toStrictEqual(result);
    expect(sortArrayString(array, 'a-z', 'last')).toStrictEqual(result);

    expect(sortArrayString(array, 'z-a')).toStrictEqual(result);
    expect(sortArrayString(array, 'z-a', 'first')).toStrictEqual(result);
    expect(sortArrayString(array, 'z-a', 'last')).toStrictEqual(result);
}

test('Некорректный аргумент и массивы с одним элементом', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        -5,
        0,
        10,
        '',
        ' ',
        'string',
        '123',
        NaN,
        new Date(),
        new Date('InvalidDate'),
        undefined,
        null,
        []
    ];

    for (const value of incorrectValues) {
        testGroupIdenticalResult(value, []);
        testGroupIdenticalResult([value], [value]);
    }
});

test('В массиве нет string', () => {
    const getTestArray = () => [null, -1, true, {}, 0, undefined, false, [], 1];
    testGroupIdenticalResult(getTestArray(), getTestArray());
});

test('Массив уже отсортирован', () => {
    const testData: Record<string, () => string[]> = {
        'ru':()=> ['апельсин', 'арбуз', 'яблоко', 'apple', 'banana', 'cherry', '苹果', '西瓜', '香蕉'],
        'en': ()=> ['apple', 'banana', 'cherry', 'апельсин', 'арбуз', 'яблоко', '苹果', '西瓜', '香蕉'],
        'zh':()=> ['苹果', '西瓜', '香蕉', 'apple', 'banana', 'cherry', 'апельсин', 'арбуз', 'яблоко']
    }

    for (const locale in testData) {
        const getTestArrayAZ = testData[locale]!;

        expect(sortArrayString(getTestArrayAZ(), 'a-z', 'first', locale)).toStrictEqual(getTestArrayAZ());
        expect(sortArrayString(getTestArrayAZ(), 'a-z', 'last', locale)).toStrictEqual(getTestArrayAZ());

        expect(sortArrayString(getTestArrayAZ().reverse(), 'z-a', 'first', locale)).toStrictEqual(getTestArrayAZ().reverse());
        expect(sortArrayString(getTestArrayAZ().reverse(), 'z-a', 'last', locale)).toStrictEqual(getTestArrayAZ().reverse());
    }
});

test('Массив только string', () => {
    const getTestArray = () => ['яблоко', 'banana', '苹果', 'арбуз', 'apple', '香蕉', 'апельсин', 'cherry', '西瓜', 'orange', '樱桃', 'киви'];

    const testData: Record<string, () => string[]> = {
        'ru': () => ['апельсин', 'арбуз', 'киви', 'яблоко', 'apple', 'banana', 'cherry', 'orange', '樱桃', '苹果', '西瓜', '香蕉'],
        'en': () =>  ['apple', 'banana', 'cherry', 'orange', 'апельсин', 'арбуз', 'киви', 'яблоко', '樱桃', '苹果', '西瓜', '香蕉'],
        'zh': () => ['苹果', '西瓜', '香蕉', '樱桃', 'apple', 'banana', 'cherry', 'orange', 'апельсин', 'арбуз', 'киви', 'яблоко']
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        expect(sortArrayString(getTestArray(), 'a-z', 'first', locale)).toStrictEqual(getResultAZ());
        expect(sortArrayString(getTestArray(), 'a-z', 'last', locale)).toStrictEqual(getResultAZ());

        expect(sortArrayString(getTestArray(), 'z-a', 'first', locale)).toStrictEqual(getResultAZ().reverse());
        expect(sortArrayString(getTestArray(), 'z-a', 'last', locale)).toStrictEqual(getResultAZ().reverse());
    }
});

test('В массиве присутствуют другие значения помимо string', () => {
    const getTestArray = () => [false, 'яблоко', null, 'banana', true, '苹果', undefined, 'арбуз', '', -1, 'apple', [], '香蕉', {}, 'апельсин', 1, 'cherry', NaN, '西瓜', '', 'orange', '樱桃', 0, 'киви'];
    const getResultInvalidItems = () =>  [false, null, true, undefined, '',  -1, [], {}, 1, NaN, '', 0];
    
    const testData: Record<string, () => string[]> = {
        'ru': () => ['апельсин', 'арбуз', 'киви', 'яблоко', 'apple', 'banana', 'cherry', 'orange', '樱桃', '苹果', '西瓜', '香蕉'],
        'en': () =>  ['apple', 'banana', 'cherry', 'orange', 'апельсин', 'арбуз', 'киви', 'яблоко', '樱桃', '苹果', '西瓜', '香蕉'],
        'zh': () => ['苹果', '西瓜', '香蕉', '樱桃', 'apple', 'banana', 'cherry', 'orange', 'апельсин', 'арбуз', 'киви', 'яблоко']
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        expect(sortArrayString(getTestArray(), 'a-z', 'first', locale)).toStrictEqual([...getResultInvalidItems(),...getResultAZ()]);
        expect(sortArrayString(getTestArray(), 'a-z', 'last', locale)).toStrictEqual([...getResultAZ(), ...getResultInvalidItems()]);

        expect(sortArrayString(getTestArray(), 'z-a', 'first', locale)).toStrictEqual([...getResultInvalidItems(), ...getResultAZ().reverse()]);
        expect(sortArrayString(getTestArray(), 'z-a', 'last', locale)).toStrictEqual([...getResultAZ().reverse(), ...getResultInvalidItems()]);
    }
});

test('Повторяющиеся string', () => {
    const getTestArray = () => ['string', 'string', 'string'];

    expect(sortArrayString(getTestArray(), 'a-z')).toStrictEqual(getTestArray());
    expect(sortArrayString(getTestArray(), 'a-z', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayString(getTestArray(), 'a-z', 'last')).toStrictEqual(getTestArray());

    expect(sortArrayString(getTestArray(), 'z-a')).toStrictEqual(getTestArray());
    expect(sortArrayString(getTestArray(), 'z-a', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayString(getTestArray(), 'z-a', 'last')).toStrictEqual(getTestArray());
});


test('Исходный массив не мутирует', () => {
    const getTestArray = () => [false, '3', null, '1', true, '2', undefined, '', -1, '5', [], '4'];

    const testArray = getTestArray();
    const results: unknown[][] = [];

    // a-z
    results.push(sortArrayString(testArray, 'a-z'));
    results.push(sortArrayString(testArray, 'a-z', 'first'));
    results.push(sortArrayString(testArray, 'a-z', 'last'));
    // z-a
    results.push(sortArrayString(testArray, 'z-a'));
    results.push(sortArrayString(testArray, 'z-a', 'first'));
    results.push(sortArrayString(testArray, 'z-a', 'last'));

    for (const array of results) {
        expect(array === testArray).toStrictEqual(false);
    }

    expect(testArray).toStrictEqual(getTestArray());
});

test('Сортировка строк с заглавными и строчными буквами', () => {
    const getTestArray = () => ['Яблоко', 'апельсин', 'ягода', 'Ананас', 'Banana', 'apple', 'Cherry', 'broccoli', 'cucumber'];

    const testData: Record<string,  () => string[]> = {
        'ru': () => ['Ананас', 'апельсин', 'Яблоко', 'ягода', 'apple', 'Banana', 'broccoli', 'Cherry', 'cucumber'],
        'en': () => ['apple', 'Banana', 'broccoli', 'Cherry', 'cucumber', 'Ананас', 'апельсин', 'Яблоко', 'ягода']
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        expect(sortArrayString(getTestArray(), 'a-z', 'first', locale)).toStrictEqual(getResultAZ());
        expect(sortArrayString(getTestArray(), 'a-z', 'last', locale)).toStrictEqual(getResultAZ());

        expect(sortArrayString(getTestArray(), 'z-a', 'first', locale)).toStrictEqual(getResultAZ().reverse());
        expect(sortArrayString(getTestArray(), 'z-a', 'last', locale)).toStrictEqual(getResultAZ().reverse());
    }
});
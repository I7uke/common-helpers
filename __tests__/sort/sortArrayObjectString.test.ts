import { sortArrayObjectString } from "../../src";

interface TestItem<T = string> {
    readonly index: number;
    readonly fieldA: T;
}

function getFieldA(item: TestItem<any>): any {
    return item?.fieldA;
}

function testGroupIdenticalResult(array: any[], result: any[]) {
    // a-z
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'a-z'
    })).toStrictEqual(result);
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'a-z',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'a-z',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);
    // z-a
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'z-a'
    })).toStrictEqual(result);
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'z-a',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);
    expect(sortArrayObjectString({
        array: array,
        field: getFieldA,
        order: 'z-a',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);
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
    const getTestArray = () => [
        { index: 0, fieldA: null },
        { index: 1, fieldA: -1 },
        { index: 3, fieldA: {} },
        { index: 4, fieldA: 0 },
        { index: 5, fieldA: undefined },
        { index: 6, fieldA: false },
        { index: 7, fieldA: [] },
        { index: 8, fieldA: 1 }
    ];
    testGroupIdenticalResult(getTestArray(), getTestArray());
});

test('Массив уже отсортирован', () => {
    const testData: Record<string, () => TestItem[]> = {
        'ru': () => [
            { index: 0, fieldA: 'апельсин' },
            { index: 1, fieldA: 'арбуз' },
            { index: 2, fieldA: 'яблоко' },
            { index: 3, fieldA: 'apple' },
            { index: 4, fieldA: 'banana' },
            { index: 5, fieldA: 'cherry' },
            { index: 6, fieldA: '苹果' },
            { index: 7, fieldA: '西瓜' },
            { index: 8, fieldA: '香蕉' }
        ],
        'en': () => [
            { index: 0, fieldA: 'apple' },
            { index: 1, fieldA: 'banana' },
            { index: 2, fieldA: 'cherry' },
            { index: 3, fieldA: 'апельсин' },
            { index: 4, fieldA: 'арбуз' },
            { index: 5, fieldA: 'яблоко' },
            { index: 6, fieldA: '苹果' },
            { index: 7, fieldA: '西瓜' },
            { index: 8, fieldA: '香蕉' }
        ],
        'zh': () => [
            { index: 0, fieldA: '苹果' },
            { index: 1, fieldA: '西瓜' },
            { index: 2, fieldA: '香蕉' },
            { index: 3, fieldA: 'apple' },
            { index: 4, fieldA: 'banana' },
            { index: 5, fieldA: 'cherry' },
            { index: 6, fieldA: 'апельсин' },
            { index: 7, fieldA: 'арбуз' },
            { index: 8, fieldA: 'яблоко' }
        ]
    };

    for (const locale in testData) {
        const getTestArrayAZ = testData[locale]!;
        // a-z
        expect(sortArrayObjectString({
            array: getTestArrayAZ(),
            field: getFieldA,
            order: 'a-z',
            locales: locale
        })).toStrictEqual(getTestArrayAZ());

        expect(sortArrayObjectString({
            array: getTestArrayAZ(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getTestArrayAZ());

        expect(sortArrayObjectString({
            array: getTestArrayAZ(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getTestArrayAZ());

        // z-a
        expect(sortArrayObjectString({
            array: getTestArrayAZ().reverse(),
            field: getFieldA,
            order: 'z-a',
            locales: locale
        })).toStrictEqual(getTestArrayAZ().reverse());

        expect(sortArrayObjectString({
            array: getTestArrayAZ().reverse(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getTestArrayAZ().reverse());

        expect(sortArrayObjectString({
            array: getTestArrayAZ().reverse(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getTestArrayAZ().reverse());
    }
});

test('Массив только string', () => {
    const getTestArray = (): TestItem[] => [
        { index: 0, fieldA: 'яблоко' },
        { index: 1, fieldA: 'banana' },
        { index: 2, fieldA: '苹果' },
        { index: 3, fieldA: 'арбуз' },
        { index: 4, fieldA: 'apple' },
        { index: 5, fieldA: '香蕉' },
        { index: 6, fieldA: 'апельсин' },
        { index: 7, fieldA: 'cherry' },
        { index: 8, fieldA: '西瓜' },
        { index: 9, fieldA: 'orange' },
        { index: 10, fieldA: '樱桃' },
        { index: 11, fieldA: 'киви' }
    ];

    const testData: Record<string, () => TestItem[]> = {
        'ru': () => [
            { index: 6, fieldA: 'апельсин' },
            { index: 3, fieldA: 'арбуз' },
            { index: 11, fieldA: 'киви' },
            { index: 0, fieldA: 'яблоко' },
            { index: 4, fieldA: 'apple' },
            { index: 1, fieldA: 'banana' },
            { index: 7, fieldA: 'cherry' },
            { index: 9, fieldA: 'orange' },
            { index: 10, fieldA: '樱桃' },
            { index: 2, fieldA: '苹果' },
            { index: 8, fieldA: '西瓜' },
            { index: 5, fieldA: '香蕉' }
        ],
        'en': () => [
            { index: 4, fieldA: 'apple' },
            { index: 1, fieldA: 'banana' },
            { index: 7, fieldA: 'cherry' },
            { index: 9, fieldA: 'orange' },
            { index: 6, fieldA: 'апельсин' },
            { index: 3, fieldA: 'арбуз' },
            { index: 11, fieldA: 'киви' },
            { index: 0, fieldA: 'яблоко' },
            { index: 10, fieldA: '樱桃' },
            { index: 2, fieldA: '苹果' },
            { index: 8, fieldA: '西瓜' },
            { index: 5, fieldA: '香蕉' }
        ],
        'zh': () => [
            { index: 2, fieldA: '苹果' },
            { index: 8, fieldA: '西瓜' },
            { index: 5, fieldA: '香蕉' },
            { index: 10, fieldA: '樱桃' },
            { index: 4, fieldA: 'apple' },
            { index: 1, fieldA: 'banana' },
            { index: 7, fieldA: 'cherry' },
            { index: 9, fieldA: 'orange' },
            { index: 6, fieldA: 'апельсин' },
            { index: 3, fieldA: 'арбуз' },
            { index: 11, fieldA: 'киви' },
            { index: 0, fieldA: 'яблоко' }
        ]
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        // a-z
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale
        })).toStrictEqual(getResultAZ());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getResultAZ());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getResultAZ());

        // z-a
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale
        })).toStrictEqual(getResultAZ().reverse());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getResultAZ().reverse());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getResultAZ().reverse());
    }
});

test('В массиве присутствуют другие значения помимо string', () => {
    const getTestArray = (): TestItem<unknown>[] => [
        { index: 0, fieldA: false },
        { index: 1, fieldA: 'яблоко' },
        { index: 2, fieldA: null },
        { index: 3, fieldA: 'banana' },
        { index: 4, fieldA: true },
        { index: 5, fieldA: '苹果' },
        { index: 6, fieldA: undefined },
        { index: 7, fieldA: 'арбуз' },
        { index: 8, fieldA: '' },
        { index: 9, fieldA: -1 },
        { index: 10, fieldA: 'apple' },
        { index: 11, fieldA: [] },
        { index: 12, fieldA: '香蕉' },
        { index: 13, fieldA: {} },
        { index: 14, fieldA: 'апельсин' },
        { index: 15, fieldA: 1 },
        { index: 16, fieldA: 'cherry' },
        { index: 17, fieldA: NaN },
        { index: 18, fieldA: '西瓜' },
        { index: 19, fieldA: '' },
        { index: 20, fieldA: 'orange' },
        { index: 21, fieldA: '樱桃' },
        { index: 22, fieldA: 0 },
        { index: 23, fieldA: 'киви' }
    ];

    const getResultInvalidItems = (): TestItem<unknown>[] => [
        { index: 0, fieldA: false },
        { index: 2, fieldA: null },
        { index: 4, fieldA: true },
        { index: 6, fieldA: undefined },
        { index: 8, fieldA: '' },
        { index: 9, fieldA: -1 },
        { index: 11, fieldA: [] },
        { index: 13, fieldA: {} },
        { index: 15, fieldA: 1 },
        { index: 17, fieldA: NaN },
        { index: 19, fieldA: '' },
        { index: 22, fieldA: 0 }
    ];

    const testData: Record<string, () => TestItem[]> = {
        'ru': () => [
            { index: 14, fieldA: 'апельсин' },
            { index: 7, fieldA: 'арбуз' },
            { index: 23, fieldA: 'киви' },
            { index: 1, fieldA: 'яблоко' },
            { index: 10, fieldA: 'apple' },
            { index: 3, fieldA: 'banana' },
            { index: 16, fieldA: 'cherry' },
            { index: 20, fieldA: 'orange' },
            { index: 21, fieldA: '樱桃' },
            { index: 5, fieldA: '苹果' },
            { index: 18, fieldA: '西瓜' },
            { index: 12, fieldA: '香蕉' }
        ],
        'en': () => [
            { index: 10, fieldA: 'apple' },
            { index: 3, fieldA: 'banana' },
            { index: 16, fieldA: 'cherry' },
            { index: 20, fieldA: 'orange' },
            { index: 14, fieldA: 'апельсин' },
            { index: 7, fieldA: 'арбуз' },
            { index: 23, fieldA: 'киви' },
            { index: 1, fieldA: 'яблоко' },
            { index: 21, fieldA: '樱桃' },
            { index: 5, fieldA: '苹果' },
            { index: 18, fieldA: '西瓜' },
            { index: 12, fieldA: '香蕉' }
        ],
        'zh': () => [
            { index: 5, fieldA: '苹果' },
            { index: 18, fieldA: '西瓜' },
            { index: 12, fieldA: '香蕉' },
            { index: 21, fieldA: '樱桃' },
            { index: 10, fieldA: 'apple' },
            { index: 3, fieldA: 'banana' },
            { index: 16, fieldA: 'cherry' },
            { index: 20, fieldA: 'orange' },
            { index: 14, fieldA: 'апельсин' },
            { index: 7, fieldA: 'арбуз' },
            { index: 23, fieldA: 'киви' },
            { index: 1, fieldA: 'яблоко' }
        ]
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        // a-z
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale
        })).toStrictEqual([...getResultAZ(), ...getResultInvalidItems()]);

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual([...getResultInvalidItems(), ...getResultAZ()]);

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual([...getResultAZ(), ...getResultInvalidItems()]);

        // z-a
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale
        })).toStrictEqual([...getResultAZ().reverse(), ...getResultInvalidItems()]);

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual([...getResultInvalidItems(), ...getResultAZ().reverse()]);

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual([...getResultAZ().reverse(), ...getResultInvalidItems()]);

    }
});

test('Повторяющиеся string', () => {
    const getTestArray = (): TestItem[] => [
        { index: 0, fieldA: 'string' },
        { index: 1, fieldA: 'string' },
        { index: 2, fieldA: 'string' }
    ];

    testGroupIdenticalResult(getTestArray(), getTestArray());
});


test('Исходный массив не мутирует', () => {
    const getTestArray = (): TestItem<unknown>[] => [
        { index: 0, fieldA: false },
        { index: 1, fieldA: '3' },
        { index: 2, fieldA: null },
        { index: 3, fieldA: '1' },
        { index: 4, fieldA: true },
        { index: 5, fieldA: '2' },
        { index: 6, fieldA: undefined },
        { index: 7, fieldA: '' },
        { index: 8, fieldA: -1 },
        { index: 9, fieldA: '5' },
        { index: 10, fieldA: [] },
        { index: 11, fieldA: '4' }
    ];

    const testArray = getTestArray();
    const results: TestItem<unknown>[][] = [];

    // a-z
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'a-z'
    }));
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'a-z',
        orderOfInvalidValue: 'first'
    }));
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'a-z',
        orderOfInvalidValue: 'last'
    }));
    // z-a
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'z-a'
    }));
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'z-a',
        orderOfInvalidValue: 'first'
    }));
    results.push(sortArrayObjectString({
        array: testArray,
        field: getFieldA,
        order: 'z-a',
        orderOfInvalidValue: 'last'
    }));

    for (const array of results) {
        expect(array === testArray).toStrictEqual(false);
    }

    expect(testArray).toStrictEqual(getTestArray());
});

test('Сортировка строк с заглавными и строчными буквами', () => {
    const getTestArray = (): TestItem[] => [
        { index: 0, fieldA: 'Яблоко' },
        { index: 1, fieldA: 'апельсин' },
        { index: 2, fieldA: 'ягода' },
        { index: 3, fieldA: 'Ананас' },
        { index: 4, fieldA: 'Banana' },
        { index: 5, fieldA: 'apple' },
        { index: 6, fieldA: 'Cherry' },
        { index: 7, fieldA: 'broccoli' },
        { index: 8, fieldA: 'cucumber' }
    ];

    const testData: Record<string, () => TestItem[]> = {
        'ru': () => [
            { index: 3, fieldA: 'Ананас' },
            { index: 1, fieldA: 'апельсин' },
            { index: 0, fieldA: 'Яблоко' },
            { index: 2, fieldA: 'ягода' },
            { index: 5, fieldA: 'apple' },
            { index: 4, fieldA: 'Banana' },
            { index: 7, fieldA: 'broccoli' },
            { index: 6, fieldA: 'Cherry' },
            { index: 8, fieldA: 'cucumber' }
        ],
        'en': () => [
            { index: 5, fieldA: 'apple' },
            { index: 4, fieldA: 'Banana' },
            { index: 7, fieldA: 'broccoli' },
            { index: 6, fieldA: 'Cherry' },
            { index: 8, fieldA: 'cucumber' },
            { index: 3, fieldA: 'Ананас' },
            { index: 1, fieldA: 'апельсин' },
            { index: 0, fieldA: 'Яблоко' },
            { index: 2, fieldA: 'ягода' }
        ]
    };

    for (const locale in testData) {
        const getResultAZ = testData[locale]!;

        // a-z
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale
        })).toStrictEqual(getResultAZ());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getResultAZ());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'a-z',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getResultAZ());

        // z-a
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale
        })).toStrictEqual(getResultAZ().reverse());

        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(getResultAZ().reverse());
        
        expect(sortArrayObjectString({
            array: getTestArray(),
            field: getFieldA,
            order: 'z-a',
            locales: locale,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(getResultAZ().reverse());
    }
});
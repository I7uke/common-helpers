import { sortArrayObjectBoolean } from "../../src";

interface TestItem<T = boolean> {
    readonly index: number;
    readonly fieldA: T;
}

function getFieldA(item: TestItem<unknown>): boolean | null | undefined {
    if (typeof item?.fieldA !== 'boolean') {
        return undefined;
    }

    return item.fieldA;
}

function testGroupIdenticalResult(array: TestItem<unknown>[], result: TestItem<unknown>[]) {
    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'true-false',
    })).toStrictEqual(result);

    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);

    // false-true
    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'false-true',
    })).toStrictEqual(result);

    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectBoolean({
        array: array,
        field: getFieldA,
        order: 'false-true',
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

test('В массиве нет boolean', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: 0 },
        { index: 1, fieldA: null },
        { index: 2, fieldA: {} },
        { index: 3, fieldA: '' },
        { index: 4, fieldA: undefined },
        { index: 5, fieldA: 5 },
        { index: 6, fieldA: NaN },
        { index: 7, fieldA: 'string' },
    ];
    testGroupIdenticalResult(testArray, testArray);
});

test('Массив уже отсортирован', () => {
    const testArray1 = [
        { index: 0, fieldA: true },
        { index: 1, fieldA: true },
        { index: 2, fieldA: false }
    ];

    const testArray2 = [
        { index: 0, fieldA: false },
        { index: 1, fieldA: false },
        { index: 2, fieldA: true }
    ];

    expect(sortArrayObjectBoolean({
        array: testArray1,
        field: getFieldA,
        order: 'true-false'
    })).toStrictEqual(testArray1);

    expect(sortArrayObjectBoolean({
        array: testArray1,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testArray1);

    expect(sortArrayObjectBoolean({
        array: testArray1,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testArray1);

    // false-true
    expect(sortArrayObjectBoolean({
        array: testArray2,
        field: getFieldA,
        order: 'false-true'
    })).toStrictEqual(testArray2);

    expect(sortArrayObjectBoolean({
        array: testArray2,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "first"
    })).toStrictEqual(testArray2);

    expect(sortArrayObjectBoolean({
        array: testArray2,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "last"
    })).toStrictEqual(testArray2);
});

test('Массив только boolean', () => {
    const testArray: TestItem[] = [
        { index: 0, fieldA: false },
        { index: 1, fieldA: true },
        { index: 2, fieldA: false },
    ];

    const resultTrueFalse: TestItem[] = [
        { index: 1, fieldA: true },
        { index: 0, fieldA: false },
        { index: 2, fieldA: false },
    ];

    const resultFalseTrue: TestItem[] = [
        { index: 0, fieldA: false },
        { index: 2, fieldA: false },
        { index: 1, fieldA: true },
    ];
    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false'
    })).toStrictEqual(resultTrueFalse);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(resultTrueFalse);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(resultTrueFalse);

    // false-true
    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true'
    })).toStrictEqual(resultFalseTrue);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "first"
    })).toStrictEqual(resultFalseTrue);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "last"
    })).toStrictEqual(resultFalseTrue);
});

test('В массиве присутствуют другие значения помимо boolean', () => {
    const testArray = [
        { index: 0, fieldA: 0 },
        { index: 1, fieldA: false },
        { index: 2, fieldA: NaN },
        { index: 3, fieldA: 'string' },
        { index: 4, fieldA: true },
        { index: 5, fieldA: null },
        { index: 6, fieldA: {} },
        { index: 7, fieldA: true },
        { index: 8, fieldA: undefined },
        { index: 9, fieldA: { a: 1, b: '2' } },
        { index: 10, fieldA: false },
        { index: 11, fieldA: '' },
        { index: 12, fieldA: 5 },
        { index: 13, fieldA: false },
    ];

    const resultTrueFalse = [
        { index: 4, fieldA: true },
        { index: 7, fieldA: true },
        { index: 1, fieldA: false },
        { index: 10, fieldA: false },
        { index: 13, fieldA: false },
    ];

    const resultFalseTrue = [
        { index: 1, fieldA: false },
        { index: 10, fieldA: false },
        { index: 13, fieldA: false },
        { index: 4, fieldA: true },
        { index: 7, fieldA: true },
    ];

    const resultInvalidItems = [
        { index: 0, fieldA: 0 },
        { index: 2, fieldA: NaN },
        { index: 3, fieldA: 'string' },
        { index: 5, fieldA: null },
        { index: 6, fieldA: {} },
        { index: 8, fieldA: undefined },
        { index: 9, fieldA: { a: 1, b: '2' } },
        { index: 11, fieldA: '' },
        { index: 12, fieldA: 5 },
    ];

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false'
    })).toStrictEqual([...resultTrueFalse, ...resultInvalidItems]);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...resultTrueFalse]);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...resultTrueFalse, ...resultInvalidItems]);

    // false-true
    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true'
    })).toStrictEqual([...resultFalseTrue, ...resultInvalidItems]);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "first"
    })).toStrictEqual([...resultInvalidItems, ...resultFalseTrue]);

    expect(sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'false-true',
        orderOfInvalidValue: "last"
    })).toStrictEqual([...resultFalseTrue, ...resultInvalidItems]);
});

test('Повторяющиеся true и false', () => {
    const testValuesList = [
        [
            { index: 0, fieldA: true },
            { index: 1, fieldA: true },
            { index: 2, fieldA: true }
        ],
        [
            { index: 0, fieldA: false },
            { index: 1, fieldA: false },
            { index: 2, fieldA: false }
        ]
    ];

    for (const testValues of testValuesList) {
        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'true-false'
        })).toStrictEqual(testValues);

        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'true-false',
            orderOfInvalidValue: 'first'
        })).toStrictEqual(testValues);

        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'true-false',
            orderOfInvalidValue: 'last'
        })).toStrictEqual(testValues);

        // false-true
        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'false-true'
        })).toStrictEqual(testValues);

        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'false-true',
            orderOfInvalidValue: "first"
        })).toStrictEqual(testValues);

        expect(sortArrayObjectBoolean({
            array: testValues,
            field: getFieldA,
            order: 'false-true',
            orderOfInvalidValue: "last"
        })).toStrictEqual(testValues);
    }
});

test('Исходный массив не изменяется', () => {
    const testArray = [
        { index: 0, fieldA: false },
        { index: 1, fieldA: true },
    ];

    const originalArray = testArray.slice();

    sortArrayObjectBoolean({
        array: testArray,
        field: getFieldA,
        order: 'true-false',
    });

    expect(testArray).toStrictEqual(originalArray);
});
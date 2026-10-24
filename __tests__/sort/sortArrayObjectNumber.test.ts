import { sortArrayObjectNumber } from "../../src";

interface TestItem<T = number> {
    readonly index: number;
    readonly fieldA: T;
}

function getFieldA(item: TestItem<any>): any {
    return item?.fieldA as number | null | undefined;
}

function testGroupIdenticalResult(array: any[], result: any[]) {
    expect(sortArrayObjectNumber({
        array: array,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual(result);

    expect(sortArrayObjectNumber({
        array: array,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectNumber({
        array: array,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);

    //9-0
    expect(sortArrayObjectNumber({
        array: array,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual(result);

    expect(sortArrayObjectNumber({
        array: array,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectNumber({
        array: array,
        order: '9-0',
        field: getFieldA,
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

test('В массиве нет number', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: null },
        { index: 1, fieldA: true },
        { index: 2, fieldA: {} },
        { index: 3, fieldA: '' },
        { index: 4, fieldA: undefined },
        { index: 5, fieldA: false },
        { index: 6, fieldA: Array(0) },
        { index: 7, fieldA: 'string' }
    ]

    testGroupIdenticalResult(testArray, testArray);
});

test('Исходный массив не изменяется', () => {
    const testArray = [
        { index: 0, fieldA: 0 },
        { index: 1, fieldA: 1 },
        { index: 2, fieldA: 2 }
    ];

    const originalArray = testArray.slice();

    const result = sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA
    });

    expect(testArray).toStrictEqual(originalArray);
    expect(result === testArray).toStrictEqual(false);
});

test('Массив уже отсортирован', () => {
    const testArray09: TestItem<unknown>[] = [
        { index: 0, fieldA: -2 },
        { index: 1, fieldA: -1 },
        { index: 2, fieldA: 0 },
        { index: 3, fieldA: 1 },
        { index: 4, fieldA: 2 }
    ];

    const testArray90: TestItem<unknown>[] = [
        { index: 0, fieldA: 2 },
        { index: 1, fieldA: 1 },
        { index: 2, fieldA: 0 },
        { index: 3, fieldA: -1 },
        { index: 4, fieldA: -2 }
    ];

    expect(sortArrayObjectNumber({
        array: testArray09,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual(testArray09);

    expect(sortArrayObjectNumber({
        array: testArray09,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testArray09);

    expect(sortArrayObjectNumber({
        array: testArray09,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testArray09);

    //9-0
    expect(sortArrayObjectNumber({
        array: testArray90,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual(testArray90);

    expect(sortArrayObjectNumber({
        array: testArray90,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testArray90);

    expect(sortArrayObjectNumber({
        array: testArray90,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testArray90);
});

test('Массив только number', () => {
    const testArray = [
        { index: 0, fieldA: 1 },
        { index: 1, fieldA: -2 },
        { index: 2, fieldA: 2 },
        { index: 3, fieldA: -1 },
        { index: 4, fieldA: 0 }
    ];

    const result09: TestItem<unknown>[] = [
        { index: 1, fieldA: -2 },
        { index: 3, fieldA: -1 },
        { index: 4, fieldA: 0 },
        { index: 0, fieldA: 1 },
        { index: 2, fieldA: 2 }
    ];

    const result90: TestItem<unknown>[] = result09.slice().reverse();

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual(result09);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result09);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result09);

    //9-0
    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual(result90);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result90);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result90);
});

test('В массиве присутствуют другие значения помимо number', () => {
    const testArray = [
        { index: 0, fieldA: 0 },
        { index: 1, fieldA: undefined },
        { index: 2, fieldA: false },
        { index: 3, fieldA: -1 },
        { index: 4, fieldA: null },
        { index: 5, fieldA: 'string' },
        { index: 6, fieldA: true },
        { index: 7, fieldA: '' },
        { index: 8, fieldA: 2 },
        { index: 9, fieldA: NaN },
        { index: 10, fieldA: 1 },
        { index: 11, fieldA: {} },
        { index: 12, fieldA: -2 },
        { index: 13, fieldA: Array(0) },
        { index: 14, fieldA: false }
    ];

    const result09: TestItem<unknown>[] = [
        { index: 12, fieldA: -2 },
        { index: 3, fieldA: -1 },
        { index: 0, fieldA: 0 },
        { index: 10, fieldA: 1 },
        { index: 8, fieldA: 2 }
    ];

    const result90: TestItem<unknown>[] = result09.slice().reverse();

    const resultInvalidItems = [
        { index: 1, fieldA: undefined },
        { index: 2, fieldA: false },
        { index: 4, fieldA: null },
        { index: 5, fieldA: 'string' },
        { index: 6, fieldA: true },
        { index: 7, fieldA: '' },
        { index: 9, fieldA: NaN },
        { index: 11, fieldA: {} },
        { index: 13, fieldA: Array(0) },
        { index: 14, fieldA: false }
    ];

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result09]);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    //9-0
    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual([...result90, ...resultInvalidItems]);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result90]);

    expect(sortArrayObjectNumber({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result90, ...resultInvalidItems]);
});

test('Повторяющиеся number', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: 5 },
        { index: 1, fieldA: 5 },
        { index: 2, fieldA: 5 }
    ];

    testGroupIdenticalResult(testArray, testArray);
});

test('Массив содержит только NaN', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: NaN },
        { index: 1, fieldA: NaN },
        { index: 2, fieldA: NaN }
    ];

    testGroupIdenticalResult(testArray, testArray);
});
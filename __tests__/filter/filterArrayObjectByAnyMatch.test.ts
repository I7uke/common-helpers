import { filterArrayObjectByAnyMatch } from "../../src";

interface TestItem {
    readonly index: number;
    readonly fieldA: string;
    readonly fieldB: number;
    readonly fieldC: boolean;
}

function getValuesForSearch(item: TestItem): unknown[] {
    return [item.fieldA, item.fieldB, item.fieldC];
}

function getTestArray(): TestItem[] {
    return [
        {
            index: 0,
            fieldA: 'test',
            fieldB: 10,
            fieldC: true
        },
        {
            index: 1,
            fieldA: 'TEST',
            fieldB: 5,
            fieldC: true
        },
        {
            index: 2,
            fieldA: 'string',
            fieldB: 3,
            fieldC: false
        },
        {
            index: 3,
            fieldA: 'test',
            fieldB: 5,
            fieldC: false
        },
        {
            index: 4,
            fieldA: 'STRING',
            fieldB: 10,
            fieldC: true
        }
    ];
}

test('Некорректный аргумент array', () => {
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
        expect(filterArrayObjectByAnyMatch({
            array: value,
            getValuesForSearch: () => [],
            search: []
        })).toStrictEqual([]);
    }
});

test('Некорректный аргумент search', () => {
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
        NaN,
        new Date(),
        new Date('InvalidDate'),
        undefined,
        null,
        []
    ];

    for (const value of incorrectValues) {
        expect(filterArrayObjectByAnyMatch({
            array: getTestArray(),
            getValuesForSearch: () => [],
            search: value
        })).toStrictEqual(getTestArray());
    }
});

test('Некорректный аргумент getValuesForSearch', () => {
    const incorrectValues: any[] = [
        true,
        false,
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
        expect(filterArrayObjectByAnyMatch({
            array: getTestArray(),
            getValuesForSearch: value,
            search: [true]
        })).toStrictEqual(getTestArray());
    }
});

test('Некорректные результаты getValuesForSearch', () => {
    const incorrectValues: any[] = [
        (a: any, b: any) => ({ a: a, b: b }),
        (item: TestItem) => 5,
        () => null,
        (item: TestItem) => undefined,
        () => NaN,
        (item: TestItem) => new Date(),
        () => new Date('InvalidDate'),
    ];

    for (const value of incorrectValues) {
        expect(filterArrayObjectByAnyMatch({
            array: getTestArray(),
            getValuesForSearch: value,
            search: [false]
        })).toStrictEqual([]);
    }
});

test('Пустой поиск', () => {
    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: []
    })).toStrictEqual(getTestArray());
});

test('Поиск не дал результатов', () => {
    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: ['TestTest', new Date(), 100]
    })).toStrictEqual([]);
});

test('Поиск', () => {
    const testArray = getTestArray();

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: ['test']
    })).toStrictEqual([testArray[0], testArray[3]]);

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: ['TEST', 10]
    })).toStrictEqual([testArray[0], testArray[1], testArray[4]]);

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: [5, true]
    })).toStrictEqual([testArray[0], testArray[1], testArray[3], testArray[4]]);

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: [false, true]
    })).toStrictEqual(getTestArray());

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: ['string']
    })).toStrictEqual([testArray[2]]);

    expect(filterArrayObjectByAnyMatch({
        array: getTestArray(),
        getValuesForSearch: getValuesForSearch,
        search: ['string', 'STRING']
    })).toStrictEqual([testArray[2], testArray[4]]);
});

test('Исходный массив не изменяется', () => {
    const testArray = getTestArray();
    const originalArray = getTestArray();

    filterArrayObjectByAnyMatch({
        array: testArray,
        getValuesForSearch,
        search: ['string']
    });

    expect(testArray).toStrictEqual(originalArray);
});
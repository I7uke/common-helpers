import { searchStringArrayObject } from "../../src";

interface TestItem {
    readonly index: number;
    readonly fieldA: string;
    readonly fieldB: string;
}

function emptyStringsForSearch(item: any) {
    return [];
}

function getStringsForSearch(item: TestItem): string[] {
    return [item.fieldA, item.fieldB];
}

function getTestArray(): TestItem[] {
    return [
        {
            index: 0,
            fieldA: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fieldB: 'Duis finibus nisl ut justo consequat, in aliquet libero tincidunt'
        },
        {
            index: 1,
            fieldA: 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT',
            fieldB: 'DUIS FINIBUS NISL UT JUSTO CONSEQUAT, IN ALIQUET LIBERO TINCIDUNT'
        },
        {
            index: 2,
            fieldA: 'Vivamus ullamcorper, quam id pulvinar lobortis, mi leo elementum neque, aliquet facilisis dolor odio id orci',
            fieldB: 'In cursus neque vitae mauris placerat ultrices nec eu dui. Sed sagittis fringilla lacus eget eleifend. Praesent volutpat egestas enim, ut molestie TeSt magna vulputate ut. Morbi ac iaculis augue, cursus efficitur nisi. Sed efficitur leo a elit gravida, vel iaculis risus dictum. Pellentesque lobortis justo ut tellus sodales bibendum. Nulla ut aliquet neque, at mollis ipsum. Quisque scelerisque dolor et est interdum finibus. Maecenas vitae suscipit mi. Pellentesque eget eros mollis, congue orci pharetra, fringilla nisi. Mauris facilisis magna eget pellentesque convallis. Donec feugiat fermentum finibus. Aliquam porttitor maximus varius'
        },
        {
            index: 3,
            fieldA: 'test',
            fieldB: '1234567890'
        },
        {
            index: 4,
            fieldA: '123 456 789',
            fieldB: 'Duis    in   elit in    sapien volutpat sodales.'
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
        expect(searchStringArrayObject({
            array: value,
            getStringsForSearch: emptyStringsForSearch,
            search: ''
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
        expect(searchStringArrayObject({
            array: getTestArray(),
            getStringsForSearch: emptyStringsForSearch,
            search: value
        })).toStrictEqual(getTestArray());
    }
});

test('Некорректный аргумент getStringsForSearch', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => [],
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
        expect(searchStringArrayObject({
            array: getTestArray(),
            getStringsForSearch: value,
            search: ''
        })).toStrictEqual(getTestArray());
    }
});

test('Пустой поиск', () => {
    const testStrings: string[] = ['', ' ', '   '];
    for (const value of testStrings) {
        expect(searchStringArrayObject({
            array: getTestArray(),
            getStringsForSearch: getStringsForSearch,
            search: value
        })).toStrictEqual(getTestArray());
    }
});

test('Поиск не дал результатов', () => {
    const testStrings: string[] = ['TestTest', 'testString', 'test_123'];
    for (const value of testStrings) {
        expect(searchStringArrayObject({
            array: getTestArray(),
            getStringsForSearch: getStringsForSearch,
            search: value
        })).toStrictEqual([]);
    }
});

test('Поиск без учёта регистра', () => {
    const testArray = getTestArray();

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: 'Lorem ipsum dolor'
    })).toStrictEqual([testArray[0], testArray[1]]);

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: 'JUSTO CONSEQUAT'
    })).toStrictEqual([testArray[0], testArray[1]]);

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: 'teST'
    })).toStrictEqual([testArray[2], testArray[3]]);
});

test('Поиск строк', () => {
    const testArray = getTestArray();

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: '1234567890'
    })).toStrictEqual([testArray[3]]);

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: '123'
    })).toStrictEqual([testArray[3], testArray[4]]);

    expect(searchStringArrayObject({
        array: getTestArray(),
        getStringsForSearch: getStringsForSearch,
        search: 'elit in'
    })).toStrictEqual([testArray[4]]);
});

test('Некорректные результаты getStringsForSearch', () => {
    const incorrectValues: any[] = [
        (item: TestItem) => [item.index],
        () => [1, 2, 3, 4, 5],
        (item: TestItem) => [1, 2, null, undefined, NaN],
        (item: TestItem) => ['', [], new Date()],
        () => [],
        (a: any, b: any) => ({ a: a, b: b }),
        (item: TestItem) => 5,
        () => null,
        (item: TestItem) => undefined,
        () => NaN,
        (item: TestItem) => new Date(),
        () => new Date('InvalidDate'),
    ];

    for (const value of incorrectValues) {
        expect(searchStringArrayObject({
            array: getTestArray(),
            getStringsForSearch: value,
            search: 'Lorem ipsum dolor'
        })).toStrictEqual([]);
    }
});

test('Поиск среди смешанных типов', () => {
    const testArray = getTestArray();

    expect(searchStringArrayObject({
        array: testArray,
        getStringsForSearch: (item) => [null, 123, item.fieldA, undefined] as any,
        search: 'Lorem ipsum'
    })).toStrictEqual([testArray[0], testArray[1]]);
});

test('Исходный массив не изменяется', () => {
    const testArray = getTestArray();
    const originalArray = [...testArray];

    searchStringArrayObject({
        array: testArray,
        getStringsForSearch,
        search: 'Lorem'
    });

    expect(testArray).toStrictEqual(originalArray);
});
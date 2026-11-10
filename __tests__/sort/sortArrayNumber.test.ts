import { sortArrayNumber } from "../../src";

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayNumber(array, '0-9')).toStrictEqual(result);
    expect(sortArrayNumber(array, '0-9', 'first')).toStrictEqual(result);
    expect(sortArrayNumber(array, '0-9', 'last')).toStrictEqual(result);

    expect(sortArrayNumber(array, '9-0')).toStrictEqual(result);
    expect(sortArrayNumber(array, '9-0', 'first')).toStrictEqual(result);
    expect(sortArrayNumber(array, '9-0', 'last')).toStrictEqual(result);
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
    const testArray = [null, true, {}, '', undefined, false, [], 'string'];
    testGroupIdenticalResult(testArray, testArray);
});

test('Массив уже отсортирован', () => {
    const testArray09 = [-2, -1, 0, 1, 2];
    const testArray90 = [2, 1, 0, -1, -2];

    expect(sortArrayNumber(testArray09, '0-9')).toStrictEqual(testArray09);
    expect(sortArrayNumber(testArray09, '0-9', 'first')).toStrictEqual(testArray09);
    expect(sortArrayNumber(testArray09, '0-9', 'last')).toStrictEqual(testArray09);

    expect(sortArrayNumber(testArray90, '9-0')).toStrictEqual(testArray90);
    expect(sortArrayNumber(testArray90, '9-0', 'first')).toStrictEqual(testArray90);
    expect(sortArrayNumber(testArray90, '9-0', 'last')).toStrictEqual(testArray90);
});

test('Массив только number', () => {
    const testArray = [1, -2, 2, -1, 0];
    const result09 = [-2, -1, 0, 1, 2];
    const result90 = result09.slice().reverse();

    expect(sortArrayNumber(testArray, '0-9')).toStrictEqual(result09);
    expect(sortArrayNumber(testArray, '0-9', 'first')).toStrictEqual(result09);
    expect(sortArrayNumber(testArray, '0-9', 'last')).toStrictEqual(result09);

    expect(sortArrayNumber(testArray, '9-0')).toStrictEqual(result90);
    expect(sortArrayNumber(testArray, '9-0', 'first')).toStrictEqual(result90);
    expect(sortArrayNumber(testArray, '9-0', 'last')).toStrictEqual(result90);
});

test('В массиве присутствуют другие значения помимо number', () => {
    const testArray = [0, undefined, false, -1, null, 'string', true, '', 2, NaN, 1, {}, -2, [], false];
    const result09 = [-2, -1, 0, 1, 2];
    const result90 = result09.slice().reverse();
    const resultInvalidItems = [undefined, false, null, 'string', true, '', NaN, {}, [], false];

    expect(sortArrayNumber(testArray, '0-9')).toStrictEqual([...result09, ...resultInvalidItems]);
    expect(sortArrayNumber(testArray, '0-9', 'first')).toStrictEqual([...resultInvalidItems, ...result09]);
    expect(sortArrayNumber(testArray, '0-9', 'last')).toStrictEqual([...result09, ...resultInvalidItems]);

    expect(sortArrayNumber(testArray, '9-0')).toStrictEqual([...result90, ...resultInvalidItems]);
    expect(sortArrayNumber(testArray, '9-0', 'first')).toStrictEqual([...resultInvalidItems, ...result90]);
    expect(sortArrayNumber(testArray, '9-0', 'last')).toStrictEqual([...result90, ...resultInvalidItems]);
});
test('Повторяющиеся number', () => {
    const testArray = [5, 5, 5];
    testGroupIdenticalResult(testArray, testArray);
});

test('Массив содержит только NaN', () => {
    const testArray = [NaN, NaN, NaN];
    testGroupIdenticalResult(testArray, testArray);
});

test('Исходный массив не мутирует', () => {
    const getTestArray = () => [0, 1, 2];

    const testArray = getTestArray();
    const results: unknown[][] = [];

    // 0-9
    results.push(sortArrayNumber(testArray, '0-9'));
    results.push(sortArrayNumber(testArray, '0-9', 'first'));
    results.push(sortArrayNumber(testArray, '0-9', 'last'));
    // 9-0
    results.push(sortArrayNumber(testArray, '9-0'));
    results.push(sortArrayNumber(testArray, '9-0', 'first'));
    results.push(sortArrayNumber(testArray, '9-0', 'last'));

    for (const array of results) {
        expect(array === testArray).toStrictEqual(false);
    }

    expect(testArray).toStrictEqual(getTestArray());
});
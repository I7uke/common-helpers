import { sortArrayDate } from "../../src";

const getTestDate1 = () => new Date(1730408400000);
const getTestDate2 = () => new Date(1730494800000);
const getTestDate3 = () => new Date(1730581200000);
const getTestDate4 = () => new Date(1730667600000);
const getTestDate5 = () => new Date(1730754000000);
const getTestInvalidDate = () => new Date('InvalidDate');

function testGroupIdenticalResult(array: unknown[], result: unknown[]) {
    expect(sortArrayDate(array, '0-9')).toStrictEqual(result);
    expect(sortArrayDate(array, '0-9', 'first')).toStrictEqual(result);
    expect(sortArrayDate(array, '0-9', 'last')).toStrictEqual(result);

    expect(sortArrayDate(array, '9-0')).toStrictEqual(result);
    expect(sortArrayDate(array, '9-0', 'first')).toStrictEqual(result);
    expect(sortArrayDate(array, '9-0', 'last')).toStrictEqual(result);
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

test('В массиве нет дат', () => {
    const testArray = [0, null, true, {}, '', undefined, false, 5, NaN, 'string'];
    testGroupIdenticalResult(testArray, testArray);
});

test('Массив уже отсортирован', () => {
    const testArray09 = [getTestDate1(), getTestDate2(), getTestDate3(), getTestDate4(), getTestDate5()];
    const testArray90 = [getTestDate5(), getTestDate4(), getTestDate3(), getTestDate2(), getTestDate1()];

    expect(sortArrayDate(testArray09, '0-9')).toStrictEqual(testArray09);
    expect(sortArrayDate(testArray09, '0-9', 'first')).toStrictEqual(testArray09);
    expect(sortArrayDate(testArray09, '0-9', 'last')).toStrictEqual(testArray09);

    expect(sortArrayDate(testArray90, '9-0')).toStrictEqual(testArray90);
    expect(sortArrayDate(testArray90, '9-0', 'first')).toStrictEqual(testArray90);
    expect(sortArrayDate(testArray90, '9-0', 'last')).toStrictEqual(testArray90);
});

test('Массив только Date', () => {
    const testArray = [getTestDate2(), getTestDate4(), getTestDate5(), getTestDate1(), getTestDate3()];
    const result09 = [getTestDate1(), getTestDate2(), getTestDate3(), getTestDate4(), getTestDate5()];
    const result90 = [getTestDate5(), getTestDate4(), getTestDate3(), getTestDate2(), getTestDate1()];

    expect(sortArrayDate(testArray, '0-9')).toStrictEqual(result09);
    expect(sortArrayDate(testArray, '0-9', 'first')).toStrictEqual(result09);
    expect(sortArrayDate(testArray, '0-9', 'last')).toStrictEqual(result09);

    expect(sortArrayDate(testArray, '9-0')).toStrictEqual(result90);
    expect(sortArrayDate(testArray, '9-0', 'first')).toStrictEqual(result90);
    expect(sortArrayDate(testArray, '9-0', 'last')).toStrictEqual(result90);
});

test('В массиве присутствуют другие значения помимо Date', () => {
    const testArray = [0, undefined, getTestDate3(), false, null, 'string', true, '', NaN, getTestDate1(), {}, 5, getTestDate2(), [], false];
    const result09 = [getTestDate1(), getTestDate2(), getTestDate3()];
    const result90 = [getTestDate3(), getTestDate2(), getTestDate1()];
    const resultInvalidItems = [0, undefined, false, null, 'string', true, '', NaN, {}, 5, [], false];

    expect(sortArrayDate(testArray, '0-9')).toStrictEqual([...result09, ...resultInvalidItems]);
    expect(sortArrayDate(testArray, '0-9', 'first')).toStrictEqual([...resultInvalidItems, ...result09]);
    expect(sortArrayDate(testArray, '0-9', 'last')).toStrictEqual([...result09, ...resultInvalidItems]);

    expect(sortArrayDate(testArray, '9-0')).toStrictEqual([...result90, ...resultInvalidItems]);
    expect(sortArrayDate(testArray, '9-0', 'first')).toStrictEqual([...resultInvalidItems, ...result90]);
    expect(sortArrayDate(testArray, '9-0', 'last')).toStrictEqual([...result90, ...resultInvalidItems]);
});

test('Повторяющиеся Date', () => {
    const testArray = [getTestDate1(), getTestDate1(), getTestDate1()];

    expect(sortArrayDate(testArray, '0-9')).toStrictEqual(testArray);
    expect(sortArrayDate(testArray, '0-9', 'first')).toStrictEqual(testArray);
    expect(sortArrayDate(testArray, '0-9', 'last')).toStrictEqual(testArray);

    expect(sortArrayDate(testArray, '9-0')).toStrictEqual(testArray);
    expect(sortArrayDate(testArray, '9-0', 'first')).toStrictEqual(testArray);
    expect(sortArrayDate(testArray, '9-0', 'last')).toStrictEqual(testArray);
});

test('В массиве присутствует невалидная Date', () => {
    const invalidDate1 = getTestInvalidDate();
    const invalidDate2 = getTestInvalidDate();

    const testArray = [getTestDate3(), invalidDate1, getTestDate1(), invalidDate2, getTestDate2()];
    const result09 = [getTestDate1(), getTestDate2(), getTestDate3()];
    const result90 = [getTestDate3(), getTestDate2(), getTestDate1()];
    const resultInvalidItems =[invalidDate1, invalidDate2];

    expect(sortArrayDate(testArray, '0-9')).toStrictEqual([...result09, ...resultInvalidItems]);
    expect(sortArrayDate(testArray, '0-9', 'first')).toStrictEqual([...resultInvalidItems, ...result09]);
    expect(sortArrayDate(testArray, '0-9', 'last')).toStrictEqual([...result09, ...resultInvalidItems]);
    expect(sortArrayDate(testArray, '9-0')).toStrictEqual([...result90, ...resultInvalidItems]);
    expect(sortArrayDate(testArray, '9-0', 'first')).toStrictEqual([...resultInvalidItems, ...result90]);
    expect(sortArrayDate(testArray, '9-0', 'last')).toStrictEqual([...result90, ...resultInvalidItems]);
});

test('Исходный массив не мутирует', () => {
    const getTestArray = () => [getTestDate1(), getTestDate2(), getTestDate3()];

    const testArray = getTestArray();
    const results: unknown[][] = [];

    // 0-9
    results.push(sortArrayDate(testArray, '0-9'));
    results.push(sortArrayDate(testArray, '0-9', 'first'));
    results.push(sortArrayDate(testArray, '0-9', 'last'));
    // 9-0
    results.push(sortArrayDate(testArray, '9-0'));
    results.push(sortArrayDate(testArray, '9-0', 'first'));
    results.push(sortArrayDate(testArray, '9-0', 'last'));

    for (const array of results) {
        expect(array === testArray).toStrictEqual(false);
    }

    expect(testArray).toStrictEqual(getTestArray());
});
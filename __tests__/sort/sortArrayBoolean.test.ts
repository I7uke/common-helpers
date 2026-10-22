import { sortArrayBoolean } from "../../src";

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayBoolean(array, 'true-false')).toStrictEqual(result);
    expect(sortArrayBoolean(array, 'true-false', 'first')).toStrictEqual(result);
    expect(sortArrayBoolean(array, 'true-false', 'last')).toStrictEqual(result);

    expect(sortArrayBoolean(array, 'false-true')).toStrictEqual(result);
    expect(sortArrayBoolean(array, 'false-true', 'first')).toStrictEqual(result);
    expect(sortArrayBoolean(array, 'false-true', 'last')).toStrictEqual(result);
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
    const getTestArray = () => [0, null, {}, '', undefined, 5, NaN, 'string'];
    testGroupIdenticalResult(getTestArray(), getTestArray());
});

test('Массив уже отсортирован', () => {
    const getTestArray1 = () => [true, true, false];
    const getTestArray2 = () => [false, false, true];

    expect(sortArrayBoolean(getTestArray1(), 'true-false')).toStrictEqual(getTestArray1());
    expect(sortArrayBoolean(getTestArray1(), 'true-false', 'first')).toStrictEqual(getTestArray1());
    expect(sortArrayBoolean(getTestArray1(), 'true-false', 'last')).toStrictEqual(getTestArray1());

    expect(sortArrayBoolean(getTestArray2(), 'false-true')).toStrictEqual(getTestArray2());
    expect(sortArrayBoolean(getTestArray2(), 'false-true', 'first')).toStrictEqual(getTestArray2());
    expect(sortArrayBoolean(getTestArray2(), 'false-true', 'last')).toStrictEqual(getTestArray2());
});

test('Массив только boolean', () => {
    const getTestArray = () => [false, true, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];

    expect(sortArrayBoolean(getTestArray(), 'true-false')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'first')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'last')).toStrictEqual(getResultTrueFalse());

    expect(sortArrayBoolean(getTestArray(), 'false-true')).toStrictEqual(getResultFalseTrue());
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'first')).toStrictEqual(getResultFalseTrue());
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'last')).toStrictEqual(getResultFalseTrue());
});

test('В массиве присутствуют другие значения помимо boolean 1', () => {
    const getTestArray = () => [0, false, '', true, 'string', 5, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];
    const getResultInvalidItems = () => [0, '', 'string', 5];

    expect(sortArrayBoolean(getTestArray(), 'true-false')).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResultTrueFalse()]);
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'last')).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);

    expect(sortArrayBoolean(getTestArray(), 'false-true')).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResultFalseTrue()]);
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'last')).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);
});

test('В массиве присутствуют другие значения помимо boolean 2', () => {
    const getTestArray = () => [0, false, NaN, 'string', true, null, {},  true, undefined, {}, false, '', 5, false];

    const getResultTrueFalse = () => [true, true, false, false, false];
    const getResultFalseTrue = () => [false, false, false, true, true];
    const getResultInvalidItems = () => [0, NaN, 'string', null, {}, undefined, {}, '', 5];;

    expect(sortArrayBoolean(getTestArray(), 'true-false')).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResultTrueFalse()]);
    expect(sortArrayBoolean(getTestArray(), 'true-false', 'last')).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);

    expect(sortArrayBoolean(getTestArray(), 'false-true')).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResultFalseTrue()]);
    expect(sortArrayBoolean(getTestArray(), 'false-true', 'last')).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);
});

test('Повторяющиеся true и false', () => {
    const getTestArrayTrue = () => [true, true, true];
    const getTestArrayFalse = () => [false, false, false];

    expect(sortArrayBoolean(getTestArrayTrue(), 'true-false')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBoolean(getTestArrayTrue(), 'true-false', 'first')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBoolean(getTestArrayTrue(), 'true-false', 'last')).toStrictEqual(getTestArrayTrue());

    expect(sortArrayBoolean(getTestArrayFalse(), 'true-false')).toStrictEqual(getTestArrayFalse());
    expect(sortArrayBoolean(getTestArrayFalse(), 'true-false', 'first')).toStrictEqual(getTestArrayFalse());
    expect(sortArrayBoolean(getTestArrayFalse(), 'true-false', 'last')).toStrictEqual(getTestArrayFalse());

    expect(sortArrayBoolean(getTestArrayTrue(), 'false-true')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBoolean(getTestArrayTrue(), 'false-true', 'first')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBoolean(getTestArrayTrue(), 'false-true', 'last')).toStrictEqual(getTestArrayTrue());

    expect(sortArrayBoolean(getTestArrayFalse(), 'false-true')).toStrictEqual(getTestArrayFalse());
    expect(sortArrayBoolean(getTestArrayFalse(), 'false-true', 'first')).toStrictEqual(getTestArrayFalse());
    expect(sortArrayBoolean(getTestArrayFalse(), 'false-true', 'last')).toStrictEqual(getTestArrayFalse());
});
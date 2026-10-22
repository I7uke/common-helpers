import { sortArrayBooleanTruthy } from "../../src";

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayBooleanTruthy(array, 'true-false')).toStrictEqual(result);
    expect(sortArrayBooleanTruthy(array, 'false-true')).toStrictEqual(result);
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
    const getTestArray = () => [0, '', 5, 'string'];
    const getResultTrueFalse = () => [5, 'string', 0, ''];
    const getResultFalseTrue = () => [0, '', 5, 'string'];

    expect(sortArrayBooleanTruthy(getTestArray(), 'true-false')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBooleanTruthy(getTestArray(), 'false-true')).toStrictEqual(getResultFalseTrue());
});

test('Массив уже отсортирован', () => {
    const getTestArray1 = () => [true, true, false];
    const getTestArray2 = () => [false, false, true];

    expect(sortArrayBooleanTruthy(getTestArray1(), 'true-false')).toStrictEqual(getTestArray1());
    expect(sortArrayBooleanTruthy(getTestArray2(), 'false-true')).toStrictEqual(getTestArray2());
});

test('Массив только boolean', () => {
    const getTestArray = () => [false, true, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];

    expect(sortArrayBooleanTruthy(getTestArray(), 'true-false')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBooleanTruthy(getTestArray(), 'false-true')).toStrictEqual(getResultFalseTrue());
});

test('В массиве присутствуют другие значения помимо boolean', () => {
    const getTestArray = () => [0, false, '', true, 'string', 5, false];
    const getResultTrueFalse = () => [true, 'string', 5, 0, false, '', false];
    const getResultFalseTrue = () => [0, false, '', false, true, 'string', 5];

    expect(sortArrayBooleanTruthy(getTestArray(), 'true-false')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBooleanTruthy(getTestArray(), 'false-true')).toStrictEqual(getResultFalseTrue());
});

test('Повторяющиеся true и false', () => {
    const getTestArrayTrue = () => [true, true, true];
    const getTestArrayFalse = () => [false, false, false];

    expect(sortArrayBooleanTruthy(getTestArrayTrue(), 'true-false')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBooleanTruthy(getTestArrayFalse(), 'true-false')).toStrictEqual(getTestArrayFalse());

    expect(sortArrayBooleanTruthy(getTestArrayTrue(), 'false-true')).toStrictEqual(getTestArrayTrue());
    expect(sortArrayBooleanTruthy(getTestArrayFalse(), 'false-true')).toStrictEqual(getTestArrayFalse());
});

test('Falsy и truthy значения разных типов', () => {
    const getTestArray = () => [null, 'string', undefined, 1, NaN, false, {}, 0, ''];
    const getResultTrueFalse = () => ['string', 1, {}, null, undefined, NaN, false, 0, ''];
    const getResultFalseTrue = () => [null, undefined, NaN, false, 0, '', 'string', 1, {}];

    expect(sortArrayBooleanTruthy(getTestArray(), 'true-false')).toStrictEqual(getResultTrueFalse());
    expect(sortArrayBooleanTruthy(getTestArray(), 'false-true')).toStrictEqual(getResultFalseTrue());
});
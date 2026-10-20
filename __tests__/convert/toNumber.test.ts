import { toNumber } from "../../src";

type Value = string | number | Date | boolean | undefined | null;

function testValidValue(value: Value, result: Value) {
    expect(toNumber(value)).toStrictEqual(result);
    expect(toNumber(value, undefined)).toStrictEqual(result);
    expect(toNumber(value, null)).toStrictEqual(result);
    expect(toNumber(value, -1)).toStrictEqual(result);
    expect(toNumber(value, -0)).toStrictEqual(result);
    expect(toNumber(value, 0)).toStrictEqual(result);
    expect(toNumber(value, 1)).toStrictEqual(result);
    expect(toNumber(value, 7)).toStrictEqual(result);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        'string',
        '  1  2',
        '  1  2 3  ',
        NaN,
        new Date('InvalidDate'),
    ];

    for (const value of incorrectValues) {
        expect(toNumber(value)).toStrictEqual(0);
        expect(toNumber(value, undefined)).toStrictEqual(undefined);
        expect(toNumber(value, null)).toStrictEqual(null);
        expect(toNumber(value, 7)).toStrictEqual(7);
    }
});

test('Числа', () => {
    testValidValue(-5, -5);
    testValidValue(0, 0);
    testValidValue(5, 5);
    testValidValue(100, 100);
});

test('Строки', () => {
    testValidValue('', 0);
    testValidValue(' ', 0);
    testValidValue('   ', 0);
    testValidValue('-5', -5);
    testValidValue('0', 0);
    testValidValue('5', 5);
    testValidValue('100', 100);
    testValidValue('-123.456', -123.456);
    testValidValue('123.456', 123.456);
    testValidValue(' -5', -5);
    testValidValue(' -5 ', -5);
    testValidValue('  -5  ', -5);
    testValidValue('    7', 7);
    testValidValue('7   ', 7);
    testValidValue('    7   ', 7);
});

test('Даты', () => {
    const testDate1: number = + new Date();
    const testDate2: number = 1719601954000;
    const testDate3: number = 1719525723000;

    testValidValue(new Date(testDate1), testDate1);
    testValidValue(new Date(testDate2), testDate2);
    testValidValue(new Date(testDate3), testDate3);
});

test('null и undefined', () => {
    testValidValue(null, 0);
    testValidValue(undefined, 0);
});

test('true и false', () => {
    testValidValue(true, 1);
    testValidValue(false, 0);
});
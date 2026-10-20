import { toDate } from "../../src";

const getTestDate1 = () => new Date(1719601954000);
const getTestDate2 = () => new Date(1719525723000);

function testValidValue(value: number | string, result: Date) {
    const defaultValue: number = + new Date();
    expect(toDate(value)).toStrictEqual(result);
    expect(toDate(value, undefined)).toStrictEqual(result);
    expect(toDate(value, null)).toStrictEqual(result);
    expect(toDate(value, new Date(defaultValue))).toStrictEqual(result);
}

test('Некорректные значения', () => {
    const fakeDate = {
        [Symbol.toStringTag]: 'Date',
        getTime: () => 123,
    };
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        '',
        ' ',
        'string',
        NaN,
        new Date('InvalidDate'),
        undefined,
        null,
        fakeDate
    ];
    const defaultTimestamp: number = + new Date();
    for (const value of incorrectValues) {
        expect(toDate(value)).toStrictEqual(undefined);
        expect(toDate(value, undefined)).toStrictEqual(undefined);
        expect(toDate(value, null)).toStrictEqual(null);
        expect(toDate(value, new Date(defaultTimestamp))).toStrictEqual(new Date(defaultTimestamp));
    }
});

test('Числа', () => {
    testValidValue(+getTestDate1(), getTestDate1());
    testValidValue(+getTestDate1(), getTestDate1());
    testValidValue(+getTestDate1(), getTestDate1());

    testValidValue(+getTestDate2(), getTestDate2());
    testValidValue(+getTestDate2(), getTestDate2());
    testValidValue(+getTestDate2(), getTestDate2());
});

test('Строки', () => {
    testValidValue(getTestDate1().toISOString(), getTestDate1());
    testValidValue(getTestDate1().toISOString(), getTestDate1());
    testValidValue(getTestDate1().toISOString(), getTestDate1());

    testValidValue(getTestDate2().toISOString(), getTestDate2());
    testValidValue(getTestDate2().toISOString(), getTestDate2());
    testValidValue(getTestDate2().toISOString(), getTestDate2());
});
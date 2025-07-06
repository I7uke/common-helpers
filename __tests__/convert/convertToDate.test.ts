import convertToDate from "../../src/convert/convertToDate";

const getTestDate1 = () => new Date(1719601954000);
const getTestDate2 = () => new Date(1719525723000);

function testValidValue(value: number | string, result: Date) {
    const defaultValue: number = + new Date();
    expect(convertToDate(value)).toStrictEqual(result);
    expect(convertToDate(value, undefined)).toStrictEqual(result);
    expect(convertToDate(value, null)).toStrictEqual(result);
    expect(convertToDate(value, new Date(defaultValue))).toStrictEqual(result);
}

test('Некорректные значения', () => {
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
    ];
    const defaultValue: number = + new Date();
    for (const value of incorrectValues) {
        expect(convertToDate(value)).toStrictEqual(undefined);
        expect(convertToDate(value, undefined)).toStrictEqual(undefined);
        expect(convertToDate(value, null)).toStrictEqual(null);
        expect(convertToDate(value, new Date(defaultValue))).toStrictEqual(new Date(defaultValue));
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
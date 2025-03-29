import validationDate from "../../src/validators/validationDate";

const getTestValidDate = () => new Date(1115255105005);
const getTestValidDate2 = () => new Date(1183777627007);

function testValidValue(date: Date, result: Date) {
    const defaultValue: number = + new Date();
    expect(validationDate(date)).toStrictEqual(result);
    expect(validationDate(date, undefined)).toStrictEqual(result);
    expect(validationDate(date, null)).toStrictEqual(result);
    expect(validationDate(date, new Date(defaultValue))).toStrictEqual(result);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        0,
        10,
        '',
        ' ',
        'string',
        '123',
        NaN,
        new Date('InvalidDate'),
        undefined,
        null,
    ];
    const defaultValue: number = + new Date();
    for (const value of incorrectValues) {
        expect(validationDate(value)).toStrictEqual(undefined);
        expect(validationDate(value, undefined)).toStrictEqual(undefined);
        expect(validationDate(value, null)).toStrictEqual(null);
        expect(validationDate(value, new Date(defaultValue))).toStrictEqual(new Date(defaultValue));
    }
});

test('Корректная дата', () => {
    const currentDate = +new Date();
    testValidValue(getTestValidDate(), getTestValidDate());
    testValidValue(getTestValidDate2(), getTestValidDate2());
    testValidValue(new Date(currentDate), new Date(currentDate));
});
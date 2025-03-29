import validationNumber from "../../src/validators/validationNumber";

function testValidValue(number: number, result: number) {
    expect(validationNumber(number)).toStrictEqual(result);
    expect(validationNumber(number, undefined)).toStrictEqual(result);
    expect(validationNumber(number, null)).toStrictEqual(result);
    expect(validationNumber(number, 7)).toStrictEqual(result);
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
        '123',
        NaN,
        Number('string'),
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(validationNumber(value)).toStrictEqual(0);
        expect(validationNumber(value, undefined)).toStrictEqual(undefined);
        expect(validationNumber(value, null)).toStrictEqual(null);
        expect(validationNumber(value, 7)).toStrictEqual(7);
    }
});

test('Корректное число', () => {
    testValidValue(-100, -100);
    testValidValue(-1, -1);
    testValidValue(0, 0);
    testValidValue(-0, -0);
    testValidValue(5, 5);
    testValidValue(125, 125);
});
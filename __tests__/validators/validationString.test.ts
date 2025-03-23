import validationString from "../../src/validators/validationString";

function testValidValue(string: string, result: string) {
    expect(validationString(string)).toStrictEqual(result);
    expect(validationString(string, undefined)).toStrictEqual(result);
    expect(validationString(string, null)).toStrictEqual(result);
    expect(validationString(string, 'string defaultValue')).toStrictEqual(result);
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
        NaN,
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(validationString(value)).toStrictEqual('');
        expect(validationString(value, undefined)).toStrictEqual(undefined);
        expect(validationString(value, null)).toStrictEqual(null);
        expect(validationString(value, 'string defaultValue')).toStrictEqual('string defaultValue');
    }
});

test('Корректная строка', () => {
    testValidValue('', '');
    testValidValue('test', 'test');
    testValidValue('123', '123');
    testValidValue('Lorem ipsum dolor sit amet, solum summo platonem has ea', 'Lorem ipsum dolor sit amet, solum summo platonem has ea');
});
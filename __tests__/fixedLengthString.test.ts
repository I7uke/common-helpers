import fixedLengthString from "../src/fixedLengthString";

function testValidValue(string: string, result: string, maxLength: number, endOfString?: string) {
    expect(fixedLengthString({
        value: string,
        maxLength: maxLength,
        endOfString: endOfString
    })).toStrictEqual(result);

    expect(fixedLengthString({
        value: string,
        maxLength: maxLength,
        endOfString: endOfString,
        defaultValue: undefined
    })).toStrictEqual(result);

    expect(fixedLengthString({
        value: string,
        maxLength: maxLength,
        endOfString: endOfString,
        defaultValue: null
    })).toStrictEqual(result);

    expect(fixedLengthString({
        value: string,
        maxLength: maxLength,
        endOfString: endOfString,
        defaultValue: 'string defaultValue'
    })).toStrictEqual(result);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        -5,
        0,
        10,
        NaN,
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(fixedLengthString({
            value: value,
            maxLength: 5
        })).toStrictEqual('');

        expect(fixedLengthString({
            value: value,
            maxLength: 5,
            defaultValue: undefined
        })).toStrictEqual(undefined);

        expect(fixedLengthString({
            value: value,
            maxLength: 5,
            defaultValue: null
        })).toStrictEqual(null)

        expect(fixedLengthString({
            value: value,
            maxLength: 5,
            defaultValue: 'string defaultValue'
        })).toStrictEqual('string defaultValue')
    }
});

test('Некорректные значения maxLength', () => {
    testValidValue('', '', -1);
    testValidValue('12345', '12345', -1);
    testValidValue('12345', '12345', 0);
    testValidValue('12345', '12345', 0, '');
    testValidValue('12345', '12345', 0, '***');
    testValidValue('12345', '12345', NaN);
    testValidValue('12345', '12345', 'test' as any);
    testValidValue('12345', '12345', undefined as any);
    testValidValue('12345', '12345', null as any);
});

test('Корректная строка', () => {
    testValidValue('', '', 5);
    testValidValue('12345', '123...', 3);
    testValidValue('123456789', '12345...', 5);
    testValidValue('12345', '123', 3, '');
    testValidValue('123456789', '12345', 5, '');
    testValidValue('12345', '123***', 3, '***');
    testValidValue('123456789', '12345 ***', 5, ' ***');
    testValidValue('12345', '123End Of String', 3, 'End Of String');
    testValidValue('123456789', '12345end Of string', 5, 'end Of string');
    testValidValue('12345', '12345', 10);
    testValidValue('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu', 'Lorem...', 6);
    testValidValue('string      ', 'string...', 9);
    testValidValue('string      ', 'string---', 9, '---');
});

import fixedLengthString from "../../src/misc/fixedLengthString";

function testValidValue(string: string, maxLength: number, result: string, omission?: string) {
    expect(fixedLengthString({
        string: string,
        maxLength: maxLength,
        omission: omission,
    })).toStrictEqual(result);

    expect(fixedLengthString({
        string: string,
        maxLength: maxLength,
        omission: omission,
        defaultValue: undefined
    })).toStrictEqual(result);

    expect(fixedLengthString({
        string: string,
        maxLength: maxLength,
        omission: omission,
        defaultValue: null
    })).toStrictEqual(result);

    expect(fixedLengthString({
        string: string,
        maxLength: maxLength,
        omission: omission,
        defaultValue: 'defaultValue'
    })).toStrictEqual(result);
}

test('Некорректные значения строки', () => {
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
        new Date('InvalidDate'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(fixedLengthString({
            string: value,
            maxLength: 5
        })).toStrictEqual('');

        expect(fixedLengthString({
            string: value,
            maxLength: 5,
            defaultValue: undefined
        })).toStrictEqual(undefined);

        expect(fixedLengthString({
            string: value,
            maxLength: 5,
            defaultValue: null
        })).toStrictEqual(null);

        expect(fixedLengthString({
            string: value,
            maxLength: 5,
            defaultValue: 'defaultValue'
        })).toStrictEqual('defaultValue');
    }
});

test('Некорректные значения maxLength', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        -5,
        0,
        NaN,
        new Date('InvalidDate'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(fixedLengthString({
            string: '12345',
            maxLength: value
        })).toStrictEqual('12345');

        expect(fixedLengthString({
            string: '12345',
            maxLength: value,
            defaultValue: undefined
        })).toStrictEqual('12345');

        expect(fixedLengthString({
            string: '12345',
            maxLength: value,
            defaultValue: null
        })).toStrictEqual('12345');

        expect(fixedLengthString({
            string: '12345',
            maxLength: value,
            defaultValue: 'defaultValue'
        })).toStrictEqual('12345');
    }

    expect(fixedLengthString({
        string: '12345',
        maxLength: 2.5,
        defaultValue: 'defaultValue'
    })).toStrictEqual('12');

    expect(fixedLengthString({
        string: '12345',
        maxLength: 3.7,
        defaultValue: 'defaultValue'
    })).toStrictEqual('123');
});

test('Корректная строка', () => {
    testValidValue('12345', 10, '12345');
    testValidValue('12345', 5, '12345');
    testValidValue('12345', 4, '1234');
    testValidValue('12345', 3, '123');
    testValidValue('12345', 2, '12');
    testValidValue('12345', 1, '1');
    testValidValue('12345', 0, '12345');
    testValidValue('12345', -1, '12345');
    testValidValue('12 345 678', 3, '12');
    testValidValue('12 345 678', 7, '12 345');
});

test('Корректная строка с omission', () => {
    testValidValue('12345', 10, '12345', '...');
    testValidValue('12345', 5, '12345', '...');
    testValidValue('12345', 4, '1234...', '...');
    testValidValue('12345', 3, '123***', '***');
    testValidValue('12345', 2, '12 more', ' more');
    testValidValue('12345', 1, '1 далее', ' далее');
    testValidValue('12345', 0, '12345', '...');
    testValidValue('12345', -1, '12345', '...');
    testValidValue('12 345 678', 3, '12---', '---');
    testValidValue('12 345 678', 7, '12 345  ...', '  ...');
});
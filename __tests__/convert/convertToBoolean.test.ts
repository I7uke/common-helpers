import convertToBoolean from "../../src/convert/convertToBoolean";

//#region force
test('force - Истинные значения', () => {
    const incorrectValues: any[] = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [],
        ' ',
        'true',
        '   true  ',
        'tRuE',
        'string',
        -5,
        1,
        5,
        100,
        new Date('InvalidDate'),
        new Date()
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean.force(value)).toStrictEqual(true);
    }
});

test('force - Ложные значения', () => {
    const incorrectValues: any[] = [
        null,
        undefined,
        false,
        NaN,
        0,
        -0,
        0n,
        '',
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean.force(value)).toStrictEqual(false);
    }
});

//#endregion

//#region stringValue
test('stringValue - Некорректные значения', () => {
    const incorrectValues: any[] = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [],
        ' ',
        'string',
        -5,
        1,
        5,
        100,
        new Date('InvalidDate'),
        new Date(),
        null,
        undefined,
        false,
        NaN,
        0,
        -0,
        0n,
        ''
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean.stringValue(value)).toStrictEqual(false);
        expect(convertToBoolean.stringValue(value, undefined)).toStrictEqual(undefined);
        expect(convertToBoolean.stringValue(value, null)).toStrictEqual(null);
        expect(convertToBoolean.stringValue(value, true)).toStrictEqual(true);
        expect(convertToBoolean.stringValue(value, false)).toStrictEqual(false);
    }
});

test('stringValue - Истинные значения', () => {
    const incorrectValues: any[] = [
        'true',
        'tRuE',
        'TRUE',
        ' true ',
        '   true   ',
        ' TRUE   ',
        '     tRuE',
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean.stringValue(value)).toStrictEqual(true);
        expect(convertToBoolean.stringValue(value, undefined)).toStrictEqual(true);
        expect(convertToBoolean.stringValue(value, null)).toStrictEqual(true);
        expect(convertToBoolean.stringValue(value, true)).toStrictEqual(true);
        expect(convertToBoolean.stringValue(value, false)).toStrictEqual(true);
    }
});

test('stringValue - Ложные значения', () => {
    const incorrectValues: any[] = [
        'false',
        'FALSE',
        'fAlSe',
        '  fAlSe  ',
        '   false  ',
        ' FALSE   ',
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean.stringValue(value)).toStrictEqual(false);
        expect(convertToBoolean.stringValue(value, undefined)).toStrictEqual(false);
        expect(convertToBoolean.stringValue(value, null)).toStrictEqual(false);
        expect(convertToBoolean.stringValue(value, true)).toStrictEqual(false);
        expect(convertToBoolean.stringValue(value, false)).toStrictEqual(false);
    }
});
//#endregion
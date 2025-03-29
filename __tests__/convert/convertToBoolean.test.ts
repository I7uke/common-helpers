import convertToBoolean from "../../src/convert/convertToBoolean";

test('Истинные значения', () => {
    const incorrectValues: any[] = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [],
        ' ',
        'true',
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
        expect(convertToBoolean(value)).toStrictEqual(true);
    }
});

test('Ложные значения', () => {
    const incorrectValues: any[] = [
        null,
        undefined,
        false,
        NaN,
        0,
        -0,
        0n,
        '',
        'false',
        'FALSE',
        'fAlSe'
    ];

    for (const value of incorrectValues) {
        expect(convertToBoolean(value)).toStrictEqual(false);
    }
});
import { toBoolean } from "../../src";

test('Типы true', () => {
    const values = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [],
        'string',
        'true',
        'true',
        'tRuE',
        'TRUE',
        ' true ',
        '   true   ',
        ' TRUE   ',
        '     tRuE',
        -5,
        1,
        5,
        100,
        new Date('InvalidDate'),
        new Date(),
    ];

    for (const value of values) {
        expect(toBoolean(value)).toStrictEqual(true);
    }
});

test('Типы false', () => {
    const values = [
        false,
        0,
        -0,
        0n,
        '',
        ' ',
        '  ',
        '     ',
        'false',
        ' false',
        'false ',
        ' false ',
        '  false  ',
        'FALSE',
        'fAlSe',
        '  fAlSe  ',
        '   false  ',
        ' FALSE   ',
        null,
        undefined,
        NaN,
    ];

    for (const value of values) {
        expect(toBoolean(value)).toStrictEqual(false);
    }
});
import { toBooleanTruthy } from "../../src";

test('Типы true', () => {
    const values = [
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [],
        'string',
        'true',
        'false',
        ' ',
        '   ',
        -5,
        1,
        5,
        100,
        new Date('InvalidDate'),
        new Date(),
    ];

    for (const value of values) {
        expect(toBooleanTruthy(value)).toStrictEqual(true);
    }
});

test('Типы false', () => {
    const values = [
        false,
        0,
        -0,
        0n,
        '',
        null,
        undefined,
        NaN,
    ];

    for (const value of values) {
        expect(toBooleanTruthy(value)).toStrictEqual(false);
    }
});
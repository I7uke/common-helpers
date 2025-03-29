import validationStringArray from "../../src/validators/validationStringArray";

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        [{ a: 1, b: 2 }, NaN, new Date(), undefined, null],
        0,
        10,
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
        expect(validationStringArray(value)).toStrictEqual([]);
    }
});

test('Массив пустой', () => {
    expect(validationStringArray([])).toStrictEqual([]);
});

test('Массив строк', () => {
    expect(validationStringArray(['1', '2', '3', '4', '5', '6', '7', '8', '9'])).toStrictEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
});

test('Смешанный массив 1', () => {
    expect(validationStringArray(['1', 2, '3', 4, '5', 6, '7', 8, '9'])).toStrictEqual(['1', '3', '5', '7', '9']);
});

test('Смешанный массив 2', () => {
    expect(validationStringArray([undefined, '1', null, 5, '2', new Date(), '3', false])).toStrictEqual(['1', '2', '3']);
});
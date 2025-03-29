import validationNumberArray from "../../src/validators/validationNumberArray";

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        ['a', 'b', 'c'],
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
        expect(validationNumberArray(value)).toStrictEqual([]);
    }
});

test('Массив пустой', () => {
    expect(validationNumberArray([])).toStrictEqual([]);
});

test('Массив чисел', () => {
    expect(validationNumberArray([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('Смешанный массив 1', () => {
    expect(validationNumberArray(['1', 2, '3', 4, '5', 6, '7', 8, '9'])).toStrictEqual([2, 4, 6, 8]);
});

test('Смешанный массив 2', () => {
    expect(validationNumberArray([undefined, NaN, 1, null, 'string', 2, new Date(), 3, false])).toStrictEqual([1, 2, 3]);
});
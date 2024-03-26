import validationNumberArray from "../src/validationNumberArray";

test('Массив пустой', () => {
    expect(validationNumberArray([])).toStrictEqual([]);
});

test('Массив чисел', () => {
    expect(validationNumberArray([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('undefined', () => {
    expect(validationNumberArray(undefined)).toStrictEqual([]);
});

test('null', () => {
    expect(validationNumberArray(null)).toStrictEqual([]);
});

test('Некорректное значение - Массив строк', () => {
    // @ts-ignore
    expect(validationNumberArray(['1', '2', '3', '4', '5'])).toStrictEqual([]);
});

test('Некорректное значение - смешанный массив', () => {
    // @ts-ignore
    expect(validationNumberArray(['1', 2, '3', 4, '5', 6, 7, '8', 9])).toStrictEqual([2, 4, 6, 7, 9]);
});

test('Некорректное значение - объект', () => {
    // @ts-ignore
    expect(validationNumberArray({test: 123})).toStrictEqual([]);
});

test('Некорректное значение - строка', () => {
    // @ts-ignore
    expect(validationNumberArray('Lalala')).toStrictEqual([]);
});

test('Некорректное значение - число', () => {
    // @ts-ignore
    expect(validationNumberArray(123456)).toStrictEqual([]);
});


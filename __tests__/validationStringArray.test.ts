import validationStringArray from "../src/validationStringArray";

test('Массив пустой', () => {
    expect(validationStringArray([])).toStrictEqual([]);
});

test('Массив строк', () => {
    expect(validationStringArray(['1', '2', '2', '3', '4', '5', '6', '7', '8', '9'])).toStrictEqual(['1', '2', '2', '3', '4', '5', '6', '7', '8', '9']);
});

test('undefined', () => {
    expect(validationStringArray(undefined)).toStrictEqual([]);
});

test('null', () => {
    expect(validationStringArray(null)).toStrictEqual([]);
});

test('Некорректное значение - смешанный массив', () => {
    // @ts-ignore
    expect(validationStringArray(['1', 2, '3', 4, '5', 6, 7, '8', 9])).toStrictEqual(['1', '3', '5', '8']);
});

test('Некорректное значение - Массив чисел', () => {
    // @ts-ignore
    expect(validationStringArray([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual([]);
});

test('Некорректное значение - объект', () => {
    // @ts-ignore
    expect(validationStringArray({test: 123})).toStrictEqual([]);
});

test('Некорректное значение - строка', () => {
    // @ts-ignore
    expect(validationStringArray('Lalala')).toStrictEqual([]);
});

test('Некорректное значение - число', () => {
    // @ts-ignore
    expect(validationStringArray(123456)).toStrictEqual([]);
});
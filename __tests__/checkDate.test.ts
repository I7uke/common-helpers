import checkDate from "../src/checkDate";

const testValidDate = new Date();

test('Корректное значение дата', () => {
    expect(checkDate(testValidDate)).toStrictEqual(testValidDate);
});

test('Некорректная дата', () => {
    expect(checkDate(new Date('test'))).toStrictEqual(null);
});

test('Некорректное значение = массив', () => {
    expect(checkDate([])).toStrictEqual(null);
});

test('Некорректное значение = массив', () => {
    expect(checkDate([1, 2, 3])).toStrictEqual(null);
});

test('Некорректное значение = массив', () => {
    expect(checkDate([10])).toStrictEqual(null);
});

test('Некорректное значение - объект', () => {
    expect(checkDate({})).toStrictEqual(null);
});

test('Некорректное значение - строка', () => {
    expect(checkDate('Test string')).toStrictEqual(null);
});

test('Некорректное значение - пустая строка', () => {
    expect(checkDate('')).toStrictEqual(null);
});

test('Некорректное значение - строка число', () => {
    expect(checkDate('10')).toStrictEqual(null);
});

test('Некорректное значение - число', () => {
    expect(checkDate(10)).toStrictEqual(null);
});

test('Некорректное значение - число 0', () => {
    expect(checkDate(0)).toStrictEqual(null);
});

test('Некорректное значение - число отрицательное', () => {
    expect(checkDate(-10)).toStrictEqual(null);
});

test('Некорректное значение - null', () => {
    expect(checkDate(null)).toStrictEqual(null);
});

test('Некорректное значение - undefined', () => {
    expect(checkDate(undefined)).toStrictEqual(null);
});

test('Некорректное значение - NaN', () => {
    expect(checkDate(NaN)).toStrictEqual(null);
});
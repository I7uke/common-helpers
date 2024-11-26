import validationDate from "../../src/validators/validationDate";

const getTestValidDate = () => new Date(1115255105005);
const getTestInvalidDate = () => new Date('InvalidDate');
const getDefaultValueDate = () => new Date(1183777627007);

test('Корректное значение дата', () => {
    expect(validationDate(getTestValidDate())).toStrictEqual(getTestValidDate());
});

test('Некорректная дата', () => {
    expect(validationDate(getTestInvalidDate())).toStrictEqual(undefined);
});

test('Некорректное значение = массив', () => {
    expect(validationDate([])).toStrictEqual(undefined);
});

test('Некорректное значение - массив', () => {
    expect(validationDate([1, 2, 3])).toStrictEqual(undefined);
});

test('Некорректное значение - массив', () => {
    expect(validationDate([10])).toStrictEqual(undefined);
});

test('Некорректное значение - объект', () => {
    expect(validationDate({})).toStrictEqual(undefined);
});

test('Некорректное значение - строка', () => {
    expect(validationDate('Test string')).toStrictEqual(undefined);
});

test('Некорректное значение - пустая строка', () => {
    expect(validationDate('')).toStrictEqual(undefined);
});

test('Некорректное значение - строка число', () => {
    expect(validationDate('10')).toStrictEqual(undefined);
});

test('Некорректное значение - число', () => {
    expect(validationDate(10)).toStrictEqual(undefined);
});

test('Некорректное значение - число 0', () => {
    expect(validationDate(0)).toStrictEqual(undefined);
});

test('Некорректное значение - число отрицательное', () => {
    expect(validationDate(-10)).toStrictEqual(undefined);
});

test('Некорректное значение - null', () => {
    expect(validationDate(null)).toStrictEqual(undefined);
});

test('Некорректное значение - undefined', () => {
    expect(validationDate(undefined)).toStrictEqual(undefined);
});

test('Некорректное значение - NaN', () => {
    expect(validationDate(NaN)).toStrictEqual(undefined);
});

test('1. defaultValue: undefined', () => {
    expect(validationDate(undefined, undefined))
        .toStrictEqual(undefined);
});

test('2. defaultValue: undefined', () => {
    expect(validationDate(getTestValidDate(), undefined))
        .toStrictEqual(getTestValidDate());
});

test('3. defaultValue: undefined', () => {
    expect(validationDate(getTestInvalidDate(), undefined))
        .toStrictEqual(undefined);
});

test('1. defaultValue: null', () => {
    expect(validationDate(null, null))
        .toStrictEqual(null);
});

test('2. defaultValue: null', () => {
    expect(validationDate(getTestValidDate(), null))
        .toStrictEqual(getTestValidDate());
});

test('3. defaultValue: null', () => {
    expect(validationDate(getTestInvalidDate(), null))
        .toStrictEqual(null);
});

test('1. defaultValue: date', () => {
    expect(validationDate(undefined, getDefaultValueDate()))
        .toStrictEqual(getDefaultValueDate());
});

test('2. defaultValue: date', () => {
    expect(validationDate(null, getDefaultValueDate()))
        .toStrictEqual(getDefaultValueDate());
});

test('3. defaultValue: date', () => {
    expect(validationDate(getTestInvalidDate(), getDefaultValueDate()))
        .toStrictEqual(getDefaultValueDate());
});

test('4. defaultValue: date', () => {
    expect(validationDate(getTestValidDate(), getDefaultValueDate()))
        .toStrictEqual(getTestValidDate());
});
import validationNumber from "../src/validationNumber";

test('Число -100', () => {
    expect(validationNumber(-100, 5))
        .toStrictEqual(-100);
});

test('Число 0', () => {
    expect(validationNumber(0, 5))
        .toStrictEqual(0);
});

test('Число 125', () => {
    expect(validationNumber(125, 5))
        .toStrictEqual(125);
});

test('defaultValue отсутствует', () => {
    expect(validationNumber(undefined))
        .toStrictEqual(0);
});

test('undefined', () => {
    expect(validationNumber(undefined, 5))
        .toStrictEqual(5);
});

test('null', () => {
    expect(validationNumber(null, 150))
        .toStrictEqual(150);
});

test('1. NaN', () => {
    expect(validationNumber(NaN, 5))
        .toStrictEqual(5);
});

test('2. NaN', () => {
    expect(validationNumber(Number('string'), 5))
        .toStrictEqual(5);
});

test('3. NaN', () => {
    expect(validationNumber(NaN))
        .toStrictEqual(0);
});

test('Некорректное значение value - строка', () => {
    expect(validationNumber('string' as any, 5))
        .toStrictEqual(5);
});

test('Некорректное значение value - массив', () => {
    expect(validationNumber([] as any, 5))
        .toStrictEqual(5);
});

test('Некорректное значение value - объект', () => {
    expect(validationNumber({ test: 123 } as any, 5))
        .toStrictEqual(5);
});


test('1. defaultValue: undefined', () => {
    expect(validationNumber(undefined, undefined))
        .toStrictEqual(undefined);
});

test('2. defaultValue: undefined', () => {
    expect(validationNumber(5, undefined))
        .toStrictEqual(5);
});

test('3. defaultValue: undefined', () => {
    expect(validationNumber(0, undefined))
        .toStrictEqual(0);
});

test('1. defaultValue: null', () => {
    expect(validationNumber(null, null))
        .toStrictEqual(null);
});

test('2. defaultValue: null', () => {
    expect(validationNumber(5, null))
        .toStrictEqual(5);
});

test('3. defaultValue: null', () => {
    expect(validationNumber(0, null))
        .toStrictEqual(0);
});
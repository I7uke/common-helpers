import convertToNumber from "../src/convertToNumber";

test('1. Некорректное значение - boolean', () => {
    expect(convertToNumber(true as any)).toStrictEqual(0);
});

test('2. Некорректное значение - boolean', () => {
    expect(convertToNumber(true as any, 5)).toStrictEqual(5);
});

test('1. Некорректное значение - function', () => {
    // @ts-ignore
    expect(convertToNumber(()=>{})).toStrictEqual(0);
});

test('2. Некорректное значение - function', () => {
    // @ts-ignore
    expect(convertToNumber(()=>{}, 5)).toStrictEqual(5);
});

test('1. Некорректное значение - object', () => {
    expect(convertToNumber({a: 1, b: 2} as any)).toStrictEqual(0);
});

test('2. Некорректное значение - object', () => {
    expect(convertToNumber({a: 1, b: 2} as any, 5)).toStrictEqual(5);
});

test('1. Некорректное значение - array', () => {
    expect(convertToNumber([1, 2, 3] as any)).toStrictEqual(0);
});

test('2. Некорректное значение - array', () => {
    expect(convertToNumber([1, 2, 3] as any, 5)).toStrictEqual(5);
});

test('1. undefined', () => {
    expect(convertToNumber(undefined)).toStrictEqual(0);
});

test('2. undefined', () => {
    expect(convertToNumber(undefined, 5)).toStrictEqual(5);
});

test('1. null', () => {
    expect(convertToNumber(null)).toStrictEqual(0);
});

test('2. null', () => {
    expect(convertToNumber(null, 5)).toStrictEqual(5);
});

test('1. NaN', () => {
    expect(convertToNumber(NaN)).toStrictEqual(0);
});

test('2. NaN', () => {
    expect(convertToNumber(NaN, 5)).toStrictEqual(5);
});

test('1. Число', () => {
    expect(convertToNumber(10)).toStrictEqual(10);
});

test('2. Число', () => {
    expect(convertToNumber(-3)).toStrictEqual(-3);
});

test('3. Число', () => {
    expect(convertToNumber(-0)).toStrictEqual(-0);
});

test('4. Число', () => {
    expect(convertToNumber(0)).toStrictEqual(0);
});

test('5. Число', () => {
    expect(convertToNumber(0.123)).toStrictEqual(0.123);
});

test('6. Число', () => {
    expect(convertToNumber(-0.123)).toStrictEqual(-0.123);
});

test('7. Число', () => {
    expect(convertToNumber(10, 5)).toStrictEqual(10);
});


test('1. Строка', () => {
    expect(convertToNumber('10')).toStrictEqual(10);
});

test('2. Строка', () => {
    expect(convertToNumber('0')).toStrictEqual(0);
});

test('3. Строка', () => {
    expect(convertToNumber('-0')).toStrictEqual(-0);
});

test('4. Строка', () => {
    expect(convertToNumber('5string')).toStrictEqual(5);
});

test('5. Строка', () => {
    expect(convertToNumber('a1b2c3d4e')).toStrictEqual(1234);
});

test('6. Строка', () => {
    expect(convertToNumber('123,456')).toStrictEqual(123.456);
});

test('7. Строка', () => {
    expect(convertToNumber('123,456,789', 5)).toStrictEqual(5);
});

test('8. Строка', () => {
    expect(convertToNumber('123,456,789')).toStrictEqual(0);
});

test('9. Строка', () => {
    expect(convertToNumber('')).toStrictEqual(0);
});

test('10. Строка', () => {
    expect(convertToNumber('', 10)).toStrictEqual(10);
});

test('11. Строка', () => {
    expect(convertToNumber('a123bc,d4e56', 10)).toStrictEqual(123.456);
});


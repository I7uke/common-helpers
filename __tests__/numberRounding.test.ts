import numberRounding from "../src/numberRounding";

test('+0', () => {
    expect(numberRounding({
        number: 0,
        accuracy: 2
    })).toStrictEqual(0);
});

test('-0', () => {
    expect(numberRounding({
        number: 0,
        accuracy: 2
    })).toStrictEqual(0);
});

test('Положительное округление до целого', () => {
    expect(numberRounding({
        number: 1234.56789
    })).toStrictEqual(1235);
});

test('Отрицательное округление до целого', () => {
    expect(numberRounding({
        number: -1234.56789
    })).toStrictEqual(-1235);
});

test('Положительное округление до 3 знака', () => {
    expect(numberRounding({
        number: 1234.56789,
        accuracy: 3
    })).toStrictEqual(1234.568);
});

test('Отрицательное округление до 3 знака', () => {
    expect(numberRounding({
        number: -1234.56789,
        accuracy: 3
    })).toStrictEqual(-1234.568);
});

test('Положительное округление до 7 знака', () => {
    expect(numberRounding({
        number: 1234.56789,
        accuracy: 7
    })).toStrictEqual(1234.56789);
});

test('Отрицательное округление до 7 знака', () => {
    expect(numberRounding({
        number: -1234.56789,
        accuracy: 7
    })).toStrictEqual(-1234.56789);
});

test('Положительное округление до 2 знака', () => {
    expect(numberRounding({
        number: 123.43214321,
        accuracy: 2
    })).toStrictEqual(123.43);
});

test('Отрицательное округление до 2 знака', () => {
    expect(numberRounding({
        number: -123.43214321,
        accuracy: 2
    })).toStrictEqual(-123.43);
});

test('undefined', () => {
    expect(numberRounding({
        number: undefined,
        accuracy: 2
    })).toStrictEqual(0);
});

test('null', () => {
    expect(numberRounding({
        number: null,
        accuracy: 2
    })).toStrictEqual(0);
});

test('NaN', () => {
    expect(numberRounding({
        number: NaN,
        accuracy: 2
    })).toStrictEqual(0);
});

test('Некорректное значение number - строка', () => {
    expect(numberRounding({
        // @ts-ignore
        number: 'Lala',
        accuracy: 2
    })).toStrictEqual(0);
});

test('Некорректное значение number - массив', () => {
    expect(numberRounding({
        // @ts-ignore
        number: [],
        accuracy: 2
    })).toStrictEqual(0);
});

test('Некорректное значение number - объект', () => {
    expect(numberRounding({
        // @ts-ignore
        number: {},
        accuracy: 2
    })).toStrictEqual(0);
});

test('Некорректное значение accuracy - строка', () => {
    expect(numberRounding({
        number: 1234.56789,
        // @ts-ignore
        accuracy: 'lala'
    })).toStrictEqual(1235);
});

test('Стресс тест 1', () => {
    expect(numberRounding({
        number: 1.005,
        accuracy: 2
    })).toStrictEqual(1.01);
});

test('Стресс тест 2', () => {
    expect(numberRounding({
        number: 1.3549999999999998,
        accuracy: 2
    })).toStrictEqual(1.35);
});

test('Стресс тест 3', () => {
    expect(numberRounding({
        number: 1.7777777,
        accuracy: 2
    })).toStrictEqual(1.78);
});

test('Стресс тест 4', () => {
    expect(numberRounding({
        number: 501.49999999999994,
        accuracy: 2
    })).toStrictEqual(501.5);
});

test('Стресс тест 5', () => {
    expect(numberRounding({
        number: 4.6850000000000005,
        accuracy: 2
    })).toStrictEqual(4.69);
});

test('Стресс тест 6', () => {
    expect(numberRounding({
        number: -1.005,
        accuracy: 2
    })).toStrictEqual(-1.01);
});

test('Стресс тест 7', () => {
    expect(numberRounding({
        number: -2.175,
        accuracy: 2
    })).toStrictEqual(-2.18);
});

test('Стресс тест 8', () => {
    expect(numberRounding({
        number: -4.6850000000000005,
        accuracy: 4
    })).toStrictEqual(-4.685);
});

test('Стресс тест 9', () => {
    expect(numberRounding({
        number: 501.49999999999994,
        accuracy: 4
    })).toStrictEqual(501.5);
});

test('Стресс тест 10', () => {
    expect(numberRounding({
        number: 501.49999999999994,
        accuracy: 2
    })).toStrictEqual(501.5);
});

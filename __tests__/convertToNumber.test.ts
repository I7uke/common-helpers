import convertToNumber from "../src/convertToNumber";

test('Число -5', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: -5
    })).toStrictEqual(-5);
});

test('Число 0', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: 0
    })).toStrictEqual(0);
});

test('Число 1', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: 1
    })).toStrictEqual(1);
});

test('Строковое -300', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: '-300'
    })).toStrictEqual(-300);
});

test('Строковое 0', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: '0'
    })).toStrictEqual(0);
});

test('Строковое 1000', () => {
    expect(convertToNumber({
        defaultValue: 0,
        value: '1000'
    })).toStrictEqual(1000);
});

test('Строковое Lalala', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: 'Lalala'
    })).toStrictEqual(100);
});

test('Строковое -1234.56789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '-1234.56789'
    })).toStrictEqual(-1234.56789);
});

test('Строковое -1234,56789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '-1234,56789'
    })).toStrictEqual(-1234.56789);
});

test('Строковое 1234.56789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '1234.56789'
    })).toStrictEqual(1234.56789);
});

test('Строковое 1234,56789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '1234,56789'
    })).toStrictEqual(1234.56789);
});

test('Строковое 12,34,56,789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '12,34,56,789'
    })).toStrictEqual(100);
});

test('Строковое 12.34,56,789', () => {
    expect(convertToNumber({
        defaultValue: 100,
        value: '12.34,56,789'
    })).toStrictEqual(100);
});

test('undefined', () => {
    expect(convertToNumber({
        defaultValue: 5,
        value: undefined
    })).toStrictEqual(5);
});

test('null', () => {
    expect(convertToNumber({
        defaultValue: 6,
        value: null
    })).toStrictEqual(6);
});

test('Некорректное значение - object', () => {
    expect(convertToNumber({
        defaultValue: 7,
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual(7);
});

test('Некорректное значение - array', () => {
    expect(convertToNumber({
        defaultValue: 8,
        // @ts-ignore
        value: []
    })).toStrictEqual(8);
});

test('NaN', () => {
    expect(convertToNumber({
        defaultValue: 9,
        value: NaN
    })).toStrictEqual(9);
});
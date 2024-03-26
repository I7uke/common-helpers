import validationNumber from "../src/validationNumber";

test('Число -100', () => {
    expect(validationNumber({
        defaultValue: 5,
        value: -100
    })).toStrictEqual(-100);
});

test('Число 0', () => {
    expect(validationNumber({
        defaultValue: 5,
        value: 0
    })).toStrictEqual(0);
});

test('Число 125', () => {
    expect(validationNumber({
        defaultValue: 5,
        value: 125
    })).toStrictEqual(125);
});

test('defaultValue отсутствует', () => {
    expect(validationNumber({
        value: undefined
    })).toStrictEqual(0);
});

test('undefined', () => {
    expect(validationNumber({
        defaultValue: 5,
        value: undefined
    })).toStrictEqual(5);
});

test('null', () => {
    expect(validationNumber({
        defaultValue: 150,
        value: null
    })).toStrictEqual(150);
});

test('NaN', () => {
    expect(validationNumber({
        defaultValue: 5,
        value: NaN
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - строка', () => {
    expect(validationNumber({
        defaultValue: 5,
        // @ts-ignore
        value: 'Lala'
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - массив', () => {
    expect(validationNumber({
        defaultValue: 5,
        // @ts-ignore
        value: []
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - объект', () => {
    expect(validationNumber({
        defaultValue: 5,
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual(5);
});

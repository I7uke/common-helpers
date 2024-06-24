import validationNumberInRange from "../src/validationNumberInRange";

test('Число -100', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        value: -100
    })).toStrictEqual(-100);
});

test('Число 0', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        value: 0
    })).toStrictEqual(0);
});

test('Число 125', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        value: 125
    })).toStrictEqual(125);
});

test('defaultValue отсутствует', () => {
    expect(validationNumberInRange({
        value: undefined
    })).toStrictEqual(0);
});

test('undefined', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        value: undefined
    })).toStrictEqual(5);
});

test('null', () => {
    expect(validationNumberInRange({
        defaultValue: 150,
        value: null
    })).toStrictEqual(150);
});

test('NaN', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        value: NaN
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - строка', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        // @ts-ignore
        value: 'Lala'
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - массив', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        // @ts-ignore
        value: []
    })).toStrictEqual(5);
});

test('Некорректное значение valueForValidation - объект', () => {
    expect(validationNumberInRange({
        defaultValue: 5,
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual(5);
});

test('Число в интервале [1, 3]', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 2
    })).toStrictEqual(2);
});

test('Число больше интервала [1, 3]', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 4
    })).toStrictEqual(3);
});

test('Число больше интервала [1, 3] defaultValue', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 4,
        defaultValue: 2
    })).toStrictEqual(3);
});

test('Число больше интервала [1, 3] defaultValue', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 4,
        defaultValue: 10
    })).toStrictEqual(3);
});

test('Число меньше интервала [1, 3]', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 0
    })).toStrictEqual(1);
});

test('Число меньше интервала [1, 3] defaultValue', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 0,
        defaultValue: 2
    })).toStrictEqual(1);
});

test('Число меньше интервала [1, 3] defaultValue', () => {
    expect(validationNumberInRange({
        min: 1,
        max: 3,
        value: 0,
        defaultValue: 10
    })).toStrictEqual(1);
});

test('min и max NaN', () => {
    expect(validationNumberInRange({
        min: NaN,
        max: NaN,
        value: 5
    })).toStrictEqual(5);
});

test('min и max NaN', () => {
    expect(validationNumberInRange({
        min: NaN,
        max: NaN,
        value: undefined
    })).toStrictEqual(0);
});

test('min и max NaN', () => {
    expect(validationNumberInRange({
        min: NaN,
        max: NaN,
        value: undefined,
        defaultValue: 5
    })).toStrictEqual(5);
});

test('Все NaN', () => {
    expect(validationNumberInRange({
        min: NaN,
        max: NaN,
        value: NaN,
        defaultValue: NaN
    })).toStrictEqual(0);
});

test('Число в интервале [-5, 5] правая граница', () => {
    expect(validationNumberInRange({
        min: -5,
        max: 5,
        value: 5,
    })).toStrictEqual(5);
});

test('Число в интервале [-5, 5] левая граница', () => {
    expect(validationNumberInRange({
        min: -5,
        max: 5,
        value: -5,
    })).toStrictEqual(-5);
});


test('Число в интервале [-5, 5] левая граница дробь', () => {
    expect(validationNumberInRange({
        min: -5,
        max: 5,
        value: -5.01,
    })).toStrictEqual(-5);
});

test('Число в интервале [-5, 5] правая граница', () => {
    expect(validationNumberInRange({
        min: -5,
        max: 5,
        value: 5.01,
    })).toStrictEqual(5);
});

test('Единичный интервал [3, 3] value', () => {
    expect(validationNumberInRange({
        min: 3,
        max: 3,
        value: 3,
    })).toStrictEqual(3);
});

test('Единичный интервал [3, 3] min', () => {
    expect(validationNumberInRange({
        min: 3,
        max: 3,
        value: 1,
    })).toStrictEqual(3);
});

test('Единичный интервал [3, 3] max', () => {
    expect(validationNumberInRange({
        min: 3,
        max: 3,
        value: 4,
    })).toStrictEqual(3);
});


test('Не корректный интервал [3, 1]', () => {
    expect(validationNumberInRange({
        min: 3,
        max: 1,
        value: 4,
    })).toStrictEqual(4);
});
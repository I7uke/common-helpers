import validationString from "../src/validationString";

test('Строка', () => {
    expect(validationString('Lorem ipsum dolor sit amet, solum summo platonem has ea', 'string defaultValue'))
        .toStrictEqual('Lorem ipsum dolor sit amet, solum summo platonem has ea');
});

test('Пустая строка', () => {
    expect(validationString('', 'string defaultValue'))
        .toStrictEqual('');
});

test('Пустая строка без defaultValue', () => {
    expect(validationString(''))
        .toStrictEqual('');
});

test('defaultValue отсутствует', () => {
    expect(validationString(undefined))
        .toStrictEqual('');
});

test('undefined', () => {
    expect(validationString(undefined, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('null', () => {
    expect(validationString(null, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - NaN', () => {
    expect(validationString(NaN, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - число', () => {
    expect(validationString(123456789, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - массив', () => {
    expect(validationString([], 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - объект', () => {
    expect(validationString({ test: 123 }, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});
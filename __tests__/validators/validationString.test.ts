import validationString from "../../src/validators/validationString";

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

test('value: undefined', () => {
    expect(validationString(undefined, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('value: null', () => {
    expect(validationString(null, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('value: NaN', () => {
    expect(validationString(NaN, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('value: number', () => {
    expect(validationString(123456789, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('value: array', () => {
    expect(validationString([], 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('value: object', () => {
    expect(validationString({ test: 123 }, 'string defaultValue'))
        .toStrictEqual('string defaultValue');
});

test('1. defaultValue: undefined', () => {
    expect(validationString(undefined, undefined))
        .toStrictEqual(undefined);
});

test('2. defaultValue: undefined', () => {
    expect(validationString('string', undefined))
        .toStrictEqual('string');
});

test('3. defaultValue: undefined', () => {
    expect(validationString('', undefined))
        .toStrictEqual('');
});

test('1. defaultValue: null', () => {
    expect(validationString(null, null))
        .toStrictEqual(null);
});

test('2. defaultValue: null', () => {
    expect(validationString('string', null))
        .toStrictEqual('string');
});

test('3. defaultValue: null', () => {
    expect(validationString('', null))
        .toStrictEqual('');
});
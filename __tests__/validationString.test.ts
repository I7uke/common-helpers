import validationString from "../src/validationString";

test('Строка', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        value: 'Lorem ipsum dolor sit amet, solum summo platonem has ea'
    })).toStrictEqual('Lorem ipsum dolor sit amet, solum summo platonem has ea');
});

test('Пустая строка', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        value: ''
    })).toStrictEqual('string defaultValue');
});

test('Пустая строка без defaultValue', () => {
    expect(validationString({
        value: ''
    })).toStrictEqual('');
});

test('defaultValue отсутствует', () => {
    expect(validationString({
        value: undefined
    })).toStrictEqual('');
});

test('undefined', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        value: undefined
    })).toStrictEqual('string defaultValue');
});

test('null', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        value: null
    })).toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - NaN', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        // @ts-ignore
        value: NaN
    })).toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - число', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        // @ts-ignore
        value: 123456789
    })).toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - массив', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        // @ts-ignore
        value: []
    })).toStrictEqual('string defaultValue');
});

test('Некорректное значение valueForValidation - объект', () => {
    expect(validationString({
        defaultValue: 'string defaultValue',
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual('string defaultValue');
});
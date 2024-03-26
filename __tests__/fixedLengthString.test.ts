import fixedLengthString from "../src/fixedLengthString";

const testString: string = 'Lorem ipsum dolor sit amet, referrentur comprehensam eu usu';

test('Строка', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 11
    })).toStrictEqual('Lorem ipsum...');
});

test('Пустая строка, без значения по умолчанию', () => {
    expect(fixedLengthString({
        value: '',
        maxLength: 11
    })).toStrictEqual('');
});

test('Пустая строка, с значением по умолчанию', () => {
    expect(fixedLengthString({
        defaultValue: 'Пустая строка!',
        value: '',
        maxLength: 11
    })).toStrictEqual('Пустая строка!');
});

test('maxLength: -1', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: -1
    })).toStrictEqual(testString);
});

test('maxLength: 0', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: -1
    })).toStrictEqual(testString);
});

test('maxLength: 1', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 1
    })).toStrictEqual('L...');
});

test('Пустой defaultValue', () => {
    expect(fixedLengthString({
        value: undefined,
        maxLength: 11
    })).toStrictEqual('');
});

test('undefined', () => {
    expect(fixedLengthString({
        value: undefined,
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

test('null', () => {
    expect(fixedLengthString({
        value: null,
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - NaN', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: NaN,
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - число', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: NaN,
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - массив', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: [],
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - объект', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: {test: 123},
        defaultValue: 'Ошибка!',
        maxLength: 11
    })).toStrictEqual('Ошибка!');
});

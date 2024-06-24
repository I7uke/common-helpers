import fixedLengthString from "../src/fixedLengthString";

const testString: string = 'Lorem ipsum dolor sit amet, referrentur comprehensam eu usu';

test('Строка', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 11
    })).toStrictEqual('Lorem ipsum...');
});

test('Строка', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 100
    })).toStrictEqual(testString);
});

test('Пустая строка, без значения по умолчанию', () => {
    expect(fixedLengthString({
        value: '',
        maxLength: 11
    })).toStrictEqual('');
});

test('Пустая строка, с значением по умолчанию', () => {
    expect(fixedLengthString({
        defaultValue: 'defaultValue',
        value: '',
        maxLength: 11
    })).toStrictEqual('defaultValue');
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

test('isAddDots: false', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 6,
        isAddDots: false
    })).toStrictEqual('Lorem');
});

test('isAddDots: true', () => {
    expect(fixedLengthString({
        value: testString,
        maxLength: 6,
        isAddDots: true
    })).toStrictEqual('Lorem...');
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
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('null', () => {
    expect(fixedLengthString({
        value: null,
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение value - NaN', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: NaN,
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение value - число', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: NaN,
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение value - массив', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: [],
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение value - объект', () => {
    expect(fixedLengthString({
        // @ts-ignore
        value: {test: 123},
        defaultValue: 'defaultValue',
        maxLength: 11
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение maxLength - 0', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: -1
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - -1', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: -1
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - NaN', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: NaN
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - undefined', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: undefined as any
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - null', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: null as any
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - object', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: {} as any
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - string', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: 'maxLength' as any
    })).toStrictEqual(testString);
});

test('Некорректное значение maxLength - array', () => {
    expect(fixedLengthString({
        value: testString,
        defaultValue: 'defaultValue',
        maxLength: [] as any
    })).toStrictEqual(testString);
});
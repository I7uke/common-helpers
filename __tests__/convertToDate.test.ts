import convertToDate from "../src/convertToDate";

const defaultValueDate: Date = new Date();
const testDate = new Date();
testDate.setUTCMilliseconds(0);

const testDateStartDay = new Date(+testDate);
testDateStartDay.setHours(0, 0, 0, 0);
const testDateEndDay = new Date(+testDate);
testDateEndDay.setHours(23, 59, 0, 0);

test('timestamp', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: +testDate
    })).toStrictEqual(testDate);
});

test('ISOS', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: testDate.toISOString()
    })).toStrictEqual(testDate);
});

test('UTC', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: testDate.toUTCString()
    })).toStrictEqual(testDate);
});

test('JSON', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: testDate.toJSON()
    })).toStrictEqual(testDate);
});

test('Начало дня', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: testDateStartDay.toJSON(),
        changeTime: 'startDay'
    })).toStrictEqual(testDateStartDay);
});

test('Конец дня', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: testDateEndDay.toJSON(),
        changeTime: 'endDay'
    })).toStrictEqual(testDateEndDay);
});

test('Invalid Date', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: new Date('Lala').toJSON()
    })).toStrictEqual(defaultValueDate);
});

test('defaultValue null', () => {
    expect(convertToDate({
        defaultValue: null,
        value: new Date('Lala').toJSON()
    })).toStrictEqual(null);
});

test('undefined', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: undefined
    })).toStrictEqual(defaultValueDate);
});

test('null', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: null
    })).toStrictEqual(defaultValueDate);
});

test('NaN', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: NaN
    })).toStrictEqual(defaultValueDate);
});

test('Некорректное значение - массив', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        // @ts-ignore
        value: []
    })).toStrictEqual(defaultValueDate);
});

test('Некорректное значение - массив', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        // @ts-ignore
        value: [10]
    })).toStrictEqual(defaultValueDate);
});

test('Некорректное значение - объект', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual(defaultValueDate);
});

test('Некорректное defaultValue', () => {
    expect(convertToDate({
        // @ts-ignore
        defaultValue: [],
        // @ts-ignore
        value: {test: 123}
    })).toStrictEqual(null);
});

test('Некорректное значение - число меньше нуля', () => {
    expect(convertToDate({
        defaultValue: defaultValueDate,
        value: -10
    })).toStrictEqual(defaultValueDate);
});
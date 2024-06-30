import convertToDate from "../src/convertToDate";
type TimeChange = 'startDay' | 'endDay';

function getTestDate1(timeChange?: TimeChange): Date {
    const date = new Date(1719601954000);

    if (timeChange === 'startDay') {
        date.setHours(0, 0, 0, 0);
    } else if (timeChange === 'endDay') {
        date.setHours(23, 59, 0, 0);
    }

    return date;
}

function getTestDate2(timeChange?: TimeChange) {
    const date = new Date(1719525723000);

    if (timeChange === 'startDay') {
        date.setHours(0, 0, 0, 0);
    } else if (timeChange === 'endDay') {
        date.setHours(23, 59, 0, 0);
    }

    return date;
}

test('1. Некорректное значение - boolean', () => {
    expect(convertToDate({
        value: true as any,
    })).toStrictEqual(null);
});

test('2. Некорректное значение - boolean', () => {
    expect(convertToDate({
        value: true as any,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. Некорректное значение - function', () => {
    expect(convertToDate({
        //@ts-ignore
        value: ()=>{},
    })).toStrictEqual(null);
});

test('2. Некорректное значение - function', () => {
    expect(convertToDate({
        //@ts-ignore
        value: () => { },
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. Некорректное значение - object', () => {
    expect(convertToDate({
        value: {a: 1, b: 2} as any,
    })).toStrictEqual(null);
});

test('2. Некорректное значение - object', () => {
    expect(convertToDate({
        value: {a: 1, b: 2} as any,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. Некорректное значение - array', () => {
    expect(convertToDate({
        value: [1, 2, 3] as any,
    })).toStrictEqual(null);
});

test('2. Некорректное значение - array', () => {
    expect(convertToDate({
        value: [1, 2, 3] as any,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. undefined', () => {
    expect(convertToDate({
        value: undefined,
    })).toStrictEqual(null);
});

test('2. undefined', () => {
    expect(convertToDate({
        value: undefined,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. null', () => {
    expect(convertToDate({
        value: null,
    })).toStrictEqual(null);
});

test('2. null', () => {
    expect(convertToDate({
        value: null,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});

test('1. NaN', () => {
    expect(convertToDate({
        value: NaN,
    })).toStrictEqual(null);
});

test('2. NaN', () => {
    expect(convertToDate({
        value: NaN,
        defaultValue: getTestDate1()
    })).toStrictEqual(getTestDate1());
});


test('1. value - number', () => {
    expect(convertToDate({
        value: +getTestDate1(),
    })).toStrictEqual(getTestDate1());
});

test('2. value - number', () => {
    expect(convertToDate({
        value: +getTestDate2(),
    })).toStrictEqual(getTestDate2());
});

test('3. value - number', () => {
    expect(convertToDate({
        value: +getTestDate2(),
        defaultValue: new Date()
    })).toStrictEqual(getTestDate2());
});

test('4. value - number', () => {
    expect(convertToDate({
        value: +getTestDate1(),
        defaultValue: new Date(),
        changeTime: 'startDay'
    })).toStrictEqual(getTestDate1('startDay'));
});

test('5. value - number', () => {
    expect(convertToDate({
        value: +getTestDate2(),
        defaultValue: new Date(),
        changeTime: 'startDay'
    })).toStrictEqual(getTestDate2('startDay'));
});

test('6. value - number', () => {
    expect(convertToDate({
        value: +getTestDate1(),
        defaultValue: new Date(),
        changeTime: 'endDay'
    })).toStrictEqual(getTestDate1('endDay'));
});

test('7. value - number', () => {
    expect(convertToDate({
        value: +getTestDate2(),
        defaultValue: new Date(),
        changeTime: 'endDay'
    })).toStrictEqual(getTestDate2('endDay'));
});


test('1. value - string', () => {
    expect(convertToDate({
        value: getTestDate1().toISOString(),
    })).toStrictEqual(getTestDate1());
});

test('2. value - string', () => {
    expect(convertToDate({
        value: getTestDate2().toISOString(),
    })).toStrictEqual(getTestDate2());
});

test('3. value - string', () => {
    expect(convertToDate({
        value: getTestDate2().toISOString(),
        defaultValue: new Date()
    })).toStrictEqual(getTestDate2());
});

test('4. value - string', () => {
    expect(convertToDate({
        value: getTestDate1().toISOString(),
        defaultValue: new Date(),
        changeTime: 'startDay'
    })).toStrictEqual(getTestDate1('startDay'));
});

test('5. value - string', () => {
    expect(convertToDate({
        value: getTestDate2().toISOString(),
        defaultValue: new Date(),
        changeTime: 'startDay'
    })).toStrictEqual(getTestDate2('startDay'));
});

test('6. value - string', () => {
    expect(convertToDate({
        value: getTestDate1().toISOString(),
        defaultValue: new Date(),
        changeTime: 'endDay'
    })).toStrictEqual(getTestDate1('endDay'));
});

test('7. value - string', () => {
    expect(convertToDate({
        value: getTestDate2().toISOString(),
        defaultValue: new Date(),
        changeTime: 'endDay'
    })).toStrictEqual(getTestDate2('endDay'));
});






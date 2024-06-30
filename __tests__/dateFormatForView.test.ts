import dateFormatForView from "../src/dateFormatForView";

const getTestDete1 = ()=> new Date(1719601954000);
const getTestDete2 = ()=> new Date(1719525723000);

test('1. Некорректное значение - boolean', () => {
    expect(dateFormatForView({
        date: true as any,
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - boolean', () => {
    expect(dateFormatForView({
        date: true as any,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - function', () => {
    expect(dateFormatForView({
        //@ts-ignore
        date: ()=>{},
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - function', () => {
    expect(dateFormatForView({
        //@ts-ignore
        date: () => { },
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - number', () => {
    expect(dateFormatForView({
        date: 5 as any,
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - number', () => {
    expect(dateFormatForView({
        date: 5 as any,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - object', () => {
    expect(dateFormatForView({
        date: {a: 1, b: 2} as any,
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - object', () => {
    expect(dateFormatForView({
        date: {a: 1, b: 2} as any,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - string', () => {
    expect(dateFormatForView({
        date: 'string' as any,
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - string', () => {
    expect(dateFormatForView({
        date: 'string' as any,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - array', () => {
    expect(dateFormatForView({
        date: [1,2,3] as any,
        format: 'dd.mm.yyyy',
    })).toStrictEqual('');
});

test('2. Некорректное значение - array', () => {
    expect(dateFormatForView({
        date: [1,2,3] as any,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - Invalid Date', () => {
    expect(dateFormatForView({
        date: new Date('date'),
        format: 'dd.mm.yyyy'
    })).toStrictEqual('');
});

test('2. Некорректное значение - Invalid Date', () => {
    expect(dateFormatForView({
        date: new Date('date'),
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. Некорректное значение - format', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'format' as any
    })).toStrictEqual('');
});

test('2. Некорректное значение - format', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'format' as any,
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. undefined', () => {
    expect(dateFormatForView({
        date: undefined,
        format: 'dd.mm.yyyy'
    })).toStrictEqual('');
});

test('2. undefined', () => {
    expect(dateFormatForView({
        date: undefined,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. null', () => {
    expect(dateFormatForView({
        date: null,
        format: 'dd.mm.yyyy'
    })).toStrictEqual('');
});

test('2. null', () => {
    expect(dateFormatForView({
        date: null,
        format: 'dd.mm.yyyy',
        defaultValue: 'defaultValue'
    })).toStrictEqual('defaultValue');
});

test('1. dd.mm.yyyy', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd.mm.yyyy'
    })).toStrictEqual('28.06.2024');
});

test('2. dd.mm.yyyy', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd.mm.yyyy'
    })).toStrictEqual('28.06.2024');
});

test('1. dd-mm-yyyy', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd-mm-yyyy'
    })).toStrictEqual('28-06-2024');
});

test('2. dd-mm-yyyy', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd-mm-yyyy'
    })).toStrictEqual('28-06-2024');
});

test('1. dd.mm.yyyy hh:mm', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd.mm.yyyy hh:mm'
    })).toStrictEqual('28.06.2024 22:12');
});

test('2. dd.mm.yyyy hh:mm', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd.mm.yyyy hh:mm'
    })).toStrictEqual('28.06.2024 01:02');
});

test('1. dd-mm-yyyy hh:mm', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd-mm-yyyy hh:mm'
    })).toStrictEqual('28-06-2024 22:12');
});

test('2. dd-mm-yyyy hh:mm', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd-mm-yyyy hh:mm'
    })).toStrictEqual('28-06-2024 01:02');
});

test('1. dd.mm.yyyy hh:mm:ss', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd.mm.yyyy hh:mm:ss'
    })).toStrictEqual('28.06.2024 22:12:34');
});

test('2. dd.mm.yyyy hh:mm:ss', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd.mm.yyyy hh:mm:ss'
    })).toStrictEqual('28.06.2024 01:02:03');
});

test('1. dd-mm-yyyy hh:mm:ss', () => {
    expect(dateFormatForView({
        date: getTestDete1(),
        format: 'dd-mm-yyyy hh:mm:ss'
    })).toStrictEqual('28-06-2024 22:12:34');
});

test('2. dd-mm-yyyy hh:mm:ss', () => {
    expect(dateFormatForView({
        date: getTestDete2(),
        format: 'dd-mm-yyyy hh:mm:ss'
    })).toStrictEqual('28-06-2024 01:02:03');
});
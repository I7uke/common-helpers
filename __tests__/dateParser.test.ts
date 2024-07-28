import dateParser from "../src/dateParser";

const getTestDate1 = ()=> new Date(1719601954000);
const getTestDate2 = ()=> new Date(1730757723456);

const getParseTestDate1 = ()=> ({
    dayNumber: 28,
    monthNumber: 6,
    fullYearNumber: 2024,
    hoursNumber: 22,
    minutesNumber: 12,
    secondsNumber: 34,
    millisecondsNumber: 0,
    dayString: '28',
    monthString: '06',
    fullYearString: '2024',
    hoursString: '22',
    minutesString: '12',
    secondsString: '34',
    millisecondsString: '000',
});

const getParseTestDate2 = ()=> ({
    dayNumber: 5,
    monthNumber: 11,
    fullYearNumber: 2024,
    hoursNumber: 1,
    minutesNumber: 2,
    secondsNumber: 3,
    millisecondsNumber: 456,
    dayString: '05',
    monthString: '11',
    fullYearString: '2024',
    hoursString: '01',
    minutesString: '02',
    secondsString: '03',
    millisecondsString: '456',
});

test('Некорректное значение - boolean', () => {
    expect(dateParser(true as any)).toStrictEqual(undefined);
});

test('Некорректное значение - function', () => {
    //@ts-ignore
    expect(dateParser(()=>{})).toStrictEqual(undefined);
});

test('Некорректное значение - number', () => {
    expect(dateParser(5 as any)).toStrictEqual(undefined);
});

test('Некорректное значение - object', () => {
    expect(dateParser({a: 1, b: 2} as any)).toStrictEqual(undefined);
});

test('Некорректное значение - string', () => {
    expect(dateParser('string' as any)).toStrictEqual(undefined);
});

test('Некорректное значение - array', () => {
    expect(dateParser([1,2,3] as any)).toStrictEqual(undefined);
});

test('Некорректное значение - Invalid Date', () => {
    expect(dateParser(new Date('date'))).toStrictEqual(undefined);
});

test('undefined', () => {
    expect(dateParser(undefined)).toStrictEqual(undefined);
});

test('null', () => {
    expect(dateParser(null)).toStrictEqual(undefined);
});

test('1. date', () => {
    expect(dateParser(getTestDate1())).toStrictEqual(getParseTestDate1());
});

test('2. date', () => {
    expect(dateParser(getTestDate2())).toStrictEqual(getParseTestDate2());
});

test('1. defaultValue: undefined', () => {
    expect(dateParser(undefined, undefined))
        .toStrictEqual(undefined);
});

test('2. defaultValue: undefined', () => {
    expect(dateParser(new Date('invalid date'), undefined))
        .toStrictEqual(undefined);
});

test('3. defaultValue: undefined', () => {
    expect(dateParser(getTestDate1(), undefined))
        .toStrictEqual(getParseTestDate1());
});

test('4. defaultValue: undefined', () => {
    expect(dateParser(getTestDate2(), undefined))
        .toStrictEqual(getParseTestDate2());
});

test('1. defaultValue: null', () => {
    expect(dateParser(null, null))
        .toStrictEqual(null);
});

test('2. defaultValue: null', () => {
    expect(dateParser(new Date('invalid date'), null))
        .toStrictEqual(null);
});

test('3. defaultValue: null', () => {
    expect(dateParser(getTestDate1(), null))
        .toStrictEqual(getParseTestDate1());
});

test('4. defaultValue: null', () => {
    expect(dateParser(getTestDate2(), null))
        .toStrictEqual(getParseTestDate2());
});
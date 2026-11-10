import dateParserString, { type DateParseString } from "../../src/misc/dateParserString";

const getTestDate1 = () => new Date(1719601954000);
const getTestDate2 = () => new Date(1730757723456);

function getParseTestDate1(): DateParseString {
    return {
        day: '28',
        month: '06',
        fullYear: '2024',
        hours: '22',
        minutes: '12',
        seconds: '34',
        milliseconds: '000',
    }
};

function getParseTestDate2(): DateParseString {
    return {
        day: '05',
        month: '11',
        fullYear: '2024',
        hours: '01',
        minutes: '02',
        seconds: '03',
        milliseconds: '456',
    }
};

function testValidValue(date: Date, parseResult: DateParseString) {
    expect(dateParserString(date)).toStrictEqual(parseResult);
    expect(dateParserString(date, undefined)).toStrictEqual(parseResult);
    expect(dateParserString(date, null)).toStrictEqual(parseResult);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        0,
        10,
        '',
        'string',
        NaN,
        new Date('InvalidDate'),
        undefined,
        null
    ];

    for (const value of incorrectValues) {
        expect(dateParserString(value)).toStrictEqual(undefined);
        expect(dateParserString(value, undefined)).toStrictEqual(undefined);
        expect(dateParserString(value, null)).toStrictEqual(null);
    }
});

test('Корректная дата', () => {
    testValidValue(getTestDate1(), getParseTestDate1());
    testValidValue(getTestDate2(), getParseTestDate2());
});
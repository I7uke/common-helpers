import dateParser from "../src/dateParser";

const getTestDate1 = () => new Date(1719601954000);
const getTestDate2 = () => new Date(1730757723456);

interface DateParse<T extends string | number> {
    readonly day: T;
    readonly month: T;
    readonly fullYear: T;
    readonly hours: T
    readonly minutes: T;
    readonly seconds: T;
    readonly milliseconds: T;
}

interface ParseResult {
    readonly string: DateParse<string>;
    readonly number: DateParse<number>;
}

function getParseTestDate1(): ParseResult {
    return {
        number: {
            day: 28,
            month: 6,
            fullYear: 2024,
            hours: 22,
            minutes: 12,
            seconds: 34,
            milliseconds: 0,
        },
        string: {
            day: '28',
            month: '06',
            fullYear: '2024',
            hours: '22',
            minutes: '12',
            seconds: '34',
            milliseconds: '000',
        }
    }
};

function getParseTestDate2(): ParseResult {
    return {
        number: {
            day: 5,
            month: 11,
            fullYear: 2024,
            hours: 1,
            minutes: 2,
            seconds: 3,
            milliseconds: 456,
        },
        string: {
            day: '05',
            month: '11',
            fullYear: '2024',
            hours: '01',
            minutes: '02',
            seconds: '03',
            milliseconds: '456',
        }
    }
};

function testValidValue(date: Date, parseResult: ParseResult) {
    // toString
    expect(dateParser.toString(date)).toStrictEqual(parseResult.string);
    expect(dateParser.toString(date, undefined)).toStrictEqual(parseResult.string);
    expect(dateParser.toString(date, null)).toStrictEqual(parseResult.string);
    // toNumber
    expect(dateParser.toNumber(date)).toStrictEqual(parseResult.number);
    expect(dateParser.toNumber(date, undefined)).toStrictEqual(parseResult.number);
    expect(dateParser.toNumber(date, null)).toStrictEqual(parseResult.number);
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
        new Date('date'),
        undefined,
        null
    ];

    for (const value of incorrectValues) {
        // toString
        expect(dateParser.toString(value)).toStrictEqual(undefined);
        expect(dateParser.toString(value, undefined)).toStrictEqual(undefined);
        expect(dateParser.toString(value, null)).toStrictEqual(null);
        // toNumber
        expect(dateParser.toNumber(value)).toStrictEqual(undefined);
        expect(dateParser.toNumber(value, undefined)).toStrictEqual(undefined);
        expect(dateParser.toNumber(value, null)).toStrictEqual(null);
    }
});

test('Корректная дата', () => {
    testValidValue(getTestDate1(), getParseTestDate1());
    testValidValue(getTestDate2(), getParseTestDate2());
});
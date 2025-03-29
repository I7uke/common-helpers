import convertToDate from "../../src/convert/convertToDate";
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

function testValidValue(value: number | string, result: Date, changeTime?: TimeChange) {
    const defaultValue: number = + new Date();

    expect(convertToDate({
        value: value,
        changeTime: changeTime
    })).toStrictEqual(result);

    expect(convertToDate({
        value: value,
        defaultValue: undefined,
        changeTime: changeTime
    })).toStrictEqual(result);

    expect(convertToDate({
        value: value,
        defaultValue: null,
        changeTime: changeTime
    })).toStrictEqual(result);

    expect(convertToDate({
        value: value,
        defaultValue: new Date(defaultValue),
        changeTime: changeTime
    })).toStrictEqual(result);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        '',
        ' ',
        'string',
        NaN,
        new Date('InvalidDate'),
        undefined,
        null,
    ];
    const defaultValue: number = + new Date();

    for (const value of incorrectValues) {
        expect(convertToDate({
            value: value,
        })).toStrictEqual(undefined);

        expect(convertToDate({
            value: value,
            defaultValue: undefined
        })).toStrictEqual(undefined);

        expect(convertToDate({
            value: value,
            defaultValue: null
        })).toStrictEqual(null);

        expect(convertToDate({
            value: value,
            defaultValue: new Date(defaultValue)
        })).toStrictEqual(new Date(defaultValue));
    }
});

test('Числа', () => {
    testValidValue(+getTestDate1(), getTestDate1());
    testValidValue(+getTestDate1('startDay'), getTestDate1('startDay'), 'startDay');
    testValidValue(+getTestDate1('endDay'), getTestDate1('endDay'), 'endDay');

    testValidValue(+getTestDate2(), getTestDate2());
    testValidValue(+getTestDate2('startDay'), getTestDate2('startDay'), 'startDay');
    testValidValue(+getTestDate2('endDay'), getTestDate2('endDay'), 'endDay');
});

test('Строки', () => {
    testValidValue(getTestDate1().toISOString(), getTestDate1());
    testValidValue(getTestDate1('startDay').toISOString(), getTestDate1('startDay'), 'startDay');
    testValidValue(getTestDate1('endDay').toISOString(), getTestDate1('endDay'), 'endDay');

    testValidValue(getTestDate2().toISOString(), getTestDate2());
    testValidValue(getTestDate2('startDay').toISOString(), getTestDate2('startDay'), 'startDay');
    testValidValue(getTestDate2('endDay').toISOString(), getTestDate2('endDay'), 'endDay');
});
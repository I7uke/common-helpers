import getLastIdFromUrl from "../src/getLastIdFromUrl";

function testValidValue(url: string, resultString: string, resultNumber?: number) {
    // toString
    expect(getLastIdFromUrl.toString(url)).toStrictEqual(resultString);
    expect(getLastIdFromUrl.toString(url, undefined)).toStrictEqual(resultString);
    expect(getLastIdFromUrl.toString(url, null)).toStrictEqual(resultString);
    expect(getLastIdFromUrl.toString(url, 'defaultValue')).toStrictEqual(resultString);
    // toNumber
    const isCanBeNumber: boolean = typeof resultNumber === 'number';
    if(isCanBeNumber) {
        expect(getLastIdFromUrl.toNumber(url)).toStrictEqual(resultNumber);
    }
    expect(getLastIdFromUrl.toNumber(url, undefined)).toStrictEqual(isCanBeNumber ? resultNumber: undefined);
    expect(getLastIdFromUrl.toNumber(url, null)).toStrictEqual(isCanBeNumber ? resultNumber: null);
    expect(getLastIdFromUrl.toNumber(url, 7)).toStrictEqual(isCanBeNumber ? resultNumber: 7);
}

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        0,
        10,
        NaN
    ];

    for(const value of incorrectValues) {
        // toString
        expect(getLastIdFromUrl.toString(value)).toStrictEqual('');
        expect(getLastIdFromUrl.toString(value, undefined)).toStrictEqual(undefined);
        expect(getLastIdFromUrl.toString(value, null)).toStrictEqual(null);
        expect(getLastIdFromUrl.toString(value, 'defaultValue')).toStrictEqual('defaultValue');
        // toNumber
        expect(getLastIdFromUrl.toNumber(value)).toStrictEqual(0);
        expect(getLastIdFromUrl.toNumber(value, undefined)).toStrictEqual(undefined);
        expect(getLastIdFromUrl.toNumber(value, null)).toStrictEqual(null);
        expect(getLastIdFromUrl.toNumber(value, 5)).toStrictEqual(5);
    }
});

test('Пустое значение', () => {
    const incorrectValues: any[] = [
        '',
        ' ',
        'url',
        'http://path1/path2/',
        'http://path1/path2/ ',
        undefined,
        null
    ];

    for(const value of incorrectValues) {
        // toString
        expect(getLastIdFromUrl.toString(value)).toStrictEqual('');
        expect(getLastIdFromUrl.toString(value, undefined)).toStrictEqual(undefined);
        expect(getLastIdFromUrl.toString(value, null)).toStrictEqual(null);
        expect(getLastIdFromUrl.toString(value, 'defaultValue')).toStrictEqual('defaultValue');
        // toNumber
        expect(getLastIdFromUrl.toNumber(value)).toStrictEqual(0);
        expect(getLastIdFromUrl.toNumber(value, undefined)).toStrictEqual(undefined);
        expect(getLastIdFromUrl.toNumber(value, null)).toStrictEqual(null);
        expect(getLastIdFromUrl.toNumber(value, 5)).toStrictEqual(5);
    }
});

test('id число', () => {
    testValidValue('http://path1/path2/5', '5', 5);
    testValidValue('http://path1/path2/10', '10', 10);
    testValidValue('http://path1/path2/125', '125', 125);
    testValidValue('http://path1/path2/100500', '100500', 100500);
    testValidValue('http://path1/path2/ 5', '5', 5);
    testValidValue('http://path1/path2/ 5 ', '5', 5);
    testValidValue('http://path1/path2/ 15 ', '15', 15);
});

test('id строка', () => {
    testValidValue('http://path1/path2/string', 'string');
    testValidValue('http://path1/path2/t', 't');
    testValidValue('http://path1/path2/ t ', 't');
    testValidValue('http://path1/path2/ string', 'string');
    testValidValue('http://path1/path2/ string ', 'string');
    testValidValue('http://path1/path2/5id ', '5id');
    testValidValue('http://path1/path2/id25 ', 'id25');
});
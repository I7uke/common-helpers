import getLastIdFromUrl from "../src/getLastIdFromUrl";

interface TestUrl {
    readonly url: string;
    readonly idString?: string | undefined | null;
    readonly idNumber?: number | undefined | null;
}

function getTestUrl1(): TestUrl {
    return {
        idNumber: 5,
        idString: '5',
        url: 'http://path1/path2/5'
    }
}

function getTestUrl2(): TestUrl {
    return {
        idString: 'string',
        url: 'http://path1/path2/string'
    }
}

function getTestUrl3(): TestUrl {
    return {
        idString: '5',
        idNumber: 5,
        url: 'http://path1/path2/ 5 '
    }
}

function getTestUrl4(): TestUrl {
    return {
        idString: 'string',
        url: 'http://path1/path2/ string '
    }
}

function getTestUrl5(): TestUrl {
    return {
        idString: '5Id',
        url: 'http://path1/path2/5Id'
    }
}

function getTestUrl6(): TestUrl {
    return {
        url: 'http://path1/path2/'
    }
}

function getTestUrl7(): TestUrl {
    return {
        url: 'http://path1/path2/ '
    }
}

function getTestUrl8(): TestUrl {
    return {
        url: 'path'
    }
}

test('Некорректное значение - boolean', () => {
    expect(getLastIdFromUrl({
        url: true as any
    })).toStrictEqual(undefined);
});

test('Некорректное значение - function', () => {

    expect(getLastIdFromUrl({
        url: (() => { }) as any
    })).toStrictEqual(undefined);
});

test('Некорректное значение - object', () => {
    expect(getLastIdFromUrl({
        url: { a: 1, b: 2 } as any
    })).toStrictEqual(undefined);
});

test('Некорректное значение - array', () => {
    expect(getLastIdFromUrl({
        url: [1, 2, 3] as any
    })).toStrictEqual(undefined);
});

test('1. url: undefined', () => {
    expect(getLastIdFromUrl({
        url: undefined
    })).toStrictEqual(undefined);
});

test('2. url: undefined', () => {
    expect(getLastIdFromUrl({
        url: undefined,
        defaultValue: undefined
    })).toStrictEqual(undefined);
});

test('3. url: undefined', () => {
    expect(getLastIdFromUrl({
        url: undefined,
        defaultValue: null
    })).toStrictEqual(null);
});

test('4. url: undefined', () => {
    expect(getLastIdFromUrl({
        url: undefined,
        defaultValue: 'defaultValue',
        convertTo: 'string'
    })).toStrictEqual('defaultValue');
});

test('5. url: undefined', () => {
    expect(getLastIdFromUrl({
        url: undefined,
        convertTo: 'number',
        defaultValue: 10
    })).toStrictEqual(10);
});

test('1. url: null', () => {
    expect(getLastIdFromUrl({
        url: null
    })).toStrictEqual(undefined);
});

test('2. url: null', () => {
    expect(getLastIdFromUrl({
        url: null,
        defaultValue: null
    })).toStrictEqual(null);
});

test('3. url: null', () => {
    expect(getLastIdFromUrl({
        url: null,
        defaultValue: null
    })).toStrictEqual(null);
});

test('4. url: null', () => {
    expect(getLastIdFromUrl({
        url: null,
        defaultValue: 'defaultValue',
        convertTo: 'string'
    })).toStrictEqual('defaultValue');
});

test('5. url: null', () => {
    expect(getLastIdFromUrl({
        url: null,
        convertTo: 'number',
        defaultValue: 10
    })).toStrictEqual(10);
});

test('1. url: Пустая строка', () => {
    expect(getLastIdFromUrl({
        url: ''
    })).toStrictEqual(undefined);
});

test('2. url: Пустая строка', () => {
    expect(getLastIdFromUrl({
        url: '',
        defaultValue: null
    })).toStrictEqual(null);
});

test('3. url: Пустая строка', () => {
    expect(getLastIdFromUrl({
        url: '',
        defaultValue: null
    })).toStrictEqual(null);
});

test('4. url: Пустая строка', () => {
    expect(getLastIdFromUrl({
        url: '',
        defaultValue: 'defaultValue',
        convertTo: 'string'
    })).toStrictEqual('defaultValue');
});

test('5. url: Пустая строка', () => {
    expect(getLastIdFromUrl({
        url: '',
        convertTo: 'number',
        defaultValue: 10
    })).toStrictEqual(10);
});

test('1. id число', () => {
    const testValue = getTestUrl1();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number'
    })).toStrictEqual(testValue.idNumber);
});

test('2. id число', () => {
    const testValue = getTestUrl1();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'string'
    })).toStrictEqual(testValue.idString);
});

test('3. id число', () => {
    const testValue = getTestUrl3();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number'
    })).toStrictEqual(testValue.idNumber);
});

test('4. id число', () => {
    const testValue = getTestUrl3();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'string'
    })).toStrictEqual(testValue.idString);
});

test('1. id строка', () => {
    const testValue = getTestUrl2();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(testValue.idString);
});

test('2. id строка', () => {
    const testValue = getTestUrl2();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'string'
    })).toStrictEqual(testValue.idString);
});

test('3. id строка', () => {
    const testValue = getTestUrl2();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number'
    })).toStrictEqual(undefined);
});

test('4. id строка', () => {
    const testValue = getTestUrl4();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(testValue.idString);
});

test('5. id строка', () => {
    const testValue = getTestUrl5();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(testValue.idString);
});

test('6. id строка', () => {
    const testValue = getTestUrl5();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number'
    })).toStrictEqual(undefined);
});

test('7. id строка', () => {
    const testValue = getTestUrl5();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number',
        defaultValue: 100
    })).toStrictEqual(100);
});

test('8. id строка', () => {
    const testValue = getTestUrl6();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(undefined);
});

test('9. id строка', () => {
    const testValue = getTestUrl7();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(undefined);
});

test('10. id строка', () => {
    const testValue = getTestUrl8();
    expect(getLastIdFromUrl({
        url: testValue.url,
    })).toStrictEqual(undefined);
});

test('11. id строка', () => {
    const testValue = getTestUrl8();
    expect(getLastIdFromUrl({
        url: testValue.url,
        convertTo: 'number'
    })).toStrictEqual(undefined);
});

test('12. id строка', () => {
    const testValue = getTestUrl8();
    expect(getLastIdFromUrl({
        url: testValue.url,
        defaultValue: 'defaultValue',
    })).toStrictEqual('defaultValue');
});
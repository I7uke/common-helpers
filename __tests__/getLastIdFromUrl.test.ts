import getLastIdFromUrl from "../src/getLastIdFromUrl";

const getEmptyValue = () => ({ isEmpty: true, idNumber: undefined, idString: undefined });

test('Некорректное значение - number', () => {
    expect(getLastIdFromUrl(123456789 as any)).toStrictEqual(getEmptyValue());
});

test('Некорректное значение - boolean', () => {
    expect(getLastIdFromUrl(true as any)).toStrictEqual(getEmptyValue());
});

test('Некорректное значение - function', () => {
    // @ts-ignore
    expect(getLastIdFromUrl(()=>{})).toStrictEqual(getEmptyValue());
});

test('Некорректное значение - object', () => {
    expect(getLastIdFromUrl({a: 1, b: 2} as any)).toStrictEqual(getEmptyValue());
});

test('Некорректное значение - array', () => {
    expect(getLastIdFromUrl([1, 2, 3] as any)).toStrictEqual(getEmptyValue());
});

test('undefined', () => {
    expect(getLastIdFromUrl(undefined)).toStrictEqual(getEmptyValue());
});

test('null', () => {
    expect(getLastIdFromUrl(null)).toStrictEqual(getEmptyValue());
});

test('Пустая строка', () => {
    expect(getLastIdFromUrl('')).toStrictEqual(getEmptyValue());
});

test('Короткий url', () => {
    expect(getLastIdFromUrl('path')).toStrictEqual(getEmptyValue());
});


test('1. url без id', () => {
    expect(getLastIdFromUrl('http://path1/path2/')).toStrictEqual(getEmptyValue());
});

test('2. url без id', () => {
    expect(getLastIdFromUrl('http://path1/path2/ ')).toStrictEqual(getEmptyValue());
});

test('3. url без id', () => {
    expect(getLastIdFromUrl('http://path1/path2/   ')).toStrictEqual(getEmptyValue());
});


test('1. id число', () => {
    expect(getLastIdFromUrl('http://path1/path2/123')).toStrictEqual({ isEmpty: false, idNumber: 123, idString: '123' });
});

test('2. id число', () => {
    expect(getLastIdFromUrl('http://path1/path2/5')).toStrictEqual({ isEmpty: false, idNumber: 5, idString: '5' });
});

test('3. id число', () => {
    expect(getLastIdFromUrl('http://path1/path2/ 5')).toStrictEqual({ isEmpty: false, idNumber: 5, idString: '5' });
});

test('4. id число', () => {
    expect(getLastIdFromUrl('http://path1/path2/ 5 ')).toStrictEqual({ isEmpty: false, idNumber: 5, idString: '5' });
});

test('5. id число', () => {
    expect(getLastIdFromUrl('http://path1/path2/   5   ')).toStrictEqual({ isEmpty: false, idNumber: 5, idString: '5' });
});


test('1. id строка', () => {
    expect(getLastIdFromUrl('http://path1/path2/stringID')).toStrictEqual({ isEmpty: false, idNumber: undefined, idString: 'stringID' });
});

test('2. id строка', () => {
    expect(getLastIdFromUrl('http://path1/path2/5id')).toStrictEqual({ isEmpty: false, idNumber: undefined, idString: '5id' });
});

test('3. id строка', () => {
    expect(getLastIdFromUrl('http://path1/path2/5 test')).toStrictEqual({ isEmpty: false, idNumber: undefined, idString: '5 test' });
});

test('4. id строка', () => {
    expect(getLastIdFromUrl('http://path1/path2/stringID ')).toStrictEqual({ isEmpty: false, idNumber: undefined, idString: 'stringID' });
});

test('5. id строка', () => {
    expect(getLastIdFromUrl('http://path1/path2/   stringID   ')).toStrictEqual({ isEmpty: false, idNumber: undefined, idString: 'stringID' });
});
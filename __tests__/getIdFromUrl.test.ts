import getIdFromUrl from "../src/getIdFromUrl";

test('ID является числом,ожидается число', () => {
    expect(getIdFromUrl({
        idType: 'number',
        defaultValue: -1,
        url: 'http://path1/path2/123'
    })).toStrictEqual(123);
});

test('ID является числом,ожидается строка', () => {
    expect(getIdFromUrl({
        idType: 'string',
        defaultValue: 'empty',
        url: 'http://path1/path2/123'
    })).toStrictEqual('123');
});

test('ID является строкой,ожидается строка', () => {
    expect(getIdFromUrl({
        idType: 'number',
        defaultValue: -1,
        url: 'http://path1/path2/stringID'
    })).toStrictEqual(-1);
});

test('ID является числом,ожидается строка', () => {
    expect(getIdFromUrl({
        idType: 'string',
        defaultValue: 'empty',
        url: 'http://path1/path2/stringID'
    })).toStrictEqual('stringID');
});

test('Пустой URL', () => {
    expect(getIdFromUrl({
        idType: 'string',
        defaultValue: 'defaultValue',
        url: ''
    })).toStrictEqual('defaultValue');
});

test('Некорректное значение idType - неверная строка', () => {
    expect(() => {
        getIdFromUrl({
            // @ts-ignore
            idType: 'Lalala',
            defaultValue: 'defaultValue',
            url: ''
        })
    }).toThrowError('Invalid idType');
});

test('Некорректное значение idType - массив', () => {
    expect(() => {
        getIdFromUrl({
            // @ts-ignore
            idType: [],
            defaultValue: 'defaultValue',
            url: ''
        })
    }).toThrow('Invalid idType');
});

test('Некорректное значение idType - объект', () => {
    expect(() => {
        getIdFromUrl({
            // @ts-ignore
            idType: {test: 123},
            defaultValue: 'defaultValue',
            url: ''
        })
    }).toThrow('Invalid idType');
});
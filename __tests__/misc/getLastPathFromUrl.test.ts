import getLastPathFromUrl from "../../src/misc/getLastPathFromUrl";

function testValidValue(url: string, result: string | null) {
    expect(getLastPathFromUrl(url)).toStrictEqual(result);
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
        '   ',
        'string',
        'string/',
        0,
        10,
        NaN,
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(getLastPathFromUrl(value)).toStrictEqual(null);
    }
});

test('Пустое значение', () => {
    const incorrectValues: any[] = [
        '',
        ' ',
        'url',
        'https://example.com',
        '///',
        undefined,
        null
    ];

    for (const value of incorrectValues) {
        expect(getLastPathFromUrl(value)).toStrictEqual(null);
    }
});

test('id число', () => {
    testValidValue('http://path1/path2/1', '1');
    testValidValue('http://path1/path2/2', '2');
    testValidValue('http://path1/path2/125', '125');
    testValidValue('http://path1/path2/100500', '100500');
    testValidValue('http://path1/path2/ 3', '3');
    testValidValue('http://path1/path2/ 4 ', '4');
    testValidValue('http://path1/path2/ 15 ', '15');
    testValidValue('/path1/path2/26', '26');
    testValidValue('/path2/27', '27');
});

test('Получаем последний путь', () => {
    testValidValue('http://path1/path2/', 'path2');
    testValidValue('http://path1/path2/ ', 'path2');
    testValidValue('http://path1/path2/string', 'string');
    testValidValue('http://path1/path2/t', 't');
    testValidValue('http://path1/path2/ t ', 't');
    testValidValue('http://path1/path2/ string', 'string');
    testValidValue('http://path1/path2/ string ', 'string');
    testValidValue('http://path1/path2/5id ', '5id');
    testValidValue('http://path1/path2/id25 ', 'id25');
});

test('Различные протоколы', () => {
    testValidValue('https://example.com/path1/path2', 'path2');
    testValidValue('http://example.com/path1/path2', 'path2');
    testValidValue('ftp://example.com/path1/path2', 'path2');
    testValidValue('custom://example.com/path1/123', '123');
});

test('Относительные пути', () => {
    testValidValue('/path1/path2/path3', 'path3');
    testValidValue('/path1/path2/123', '123');
    testValidValue('path1/path2/path3', 'path3');
    testValidValue('path1/path2/123', '123');
    testValidValue('/path1/123/', '123');
});

test('Завершающие слеши', () => {
    testValidValue('http://example.com/path1/path2/', 'path2');
    testValidValue('http://example.com/path1/path2///', 'path2');
    testValidValue('/path1/path2/', 'path2');
    testValidValue('/path1/path2///', 'path2');
});

test('Query-параметры', () => {
    testValidValue('http://example.com/path1/123?test=1', '123');
    testValidValue('http://example.com/path1/123?test=1&name=test', '123');
    testValidValue('http://example.com/path1/path2/?test=1', 'path2');
    testValidValue('http://example.com/path1/path2?test=1#section', 'path2');
    testValidValue('http://example.com/path1/path2#section?test1=1&test2=2', 'path2');
});
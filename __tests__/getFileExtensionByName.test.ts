import getFileExtensionByName from "../src/getFileExtensionByName";

function testValidValue(string: string, result: string) {
    expect(getFileExtensionByName(string)).toStrictEqual(result);
    expect(getFileExtensionByName(string, undefined)).toStrictEqual(result);
    expect(getFileExtensionByName(string, null)).toStrictEqual(result);
    expect(getFileExtensionByName(string, 'string defaultValue')).toStrictEqual(result);
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
        'string.',
        'string.   ',
        'string.txt.   ',
        0,
        10,
        NaN,
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(getFileExtensionByName(value)).toStrictEqual('');
        expect(getFileExtensionByName(value, undefined)).toStrictEqual(undefined);
        expect(getFileExtensionByName(value, null)).toStrictEqual(null);
        expect(getFileExtensionByName(value, 'string defaultValue')).toStrictEqual('string defaultValue');
    }
});

test('Корректное имя файла', () => {
    testValidValue('.txt', 'txt');
    testValidValue('a.b', 'b');
    testValidValue('test.txt', 'txt');
    testValidValue('test.t x t', 't x t');
    testValidValue('test. t x t   ', 't x t');
    testValidValue('test.pdf.txt.jpg', 'jpg');
    testValidValue('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt', 'txt');
    testValidValue('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt.png   .PSD', 'psd');
    testValidValue('Lorem ipsum dolor sit amet.TxT', 'txt');
    testValidValue('Lorem ipsum dolor sit amet, solum summo platonem has ea  .  png   ', 'png');
});
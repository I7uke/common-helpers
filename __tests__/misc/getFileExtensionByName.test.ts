import getFileExtensionByName from "../../src/misc/getFileExtensionByName";

function testValidValue(string: string, result: string | null) {
    expect(getFileExtensionByName(string)).toStrictEqual(result);
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
        expect(getFileExtensionByName(value)).toStrictEqual(null);
    }
});

test('Корректное имя файла', () => {
    testValidValue('.txt', null);
    testValidValue('a.b', 'b');
    testValidValue('test.txt', 'txt');
    testValidValue('test.TXT', 'txt');
    testValidValue('image.JpG', 'jpg');
    testValidValue('test.t x t', 't x t');
    testValidValue('test. t x t   ', 't x t');
    testValidValue('test.pdf.txt.jpg', 'jpg');
    testValidValue('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt', 'txt');
    testValidValue('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt.png   .PSD', 'psd');
    testValidValue('Lorem ipsum dolor sit amet.TxT', 'txt');
    testValidValue('Lorem ipsum dolor sit amet, solum summo platonem has ea  .  png   ', 'png');
    testValidValue('.gitignore', null);
    testValidValue('.env', null);
});
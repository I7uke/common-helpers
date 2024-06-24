import getFileExtensionByName from "../src/getFileExtensionByName";

test('test.txt', () => {
    expect(getFileExtensionByName('test.txt')).toStrictEqual('txt');
});

test('test.pdf.txt.jpg', () => {
    expect(getFileExtensionByName('test.pdf.txt.jpg')).toStrictEqual('jpg');
});

test('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt', () => {
    expect(getFileExtensionByName('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt')).toStrictEqual('txt');
});

test('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt.png   .PSD', () => {
    expect(getFileExtensionByName('Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt.png   .PSD')).toStrictEqual('psd');
});

test('TEST.PDF', () => {
    expect(getFileExtensionByName('TEST.PDF')).toStrictEqual('pdf');
});

test('a.b', () => {
    expect(getFileExtensionByName('a.b')).toStrictEqual('b');
});

test('.b', () => {
    expect(getFileExtensionByName('.b')).toStrictEqual(undefined);
});

test('Пустая строка', () => {
    expect(getFileExtensionByName('')).toStrictEqual(undefined);
});

test('undefined', () => {
    expect(getFileExtensionByName(undefined)).toStrictEqual(undefined);
});

test('null', () => {
    expect(getFileExtensionByName(null)).toStrictEqual(undefined);
});

test('Некорректное значение - NaN', () => {
    // @ts-ignore
    expect(getFileExtensionByName(NaN)).toStrictEqual(undefined);
});

test('Некорректное значение - Массив', () => {
    // @ts-ignore
    expect(getFileExtensionByName([])).toStrictEqual(undefined);
});

test('Некорректное значение - Объект', () => {
    // @ts-ignore
    expect(getFileExtensionByName({test: 123})).toStrictEqual(undefined);
});

test('Некорректное значение - Число', () => {
    // @ts-ignore
    expect(getFileExtensionByName(123456789)).toStrictEqual(undefined);
});
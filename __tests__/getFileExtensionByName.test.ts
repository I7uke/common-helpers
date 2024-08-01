import getFileExtensionByName from "../src/getFileExtensionByName";

interface TestFileInfo {
    readonly fileName: string;
    readonly extension: string;
}

function getTestFileName1():TestFileInfo {
    return {
        extension: 'b',
        fileName: 'a.b'
    }
}

function getTestFileName2():TestFileInfo {
    return {
        extension: 'txt',
        fileName: 'test.txt'
    }
}

function getTestFileName3():TestFileInfo {
    return {
        extension: 'jpg',
        fileName: 'test.pdf.txt.jpg'
    }
}

function getTestFileName4():TestFileInfo {
    return {
        extension: 'jpg',
        fileName: 'test.pdf.txt.jpg'
    }
}

function getTestFileName5():TestFileInfo {
    return {
        extension: 'txt',
        fileName: 'Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt'
    }
}

function getTestFileName6():TestFileInfo {
    return {
        extension: 'psd',
        fileName: 'Lorem ipsum dolor sit amet, referrentur comprehensam eu usu.txt.png   .PSD'
    }
}

function getTestFileName7():TestFileInfo {
    return {
        extension: 'txt',
        fileName: 'Lorem ipsum dolor sit amet.TxT'
    }
}

test('1. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName1().fileName)).toStrictEqual(getTestFileName1().extension);
});

test('2. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName2().fileName)).toStrictEqual(getTestFileName2().extension);
});

test('3. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName3().fileName)).toStrictEqual(getTestFileName3().extension);
});

test('4. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName4().fileName)).toStrictEqual(getTestFileName4().extension);
});

test('5. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName5().fileName)).toStrictEqual(getTestFileName5().extension);
});

test('6. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName6().fileName)).toStrictEqual(getTestFileName6().extension);
});

test('7. Корректное название файла', () => {
    expect(getFileExtensionByName(getTestFileName7().fileName)).toStrictEqual(getTestFileName7().extension);
});

test('undefined', () => {
    expect(getFileExtensionByName(undefined)).toStrictEqual('');
});

test('null', () => {
    expect(getFileExtensionByName(null)).toStrictEqual('');
});

test('Некорректное значение - NaN', () => {
    // @ts-ignore
    expect(getFileExtensionByName(NaN)).toStrictEqual('');
});

test('Некорректное значение - Массив', () => {
    // @ts-ignore
    expect(getFileExtensionByName([])).toStrictEqual('');
});

test('Некорректное значение - Объект', () => {
    // @ts-ignore
    expect(getFileExtensionByName({test: 123})).toStrictEqual('');
});

test('Некорректное значение - Число', () => {
    // @ts-ignore
    expect(getFileExtensionByName(123456789)).toStrictEqual('');
});


test('1. Некорректное название файла', () => {
    expect(getFileExtensionByName('')).toStrictEqual(undefined);
});

test('2. Некорректное название файла', () => {
    expect(getFileExtensionByName('.b')).toStrictEqual(undefined);
});

test('3. Некорректное название файла', () => {
    expect(getFileExtensionByName('test.')).toStrictEqual(undefined);
});

test('4. Некорректное название файла', () => {
    expect(getFileExtensionByName('test')).toStrictEqual(undefined);
});


test('1. defaultValue: undefined', () => {
    expect(getFileExtensionByName(undefined, undefined))
        .toStrictEqual(undefined);
});

test('2. defaultValue: undefined', () => {
    expect(getFileExtensionByName(getTestFileName1().fileName, undefined))
        .toStrictEqual(getTestFileName1().extension);
});

test('1. defaultValue: null', () => {
    expect(getFileExtensionByName(null, null))
        .toStrictEqual(null);
});

test('2. defaultValue: null', () => {
    expect(getFileExtensionByName(getTestFileName1().fileName, null))
        .toStrictEqual(getTestFileName1().extension);
});

test('1. defaultValue: string', () => {
    expect(getFileExtensionByName('', 'string'))
        .toStrictEqual('string');
});

test('2. defaultValue: string', () => {
    expect(getFileExtensionByName(getTestFileName1().fileName, 'string'))
        .toStrictEqual(getTestFileName1().extension);
});
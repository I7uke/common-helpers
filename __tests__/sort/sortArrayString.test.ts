import sortArrayString from "../../src/sort/sortArrayString";

type TestArray = (string | undefined | null)[];

interface TestData {
    readonly array: TestArray;
    readonly resultAZInvalidFirst: TestArray;
    readonly resultAZInvalidLast: TestArray;
    readonly resultZAInvalidFirst: TestArray;
    readonly resultZAInvalidLast: TestArray;
}

function getTestData1(): TestData {
    return {
        array: ['a', 'b', 'c', 'd', 'e'],
        resultAZInvalidFirst: ['a', 'b', 'c', 'd', 'e'],
        resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e'],
        resultZAInvalidFirst: ['e', 'd', 'c', 'b', 'a'],
        resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a']
    }
};

function getTestData2(): TestData {
    return {
        array: ['c', 'a', 'b', 'e', 'd',],
        resultAZInvalidFirst: ['a', 'b', 'c', 'd', 'e'],
        resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e'],
        resultZAInvalidFirst: ['e', 'd', 'c', 'b', 'a'],
        resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a']
    }
};

function getTestData3(): TestData {
    return {
        array: ['c', 'a', '', 'b', 'e', '', 'd',],
        resultAZInvalidFirst: ['', '', 'a', 'b', 'c', 'd', 'e'],
        resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', '', ''],
        resultZAInvalidFirst: ['', '', 'e', 'd', 'c', 'b', 'a'],
        resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', '', '']
    }
};

function getTestData4(): TestData {
    return {
        array: ['c', 'a', undefined, '', 'b', null, 'e', '', 'd',],
        resultAZInvalidFirst: [undefined, '', null, '', 'a', 'b', 'c', 'd', 'e'],
        resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', undefined, '', null, '',],
        resultZAInvalidFirst: [undefined, '', null, '', 'e', 'd', 'c', 'b', 'a'],
        resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', undefined, '', null, '',]
    }
};

function getTestData5(): TestData {
    return {
        array: [undefined, '', null, ''],
        resultAZInvalidFirst: [undefined, '', null, ''],
        resultAZInvalidLast: [undefined, '', null, ''],
        resultZAInvalidFirst: [undefined, '', null, ''],
        resultZAInvalidLast: [undefined, '', null, '']
    }
};

function getTestData6(): TestData {
    return {
        array: ['z', 'b', 'c', 'a', 'e', 'Б', 'Я', 'В', 'А', 'Е', 'Z', 'B', 'C', 'A', 'E', 'я', 'б', 'в', 'а', 'е'],
        resultAZInvalidFirst: ['А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z'],
        resultAZInvalidLast: ['А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z'],
        resultZAInvalidFirst: ['z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а'],
        resultZAInvalidLast: ['z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а']
    }
};

//#region Некорректное значение
test('Некорректное значение Date', () => {
    expect(sortArrayString({
        array: new Date() as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayString({
        array: 'string' as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayString({
        array: 5 as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(sortArrayString({
        array: { a: 1, b: 2 } as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(sortArrayString({
        array: (() => { }) as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение undefined', () => {
    expect(sortArrayString({
        array: undefined as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Некорректное значение null', () => {
    expect(sortArrayString({
        array: undefined as any,
        order: 'az',
    })).toStrictEqual([]);
});

test('Пустой массив', () => {
    expect(sortArrayString({
        array: [],
        order: 'az',
    })).toStrictEqual([]);
});
//#endregion

//#region Массив уже отсортирован
test('Массив уже отсортирован A-Z', () => {
    const testData = getTestData1();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив уже отсортирован A-Z', () => {
    const testData = getTestData1();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив уже отсортирован Z-A', () => {
    const testData = getTestData1();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив уже отсортирован Z-A', () => {
    const testData = getTestData1();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Массив корректных значений
test('Массив корректных значений A-Z', () => {
    const testData = getTestData2();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив корректных значений A-Z', () => {
    const testData = getTestData2();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив корректных значений Z-A', () => {
    const testData = getTestData2();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив корректных значений Z-A', () => {
    const testData = getTestData2();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют пустые строки
test('Присутствуют пустые строки A-Z', () => {
    const testData = getTestData3();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют пустые строки A-Z', () => {
    const testData = getTestData3();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют пустые строки Z-A', () => {
    const testData = getTestData3();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют пустые строки Z-A', () => {
    const testData = getTestData3();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют некорректные значения
test('Присутствуют некорректные значения A-Z', () => {
    const testData = getTestData4();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют некорректные значения A-Z', () => {
    const testData = getTestData4();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют некорректные значения Z-A', () => {
    const testData = getTestData4();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют некорректные значения Z-A', () => {
    const testData = getTestData4();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Все значения некорректные
test('Все значения некорректные A-Z', () => {
    const testData = getTestData5();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Все значения некорректные A-Z', () => {
    const testData = getTestData5();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Все значения некорректные Z-A', () => {
    const testData = getTestData5();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Все значения некорректные Z-A', () => {
    const testData = getTestData5();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Разная локаль и регистр
test('Разная локаль и регистр A-Z', () => {
    const testData = getTestData6();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Разная локаль и регистр A-Z', () => {
    const testData = getTestData6();
    expect(sortArrayString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Разная локаль и регистр Z-A', () => {
    const testData = getTestData6();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Разная локаль и регистр Z-A', () => {
    const testData = getTestData6();
    expect(sortArrayString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion
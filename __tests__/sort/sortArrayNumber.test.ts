import sortArrayNumber from "../../src/sort/sortArrayNumber";

type TestArray = (number | undefined | null)[];

interface TestData {
    readonly array: TestArray;
    readonly resultAZInvalidFirst: TestArray;
    readonly resultAZInvalidLast: TestArray;
    readonly resultZAInvalidFirst: TestArray;
    readonly resultZAInvalidLast: TestArray;
}

function getTestData1(): TestData {
    return {
        array: [1, 2, 3, 4, 5],
        resultAZInvalidFirst: [1, 2, 3, 4, 5],
        resultAZInvalidLast: [1, 2, 3, 4, 5],
        resultZAInvalidFirst: [5, 4, 3, 2, 1],
        resultZAInvalidLast: [5, 4, 3, 2, 1]
    }
};

function getTestData2(): TestData {
    return {
        array: [3, 1, 2, 5, 4,],
        resultAZInvalidFirst: [1, 2, 3, 4, 5],
        resultAZInvalidLast: [1, 2, 3, 4, 5],
        resultZAInvalidFirst: [5, 4, 3, 2, 1],
        resultZAInvalidLast: [5, 4, 3, 2, 1]
    }
};

function getTestData3(): TestData {
    return {
        array: [3, 1, NaN, 2, 5, NaN, 4,],
        resultAZInvalidFirst: [NaN, NaN, 1, 2, 3, 4, 5],
        resultAZInvalidLast: [1, 2, 3, 4, 5, NaN, NaN],
        resultZAInvalidFirst: [NaN, NaN, 5, 4, 3, 2, 1],
        resultZAInvalidLast: [5, 4, 3, 2, 1, NaN, NaN]
    }
};

function getTestData4(): TestData {
    return {
        array: [3, 1, undefined, NaN, 2, null, 5, NaN, 4,],
        resultAZInvalidFirst: [undefined, NaN, null, NaN, 1, 2, 3, 4, 5],
        resultAZInvalidLast: [1, 2, 3, 4, 5, undefined, NaN, null, NaN,],
        resultZAInvalidFirst: [undefined, NaN, null, NaN, 5, 4, 3, 2, 1],
        resultZAInvalidLast: [5, 4, 3, 2, 1, undefined, NaN, null, NaN,]
    }
};

function getTestData5(): TestData {
    return {
        array: [ undefined, NaN, null, NaN],
        resultAZInvalidFirst: [undefined, NaN, null, NaN],
        resultAZInvalidLast: [undefined, NaN, null, NaN ],
        resultZAInvalidFirst: [undefined, NaN, null, NaN],
        resultZAInvalidLast: [undefined, NaN, null, NaN]
    }
};

//#region Некорректное значение
test('Некорректное значение Date', () => {
    expect(sortArrayNumber({
        array: new Date() as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayNumber({
        array: 'string' as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayNumber({
        array: 5 as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(sortArrayNumber({
        array: { a: 1, b: 2 } as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(sortArrayNumber({
        array: (() => { }) as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение undefined', () => {
    expect(sortArrayNumber({
        array: undefined as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение null', () => {
    expect(sortArrayNumber({
        array: undefined as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Пустой массив', () => {
    expect(sortArrayNumber({
        array: [],
        order: '09',
    })).toStrictEqual([]);
});
//#endregion

//#region Массив уже отсортирован
test('Массив уже отсортирован 0-9', () => {
    const testData = getTestData1();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив уже отсортирован 0-9', () => {
    const testData = getTestData1();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив уже отсортирован 9-0', () => {
    const testData = getTestData1();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив уже отсортирован 9-0', () => {
    const testData = getTestData1();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Массив корректных значений
test('Массив корректных значений 0-9', () => {
    const testData = getTestData2();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив корректных значений 0-9', () => {
    const testData = getTestData2();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив корректных значений 9-0', () => {
    const testData = getTestData2();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив корректных значений 9-0', () => {
    const testData = getTestData2();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют NaN
test('Присутствуют NaN 0-9', () => {
    const testData = getTestData3();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют NaN 0-9', () => {
    const testData = getTestData3();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют NaN 9-0', () => {
    const testData = getTestData3();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют NaN 9-0', () => {
    const testData = getTestData3();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют некорректные значения
test('Присутствуют некорректные значения 0-9', () => {
    const testData = getTestData4();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют некорректные значения 0-9', () => {
    const testData = getTestData4();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют некорректные значения 9-0', () => {
    const testData = getTestData4();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют некорректные значения 9-0', () => {
    const testData = getTestData4();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Все значения некорректные
test('Все значения некорректные 0-9', () => {
    const testData = getTestData5();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Все значения некорректные 0-9', () => {
    const testData = getTestData5();
    expect(sortArrayNumber({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Все значения некорректные 9-0', () => {
    const testData = getTestData5();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Все значения некорректные 9-0', () => {
    const testData = getTestData5();
    expect(sortArrayNumber({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion
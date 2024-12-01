import sortArrayBoolean from "../../src/sort/sortArrayBoolean";

type TestArray = (boolean | number | string | undefined | null)[];

interface TestData {
    readonly array: TestArray;
    readonly resultTrueFalseInvalidFirst: TestArray;
    readonly resultTrueFalseInvalidLast: TestArray;
    readonly resultFalseTrueInvalidFirst: TestArray;
    readonly resultFalseTrueInvalidLast: TestArray;
}

function getTestData1(): TestData {
    return {
        array: [true, true, true, false, false],
        resultTrueFalseInvalidFirst: [true, true, true, false, false],
        resultTrueFalseInvalidLast: [true, true, true, false, false],
        resultFalseTrueInvalidFirst: [false, false, true, true, true],
        resultFalseTrueInvalidLast: [false, false, true, true, true]
    }
};

function getTestData2(): TestData {
    return {
        array: [true, false, true, false, true],
        resultTrueFalseInvalidFirst: [true, true, true, false, false],
        resultTrueFalseInvalidLast: [true, true, true, false, false],
        resultFalseTrueInvalidFirst: [false, false, true, true, true],
        resultFalseTrueInvalidLast: [false, false, true, true, true]
    }
};

function getTestData3(): TestData {
    return {
        array: [true, 5, false, '', true, false, 0, true, 'string'],
        resultTrueFalseInvalidFirst: [5, '', 0, 'string', true, true, true, false, false],
        resultTrueFalseInvalidLast: [true, true, true, false, false, 5, '', 0, 'string'],
        resultFalseTrueInvalidFirst: [5, '', 0, 'string', false, false, true, true, true],
        resultFalseTrueInvalidLast: [false, false, true, true, true, 5, '', 0, 'string']
    }
};

function getTestData4(): TestData {
    return {
        array: [true, 5, null, false, '', true, undefined, false, 0, true, 'string'],
        resultTrueFalseInvalidFirst: [5, null, '', undefined, 0, 'string', true, true, true, false, false],
        resultTrueFalseInvalidLast: [true, true, true, false, false, 5, null, '', undefined, 0, 'string'],
        resultFalseTrueInvalidFirst: [5, null, '', undefined, 0, 'string', false, false, true, true, true],
        resultFalseTrueInvalidLast: [false, false, true, true, true, 5, null, '', undefined, 0, 'string']
    }
};

function getTestData5(): TestData {
    return {
        array: [5, '', 0, 'string', NaN, undefined, null],
        resultTrueFalseInvalidFirst: [5, '', 0, 'string', NaN, undefined, null],
        resultTrueFalseInvalidLast: [5, '', 0, 'string', NaN, undefined, null],
        resultFalseTrueInvalidFirst: [5, '', 0, 'string', NaN, undefined, null],
        resultFalseTrueInvalidLast: [5, '', 0, 'string', NaN, undefined, null]
    }
};

function getTestData6(): TestData {
    return {
        array: [true, 5, null, false, '', true, undefined, false, 0, true, 'string'],
        resultTrueFalseInvalidFirst: [true, 5, true, true, 'string', null, false, '', false, 0, undefined],
        resultTrueFalseInvalidLast: [true, 5, true, true, 'string', null, false, '', false, 0, undefined],
        resultFalseTrueInvalidFirst: [null, false, '', false, 0, true, 5, true, true, 'string', undefined],
        resultFalseTrueInvalidLast: [null, false, '', false, 0, true, 5, true, true, 'string', undefined]
    }
};

//#region Некорректное значение
test('Некорректное значение Date', () => {
    expect(sortArrayBoolean({
        array: new Date() as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayBoolean({
        array: 'string' as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayBoolean({
        array: 5 as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(sortArrayBoolean({
        array: { a: 1, b: 2 } as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(sortArrayBoolean({
        array: (() => { }) as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение undefined', () => {
    expect(sortArrayBoolean({
        array: undefined as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Некорректное значение null', () => {
    expect(sortArrayBoolean({
        array: undefined as any,
        order: 'falseTrue',
    })).toStrictEqual([]);
});

test('Пустой массив', () => {
    expect(sortArrayBoolean({
        array: [],
        order: 'falseTrue',
    })).toStrictEqual([]);
});
//#endregion

//#region Массив уже отсортирован
test('Массив уже отсортирован true-false', () => {
    const testData = getTestData1();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('Массив уже отсортирован true-false', () => {
    const testData = getTestData1();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('Массив уже отсортирован false-true', () => {
    const testData = getTestData1();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('Массив уже отсортирован false-true', () => {
    const testData = getTestData1();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion

//#region Массив корректных значений
test('Массив корректных значений true-false', () => {
    const testData = getTestData2();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('Массив корректных значений true-false', () => {
    const testData = getTestData2();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('Массив корректных значений false-true', () => {
    const testData = getTestData2();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('Массив корректных значений false-true', () => {
    const testData = getTestData2();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion

//#region Присутствуют другие типы кроме boolean
test('1. Присутствуют другие типы кроме boolean true-false', () => {
    const testData = getTestData3();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('1. Присутствуют другие типы кроме boolean true-false', () => {
    const testData = getTestData3();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('1. Присутствуют другие типы кроме boolean false-true', () => {
    const testData = getTestData3();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('1. Присутствуют другие типы кроме boolean false-true', () => {
    const testData = getTestData3();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion

//#region 2. Присутствуют другие типы кроме boolean
test('2. Присутствуют другие типы кроме boolean true-false', () => {
    const testData = getTestData4();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('2. Присутствуют другие типы кроме boolean true-false', () => {
    const testData = getTestData4();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('2. Присутствуют другие типы кроме boolean false-true', () => {
    const testData = getTestData4();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('2. Присутствуют другие типы кроме boolean false-true', () => {
    const testData = getTestData4();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion

//#region Все значения не boolean
test('Все значения не boolean true-false', () => {
    const testData = getTestData5();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('Все значения не boolean true-false', () => {
    const testData = getTestData5();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('Все значения не boolean false-true', () => {
    const testData = getTestData5();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('Все значения не boolean false-true', () => {
    const testData = getTestData5();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion

//#region Преобразовать к boolean
test('Преобразовать к boolean true-false', () => {
    const testData = getTestData6();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'first',
        isForceConvert: true
    })).toStrictEqual(testData.resultTrueFalseInvalidFirst);
});

test('Преобразовать к boolean true-false', () => {
    const testData = getTestData6();

    expect(sortArrayBoolean({
        array:testData.array,
        order: 'trueFalse',
        orderOfInvalidValue: 'last',
        isForceConvert: true
    })).toStrictEqual(testData.resultTrueFalseInvalidLast);
});

test('Преобразовать к boolean false-true', () => {
    const testData = getTestData6();

    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'first',
        isForceConvert: true
    })).toStrictEqual(testData.resultFalseTrueInvalidFirst);
});

test('Преобразовать к boolean false-true', () => {
    const testData = getTestData6();
    expect(sortArrayBoolean({
        array:testData.array,
        order: 'falseTrue',
        orderOfInvalidValue: 'last',
        isForceConvert: true
    })).toStrictEqual(testData.resultFalseTrueInvalidLast);
});
//#endregion
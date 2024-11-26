import sortArrayDate from "../../src/sort/sortArrayDate";

type TestArray = (Date | undefined | null)[];

interface TestData {
    readonly array: TestArray;
    readonly resultAZInvalidFirst: TestArray;
    readonly resultAZInvalidLast: TestArray;
    readonly resultZAInvalidFirst: TestArray;
    readonly resultZAInvalidLast: TestArray;
}

function getTestData1(): TestData {
    return {
        array: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultAZInvalidFirst: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultAZInvalidLast: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultZAInvalidFirst: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)],
        resultZAInvalidLast: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)]
    }
};

function getTestData2(): TestData {
    return {
        array: [new Date(1730581200000), new Date(1730408400000), new Date(1730494800000), new Date(1730754000000), new Date(1730667600000),],
        resultAZInvalidFirst: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultAZInvalidLast: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultZAInvalidFirst: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)],
        resultZAInvalidLast: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)]
    }
};

function getTestData3(): TestData {
    return {
        array: [new Date(1730581200000), new Date(1730408400000), new Date('InvalidDate'), new Date(1730494800000), new Date(1730754000000), new Date('InvalidDate'), new Date(1730667600000),],
        resultAZInvalidFirst: [new Date('InvalidDate'), new Date('InvalidDate'), new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultAZInvalidLast: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000), new Date('InvalidDate'), new Date('InvalidDate')],
        resultZAInvalidFirst: [new Date('InvalidDate'), new Date('InvalidDate'), new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)],
        resultZAInvalidLast: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000), new Date('InvalidDate'), new Date('InvalidDate')]
    }
};

function getTestData4(): TestData {
    return {
        array: [new Date(1730581200000), new Date(1730408400000), undefined, new Date('InvalidDate'), new Date(1730494800000), null, new Date(1730754000000), new Date('InvalidDate'), new Date(1730667600000),],
        resultAZInvalidFirst: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate'), new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000)],
        resultAZInvalidLast: [new Date(1730408400000), new Date(1730494800000), new Date(1730581200000), new Date(1730667600000), new Date(1730754000000), undefined, new Date('InvalidDate'), null, new Date('InvalidDate'),],
        resultZAInvalidFirst: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate'), new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000)],
        resultZAInvalidLast: [new Date(1730754000000), new Date(1730667600000), new Date(1730581200000), new Date(1730494800000), new Date(1730408400000), undefined, new Date('InvalidDate'), null, new Date('InvalidDate'),]
    }
};

function getTestData5(): TestData {
    return {
        array: [ undefined, new Date('InvalidDate'), null, new Date('InvalidDate')],
        resultAZInvalidFirst: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate')],
        resultAZInvalidLast: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate') ],
        resultZAInvalidFirst: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate')],
        resultZAInvalidLast: [undefined, new Date('InvalidDate'), null, new Date('InvalidDate')]
    }
};

function helperConvertToString(array: TestArray): string[] {
    return array.map(i => String(i));
}

//#region Некорректное значение
test('Некорректное значение Date', () => {
    expect(sortArrayDate({
        array: new Date() as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayDate({
        array: 'string' as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayDate({
        array: 5 as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(sortArrayDate({
        array: { a: 1, b: 2 } as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(sortArrayDate({
        array: (() => { }) as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение undefined', () => {
    expect(sortArrayDate({
        array: undefined as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Некорректное значение null', () => {
    expect(sortArrayDate({
        array: undefined as any,
        order: '09',
    })).toStrictEqual([]);
});

test('Пустой массив', () => {
    expect(sortArrayDate({
        array: [],
        order: '09',
    })).toStrictEqual([]);
});
//#endregion

//#region Массив уже отсортирован
test('Массив уже отсортирован 0-9', () => {
    const testData = getTestData1();
    expect(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив уже отсортирован 0-9', () => {
    const testData = getTestData1();
    expect(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив уже отсортирован 9-0', () => {
    const testData = getTestData1();
    expect(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив уже отсортирован 9-0', () => {
    const testData = getTestData1();
    expect(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Массив корректных значений
test('Массив корректных значений 0-9', () => {
    const testData = getTestData2();
    expect(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив корректных значений 0-9', () => {
    const testData = getTestData2();
    expect(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив корректных значений 9-0', () => {
    const testData = getTestData2();
    expect(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив корректных значений 9-0', () => {
    const testData = getTestData2();
    expect(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют Invalid Date
test('Присутствуют Invalid Date 0-9', () => {
    const testData = getTestData3();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidFirst));
});

test('Присутствуют Invalid Date 0-9', () => {
    const testData = getTestData3();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidLast));
});

test('Присутствуют Invalid Date 9-0', () => {
    const testData = getTestData3();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidFirst));
});

test('Присутствуют Invalid Date 9-0', () => {
    const testData = getTestData3();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidLast));
});
//#endregion

//#region Присутствуют некорректные значения
test('Присутствуют некорректные значения 0-9', () => {
    const testData = getTestData4();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidFirst));
});

test('Присутствуют некорректные значения 0-9', () => {
    const testData = getTestData4();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidLast));
});

test('Присутствуют некорректные значения 9-0', () => {
    const testData = getTestData4();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidFirst));
});

test('Присутствуют некорректные значения 9-0', () => {
    const testData = getTestData4();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidLast));
});
//#endregion

//#region Все значения некорректные
test('Все значения некорректные 0-9', () => {
    const testData = getTestData5();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidFirst));
});

test('Все значения некорректные 0-9', () => {
    const testData = getTestData5();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '09',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultAZInvalidLast));
});

test('Все значения некорректные 9-0', () => {
    const testData = getTestData5();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'first'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidFirst));
});

test('Все значения некорректные 9-0', () => {
    const testData = getTestData5();
    expect(helperConvertToString(sortArrayDate({
        array:testData.array,
        order: '90',
        orderOfInvalidValue: 'last'
    }))).toStrictEqual(helperConvertToString(testData.resultZAInvalidLast));
});
//#endregion
import sortArrayObjectString from '../../src/sort/sortArrayObjectString';

interface TestItem  {
    readonly index: number;
    readonly fieldString: string | undefined | null;
    readonly fieldNumber: number;
    readonly fieldBoolean: boolean;
    readonly fieldObject?: TestItem;
};

interface TestData {
    readonly array: TestItem[];
    readonly resultAZInvalidFirst: number[];
    readonly resultAZInvalidLast: number[];
    readonly resultZAInvalidFirst: number[];
    readonly resultZAInvalidLast: number[];
}

function getArrayIndex(itemsList: TestItem[]): number[] {
    return itemsList.map(i => i.index);
}

function getTestData1(): TestData {
    return {
        array: [
            {
                index: 0,
                fieldBoolean: true,
                fieldNumber: 1,
                fieldString: 'a'
            },
            {
                index: 1,
                fieldBoolean: false,
                fieldNumber: 2,
                fieldString: 'b'
            },
            {
                index: 2,
                fieldBoolean: true,
                fieldNumber: 3,
                fieldString: 'c'
            },
            {
                index: 3,
                fieldBoolean: false,
                fieldNumber: 4,
                fieldString: 'd'
            },
            {
                index: 4,
                fieldBoolean: true,
                fieldNumber: 5,
                fieldString: 'e'
            }
        ],
        resultAZInvalidFirst: [0, 1, 2, 3, 4],
        resultAZInvalidLast: [0, 1, 2, 3, 4],
        resultZAInvalidFirst: [4, 3, 2, 1, 0],
        resultZAInvalidLast: [4, 3, 2, 1, 0]
    }
};

function getTestData2(): TestData {
    return {
        array: [
            {
                index: 0,
                fieldBoolean: true,
                fieldNumber: 3,
                fieldString: 'c'
            },
            {
                index: 1,
                fieldBoolean: true,
                fieldNumber: 1,
                fieldString: 'a'
            },
            {
                index: 2,
                fieldBoolean: false,
                fieldNumber: 2,
                fieldString: 'b'
            },
            {
                index: 3,
                fieldBoolean: true,
                fieldNumber: 5,
                fieldString: 'e'
            },
            {
                index: 4,
                fieldBoolean: false,
                fieldNumber: 4,
                fieldString: 'd'
            }
        ],
        resultAZInvalidFirst: [1, 2, 0, 4, 3 ],
        resultAZInvalidLast: [1, 2, 0, 4, 3],
        resultZAInvalidFirst: [3, 4, 0, 2, 1],
        resultZAInvalidLast: [3, 4, 0, 2, 1]
    }
};

function getTestData3(): TestData {
    return {
        array: [
            {
                index: 0,
                fieldBoolean: true,
                fieldNumber: 1,
                fieldString: 'c'
            },
            {
                index: 1,
                fieldBoolean: false,
                fieldNumber: 2,
                fieldString: 'a'
            },
            {
                index: 2,
                fieldBoolean: true,
                fieldNumber: 3,
                fieldString: ''
            },
            {
                index: 3,
                fieldBoolean: false,
                fieldNumber: 4,
                fieldString: 'b'
            },
            {
                index: 4,
                fieldBoolean: true,
                fieldNumber: 5,
                fieldString: 'e'
            },
            {
                index: 5,
                fieldBoolean: false,
                fieldNumber: 6,
                fieldString: ''
            },
            {
                index: 6,
                fieldBoolean: true,
                fieldNumber: 7,
                fieldString: 'd'
            }
        ],
        resultAZInvalidFirst: [2, 5, 1, 3, 0, 6, 4],
        resultAZInvalidLast: [1, 3, 0, 6, 4, 2, 5],
        resultZAInvalidFirst: [2, 5, 4, 6, 0, 3, 1],
        resultZAInvalidLast: [4, 6, 0, 3, 1, 2, 5]
    }
};

function getTestData4(): TestData {
    return {
        array: [
            {
                index: 0,
                fieldBoolean: true,
                fieldNumber: 1,
                fieldString: 'c'
            },
            {
                index: 1,
                fieldBoolean: false,
                fieldNumber: 2,
                fieldString: 'a'
            },
            {
                index: 2,
                fieldBoolean: true,
                fieldNumber: 3,
                fieldString: undefined
            },
            {
                index: 3,
                fieldBoolean: false,
                fieldNumber: 4,
                fieldString: ''
            },
            {
                index: 4,
                fieldBoolean: false,
                fieldNumber: 5,
                fieldString: 'b'
            },
            {
                index: 5,
                fieldBoolean: false,
                fieldNumber: 6,
                fieldString: null
            },
            {
                index: 6,
                fieldBoolean: true,
                fieldNumber: 7,
                fieldString: 'e'
            },
            {
                index: 7,
                fieldBoolean: false,
                fieldNumber: 8,
                fieldString: ''
            },
            {
                index: 8,
                fieldBoolean: true,
                fieldNumber: 9,
                fieldString: 'd'
            }
        ],
        resultAZInvalidFirst: [2, 3, 5, 7, 1, 4, 0, 8, 6],
        resultAZInvalidLast: [1, 4, 0, 8, 6, 2, 3, 5, 7],
        resultZAInvalidFirst: [2, 3, 5, 7, 6, 8, 0, 4, 1],
        resultZAInvalidLast: [6, 8, 0, 4, 1, 2, 3, 5, 7]
    }
};

function getTestData5(): TestData {
    return {
        array: [
            {
                index: 0,
                fieldBoolean: true,
                fieldNumber: 1,
                fieldString: undefined
            },
            {
                index: 1,
                fieldBoolean: false,
                fieldNumber: 2,
                fieldString: ''
            },
            {
                index: 2,
                fieldBoolean: true,
                fieldNumber: 3,
                fieldString: null
            },
            {
                index: 3,
                fieldBoolean: false,
                fieldNumber: 4,
                fieldString: ''
            }
        ],
        resultAZInvalidFirst: [0, 1, 2, 3],
        resultAZInvalidLast: [0, 1, 2, 3],
        resultZAInvalidFirst: [0, 1, 2, 3],
        resultZAInvalidLast: [0, 1, 2, 3]
    }
};

function getTestData6(): TestData {
    return {
        array:  [
            {
                index: 0,
                fieldNumber: 1,
                fieldBoolean: true,
                fieldString: 'z'
            },
            {
                index: 1,
                fieldNumber: 2,
                fieldBoolean: false,
                fieldString: 'b'
            },
            {
                index: 2,
                fieldNumber: 3,
                fieldBoolean: true,
                fieldString: 'c'
            },
            {
                index: 3,
                fieldNumber: 4,
                fieldBoolean: false,
                fieldString: 'a'
            },
            {
                index: 4,
                fieldNumber: 5,
                fieldBoolean: true,
                fieldString: 'e'
            },
            {
                index: 5,
                fieldNumber: 6,
                fieldBoolean: false,
                fieldString: 'Б'
            },
            {
                index: 6,
                fieldNumber: 7,
                fieldBoolean: true,
                fieldString: 'Я'
            },
            {
                index: 7,
                fieldNumber: 8,
                fieldBoolean: false,
                fieldString: 'В'
            },
            {
                index: 8,
                fieldNumber: 9,
                fieldBoolean: true,
                fieldString: 'А'
            },
            {
                index: 9,
                fieldNumber: 10,
                fieldBoolean: false,
                fieldString: 'Е'
            },
            {
                index: 10,
                fieldNumber: 11,
                fieldBoolean: true,
                fieldString: 'Z'
            },
            {
                index: 11,
                fieldNumber: 12,
                fieldBoolean: false,
                fieldString: 'B'
            },
            {
                index: 12,
                fieldNumber: 13,
                fieldBoolean: true,
                fieldString: 'C'
            },
            {
                index: 13,
                fieldNumber: 14,
                fieldBoolean: false,
                fieldString: 'A'
            },
            {
                index: 14,
                fieldNumber: 15,
                fieldBoolean: true,
                fieldString: 'E'
            },
            {
                index: 15,
                fieldNumber: 16,
                fieldBoolean: false,
                fieldString: 'я'
            },
            {
                index: 16,
                fieldNumber: 17,
                fieldBoolean: true,
                fieldString: 'б'
            },
            {
                index: 17,
                fieldNumber: 18,
                fieldBoolean: false,
                fieldString: 'в'
            },
            {
                index: 18,
                fieldNumber: 19,
                fieldBoolean: true,
                fieldString: 'а'
            },
            {
                index: 19,
                fieldNumber: 20,
                fieldBoolean: false,
                fieldString: 'е'
            }
        ],
        resultAZInvalidFirst: [8, 18, 5, 16, 7, 17, 9, 19, 6, 15, 3, 13, 1, 11, 2, 12, 4, 14, 0, 10],
        resultAZInvalidLast: [8, 18, 5, 16, 7, 17, 9, 19, 6, 15, 3, 13, 1, 11, 2, 12, 4, 14, 0, 10],
        resultZAInvalidFirst: [0, 10, 4, 14, 2, 12, 1, 11, 3, 13, 6, 15, 9, 19, 7, 17, 5, 16, 8, 18],
        resultZAInvalidLast: [0, 10, 4, 14, 2, 12, 1, 11, 3, 13, 6, 15, 9, 19, 7, 17, 5, 16, 8, 18]
    }
};

//#region Некорректное значение
test('Некорректное значение Date', () => {
    expect(sortArrayObjectString({
        array: new Date() as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayObjectString({
        array: 'string' as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(sortArrayObjectString({
        array: 5 as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(sortArrayObjectString({
        array: { a: 1, b: 2 } as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(sortArrayObjectString({
        array: (() => { }) as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение undefined', () => {
    expect(sortArrayObjectString({
        array: undefined as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Некорректное значение null', () => {
    expect(sortArrayObjectString({
        array: undefined as any,
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});

test('Пустой массив', () => {
    expect(sortArrayObjectString({
        array: [],
        order: 'az',
        field: ''
    })).toStrictEqual([]);
});
//#endregion

//#region Массив уже отсортирован
test('Массив уже отсортирован A-Z', () => {
    const testData = getTestData1();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив уже отсортирован A-Z', () => {
    const testData = getTestData1();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });

    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив уже отсортирован Z-A', () => {
    const testData = getTestData1();
    const result =sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив уже отсортирован Z-A', () => {
    const testData = getTestData1();
    const result =sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });

    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Массив корректных значений
test('Массив корректных значений A-Z', () => {
    const testData = getTestData2();
    const result =sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });

    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Массив корректных значений A-Z', () => {
    const testData = getTestData2();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Массив корректных значений Z-A', () => {
    const testData = getTestData2();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });

    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Массив корректных значений Z-A', () => {
    const testData = getTestData2();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });

    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют пустые строки
test('Присутствуют пустые строки A-Z', () => {
    const testData = getTestData3();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют пустые строки A-Z', () => {
    const testData = getTestData3();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют пустые строки Z-A', () => {
    const testData = getTestData3();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют пустые строки Z-A', () => {
    const testData = getTestData3();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Присутствуют некорректные значения
test('Присутствуют некорректные значения A-Z', () => {
    const testData = getTestData4();
    const result =sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Присутствуют некорректные значения A-Z', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Присутствуют некорректные значения Z-A', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Присутствуют некорректные значения Z-A', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Все значения некорректные
test('Все значения некорректные A-Z', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Все значения некорректные A-Z', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Все значения некорректные Z-A', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Все значения некорректные Z-A', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Разная локаль и регистр
test('Разная локаль и регистр A-Z', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('Разная локаль и регистр A-Z', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('Разная локаль и регистр Z-A', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('Разная локаль и регистр Z-A', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: 'fieldString'
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});
//#endregion

//#region Получаем значение через функцию
test('1. Получаем значение через функцию', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('2. Получаем значение через функцию', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('3. Получаем значение через функцию', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('4. Получаем значение через функцию', () => {
    const testData = getTestData6();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});

test('5. Получаем значение через функцию', () => {
    const testData = getTestData4();
    const result =sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('6. Получаем значение через функцию', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('7. Получаем значение через функцию', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('8. Получаем значение через функцию', () => {
    const testData = getTestData4();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});

test('9. Получаем значение через функцию', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidFirst);
});

test('10. Получаем значение через функцию', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'az',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultAZInvalidLast);
});

test('11. Получаем значение через функцию', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'first',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidFirst);
});

test('12. Получаем значение через функцию', () => {
    const testData = getTestData5();
    const result = sortArrayObjectString({
        array: testData.array,
        order: 'za',
        orderOfInvalidValue: 'last',
        field: item => item.fieldString
    });
    expect(getArrayIndex(result)).toStrictEqual(testData.resultZAInvalidLast);
});

//#endregion
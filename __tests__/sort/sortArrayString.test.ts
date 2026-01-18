import sortArrayString from "../../src/sort/sortArrayString";

interface TestObject {
    readonly array: any;
    readonly resultAZInvalidFirst: any;
    readonly resultAZInvalidLast: any;
    readonly resultZAInvalidFirst: any;
    readonly resultZAInvalidLast: any;
}

function testGroup(testObject: TestObject) {
    // array 
    expect(sortArrayString({
        array: testObject.array
    })).toStrictEqual(testObject.resultAZInvalidLast);

    // order
    expect(sortArrayString({
        array: testObject.array,
        order: 'a-z',
    })).toStrictEqual(testObject.resultAZInvalidLast);

    expect(sortArrayString({
        array: testObject.array,
        order: 'z-a',
    })).toStrictEqual(testObject.resultZAInvalidLast);

    // orderOfInvalidValue
    expect(sortArrayString({
        array: testObject.array,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testObject.resultAZInvalidFirst);

    expect(sortArrayString({
        array: testObject.array,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testObject.resultAZInvalidLast);

    // order orderOfInvalidValue
    expect(sortArrayString({
        array: testObject.array,
        order: 'a-z',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testObject.resultAZInvalidFirst);

    expect(sortArrayString({
        array: testObject.array,
        order: 'a-z',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testObject.resultAZInvalidLast);

    expect(sortArrayString({
        array: testObject.array,
        order: 'z-a',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testObject.resultZAInvalidFirst);

    expect(sortArrayString({
        array: testObject.array,
        order: 'z-a',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testObject.resultZAInvalidLast);
}

//#region Некорректное значение
test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        -5,
        0,
        10,
        '',
        ' ',
        'string',
        '123',
        NaN,
        new Date('InvalidDate'),
        undefined,
        null,
        []
    ];

    for (const value of incorrectValues) {
        testGroup({
            array: value,
            resultAZInvalidFirst: [],
            resultAZInvalidLast: [],
            resultZAInvalidFirst: [],
            resultZAInvalidLast: [],
        });
    }
});
//#endregion

//#region В массиве нет строк
test('В массиве нет строк', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        -5,
        0,
        10,
        NaN,
        new Date('InvalidDate'),
        undefined,
        null,
        [],
        [1, 2, 3],
        ['a', 'b', 'c']
    ];

    testGroup({
        array: incorrectValues,
        resultAZInvalidFirst: incorrectValues,
        resultAZInvalidLast: incorrectValues,
        resultZAInvalidFirst: incorrectValues,
        resultZAInvalidLast: incorrectValues,
    });
});
//#endregion

//#region В массиве только строки
test('В массиве только строки', () => {
    const testArray: TestObject[] = [
        {
            array: ['a', 'b', 'c', 'd', 'e'],
            resultAZInvalidFirst: ['a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e'],
            resultZAInvalidFirst: ['e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a']
        },
        {
            array: ['c', 'a', 'b', 'e', 'd',],
            resultAZInvalidFirst: ['a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e'],
            resultZAInvalidFirst: ['e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a']
        },
        {
            array: ['d', 'z', 'b', 'г', 'я', 'б'],
            resultAZInvalidFirst: ['б', 'г', 'я', 'b', 'd', 'z'],
            resultAZInvalidLast: ['б', 'г', 'я', 'b', 'd', 'z'],
            resultZAInvalidFirst: ['z', 'd', 'b', 'я', 'г', 'б'],
            resultZAInvalidLast: ['z', 'd', 'b', 'я', 'г', 'б']
        },
        {
            array: ['c', 'a', '', 'b', 'e', '', 'd',],
            resultAZInvalidFirst: ['', '', 'a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', '', ''],
            resultZAInvalidFirst: ['', '', 'e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', '', '']
        },
        {
            array: ['z', 'b', 'c', 'a', 'e', 'Б', 'Я', 'В', 'А', 'Е', 'Z', 'B', 'C', 'A', 'E', 'я', 'б', 'в', 'а', 'е'],
            resultAZInvalidFirst: ['А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z'],
            resultAZInvalidLast: ['А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z'],
            resultZAInvalidFirst: ['z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а'],
            resultZAInvalidLast: ['z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а']
        }
    ];

    for (const value of testArray) {
        testGroup(value);
    }
});
//#endregion

//#region В массиве есть строки и не строки
test('В массиве есть строки и не строки', () => {
    const testArray: TestObject[] = [
        {
            array: ['c', 'a', undefined, '', 'b', null, 'e', '', 'd',],
            resultAZInvalidFirst: [undefined, '', null, '', 'a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', undefined, '', null, '',],
            resultZAInvalidFirst: [undefined, '', null, '', 'e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', undefined, '', null, '',]
        },
        {
            array: [undefined, '', null, ''],
            resultAZInvalidFirst: [undefined, '', null, ''],
            resultAZInvalidLast: [undefined, '', null, ''],
            resultZAInvalidFirst: [undefined, '', null, ''],
            resultZAInvalidLast: [undefined, '', null, '']
        },
        {
            array: ['a', undefined, 'b', { a: 1, b: 2 }, 'c', null, 100, NaN, 'd', 5, 'e'],
            resultAZInvalidFirst: [undefined, { a: 1, b: 2 }, null, 100, NaN, 5, 'a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', undefined, { a: 1, b: 2 }, null, 100, NaN, 5],
            resultZAInvalidFirst: [undefined, { a: 1, b: 2 }, null, 100, NaN, 5, 'e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', undefined, { a: 1, b: 2 }, null, 100, NaN, 5]
        },
        {
            array: ['d', 1, 2, 3, 'z', 'b', 'г', 4, 5, 6, 'я', 7, 'б', 8, 9],
            resultAZInvalidFirst: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'б', 'г', 'я', 'b', 'd', 'z'],
            resultAZInvalidLast: ['б', 'г', 'я', 'b', 'd', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9],
            resultZAInvalidFirst: [1, 2, 3, 4, 5, 6, 7, 8, 9, 'z', 'd', 'b', 'я', 'г', 'б'],
            resultZAInvalidLast: ['z', 'd', 'b', 'я', 'г', 'б', 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        {
            array: ['c', 'a', 1, 'b', 'e', 2, 'd',],
            resultAZInvalidFirst: [1, 2, 'a', 'b', 'c', 'd', 'e'],
            resultAZInvalidLast: ['a', 'b', 'c', 'd', 'e', 1, 2],
            resultZAInvalidFirst: [1, 2, 'e', 'd', 'c', 'b', 'a'],
            resultZAInvalidLast: ['e', 'd', 'c', 'b', 'a', 1, 2]
        },
        {
            array: ['z', 'b', undefined, 'c', 'a', null, 'e', 'Б', 'Я', NaN, 'В', [], 'А', 'Е', 'Z', ['test'], 'B', 'C', { a: 100 }, 'A', 'E', 5, 'я', 'б', 'в', 'а', 'е', 10],
            resultAZInvalidFirst: [undefined, null, NaN, [], ['test'], { a: 100 }, 5, 10, 'А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z'],
            resultAZInvalidLast: ['А', 'а', 'Б', 'б', 'В', 'в', 'Е', 'е', 'Я', 'я', 'a', 'A', 'b', 'B', 'c', 'C', 'e', 'E', 'z', 'Z', undefined, null, NaN, [], ['test'], { a: 100 }, 5, 10],
            resultZAInvalidFirst: [undefined, null, NaN, [], ['test'], { a: 100 }, 5, 10, 'z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а'],
            resultZAInvalidLast: ['z', 'Z', 'e', 'E', 'c', 'C', 'b', 'B', 'a', 'A', 'Я', 'я', 'Е', 'е', 'В', 'в', 'Б', 'б', 'А', 'а', undefined, null, NaN, [], ['test'], { a: 100 }, 5, 10]
        }
    ];

    for (const value of testArray) {
        testGroup(value);
    }
});
//#endregion
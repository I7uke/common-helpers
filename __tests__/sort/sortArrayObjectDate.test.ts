import { sortArrayObjectDate } from "../../src";
import type { OrderNumber } from "../../src/models/sorting";

interface TestItem<T = Date> {
    readonly index: number;
    readonly fieldA: T;
}

const getTestDate1 = () => new Date(1730408400000);
const getTestDate2 = () => new Date(1730494800000);
const getTestDate3 = () => new Date(1730581200000);
const getTestDate4 = () => new Date(1730667600000);
const getTestDate5 = () => new Date(1730754000000);
const getTestInvalidDate = () => new Date('InvalidDate');

function getFieldA(item: TestItem<any>): any {
    return item?.fieldA;
}

function testGroupIdenticalResult(array: any[], result: any[]) {
    expect(sortArrayObjectDate({
        array: array,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual(result);

    expect(sortArrayObjectDate({
        array: array,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectDate({
        array: array,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);

    //9-0
    expect(sortArrayObjectDate({
        array: array,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual(result);

    expect(sortArrayObjectDate({
        array: array,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(result);

    expect(sortArrayObjectDate({
        array: array,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(result);
}

test('Некорректный аргумент и массивы с одним элементом', () => {
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
        new Date(),
        new Date('InvalidDate'),
        undefined,
        null,
        []
    ];

    for (const value of incorrectValues) {
        testGroupIdenticalResult(value, []);
        testGroupIdenticalResult([value], [value]);
    }
});

test('В массиве нет Date', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: null },
        { index: 1, fieldA: true },
        { index: 2, fieldA: {} },
        { index: 3, fieldA: 0 },
        { index: 4, fieldA: '' },
        { index: 5, fieldA: undefined },
        { index: 6, fieldA: false },
        { index: 7, fieldA: -1 },
        { index: 8, fieldA: [] },
        { index: 9, fieldA: 'string' },
        { index: 10, fieldA: 1 },
    ];

    testGroupIdenticalResult(testArray, testArray);
});

test('Массив уже отсортирован', () => {
    const testArray09: TestItem<unknown>[] = [
        { index: 0, fieldA: getTestDate1() },
        { index: 1, fieldA: getTestDate2() },
        { index: 2, fieldA: getTestDate3() },
        { index: 3, fieldA: getTestDate4() },
        { index: 4, fieldA: getTestDate5() }
    ];

    const testArray90: TestItem<unknown>[] = testArray09.slice().reverse();

    expect(sortArrayObjectDate({
        array: testArray09,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual(testArray09);

    expect(sortArrayObjectDate({
        array: testArray09,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testArray09);

    expect(sortArrayObjectDate({
        array: testArray09,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testArray09);

    //9-0
    expect(sortArrayObjectDate({
        array: testArray90,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual(testArray90);

    expect(sortArrayObjectDate({
        array: testArray90,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual(testArray90);

    expect(sortArrayObjectDate({
        array: testArray90,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual(testArray90);
});

test('Массив только Date', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: getTestDate2() },
        { index: 1, fieldA: getTestDate4() },
        { index: 2, fieldA: getTestDate5() },
        { index: 3, fieldA: getTestDate1() },
        { index: 4, fieldA: getTestDate3() }
    ];

    const result09: TestItem<unknown>[] = [
        { index: 3, fieldA: getTestDate1() },
        { index: 0, fieldA: getTestDate2() },
        { index: 4, fieldA: getTestDate3() },
        { index: 1, fieldA: getTestDate4() },
        { index: 2, fieldA: getTestDate5() }
    ];

    const result90: TestItem<unknown>[] = result09.slice().reverse();

    const resultTest: Record<OrderNumber, TestItem<unknown>[]> = {
        "0-9": result09,
        "9-0": result90
    }

    for (const rawOrder in resultTest) {
        const order = rawOrder as OrderNumber;
        const result = resultTest[order];

        expect(sortArrayObjectDate({
            array: testArray,
            order: order,
            field: getFieldA
        })).toStrictEqual(result);

        expect(sortArrayObjectDate({
            array: testArray,
            order: order,
            field: getFieldA,
            orderOfInvalidValue: 'first'
        })).toStrictEqual(result);

        expect(sortArrayObjectDate({
            array: testArray,
            order: order,
            field: getFieldA,
            orderOfInvalidValue: 'last'
        })).toStrictEqual(result);
    }
});

test('В массиве присутствуют другие значения помимо Date', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: getTestDate3() },
        { index: 1, fieldA: undefined },
        { index: 2, fieldA: false },
        { index: 3, fieldA: getTestDate2() },
        { index: 4, fieldA: null },
        { index: 5, fieldA: 'string' },
        { index: 6, fieldA: true },
        { index: 7, fieldA: '' },
        { index: 8, fieldA: getTestDate4() },
        { index: 9, fieldA: NaN },
        { index: 10, fieldA: getTestDate1() },
        { index: 11, fieldA: {} },
        { index: 12, fieldA: getTestDate5() },
        { index: 13, fieldA: [] },
        { index: 14, fieldA: false }
    ];

    const result09: TestItem<unknown>[] = [
        { index: 10, fieldA: getTestDate1() },
        { index: 3, fieldA: getTestDate2() },
        { index: 0, fieldA: getTestDate3() },
        { index: 8, fieldA: getTestDate4() },
        { index: 12, fieldA: getTestDate5() }
    ];

    const result90: TestItem<unknown>[] = result09.slice().reverse();

    const resultInvalidItems: TestItem<unknown>[] = [
        { index: 1, fieldA: undefined },
        { index: 2, fieldA: false },
        { index: 4, fieldA: null },
        { index: 5, fieldA: 'string' },
        { index: 6, fieldA: true },
        { index: 7, fieldA: '' },
        { index: 9, fieldA: NaN },
        { index: 11, fieldA: {} },
        { index: 13, fieldA: [] },
        { index: 14, fieldA: false }
    ];

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result09]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    //9-0
    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual([...result90, ...resultInvalidItems]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result90]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result90, ...resultInvalidItems]);
});

test('Повторяющиеся Date', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: getTestDate1() },
        { index: 1, fieldA: getTestDate1() },
        { index: 2, fieldA: getTestDate1() }
    ];

    testGroupIdenticalResult(testArray, testArray);
});

test('Массив содержит только InvalidDate', () => {
    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: new Date('InvalidDate') },
        { index: 1, fieldA: new Date('InvalidDate') },
        { index: 2, fieldA: new Date('InvalidDate') }
    ];

    testGroupIdenticalResult(testArray, testArray);
});

test('В массиве присутствует невалидная Date', () => {
    const invalidDate1 = getTestInvalidDate();
    const invalidDate2 = getTestInvalidDate();

    const testArray: TestItem<unknown>[] = [
        { index: 0, fieldA: getTestDate2() },
        { index: 1, fieldA: invalidDate1 },
        { index: 2, fieldA: getTestDate1() },
        { index: 3, fieldA: getTestDate3() },
        { index: 4, fieldA: invalidDate2 }
    ];

    const result09: TestItem<unknown>[] = [
        { index: 2, fieldA: getTestDate1() },
        { index: 0, fieldA: getTestDate2() },
        { index: 3, fieldA: getTestDate3() }
    ];

    const result90: TestItem<unknown>[] = result09.slice().reverse();

    const resultInvalidItems = [
        { index: 1, fieldA: invalidDate1 },
        { index: 4, fieldA: invalidDate2 }
    ];

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result09]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '0-9',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result09, ...resultInvalidItems]);

    //9-0
    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA
    })).toStrictEqual([...result90, ...resultInvalidItems]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...resultInvalidItems, ...result90]);

    expect(sortArrayObjectDate({
        array: testArray,
        order: '9-0',
        field: getFieldA,
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...result90, ...resultInvalidItems]);
});

test('Исходный массив не мутирует', () => {
    const getTestArray = (): TestItem<unknown>[] => [
        { index: 0, fieldA: getTestDate1() },
        { index: 1, fieldA: getTestDate2() },
        { index: 2, fieldA: getTestDate3() }
    ];

    const testArray = getTestArray();
    const results: TestItem<unknown>[][] = [];

    // 0-9
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '0-9'
    }));
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '0-9',
        orderOfInvalidValue: 'first'
    }));
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '0-9',
        orderOfInvalidValue: 'last'
    }));
    // 9-0
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '9-0'
    }));
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '9-0',
        orderOfInvalidValue: 'first'
    }));
    results.push(sortArrayObjectDate({
        array: testArray,
        field: getFieldA,
        order: '9-0',
        orderOfInvalidValue: 'last'
    }));

    for (const array of results) {
        expect(array === testArray).toStrictEqual(false);
    }

    expect(testArray).toStrictEqual(getTestArray());
});
import uniqueArray from "../src/uniqueArray";

interface TestArray<T extends unknown> {
    readonly testArray: T[];
    readonly uniqueArray: T[]
}

interface TestObject {
    readonly a: string;
    readonly b: number;
    readonly c: boolean;
}

function getTestArrayString(): TestArray<string> {
    return {
        testArray: ['test_1', 'test_1', 'test_2', 'test_2', 'test_3', 'test_3', 'test_4', 'test_4', 'test_5', 'test_5'],
        uniqueArray: ['test_1', 'test_2', 'test_3', 'test_4', 'test_5']
    }
}

function getTestArrayNumber(): TestArray<number> {
    return {
        testArray: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
        uniqueArray: [1, 2, 3, 4, 5]
    }
}

function getTestArrayDate(): TestArray<Date> {
    return {
        testArray: [new Date(1719601954000), new Date(1719601954000), new Date(1730757723456), new Date(1730757723456), new Date(1719601954000)],
        uniqueArray: [new Date(1719601954000), new Date(1719601954000), new Date(1730757723456), new Date(1730757723456), new Date(1719601954000)]
    }
}

function getTestArrayBoolean(): TestArray<boolean> {
    return {
        testArray: [true, true, false, true, false],
        uniqueArray: [true, false]
    }
}

function getTestArrayUndefinedNull(): TestArray<undefined | null> {
    return {
        testArray: [undefined, undefined, null, undefined, null],
        uniqueArray: [undefined, null]
    }
}

function getTestArrayObject(): TestArray<TestObject> {
    const testObj_1: TestObject = {
        a: 'a_1',
        b: 1,
        c: true
    };

    const testObj_2: TestObject = {
        a: 'a_3',
        b: 1,
        c: false
    };

    return {
        testArray: [
            testObj_1,
            {
                a: 'a_2',
                b: 2,
                c: true
            },
            testObj_2,
            {
                a: 'a_4',
                b: 1,
                c: true
            },
            testObj_2,
            {
                a: 'a_5',
                b: 1,
                c: false
            },
            testObj_1
        ],
        uniqueArray: [
            {
                a: 'a_1',
                b: 1,
                c: true
            },
            {
                a: 'a_2',
                b: 2,
                c: true
            },
            {
                a: 'a_3',
                b: 1,
                c: false
            },
            {
                a: 'a_4',
                b: 1,
                c: true
            },
            {
                a: 'a_5',
                b: 1,
                c: false
            }
        ],
    }
}

test('Некорректное значение Date', () => {
    expect(uniqueArray(new Date() as any)).toStrictEqual([]);
});

test('Некорректное значение string', () => {
    expect(uniqueArray('string' as any)).toStrictEqual([]);
});

test('Некорректное значение number', () => {
    expect(uniqueArray(5 as any)).toStrictEqual([]);
});

test('Некорректное значение object', () => {
    expect(uniqueArray({ a: 1, b: 2 } as any)).toStrictEqual([]);
});

test('Некорректное значение function', () => {
    expect(uniqueArray((() => { }) as any)).toStrictEqual([]);
});

test('undefined', () => {
    expect(uniqueArray(undefined)).toStrictEqual([]);
});

test('null', () => {
    expect(uniqueArray(null)).toStrictEqual([]);
});

test('string[] ===', () => {
    const testValue = getTestArrayString();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('number[] ===', () => {
    const testValue = getTestArrayNumber();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('Пустой number[] ===', () => {;
    expect(uniqueArray([])).toStrictEqual([]);
});

test('Один элемент number[] ===', () => {;
    expect(uniqueArray([1])).toStrictEqual([1]);
});

test('Date[] ===', () => {
    const testValue = getTestArrayDate();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('boolean[] ===', () => {
    const testValue = getTestArrayBoolean();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('null | undefined[] ===', () => {
    const testValue = getTestArrayUndefinedNull();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('object[] ===', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray)).toStrictEqual(testValue.uniqueArray);
});

test('object[] field a ===', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, 'a'),).toStrictEqual(testValue.uniqueArray);
});

test('object[] field b ===', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, 'b'),).toStrictEqual([ { a: 'a_1', b: 1, c: true }, { a: 'a_2', b: 2, c: true }]);
});

test('object[] field c ===', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, 'c'),).toStrictEqual([{ a: 'a_1', b: 1, c: true }, { a: 'a_3', b: 1, c: false }]);
});

test('object[] Несуществующее поле unknown ===', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, 'unknown' as keyof TestObject),).toStrictEqual([]);
});

test('1. object[] compareFunction', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, (itemA, itemB)=> itemA.a === itemB.a),)
    .toStrictEqual(testValue.uniqueArray);
});

test('2. object[] compareFunction', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, (itemA, itemB)=> itemA.b === itemB.b),)
    .toStrictEqual([ { a: 'a_1', b: 1, c: true }, { a: 'a_2', b: 2, c: true }]);
});

test('3. object[] compareFunction', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, (itemA, itemB)=> itemA.c === itemB.c),)
    .toStrictEqual([{ a: 'a_1', b: 1, c: true }, { a: 'a_3', b: 1, c: false }]);
});

test('4. object[] compareFunction', () => {
    const testValue = getTestArrayObject();
    expect(uniqueArray(testValue.testArray, (itemA, itemB)=> `${itemA.b}_${itemA.c}` === `${itemB.b}_${itemB.c}`),)
    .toStrictEqual([ { a: 'a_1', b: 1, c: true }, { a: 'a_2', b: 2, c: true },  { a: 'a_3', b: 1, c: false }]);
});
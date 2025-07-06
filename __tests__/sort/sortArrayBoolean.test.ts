import sortArrayBoolean from "../../src/sort/sortArrayBoolean";

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
        // arrayBoolean
        expect(sortArrayBoolean.arrayBoolean({
            array: value,
            order: 'false-true',
        })).toStrictEqual([]);

        expect(sortArrayBoolean.arrayBoolean({
            array: value,
            order: 'true-false',
        })).toStrictEqual([]);

        expect(sortArrayBoolean.arrayBoolean({
            array: value,
            order: 'false-true',
            orderOfInvalidValue: 'first'
        })).toStrictEqual([]);

        expect(sortArrayBoolean.arrayBoolean({
            array: value,
            order: 'true-false',
            orderOfInvalidValue: 'last'
        })).toStrictEqual([]);

        // forceConvert
        expect(sortArrayBoolean.forceConvert({
            array: value,
            order: 'false-true'
        })).toStrictEqual([]);

        expect(sortArrayBoolean.forceConvert({
            array: value,
            order: 'true-false',
        })).toStrictEqual([]);
    }
});
//#endregion


//#region arrayBoolean
test('arrayBoolean - Не одно значение не является boolean', () => {
    const getTestArray = () => [0, '', 5, 'string'];

    // true-false
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
    })).toStrictEqual(getTestArray());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getTestArray());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getTestArray());

    // false-true
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
    })).toStrictEqual(getTestArray());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getTestArray());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getTestArray());
});

test('arrayBoolean - Массив уже отсортирован', () => {
    const getTestArray1 = () => [true, true, false];
    const getTestArray2 = () => [false, false, true];

    // true-false
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray1(),
        order: 'true-false',
    })).toStrictEqual(getTestArray1());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray1(),
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getTestArray1());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray1(),
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getTestArray1());

    // false-true
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray2(),
        order: 'false-true',
    })).toStrictEqual(getTestArray2());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray2(),
        order: 'false-true',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getTestArray2());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray2(),
        order: 'false-true',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getTestArray2());
});

test('arrayBoolean - Массив только boolean', () => {
    const getTestArray = () => [false, true, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];

    // true-false
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
    })).toStrictEqual(getResultTrueFalse());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getResultTrueFalse());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getResultTrueFalse());

    // false-true
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
    })).toStrictEqual(getResultFalseTrue());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'first'
    })).toStrictEqual(getResultFalseTrue());

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'last'
    })).toStrictEqual(getResultFalseTrue());
});

test('arrayBoolean - В массиве присутствуют другие значения помимо boolean', () => {
    const getTestArray = () => [0, false, '', true, 'string', 5, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];
    const getResultInvalidItems = () => [0, '', 'string', 5];

    // true-false
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
    })).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...getResultInvalidItems(), ...getResultTrueFalse()]);

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'true-false',
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...getResultTrueFalse(), ...getResultInvalidItems()]);

    // false-true
    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
    })).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'first'
    })).toStrictEqual([...getResultInvalidItems(), ...getResultFalseTrue()]);

    expect(sortArrayBoolean.arrayBoolean({
        array: getTestArray(),
        order: 'false-true',
        orderOfInvalidValue: 'last'
    })).toStrictEqual([...getResultFalseTrue(), ...getResultInvalidItems()]);
});
//#endregion


//#region forceConvert
test('forceConvert - Массив уже отсортирован', () => {
    const getTestArray1 = () => [true, true, false];
    const getTestArray2 = () => [false, false, true];
    const getTestArray3 = () => [true, true, 'string', 5, false, 0, ''];
    const getTestArray4 = () => ['', 0, false, 5, 'string', true, true];

    // true-false
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray1(),
        order: 'true-false',
    })).toStrictEqual(getTestArray1());

    expect(sortArrayBoolean.forceConvert({
        array: getTestArray3(),
        order: 'true-false',
    })).toStrictEqual(getTestArray3());

    // false-true
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray2(),
        order: 'false-true',
    })).toStrictEqual(getTestArray2());

    expect(sortArrayBoolean.forceConvert({
        array: getTestArray4(),
        order: 'false-true',
    })).toStrictEqual(getTestArray4());
});

test('forceConvert - Массив только boolean', () => {
    const getTestArray = () => [false, true, false];
    const getResultTrueFalse = () => [true, false, false];
    const getResultFalseTrue = () => [false, false, true];

    // true-false
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray(),
        order: 'true-false',
    })).toStrictEqual(getResultTrueFalse());

    // false-true
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray(),
        order: 'false-true',
    })).toStrictEqual(getResultFalseTrue());
});

test('forceConvert - В массиве присутствуют другие значения помимо boolean', () => {
    const getTestArray = () => [0, false, '', true, 'string', 5, false];
    const getResultTrueFalse = () => [ true, 'string', 5, 0, false, '', false];
    const getResultFalseTrue = () => [0, false, '', false, true, 'string', 5];

    // true-false
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray(),
        order: 'true-false',
    })).toStrictEqual(getResultTrueFalse());

    // false-true
    expect(sortArrayBoolean.forceConvert({
        array: getTestArray(),
        order: 'false-true',
    })).toStrictEqual(getResultFalseTrue());
});
//#endregion
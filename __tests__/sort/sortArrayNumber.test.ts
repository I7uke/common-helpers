import { sortArrayNumber } from "../../src";

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayNumber(array, '0-9')).toStrictEqual(result);
    expect(sortArrayNumber(array, '0-9', 'first')).toStrictEqual(result);
    expect(sortArrayNumber(array, '0-9', 'last')).toStrictEqual(result);

    expect(sortArrayNumber(array, '9-0')).toStrictEqual(result);
    expect(sortArrayNumber(array, '9-0', 'first')).toStrictEqual(result);
    expect(sortArrayNumber(array, '9-0', 'last')).toStrictEqual(result);
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

test('В массиве нет number', () => {
    const getTestArray = () => [null, true, {}, '', undefined, false, [], 'string'];
    testGroupIdenticalResult(getTestArray(), getTestArray());
});

test('Массив уже отсортирован', () => {
    const getTestArray09 = () => [-2, -1, 0, 1, 2];
    const getTestArray90 = () => [2, 1, 0, -1, -2];

    expect(sortArrayNumber(getTestArray09(), '0-9')).toStrictEqual(getTestArray09());
    expect(sortArrayNumber(getTestArray09(), '0-9', 'first')).toStrictEqual(getTestArray09());
    expect(sortArrayNumber(getTestArray09(), '0-9', 'last')).toStrictEqual(getTestArray09());

    expect(sortArrayNumber(getTestArray90(), '9-0')).toStrictEqual(getTestArray90());
    expect(sortArrayNumber(getTestArray90(), '9-0', 'first')).toStrictEqual(getTestArray90());
    expect(sortArrayNumber(getTestArray90(), '9-0', 'last')).toStrictEqual(getTestArray90());
});

test('Массив только number', () => {
    const getTestArray = () => [1, -2, 2, -1, 0];
    const getResult09 = () => [-2, -1, 0, 1, 2];
    const getResult90 = () => [2, 1, 0, -1, -2];

    expect(sortArrayNumber(getTestArray(), '0-9')).toStrictEqual(getResult09());
    expect(sortArrayNumber(getTestArray(), '0-9', 'first')).toStrictEqual(getResult09());
    expect(sortArrayNumber(getTestArray(), '0-9', 'last')).toStrictEqual(getResult09());

    expect(sortArrayNumber(getTestArray(), '9-0')).toStrictEqual(getResult90());
    expect(sortArrayNumber(getTestArray(), '9-0', 'first')).toStrictEqual(getResult90());
    expect(sortArrayNumber(getTestArray(), '9-0', 'last')).toStrictEqual(getResult90());
});

test('В массиве присутствуют другие значения помимо number', () => {
    const getTestArray = () => [0, undefined, false, -1, null, 'string', true, '', 2,  NaN, 1, {}, -2, [], false];
    const getResult09 = () => [-2, -1, 0, 1, 2];
    const getResult90 = () => [2, 1, 0, -1, -2];
    const getResultInvalidItems = () =>  [undefined, false, null, 'string', true, '', NaN, {}, [], false];

    expect(sortArrayNumber(getTestArray(), '0-9')).toStrictEqual([...getResult09(), ...getResultInvalidItems()]);
    expect(sortArrayNumber(getTestArray(), '0-9', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResult09()]);
    expect(sortArrayNumber(getTestArray(), '0-9', 'last')).toStrictEqual([...getResult09(), ...getResultInvalidItems()]);

    expect(sortArrayNumber(getTestArray(), '9-0')).toStrictEqual([...getResult90(), ...getResultInvalidItems()]);
    expect(sortArrayNumber(getTestArray(), '9-0', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResult90()]);
    expect(sortArrayNumber(getTestArray(), '9-0', 'last')).toStrictEqual([...getResult90(), ...getResultInvalidItems()]);
});

test('Повторяющиеся number', () => {
    const getTestArray = () => [5, 5, 5];

    expect(sortArrayNumber(getTestArray(), '0-9')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '0-9', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '0-9', 'last')).toStrictEqual(getTestArray());

    expect(sortArrayNumber(getTestArray(), '9-0')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '9-0', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '9-0', 'last')).toStrictEqual(getTestArray());
});

test('Массив содержит только NaN', () => {
    const getTestArray = () => [NaN, NaN, NaN];

    expect(sortArrayNumber(getTestArray(), '0-9')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '0-9', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '0-9', 'last')).toStrictEqual(getTestArray());

    expect(sortArrayNumber(getTestArray(), '9-0')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '9-0', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayNumber(getTestArray(), '9-0', 'last')).toStrictEqual(getTestArray());
});
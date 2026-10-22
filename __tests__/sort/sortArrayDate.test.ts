import { sortArrayDate } from "../../src";

const getDestDate1 = ()=> new Date(1730408400000);
const getDestDate2 = ()=> new Date(1730494800000);
const getDestDate3 = ()=> new Date(1730581200000);
const getDestDate4 = ()=> new Date(1730667600000);
const getDestDate5 = ()=> new Date(1730754000000);

function testGroupIdenticalResult(array: unknown[], result: unknown[]){
    expect(sortArrayDate(array, '0-9')).toStrictEqual(result);
    expect(sortArrayDate(array, '0-9', 'first')).toStrictEqual(result);
    expect(sortArrayDate(array, '0-9', 'last')).toStrictEqual(result);

    expect(sortArrayDate(array, '9-0')).toStrictEqual(result);
    expect(sortArrayDate(array, '9-0', 'first')).toStrictEqual(result);
    expect(sortArrayDate(array, '9-0', 'last')).toStrictEqual(result);
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

test('В массиве нет дат', () => {
    const getTestArray = () => [0, null, true, {}, '', undefined, false, 5, NaN, 'string'];
    testGroupIdenticalResult(getTestArray(), getTestArray());
});

test('Массив уже отсортирован', () => {
    const getTestArray09 = () => [getDestDate1(), getDestDate2(), getDestDate3(), getDestDate4(), getDestDate5()];
    const getTestArray90 = () => [getDestDate5(), getDestDate4(), getDestDate3(), getDestDate2(), getDestDate1()];

    expect(sortArrayDate(getTestArray09(), '0-9')).toStrictEqual(getTestArray09());
    expect(sortArrayDate(getTestArray09(), '0-9', 'first')).toStrictEqual(getTestArray09());
    expect(sortArrayDate(getTestArray09(), '0-9', 'last')).toStrictEqual(getTestArray09());

    expect(sortArrayDate(getTestArray90(), '9-0')).toStrictEqual(getTestArray90());
    expect(sortArrayDate(getTestArray90(), '9-0', 'first')).toStrictEqual(getTestArray90());
    expect(sortArrayDate(getTestArray90(), '9-0', 'last')).toStrictEqual(getTestArray90());
});

test('Массив только Date', () => {
    const getTestArray = () => [getDestDate2(), getDestDate4(), getDestDate5(), getDestDate1(), getDestDate3()];
    const getResult09 = () => [getDestDate1(), getDestDate2(), getDestDate3(), getDestDate4(), getDestDate5()];
    const getResult90 = () => [getDestDate5(), getDestDate4(), getDestDate3(), getDestDate2(), getDestDate1()];

    expect(sortArrayDate(getTestArray(), '0-9')).toStrictEqual(getResult09());
    expect(sortArrayDate(getTestArray(), '0-9', 'first')).toStrictEqual(getResult09());
    expect(sortArrayDate(getTestArray(), '0-9', 'last')).toStrictEqual(getResult09());

    expect(sortArrayDate(getTestArray(), '9-0')).toStrictEqual(getResult90());
    expect(sortArrayDate(getTestArray(), '9-0', 'first')).toStrictEqual(getResult90());
    expect(sortArrayDate(getTestArray(), '9-0', 'last')).toStrictEqual(getResult90());
});

test('В массиве присутствуют другие значения помимо Date', () => {
    const getTestArray = () => [0, undefined, getDestDate3(), false, null, 'string', true, '', NaN, getDestDate1(), {}, 5, getDestDate2(), [], false];
    const getResult09 = () => [getDestDate1(), getDestDate2(), getDestDate3()];
    const getResult90 = () => [getDestDate3(), getDestDate2(), getDestDate1()];
    const getResultInvalidItems = () => [0, undefined, false, null, 'string', true, '', NaN, {}, 5, [], false];

    expect(sortArrayDate(getTestArray(), '0-9')).toStrictEqual([...getResult09(), ...getResultInvalidItems()]);
    expect(sortArrayDate(getTestArray(), '0-9', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResult09()]);
    expect(sortArrayDate(getTestArray(), '0-9', 'last')).toStrictEqual([...getResult09(), ...getResultInvalidItems()]);

    expect(sortArrayDate(getTestArray(), '9-0')).toStrictEqual([...getResult90(), ...getResultInvalidItems()]);
    expect(sortArrayDate(getTestArray(), '9-0', 'first')).toStrictEqual([...getResultInvalidItems(), ...getResult90()]);
    expect(sortArrayDate(getTestArray(), '9-0', 'last')).toStrictEqual([...getResult90(), ...getResultInvalidItems()]);
});

test('Повторяющиеся Date', () => {
    const getTestArray = () => [getDestDate1(), getDestDate1(), getDestDate1()];

    expect(sortArrayDate(getTestArray(), '0-9')).toStrictEqual(getTestArray());
    expect(sortArrayDate(getTestArray(), '0-9', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayDate(getTestArray(), '0-9', 'last')).toStrictEqual(getTestArray());

    expect(sortArrayDate(getTestArray(), '9-0')).toStrictEqual(getTestArray());
    expect(sortArrayDate(getTestArray(), '9-0', 'first')).toStrictEqual(getTestArray());
    expect(sortArrayDate(getTestArray(), '9-0', 'last')).toStrictEqual(getTestArray());
});

test('В массиве присутствует невалидная Date', () => {
    const invalidDate = new Date('InvalidDate');
    const getTestArray = () => [getDestDate3(), invalidDate, getDestDate1(), invalidDate, getDestDate2()];

    const getResult09 = () => [getDestDate1(), getDestDate2(), getDestDate3()];
    const getResult90 = () => [getDestDate3(), getDestDate2(), getDestDate1()];
    const getInvalidItems = () => [invalidDate, invalidDate];

    expect(sortArrayDate(getTestArray(), '0-9')).toStrictEqual([...getResult09(), ...getInvalidItems()]);
    expect(sortArrayDate(getTestArray(), '0-9', 'first')).toStrictEqual([...getInvalidItems(), ...getResult09()]);
    expect(sortArrayDate(getTestArray(), '0-9', 'last')).toStrictEqual([...getResult09(), ...getInvalidItems()]);
    expect(sortArrayDate(getTestArray(), '9-0')).toStrictEqual([...getResult90(), ...getInvalidItems()]);
    expect(sortArrayDate(getTestArray(), '9-0', 'first')).toStrictEqual([...getInvalidItems(), ...getResult90()]);
    expect(sortArrayDate(getTestArray(), '9-0', 'last')).toStrictEqual([...getResult90(), ...getInvalidItems()]);
});
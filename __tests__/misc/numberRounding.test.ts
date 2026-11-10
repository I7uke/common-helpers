import numberRounding from "../../src/misc/numberRounding";

test('Некорректные значения', () => {
    const incorrectValues: any[] = [
        true,
        false,
        () => { },
        { a: 1, b: 2 },
        [1, 2, 3],
        '',
        ' ',
        'string',
        '123',
        NaN,
        Number('string'),
        new Date('date'),
        new Date(),
        undefined,
        null,
    ];

    for (const value of incorrectValues) {
        expect(numberRounding(value)).toStrictEqual(0);
        expect(numberRounding(value, undefined)).toStrictEqual(0);
        expect(numberRounding(value, 7)).toStrictEqual(0);
        expect(numberRounding(5, value)).toStrictEqual(5);
    }

    expect(numberRounding(5, -1)).toStrictEqual(5);
    expect(numberRounding(10, -2)).toStrictEqual(10);
    expect(numberRounding(10.5, -3)).toStrictEqual(11);
});

test('Infinity', () => {
    expect(numberRounding(Infinity)).toStrictEqual(Infinity);
    expect(numberRounding(-Infinity)).toStrictEqual(-Infinity);

    expect(numberRounding(Infinity, 2)).toStrictEqual(Infinity);
    expect(numberRounding(-Infinity, 2)).toStrictEqual(-Infinity);
});

test('0', () => {
    expect(numberRounding(0, 2)).toStrictEqual(0);
    expect(numberRounding(-0, 2)).toStrictEqual(-0);
});

test('Округление до целого', () => {
    expect(numberRounding(1234.56789)).toStrictEqual(1235);
    expect(numberRounding(-1234.56789)).toStrictEqual(-1235);
});

test('Округление до 2 знака', () => {
    expect(numberRounding(123.43214321, 2)).toStrictEqual(123.43);
    expect(numberRounding(-123.43214321, 2)).toStrictEqual(-123.43);
});

test('Округление до 3 знака', () => {
    expect(numberRounding(1234.56789, 3)).toStrictEqual(1234.568);
    expect(numberRounding(-1234.56789, 3)).toStrictEqual(-1234.568);
});

test('Округление до 7 знака', () => {
    expect(numberRounding(1234.56789, 7)).toStrictEqual(1234.56789);
    expect(numberRounding(-1234.56789, 7)).toStrictEqual(-1234.56789);
});

test('Граничные значения округления', () => {
    expect(numberRounding(1.004, 2)).toStrictEqual(1);
    expect(numberRounding(1.005, 2)).toStrictEqual(1.01);
    expect(numberRounding(1.006, 2)).toStrictEqual(1.01);

    expect(numberRounding(1.2344, 3)).toStrictEqual(1.234);
    expect(numberRounding(1.2345, 3)).toStrictEqual(1.235);
    expect(numberRounding(1.2346, 3)).toStrictEqual(1.235);

    expect(numberRounding(-1.004, 2)).toStrictEqual(-1);
    expect(numberRounding(-1.005, 2)).toStrictEqual(-1.01);
    expect(numberRounding(-1.006, 2)).toStrictEqual(-1.01);
});

test('Перенос разряда при округлении', () => {
    expect(numberRounding(9.999, 2)).toStrictEqual(10);
    expect(numberRounding(99.999, 2)).toStrictEqual(100);
    expect(numberRounding(999.999, 2)).toStrictEqual(1000);

    expect(numberRounding(-9.999, 2)).toStrictEqual(-10);
    expect(numberRounding(-99.999, 2)).toStrictEqual(-100);
    expect(numberRounding(-999.999, 2)).toStrictEqual(-1000);

    expect(numberRounding(0.9999, 3)).toStrictEqual(1);
    expect(numberRounding(-0.9999, 3)).toStrictEqual(-1);
});

test('Округление около нуля', () => {
    expect(numberRounding(0.004, 2)).toStrictEqual(0);
    expect(numberRounding(0.005, 2)).toStrictEqual(0.01);
    expect(numberRounding(-0.004, 2)).toStrictEqual(-0);
    expect(numberRounding(-0.005, 2)).toStrictEqual(-0.01);

    expect(numberRounding(0.0004, 3)).toStrictEqual(0);
    expect(numberRounding(-0.0004, 3)).toStrictEqual(-0);
});

test('Отрицательная и дробная точность', () => {
    expect(numberRounding(5.4, -1)).toStrictEqual(5);
    expect(numberRounding(5.5, -1)).toStrictEqual(6);
    expect(numberRounding(5.6, -1)).toStrictEqual(6);

    expect(numberRounding(-5.4, -1)).toStrictEqual(-5);
    expect(numberRounding(-5.5, -1)).toStrictEqual(-6);
    expect(numberRounding(-5.6, -1)).toStrictEqual(-6);

    expect(numberRounding(149.5, -2)).toStrictEqual(150);
    expect(numberRounding(-149.5, -2)).toStrictEqual(-150);

    expect(numberRounding(5.4, -1.5)).toStrictEqual(5);
    expect(numberRounding(-123.43214321, 2.789)).toStrictEqual(-123.43);
    expect(numberRounding(1234.56789, 3.1)).toStrictEqual(1234.568);
});

test('Стресс тест', () => {
    expect(numberRounding(1.005, 2)).toStrictEqual(1.01);
    expect(numberRounding(1.3549999999999998, 2)).toStrictEqual(1.35);
    expect(numberRounding(1.7777777, 2)).toStrictEqual(1.78);
    expect(numberRounding(501.49999999999994, 2)).toStrictEqual(501.5);
    expect(numberRounding(4.6850000000000005, 2)).toStrictEqual(4.69);
    expect(numberRounding(-1.005, 2)).toStrictEqual(-1.01);
    expect(numberRounding(-2.175, 2)).toStrictEqual(-2.18);
    expect(numberRounding(-4.6850000000000005, 4)).toStrictEqual(-4.685);
    expect(numberRounding(501.49999999999994, 4)).toStrictEqual(501.5);
    expect(numberRounding(501.49999999999994, 2)).toStrictEqual(501.5);
    expect(numberRounding(123456789012345.678, 2)).toStrictEqual(123456789012345.68);
    expect(numberRounding(-123456789012345.678, 2)).toStrictEqual(-123456789012345.68);
});

import numberRounding from "../src/numberRounding";

test('+0', () => {
    expect(numberRounding(0, 2)).toStrictEqual(0);
});

test('-0', () => {
    expect(numberRounding(-0, 2)).toStrictEqual(-0);
});

test('Положительное округление до целого', () => {
    expect(numberRounding(1234.56789)).toStrictEqual(1235);
});

test('Отрицательное округление до целого', () => {
    expect(numberRounding(-1234.56789)).toStrictEqual(-1235);
});

test('Положительное округление до 3 знака', () => {
    expect(numberRounding(1234.56789, 3)).toStrictEqual(1234.568);
});

test('Отрицательное округление до 3 знака', () => {
    expect(numberRounding(-1234.56789, 3)).toStrictEqual(-1234.568);
});

test('Положительное округление до 7 знака', () => {
    expect(numberRounding(1234.56789, 7)).toStrictEqual(1234.56789);
});

test('Отрицательное округление до 7 знака', () => {
    expect(numberRounding(-1234.56789, 7)).toStrictEqual(-1234.56789);
});

test('Положительное округление до 2 знака', () => {
    expect(numberRounding(123.43214321, 2)).toStrictEqual(123.43);
});

test('Отрицательное округление до 2 знака', () => {
    expect(numberRounding(-123.43214321, 2)).toStrictEqual(-123.43);
});

test('undefined', () => {
    expect(numberRounding(undefined, 2)).toStrictEqual(0);
});

test('null', () => {
    expect(numberRounding(null, 2)).toStrictEqual(0);
});

test('NaN', () => {
    expect(numberRounding(NaN, 2)).toStrictEqual(0);
});



test('Некорректное значение number - строка', () => {
    expect(numberRounding('Lala' as any, 2)).toStrictEqual(0);
});

test('Некорректное значение number - массив', () => {
    expect(numberRounding([] as any, 2)).toStrictEqual(0);
});

test('Некорректное значение number - объект', () => {
    expect(numberRounding({} as any, 2)).toStrictEqual(0);
});

test('Некорректное значение accuracy - строка', () => {
    expect(numberRounding(1234.56789, 'lala' as any)).toStrictEqual(1235);
});

test('Некорректное значение accurac - NaN', () => {
    expect(numberRounding(1234.56789, NaN )).toStrictEqual(1235);
});

test('Некорректное значение accuracy - 0', () => {
    expect(numberRounding(1234.56789, 0)).toStrictEqual(1235);
});

test('Некорректное значение accuracy - -1', () => {
    expect(numberRounding(1234.56789, 0)).toStrictEqual(1235);
});

test('1. Стресс тест', () => {
    expect(numberRounding(1.005, 2)).toStrictEqual(1.01);
});

test('2. Стресс тест', () => {
    expect(numberRounding(1.3549999999999998, 2)).toStrictEqual(1.35);
});

test('3. Стресс тест', () => {
    expect(numberRounding(1.7777777, 2)).toStrictEqual(1.78);
});

test('4. Стресс тест', () => {
    expect(numberRounding(501.49999999999994, 2)).toStrictEqual(501.5);
});

test('5. Стресс тест', () => {
    expect(numberRounding(4.6850000000000005, 2)).toStrictEqual(4.69);
});

test('6. Стресс тест', () => {
    expect(numberRounding(-1.005, 2)).toStrictEqual(-1.01);
});

test('7. Стресс тест', () => {
    expect(numberRounding(-2.175, 2)).toStrictEqual(-2.18);
});

test('8. Стресс тест', () => {
    expect(numberRounding(-4.6850000000000005, 4)).toStrictEqual(-4.685);
});

test('9. Стресс тест', () => {
    expect(numberRounding(501.49999999999994, 4)).toStrictEqual(501.5);
});

test('10. Стресс тест', () => {
    expect(numberRounding(501.49999999999994, 2)).toStrictEqual(501.5);
});

import validationNumberInRange from "../../src/validators/validationNumberInRange";

function testValidValue(number: number, result: number, min?: number, max?:number) {
    expect(validationNumberInRange({
        value: number,
        min: min,
        max: max
    })).toStrictEqual(result);

    expect(validationNumberInRange({
        value: number,
        min: min,
        max: max,
        defaultValue: undefined
    })).toStrictEqual(result)

    expect(validationNumberInRange({
        value: number,
        min: min,
        max: max,
        defaultValue: null
    })).toStrictEqual(result)

    expect(validationNumberInRange({
        value: number,
        min: min,
        max: max,
        defaultValue: 7
    })).toStrictEqual(result)
}

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
        expect(validationNumberInRange({
            value: value,
        })).toStrictEqual(0);

        expect(validationNumberInRange({
            value: value,
            defaultValue: undefined
        })).toStrictEqual(undefined);

        expect(validationNumberInRange({
            value: value,
            defaultValue: null
        })).toStrictEqual(null);

        expect(validationNumberInRange({
            value: value,
            defaultValue: 7
        })).toStrictEqual(7);
    }
});

test('Корректное число', () => {
    testValidValue(-100, -100);
    testValidValue(-1, -1);
    testValidValue(0, 0);
    testValidValue(-0, -0);
    testValidValue(5, 5);
    testValidValue(125, 125);
    // Интервал
    testValidValue(2, 2, 1, 3);
    testValidValue(4, 3, 1, 3);
    testValidValue(0, 1, 1, 3);
    testValidValue(5, 5, -5, 5);
    testValidValue(1, 1, -5, 5);
    testValidValue(-5, -5, -5, 5);
    testValidValue(3, 3, 3, 3);
    testValidValue(1, 3, 3, 3);
    testValidValue(4, 3, 3, 3);
});

test('Не корректный интервал [3, 1]', () => {
    expect(() => validationNumberInRange({
        min: 3,
        max: 1,
        value: 4,
    })).toThrow('Incorrect interval min > max')
});
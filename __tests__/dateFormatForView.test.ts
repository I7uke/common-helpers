import dateFormatForView from "../src/dateFormatForView";

const testDate = new Date(1674031318308);

test('DD.MM.YYYY', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD.MM.YYYY'
    })).toStrictEqual('18.01.2023');
});

test('DD-MM-YYYY', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD-MM-YYYY'
    })).toStrictEqual('18-01-2023');
});

test('DD.MM.YYYY HH:MM', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD.MM.YYYY HH:MM'
    })).toStrictEqual('18.01.2023 11:41');
});

test('DD-MM-YYYY HH:MM', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD-MM-YYYY HH:MM'
    })).toStrictEqual('18-01-2023 11:41');
});

test('DD.MM.YYYY HH:MM:SS', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD.MM.YYYY HH:MM:SS'
    })).toStrictEqual('18.01.2023 11:41:58');
});

test('DD-MM-YYYY HH:MM:SS', () => {
    expect(dateFormatForView({
        date: testDate,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('18-01-2023 11:41:58');
});

test('Некорректная дата, без текста ошибки', () => {
    expect(dateFormatForView({
        date: new Date('Lala'),
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('');
});

test('Пустой defaultValue', () => {
    expect(dateFormatForView({
        date: new Date('Lala'),
        defaultValue: '',
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('');
});

test('Некорректная дата с текстом ошибки', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        date: new Date('Lala'),
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('null', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        date: null,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('undefined', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        date: undefined,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - NaN', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: NaN,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - массив', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: [],
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - массив', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: [10],
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - массив', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: [1, 2, 3],
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - объект', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: {test: 123},
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - строка', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: '2023-01-18T08:41:58.308Z',
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное значение - число', () => {
    expect(dateFormatForView({
        defaultValue: 'Ошибка!',
        // @ts-ignore
        date: 1674031318308,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('Ошибка!');
});

test('Некорректное defaultValue', () => {
    expect(dateFormatForView({
        // @ts-ignore
        defaultValue: [],
        // @ts-ignore
        date: 1674031318308,
        format: 'DD-MM-YYYY HH:MM:SS'
    })).toStrictEqual('');
});
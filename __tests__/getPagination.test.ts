import getPagination from '../src/getPagination';

test('Тест пагинация 1', () => {
    expect(getPagination({
        currentPage: 1,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 2', () => {
    expect(getPagination({
        currentPage: 2,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 3', () => {
    expect(getPagination({
        currentPage: 3,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 4', () => {
    expect(getPagination({
        currentPage: 4,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [2, 3, 4, 5, 6],
        firstPage: 1,
        lastPage: 10
    });
});

test('Тест пагинация 5', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [3, 4, 5, 6, 7],
        firstPage: 1,
        lastPage: 10
    });
});

test('Тест пагинация 6', () => {
    expect(getPagination({
        currentPage: 6,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [4, 5, 6, 7, 8],
        firstPage: 1,
        lastPage: 10
    });
});

test('Тест пагинация 7', () => {
    expect(getPagination({
        currentPage: 7,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [5, 6, 7, 8, 9],
        firstPage: 1,
        lastPage: 10
    });
});

test('Тест пагинация 8', () => {
    expect(getPagination({
        currentPage: 8,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 9', () => {
    expect(getPagination({
        currentPage: 9,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 10', () => {
    expect(getPagination({
        currentPage: 10,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 11', () => {
    expect(getPagination({
        currentPage: 11,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 12', () => {
    expect(getPagination({
        currentPage: 2,
        maxPages: 4,
        step: 3
    })).toStrictEqual({
        pages: [1, 2, 3, 4],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('Тест пагинация 13', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
        step: 5
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('Тест пагинация 14', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
        step: 4
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 15', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
        step: 3
    })).toStrictEqual({
        pages: [2, 3, 4, 5, 6, 7, 8],
        firstPage: 1,
        lastPage: 10
    });
});

test('Тест пагинация 16', () => {
    expect(getPagination({
        currentPage: 3,
        maxPages: 10,
        step: 4
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 17', () => {
    expect(getPagination({
        currentPage: 8,
        maxPages: 10,
        step: 4
    })).toStrictEqual({
        pages: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 18', () => {
    expect(getPagination({
        currentPage: 1,
        maxPages: 10,
        step: 3
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5, 6, 7],
        firstPage: undefined,
        lastPage: 10
    });
});

test('Тест пагинация 19', () => {
    expect(getPagination({
        currentPage: 10,
        maxPages: 10,
        step: 3
    })).toStrictEqual({
        pages: [4, 5, 6, 7, 8, 9, 10],
        firstPage: 1,
        lastPage: undefined
    });
});

test('Тест пагинация 20', () => {
    expect(getPagination({
        currentPage: 10,
        maxPages: 10,
        step: 11
    })).toStrictEqual({
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('currentPage: undefined', () => {
    expect(getPagination({
        // @ts-ignore
        currentPage: undefined,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('maxPages: undefined', () => {
    expect(getPagination({
        currentPage: 5,
        // @ts-ignore
        maxPages: undefined,
        step: 2
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('maxPages: undefined', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
         // @ts-ignore
        step: undefined
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('currentPage: undefined', () => {
    expect(getPagination({
        currentPage: NaN,
        maxPages: 10,
        step: 2
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('maxPages: undefined', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: NaN,
        step: 2
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});

test('maxPages: undefined', () => {
    expect(getPagination({
        currentPage: 5,
        maxPages: 10,
        step: NaN
    })).toStrictEqual({
        pages: [],
        firstPage: undefined,
        lastPage: undefined
    });
});
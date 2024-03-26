type Options = {
    /**
     * Текущая страница
     */
    readonly currentPage: number;
    /**
     * Максимальное возможное количество страниц
     */
    readonly maxPages: number;
    /**
     * Шаг сколько показывать страниц от текущей
     */
    readonly step: number;
}

type PagesResult = {
    /**
     * Показывать последнюю страницу или нет
     */
    readonly firstPage?: number;
    /**
     * Показывать первую страницу или нет
     */
    readonly lastPage?: number;
    /**
     * Список страниц пагинации
     */
    readonly pages: number[];
};

function validationNumber(num?: number | undefined | null, max?: number): number {
    if (typeof num !== 'number') {
        return 0;
    }

    if(isNaN(num)) {
        return 0;
    }

    if (num < 0) {
        return 0;
    }

    if(typeof max === 'number') {
        if(num >= max) {
            return max;
        }
    }

    return num;
}

function validationLeft(num: number): number {
    if (num <= 0) {
        return 1;
    }

    return num;
}

function getLeft(curentPage: number, step: number): [number, number] {
    if (curentPage <= 1) {
        return [1, step];
    }

    const left = curentPage - step;
    
    if (left < 0) {
        return [1, Math.abs(left)+1];
    }

    if(left === 0) {
        return [1,1]
    }

    return [left, 0];
}

function getRight(curentPage: number, step: number, maxPages: number): [number, number] {
    if (curentPage >= maxPages) {
        return [maxPages, step];
    }

    const right = curentPage + step;
    
    if (right > maxPages) {
        return [maxPages, right - maxPages];
    }

    return [right, 0];
}

function validationRight(num: number, max: number): number {
    if (num <= 0) {
        return 1;
    }

    if(num > max) {
        return max;
    }

    return num;
}

export default function getPagination(options: Options): PagesResult {

    const maxPages = validationNumber(options.maxPages);
    const curentPage = validationNumber(options.currentPage, maxPages);
    const step = validationNumber(options.step, maxPages);

    if(!curentPage || !maxPages || !step) {
        return {
            pages: [],
            firstPage: undefined,
            lastPage: undefined
        };
    }

    let firstPage: number | undefined = undefined;
    let lastPage: number | undefined = undefined;

    let pagesResult: number[] = [];
    const [left, addStepsRight] = getLeft(curentPage, step);
    const [right, addStepsLeft] = getRight(curentPage, step, maxPages);

    const resultLeft = validationLeft(left - addStepsLeft);
    const resultRight = validationRight(right + addStepsRight, maxPages);

    for (let i = resultLeft; i <= resultRight; ++i) {
        pagesResult.push(i);
    }

    if (pagesResult.length) {
        if (pagesResult[0] !== 1) {
            firstPage = 1;
        }

        if (pagesResult[pagesResult.length - 1] !== maxPages) {
            lastPage = maxPages;
        }
    }

    return {
        pages: pagesResult,
        firstPage: firstPage,
        lastPage: lastPage
    };
}
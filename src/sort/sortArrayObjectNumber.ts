import type { OrderNumber, SortParams } from "../models/sorting";

type Params<T> = SortParams<T, number, OrderNumber>;

function sort09<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return valueA - valueB
    });
}

function sort90<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return valueB - valueA
    });
}

export default function sortArrayObjectNumber<T>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const nonNumberArray: T[] = [];
    const numberArray: T[] = [];

    for (const item of params.array) {
        const value = params.field(item);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            numberArray.push(item);
        } else {
            nonNumberArray.push(item);
        }
    }

    if (!numberArray.length) {
        return nonNumberArray;
    }

    const sortArray = params.order === '0-9' ? sort09(numberArray, params.field) : sort90(numberArray, params.field);

    if (params.orderOfInvalidValue === 'first') {
        return [...nonNumberArray, ...sortArray];
    }

    return [...sortArray, ...nonNumberArray];
}
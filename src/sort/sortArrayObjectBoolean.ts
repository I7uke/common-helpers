import type { OrderBoolean, SortParams } from "../models/sorting";

type Params<T> = SortParams<T, boolean, OrderBoolean>;

function sortFalseTrue<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a);
        const valueB = field(b);
        return valueA === valueB ? 0 : valueA ? 1 : -1
    });
}

function sortTrueFalse<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a);
        const valueB = field(b);
        return valueA === valueB ? 0 : valueA ? -1 : 1
    });
}

export default function sortArrayObjectBoolean<T>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const nonBooleanArray: T[] = [];
    const booleanArray: T[] = [];

    for (const item of params.array) {
        const value = params.field(item);
        if (typeof value === 'boolean' && value) {
            booleanArray.push(item);
        } else {
            nonBooleanArray.push(item);
        }
    }

    if (!booleanArray.length) {
        return nonBooleanArray;
    }

    const sortArray = params.order === 'false-true' ? sortFalseTrue(booleanArray, params.field) : sortTrueFalse(booleanArray, params.field);

    if (params.orderOfInvalidValue === 'first') {
        return [...nonBooleanArray, ...sortArray] as T[];
    }

    return [...sortArray, ...nonBooleanArray] as T[];
}
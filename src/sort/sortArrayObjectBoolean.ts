import type { OrderBoolean, SortParams } from "../models/sorting";

type Params<T> = SortParams<T, boolean, OrderBoolean>;

export default function sortArrayObjectBoolean<T>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const nonBooleanArray: T[] = [];
    const trueArray: T[] = [];
    const falseArray: T[] = [];

    for (const item of params.array) {
        const value = params.field(item);
        if (typeof value === 'boolean') {

            if (value) {
                trueArray.push(item);
            } else {
                falseArray.push(item);
            }

        } else {
            nonBooleanArray.push(item);
        }
    }

    if (!trueArray.length && !falseArray.length) {
        return nonBooleanArray;
    }

    const sortArray = params.order === 'false-true' ? [...falseArray, ...trueArray] : [...trueArray, ...falseArray];

    if (params.orderOfInvalidValue === 'first') {
        return [...nonBooleanArray, ...sortArray];
    }

    return [...sortArray, ...nonBooleanArray];
}
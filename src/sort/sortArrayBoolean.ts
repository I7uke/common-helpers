import { type OrderBoolean, type OrderOfInvalidValue } from "../models/sorting";

function sortFalseTrue(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b ? 0 : a ? 1 : -1);
}

function sortTrueFalse(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b ? 0 : a ? -1 : 1);
}

export default function sortArrayBoolean<T>(array: T[], order: OrderBoolean, orderOfInvalidValue?: OrderOfInvalidValue): T[] {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const nonBooleanArray: T[] = [];
    const booleanArray: boolean[] = [];

    for (const item of array) {
        if (typeof item === 'boolean') {
            booleanArray.push(item);
        } else {
            nonBooleanArray.push(item);
        }
    }

    if (!booleanArray.length) {
        return nonBooleanArray;
    }

    const sortArray = order === 'false-true' ? sortFalseTrue(booleanArray) : sortTrueFalse(booleanArray);

    if (orderOfInvalidValue === 'first') {
        return [...nonBooleanArray, ...sortArray] as T[];
    }

    return [...sortArray, ...nonBooleanArray] as T[];
}

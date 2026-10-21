import type { OrderBoolean } from "../models/sorting";

function sortForceConvertFalseTrue<T>(array: T[]): T[] {
    return array.sort((a: T, b: T) => !!a === !!b ? 0 : !!a ? 1 : -1);
}

function sortForceConvertTrueFalse<T>(array: T[]): T[] {
    return array.sort((a: T, b: T) => !!a === !!b ? 0 : !!a ? -1 : 1);
}

export default function sortArrayBooleanTruthy<T>(array: T[], order: OrderBoolean) {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const copyArray = array.slice();

    if (order === 'false-true') {
        return sortForceConvertFalseTrue(copyArray);
    }

    return sortForceConvertTrueFalse(copyArray);
}
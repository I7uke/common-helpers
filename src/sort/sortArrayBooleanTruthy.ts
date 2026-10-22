import type { OrderBoolean } from "../models/sorting";

export default function sortArrayBooleanTruthy<T>(array: T[], order: OrderBoolean) {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const truthy: T[] = [];
    const falsy: T[] = [];

    for (const value of array) {
        if (value) {
            truthy.push(value);
        } else {
            falsy.push(value);
        }
    }

    if (order === 'false-true') {
        return falsy.concat(truthy);
    }

    return truthy.concat(falsy);
}
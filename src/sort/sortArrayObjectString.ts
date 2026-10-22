import type { OrderString, SortParams } from "../models/sorting";

interface Params<T> extends SortParams<T, string, OrderString> {
    readonly locales?: Intl.LocalesArgument;
    readonly options?: Intl.CollatorOptions
}

function sortAZ<T>(array: T[], field: Params<T>['field'], collator: Intl.Collator): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return collator.compare(valueA, valueB);
    });
}

function sortZA<T>(array: T[], field: Params<T>['field'], collator: Intl.Collator): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return collator.compare(valueB, valueA);
    });
}

export default function sortArrayObjectString<T>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const nonStringArray: T[] = [];
    const stringArray: T[] = [];

    for (const item of params.array) {
        const value = params.field(item);
        if (typeof value === 'string' && value) {
            stringArray.push(item);
        } else {
            nonStringArray.push(item);
        }
    }

    if (!stringArray.length) {
        return nonStringArray;
    }

    const collatorOptions: Intl.CollatorOptions = params.options ?? { sensitivity: 'base' };
    const collator = new Intl.Collator(params.locales, collatorOptions);
    const sortArray = params.order === 'z-a' ? sortZA(stringArray, params.field, collator) : sortAZ(stringArray, params.field, collator);

    if (params.orderOfInvalidValue === 'first') {
        return [...nonStringArray, ...sortArray];
    }

    return [...sortArray, ...nonStringArray];
}

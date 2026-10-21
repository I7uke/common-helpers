import { type OrderString, type OrderOfInvalidValue } from "../models/sorting";

function sortAZ(array: string[], collator: Intl.Collator): string[] {
    return array.sort((a: string, b: string) => collator.compare(a, b));
}

function sortZA(array: string[], collator: Intl.Collator): string[] {
    return array.sort((a: string, b: string) => collator.compare(b, a));
}

export default function sortArrayString<T>(array: T[], order: OrderString, orderOfInvalidValue?: OrderOfInvalidValue, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): T[] {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const nonStringArray: T[] = [];
    const stringArray: string[] = [];

    for(const item of array) {
        if(typeof item ==='string' && item) {
            stringArray.push(item);
        } else {
            nonStringArray.push(item);
        }
    }

    if(!stringArray.length) {
        return nonStringArray;
    }

    const collatorOptions: Intl.CollatorOptions = options ?? { sensitivity: 'base' };
    const collator = new Intl.Collator(locales, collatorOptions);
    const sortArray = order === 'z-a' ? sortZA(stringArray, collator) : sortAZ(stringArray, collator);

    if(orderOfInvalidValue === 'first') {
        return [...nonStringArray, ...sortArray] as T[];
    }

    return [...sortArray, ...nonStringArray] as T[];
}
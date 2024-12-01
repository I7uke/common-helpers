import { FieldExtractor } from "../models/fieldExtractor";
type Order = 'az' | 'za';
type OrderOfInvalidValue = 'last' | 'first';
type Item = object;
type Field<T extends Item> = keyof T | FieldExtractor<T, string | undefined | null>

interface Params<T extends Item> {
    readonly order: Order;
    readonly array: T[] | undefined | null;
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
    readonly field: Field<T>;
    readonly locales?: Intl.LocalesArgument;
    readonly options?: Intl.CollatorOptions
}

export default function sortArrayObjectString<T extends Item>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: T[] = [];

    for (const item of params.array) {
        const value = typeof params.field === 'function' ? params.field(item) : item[params.field];
        if (typeof value === 'string' && value) {
            array.push(item);
        } else {
            invalidArray.push(item);
        }
    }

    if (!array.length) {
        return invalidArray as T[];
    }

    const collatorLocales = params?.locales;
    const collatorOptions: Intl.CollatorOptions = params.options ?? { sensitivity: 'base' };
    const sortArray = params.order === 'za' ? sortZA(array, params.field, collatorLocales, collatorOptions) : sortAZ(array, params.field, collatorLocales, collatorOptions);

    if (params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}

function sortAZ<T extends Item>(array: T[], field: Field<T>, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): T[] {
    const collator = new Intl.Collator(locales, options);
    return array.sort((itemA: T, itemB: T) => {
        const valueA = typeof field === 'function' ? field(itemA) : itemA[field];
        const valueB = typeof field === 'function' ? field(itemB) : itemB[field];
        return collator.compare(valueA as string, valueB as string)
    });
}

function sortZA<T extends Item>(array: T[], field: Field<T>, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions): T[] {
    const collator = new Intl.Collator(locales, options);
    return array.sort((itemA: T, itemB: T) => {
        const valueA = typeof field === 'function' ? field(itemA) : itemA[field];
        const valueB = typeof field === 'function' ? field(itemB) : itemB[field];
        return collator.compare(valueB as string, valueA as string)
    });
}
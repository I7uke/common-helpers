import { OrderString, OrderOfInvalidValue } from "../models/sorting";

interface Params<T> {
    /**
     * Порядок сортировки.
     */
    readonly order: OrderString;
    /**
     * Массив который нужно отсортировать.
     */
    readonly array: (T | string)[];
    /**
     *  Где следует расположить все элементы не являющиеся string. По умолчанию last.
     */
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
    /**
     * Локаль или локали, которые следует использовать
     */
    readonly locales?: Intl.LocalesArgument;
    readonly options?: Intl.CollatorOptions
}


function sortAZ(array: string[], collator: Intl.Collator): string[] {
    return array.sort((a: string, b: string) => collator.compare(a, b));
}

function sortZA(array: string[], collator: Intl.Collator): string[] {
    return array.sort((a: string, b: string) => collator.compare(b, a));
}

/**
 * Сортирует значения string в массиве.
 */
export default function sortArrayString<T>(params: Params<T>): (T | string)[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: string[] = [];

    for(const item of params.array) {
        if(typeof item ==='string' && item) {
            array.push(item);
        } else {
            invalidArray.push(item as T);
        }
    }

    if(!array.length) {
        return invalidArray as T[];
    }

    const collatorLocales = params?.locales;
    const collatorOptions: Intl.CollatorOptions = params.options ?? { sensitivity: 'base' };
    const collator = new Intl.Collator(collatorLocales, collatorOptions);
    const sortArray = params.order === 'z-a' ? sortZA(array, collator) : sortAZ(array, collator);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}
import type { OrderNumber, SortParams } from "../models/sorting";

type Params<T> = SortParams<T, Date, OrderNumber>;

function validationDate(date: unknown): Date | undefined {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        if (!Number.isNaN(Date.prototype.getTime.call(date))) {
            return date as Date;  
        }
    }

    return undefined;
}

function sort09<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return +valueA - +valueB
    });
}

function sort90<T>(array: T[], field: Params<T>['field']): T[] {
    return array.sort((a: T, b: T) => {
        const valueA = field(a)!;
        const valueB = field(b)!;
        return +valueB - +valueA
    });
}

export default function sortArrayObjectDate<T>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const nonDateArray: T[] = [];
    const dateArray: T[] = [];

    for (const item of params.array) {
        const value = params.field(item);
        const validValue = validationDate(value);
        if (validValue) {
            dateArray.push(item);
        } else {
            nonDateArray.push(item);
        }
    }

    if (!dateArray.length) {
        return nonDateArray;
    }

    const sortArray = params.order === '0-9' ? sort09(dateArray, params.field) : sort90(dateArray, params.field);

    if (params.orderOfInvalidValue === 'first') {
        return [...nonDateArray, ...sortArray];
    }

    return [...sortArray, ...nonDateArray];
}
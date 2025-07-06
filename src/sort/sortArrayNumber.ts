import { OrderNumber, OrderOfInvalidValue } from "../models/sorting";

interface Params<T> {
    /**
     * Порядок сортировки.
     */
    readonly order: OrderNumber;
    /**
     * Массив который нужно отсортировать.
     */
    readonly array: (T | number)[];
    /**
     * Где следует расположить все элементы не являющиеся number. По умолчанию last.
     */
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
}

function sort09(array: number[]): number[] {
    return array.sort((a: number, b: number) => a - b);
}

function sort90(array: number[]): number[] {
    return array.sort((a: number, b: number) => b - a);
}

/**
 * Сортирует значения number в массиве.
 */
export default function sortArrayNumber<T>(params: Params<T>): (T | number)[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: number[] = [];

    for (const item of params.array) {
        if (typeof item === 'number' && !isNaN(item)) {
            array.push(item);
        } else {
            invalidArray.push(item as T);
        }
    }

    if (!array.length) {
        return invalidArray as T[];
    }

    const sortArray = params.order === '0-9' ? sort09(array) : sort90(array);

    if (params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}
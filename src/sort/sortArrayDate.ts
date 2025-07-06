import validationDate from "../validators/validationDate";
import { OrderNumber, OrderOfInvalidValue } from "../models/sorting";

interface Params<T> {
    /**
     * Порядок сортировки.
     */
    readonly order: OrderNumber;
    /**
     *  Массив который нужно отсортировать.
     */
    readonly array: (T | Date)[];
    /**
     * Где следует расположить все элементы не являющиеся Date. По умолчанию last.
     */
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
}

function sort09(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +a - +b);
}

function sort90(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +b - +a);
}

/**
 * Сортирует значения Date в массиве.
 */
export default function sortArrayDate<T>(params: Params<T>): (T | Date)[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: Date[] = [];

    for(const item of params.array) {
        const validItem = validationDate(item);
        if(validItem) {
            array.push(validItem);
        } else {
            invalidArray.push(item as T);
        }
    }

    if(!array.length) {
        return invalidArray as T[];
    }

    const sortArray = params.order === '0-9' ? sort09(array) : sort90(array);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}
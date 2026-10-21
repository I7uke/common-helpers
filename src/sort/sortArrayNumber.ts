import { type OrderNumber, type OrderOfInvalidValue } from "../models/sorting";

function sort09(array: number[]): number[] {
    return array.sort((a: number, b: number) => a - b);
}

function sort90(array: number[]): number[] {
    return array.sort((a: number, b: number) => b - a);
}

export default function sortArrayNumber<T>(array: T[], order: OrderNumber, orderOfInvalidValue?: OrderOfInvalidValue): T[] {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const nonNumberArray: T[] = [];
    const numberArray: number[] = [];

    for (const item of array) {
        if (typeof item === 'number' && !Number.isNaN(item)) {
            numberArray.push(item);
        } else {
            nonNumberArray.push(item);
        }
    }

    if (!numberArray.length) {
        return nonNumberArray as T[];
    }

    const sortArray = order === '0-9' ? sort09(numberArray) : sort90(numberArray);

    if (orderOfInvalidValue === 'first') {
        return [...nonNumberArray, ...sortArray] as T[];
    }

    return [...sortArray, ...nonNumberArray] as T[];
}
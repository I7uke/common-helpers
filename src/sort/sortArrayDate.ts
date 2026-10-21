import { type OrderNumber, type OrderOfInvalidValue } from "../models/sorting";

function validationDate(date: unknown): Date | undefined {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        if (!Number.isNaN(Date.prototype.getTime.call(date))) {
            return date as Date;  
        }
    }

    return undefined;
}

function sort09(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +a - +b);
}

function sort90(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +b - +a);
}

export default function sortArrayDate<T>(array: T[], order: OrderNumber, orderOfInvalidValue?: OrderOfInvalidValue): T [] {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!array.length) {
        return [];
    }

    const nonDateArray: T[] = [];
    const dateArray: Date[] = [];

    for(const item of array) {
        const validItem = validationDate(item);
        if(validItem) {
            dateArray.push(validItem);
        } else {
            nonDateArray.push(item);
        }
    }

    if(!dateArray.length) {
        return nonDateArray as T[];
    }

    const sortArray = order === '0-9' ? sort09(dateArray) : sort90(dateArray);

    if(orderOfInvalidValue === 'first') {
        return [...nonDateArray, ...sortArray] as T[];
    }

    return [...sortArray, ...nonDateArray] as T[];
}
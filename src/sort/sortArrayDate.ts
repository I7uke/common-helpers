import validationDate from "../validators/validationDate";

type Order = '09' | '90';
type OrderOfInvalidValue = 'last' | 'first';
type Value = Date | undefined | null;

interface Params<T extends Value> {
    readonly order: Order;
    readonly array: T[];
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
}

export default function sortArrayDate<T extends Value>(params: Params<T>): T[] {
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
            invalidArray.push(item);
        }
    }

    if(!array.length) {
        return invalidArray as T[];
    }

    const sortArray = params.order === '09' ? sort09(array) : sort90(array);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}

function sort09(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +a - +b);
}

function sort90(array: Date[]): Date[] {
    return array.sort((a: Date, b: Date) => +b - +a);
}
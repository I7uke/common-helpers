type Order = '09' | '90';
type OrderOfInvalidValue = 'last' | 'first';
type Value = number | undefined | null;

interface Params<T extends Value> {
    readonly order: Order;
    readonly array: T[];
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
}

export default function sortArrayNumber<T extends Value>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: number[] = [];

    for(const item of params.array) {
        if(typeof item ==='number' && !isNaN(item)) {
            array.push(item);
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

function sort09(array: number[]): number[] {
    return array.sort((a: number, b: number) => a - b);
}

function sort90(array: number[]): number[] {
    return array.sort((a: number, b: number) => b - a);
}
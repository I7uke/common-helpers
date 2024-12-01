type Order = 'falseTrue' | 'trueFalse';
type OrderOfInvalidValue = 'last' | 'first';
type Value = boolean | string | number | object | undefined | null;

interface Params<T extends Value> {
    readonly order: Order;
    readonly array: T[];
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
    readonly isForceConvert?: boolean;
}

export default function sortArrayBoolean<T extends Value>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    if(params.isForceConvert) {
        if(params.order === 'falseTrue') {
            return sortForceConvertFalseTrue(params.array);
        }

        return sortForceConvertTrueFalse(params.array);
    }

    const invalidArray: T[] = [];
    const array: boolean[] = [];

    for(const item of params.array) {
        if(typeof item ==='boolean') {
            array.push(item);
        } else {
            invalidArray.push(item);
        }
    }

    if(!array.length) {
        return invalidArray as T[];
    }

    const sortArray = params.order === 'falseTrue' ? sortFalseTrue(array) : sortTrueFalse(array);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}

function sortFalseTrue(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b? 0 : a? 1 : -1);
}

function sortTrueFalse(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b? 0 : a? -1 : 1);
}

function sortForceConvertFalseTrue<T extends Value>(array: T[]): T[] {
    return array.sort((a: T, b: T) =>  !!a === !!b ? 0 : !!a? 1 : -1);
}

function sortForceConvertTrueFalse<T extends Value>(array: T[]): T[] {
    return array.sort((a: T, b: T) => !!a === !!b ? 0 : !!a? -1 : 1);
}
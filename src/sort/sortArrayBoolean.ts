import { OrderBoolean, OrderOfInvalidValue } from "../models/sorting";

//#region arrayBooleanForceConvert
type Item = boolean | string | number | object | undefined | null;

function sortForceConvertFalseTrue<T extends Item>(array: T[]): T[] {
    return array.sort((a: T, b: T) =>  !!a === !!b ? 0 : !!a? 1 : -1);
}

function sortForceConvertTrueFalse<T extends Item>(array: T[]): T[] {
    return array.sort((a: T, b: T) => !!a === !!b ? 0 : !!a? -1 : 1);
}

interface ForceConvertParams<T extends Item> {
    /**
     * Порядок сортировки.
     */
    readonly order: OrderBoolean;
    /**
     * Массив который нужно отсортировать.
     */
    readonly array: T[];
}

/**
 * Сортирует массив, принудительно приводя элементы к boolean
 */
function forceConvert<T extends Item>(params: ForceConvertParams<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    if (params.order === 'false-true') {
        return sortForceConvertFalseTrue(params.array);
    }

    return sortForceConvertTrueFalse(params.array);
}
//#endregion

//#region arrayBoolean
function sortFalseTrue(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b? 0 : a? 1 : -1);
}

function sortTrueFalse(array: boolean[]): boolean[] {
    return array.sort((a: boolean, b: boolean) => a === b? 0 : a? -1 : 1);
}

interface ArrayBooleanParams<T> {
    /**
     * Порядок сортировки.
     */
    readonly order: OrderBoolean;
    /**
     * Массив который нужно отсортировать.
     */
    readonly array: (T | boolean)[];
    /**
     * Где следует расположить все элементы не являющиеся boolean. По умолчанию last.
     */
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
}

/**
 * Сортирует значения boolean в массиве.
 */
function arrayBoolean<T>(params: ArrayBooleanParams<T>): (T | boolean)[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
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
        return invalidArray;
    }

    const sortArray = params.order === 'false-true' ? sortFalseTrue(array) : sortTrueFalse(array);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as (T | boolean)[] ;
    }

    return [...sortArray, ...invalidArray] as (T | boolean)[] ;
}
//#endregion

const sortArrayBoolean = Object.freeze({
    arrayBoolean,
    forceConvert
});

export default sortArrayBoolean;

import {type InputOptions } from "../models/inputOptions";

interface Options<T extends number | undefined | null = number> extends InputOptions<unknown, T> {
    /**
     * Минимальное значение
     */
    readonly min?: number | undefined;
    /**
     * Максимальное значение
     */
    readonly max?: number | undefined;
}

function validationNumber(value: unknown): number | undefined{
    if (typeof value !== 'number') {
        return undefined;
    }

    if( isNaN(value)) {
        return undefined;
    }

    return value;
}

/**
 * Проверить принадлежность числа диапазону [min, max].
 *
 * Если value не является числом, вернуть defaultValue или 0.
 * Если value меньше min, вернуть min.
 * Если value больше max, вернуть max.
 * Если min и max отсутствуют, проверить только value.
 * Если min > max, выбросить ошибку.
 */
export default function validationNumberInRange<T extends number | undefined | null = number>(
    options: Options<T>,
): number | T {
    const value = validationNumber(options.value);

    if (value === undefined) {
        return Object.prototype.hasOwnProperty.call(options, 'defaultValue')
            ? options.defaultValue as T
            : 0;
    }

    const min = validationNumber(options.min);
    const max = validationNumber(options.max);

    if (min !== undefined && max !== undefined && min > max) {
        throw Error('Incorrect interval min > max');
    }

    if (min !== undefined && value < min) {
        return min;
    }

    if (max !== undefined && value > max) {
        return max;
    }

    return value;
}
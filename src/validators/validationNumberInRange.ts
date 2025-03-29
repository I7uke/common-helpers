import { InputOptions } from "../models/inputOptions";

interface Options<T extends number | undefined | null = number> extends InputOptions<unknown, T> {
    /**
     * Минимальное значение
     */
    readonly min?: number;
    /**
     * Максимальное значение
     */
    readonly max?: number;
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
 * Проверить принадлежит ли число диапазону [min, max]
 * Значение по умолчанию, будет возвращено, если число для проверки не являлось числом
 * Если число меньше min будет возвращен min
 * Если число больше max будет возвращен max
 * Если min и max отсутствуют, будет выполнена только проверка является ли value числом
 * Если передан некорректный интервал, например min > max, будет выполнена только проверка является ли value числом
 * @param inputOptions
 */
export default function validationNumberInRange<T extends number | undefined | null = number>(options: Options<T>): number | T {
    const value = validationNumber(options.value);

    if (value === undefined) {
        return options.hasOwnProperty('defaultValue') ? options.defaultValue as T : 0;
    }

    const min = validationNumber(options.min);
    const max = validationNumber(options.max);

    if (min !== undefined && max !== undefined) {
        if (min > max) {
            throw Error('Incorrect interval min > max');
        }
    }

    if (min !== undefined) {
        if (value < min) {
            return min;
        }
    }

    if (max !== undefined) {
        if (value > max) {
            return max;
        }
    }

    return value;
}
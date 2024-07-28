import { InputOptions } from "./models/inputOptions";

interface Options extends InputOptions<unknown, number> {
    /**
     * Минимальное значение
     */
    readonly min?: number;
    /**
     * Максимальное значение
     */
    readonly max?: number;
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
export default function validationNumberInRange(options: Options): number {

    if (typeof options.value !== 'number') {
        return options.defaultValue || 0;
    }

    if (isNaN(options.value)) {
        return options.defaultValue || 0;
    }

    if(typeof options.min === 'number' && typeof options.max === 'number') {
        if(options.min > options.max) {
            // Некорректный интервал, min > max
            return options.value;
        }
    }

    if (typeof options.min === 'number') {
        if (!isNaN(options.min)) {
            if (options.value < options.min) {
                return options.min;
            }
        }
    }

    if (typeof options.max === 'number') {
        if (!isNaN(options.max)) {
            if (options.value > options.max) {
                return options.max;
            }
        }
    }

    return options.value;
}
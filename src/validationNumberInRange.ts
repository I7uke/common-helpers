import { InputOptions } from "./models/inputOptions";

type ValueForValidation = number | null | undefined;

interface Options extends InputOptions<ValueForValidation, number> {
    readonly min?: number;
    readonly max?: number;
}

/**
 * Проверить принадлежит ли число диапозону [min, max]
 * Значение по умолчанию, будет возвращено, в случае если число для проверки не являлось числом или не принадлежит интервалу
 * Если значение по умолчанию отсутствует и число меньше min будет возвращен min
 * Если значение по умолчанию отсутствует и число больше max будет возвращен max
 * Если min и max отсутствуют, будет выполнена только проверка является ли value числом
 * @param inputOptions
 */
export default function validationNumberInRange(options: Options): number {

    if (typeof options.value !== 'number') {
        return options.defaultValue || 0;
    }

    if (isNaN(options.value)) {
        return options.defaultValue || 0;
    }

    if (typeof options.min === 'number') {
        if (!isNaN(options.min)) {
            if (options.value < options.min) {
                if (typeof options.defaultValue === 'number') {
                    return options.defaultValue;
                } else {
                    return options.min;
                }
            }
        }
    }

    if (typeof options.max === 'number') {
        if (!isNaN(options.max)) {
            if (options.value > options.max) {
                if (typeof options.defaultValue === 'number') {
                    return options.defaultValue;
                } else {
                    return options.max;
                }
            }
        }
    }

    return options.value;
}
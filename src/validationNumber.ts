import { InputOptions } from "./models/inputOptions";

type ValueForValidation = number | null | undefined;

/**
 * Проверить число
 * Значение по умолчанию, будет возвращено, в случае если число для проверки не являлось числом
 * @param inputOptions
 */
export default function validationNumber(options: InputOptions<ValueForValidation, number>): number {

    if (typeof options.value !== 'number') {
        if (typeof options.defaultValue === 'number') {
            return options.defaultValue;
        } else {
            return 0;
        }
    }

    if (isNaN(options.value)) {
        if (typeof options.defaultValue === 'number') {
            return options.defaultValue;
        } else {
            return 0;
        }
    }

    return options.value;
}
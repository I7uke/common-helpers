import { InputOptions } from "./models/inputOptions";

type ValueForConvert = string | number | undefined | null;

/**
 * Перевести строку к числу
 * @param inputOptions
 */
export default function convertToNumber(options: InputOptions<ValueForConvert, number>): number {

    if (typeof options.value === 'number') {
        if (isNaN(options.value)) {
            return options.defaultValue || 0;
        }

        return options.value;
    }

    if (typeof options.value !== 'string') {
        return options.defaultValue || 0;
    }

    if (!options.value) {
        return options.defaultValue || 0;
    }
    const valueString: string = options.value.replace(/,/g, '.');
    const resultNumber: number = Number(valueString);

    if (isNaN(resultNumber)) {
        return options.defaultValue || 0;
    }

    return resultNumber;
}
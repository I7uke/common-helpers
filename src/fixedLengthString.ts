import { InputOptions } from "./models/inputOptions";

interface Options extends InputOptions<string | undefined | null, string> {
    /**
     * Максимальная длинна строки
     */
    readonly maxLength: number;
    /**
     * Добавлять точки (...) в конце строки, по умолчанию true
     */
    readonly isAddDots?: boolean;
}

function validationMaxLength(num: number | string | null): number {
    if (typeof num !== 'number') {
        return 0;
    }

    if (num <= 0) {
        return 0;
    }

    if (isNaN(num)) {
        return 0;
    }

    return num;
}

/**
 * Ограничить строку до заданного количества символов
 * Если value не строка или пустая строка будет возвращено defaultValue
 * @param Options
 */
export default function fixedLengthString(options: Options): string {
    const maxLength: number = validationMaxLength(options.maxLength);

    if (typeof options.value !== 'string') {
        return options.defaultValue || '';
    }

    if (!options.value) {
        return options.defaultValue || '';
    }

    if (maxLength <= 0) {
        return options.value;
    }

    if (options.value.length >= maxLength) {
        const result: string = options.value.slice(0, maxLength).trim();

        if (options.isAddDots === false) {
            return result;
        }

        return `${result}...`;
    }

    return options.value;
}

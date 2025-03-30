import { InputOptions } from "./models/inputOptions";

interface Options<T extends string | null | undefined = string> extends InputOptions<string | undefined | null, T> {
    /**
     * Максимальная длинна строки
     */
    readonly maxLength: number;
    readonly endOfString?: string;
}

function validationMaxLength(num: number | null | undefined): number {
    if (typeof num !== 'number') {
        return 0;
    }

    if (isNaN(num)) {
        return 0;
    }

    if (num <= 0) {
        return 0;
    }

    return num;
}

/**
 * Ограничить строку до заданного количества символов
 * Если value не строка или пустая строка будет возвращено defaultValue
 * @param Options
 */
export default function fixedLengthString<T extends string | null | undefined = string>(options: Options<T>): string | T {
    const maxLength: number = validationMaxLength(options.maxLength);

    if (typeof options.value !== 'string') {
        return options.hasOwnProperty('defaultValue') ? options.defaultValue as T : '';
    }

    if (!maxLength) {
        return options.value;
    }

    if (options.value.length > maxLength) {
        const result: string = options.value.slice(0, maxLength).trimEnd();

        if (typeof options.endOfString === 'string') {
            return `${result}${options.endOfString}`;;
        }

        return `${result}...`;
    }

    return options.value;
}

type FixedLengthStringOptions = {
    /**
     * Целевая строка
     */
    readonly value: string | undefined | null;
    /**
     * Максимальная длинна строки
     */
    readonly maxLength: number;
    /**
     * Значение по умолчанию, будет возвращено в случае если целевое значение не является строкой или является пустой строкой
     */
    readonly defaultValue?: string;
}

function validationMaxLength(inputValue: number | string | null): number {
    if (!inputValue) {
        return 0;
    }

    if (typeof inputValue !== 'number') {
        return 0;
    }

    return inputValue;
}

/**
 * Ограничить строку до заданного количества символов
 * @param inputOptions
 */
export default function fixedLengthString(options: FixedLengthStringOptions): string {
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
        return `${options.value.slice(0, maxLength)}...`;
    }

    return options.value;
}

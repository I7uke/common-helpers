type Value = string | number | Date | boolean | undefined | null;

/**
 * Преобразовать значение к числу
 * @param value - Значение для преобразования. Если строка, будут удалены все нечисловые символы, запятая заменяется на точку
 * @param defaultValue - Значение по умолчанию, будет возвращено, если не удалось преобразовать к числу. Если отсутствует, то 0
 * @returns 
 */
export default function convertToNumber<T extends number | undefined | null = number>(value: Value, defaultValue?: T): number | T {
    if (Object.prototype.toString.call(value) !== '[object Date]'
        && typeof value !== 'string'
        && typeof value !== 'number'
        && typeof value !== 'boolean'
        && value !== undefined
        && value !== null) {
        return arguments.length <= 1 ? 0 : defaultValue as T;
    }

    if (value === null || value === undefined) {
        return 0;
    }

    const result: number = Number(value);

    if (isNaN(result)) {
        return arguments.length <= 1 ? 0 : defaultValue as T;
    }

    return result
}
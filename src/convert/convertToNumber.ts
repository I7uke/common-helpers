type Value = string | number | Date | boolean | undefined | null;
type DefaultValue = number | undefined | null;

/**
 * Приводит переданное значение к number.
 * @param value - Значение которое нужно привести к number.
 * @param defaultValue - Будет возвращено если не удастся привести к number. По умолчанию 0.
 * @returns 
 */
export default function convertToNumber<T extends DefaultValue = number>(value: Value, defaultValue?: T): number | T {
    
    const valueType = typeof value;

    if (Object.prototype.toString.call(value) !== '[object Date]'
        && valueType !== 'string'
        && valueType !== 'number'
        && valueType !== 'boolean'
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
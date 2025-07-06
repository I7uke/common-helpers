type Value = string | number | null | undefined;
type DefaultValue = Date | undefined | null;

/**
 * Приводит переданное значение к Date.
 * @param value - Значение которое нужно привести к Date.
 * @param defaultValue - Будет возвращено если не удастся привести к Date. По умолчанию undefined.
 */
export default function convertToDate<T extends DefaultValue = undefined>(value: Value, defaultValue?: T): Date | T {
    const valueType = typeof value;

    if (valueType !== 'string' && valueType !== 'number') {
        return arguments.length <= 1 ? undefined as T : defaultValue as T;
    }

    const resultDate = new Date(value as typeof valueType);

    if (isNaN(Number(resultDate))) {
        return arguments.length <= 1 ? undefined as T : defaultValue as T;
    }

    return resultDate;
}
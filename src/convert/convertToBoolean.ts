/**
 * Принудительно приводит значение к boolean.
 */
function force(value: unknown): boolean {
    return !!value;
}

/**
 * Преобразует строковые значения 'true' и 'false' к boolean. Не чувствителен к регистру.
 * @param value - Строковые 'true' и 'false'.
 * @param defaultValue - Вернет если переданное значение не является 'true' или 'false'. По умолчанию false.
 */
function stringValue<T extends boolean | undefined | null = boolean>(value: string | undefined | null, defaultValue?: T): boolean | T {
    if (typeof value !== 'string') {
        return arguments.length <= 1 ? false : defaultValue as T;
    }

    const valueLowerCase = value.trim().toLowerCase();

    if (valueLowerCase === 'false') {
        return false;
    }

    if (valueLowerCase === 'true') {
        return true;
    }

    return arguments.length <= 1 ? false : defaultValue as T;
}

const convertToBoolean = Object.freeze({
    force,
    stringValue
});

export default convertToBoolean
/**
 * Проверяет, является ли переданное значение строкой.
 * Значение по умолчанию, будет возвращено, если значение не строка
 * @param value - Значение для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не строка. Если если отсутствует, то пустая строка
 * @returns 
 */
export default function validationString<T extends string | undefined | null = string>(value: unknown, defaultValue?: T): string | T {
    if (typeof value !== 'string') {
        return arguments.length <=1 ? '' : defaultValue as T;
    }

    return value;
}
/**
 * Проверяет, является ли переданное значение числом.
 * Значение по умолчанию будет возвращено, если значение не число
 * @param value - Значение для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не строка. Если если отстуствует, то 0
 * @returns 
 */
export default function validationNumber<T extends number | undefined | null = number>(value: unknown, defaultValue?: T): number | T {
    if (typeof value === 'number') {
        if (!isNaN(value)) {
            return value;
        }
    }

    return arguments.length <=1 ? 0 : defaultValue as T;
}
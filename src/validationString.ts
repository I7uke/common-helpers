/**
 * Проверяет, является ли переданное значение строкой.
 * Значение по умолчанию, будет возвращено, если значение не строка
 * @param value - Значение для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не строка. Если если отстуствует, то пустая строка
 * @returns 
 */
export default function validationString<T extends string | undefined | null = string>(value: unknown, defaultValue?: T): string | T {
    if (typeof value !== 'string') {

        if(arguments.length <=1) {
            return '';
        }

        return defaultValue as T;
    }

    return value.trim();
}
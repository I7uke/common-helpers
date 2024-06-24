type ValueForValidation = number | null | undefined;

/**
 * Проверяет, является ли переданное значение числом.
 * Значение по умолчанию будет возвращено, если значение не число
 * @param value - Значение для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не строка. Если если отстуствует, то 0
 * @returns 
 */
export default function validationNumber(value: ValueForValidation, defaultValue?: number): number {
    if (typeof value !== 'number') {
        return defaultValue || 0;
    }

    if (isNaN(value)) {
        return defaultValue || 0;
    }

    return value;
}
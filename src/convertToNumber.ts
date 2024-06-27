type ValueForConvert = string | number | undefined | null;

/**
 * Преобразовать значение к числу
 * @param value - Значение для преобразования. Если строка, будут удалены все нечисловые символы, запятая заменяется на точку
 * @param defaultValue - Значение по умолчанию, будет возвращено, если не удалось преобразовать к числу. Если отсутствует, то 0
 * @returns 
 */
export default function convertToNumber(value: ValueForConvert, defaultValue?: number): number {
    if (typeof value === 'number') {
        if (isNaN(value)) {
            return defaultValue || 0;
        }

        return value;
    }

    if (typeof value === 'string') {
        if (!value) {
            return defaultValue || 0;
        }

        const resultReplaceComma: string = value.replace(/,/g, '.');
        const resultReplaceNonNumeric: string = resultReplaceComma.replace(/[^\d.-]/g, '');
        const valueNumber = Number(resultReplaceNonNumeric);

        if (isNaN(valueNumber)) {
            return defaultValue || 0;
        }

        return valueNumber;
    }

    return defaultValue || 0;
}
/**
 * Проверяет является ли переданный объект датой
 * Значение по умолчанию, будет возвращено, если значение не дата
 * @param date - Дата для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не дата. Если если отсутствует, то undefined
 * @returns 
 */
export default function validationDate<T extends Date | undefined | null = undefined>(date: unknown, defaultValue?: T): Date | T {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        if (arguments.length <= 1) {
            return undefined as T;
        }

        return defaultValue as T;
    }

    if (isNaN(Number(date))) {
        return defaultValue as T;
    }

    return date as Date;
}
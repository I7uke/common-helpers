/**
 * Проверяет является ли переданный объект датой
 * Значение по умолчанию, будет возвращено, если значение не дата
 * @param date - Дата для проверки
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не дата. Если если отсутствует, то undefined
 * @returns 
 */
export default function validationDate<T extends Date | undefined | null = undefined>(date: unknown, defaultValue?: T): Date | T {
    if (Object.prototype.toString.call(date) === '[object Date]') {
        if (!isNaN(Number(date))) {
            return date as Date;  
        }
    }

    return arguments.length <=1 ? undefined as T : defaultValue as T;
}
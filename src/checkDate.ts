/**
 * Проверяет является ли переданный объект датой
 * Если объект является датой вернет Date иначе вернет null
 * @param date 
 * @returns 
 */
export default function checkDate(date: any): Date | null {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return null;
    }

    if(isNaN(Number(date))) {
        return null;
    }

    return date as Date;
}
import checkDate from "./validators/validationDate";
import { InputOptions } from "./models/inputOptions";
type ValueForConvert = string | number | null | undefined;

interface Options extends InputOptions<ValueForConvert, Date | null> {
    /**
     * Изменить время полученной даты
     * startDay - Начало дня, hours: 0, min: 0, sec: 0, ms: 0
     * endDay - Конец дня hours: 23, min: 59, sec: 0, ms: 0
     */
    readonly changeTime?: 'startDay' | 'endDay';
}

/**
 * Преобразовать значение к дате
 * Если не удастся выполнить преобразования будет возвращено defaultValue, если оно отсутствует, то null 
 * @param options 
 * @returns 
 */
export default function convertToDate(options: Options): Date | null {
    if(typeof options.value !== 'number' && typeof options.value !== 'string') {
        return options.defaultValue || null;
    }

    const resultDate: Date | null = checkDate(new Date(options.value));

    if(!resultDate) {
        return options.defaultValue || null;
    }

    if (options.changeTime === 'startDay') {
        // Начало дня 00:00
        resultDate.setHours(0, 0, 0, 0);
    } else if (options.changeTime === 'endDay') {
        // Ставим 23:59 текущего дня
        resultDate.setHours(23, 59, 0, 0);
    }

    return resultDate;
}
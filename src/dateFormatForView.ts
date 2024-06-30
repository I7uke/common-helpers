import checkDate from "./checkDate";

type Format =
    'dd.mm.yyyy'
    | 'dd-mm-yyyy'
    | 'dd.mm.yyyy hh:mm'
    | 'dd-mm-yyyy hh:mm'
    | 'dd.mm.yyyy hh:mm:ss'
    | 'dd-mm-yyyy hh:mm:ss';

type Options = {
    /**
     * Значение по умолчанию, будет возвращено если целевое значение не является датой или является не валидной датой
     */
    readonly defaultValue?: string;
    /**
     * Дата для приведения к формату
     */
    readonly date: Date | undefined | null;
    /**
     * Формат даты для вывода
     */
    readonly format: Format
}

function addZero(value: string, length: number): string {
    if (value.length >= length) {
        return value;
    }

    let result: string = value;
    const needAdd: number = length - value.length;

    for (let i = 0; i < needAdd; ++i) {
        result = `0${result}`;
    }

    return result;
}

/**
 * Привести дату к формату для отображения
 * Если передана не дата или некорректная дата, будет возвращено defaultValue
 * @param options 
 * @returns 
 */
export default function dateFormatForView(options: Options): string {
    const date: Date | null = checkDate(options.date);

    if (!date) {
        return options.defaultValue || '';
    }

    const day: string = String(date.getDate());
    const month: string = String(date.getMonth() + 1);
    const year: string = String(date.getFullYear());

    if (options.format === 'dd.mm.yyyy') {
        return (`${addZero(day, 2)}.${addZero(month, 2)}.${year}`);
    }

    if (options.format === 'dd-mm-yyyy') {
        return (`${addZero(day, 2)}-${addZero(month, 2)}-${year}`);
    }

    const hours: string = String(date.getHours());
    const minutes: string = String(date.getMinutes());

    if (options.format === 'dd.mm.yyyy hh:mm') {
        return (`${addZero(day, 2)}.${addZero(month, 2)}.${year} ${addZero(hours, 2)}:${addZero(minutes, 2)}`);
    }

    if (options.format === 'dd-mm-yyyy hh:mm') {
        return (`${addZero(day, 2)}-${addZero(month, 2)}-${year} ${addZero(hours, 2)}:${addZero(minutes, 2)}`);
    }

    const seconds: string = String(date.getSeconds());

    if (options.format === 'dd.mm.yyyy hh:mm:ss') {
        return (`${addZero(day, 2)}.${addZero(month, 2)}.${year} ${addZero(hours, 2)}:${addZero(minutes, 2)}:${addZero(seconds, 2)}`);
    }

    if (options.format === 'dd-mm-yyyy hh:mm:ss') {
        return (`${addZero(day, 2)}-${addZero(month, 2)}-${year} ${addZero(hours, 2)}:${addZero(minutes, 2)}:${addZero(seconds, 2)}`);
    }

    return options.defaultValue || '';
}

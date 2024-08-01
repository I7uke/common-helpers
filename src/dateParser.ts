import validationDate from "./validationDate";

function addZero(value: number, length: number): string {
    const valueString: string = String(value);

    if (valueString.length >= length) {
        return valueString;
    }

    let result: string = valueString;
    const needAdd: number = length - valueString.length;

    for (let i = 0; i < needAdd; ++i) {
        result = `0${result}`;
    }

    return result;
}

interface DateParserResult {
    readonly dayNumber: number;
    readonly monthNumber: number;
    readonly fullYearNumber: number;
    readonly hoursNumber: number
    readonly minutesNumber: number;
    readonly secondsNumber: number;
    readonly millisecondsNumber: number;
    readonly dayString: string;
    readonly monthString: string;
    readonly fullYearString: string;
    readonly hoursString: string
    readonly minutesString: string;
    readonly secondsString: string;
    readonly millisecondsString: string;
}

/**
 * Разбивает дату, на понятные человеку поля
 * Значение по умолчанию, будет возвращено, если значение не дата
 * Все строковое значения дополняются недостающими нулями, например месяц 5 будет преобразован в 05
 * @param date - Дата
 * @param defaultValue - Значение по умолчанию, будет возвращено, если значение не дата. Если если отсутствует, то undefined
 * @returns 
 */
export default function dateParser<T extends undefined | null = undefined>(date: Date | undefined | null,  defaultValue?: T): DateParserResult | T {
    const validDate = validationDate(date);

    if (!validDate) {

        if(arguments.length <=1) {
            return undefined as T;
        }

        return defaultValue as T;
    }

    const day: number = validDate.getDate();
    const month: number = validDate.getMonth() + 1;
    const fullYear: number = validDate.getFullYear();
    const hours: number = validDate.getHours();
    const minutes: number = validDate.getMinutes();
    const seconds: number = validDate.getSeconds();
    const milliseconds: number = validDate.getMilliseconds();

    return {
        dayNumber: day,
        monthNumber: month,
        fullYearNumber: fullYear,
        hoursNumber: hours,
        minutesNumber: minutes,
        secondsNumber: seconds,
        millisecondsNumber: milliseconds,
        dayString: addZero(day, 2),
        monthString: addZero(month, 2),
        fullYearString: String(fullYear),
        hoursString: addZero(hours, 2),
        minutesString: addZero(minutes, 2),
        secondsString: addZero(seconds, 2),
        millisecondsString: addZero(milliseconds, 3)
    };
}
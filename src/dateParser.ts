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

function validationDate(date: Date | undefined | null): Date | undefined {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return undefined;
    }

    if (isNaN(Number(date))) {
        return undefined;
    }

    return date as Date;
}

interface DateParse<T extends string | number> {
    readonly day: T;
    readonly month: T;
    readonly fullYear: T;
    readonly hours: T
    readonly minutes: T;
    readonly seconds: T;
    readonly milliseconds: T;
}

/**
 * Разбивает дату, на понятные человеку поля
 * @param date - Дата которую нужно парсить
 * @param defaultValue - Значение по умолчанию, будет возвращено, если date не является датой
 * @returns 
 */
function toNumber<T extends undefined | null = undefined>(date: Date | undefined | null, defaultValue?: T): Readonly<DateParse<number>> | T {
    const validDate = validationDate(date);

    if (!validDate) {
        if (arguments.length <= 1) {
            return undefined as T;
        }

        return defaultValue as T;
    }

    return Object.freeze({
        day: validDate.getDate(),
        month: validDate.getMonth() + 1,
        fullYear: validDate.getFullYear(),
        hours: validDate.getHours(),
        minutes: validDate.getMinutes(),
        seconds: validDate.getSeconds(),
        milliseconds: validDate.getMilliseconds()
    });
}

/**
 * Разбивает дату, на понятные человеку поля
 * Все значения дополняются нулями, например месяц 5 будет преобразован в 05
 * @param date - Дата которую нужно парсить
 * @param defaultValue - Значение по умолчанию, будет возвращено, если date не является датой
 * @returns 
 */
function toString<T extends undefined | null = undefined>(date: Date | undefined | null,  defaultValue?: T): Readonly<DateParse<string>> | T{
    const dateNumber = toNumber(date, defaultValue);

    if (!dateNumber) {
        return dateNumber as T;
    }

    return {
        day: addZero(dateNumber.day, 2),
        month: addZero(dateNumber.month, 2),
        fullYear: String(dateNumber.fullYear),
        hours: addZero(dateNumber.hours, 2),
        minutes: addZero(dateNumber.minutes, 2),
        seconds: addZero(dateNumber.seconds, 2),
        milliseconds: addZero(dateNumber.milliseconds, 3)
    };
}

const dateParser = Object.freeze({
    toNumber,
    toString
});

export default dateParser
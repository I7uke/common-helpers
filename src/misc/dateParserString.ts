export interface DateParseString {
    readonly day: string;
    readonly month: string;
    readonly fullYear: string;
    readonly hours: string;
    readonly minutes: string;
    readonly seconds: string;
    readonly milliseconds: string;
}

type DefaultValue = undefined | null;

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

    if (Number.isNaN(Date.prototype.getTime.call(date))) {
        return undefined;
    }

    return date as Date;
}

function dateParserString<T extends DefaultValue = undefined>(date: Date | undefined | null, defaultValue?: T): Readonly<DateParseString> | T {
    const validDate = validationDate(date);

    if (!validDate) {
        if (arguments.length <= 1) {
            return undefined as T;
        }

        return defaultValue as T;
    }

    const day = validDate.getDate();
    const month = validDate.getMonth() + 1;
    const fullYear = validDate.getFullYear();
    const hours = validDate.getHours();
    const minutes = validDate.getMinutes();
    const seconds = validDate.getSeconds();
    const milliseconds = validDate.getMilliseconds();


    return Object.freeze({
        day: addZero(day, 2),
        month: addZero(month, 2),
        fullYear: String(fullYear),
        hours: addZero(hours, 2),
        minutes: addZero(minutes, 2),
        seconds: addZero(seconds, 2),
        milliseconds: addZero(milliseconds, 3)
    });
}

export default dateParserString;
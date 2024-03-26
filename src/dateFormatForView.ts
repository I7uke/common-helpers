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
    readonly format: 'DD.MM.YYYY'
    | 'DD-MM-YYYY'
    | 'DD.MM.YYYY HH:MM'
    | 'DD-MM-YYYY HH:MM'
    | 'DD.MM.YYYY HH:MM:SS'
    | 'DD-MM-YYYY HH:MM:SS';
}

function validationDefaultValue(inputValue: string | undefined | null): string {
    const emptyValue: string = '';

    if (typeof inputValue !== 'string') {
        return emptyValue;
    }

    return inputValue;
}

export default function dateFormatForView(inputOptions: Options): string {

    if (Object.prototype.toString.call(inputOptions.date) !== '[object Date]') {
        return validationDefaultValue(inputOptions.defaultValue);
    }

    if (isNaN(Number(inputOptions.date))) {
        return validationDefaultValue(inputOptions.defaultValue);
    }

    const date: Date = inputOptions.date as Date;

    let day: string = String(date.getDate());
    if (day.length === 1) {
        day = '0' + day;
    }

    let month: string = String(date.getMonth() + 1);
    if (month.length === 1) {
        month = '0' + month;
    }

    const year: string = String(date.getFullYear());

    if (inputOptions.format === 'DD.MM.YYYY') {
        return `${day}.${month}.${year}`;
    }

    if (inputOptions.format === 'DD-MM-YYYY') {
        return `${day}-${month}-${year}`;
    }

    let hours: string = String(date.getHours());
    if (hours.length === 1) {
        hours = '0' + hours;
    }

    let minutes: string = String(date.getMinutes());
    if (minutes.length === 1) {
        minutes = '0' + minutes;
    }

    if (inputOptions.format === 'DD.MM.YYYY HH:MM') {
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    if (inputOptions.format === 'DD-MM-YYYY HH:MM') {
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    let seconds: string = String(date.getSeconds());
    if (seconds.length === 1) {
        seconds = '0' + seconds;
    }

    if (inputOptions.format === 'DD.MM.YYYY HH:MM:SS') {
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    if (inputOptions.format === 'DD-MM-YYYY HH:MM:SS') {
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    return validationDefaultValue(inputOptions.defaultValue);
}

type Options = {
    /**
     * Значение для преобразования
     */
    readonly value: string | number | null | undefined;
    /**
     * Значение по умолчанию, применяется если не удалось выполнить преобразование
     */
    readonly defaultValue?: Date | null;
    /**
     * Изменить время полученной даты
     * startDay - Начало дня, hours: 0, min: 0, sec: 0, ms: 0
     * endDay - Конец дня hours: 23, min: 59, sec: 0, ms: 0
     */
    readonly changeTime?: 'startDay' | 'endDay';
}

function validationDate(date: Date | null | undefined): Date | null {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return null;
    }

    if(isNaN(Number(date))) {
        return null;
    }

    return date as Date;
}

/**
 * Преобразовать строку или число к дате
 * @param inputOptions
 */
export default function convertToDate(options: Options): Date | null {

    if (!options.value) {
        return validationDate(options.defaultValue);
    }

    let resultDate: Date | null = null;

    if (typeof options.value === 'string') {
        const dateString = options.value.trim();

        if (!dateString) {
            return validationDate(options.defaultValue);
        }

        const resultDateConvertFromString = new Date(dateString);

        if (isNaN(+resultDateConvertFromString)) {
            return validationDate(options.defaultValue);
        }

        resultDate = resultDateConvertFromString;
    }

    if (typeof options.value === 'number') {
        const dateNumber: number = options.value;

        if (dateNumber <= 0) {
            return validationDate(options.defaultValue);
        }

        const resultDateConvertFromNumber = new Date(dateNumber);

        if (isNaN(+resultDateConvertFromNumber)) {
            return validationDate(options.defaultValue);
        }

        resultDate = resultDateConvertFromNumber;
    }

    if (!resultDate) {
        return validationDate(options.defaultValue);
    }

    if (options.changeTime) {
        if (options.changeTime === 'startDay') {
            // Обнуляем время
            resultDate.setHours(0, 0, 0, 0);
        }

        if (options.changeTime === 'endDay') {
            // Ставим 23:59 текущего дня
            resultDate.setHours(23, 59, 0, 0);
        }
    }

    return resultDate;
}
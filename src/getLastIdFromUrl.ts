function toString<T extends string | undefined | null = string>(url: string | undefined | null, defaultValue?: T) {
    const defaultValueString: T | string = arguments.length <= 1 ? '' : defaultValue as T;

    if (typeof url !== 'string' || !url) {
        return defaultValueString;
    }

    const index = url.lastIndexOf('/');

    if (index < 0) {
        return defaultValueString;
    }

    // Получаем id, +1, чтобы получить id без разделителя
    const idString = url.substring(index + 1).trim();

    if (!idString) {
        return defaultValueString;
    }

    return idString;
}

function toNumber<T extends number | undefined | null = number>(url: string | undefined | null, defaultValue?: T): number | T {
    const defaultValueNumber: T | number = arguments.length <= 1 ? 0 : defaultValue as T;
    const idString = toString(url);

    if(!idString) {
        return defaultValueNumber;
    }

    const idNumber = Number(idString);
    

    if (isNaN(idNumber)) {
        return defaultValueNumber;
    }

    return idNumber;
}

const getLastIdFromUrl = Object.freeze({
    toNumber,
    toString
});

export default getLastIdFromUrl
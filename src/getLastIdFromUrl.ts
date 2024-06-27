interface BaseIdType<TIdString, TIdNumber, TIsEmpty extends boolean> {
    /**
     * id - приведенное к
     */
    readonly idString: TIdString;
    /**
     * id - число
     */
    readonly idNumber: TIdNumber;
    /**
     * Флаг id отсутствует 
     */
    readonly isEmpty: TIsEmpty;
}

type ResultId = BaseIdType<string, number | undefined, false>;
type ResultIdEmpty = BaseIdType<undefined, undefined, true>;

function getEmptyValue(): ResultIdEmpty {
    return {
        isEmpty: true,
        idNumber: undefined,
        idString: undefined
    };
}

function convertToNumber(str?: string | undefined | null): number | undefined {
    if (typeof str !== 'string') {
        return undefined;
    }

    const num: number = Number(str);

    if (isNaN(num)) {
        return undefined;
    }

    return num;
}

/**
 * Получить из url вида /path/path2/someID последний элемент (someID)
 * @param url - url
 * @returns 
 */
export default function getLastIdFromUrl(url?: string | undefined | null): ResultId | ResultIdEmpty {
    if (typeof url !== 'string') {
        return getEmptyValue();
    }

    if (!url) {
        return getEmptyValue();
    }

    const splitArr: string[] = url.split('/');

    if (splitArr.length < 2) {
        return getEmptyValue();
    }

    const lastItem: string | undefined | null = splitArr[splitArr.length - 1];

    if (!lastItem) {
        return getEmptyValue();
    }

    const lastItemTrim = lastItem.trim();

    if (!lastItemTrim) {
        return getEmptyValue();
    }

    return {
        idNumber: convertToNumber(lastItemTrim),
        idString: lastItemTrim,
        isEmpty: false
    }
}

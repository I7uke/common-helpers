type ValidTypeIdNumber = 'number';
type ValidTypeIdString = 'string';
type ValidTypesId = ValidTypeIdNumber | ValidTypeIdString;
type ValueType<IdType extends ValidTypesId> = IdType extends ValidTypeIdNumber ? number : string

interface BaseIdType<IdType extends ValidTypesId> {
    /**
     * Желаемый тип ID - number или string
     */
    readonly idType: IdType;
    /**
     * Значение по умолчанию, будет возвращено в случае, если не удалось получить ID
     */
    readonly defaultValue: ValueType<IdType>;
    /**
     * url из которого нужно получить ID
     */
    readonly url?: string | null;
}

/**
 * Получить из url вида /path/path2/someID последний элемент (someID)
 * @param inputOptions
 */
export default function getIdFromUrl<T extends ValidTypesId>(inputOptions: BaseIdType<T>): ValueType<T> {
    if (typeof inputOptions.idType !== 'string') {
        throw new Error('Invalid idType');
    }

    if (inputOptions.idType !== 'string' && inputOptions.idType !== 'number') {
        throw new Error('Invalid idType');
    }

    const url: string | undefined | null = inputOptions.url;

    if (!url) {
        return inputOptions.defaultValue;
    }

    if (typeof url !== 'string') {
        return inputOptions.defaultValue;
    }

    if (url.length < 2) {
        return inputOptions.defaultValue;
    }

    const splitArrTmp = url.split('/');

    if (!Array.isArray(splitArrTmp)) {
        return inputOptions.defaultValue
    }

    if (splitArrTmp.length < 2) {
        return inputOptions.defaultValue
    }

    // Получаем последний элемент
    let lastItem: string | undefined | null = splitArrTmp[splitArrTmp.length - 1];

    if (typeof lastItem !== 'string') {
        return inputOptions.defaultValue;
    }

    if (!lastItem) {
        return inputOptions.defaultValue;
    }

    if (inputOptions.idType === 'string') {
        return lastItem as ValueType<T>;
    }

    if (inputOptions.idType === 'number') {
        const lastItemNumber: number = Number(lastItem);
        if (isNaN(lastItemNumber)) {
            return inputOptions.defaultValue;
        }

        return lastItemNumber as ValueType<T>;
    }

    return inputOptions.defaultValue
}

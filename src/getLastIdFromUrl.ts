type ConvertToString = 'string';
type ConvertToNumber = 'number';
type ConvertTo = ConvertToString | ConvertToNumber | undefined;
type ConvertResult<T extends ConvertTo> = T extends ConvertToNumber ? number : string;
type DefaultValueAvailableType = string | number | undefined | null;
type DefaultValue<TConvertTo extends ConvertTo, TValue extends DefaultValueAvailableType> = TConvertTo extends ConvertToNumber ? Exclude<TValue, string> : Exclude<TValue, number>;

interface Options<TConvertTo extends ConvertTo, TDefaultValue extends DefaultValueAvailableType> {
    readonly url: string | undefined | null;
    readonly defaultValue?: DefaultValue<TConvertTo, TDefaultValue>;
    readonly convertTo?: TConvertTo;
}

export default function getLastIdFromUrl<TConvertTo extends ConvertTo = undefined, TDefaultValue extends DefaultValueAvailableType = undefined>(options: Options<TConvertTo, TDefaultValue>): ConvertResult<TConvertTo> | DefaultValue<TConvertTo, TDefaultValue> {
    const url = options.url;
    let convertTo: ConvertTo = 'string';
    let defaultValue: DefaultValue<TConvertTo, TDefaultValue> | undefined = undefined;

    if (options.convertTo === 'number') {
        convertTo = 'number';
    }

    if (typeof options.defaultValue === 'string'
        || typeof options.defaultValue === 'number'
        || options.defaultValue === null
        || options.defaultValue === undefined) {
        defaultValue = options.defaultValue;
    }

    if (typeof url !== 'string') {
        return defaultValue as DefaultValue<TConvertTo, TDefaultValue>;
    }

    if (!url) {
        return defaultValue as DefaultValue<TConvertTo, TDefaultValue>;
    }

    const index = url.lastIndexOf('/');

    if (index < 0) {
        return defaultValue as DefaultValue<TConvertTo, TDefaultValue>;
    }

    // Получаем id, +1, чтобы получить id без разделителя
    const idString = url.substring(index + 1).trim();

    if (!idString) {
        return defaultValue as DefaultValue<TConvertTo, TDefaultValue>;
    }

    if (convertTo === 'number') {
        const idNumber: number = Number(idString);
        if (isNaN(idNumber)) {
            return defaultValue as DefaultValue<TConvertTo, TDefaultValue>;
        }

        return idNumber as ConvertResult<TConvertTo>;
    }

    return idString as ConvertResult<TConvertTo>;
}
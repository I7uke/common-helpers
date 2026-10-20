type Value = string | number | null | undefined;
type DefaultValue = Date | undefined | null;

export default function toDate<T extends DefaultValue = undefined>(value: Value, defaultValue?: T): Date | T {
    const fallback = arguments.length <= 1 ? undefined as T : defaultValue as T;
    const valueType = typeof value;

    if (valueType !== 'string' && valueType !== 'number') {
        return fallback;
    }

    const resultDate = new Date(value as Exclude<Value, undefined | null>);

    if (Number.isNaN(resultDate.getTime())) {
        return fallback;
    }

    return resultDate;
}

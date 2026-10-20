type Value = string | number | Date | boolean | undefined | null;
type DefaultValue = number | undefined | null;

export default function toNumber<T extends DefaultValue = number>(value: Value, defaultValue?: T): number | T {
    const valueType = typeof value;
    const fallback = arguments.length <= 1 ? 0 : defaultValue as T;

    if (Object.prototype.toString.call(value) !== '[object Date]'
        && valueType !== 'string'
        && valueType !== 'number'
        && valueType !== 'boolean'
        && value !== undefined
        && value !== null) {
        return fallback;
    }

    if (value === null || value === undefined) {
        return 0;
    }

    let changedValue = value;

    if(typeof changedValue === 'string') {
        changedValue = changedValue.trim();
    }

    const result: number = Number(changedValue);

    if (isNaN(result)) {
        return fallback;
    }

    return result
}
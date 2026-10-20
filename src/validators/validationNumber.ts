export default function validationNumber<T extends number | undefined | null = number>(value: unknown, defaultValue?: T): number | T {
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return value;
    }

    return arguments.length <= 1 ? 0 : defaultValue as T;
}
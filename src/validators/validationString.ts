export default function validationString<T extends string | undefined | null = string>(value: unknown, defaultValue?: T): string | T {
    if (typeof value !== 'string') {
        return arguments.length <=1 ? '' : defaultValue as T;
    }

    return value;
}
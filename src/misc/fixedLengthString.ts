interface Options<T> {
    readonly string: unknown;
    readonly maxLength: number;
    readonly defaultValue?: T;
    readonly omission?: string | undefined | null;
}

function validationMaxLength(num: number | null | undefined): number {
    if (typeof num !== 'number') {
        return 0;
    }

    if(!Number.isFinite(num)) {
        return 0;
    }

    const maxLength = Math.trunc(num);

    if (maxLength <= 0) {
        return 0;
    }

    return maxLength;
}

function fixedLengthString<T extends string | undefined | null = string>(options: Options<T>): string | T {
    const string = options.string;
    
    if (typeof string !== 'string') {
        return Object.prototype.hasOwnProperty.call(options, 'defaultValue')
            ? options.defaultValue as T
            : '';
    }

    const validMaxLength = validationMaxLength(options.maxLength);

    if(!validMaxLength) {
        return string;
    }

    if (string.length <= validMaxLength) {
        return string;
    }

    const result = string.slice(0, validMaxLength).trimEnd();

    if (typeof options.omission === 'string') {
        return `${result}${options.omission}`;
    } 

    return result;
}

export default fixedLengthString;
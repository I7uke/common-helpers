type Order = 'az' | 'za';
type OrderOfInvalidValue = 'last' | 'first';
type Value = string | undefined | null;

interface Params<T extends Value> {
    readonly order: Order;
    readonly array: T[];
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
    readonly locales?: Intl.LocalesArgument;
    readonly options?: Intl.CollatorOptions
}

export default function sortArrayString<T extends Value>(params: Params<T>): T[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!params.array.length) {
        return [];
    }

    const invalidArray: T[] = [];
    const array: string[] = [];

    for(const item of params.array) {
        if(typeof item ==='string' && item) {
            array.push(item);
        } else {
            invalidArray.push(item);
        }
    }

    if(!array.length) {
        return invalidArray as T[];
    }

    const collatorLocales = params?.locales;
    const collatorOptions: Intl.CollatorOptions = params.options ?? { sensitivity: 'base' };
    const sortArray = params.order === 'za' ? sortZA(array, collatorLocales, collatorOptions) : sortAZ(array, collatorLocales, collatorOptions);

    if(params.orderOfInvalidValue === 'first') {
        return [...invalidArray, ...sortArray] as T[];
    }

    return [...sortArray, ...invalidArray] as T[];
}

function sortAZ(array: string[], locales?:Intl.LocalesArgument, options?: Intl.CollatorOptions): string[] {
    const collator = new Intl.Collator(locales, options);
    return array.sort((a: string, b: string) => collator.compare(a, b));
}

function sortZA(array: string[], locales?:Intl.LocalesArgument, options?: Intl.CollatorOptions): string[] {
    const collator = new Intl.Collator(locales, options);
    return array.sort((a: string, b: string) => collator.compare(b, a));
}
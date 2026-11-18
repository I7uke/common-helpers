type GetValuesForSearch<TItem> = (item: TItem) => unknown[];

export interface Params<TItem> {
    readonly array: TItem[] | undefined | null;
    readonly getValuesForSearch: GetValuesForSearch<TItem>;
    readonly search: unknown[];
}

export default function filterArrayObjectByAnyMatch<TItem>(params: Params<TItem>): TItem[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (!Array.isArray(params.search)) {
        return params.array;
    }

    if (!params.search.length) {
        return params.array;
    }

    if (typeof params.getValuesForSearch !== 'function') {
        return params.array;
    }

    const searchSet = new Set(params.search);
    const result: TItem[] = [];

    for (const item of params.array) {
        const valuesForSearch = params.getValuesForSearch(item);

        if (!Array.isArray(valuesForSearch)) {
            continue;
        }

        for (const value of valuesForSearch) {
            if (searchSet.has(value)) {
                result.push(item);
                break;
            }
        }
    }

    return result;
}
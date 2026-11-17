type GetStringsForSearch<TItem> = (item: TItem) => string[];

export interface Params<TItem> {
    readonly array: TItem[] | undefined | null;
    readonly getStringsForSearch: GetStringsForSearch<TItem>;
    readonly search: string;
}

export default function searchStringArrayObject<TItem>(params: Params<TItem>): TItem[] {
    if (!Array.isArray(params.array)) {
        return [];
    }

    if (typeof params.search !== 'string') {
        return params.array;
    }

    if (typeof params.getStringsForSearch !== 'function') {
        return params.array;
    }

    const searchLowerCase = params.search.toLowerCase().trim();

    if(!searchLowerCase) {
        return params.array;
    }

    const result: TItem[] = [];

    for (const item of params.array) {
        const stringsForSearch = params.getStringsForSearch(item);

        if(!Array.isArray(stringsForSearch)) {
            continue;
        }

        for (const string of stringsForSearch) {
            if (typeof string !== 'string') {
                continue;
            }

            if (!string) {
                continue;
            }

            const stringLowerCase = string.toLowerCase();

            if(stringLowerCase.indexOf(searchLowerCase) > -1){
                result.push(item);
                break;
            }
        }
    }

    return result;
}
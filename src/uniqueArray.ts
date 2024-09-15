/**
 * Вернет true если элементы равны, иначе false
 */
type CompareFunction<T extends unknown> = (itemA: T, itemB: T) => boolean;
type Compare<T extends unknown> = T extends object ? (keyof T) | CompareFunction<T> : CompareFunction<T>;

function uniqueArrayByField<T extends object>(array: T[], compareField: keyof T): T[] {
    const result: T[] = [];
    const uniqueFieldValue: Set<T[typeof compareField]> = new Set();

    for (const item of array) {
        if (!item.hasOwnProperty(compareField)) {
            continue;
        }

        const valueField = item[compareField];
        if(!uniqueFieldValue.has(valueField)) {
            uniqueFieldValue.add(valueField);
            result.push(item);
        }
    }

    return result;
}

function uniqueArrayByCompareFunction<T extends unknown>(array: T[], compareFunction: CompareFunction<T>): T[] {
    const result: T[] = [];
    for (const item of array) {
        let isSuccess = true;

        for(const resultItem of result) {
            if(compareFunction(item, resultItem)) {
                isSuccess = false;
                break;
            }
        }

        if(isSuccess) {
            result.push(item);
        }
    }

    return result;
}

/**
 * Оставляет только уникальные элементы массива.
 * @param array - Массив у которого нужно оставить только уникальные элементы.
 * @param compare - Метод сравнения элементов. Если отсутствует, производится строгое сравнение (===) элементов.
 * CompareFunction производит сравнение элементов, если они равны вернет true.
 * Если был передан массив объектов, можно указать поле по которому будет производиться строгое сравнение.
 * @returns 
 */
export default function uniqueArray<T extends unknown>(array: T[] | undefined | null, compare?: Compare<T>): T[] {
    if (!Array.isArray(array)) {
        return [] as T[];
    }

    if(!array.length) {
        return [] as T[];
    }

    if(array.length === 1) {
        return array.slice();
    }

    if (compare) {
        if (typeof compare === 'string') {
            return uniqueArrayByField(array as object[], compare) as T[];
        }

        if(typeof compare === 'function') {
            return uniqueArrayByCompareFunction(array, compare as CompareFunction<T>)
        }
    }

    return [... new Set(array)] as T[];
}
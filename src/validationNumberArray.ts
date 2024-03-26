/**
 * Проверить массив чисел
 * В случае если массив смешанный, будет возвращен массив содержащий только числа
 * Если передан не массив, будет возвращен пустой массив
 * @param arr
 */
export default function validationNumberArray(arr: number[] | null | undefined): number[] {
    const result: number[] = [];

    if (!arr) {
        return result;
    }

    if (!Array.isArray(arr)) {
        return result;
    }

    for (const item of arr) {
        if (typeof item === 'number') {
            result.push(item);
        }
    }

    return result;
}
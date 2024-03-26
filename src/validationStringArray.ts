/**
 * Проверить массив строк
 * В случае если массив смешанный, будет возвращен массив содержащий только строки
 * Если передан не массив, будет возвращен пустой массив
 * @param arr
 */
export default function validationStringArray(arr: string[] | null | undefined): string[] {

    const result: string[] = [];

    if (!arr) {
        return result;
    }

    if (!Array.isArray(arr)) {
        return result;
    }

    for (const item of arr) {
        if (typeof item === 'string') {
            result.push(item);
        }
    }

    return result;
}
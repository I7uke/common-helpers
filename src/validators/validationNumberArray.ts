export default function validationNumberArray(arr: unknown): number[] {
    const result: number[] = [];

    if (!Array.isArray(arr)) {
        return result;
    }

    for (const item of arr) {
        if (typeof item === 'number' && !Number.isNaN(item)) {
            result.push(item);
        }
    }

    return result;
}
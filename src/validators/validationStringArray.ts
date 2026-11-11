export default function validationStringArray(arr: unknown): string[] {
    const result: string[] = [];

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
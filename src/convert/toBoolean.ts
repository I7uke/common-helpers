export default function toBoolean(value: unknown): boolean {
    if(typeof value !== 'string') {
        return !!value;
    }

    const normalizedValue  = value.trim().toLowerCase();

    if (normalizedValue  === 'false') {
        return false;
    }

    if (normalizedValue  === 'true') {
        return true;
    }

    return !!normalizedValue ;
}
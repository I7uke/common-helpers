export default function convertToBoolean(value: unknown): boolean {
    if(typeof value === 'string') {
        const valueString = value.toLowerCase();
        if(valueString === 'false') {
            return false;;
        }
    }

    return !!value;
}
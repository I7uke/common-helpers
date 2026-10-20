type DefaultValue = Date | undefined | null;

export default function validationDate<T extends DefaultValue = undefined>(date: unknown, defaultValue?: T): Date | T {
    const fallback = arguments.length <= 1 ? undefined as T : defaultValue as T;
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return fallback;
    }

    try {
        if (!Number.isNaN(Date.prototype.getTime.call(date))) {
            return date as Date;
        }
    } catch {
        return fallback;
    }

    return fallback;
}
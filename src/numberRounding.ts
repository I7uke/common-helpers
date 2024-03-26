type Options = {
    /**
     * Число для округления
     */
    readonly number: number | undefined | null;
    /**
     * Точность, количество знаков после запятой
     * Если заданная точность меньше или равна нулю, число будет округлено до ближайшего целого
     */
    readonly accuracy?: number;
}

/**
 * Округлить число до знака
 * @param inputOptions
 */
export default function numberRounding(options: Options): number {
    if (typeof options.number !== 'number') {
        return 0;
    }

    if (isNaN(options.number)) {
        return 0;
    }

    let accuracy: number = typeof options.accuracy === 'number' ? options.accuracy : 0;
    
    if (accuracy <= 0) {
        return Math.round(options.number);
    }

    const sign: number = Math.sign(options.number);
    const positiveNumber = Math.abs(options.number);
    const result = Number(`${Math.round(Number(`${positiveNumber}e+${accuracy}`))}e-${accuracy}`);
    return result * sign;
}
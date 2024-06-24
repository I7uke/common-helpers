/**
 * Округлить число до знака
 * Если заданная точность меньше или равна нулю, число будет округлено до ближайшего целого
 * @param number - Число для округления
 * @param accuracy - Точность, количество знаков после запятой
 * @returns 
 */
export default function numberRounding(number: number | undefined | null, accuracy?: number): number {
    if (typeof number !== 'number') {
        return 0;
    }

    if (isNaN(number)) {
        return 0;
    }

    if(typeof accuracy !== 'number') {
        return Math.round(number);
    }

    if(isNaN(accuracy)) {
        return Math.round(number);
    }

    if(accuracy <=0) {
        return Math.round(number);
    }

    const sign: number = Math.sign(number);
    const positiveNumber = Math.abs(number);
    const result = Number(`${Math.round(Number(`${positiveNumber}e+${accuracy}`))}e-${accuracy}`);
    return result * sign;
}
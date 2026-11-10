export default function numberRounding(number: number | undefined | null, accuracy?: number): number {
    if (typeof number !== 'number') {
        return 0;
    }

    if (Number.isNaN(number)) {
        return 0;
    }

    if (!Number.isFinite(number)) {
        return number;
    }

    if(typeof accuracy !== 'number') {
        return Math.round(number);
    }

    if(isNaN(accuracy)) {
        return Math.sign(number) * Math.round(Math.abs(number));
    }

    const validAccuracy = Math.trunc(accuracy);

    if(validAccuracy <=0) {
        return Math.sign(number) * Math.round(Math.abs(number));
    }

    const sign: number = Math.sign(number);
    const positiveNumber = Math.abs(number);
    const result = Number(`${Math.round(Number(`${positiveNumber}e+${validAccuracy}`))}e-${validAccuracy}`);
    return result * sign;
}
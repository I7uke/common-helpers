/**
 * Возвращает URLSearchParams
 * @param url - URL содержащий параметры
 * @returns 
 */
export default function getUrlParametersParser(url: string | undefined | null): URLSearchParams {
    if (typeof url !== 'string') {
        return new URLSearchParams('');
    }

    if (!url) {
        return new URLSearchParams('');
    }

    if (url.length < 7) {
        return new URLSearchParams('');
    }

    const questionIndex: number = url.indexOf('?');

    if (questionIndex < 0) {
        return new URLSearchParams('');
    }

    const urlParameters: string = url.slice(questionIndex + 1, url.length);

    if (!urlParameters) {
        return new URLSearchParams('');
    }

    if (typeof urlParameters !== 'string') {
        return new URLSearchParams('');
    }

    return new URLSearchParams(urlParameters);
}
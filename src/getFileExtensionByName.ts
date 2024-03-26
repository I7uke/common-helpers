/**
 * Получить расширение файла по его имени
 * Расширение файла всегда отдается в нижнем регистре
 * @param inputFileName
 */
export default function getFileExtensionByName(inputFileName: string | undefined | null): string {
    const unknownFileExtension: string = 'unknown';

    if (typeof inputFileName !== 'string') {
        return unknownFileExtension;
    }

    if (!inputFileName) {
        return unknownFileExtension;
    }

    if (inputFileName.length < 3) {
        return unknownFileExtension;
    }

    const tmp = inputFileName.split('.');

    if (!tmp.length) {
        return unknownFileExtension;
    }

    const fileExtension: string = tmp[tmp.length - 1];

    if (fileExtension) {
        return fileExtension.toLowerCase();
    }

    return unknownFileExtension;
}


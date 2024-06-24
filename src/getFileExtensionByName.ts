/**
 * Получить расширение файла по его имени
 * Расширение файла всегда отдается в нижнем регистре
 * Если было передано не корректное имя файла вернет undefined
 * @param fileName - Название файла вида someFile.ext
 */
export default function getFileExtensionByName(fileName: string | undefined | null): string | undefined {
    if (typeof fileName !== 'string') {
        return undefined;
    }

    if (!fileName) {
        return undefined;
    }

    if (fileName.length < 3) {
        return undefined;
    }

    const tmp = fileName.split('.');

    if (!tmp.length) {
        return undefined;
    }

    const fileExtension: string = tmp[tmp.length - 1];

    if (fileExtension) {
        return fileExtension.toLowerCase();
    }

    return undefined;
}


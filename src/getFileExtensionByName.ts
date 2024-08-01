/**
  * Получить расширение файла по его имени
  * Расширение файла всегда отдается в нижнем регистре
  * Если было передано не корректное имя файла будет возвращено defaultValue
  * @param fileName - Название файла вида someFile.ext
  * @param defaultValue - Значение по умолчанию, будет возвращено, если получено некорректное название файла или расширение пустая строка
  * @returns 
  */
export default function getFileExtensionByName<T extends string | undefined | null = string>(fileName: string | undefined | null, defaultValue?: T): string | T {
    if (typeof fileName !== 'string') {
        if (arguments.length <= 1) {
            return '';
        }

        return defaultValue as T;
    }

    if (!fileName) {
        return defaultValue as T;
    }

    if (fileName.length < 3) {
        return defaultValue as T;
    }

    const index = fileName.lastIndexOf('.');

    if (index < 0) {
        return defaultValue as T;
    }

    // Получаем расширение файла, +1, чтобы получить чистое расширение без точки
    const fileExtension = fileName.substring(index + 1).trim();

    if (!fileExtension) {
        return defaultValue as T;
    }

    return fileExtension.toLocaleLowerCase();
}

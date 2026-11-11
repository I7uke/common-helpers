export default function getFileExtensionByName(fileName: string | undefined | null): string | null {
    if (typeof fileName !== 'string') {
        return null;
    }

    if (!fileName) {
        return null;
    }

    const fileNameTrim = fileName.trim();
    const index = fileNameTrim.lastIndexOf('.');

    if (index <= 0) {
        return null;
    }

    const fileExtension = fileNameTrim.slice(index + 1).trim();

    if (!fileExtension) {
        return null;
    }

    return fileExtension.toLowerCase();
}

function getLastPathFromUrl(url: string | undefined | null): string | null {
    if (typeof url !== 'string' || !url) {
        return null;
    }

    const urlTrim = url.trim();
    const clearPath = urlTrim.replace(/^(?:[a-z]+:)?\/\/|[?#].*$/gi, '').replace(/\/+$/, '');

    const index = clearPath.lastIndexOf('/');

    if (index < 0) {
        return null;
    }

    const lastPath = clearPath.slice(index + 1).trim();

    if (!lastPath) {
        return null;
    }

    return lastPath;
}

export default getLastPathFromUrl
import getUrlParametersParser from "../src/getUrlParametersParser";

function getTestUrl() {
    return 'http://path1/path2/path3?key1=123&key2=valueKey2';
}

test('Пустой URL', () => {
    expect(getUrlParametersParser('').get('key1')).toStrictEqual(null);
});

test('URL - undefined', () => {
    expect(getUrlParametersParser(undefined).get('key1')).toStrictEqual(null);
});

test('URL - null', () => {
    expect(getUrlParametersParser(null).get('key1')).toStrictEqual(null);
});

test('URL - number', () => {
    expect(getUrlParametersParser(12345678 as any).get('key1')).toStrictEqual(null);
});

test('URL - object', () => {
    expect(getUrlParametersParser({} as any).get('key1')).toStrictEqual(null);
});

test('URL - array', () => {
    expect(getUrlParametersParser([] as any).get('key1')).toStrictEqual(null);
});

test('URL - NaN', () => {
    expect(getUrlParametersParser(NaN as any).get('key1')).toStrictEqual(null);
});

test('URL - Слишком короткий', () => {
    expect(getUrlParametersParser('s.com').get('key1')).toStrictEqual(null);
});

test('URL не имеет параметров', () => {
    expect(getUrlParametersParser('www.site.com').get('key1')).toStrictEqual(null);
});

test('Ключ является числом', () => {
    expect(getUrlParametersParser(getTestUrl()).get('key1')).toStrictEqual('123');
});

test('Ключ является строкой', () => {
    expect(getUrlParametersParser(getTestUrl()).get('key2')).toStrictEqual('valueKey2');
});

test('Ключ отсутствует', () => {
    expect(getUrlParametersParser(getTestUrl()).get('key3')).toStrictEqual(null);
});
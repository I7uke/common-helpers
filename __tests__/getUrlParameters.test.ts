import getUrlParametersParser from "../src/getUrlParametersParser";

// @ts-ignore
delete window.location;
// @ts-ignore
window.location = {};
Object.defineProperty(window.location, 'href', {
    get: jest.fn(() => 'http://path1/path2/path3?key1=123&key2=lala'),
});

test('Ключ является числом', () => {
    expect(getUrlParametersParser().get('key1')).toStrictEqual('123');
});

test('Ключ является строкой', () => {
    expect(getUrlParametersParser().get('key2')).toStrictEqual('lala');
});

test('Ключ отсутствует', () => {
    expect(getUrlParametersParser().get('key3')).toStrictEqual(null);
});
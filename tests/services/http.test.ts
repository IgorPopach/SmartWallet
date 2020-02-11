import http, { Methods, defaultHeaders, Params } from '../../src/services/http';

describe('HTTP Service', () => {
    const response = {
        ok: true,
        headers: {},
    } as Response;
    response.headers.get = jest.fn(() => 'application/json');
    response.json = jest.fn(() => Promise.resolve({}));
    response.text = jest.fn(() => Promise.resolve('some-text'));

    beforeAll(() => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(response));
    });

    afterEach(() => {
        (window.fetch as jest.Mock).mockClear();
    });

    it('Should send correct GET request', () => {
        const url = '/some-url';
        const expectedConfig = {
            method: Methods.GET,
            headers: { ...defaultHeaders },
        };

        http.get(url);

        expect(window.fetch).toHaveBeenCalledWith(url, expectedConfig);
    });

    it('Should send correct POST request', () => {
        const url = '/lint-to-api';
        const data = { some: 'body' };
        const expectedConfig = {
            method: Methods.POST,
            headers: { ...defaultHeaders },
            body: JSON.stringify(data),
        };

        http.post(url, data);

        expect(window.fetch).toHaveBeenCalledWith(url, expectedConfig);
    });

    it('Should send correct PUT request', () => {
        const url = '/lint-to-api';
        const data = { some: 'body' };
        const expectedConfig = {
            method: Methods.PUT,
            headers: { ...defaultHeaders },
            body: JSON.stringify(data),
        };

        http.put(url, data);

        expect(window.fetch).toHaveBeenCalledWith(url, expectedConfig);
    });

    it('Should send correct PATCH request', () => {
        const url = '/lint-to-api';
        const data = { some: 'body' };
        const expectedConfig = {
            method: Methods.PATCH,
            headers: { ...defaultHeaders },
            body: JSON.stringify(data),
        };

        http.patch(url, data);

        expect(window.fetch).toHaveBeenCalledWith(url, expectedConfig);
    });

    it('Should send correct DELETE request', () => {
        const url = '/lint-to-api';
        const expectedConfig = {
            method: Methods.DELETE,
            headers: { ...defaultHeaders },
        };

        http.delete(url);

        expect(window.fetch).toHaveBeenCalledWith(url, expectedConfig);
    });

    it('Should have correct query params in URL', () => {
        const url = '/some-url';
        const expectedConfig = {
            method: Methods.GET,
            headers: { ...defaultHeaders },
        };
        const params: Params = {
            test: 'str',
            isActive: true,
            count: 22,
        };

        http.get(url, params);

        expect(window.fetch).toHaveBeenCalledWith(
            `${url}?test=${params.test}&isActive=${params.isActive}&count=${params.count}`,
            expectedConfig,
        );
    });

    it('Should return test as object with text field', async () => {
        (response.headers.get as jest.Mock).mockReturnValueOnce('text/html');

        const result = await http.get('/link-to-some-text');

        expect(result).toEqual({ text: 'some-text' });
    });

    it('Should correctly handle request error', async () => {
        (window.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ...response,
                ok: false,
                status: 400,
                statusText: 'Bad Request',
            }),
        );
        const error = await http
            .post<Error, {}>('/some-url', { some: 'data' })
            .catch((e) => e);

        expect(error.message).toBe(JSON.stringify({ status: 400, message: 'Bad Request' }));
    });

    it('Should throw error whet working with unexpected response', async () => {
        const contentType = 'multipart/form-data';
        (response.headers.get as jest.Mock).mockReturnValueOnce(contentType);

        const error = await http
            .post<Error, {}>('/some-url', { some: 'data' })
            .catch((e) => e);

        expect(error.message).toBe(`Can\'t process this response type: ${contentType}`);
    });
});

export interface Params {
    [key: string]: string | number | null | boolean;
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export interface HttpService {
    get: <R>(url: string, params?: Params) => Promise<R>;
    post: <R, D extends object>(url: string, data: D, params?: Params) => Promise<R>;
    put: <R, D extends object>(url: string, data: D, params?: Params) => Promise<R>;
    patch: <R, D extends object>(url: string, data: D, params?: Params) => Promise<R>;
    delete: <R>(url: string, params?: Params) => Promise<R>;
}

export const defaultHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
};

function toQuery(params?: Params): string {
    const names = params ? Object.keys(params) : [];
    if (names.length) {
        return '?' + names.map((key: string) => `${key}=${params[key]}`).join('&');
    }
    return '';
}

function parseResponse<R extends {}>(response: Response): Promise<R> {
    const contentType = response.headers.get('content-type');

    if (contentType.includes('application/json')) {
        return response.json() as Promise<R>;
    }
    if (contentType.includes('text/html')) {
        return response.text().then((text) => ({ text })) as Promise<R>;
    }
    return Promise.reject(new Error(`Can't process this response type: ${contentType}`));
}

function onRequestError(response: Response) {
    const error = new Error(
        JSON.stringify({
            status: response.status,
            message: response.statusText,
        }),
    );
    return Promise.reject(error);
}

function getConfig<B extends object>(method: Methods, extras: RequestInit = {}, body?: B): RequestInit {
    const config: RequestInit = {
        ...extras,
        headers: Object.assign({}, defaultHeaders, extras.headers),
        method,
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    return config;
}

function makeRequest<R, D extends object>(
    method: Methods,
    url: string,
    params?: Params,
    body?: D,
    extras?: RequestInit,
) {
    const URL = `${url}${toQuery(params)}`;
    const config = getConfig(method, extras, body);
    return fetch(URL, config).then((response) => {
        if (response.ok) {
            return parseResponse<R>(response);
        }
        return onRequestError(response);
    });
}

const service: HttpService = {
    get: <R>(url: string, params?: Params) => makeRequest<R, undefined>(Methods.GET, url, params),
    post: <R, D extends object>(url: string, data: D, params?: Params) =>
        makeRequest<R, D>(Methods.POST, url, params, data),
    put: <R, D extends object>(url: string, data: D, params?: Params) =>
        makeRequest<R, D>(Methods.PUT, url, params, data),
    patch: <R, D extends object>(url: string, data: D, params?: Params) =>
        makeRequest<R, D>(Methods.PATCH, url, params, data),
    delete: <R>(url: string, params?: Params) => makeRequest<R, undefined>(Methods.DELETE, url, params),
};

export default service;

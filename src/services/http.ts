interface Params {
    [key: string]: string | number | null | boolean;
}

const methods = {
    post: 'method: "POST"',
    put: 'method: "PUT"',
    patch: 'method: "PATCH"',
    delete: 'method: "DELETE"',
};

enum Method {
    GET = 'GET',
    POST = 'POST',
    put = 'method: "PUT"',
    patch = 'method: "PATCH"',
    delete = 'method: "DELETE"',
}

export interface HttpService {
    get: <R>(url: string, params: Params) => Promise<R>;
    post: <R>(url: string, params: Params, body: Params) => Promise<R>;
    // put: <R, P>(url: string, params: Params) => Promise<R>;
    // patch: <R, P>(url: string, params: Params) => Promise<R>;
    // delete: <R, P>(url: string, params: Params) => Promise<R>;
}

function toQuery(params: Params): string {
    return Object.keys(params)
        .map((key: string) => `${key}=${params[key]}`)
        .join('&');
}

// function makeRequest () {

// }

const service: HttpService = {
    get: <T>(url: string, params: Params) => fetch(`${url}?${toQuery(params)}`).then((response) => response.json()),
    post: <P>(url: string, params: Params, body: Params) =>
        fetch(`${url}?${toQuery(params)}`, {
            method: methods.post,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body),
        }).then((response) => response.json()),
};

export default service;

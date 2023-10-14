
interface IRequest {
    url: string
    options?: {
        method?: string
        body?: any
    }
    headers?: any
}

export const req = async (url, options = {
    method: "GET",
    body: {}
}, headers) => {

    const result = await fetch(url,
        {
            method: options.method,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({
                ...options.body
            }),
        }
    );

    const response = await result.json()
    const statusCode = result.status

    return {
        statusCode: statusCode,
        response: response
    };
}

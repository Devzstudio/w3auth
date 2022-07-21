
interface IRequest {
    url: string
    options?: {
        method?: string
        body?: any
    }
}

export const req = async (url, options = {
    method: "GET",
    body: {}
}) => {

    const result = await fetch(url,
        {
            method: options.method,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...options.body
            }),
        }
    );

    const response = await result.json()

    return response;
}

export interface ApiResponse {
    data: [],
    meta: {},
    message?: string
}

export interface ErrorHandling {
    error: boolean,
    data: [],
    message: string
}

function errorHandling(res: any): ErrorHandling {
    return {
        error: true,
        data: [],
        message: res.message
    }
}

function handleResponse(res: any): ApiResponse | ErrorHandling {
    if (res.ok) {
        return res.json()
    }
    return errorHandling(res)
}

async function getProducts(query: string = ''): Promise<ApiResponse | ErrorHandling> {
    try {
        const res: Response =
            await fetch(process.env.API_URL + '/products' + query, {
                headers: {
                    'api-token': process.env.API_TOKEN
                }
            })

        return handleResponse(res)

    } catch (e) {
        return errorHandling(e)
    }
}

async function getPossibleFilters(): Promise<ApiResponse | ErrorHandling> {
    try {
        const res = await fetch(process.env.API_URL + '/products/filters', {
            headers: {
                'api-token': process.env.API_TOKEN
            }
        })
        return handleResponse(res)
    } catch (e) {
        return errorHandling(e)
    }
}

async function getAutoComplete(query: string = ''): Promise<ApiResponse | ErrorHandling> {
    const body = {
        search: query
    }

    try {
        const res = await fetch(process.env.API_URL + '/products/auto-complete', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'api-token': process.env.API_TOKEN,
                'Content-Type': 'application/json'
            }
        })

        return handleResponse(res)

    } catch (e) {
        return errorHandling(e)
    }
}

export {getProducts, getPossibleFilters, getAutoComplete}
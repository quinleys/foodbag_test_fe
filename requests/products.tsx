import {Response} from "next/dist/compiled/@edge-runtime/primitives/fetch";


export interface ApiResponse {
    data: [],
    meta: {},
    message?: string
}
export interface ErrorHandling {
    data: [],
    message: string
}
function errorHandling(res: any): ErrorHandling {
    return {
        data: [],
        message: res.message
    }
}

async function getProducts(query: string = ''): Promise<Response|ErrorHandling> {
    try {
        const res =
            await fetch(process.env.API_URL + '/products' + query, {
                headers: {
                    'api-token': process.env.API_TOKEN
                }
            })
        return res.json()
    } catch (e) {
        return errorHandling(e)
    }
}

async function getPossibleFilters(): Promise<Response|ErrorHandling> {
    try {
        const res = await fetch(process.env.API_URL + '/products/filters', {
            headers: {
                'api-token': process.env.API_TOKEN
            }
        })
        return res.json()
    } catch (e) {
        return errorHandling(e)
    }
}

async function getAutoComplete(query: string = ''): Promise<Response|ErrorHandling> {
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
        return res.json()
    } catch (e) {
        return errorHandling(e)
    }
}

export {getProducts, getPossibleFilters, getAutoComplete}
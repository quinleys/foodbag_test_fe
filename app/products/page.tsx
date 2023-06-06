import HandleProductFilterComponent from "@/components/HandleProductFilterComponent";
import {getPossibleFilters, getProducts} from "@/requests/products";
import mainStyles from '../../styles/main.module.scss';
import {ReactElement} from "react";
import ErrorComponent from "@/components/UI/ErrorComponent";
import {ApiResponse, ErrorHandling} from "@/interfaces/requests";

export default async function ProductsPage({searchParams}): Promise<ReactElement> {
    const products: ApiResponse | ErrorHandling = await getProducts(queryString(searchParams));
    const filters: ApiResponse | ErrorHandling = await getPossibleFilters();

    function queryString(searchParams) {
        let params: string = '';
        Object.keys(searchParams).forEach((key: string, index: number): void => {
            index === 0 ? params += '?' : params += '&'

            if (searchParams[key] !== '') {
                params += `${key}=${searchParams[key]}`
            }
        })
        return params
    }

    return (
        <main className={mainStyles.container}>
            {(products.error || filters.error) && (
                <ErrorComponent/>
            )}
            {(!products?.error && !filters?.error) && (
                <>
                    <div className={mainStyles.title__row}>
                        <h1 className={mainStyles.title}>Producten</h1>
                    </div>
                    <HandleProductFilterComponent filtersCollection={filters.data} productsCollection={products.data}
                                                  pageInformation={products.meta}
                                                  queryString={queryString(searchParams)}
                                                  queryParams={searchParams}/>
                </>
            )}
        </main>
    )
}
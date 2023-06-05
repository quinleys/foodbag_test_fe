import HandleProductFilterComponent from "@/components/HandleProductFilterComponent";
import {ErrorHandling, getPossibleFilters, getProducts} from "@/requests/products";
import mainStyles from '../../styles/main.module.scss';

export default async function ProductsPage({searchParams}) {
    const products: Response | ErrorHandling = await getProducts(queryString(searchParams));
    const filters: Response | ErrorHandling = await getPossibleFilters();

    function queryString(searchParams) {
        let params = '';
        Object.keys(searchParams).forEach((key, index) => {
            if (index === 0) {
                params += '?'
            } else {
                params += '&'
            }

            if (searchParams[key] !== '') {
                params += `${key}=${searchParams[key]}`
            }
        })
        return params
    }

    return (
        <main className={mainStyles.container}>
            <div className={mainStyles.title__row}>
                <h1 className={mainStyles.title}>Producten</h1>
            </div>
            {products.message && (
                <div className={mainStyles.row}>
                    <p>{products.message}</p>
                </div>
            )}
            {!products.message && (
                <HandleProductFilterComponent filtersCollection={filters.data} productsCollection={products.data}
                                              pageInformation={products.meta} queryString={queryString(searchParams)}
                                              queryParams={searchParams}/>
            )}
        </main>
    )
}
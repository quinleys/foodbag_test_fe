'use client';

import FiltersComponent from "@/components/Filters/FiltersComponent";
import {Filter, FilterOption, pageInformation, SelectedFilterCollection} from "@/interfaces/filters";
import {ReactElement, useEffect, useState} from "react";
import {ApiResponse, ErrorHandling, getProducts} from "@/requests/products";
import styles from '../app/products/page.module.css';
import filterStyles from '../styles/filter.module.scss';
import {useRouter} from "next/navigation";
import SearchBar from "@/components/Filters/SearchBar";
import BadgeComponent from "@/components/UI/BadgeComponent";
import ButtonComponent from "@/components/UI/ButtonComponent";
import LoadingComponent from "@/components/UI/LoadingComponent";
import ProductListComponent from "@/components/Products/ProductListComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import NoProductsFoundComponent from "@/components/UI/NoProductsFoundComponent";
import {Product} from "@/interfaces/products";

export default function HandleProductFilterComponent({
                                                         filtersCollection,
                                                         productsCollection,
                                                         pageInformation,
                                                         queryParams,
                                                     }: {
    filtersCollection: Filter[],
    productsCollection: Product[],
    queryParams: {},
    pageInformation: pageInformation,
}): ReactElement {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilterCollection>({});
    const [oldSelectedFilters, setOldSelectedFilters] = useState<SelectedFilterCollection>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [pageMeta, setPageMeta] = useState<pageInformation>({current_page: 1, last_page: 1, per_page: 1, total: 1})
    const [products, setProducts] = useState<any>([]);
    const router = useRouter();
    const [collapsed, setCollapsed] = useState<boolean>(true)

    useEffect((): void => {
        querystringToState()
        setProducts(productsCollection)
        setPage(pageInformation.current_page)
        setPageMeta(pageInformation)
        setLoading(false)
    }, []);

    function querystringToState(): void {
        filtersCollection.forEach((filter: Filter): void => {
            const items = queryParams[filter.slug]?.split(',').map((item: string) => {
                const found: FilterOption | undefined = filter.data.find((filterItem: FilterOption): boolean => filterItem.slug === item)
                if (found?.name) {
                    return found
                }
                queryParams[filter.slug] = ''
                // remove items we dont want to show
            }).filter((item: FilterOption) => item !== undefined)

            if (items !== undefined) {
                setSelectedFilters((prevState: any) => ({
                    ...prevState,
                    [filter.slug]: items
                }))
            }
        })

        if (queryParams.search) {
            setSelectedFilters((prevState: any) => ({
                ...prevState,
                search: queryParams.search
            }))
        }
    }

    useEffect((): void => {
        setLoading(true)
        fetchItems().then((): void => setLoading(false))
    }, [selectedFilters, page])

    const fetchItems = async (): Promise<void> => {
        let query: string = '?per_page=12'
        Object.keys(selectedFilters).forEach((key: string): void => {
            if (key !== 'search') {
                selectedFilters[key].forEach((filterItem: FilterOption, filterKey: number): void => {
                    if (filterKey === 0) {
                        query += `&${key}=${filterItem.slug}`
                    } else {
                        query += `,${filterItem.slug}`
                    }
                })
            } else {
                if (selectedFilters[key] !== '') {
                    query += `&${key}=${selectedFilters[key]}`
                }
            }
        })

        if (oldSelectedFilters !== selectedFilters) {
            query += `&page=1`
        } else {
            query += `&page=${page}`
        }

        // query string is used for the url
        // @ts-ignore
        router.push('/products' + query, undefined, {shallow: true})

        setOldSelectedFilters(selectedFilters)

        const productsResponse: ApiResponse | ErrorHandling = await getProducts(query.toLowerCase())

        if (!productsResponse?.error) {
            setProducts(productsResponse.data)
            setPageMeta(productsResponse.meta)
        } else {
            setProducts([])
        }
    }

    const handleSetSelectedFilters = (value, filterItem, filterTitle): void => {
        if (value.target.checked) {
            if (selectedFilters[filterTitle]) {
                setSelectedFilters({
                    ...selectedFilters,
                    [filterTitle]: [...selectedFilters[filterTitle], filterItem]
                })
            } else {
                setSelectedFilters({
                        ...selectedFilters,
                        [filterTitle]: [filterItem]
                    }
                )
            }
        } else {
            setSelectedFilters({
                ...selectedFilters,
                [filterTitle]: selectedFilters[filterTitle].filter((item: FilterOption) => item.uuid !== filterItem.uuid)
            })
        }
    }

    const handleResetFilter = (): void => {
        setSelectedFilters({})
    }

    const handleSearch = (value: string): void => {
        setSelectedFilters({
            ...selectedFilters,
            search: value
        });
    }

    const handlePageChange = (newPage): void => {
        setPage(newPage)
    }

    const handleToggleFilters = (): void => {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <div className={styles.row}>
                <SearchBar
                    handleSearch={handleSearch}
                    value={selectedFilters['search']}/>
            </div>
            {/* Extra Mobile Features */}
            <div className={styles.row}>
                <div className={filterStyles.mobile__filters__information}>
                    <div className={filterStyles.mobile__filters__information__badges__row}>
                        {Object.keys(selectedFilters).map((key: string) => {
                            if (key !== 'search') {
                                return (
                                    selectedFilters[key].map((filterItem: FilterOption) => (
                                        <BadgeComponent title={filterItem.name} key={filterItem.uuid}/>
                                    )))
                            }
                        })}
                    </div>
                    <div>
                        <ButtonComponent handleClick={handleToggleFilters}
                                         className={filterStyles.mobile__filters__button}>
                            <div style={{height: '15px'}}>
                                <FontAwesomeIcon icon={faFilter}/>
                            </div>
                        </ButtonComponent>
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <FiltersComponent filtersCollection={filtersCollection}
                                  selectedFilters={selectedFilters}
                                  setSelectedFilters={handleSetSelectedFilters}
                                  handleResetFilter={handleResetFilter}
                                  handleSearch={handleSearch}
                                  collapsed={collapsed}
                                  handleToggleFilters={handleToggleFilters}
                />
                {loading && <LoadingComponent/>}
                {!loading && products.length === 0 && <NoProductsFoundComponent/>}
                {!loading && products.length > 0 && (
                    <ProductListComponent products={products} page={page} handlePageChange={handlePageChange}
                                          pageMeta={pageMeta}/>
                )}
            </div>
        </>
    )
}
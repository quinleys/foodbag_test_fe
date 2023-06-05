import styles from "../styles/product_list.module.scss";
import mainStyles from "@/styles/main.module.scss";
import ProductCardComponent from "@/components/ProductCardComponent";
import PaginationComponent from "@/components/PaginationComponent";
import ProductModalComponent from "@/components/ProductModalComponent";
import {ReactElement, useEffect, useState} from "react";
import {pageInformation} from "@/interfaces/filters";
import {Product} from "@/interfaces/products";

export default function ProductListComponent({products, pageMeta, page, handlePageChange}: {
    products: Product[],
    pageMeta: pageInformation,
    page: number,
    handlePageChange: (page: number) => void
}) : ReactElement{
    const [modalVisible, setModalVisible] = useState(false);
    const [modalProduct, setModalProduct] = useState<Product>(null);
    const [nextProduct, setNextProduct] = useState<Product>(null);
    const [prevProduct, setPrevProduct] = useState<Product>(null);

    const handleCardClick = (product: Product): void => {
        setModalProduct(product);
        setModalVisible(!modalVisible);
    }

    useEffect((): void => {
        const index: number = products.indexOf(modalProduct)
        products[index + 1] ? setNextProduct(products[index + 1]) : setNextProduct(null)
        products[index - 1] ? setPrevProduct(products[index - 1]) : setPrevProduct(null)
    }, [modalProduct])

    const handleModalClick = (product: Product): void => {
        setModalProduct(product);
    }

    const handleVisibility = (): void => {
        setModalVisible(!modalVisible);
    }

    return (
        <div className={styles.content}>
            <span className={styles.content__results}>
                            Results: {pageMeta.total} products
                        </span>
            <div className={mainStyles.grid}>
                {
                    products.map((product: Product) => (
                        <ProductCardComponent key={product.external_id} product={product} handleCardClick={handleCardClick}/>
                    ))
                }
            </div>
            {modalProduct && modalVisible && (
                <ProductModalComponent key={modalProduct} product={modalProduct} visible={modalVisible}
                                       nextProduct={nextProduct} prevProduct={prevProduct}
                                       handleVisibility={handleVisibility}
                                       handleModalClick={handleModalClick}/>
            )
            }
            <PaginationComponent currentPage={page} setPage={handlePageChange}
                                 pageInformation={pageMeta}/>
        </div>
    )
}
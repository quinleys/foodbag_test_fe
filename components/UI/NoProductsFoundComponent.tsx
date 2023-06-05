import styles from '../../styles/no_products_found.module.scss'
import {ReactElement} from "react";

export default function NoProductsFoundComponent({text}: { text?: string }): ReactElement {
    return (
        <div className={styles.row}>
            <span className={styles.row__span}>
            {text ? text : 'No products found'}
            </span>
        </div>
    )
}
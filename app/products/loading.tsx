import styles from '../../styles/loading_product_page.module.scss';
import LoadingComponent from "@/components/UI/LoadingComponent";

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <LoadingComponent/>
            </div>
        </div>
    )
}
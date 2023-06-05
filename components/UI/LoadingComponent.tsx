import styles from '../../styles/loading.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ReactElement} from "react";

export default function LoadingComponent({text}: { text?: string }): ReactElement {
    return (
        <div className={styles.loading__container}>
            {text && (
                <span className={styles.loading__text}>{text}</span>
            )}
            <div className={styles.loading__icon}>
            <FontAwesomeIcon icon={faSpinner} spin/>
            </div>
        </div>
    )
}
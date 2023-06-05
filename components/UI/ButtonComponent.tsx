import styles from '../../styles/button.module.scss'
import {ReactElement, ReactNode} from "react";

export default function ButtonComponent({handleClick, title, className, children}: {
    handleClick: () => void,
    title?: string,
    className?: string,
    children?: ReactNode
}): ReactElement {
    return (
        <button className={className ?? styles.button} onClick={handleClick}>
            {title && <span className={styles.button__title}>{title}</span>}
            <>{children}</>
        </button>
    )
}
import styles from '../../styles/badge.module.scss';
import {ReactElement} from "react";
export default function BadgeComponent({ title, className }: { title: string, className?: string}): ReactElement {
    return (
        <span className={className ?? styles.badge__primary}>
            {title}
        </span>
    )
}
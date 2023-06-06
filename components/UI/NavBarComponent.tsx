import styles from '../../styles/navbar.module.scss';
import {ReactElement} from "react";

export default function NavBarComponent(): ReactElement {
    return (
        <nav className={styles.nav}>
            <div>
                logo
            </div>
            <ul>
                <li>
                    <a href="/products">Products</a>
                </li>
            </ul>
        </nav>
    )
}
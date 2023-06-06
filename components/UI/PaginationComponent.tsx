import styles from '../../styles/pagination.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {ReactElement} from "react";
import {pageInformation} from "@/interfaces/filters"
export default function PaginationComponent({currentPage, setPage, pageInformation}: {
    currentPage: number,
    setPage: (page: number) => void,
    pageInformation: pageInformation
}): ReactElement {
    return (
        <nav className={styles.pagination__row}>
            <ul>
                <li className={currentPage === 1 ? styles.pagination__item__disabled : styles.pagination__item}>
                    <a onClick={() => setPage(currentPage - 1)} className="pagination__link">
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        <span style={{marginLeft: "0.4rem"}}>
                        Prev
                        </span>
                    </a>
                </li>
                <li className={styles.pagination__item__active}>
                    <a href="#" className="pagination__link">{currentPage}</a>
                </li>
                <li
                    className={currentPage + 1 <= pageInformation.last_page ? styles.pagination__item : styles.pagination__item__disabled}>
                    <a onClick={() => setPage(currentPage + 1)} className="pagination__link">
                          <span style={{marginRight: "0.4rem"}}>
                        Next
                        </span>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
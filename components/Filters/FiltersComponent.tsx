import Filter from "@/components/Filters/Filter";
import {Filter as FilterInterface} from "@/interfaces/filters";
import styles from '../../styles/filter.module.scss';
import ResetFilterButton from "@/components/Filters/ResetFilterButton";
import ButtonComponent from "@/components/UI/ButtonComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export default function FiltersComponent({
                                             filtersCollection,
                                             selectedFilters,
                                             setSelectedFilters,
                                             handleResetFilter,
                                             collapsed,
                                             handleToggleFilters
                                         }: {
    filtersCollection: FilterInterface[],
    selectedFilters: any,
    setSelectedFilters: ({}, Filter , string) => void,
    handleResetFilter: any,
    collapsed: boolean,
}) {
    return (
        <div className={collapsed ? styles.filter__container__collapsed : styles.filter__container}>
            <div className={styles.filter__title__row}>
                <h1 className={styles.filter__title}>Filters</h1>
                {/* Mobile button */}
                <div>
                    <ButtonComponent handleClick={handleToggleFilters}
                                     className={styles.mobile__filters__close__button}>
                        <div style={{height: '15px'}}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    </ButtonComponent>
                </div>
            </div>
            {filtersCollection.map((filter: FilterInterface) => (
                <Filter
                    key={filter.slug}
                    filter={filter}
                    handleCheckboxChange={setSelectedFilters}
                    selectedFilters={selectedFilters}
                />
            ))}
            <ResetFilterButton handleResetFilter={handleResetFilter}/>
        </div>
    )
}
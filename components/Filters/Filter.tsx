import {ChangeEvent, ReactElement, useState} from "react";
import styles from '../../styles/filter.module.scss';
import CollapseIconComponent from "@/components/UI/CollapseIconComponent";
import {Filter, FilterOption as FilterOptionInterface} from "@/interfaces/filters";
import FilterOption from "@/components/Filters/FilterOption";

export default function Filter({filter, handleCheckboxChange, selectedFilters}: {
    filter: Filter,
    handleCheckboxChange: (e: ChangeEvent<HTMLElement>, filter: FilterOptionInterface, option: string) => void,
    selectedFilters: string[]
}) : ReactElement {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const handleFilterClick = (): void => {
        setCollapsed(!collapsed)
    }

    const handleCollapseClick = (): void => {
        setCollapsed(!collapsed)
    }

    return (
        <div className={styles.filter__row}>
            <div onClick={handleFilterClick} className={styles.filter__collapsable}>
                <h4 className={styles.filter__collapsable__title}>{filter.title}</h4>
                <CollapseIconComponent collapsed={collapsed} handleClick={handleCollapseClick}/>
            </div>
            <div className={collapsed ? styles.collapsed : styles.expanded}>
                {filter.data.map((filterItem: FilterOptionInterface) => (
                    <FilterOption key={filterItem.uuid} filterTitle={filter.slug} filterItem={filterItem}
                                  handleCheckboxChange={handleCheckboxChange}
                                  selectedFilters={selectedFilters}/>
                ))}
            </div>
        </div>
    )
}
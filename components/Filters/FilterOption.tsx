import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import styles from '../../styles/filter_option.module.scss';
import { FilterOptionProps } from '@/interfaces/filters';

export default function FilterOption({
                                         filterItem,
                                         filterTitle,
                                         handleCheckboxChange,
                                         selectedFilters
                                     }: FilterOptionProps): ReactElement {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect((): void => {
        handleState()
    }, [selectedFilters])

    const handleState = (): void => {
        selectedFilters[filterTitle]?.filter((filter) :boolean => filter.slug === filterItem.slug).length > 0
            ? setChecked(true)
            : setChecked(false)
    }
    const handleCheckboxChangeLocally = (e: ChangeEvent<HTMLElement>): void => {
        setChecked(!checked)
        handleCheckboxChange(e, filterItem, filterTitle)
    }

    return (
        <ul key={filterItem.uuid} className={styles.option}>
            <li className={styles.option__item}>
                <input type={"checkbox"} id={filterItem.uuid} name={filterItem.name}
                       checked={checked}
                       value={filterItem.slug}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChangeLocally(e)}
                />
                <label className={styles.option__label} htmlFor={filterItem.uuid}>{filterItem.name}</label>
            </li>
        </ul>
    )
}
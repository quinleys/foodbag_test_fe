import {ChangeEvent} from "react";

export interface FilterOption {
    name: string;
    slug: string;
    uuid: string;
}

export interface Filter {
    title: string;
    slug: string;
    data: FilterOption[];
}

export interface FilterOptionProps {
    filterItem: FilterOption,
    filterTitle: string,
    handleCheckboxChange: (e: ChangeEvent<HTMLElement>, filterItem: FilterOption, filterTitle: string) => void,
    selectedFilters: {}
}

export interface pageInformation {
    current_page: number,
    last_page: number,
    per_page: number,
    total: number,
}

export interface SelectedFilterCollection {}
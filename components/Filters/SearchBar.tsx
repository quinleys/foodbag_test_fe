import style from '../../styles/search_bar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import useDebounce from "@/hooks/useDebounce";
import {FormEvent, ReactElement, useEffect, useState} from "react";
import {ApiResponse, ErrorHandling, getAutoComplete} from "@/requests/products";
import LoadingComponent from "@/components/UI/LoadingComponent";

export default function SearchBar({handleSearch, value}: {
    handleSearch: (string) => void,
    value: string
}): ReactElement {
    const [search, setSearch] = useState<string>('')
    const [debounceValue, setDebounceValue] = useState<number>(0)
    const debouncedSearch = useDebounce(search, debounceValue)
    const [autocomplete, setAutocomplete] = useState<string[]>([])
    const [autocompleteVisible, setAutocompleteVisible] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect((): void => {
        // instantly install correct value
        if (debounceValue !== 0) {
            setDebounceValue(0)
        }

        if (value === undefined) {
            setSearch('')
        } else {
            setSearch(value)
        }

        // go back to default value
        setDebounceValue(500)
    }, [value]);

    useEffect((): void => {
        if (search === '') {
            setAutocomplete([])
            handleSearch('')
        }
    }, [search]);


    const handleAutoComplete = async (): Promise<void> => {
        setError(false)
        setErrorMessage('')
        setAutocompleteVisible(true)
        setLoading(true)
        const res: ApiResponse | ErrorHandling = await getAutoComplete(search)

        if (res.data) {
            setAutocomplete(res.data)
        } else {
            setAutocomplete([])
            setError(true)
            setErrorMessage('Something went wrong, please try again later')
        }

        setLoading(false)
    }

    const instantlySetSearch = (query: string): void => {
        setSearch(query)
        setDebounceValue(0)
    }

    const handleAutoCompleteClick = (item: string): void => {
        instantlySetSearch(item)
        handleAutoCompleteOutsideClick(item)
    }

    const handleAutoCompleteOutsideClick = (item: string): void => {
        setAutocomplete([])
        setAutocompleteVisible(false)
        handleSearch(item)
    }

    useEffect((): void => {
        if (debouncedSearch && search !== value) {
            handleAutoComplete()
        }
    }, [debouncedSearch])

    return (
        <div className={style.filter__searchBar__container}>
            <input className={style.filter__searchBar} type="text" placeholder="Waar ben je naar opzoek?"
                   onInput={(event: FormEvent<HTMLInputElement>) => setSearch(event.target.value)} value={search}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.filter__searchBar__icon}/>
            {autocompleteVisible && (
                <div>
                    <div className={style.filter__searchBar__autocomplete}>
                        <ul>
                            {loading && (
                                <li>
                                    <LoadingComponent/>
                                </li>
                            )}
                            {!loading && autocomplete.map((item: string, index: number) => {
                                return <li key={index} onClick={() => handleAutoCompleteClick(item)}
                                           className={style.filter__searchBar__autocomplete__item}>{item}</li>
                            })}
                            {!loading && autocomplete.length === 0 && (
                                <li>No results</li>
                            )}
                            {error && (
                                <li>{errorMessage}</li>
                            )}
                        </ul>
                    </div>
                    <div className={style.filter__searchBar__autocomplete__background}
                         onClick={() => handleAutoCompleteOutsideClick(search)}/>
                </div>
            )
            }
        </div>
    )
}
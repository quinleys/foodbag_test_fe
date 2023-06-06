import {ReactElement} from "react";
import mainStyles from "@/styles/main.module.scss";

export default function ErrorComponent({error, errorMessage}: {
    error?: boolean,
    errorMessage?: string
}): ReactElement {
    return (
        <div className={mainStyles.error__row}>
            <div className={mainStyles.error}>
                <h2>Oops, Er is iets misgegaan ...</h2>
                <p>Probeer het later opnieuw</p>
            </div>
        </div>
    )
}
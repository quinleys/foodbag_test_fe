'use client';
import ButtonComponent from "@/components/UI/ButtonComponent";
import {ReactElement} from "react";

export default function ResetFilterButton({handleResetFilter}: { handleResetFilter: () => void }): ReactElement {
    return (
        <div>
            <ButtonComponent title="Reset Filter" handleClick={handleResetFilter} />
        </div>
    )
}
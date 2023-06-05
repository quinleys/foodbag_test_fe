import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'
import style from '../../styles/collapse-icon.module.scss';
import {ReactElement} from "react";

export default function CollapseIconComponent({collapsed, handleClick}: {
    collapsed: boolean,
    handleClick: () => void
}) : ReactElement {
    return (
        <div className={collapsed ? style.icon__collapsed : style.icon__expanded} onClick={handleClick}>
            <FontAwesomeIcon icon={faAngleUp}/>
        </div>
    )
};
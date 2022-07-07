import React from 'react'
import classes from './Error.module.css'
import {ErrorPlaceholder, Reload} from '../iconComponents'

const Error: React.FC = () => {
    function refreshPage() {
        window.location.reload()
    }

    return (
        <div className={classes.Error}>
            <span>Ошибка загрузки списка</span>
            <ErrorPlaceholder className={classes.ErrorPlaceholder}/>
            <button className={classes.Reload} onClick={refreshPage}>
                <Reload/>
                Перезагрузить список
            </button>
        </div>
    )
}

export default Error

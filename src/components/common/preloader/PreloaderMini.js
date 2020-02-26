import React from 'react'
import preloader from "../../../assets/images/preloader.svg";
import s from './Preloader.module.css';

const PreloaderMini = () => {
    return (
        <div className={s.widthMini}>
            <img src={preloader} alt={""}/>
        </div>
    )
};

export default PreloaderMini;
import React from 'react'
import preloader from "../../../assets/images/preloader.svg";
import s from './Preloader.module.css';

const PreloaderMini = () => {
    return (
        <img className={s.widthMini} src={preloader} alt={""}/>
    )
};

export default PreloaderMini;
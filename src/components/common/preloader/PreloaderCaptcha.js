import React from 'react'
import preloader from "../../../assets/images/preloader.svg";
import s from './Preloader.module.css';

const PreloaderCaptcha = () => {
    return (
        <div>
            <img className={s.captcha} src={preloader} alt={""}/>
        </div>
    )
};

export default PreloaderCaptcha;
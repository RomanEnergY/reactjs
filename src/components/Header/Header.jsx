import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' alt={""}/>
        <div className={s.loginBlock}>
            {props.isFetching
                ? <Preloader/>
                : props.id && props.login
                    ? <>
                        {`Hello ${props.login}: id=${props.id}: email=${props.email}`}
                        <button onClick={props.onClickBtnExit}>Exit</button>
                    </>
                    : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
};

export default Header;
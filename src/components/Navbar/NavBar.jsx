import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const NavBar = (props) => {
    return (
        <nav className={s.nav}>
            {props.id
                ? <>
                    <div className={s.item}>
                        <NavLink to={`/profile/${props.id}`} activeClassName={s.activeLink}>My profile</NavLink>
                    </div>
                    <div className={s.item}>
                        <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
                    </div>
                </>
                : <div className={s.item}>
                    <NavLink to={`/login`} activeClassName={s.activeLink}>Login</NavLink>
                </div>}

            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
        </nav>
    )
};
const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id
    }
};

export default connect(mapStateToProps)(NavBar);
import {NavLink} from "react-router-dom";
import style from "./NavLinkToId.module.css";
import React from "react";

const NavLinkToId = ({navLink, photosUser}) => {
    return (
        <div>
            <NavLink to={`${navLink}`}>
                <img className={style.userPhoto} src={photosUser} alt={photosUser}/>
            </NavLink>
        </div>
    )
};

export default NavLinkToId;

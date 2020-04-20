import React from 'react';
import style from '../Profile.module.css';
import user_png_loc from "../../../assets/images/user1.png";

const ProfileImg = (props) => {
    return (
        <div>
            <div>
                <img className={style.profilePhoto}
                     src={props.photo
                         ? props.photo
                         : user_png_loc}
                     alt={""}/>
            </div>
        </div>
    )
};

export default ProfileImg;
import React from 'react';
import s from './ProfileInfo.module.css';
import user_png_loc from "../../../assets/images/user1.png";

const ProfileImg = (props) => {
    return (
        <div>
            <div>
                <img className={s.profilePhoto}
                     src={props.photo
                         ? props.photo
                         : user_png_loc}
                     alt={""}/>
            </div>
        </div>
    )
};

export default ProfileImg;
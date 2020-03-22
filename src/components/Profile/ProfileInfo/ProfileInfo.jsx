import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHook from "./profileStatus/ProfileStatusWithHook";

const ProfileInfo = (props) => {
    console.log('ProfileInfo = (props)');
    return (
        <div>
            <div>
                <img className={s.profilePhoto} src={props.photo} alt={""}/>
            </div>
            <div className={s.descriptionBlock}>
                {!props.fullName ? 'Пусто' : props.fullName}
            </div>
            <ProfileStatusWithHook/>
        </div>
    )
};

export default ProfileInfo;
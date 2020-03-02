import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from "./profileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img className={s.profilePhoto} src={props.photo}/>
            </div>
            <div className={s.descriptionBlock}>
                {!props.fullName ? 'Пусто' : props.fullName}
            </div>
            <ProfileStatus />
        </div>
    )
}

export default ProfileInfo;
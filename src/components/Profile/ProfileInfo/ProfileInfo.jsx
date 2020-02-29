import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img className={s.profilePhoto} src={props.photo}/>
            </div>
            <div className={s.descriptionBlock}>
                {!props.fullName ? 'Пусто' : props.fullName}
            </div>
        </div>
    )
}

export default ProfileInfo;
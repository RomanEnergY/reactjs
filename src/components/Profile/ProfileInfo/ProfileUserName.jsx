import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileUserName = (props) => {
    return (<div className={s.descriptionBlock}>
            <b>{!props.fullName ? 'Пусто' : props.fullName}</b>
        </div>
    )
};

export default ProfileUserName;
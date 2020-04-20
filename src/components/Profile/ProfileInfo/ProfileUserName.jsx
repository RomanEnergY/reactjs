import React from 'react';
import style from '../Profile.module.css';

const ProfileUserName = (props) => {
    return (<div className={style.descriptionBlock}>
            <b>{!props.fullName ? 'Пусто' : props.fullName}</b>
        </div>
    )
};

export default ProfileUserName;
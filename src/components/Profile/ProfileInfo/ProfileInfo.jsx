import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img src={props.photo}/>
            </div>
            <div className={s.descriptionBlock}>
                {!props.status ? 'Пусто' : props.status}
            </div>
        </div>
    )
}

export default ProfileInfo;
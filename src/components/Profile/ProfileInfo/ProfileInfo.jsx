import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img src={props.photo}/>
            </div>
            <div className={s.descriptionBlock}>
                {props.aboutMe}
            </div>
        </div>
    )
}

export default ProfileInfo;
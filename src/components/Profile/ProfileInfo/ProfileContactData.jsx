import React from 'react';
import style from '../Profile.module.css'

const ProfileContactData = ({activateEditMode, buttonEditMode, data}) => {
    return (
        <div>
            {activateEditMode && <div>
                <button onClick={buttonEditMode} className={style.butEditMode}>Edit</button>
            </div>
            }
            <div>
                <b>Full name</b>: <span key={data.fullName}
                                        className={style.contactValue}>{data.fullName ? data.fullName : '...'}</span>
            </div>
            <div>
                <b>Looking for a job</b>: <span key={data.lookingForAJob}
                                                className={style.contactValue}>{data.lookingForAJob ? 'yes' : 'no'}</span>
            </div>
            <div>
                <b>Looking for a job description</b>: <span key={data.lookingForAJobDescription}
                                                            className={style.contactValue}>{data.lookingForAJobDescription ? data.lookingForAJobDescription : '...'}</span>
            </div>
            <div>
                <b>About me</b>: <span key={data.aboutMe}
                                       className={style.contactValue}>{data.aboutMe ? data.aboutMe : '...'}</span>
            </div>

            <div>
                <b>Contacts</b>:
                {Object
                    .keys(data.contacts)
                    .map(key => {
                        return <div key={key} className={style.contact}>
                            <span className={style.contactKey}>{key}: </span>
                            <span key={'contacts.' + {key}} className={style.contactValue}>{data.contacts[key] ? data.contacts[key] : '...'}</span>
                        </div>
                    })}
            </div>
        </div>
    );
};

export default ProfileContactData

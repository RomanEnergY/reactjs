import React, {useEffect, useState} from 'react';
import ProfileContactData from "./ProfileContactData";
import ProfileContactForm from "./ProfileContactForm";
import style from '../Profile.module.css'
import Preloader from "../../common/preloader/Preloader";

const ProfileContactDataWithHook = ({data, authId, updateContactForm, ...props}) => {
    let [activateEditMode, setActivateEditMode] = useState(false);
    let [editMode, setEditMode] = useState(false);
    const buttonOnClick = () => {
        setEditMode(true);
    };

    useEffect(() => {
        if (`${data.userId}` === `${authId}`) {
            setActivateEditMode(true)
        } else
            setActivateEditMode(false)
    }, [data.userId, authId]);

    let handleSubmit = (dataForm) => {
        updateContactForm(dataForm)
            .then(() => {
                setEditMode(false);
            })

    };

    const closeEdit = () => {
        setEditMode(false);
    };

    if (data.fetchingData)
        return <Preloader/>

    return <div className={style.contactData}>
        {editMode
            ? <ProfileContactForm initialValues={{...data}}
                                  onSubmit={handleSubmit}
                                  data={data}
                                  closeEdit={closeEdit}/>

            : <ProfileContactData activateEditMode={activateEditMode}
                                  buttonEditMode={buttonOnClick}
                                  data={data}/>
        }
    </div>
};

export default ProfileContactDataWithHook;
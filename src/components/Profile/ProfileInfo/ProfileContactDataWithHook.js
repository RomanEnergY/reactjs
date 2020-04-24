import React, {useEffect, useState} from 'react';
import ProfileContactData from "./ProfileContactData";
import ProfileContactForm from "./ProfileContactForm";
import style from '../Profile.module.css'
import {reduxForm, stopSubmit} from "redux-form";

const nameReduxForm = {
    form: 'edit-profile',
    enableReinitialize: true
};

const ProfileContactDataWithHook = ({profileData, profileFetching, isAuthMe, updateContactForm, dispatchErrorSubmitData, ...props}) => {
    let [activateEditMode, setActivateEditMode] = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [dataForm, setDataForm] = useState(profileData);

    const buttonOnClick = () => {
        setEditMode(true);
    };

    useEffect(() => {
        if (isAuthMe) {
            setActivateEditMode(true)
        } else
            setActivateEditMode(false);

        setDataForm(profileData);
    }, [isAuthMe, profileData, editMode]);

    let handleSubmit = (dataFormSubmit) => {
        // debugger
        setDataForm(dataFormSubmit);

        updateContactForm(dataFormSubmit)
            .then(() => {
                setEditMode(false);
            })
            .catch(error => {
                dispatchErrorSubmitData(stopSubmit(nameReduxForm.form, {...error}));
            })
    };

    const closeEdit = () => {
        setEditMode(false);
    };

    return <div className={style.contactData}>
        {editMode
            ? <ProfileContactReduxForm initialValues={{...dataForm}}
                                       onSubmit={handleSubmit}
                                       profileFetching={profileFetching}
                                       closeEdit={closeEdit}/>

            : <ProfileContactData activateEditMode={activateEditMode}
                                  buttonEditMode={buttonOnClick}
                                  data={profileData}/>
        }
    </div>
};

const ProfileContactReduxForm = reduxForm({...nameReduxForm})(ProfileContactForm);

export default ProfileContactDataWithHook;
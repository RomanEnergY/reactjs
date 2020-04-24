import React from 'react';
import style from '../Profile.module.css'
import {Field} from "redux-form";
import {KeyToInput} from "../../common/FormsComntrols/FormsControls";
import {required} from "../../../utils/validators/validator";

const ProfileContactForm = ({error, closeEdit, data, ...props}) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <button className={style.butEditMode} disabled={!props.valid}>Save</button>
                    <button onClick={closeEdit} className={style.butEditMode}>No save</button>
                    {error && <div className={style.formError}>{error}</div>}
                </div>
                <Field name={'fullName'}
                       data={data.fullName}
                       component={KeyToInput}
                       type="text"
                       label={'Full name:'}
                       validate={[required]}/>

                <Field name={'lookingForAJob'}
                       data={data.lookingForAJob}
                       component={KeyToInput}
                       type={'checkbox'}
                       label={'Looking for a job:'}/>

                <Field name={'lookingForAJobDescription'}
                       data={data.lookingForAJobDescription}
                       component={KeyToInput}
                       type="text"
                       label={'Looking for a job description:'}
                       validate={[required]}/>

                <Field name={'aboutMe'}
                       data={data.aboutMe}
                       component={KeyToInput}
                       type="text"
                       label={'About me:'}
                       validate={[required]}/>
                <div>
                    <b>Contacts</b>:
                    {Object
                        // .keys(data.contacts)
                        .keys(props.initialValues.contacts)
                        .map(key => {
                            return <div key={key} className={style.contact}>
                                <Field name={'contacts.' + key}
                                       data={data.contacts[key]}
                                       component={KeyToInput}
                                       type="text"
                                       label={`${key}:`}/>
                            </div>
                        })}
                </div>
            </form>
        </div>
    );
};

export default ProfileContactForm;
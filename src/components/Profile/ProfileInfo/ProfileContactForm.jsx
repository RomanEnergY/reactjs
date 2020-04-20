import React from 'react';
import style from '../Profile.module.css'
import {Field, reduxForm} from "redux-form";
import {KeyToInput} from "../../common/FormsComntrols/FormsControls";
import {required} from "../../../utils/validators/validator";

const ProfileContactForm = ({data, error, closeEdit, ...props}) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <button className={style.butEditMode} disabled={!props.valid}>Save</button>
                    <button onClick={closeEdit} className={style.butEditMode}>No save</button>
                    {error && <div className={style.formError}>{error}</div>}
                </div>
                <Field name={'fullName'}
                       component={KeyToInput}
                       type="text"
                       data={'Full name:'}
                       validate={[required]}/>

                <Field name={'lookingForAJob'}
                       component={KeyToInput}
                       type={'checkbox'}
                       data={'Looking for a job:'}/>

                <Field name={'lookingForAJobDescription'}
                       component={KeyToInput}
                       type="text"
                       data={'Looking for a job description:'}
                       validate={[required]}/>

                <Field name={'aboutMe'}
                       component={KeyToInput}
                       type="text"
                       data={'About me:'}
                       validate={[required]}/>
                <div>
                    <b>Contacts</b>:
                    {Object
                        .keys(data.contacts)
                        .map(key => {
                            return <div key={key} className={style.contact}>
                                <Field name={'contacts.' + key}
                                       component={KeyToInput}
                                       type="text"
                                       data={`${key}:`}/>
                            </div>
                        })}
                </div>
            </form>
        </div>
    );
};

const ProfileContactReduxForm = reduxForm({form: 'edit-profile', enableReinitialize: true})(ProfileContactForm);

export default ProfileContactReduxForm;
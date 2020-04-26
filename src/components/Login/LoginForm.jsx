import React from 'react';
import {Input} from "../common/FormsComntrols/FormsControls";
import {required} from "../../utils/validators/validator";
import {Field} from "redux-form";
import style from "../common/FormsComntrols/FormsControls.module.css";
import Preloader from "../common/preloader/Preloader";
import PreloaderCaptcha from "../common/preloader/PreloaderCaptcha";

const LoginForm = ({fetching, fetchingCaptcha, errorAuth, handleSubmit, updateCaptcha, ...props}) => {
    const response = errorAuth ? errorAuth.response : null;
    const captcha = errorAuth ? errorAuth.captcha : null;

    const handleOnClick = (e) => {
        updateCaptcha();
    };

    return (
        <form onSubmit={handleSubmit}>
            {fetching
                ? <Preloader/>
                : <>
                    <div>
                        <label>Email</label>
                        <Field component={Input} name={'email'} placeholder={'email'} validate={[required]}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <Field component={Input} type={'password'} name={'password'} placeholder={'password'}
                               validate={[required]}/>
                    </div>
                    <div>
                        <Field component={'input'} type={'checkbox'} name={'rememberMe'}/>Remember me
                    </div>
                    {response && <div className={style.formError}>Response: {response}</div>}

                    {captcha && <div>
                        {fetchingCaptcha ? <PreloaderCaptcha/>
                            : <img src={captcha} alt={""} onClick={handleOnClick}/>}
                        <div>
                            <label>captcha</label>
                            <Field component={Input} name={'captcha'} placeholder={'captcha'} validate={[required]}/>
                        </div>
                    </div>}

                    <div>
                        <button>Login</button>
                    </div>
                </>}
        </form>
    )
};

export default LoginForm;
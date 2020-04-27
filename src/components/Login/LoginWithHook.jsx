import React, {useState} from 'react';
import {connect} from "react-redux";
import {authorizeOnService, setErrorAuth, updateCaptcha} from "../../redux/AuthReducer";
import LoginForm from "./LoginForm";
import Redirect from "react-router-dom/es/Redirect";
import {reduxForm, stopSubmit} from "redux-form";
import {dispatchErrorSubmitData} from "../../redux/ReduxFormReducer";

const nameReduxForm = {
    form: 'login',
    enableReinitialize: true
};

const LoginWithHook = ({fetching, isAuth, idAuth, errorAuth, fetchingCaptcha, authorizeOnService, dispatchErrorSubmitData, setErrorAuth, updateCaptcha, ...props}) => {
    let [activeErrorAuth] = useState(errorAuth);

    const handleSubmit = (formData) => {
        authorizeOnService(formData.email, formData.password, formData.rememberMe, formData.captcha)
            .catch(error => {
                debugger
                dispatchErrorSubmitData(stopSubmit(nameReduxForm.form, {error: "Error form"}));
            })
    };

    // Метод необходим для получения текущей (реальной/последней) captcha при обновлении страницы (hook)
    // 1. При старте hook сохраняет данные об errorAuth стартовом activeErrorAuth
    // 2. далее они сравниваются с предыдущем значением при обнавленном hook
    if (errorAuth && (errorAuth === activeErrorAuth)) {
        updateCaptcha();
    }

    if (isAuth)
        return <Redirect to={`/profile/${idAuth}`}/>;
    else
        return (
            <div>
                <h1>Войти на сайт</h1>
                <LoginReduxForm fetching={fetching} fetchingCaptcha={fetchingCaptcha} errorAuth={errorAuth}
                                onSubmit={handleSubmit}
                                updateCaptcha={updateCaptcha}/>
            </div>
        )
};

const LoginReduxForm = reduxForm({...nameReduxForm})(LoginForm);

const mapStateToProps = (state) => {
    return {
        idAuth: state.auth.data.id,
        isAuth: state.auth.isAuth,
        fetching: state.auth.isFetching,
        errorAuth: state.auth.errorAuth,
        fetchingCaptcha: state.auth.fetchingCaptcha
    }
};

export default connect(mapStateToProps, {
    authorizeOnService,
    dispatchErrorSubmitData,
    setErrorAuth,
    updateCaptcha
})(LoginWithHook);
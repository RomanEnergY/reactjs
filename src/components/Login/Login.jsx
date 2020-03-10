import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormsComntrols/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";

const Login = (props) => {
    const handleSubmit = (formData) => {
        console.log(formData);
    };
    return (
        <>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={handleSubmit}/>
        </>
    )
};

const maxLength15 = maxLengthCreator(15);
const maxLength20 = maxLengthCreator(20);
const Input = Element('input');
// const Password = Element('password');
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Input} name={'login'} placeholder={'Login'} validate={[required, maxLength15]}/></div>
            <span/>
            <div><Field component={Input} type={'password'} name={'password'} placeholder={'Password'} validate={[required, maxLength20]}/></div>
            <span/>
            <div><Field component={'input'} type={'checkbox'} name={'rememberMe'}/>Remember me</div>
            <span/>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

export default Login;
import React from 'react';
import {Field, reduxForm} from "redux-form";

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

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={'input'} name={'login'} placeholder={'Login'}/></div>
            <div><Field component={'input'} name={'password'} placeholder={'Password'}/></div>
            <div><Field component={'input'} type={'checkbox'} name={'rememberMe'}/>Remember me</div>
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
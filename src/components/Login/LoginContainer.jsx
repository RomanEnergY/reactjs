import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {authorizeOnService} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";
import {Input} from "../common/FormsComntrols/FormsControls";
import Preloader from "../common/preloader/Preloader";

class LoginContainer extends React.Component {
    handleSubmit = (formData) => {
        this.props.authorizeOnService(formData.email, formData.password, formData.rememberMe);
    };

    render() {
        if (this.props.isFetching)
            return <Preloader/>;

        if (this.props.isAuth)
            return <Redirect to={`/profile/${this.props.id}`}/>;
        else
            return <div>
                <h1>Войти на сайт</h1>
                <LoginReduxForm onSubmit={this.handleSubmit}/>
            </div>
    }
};

const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Email</label>
                <Field component={Input}
                       name={'email'}
                       placeholder={'Email'}
                       validate={[required]}
                />
            </div>
            <span/>
            <div>
                <label>Password</label>
                <Field component={Input}
                       type={'password'}
                       name={'password'}
                       placeholder={'Password'}
                       validate={[required, maxLength20]}
                />
            </div>
            <span/>
            <div><Field component={'input'}
                        type={'checkbox'}
                        name={'rememberMe'}/>Remember me
            </div>
            <span/>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const mapStateToProps = (state) => {
    return {
        id: state.auth.data.id,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
};

export default connect(mapStateToProps, {authorizeOnService})(LoginContainer);
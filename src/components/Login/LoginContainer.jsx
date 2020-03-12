import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormsComntrols/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {getAuthMeData, authorizeOnService} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";

class LoginContainer extends React.Component {
    componentDidMount() {
        if (!this.props.isAuth) {
            if (!this.props.isFetching) {
                this.props.getAuthMeData();
            }
        }
    }

    handleSubmit = (formData) => {
        console.log(formData);
        this.props.authorizeOnService(formData.email, formData.password, formData.rememberMe);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        debugger
        if (this.props.isFetchingLogin) {
            debugger
        }
    }

    render() {
        return (
            <>
                <h1>Войти на сайт</h1>
                {this.props.id && this.props.login
                    ? <Redirect to={`/profile/${this.props.id}`}/>
                    : <LoginReduxForm onSubmit={this.handleSubmit}/>}
            </>
        )
    }
};

const maxLength20 = maxLengthCreator(20);
const Input = Element('input');

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
        login: state.auth.data.login,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
        isFetchingLogin: state.auth.isFetchingLogin
    }
};

export default connect(mapStateToProps, {getAuthMeData, authorizeOnService})(LoginContainer);
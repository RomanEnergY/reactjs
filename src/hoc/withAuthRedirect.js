import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            return !this.props.isAuth
                ? <Redirect to='/login'/>
                : <Component {...this.props}/>
        }
    }

    // По средством метода connect подключаем требуемые данные из state
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
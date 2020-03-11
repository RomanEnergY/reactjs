import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    id: state.auth.data.id,
    login: state.auth.data.login
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            return !this.props.id && !this.props.login
                ? <Redirect to='/login'/>
                : <Component {...this.props}/>
        }
    }

    // По средством метода connect подключаем требуемые данные из state
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
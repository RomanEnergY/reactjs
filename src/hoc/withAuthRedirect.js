import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthMeData} from "../redux/AuthReducer";
import Preloader from "../components/common/preloader/Preloader";

const mapStateToPropsForRedirect = (state) => ({
    id: state.auth.data.id,
    login: state.auth.data.login,
    isFetching: state.auth.isFetching
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        componentDidMount() {
            if (!this.props.isFetching)
                this.props.getAuthMeData();
        }

        render() {
            return this.props.isFetching
                ? <Preloader/>
                : !this.props.id && !this.props.login
                    ? <Redirect to='/login'/>
                    : <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect, {getAuthMeData})(RedirectComponent);
};
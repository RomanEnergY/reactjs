import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthMeData} from "../redux/AuthReducer";
import Preloader from "../components/common/preloader/Preloader";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        componentDidMount() {
            if (!this.props.isFetching)
                this.props.getAuthMeData();
        }

        render() {
            if (this.props.isFetching)
                return <Preloader/>;

            if (!this.props.isAuth)
                return <Redirect to='/login'/>;
            else
                return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect, {getAuthMeData})(RedirectComponent);
};
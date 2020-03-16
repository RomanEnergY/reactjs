import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../components/common/preloader/Preloader";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
    // initialized: state.app.initialized
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {

        render() {
            if (this.props.isFetching)
                return <Preloader/>;

            if (!this.props.isAuth)
                return <Redirect to='/login'/>;
            else
                return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
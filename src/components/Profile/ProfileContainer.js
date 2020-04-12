import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileUserByUserId, setStatusByUserId, updateStatus} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {
    componentDidMount() {
        if (!this.props.fetching) {
            this.updateProfile();
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props !== nextProps || this.state !== nextState;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile();
        }
    }

    updateProfile = () => {
        this.props.setProfileUserByUserId(this.props.match.params.userId);
        this.props.setStatusByUserId(this.props.match.params.userId);
    };

    render() {
        if (this.props.fetching || !this.props.status.data)
            return <Preloader/>;

        return <Profile
            status={this.props.status}
            authId={this.props.authId}
            updateStatus={this.props.updateStatus}/>
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.profilePage.status,
        authId: state.auth.data.id,
        fetching: state.profilePage.fetching
    }
};

/**
 * Метод compose поочередно вызывает вложенные методы, с параметром
 * 1. Вызывает withAuthRedirect(Dialogs), получает данные и далее как параметр передает в следующий метод в сторону начала
 * 2. connect(mapStateToProps, mapDispatchToProps)(return_method_1) и так далее
 */
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {setProfileUserByUserId, setStatusByUserId, updateStatus}),
    withRouter,
)(ProfileContainer);

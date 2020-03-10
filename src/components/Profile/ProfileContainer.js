import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileUserByUserId, setStatusByUserId} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import {getAuthMeData} from "../../redux/AuthReducer";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = !this.props.match.params.userId
            ? !this.props.authId
                ? 5805
                : this.props.authId
            : this.props.match.params.userId;

        this.props.setProfileUserByUserId(userId);
        this.props.setStatusByUserId(userId);
    }

    render() {
        return (
            !this.props.data
                ? <Preloader/>
                : <Profile data={this.props.data}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profilePage.data,
        fetching: state.profilePage.fetching,
        authId: state.auth.data.id
    }
};

/**
 * Метод compose поочередно вызывает вложенные методы, с параметром
 * 1. Вызывает withAuthRedirect(Dialogs), получает данные и далее как параметр передает в следующий метод в сторону начала
 * 2. connect(mapStateToProps, mapDispatchToProps)(return_method_1) и так далее
 */
export default compose(
    connect(mapStateToProps, {setProfileUserByUserId, setStatusByUserId, getAuthMeData}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);
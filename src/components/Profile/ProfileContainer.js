import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileUserByUserId, setStatusByUserId} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() {
        if (!this.props.fetching) {
            this.updateProfile();
        }
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
        if (this.props.fetching || !this.props.data)
            return <Preloader/>;

        return <Profile data={this.props.data}/>
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profilePage.data,
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
    connect(mapStateToProps, {setProfileUserByUserId, setStatusByUserId}),
    withRouter,
)(ProfileContainer);

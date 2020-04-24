import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {connect} from "react-redux";
import {
    getProfileDataAuth,
    setProfilePhoto,
    setProfileUserByUserId,
    setStatusByUserId,
    setStatusDataContacts,
    updateStatus
} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {dispatchErrorSubmitData} from "../../redux/ReduxFormReducer";


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
        if (!this.props.profile.data.userId)
            return <Preloader/>;

        return (<>
            <ProfileInfo
                photo={this.props.photo}
                status={this.props.status}
                profile={this.props.profile}
                isAuthMe={`${this.props.authId}` === `${this.props.profile.data.userId}`}
                setProfilePhoto={this.props.setProfilePhoto}
                updateStatus={this.props.updateStatus}
                updateContactForm={this.props.setStatusDataContacts}
                dispatchErrorSubmitData={this.props.dispatchErrorSubmitData}
            />

            <MyPostsContainer/>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        authId: state.auth.data.id,
        status: state.profilePage.status,
        profile: state.profilePage.profile,
        photo: state.profilePage.photo
    }
};

/**
 * Метод compose поочередно вызывает вложенные методы, с параметром
 * 1. Вызывает withAuthRedirect(Dialogs), получает данные и далее как параметр передает в следующий метод в сторону начала
 * 2. connect(mapStateToProps, mapDispatchToProps)(return_method_1) и так далее
 */
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getProfileDataAuth,
        setProfileUserByUserId,
        setStatusByUserId,
        updateStatus,
        setStatusDataContacts,
        dispatchErrorSubmitData,
        setProfilePhoto
    }),
    withRouter,
)(ProfileContainer);

import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUser} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";
import {getAuthMeData} from "../../redux/AuthReducer";
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = !this.props.match.params.userId
            ? !this.props.authId
                ? 2
                : this.props.authId
            : this.props.match.params.userId;

        this.props.getProfileUser(userId);
    }

    render() {
        return (
            !this.props.data ? <Preloader/> : <Profile data={this.props.data}/>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.profilePage.data,
        fetching: state.profilePage.data,
        authId: state.auth.data.id
    }
};

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let withRouterProfileContainer = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {getProfileUser, getAuthMeData})(withRouterProfileContainer);
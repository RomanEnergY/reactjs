import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = !this.props.match.params.userId
            ? !this.props.authId
                ? 2
                : this.props.authId
            : this.props.match.params.userId;

        this.getUserId(userId);
    }

    // метод запроса на сервер данных
    getUserId = (id) => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    };

    render() {
        return (
            <Profile data={this.props.data}/>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        data: state.profilePage.data,
        authId: state.auth.data.id,
    }
};

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(withRouterProfileContainer);
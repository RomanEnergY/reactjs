import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {addPost, setUserProfile, updateNewPostText} from "../../redux/ProfileReducer";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        debugger
        this.getUserId(2);
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
            <Profile {...this.props} />
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        data: state.profilePage.data,
    }
};

const withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    addPost,
    updateNewPostText,
    setUserProfile

})(withRouterProfileContainer);
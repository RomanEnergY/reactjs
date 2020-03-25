import React from 'react';
import {connect} from "react-redux";
import Users from "./Users/Users";
import Preloader from "../common/preloader/Preloader";
import {followUser, getUsers, onPageChanged, unFollowUser} from "../../redux/UsersReducer";
import {
    getReselectCurrentPage,
    getReselectFollowingInProgress,
    getReselectPageSize,
    getReselectTotalUserCount,
    getReselectUsers,
    isReselectFetching
} from "../../redux/selectors/UserSelector";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage);
    }

    render() {
        if (this.props.isFetching)
            return <Preloader/>;

        return <Users {...this.props}
                      onPageChanged={this.props.onPageChanged}
                      followUser={this.props.followUser}
                      unFollowUser={this.props.unFollowUser}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: isReselectFetching(state),
        users: getReselectUsers(state),
        pageSize: getReselectPageSize(state),
        currentPage: getReselectCurrentPage(state),
        totalUserCount: getReselectTotalUserCount(state),
        followingInProgress: getReselectFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {getUsers, onPageChanged, followUser, unFollowUser})(UsersContainer);

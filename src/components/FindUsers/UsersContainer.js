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
import PaginationItems from "./Users/paginationItems/PaginationItems";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage);
    }

    render() {
        return <>
            <PaginationItems totalItemsCount={this.props.totalUserCount}
                             pageSize={this.props.pageSize}
                             currentPage={this.props.currentPage}
                             onPageChanged={this.props.onPageChanged}/>
            {this.props.isFetching
                ? <Preloader/>
                : <Users {...this.props}
                         onPageChanged={this.props.onPageChanged}
                         followUser={this.props.followUser}
                         unFollowUser={this.props.unFollowUser}
                />}
        </>
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

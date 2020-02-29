import React from 'react';
import {connect} from "react-redux";
import Users from "./Users/Users";
import Preloader from "../common/preloader/Preloader";
import {followUser, getUsers, onPageChanged, unFollowUser} from "../../redux/UsersReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

/*
    По средством connect передаем в UsersContainer данные,
    UsersContainer осуществляет передачу запросов и получение данных,
    далее данные передаются в презентационную компаненту Users
 */
class UsersContainer extends React.Component {
    // по средством connect получаем this.props
    componentDidMount() {
        this.props.getUsers(this.props.usersData.currentPage);
    }

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users {...this.props.usersData}
                         onPageChanged={this.props.onPageChanged}
                         followUser={this.props.followUser}
                         unFollowUser={this.props.unFollowUser}
                />
            }
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.usersPage.isFetching,
        usersData: {
            users: state.usersPage.users,
            pageSize: state.usersPage.pageSize,
            currentPage: state.usersPage.currentPage,
            totalUserCount: state.usersPage.totalUserCount,
            followingInProgress: state.usersPage.followingInProgress
        }
    }
};

let AuthRedirectComponent = withAuthRedirect(UsersContainer);

export default connect(mapStateToProps, {
    getUsers,
    onPageChanged,
    followUser,
    unFollowUser
})(AuthRedirectComponent);


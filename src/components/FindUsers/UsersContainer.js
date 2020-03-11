import React from 'react';
import {connect} from "react-redux";
import Users from "./Users/Users";
import Preloader from "../common/preloader/Preloader";
import {followUser, getUsers, onPageChanged, unFollowUser} from "../../redux/UsersReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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

/**
 * Метод compose поочередно вызывает вложенные методы, с параметром
 * 1. Вызывает withAuthRedirect(Dialogs), получает данные и далее как параметр передает в следующий метод в сторону начала
 * 2. connect(mapStateToProps, mapDispatchToProps)(return_method_1) и так далее
 */
export default compose(
    connect(mapStateToProps, {
        getUsers,
        onPageChanged,
        followUser,
        unFollowUser
    }),
    // withAuthRedirect
)(UsersContainer);


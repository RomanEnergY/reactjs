import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import Users from "./Users/Users";
import Preloader from "../common/preloader/Preloader";
import {
    follow,
    setCurrentPage,
    setFetching,
    setFollowingInProgress,
    setTotalUserCount,
    setUsers,
    unFollow
} from "../../redux/UsersReducer";
import {usersAPI as api} from "../../api/api";

/*
    По средством connect передаем в UsersContainer данные,
    UsersContainer осуществляет передачу запросов и получение данных,
    далее данные передаются в презентационную компаненту Users
 */
class UsersContainer extends React.Component {
    // по средством connect получаем this.props
    componentDidMount() {
        this.getUserPageNumber(this.props.currentPage);
    }

    componentWillUnmount() {

    }

    // метод запроса на сервер данных
    getUserPageNumber = (pageNumber) => {
        this.props.setFetching(true);
        api.getUsers(pageNumber, this.props.pageSize)
            .then(response => {
                this.props.setTotalUserCount(response.totalCount);
                this.props.setUsers(response.items);
                this.props.setFetching(false);
            });
    };


    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.getUserPageNumber(pageNumber);
    };

    follow = (id) => {
        this.props.setFollowingInProgress(true, id);
        api.follow(id)
            .then(response => {
                this.props.follow(id);
                this.props.setFollowingInProgress(false, id);
            })
    };

    unFollow = (id) => {
        this.props.setFollowingInProgress(true, id);
        api.unFollow(id)
            .then(response => {
                this.props.unFollow(id);
                this.props.setFollowingInProgress(false, id);
            })
    };

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader/>
                : <Users
                    totalUserCount={this.props.totalUserCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    unFollow={this.unFollow}
                    follow={this.follow}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}/>
            }
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};

export default connect(mapStateToProps, {
    follow,
    setCurrentPage,
    setFetching,
    setFollowingInProgress,
    setTotalUserCount,
    setUsers,
    unFollow
})(UsersContainer);


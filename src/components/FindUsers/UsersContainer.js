import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import Users from "./Users/Users";
import Preloader from "../common/preloader/Preloader";
import {follow, setCurrentPage, setFetching, setTotalUserCount, setUsers, unFollow} from "../../redux/UsersReducer";

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
        axios.get("https://social-network.samuraijs.com/api/1.0/users" +
            `?page=${pageNumber}` +
            `&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setTotalUserCount(response.data.totalCount);
                this.props.setUsers(response.data.items);
                this.props.setFetching(false);
            });
    };

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.getUserPageNumber(pageNumber);
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
                    unFollow={this.props.unFollow}
                    follow={this.props.follow}
                    onPageChanged={this.onPageChanged}/>
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
        isFetching: state.usersPage.isFetching
    }
};

export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUserCount,
    setFetching
})(UsersContainer);

